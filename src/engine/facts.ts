import { dataFacts } from './marketData.ts';
import { breakEvenEscalation, breakEvenStrike, runModel } from './model.ts';
import type { Facts, Inputs, ModelResult } from './types.ts';

export type FactFormat = 'pct' | 'usd' | 'perMWh' | 'mwh' | 'mw' | 'years' | 'multiple' | 'year' | 'bool' | 'text';

export interface FactDef {
  key: string;
  label: string;
  format: FactFormat;
  kind: 'input' | 'derived';
  help: string;
  options?: string[];
  /** Physically possible values. Anything outside is an error (often a unit mix-up), not just an aggressive assumption. */
  range?: [number, number];
  /** Where a reliable value comes from, and what to be wary of. */
  source?: string;
  /** Part of the minimal set needed for advice; missing ones are filled with a benchmark and reported. */
  core?: boolean;
}

/**
 * Every value a check can test. Inputs come straight from the form; derived
 * facts are computed from the model so checks can look at consequences
 * (e.g. "what hub price does this escalation imply in the final year?").
 */
export const FACTS: FactDef[] = [
  { key: 'technology', label: 'Technology', format: 'text', kind: 'input', help: 'solar or wind', options: ['solar', 'wind'], core: true, source: 'Term sheet' },
  { key: 'market', label: 'Market', format: 'text', kind: 'input', help: 'ISO/RTO the project sits in', options: ['ERCOT', 'PJM', 'MISO', 'SPP', 'CAISO', 'NYISO', 'ISO-NE', 'Other'], core: true, source: 'Term sheet (project location and settlement hub)' },
  { key: 'capacityMW', label: 'Project size', format: 'mw', kind: 'input', help: 'Contracted capacity, MW AC', range: [0.1, 5000], core: true, source: 'Term sheet: contracted share, not the whole project' },
  { key: 'capacityFactor', label: 'Capacity factor', format: 'pct', kind: 'input', help: 'Average output as a share of nameplate', range: [0.05, 0.7], core: true, source: 'Independent energy yield assessment (P50); developer estimates run high' },
  { key: 'degradation', label: 'Output degradation', format: 'pct', kind: 'input', help: 'Annual loss of output', range: [0, 0.05], source: 'Energy yield assessment or module warranty' },
  { key: 'termYears', label: 'Contract term', format: 'years', kind: 'input', help: 'VPPA length in years', range: [1, 35], core: true, source: 'Term sheet' },
  { key: 'strikePrice', label: 'Strike price', format: 'perMWh', kind: 'input', help: 'Fixed VPPA price, year 1', range: [1, 300], core: true, source: 'Developer’s firm offer, dated; compare with the LevelTen P25 index' },
  { key: 'strikeEscalation', label: 'Strike escalator', format: 'pct', kind: 'input', help: 'Annual increase in the strike price', range: [-0.05, 0.1], source: 'Term sheet' },
  { key: 'settlementPoint', label: 'Settlement point', format: 'text', kind: 'input', help: 'hub or node', options: ['hub', 'node'], source: 'Term sheet' },
  { key: 'basis', label: 'Basis (node minus hub)', format: 'perMWh', kind: 'input', help: 'Applies only to node settlement', range: [-100, 100], source: 'Node vs. hub price history from ISO data, weighted by the project’s output' },
  { key: 'transactionCost', label: 'Transaction costs', format: 'usd', kind: 'input', help: 'One-time legal, advisory, and procurement costs', range: [0, 100e6], source: 'Quotes from counsel and the procurement advisor' },
  { key: 'hubPrice', label: 'Hub price, year 1', format: 'perMWh', kind: 'input', help: 'Around-the-clock wholesale price', range: [1, 500], core: true, source: 'Dated hub forward curve from a broker or the ISO; stale curves are common' },
  { key: 'wholesaleEscalation', label: 'Wholesale price escalation', format: 'pct', kind: 'input', help: 'Annual growth in wholesale prices', range: [-0.05, 0.25], core: true, source: 'Advisor’s long-run fundamentals forecast; cross-check with EIA’s Annual Energy Outlook. A single year’s inflation is not a forecast' },
  { key: 'captureRate', label: 'Capture rate', format: 'pct', kind: 'input', help: "Project's generation-weighted price as a share of the around-the-clock price", range: [-1.5, 2.5], source: 'Shape or capture study for the project’s location' },
  { key: 'annualLoadMWh', label: 'Annual load', format: 'mwh', kind: 'input', help: 'Electricity use to be matched with RECs', range: [1, 1e9], core: true, source: 'Utility bills or the energy management system, for the sites the claim covers' },
  { key: 'recPrice', label: 'REC price, year 1', format: 'perMWh', kind: 'input', help: 'Unbundled REC price', range: [0, 100], core: true, source: 'Broker quote for the exact product and vintage (national voluntary vs. state compliance)' },
  { key: 'recEscalation', label: 'REC price escalation', format: 'pct', kind: 'input', help: 'Annual growth in REC prices', range: [-0.2, 0.5], source: 'Broker view; voluntary REC prices have no steady trend' },
  { key: 'discountRate', label: 'Discount rate', format: 'pct', kind: 'input', help: 'Rate used to discount future costs', range: [0, 0.3], core: true, source: 'Treasury or finance (the company’s cost of capital)' },
  { key: 'accountingReviewed', label: 'Derivative accounting reviewed', format: 'bool', kind: 'input', help: 'ASC 815 / IFRS 9 treatment confirmed', source: 'Controller’s group' },
  { key: 'creditSupportReviewed', label: 'Credit support reviewed', format: 'bool', kind: 'input', help: 'Collateral or guarantee requirements known', source: 'Treasury and the term sheet' },
  { key: 'negativePriceTermsReviewed', label: 'Negative-price terms reviewed', format: 'bool', kind: 'input', help: 'Floor or curtailment clause checked', source: 'The contract, reviewed by counsel' },
  { key: 'marketBoundaryConfirmed', label: 'REC market boundary confirmed', format: 'bool', kind: 'input', help: 'RECs come from the same market as the load', source: 'REC tracking system records (e.g. M-RETS, PJM-GATS, ERCOT)' },
  { key: 'scope2RevisionConsidered', label: 'Scope 2 revision considered', format: 'bool', kind: 'input', help: 'GHG Protocol Scope 2 proposals reviewed', source: 'Sustainability reporting lead' },

  { key: 'year1GenerationMWh', label: 'Year-1 generation', format: 'mwh', kind: 'derived', help: 'Size x 8,760 h x capacity factor' },
  { key: 'coverageRatio', label: 'Load covered by the project', format: 'pct', kind: 'derived', help: 'Year-1 generation / annual load' },
  { key: 'year1SettlementPrice', label: 'Project market value, year 1', format: 'perMWh', kind: 'derived', help: 'Hub price x capture rate (+ basis at a node)' },
  { key: 'year1SpreadToStrike', label: 'Year-1 market value minus strike', format: 'perMWh', kind: 'derived', help: 'Negative means the buyer pays in year 1' },
  { key: 'finalYearHubPrice', label: 'Hub price in final year', format: 'perMWh', kind: 'derived', help: 'Year-1 hub price compounded over the term' },
  { key: 'hubPriceMultiple', label: 'Final-year hub price vs. today', format: 'multiple', kind: 'derived', help: 'How many times today’s price the model assumes by the last year' },
  { key: 'escalationMinusDiscount', label: 'Escalation minus discount rate', format: 'pct', kind: 'derived', help: 'Positive means distant years weigh as much as near ones' },
  { key: 'npvAdvantage', label: 'VPPA advantage (NPV)', format: 'usd', kind: 'derived', help: 'REC strategy cost minus VPPA cost; positive favors the VPPA' },
  { key: 'recommendsVppa', label: 'Result favors the VPPA', format: 'bool', kind: 'derived', help: 'true when the VPPA costs less' },
  { key: 'breakEvenEscalation', label: 'Break-even escalation', format: 'pct', kind: 'derived', help: 'Escalation at which both options cost the same' },
  { key: 'escalationCushion', label: 'Distance to break-even escalation', format: 'pct', kind: 'derived', help: 'Absolute gap between assumed and break-even escalation' },
  { key: 'breakEvenStrike', label: 'Break-even strike price', format: 'perMWh', kind: 'derived', help: 'Strike at which both options cost the same' },
  { key: 'lateValueShare', label: 'VPPA upside after year 10', format: 'pct', kind: 'derived', help: 'Share of discounted positive settlements that arrive after year 10' },
  { key: 'firstPositiveYear', label: 'First year the VPPA pays out', format: 'year', kind: 'derived', help: '0 when it never does' },

  // From public market data (scripts/data/refresh.py). Absent when the data is.
  { key: 'expectedInflation', label: 'Inflation markets expect (10 yr)', format: 'pct', kind: 'derived', help: '10-year breakeven inflation, FRED' },
  { key: 'escalationOverInflation', label: 'Escalation above expected inflation', format: 'pct', kind: 'derived', help: 'Assumed wholesale escalation minus expected inflation' },
  { key: 'recentInflation', label: 'Inflation, last 12 months', format: 'pct', kind: 'derived', help: 'CPI, FRED' },
  { key: 'inflationPeak2022', label: 'Inflation peak in 2022', format: 'pct', kind: 'derived', help: 'Highest 12-month CPI change in 2022, FRED' },
  { key: 'treasury10y', label: '10-year Treasury yield', format: 'pct', kind: 'derived', help: 'Risk-free rate, FRED' },
  { key: 'discountOverTreasury', label: 'Discount rate above Treasuries', format: 'pct', kind: 'derived', help: 'Discount rate minus the 10-year Treasury yield' },
  { key: 'marketCostOfCapital', label: 'Average US cost of capital', format: 'pct', kind: 'derived', help: 'Damodaran, all US companies' },
  { key: 'hasPriceData', label: 'Market price data available', format: 'bool', kind: 'derived', help: 'Hourly hub prices were fetched for this market' },
  { key: 'marketHubPrice', label: 'Market average price, past year', format: 'perMWh', kind: 'derived', help: 'Average day-ahead price at the market’s main hub' },
  { key: 'hubPriceVsMarket', label: 'Hub price vs. past year', format: 'multiple', kind: 'derived', help: 'Assumed year-1 hub price divided by the past year’s average' },
  { key: 'marketNegativeHourShare', label: 'Hours with negative prices', format: 'pct', kind: 'derived', help: 'Share of day-ahead hours below $0 at the hub, past year' },
  { key: 'marketCaptureRate', label: 'Capture rate in this market', format: 'pct', kind: 'derived', help: 'What solar or wind output earned vs. the average price, past year' },
  { key: 'expectedCaptureRate', label: 'Expected capture rate', format: 'pct', kind: 'derived', help: 'Measured in this market when available; otherwise a planning default (solar 85%, wind 90%)' },
  { key: 'captureRateVsMarket', label: 'Capture rate above market', format: 'pct', kind: 'derived', help: 'Assumed capture rate minus what the market delivered' },
  { key: 'expectedCapacityFactor', label: 'Expected capacity factor', format: 'pct', kind: 'derived', help: 'NREL PVWatts for the region (solar) or the US fleet average (EIA)' },
  { key: 'capacityFactorVsExpected', label: 'Capacity factor above expected', format: 'pct', kind: 'derived', help: 'Assumed capacity factor minus the expected one' },
];

