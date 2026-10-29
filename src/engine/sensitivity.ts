import { runModel, withInput } from './model.ts';
import type { Inputs, NumericInputKey } from './types.ts';

export interface SwingSpec {
  input: NumericInputKey;
  label: string;
  low: (v: number) => number;
  high: (v: number) => number;
}

const relative = (f: number) => (v: number) => v * f;
const offset = (d: number, min = -Infinity, max = Infinity) => (v: number) => Math.min(max, Math.max(min, v + d));

/** Plausible low/high values for each driver, relative to the scenario. */
export const SWINGS: SwingSpec[] = [
  { input: 'wholesaleEscalation', label: 'Wholesale escalation', low: () => 0.015, high: () => 0.04 },
  { input: 'hubPrice', label: 'Year-1 hub price', low: relative(0.8), high: relative(1.2) },
  { input: 'captureRate', label: 'Capture rate', low: offset(-0.15, 0.3), high: offset(0.05, 0, 1.1) },
  { input: 'strikePrice', label: 'Strike price', low: relative(0.9), high: relative(1.1) },
  { input: 'capacityFactor', label: 'Capacity factor', low: relative(0.9), high: relative(1.1) },
  { input: 'discountRate', label: 'Discount rate', low: offset(-0.02, 0.01), high: offset(0.02) },
  { input: 'recPrice', label: 'REC price', low: relative(0.5), high: relative(2) },
  { input: 'degradation', label: 'Degradation', low: () => 0, high: () => 0.01 },
];

export interface Swing {
  input: NumericInputKey;
  label: string;
  lowValue: number;
  highValue: number;
  /** npvAdvantage minus the base case. */
  lowDelta: number;
  highDelta: number;
  range: number;
}

/** One-at-a-time sensitivity of the VPPA advantage, widest swing first. */
export function sensitivity(inputs: Inputs): Swing[] {
  const base = runModel(inputs).npvAdvantage;
  return SWINGS.map((s) => {
    const current = inputs[s.input];
    const lowValue = s.low(current);
    const highValue = s.high(current);
    const lowDelta = runModel(withInput(inputs, s.input, lowValue)).npvAdvantage - base;
    const highDelta = runModel(withInput(inputs, s.input, highValue)).npvAdvantage - base;
    return {
      input: s.input,
      label: s.label,
      lowValue,
      highValue,
      lowDelta,
      highDelta,
      range: Math.abs(highDelta - lowDelta),
    };
  }).sort((a, b) => b.range - a.range);
}
