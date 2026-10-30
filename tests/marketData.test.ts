import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { advise } from '../src/engine/advice.ts';
import { deriveFacts } from '../src/engine/facts.ts';
import { NO_MARKET_DATA, resolveBenchmark, setMarketData, type MarketData } from '../src/engine/marketData.ts';
import { activeRules, runPreflight } from '../src/engine/rules.ts';
import { BENCHMARK_SCENARIO, EXAMPLE_SCENARIO } from '../src/engine/scenarios.ts';
import fixture from './fixtures/market-data.json' with { type: 'json' };

const rules = activeRules({ custom: [], edits: {}, disabled: [] });
const ids = (inputs: typeof EXAMPLE_SCENARIO) => runPreflight(inputs, rules).map((f) => f.rule.id);
const find = (inputs: typeof EXAMPLE_SCENARIO, id: string) => runPreflight(inputs, rules).find((f) => f.rule.id === id);

describe('checks backed by public market data', () => {
  beforeEach(() => setMarketData(fixture as MarketData));
  afterEach(() => setMarketData(NO_MARKET_DATA));

  it('sets the escalation benchmark from market inflation expectations', () => {
    const esc = find(EXAMPLE_SCENARIO, 'MKT-ESC-HIGH')!;
    expect(esc.rule.benchmark!.value).toBeCloseTo(0.0285, 6);
    expect(esc.rule.benchmark!.label).toContain('2.35% inflation markets expect');
    expect(esc.rule.benchmark!.label).toContain('FRED, 2026-10-28');
  });

  it('flags escalation more than a point above expected inflation', () => {
    expect(ids({ ...BENCHMARK_SCENARIO, wholesaleEscalation: 0.034 })).toContain('MKT-ESC-VS-INFLATION');
    expect(ids({ ...BENCHMARK_SCENARIO, wholesaleEscalation: 0.03 })).not.toContain('MKT-ESC-VS-INFLATION');
  });

  it('compares the hub price with the past year in that market', () => {
    const texas = { ...BENCHMARK_SCENARIO, market: 'ERCOT' as const, hubPrice: 48, captureRate: 0.78 };
    const hub = find(texas, 'MKT-HUB-VS-MARKET')!;
    expect(hub.message).toContain('1.37×');
    expect(hub.rule.benchmark!.value).toBe(35);
    expect(ids({ ...texas, hubPrice: 38 })).not.toContain('MKT-HUB-VS-MARKET');
  });

  it('reports a far-off hub price without replacing it with last year’s average', () => {
    const texas = { ...BENCHMARK_SCENARIO, market: 'ERCOT' as const, hubPrice: 48, captureRate: 0.78 };
    const a = advise(texas, rules);
    expect(a.correctedInputs.hubPrice).toBe(48);
    expect(a.notes.map((f) => f.rule.id)).toContain('MKT-HUB-VS-MARKET');
    expect(a.questions.map((f) => f.rule.id)).toContain('MKT-HUB-VS-MARKET');
  });

  it('uses the measured market capture rate', () => {
    const california = { ...BENCHMARK_SCENARIO, market: 'CAISO' as const, hubPrice: 40, captureRate: 1 };
    expect(find(california, 'MKT-CAPTURE-SOLAR')!.rule.benchmark!.value).toBe(0.55);
    const optimistic = find({ ...california, captureRate: 0.8 }, 'MKT-CAPTURE-VS-MARKET')!;
    expect(optimistic.message).toContain('55%');
    expect(ids({ ...california, captureRate: 0.6 })).not.toContain('MKT-CAPTURE-VS-MARKET');
  });

  it('does not flag 100% solar capture where solar actually earns more than average', () => {
    setMarketData({ ...(fixture as MarketData), markets: { SPP: { hub: 'SPPSOUTH_HUB', atcPrice: 23, negativeHourShare: 0.17, hours: 648, period: 'x', solarCapture: 1.6 } } });
    expect(ids({ ...BENCHMARK_SCENARIO, market: 'SPP', hubPrice: 23, captureRate: 1 })).not.toContain('MKT-CAPTURE-SOLAR');
  });

  it('warns about frequent negative prices instead of the generic reminder', () => {
    const california = { ...BENCHMARK_SCENARIO, market: 'CAISO' as const, hubPrice: 40, captureRate: 0.55, diligence: { ...BENCHMARK_SCENARIO.diligence, negativePriceTermsReviewed: false } };
    const found = ids(california);
    expect(found).toContain('CTR-NEGATIVE-PRICES-FREQUENT');
    expect(found).not.toContain('CTR-NEGATIVE-PRICES');
    expect(find(california, 'CTR-NEGATIVE-PRICES-FREQUENT')!.message).toContain('12%');
  });

  it('catches a discount rate below Treasuries and benchmarks it to the US cost of capital', () => {
    const low = find({ ...BENCHMARK_SCENARIO, discountRate: 0.045 }, 'FIN-DISCOUNT-BELOW-TREASURY')!;
    expect(low.message).toContain('5.16%');
    expect(low.rule.benchmark!.value).toBe(0.0696);
  });

  it('compares capacity factor with what PVWatts expects in the region', () => {
    const california = { ...BENCHMARK_SCENARIO, market: 'CAISO' as const, hubPrice: 40, captureRate: 0.55 };
    expect(ids({ ...california, capacityFactor: 0.34 })).toContain('PRJ-CF-VS-EXPECTED');
    expect(ids({ ...california, capacityFactor: 0.3 })).not.toContain('PRJ-CF-VS-EXPECTED');
    expect(deriveFacts(california).expectedCapacityFactor).toBe(0.29);
  });

  it('feeds data-backed benchmarks into the advice', () => {
    const a = advise(EXAMPLE_SCENARIO, rules);
    expect(a.correctedInputs.wholesaleEscalation).toBeCloseTo(0.0285, 6);
  });
});

describe('without market data', () => {
  it('falls back to each check’s own default and skips data-only checks', () => {
    setMarketData(NO_MARKET_DATA);
    expect(resolveBenchmark({ input: 'wholesaleEscalation', value: 0.0275, label: 'x', data: 'escalation' }, EXAMPLE_SCENARIO).value).toBe(0.0275);
    const found = ids({ ...EXAMPLE_SCENARIO, market: 'CAISO', discountRate: 0.045 });
    expect(found).not.toContain('MKT-HUB-VS-MARKET');
    expect(found).not.toContain('FIN-DISCOUNT-BELOW-TREASURY');
    expect(found).toContain('CTR-NEGATIVE-PRICES');
  });
});
