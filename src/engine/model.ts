import type { Inputs, ModelResult, NumericInputKey, YearRow } from './types.ts';

const HOURS_PER_YEAR = 8760;

/**
 * Compares two ways to cover a company's load with renewable attributes:
 *
 *  - VPPA: a fixed-for-floating swap. Each year the buyer receives
 *    (market price - strike) x generation, which is negative when market
 *    prices sit below the strike. The buyer keeps the project's RECs and
 *    buys unbundled RECs for any load the project doesn't cover.
 *  - RECs: buy unbundled RECs for the full load every year.
 *
 * Cash flows are annual, discounted at year end. Transaction costs land
 * at year 0. Surplus RECs (generation above load) are given no value.
 */
export function runModel(inputs: Inputs): ModelResult {
  const term = Math.max(1, Math.round(inputs.termYears));
  const year1Generation = inputs.capacityMW * HOURS_PER_YEAR * inputs.capacityFactor;
  const basis = inputs.settlementPoint === 'node' ? inputs.basis : 0;

  const rows: YearRow[] = [];
  let npvVppaCost = inputs.transactionCost;
  let npvRecCost = 0;
  let totalSettlement = 0;
  let npvSettlement = 0;

  for (let year = 1; year <= term; year++) {
    const t = year - 1;
    const generationMWh = year1Generation * Math.pow(1 - inputs.degradation, t);
    const hubPrice = inputs.hubPrice * Math.pow(1 + inputs.wholesaleEscalation, t);
    const settlementPrice = hubPrice * inputs.captureRate + basis;
    const strikePrice = inputs.strikePrice * Math.pow(1 + inputs.strikeEscalation, t);
    const settlement = (settlementPrice - strikePrice) * generationMWh;
    const recPrice = inputs.recPrice * Math.pow(1 + inputs.recEscalation, t);
    const topUpRecsMWh = Math.max(0, inputs.annualLoadMWh - generationMWh);
    const excessRecsMWh = Math.max(0, generationMWh - inputs.annualLoadMWh);
    const vppaCost = -settlement + topUpRecsMWh * recPrice;
    const recCost = inputs.annualLoadMWh * recPrice;
    const discountFactor = 1 / Math.pow(1 + inputs.discountRate, year);

    rows.push({
      year,
      generationMWh,
      hubPrice,
      settlementPrice,
      strikePrice,
      settlement,
      recPrice,
      topUpRecsMWh,
      excessRecsMWh,
      vppaCost,
      recCost,
      discountFactor,
    });

    npvVppaCost += vppaCost * discountFactor;
    npvRecCost += recCost * discountFactor;
    totalSettlement += settlement;
    npvSettlement += settlement * discountFactor;
  }

  const npvAdvantage = npvRecCost - npvVppaCost;
  return {
    rows,
    npvVppaCost,
    npvRecCost,
    npvAdvantage,
    recommendation: npvAdvantage > 0 ? 'VPPA' : 'RECs',
    totalSettlement,
    npvSettlement,
  };
}

export function withInput(inputs: Inputs, key: NumericInputKey, value: number): Inputs {
  return { ...inputs, [key]: value };
}

/**
 * The value of `key` at which the VPPA and the REC strategy cost the same,
 * found by bisection. The advantage must be monotonic in `key` across
 * [lo, hi]; returns NaN when there is no crossing in that range.
 */
export function breakEven(inputs: Inputs, key: NumericInputKey, lo: number, hi: number): number {
  const f = (x: number) => runModel(withInput(inputs, key, x)).npvAdvantage;
  let fLo = f(lo);
  const fHi = f(hi);
  if (Number.isNaN(fLo) || Number.isNaN(fHi) || Math.sign(fLo) === Math.sign(fHi)) return NaN;
  let a = lo;
  let b = hi;
  for (let i = 0; i < 60; i++) {
    const mid = (a + b) / 2;
    const fMid = f(mid);
    if (Math.sign(fMid) === Math.sign(fLo)) {
      a = mid;
      fLo = fMid;
    } else {
      b = mid;
    }
  }
  return (a + b) / 2;
}

export function breakEvenEscalation(inputs: Inputs): number {
  return breakEven(inputs, 'wholesaleEscalation', -0.05, 0.25);
}

export function breakEvenStrike(inputs: Inputs): number {
  return breakEven(inputs, 'strikePrice', 0, 300);
}
