import bundled from '../data/market-data.json' with { type: 'json' };
import type { Benchmark, Facts, Inputs, Market } from './types.ts';

export interface MarketPrices {
  hub: string;
  /** Average day-ahead price over the window, all hours. */
  atcPrice: number;
  negativeHourShare: number;
  hours: number;
  period: string;
  /** What solar or wind output earned relative to the average price. */
  solarCapture?: number;
  windCapture?: number;
}

export interface SourceStatus {
  id: string;
  name: string;
  url: string;
  status: 'ok' | 'stale' | 'failed' | 'skipped';
  detail?: string;
}

export interface MarketData {
  generatedAt?: string;
  window?: { start: string; end: string; sampledEveryDays: number };
  inflation?: { breakeven10y: number; forward5y5y: number; cpiYoY: number; cpiYoYMonth: string; cpiPeak2022: number; asOf: string; source: string };
  rates?: { treasury10y: number; baaCorporate: number; asOf: string; source: string };
  costOfCapital?: { totalMarket: number; p10: number; median: number; p90: number; industries: number; asOf: string; source: string };
  capacityFactors?: { solar: number; wind: number; period: string; asOf: string; source: string };
  onPeak?: Partial<Record<Market, { hub: string; onPeakPrice: number; days: number }>>;
  solarSites?: Partial<Record<Market, { site: number[]; capacityFactorAC: number }>>;
  markets?: Partial<Record<Market, MarketPrices>>;
  sources?: SourceStatus[];
}

export const NO_MARKET_DATA: MarketData = { sources: [], markets: {} };

let current: MarketData = bundled as MarketData;

/** The market data the engine uses: the refreshed snapshot bundled with this build. */
export function marketData(): MarketData {
  return current;
}

/** Swaps the data in use. Tests pin a fixed snapshot so results don't move weekly. */
export function setMarketData(data: MarketData): void {
  current = data;
}

/** 0.0235 → "2.35%", 0.24 → "24%". */
const pct = (v: number) => `${(v * 100).toFixed(Math.abs(v) < 0.1 ? 2 : 1).replace(/\.?0+$/, '')}%`;
const day = (iso?: string) => (iso ? iso.slice(0, 10) : 'n/a');

/** Facts that compare the scenario with public market data. Absent when the data is. */
export function dataFacts(inputs: Inputs, data: MarketData = current): Facts {
  const f: Facts = {};
  const m = data.markets?.[inputs.market];
  f.hasPriceData = !!m;

  if (data.inflation) {
    f.expectedInflation = data.inflation.breakeven10y;
    f.escalationOverInflation = inputs.wholesaleEscalation - data.inflation.breakeven10y;
    f.recentInflation = data.inflation.cpiYoY;
    f.inflationPeak2022 = data.inflation.cpiPeak2022;
  }
  if (data.rates) {
    f.treasury10y = data.rates.treasury10y;
    f.discountOverTreasury = inputs.discountRate - data.rates.treasury10y;
  }
  if (data.costOfCapital) f.marketCostOfCapital = data.costOfCapital.totalMarket;
  if (m) {
    f.marketHubPrice = m.atcPrice;
    if (m.atcPrice > 0) f.hubPriceVsMarket = inputs.hubPrice / m.atcPrice;
    f.marketNegativeHourShare = m.negativeHourShare;
    const capture = inputs.technology === 'solar' ? m.solarCapture : m.windCapture;
    if (capture !== undefined) {
      f.marketCaptureRate = capture;
      f.captureRateVsMarket = inputs.captureRate - capture;
    }
  }
  // Solar and wind usually earn less than the average price, but not everywhere
  // (in SPP, overnight wind makes solar's afternoon hours the expensive ones).
  f.expectedCaptureRate = (f.marketCaptureRate as number | undefined) ?? (inputs.technology === 'solar' ? 0.85 : 0.9);
  const expectedCF = expectedCapacityFactor(inputs, data);
  if (expectedCF) {
    f.expectedCapacityFactor = expectedCF.value;
    f.capacityFactorVsExpected = inputs.capacityFactor - expectedCF.value;
  }
  return f;
}

function expectedCapacityFactor(inputs: Inputs, data: MarketData): { value: number; label: string } | undefined {
  if (inputs.technology === 'solar') {
    const site = data.solarSites?.[inputs.market];
    if (site) return { value: site.capacityFactorAC, label: `NREL PVWatts, single-axis tracker at a representative ${inputs.market} site` };
  }
  const fleet = data.capacityFactors;
  if (!fleet) return undefined;
  const value = inputs.technology === 'solar' ? fleet.solar : fleet.wind;
  return { value, label: `US ${inputs.technology} fleet average, ${fleet.period} (EIA)` };
}

const round = (v: number, step: number) => Math.round(v / step) * step;

/**
 * A benchmark backed by current public data, when the check asks for one and
 * the data exists; otherwise the check's own default.
 */
export function resolveBenchmark(b: Benchmark, inputs: Inputs, data: MarketData = current): Benchmark {
  if (!b.data) return b;
  const m = data.markets?.[inputs.market];
  switch (b.data) {
    case 'escalation': {
      const inf = data.inflation;
      if (!inf) return b;
      const value = Math.min(0.035, Math.max(0.02, round(inf.breakeven10y + 0.005, 0.0005)));
      return { ...b, value, label: `${pct(value)}/yr: the ${pct(inf.breakeven10y)} inflation markets expect over 10 years (FRED, ${day(inf.asOf)}) plus 0.5 points for load growth` };
    }
    case 'hubPrice': {
      if (!m) return b;
      return { ...b, value: m.atcPrice, label: `$${m.atcPrice.toFixed(2)}/MWh: average day-ahead price at ${m.hub}, ${m.period}` };
    }
    case 'captureRate': {
      const capture = inputs.technology === 'solar' ? m?.solarCapture : m?.windCapture;
      if (capture === undefined || !m) return b;
      return { ...b, value: capture, label: `${pct(capture)}: what ${inputs.technology} output earned at ${m.hub} against the average price, ${m.period} (grid prices × EIA-930 output)` };
    }
    case 'capacityFactor': {
      const cf = expectedCapacityFactor(inputs, data);
      if (!cf) return b;
      return { ...b, value: cf.value, label: `${pct(cf.value)}: ${cf.label}` };
    }
    case 'discountRate': {
      const c = data.costOfCapital;
      if (!c) return b;
      return { ...b, value: c.totalMarket, label: `${pct(c.totalMarket)}: average US cost of capital (Damodaran, ${day(c.asOf)})` };
    }
  }
  return b;
}
