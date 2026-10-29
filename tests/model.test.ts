import { describe, expect, it } from 'vitest';
import { breakEvenEscalation, runModel } from '../src/engine/model.ts';
import { EXAMPLE_SCENARIO } from '../src/engine/scenarios.ts';
import type { Inputs } from '../src/engine/types.ts';

// 1 MW at this capacity factor produces exactly 1,000 MWh a year.
const tiny: Inputs = {
  ...EXAMPLE_SCENARIO,
  capacityMW: 1,
  capacityFactor: 1000 / 8760,
  degradation: 0,
  termYears: 2,
  strikePrice: 50,
  strikeEscalation: 0,
  settlementPoint: 'hub',
  basis: 0,
  transactionCost: 100,
  hubPrice: 40,
  wholesaleEscalation: 0.1,
  captureRate: 1,
  annualLoadMWh: 1000,
  recPrice: 5,
  recEscalation: 0,
  discountRate: 0.1,
};

describe('runModel', () => {
  it('matches a hand calculation', () => {
    const r = runModel(tiny);
    expect(r.rows.map((x) => Math.round(x.settlement))).toEqual([-10000, -6000]);
    // 100 + 10,000/1.1 + 6,000/1.21
    expect(r.npvVppaCost).toBeCloseTo(100 + 10000 / 1.1 + 6000 / 1.21, 6);
    expect(r.npvRecCost).toBeCloseTo(5000 / 1.1 + 5000 / 1.21, 6);
    expect(r.npvAdvantage).toBeCloseTo(r.npvRecCost - r.npvVppaCost, 6);
    expect(r.recommendation).toBe('RECs');
  });

  it('buys top-up RECs only for load the project does not cover', () => {
    const r = runModel({ ...tiny, annualLoadMWh: 1500 });
    expect(r.rows[0].topUpRecsMWh).toBeCloseTo(500, 6);
    expect(r.rows[0].vppaCost).toBeCloseTo(10000 + 500 * 5, 6);
    const over = runModel({ ...tiny, annualLoadMWh: 600 });
    expect(over.rows[0].topUpRecsMWh).toBe(0);
    expect(over.rows[0].excessRecsMWh).toBeCloseTo(400, 6);
  });

  it('applies capture rate, degradation, and basis only at a node', () => {
    const hub = runModel({ ...tiny, captureRate: 0.8, degradation: 0.01, basis: -3 });
    expect(hub.rows[0].settlementPrice).toBeCloseTo(32, 6);
    expect(hub.rows[1].generationMWh).toBeCloseTo(990, 6);
    const node = runModel({ ...tiny, captureRate: 0.8, settlementPoint: 'node', basis: -3 });
    expect(node.rows[0].settlementPrice).toBeCloseTo(29, 6);
  });

  it('finds the escalation where both options cost the same', () => {
    const be = breakEvenEscalation(EXAMPLE_SCENARIO);
    expect(be).toBeGreaterThan(0.03);
    expect(be).toBeLessThan(0.035);
    expect(Math.abs(runModel({ ...EXAMPLE_SCENARIO, wholesaleEscalation: be }).npvAdvantage)).toBeLessThan(1);
  });

  it('returns NaN when no break-even exists in range', () => {
    expect(breakEvenEscalation({ ...EXAMPLE_SCENARIO, strikePrice: 1 })).toBeNaN();
  });
});