export const FACT_BY_KEY: Record<string, FactDef> = Object.fromEntries(FACTS.map((f) => [f.key, f]));

export function deriveFacts(inputs: Inputs, result: ModelResult = runModel(inputs)): Facts {
  const plain: Facts = { ...inputs.diligence };
  for (const [key, value] of Object.entries(inputs)) {
    if (typeof value !== 'object') plain[key] = value;
  }
  const rows = result.rows;
  const year1 = rows[0];
  const last = rows[rows.length - 1];

  let positive = 0;
  let positiveLate = 0;
  let firstPositiveYear = 0;
  for (const row of rows) {
    if (row.settlement > 0) {
      const pv = row.settlement * row.discountFactor;
      positive += pv;
      if (row.year > 10) positiveLate += pv;
      if (!firstPositiveYear) firstPositiveYear = row.year;
    }
  }

  const beEsc = breakEvenEscalation(inputs);

  return {
    ...plain,
    year1GenerationMWh: year1.generationMWh,
    coverageRatio: inputs.annualLoadMWh > 0 ? year1.generationMWh / inputs.annualLoadMWh : 0,
    year1SettlementPrice: year1.settlementPrice,
    year1SpreadToStrike: year1.settlementPrice - year1.strikePrice,
    finalYearHubPrice: last.hubPrice,
    hubPriceMultiple: inputs.hubPrice > 0 ? last.hubPrice / inputs.hubPrice : 0,
    escalationMinusDiscount: inputs.wholesaleEscalation - inputs.discountRate,
    npvAdvantage: result.npvAdvantage,
    recommendsVppa: result.recommendation === 'VPPA',
    breakEvenEscalation: beEsc,
    escalationCushion: Math.abs(inputs.wholesaleEscalation - beEsc),
    breakEvenStrike: breakEvenStrike(inputs),
    lateValueShare: positive > 0 ? positiveLate / positive : 0,
    firstPositiveYear,
    ...dataFacts(inputs),
  };
}

export interface InputProblem {
  key: string;
  value: number;
  range: [number, number];
  message: string;
}

/**
 * Values that cannot be right, as opposed to values that are merely
 * aggressive (those are the checks' job). Usually a unit mix-up, such as a
 * capacity factor of 24 meant as 24%.
 */
export function validateInputs(inputs: Inputs): InputProblem[] {
  const problems: InputProblem[] = [];
  for (const f of FACTS) {
    if (f.kind !== 'input' || !f.range) continue;
    const value = (inputs as unknown as Record<string, unknown>)[f.key];
    if (typeof value !== 'number') continue;
    const [lo, hi] = f.range;
    if (!Number.isFinite(value) || value < lo || value > hi) {
      problems.push({ key: f.key, value, range: f.range, message: `${f.label} must be between ${fmtRange(f.format, lo)} and ${fmtRange(f.format, hi)}.` });
    }
  }
  return problems;
}

function fmtRange(format: FactFormat, v: number): string {
  if (format === 'pct') return `${Math.round(v * 1000) / 10}%`;
  if (format === 'perMWh') return `$${v}/MWh`;
  if (format === 'usd') return `$${v.toLocaleString('en-US')}`;
  return v.toLocaleString('en-US');
}
