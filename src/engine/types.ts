// Core types shared by the model, the rules engine, and the UI.

export type Technology = 'solar' | 'wind';
export type Market = 'ERCOT' | 'PJM' | 'MISO' | 'SPP' | 'CAISO' | 'NYISO' | 'ISO-NE' | 'Other';
export type SettlementPoint = 'hub' | 'node';

export const MARKETS: Market[] = ['ERCOT', 'PJM', 'MISO', 'SPP', 'CAISO', 'NYISO', 'ISO-NE', 'Other'];

/** Yes/no diligence items that sit outside the cash-flow math. */
export interface Diligence {
  accountingReviewed: boolean;
  creditSupportReviewed: boolean;
  negativePriceTermsReviewed: boolean;
  marketBoundaryConfirmed: boolean;
  scope2RevisionConsidered: boolean;
}

/**
 * Everything the model needs. Rates are fractions (0.075 = 7.5%),
 * prices are $/MWh, money is $.
 */
export interface Inputs {
  scenarioName: string;
  assumptionOwner: string;

  technology: Technology;
  market: Market;
  capacityMW: number;
  capacityFactor: number;
  degradation: number;
  termYears: number;

  strikePrice: number;
  strikeEscalation: number;
  settlementPoint: SettlementPoint;
  /** Node minus hub, $/MWh. Only applies when the VPPA settles at the node. */
  basis: number;
  transactionCost: number;

  /** Year-1 around-the-clock hub price. */
  hubPrice: number;
  wholesaleEscalation: number;
  /** Generation-weighted price as a share of the around-the-clock price. */
  captureRate: number;

  annualLoadMWh: number;
  recPrice: number;
  recEscalation: number;

  discountRate: number;

  diligence: Diligence;
}

export type NumericInputKey = {
  [K in keyof Inputs]: Inputs[K] extends number ? K : never;
}[keyof Inputs];

export interface YearRow {
  year: number;
  generationMWh: number;
  hubPrice: number;
  /** Price the VPPA settles against for this project's output shape. */
  settlementPrice: number;
  strikePrice: number;
  /** Positive = buyer receives money from the developer. */
  settlement: number;
  recPrice: number;
  topUpRecsMWh: number;
  excessRecsMWh: number;
  vppaCost: number;
  recCost: number;
  discountFactor: number;
}

export interface ModelResult {
  rows: YearRow[];
  npvVppaCost: number;
  npvRecCost: number;
  /** npvRecCost - npvVppaCost. Positive means the VPPA is cheaper. */
  npvAdvantage: number;
  recommendation: 'VPPA' | 'RECs';
  totalSettlement: number;
  npvSettlement: number;
}

export type FactValue = number | string | boolean;
export type Facts = Record<string, FactValue>;

export type Severity = 'critical' | 'warning' | 'info';
export const SEVERITIES: Severity[] = ['critical', 'warning', 'info'];

export type Category =
  | 'Market prices'
  | 'Project output'
  | 'Contract terms'
  | 'Finance & RECs'
  | 'Result robustness'
  | 'Claims & accounting';

export const CATEGORIES: Category[] = [
  'Market prices',
  'Project output',
  'Contract terms',
  'Finance & RECs',
  'Result robustness',
  'Claims & accounting',
];

export type Operator = '>' | '>=' | '<' | '<=' | '==' | '!=' | 'outside' | 'between';
export const OPERATORS: Operator[] = ['>', '>=', '<', '<=', '==', '!=', 'outside', 'between'];

export interface Condition {
  fact: string;
  op: Operator;
  /** A [low, high] pair for `outside` and `between`. */
  value: FactValue | [number, number];
}

export interface Benchmark {
  input: NumericInputKey;
  value: number;
  label: string;
}

/**
 * One check in the playbook. Built-in checks and checks added by reviewers
 * share this shape, so a check someone adds in the app works exactly like
 * the ones that ship with it.
 */
export interface Rule {
  id: string;
  title: string;
  category: Category;
  severity: Severity;
  /** All conditions must hold for the check to fire. */
  when: Condition[];
  /** Shown when the check fires. `{factKey}` is replaced with the formatted value. */
  message: string;
  why: string;
  /** Question to put to whoever supplied the assumption. */
  ask?: string;
  benchmark?: Benchmark;
  source?: string;
  origin: 'built-in' | 'team';
  addedBy?: string;
  addedOn?: string;
  /** The story behind the check: what was caught, and where. */
  lesson?: string;
}

export interface Impact {
  benchmark: Benchmark;
  advantageAfter: number;
  /** Change in npvAdvantage from swapping in the benchmark alone. */
  delta: number;
  flips: boolean;
}

export interface Finding {
  rule: Rule;
  message: string;
  impact?: Impact;
}

export type Disposition = 'open' | 'use-benchmark' | 'accept' | 'send-back';

export interface Decision {
  disposition: Disposition;
  note: string;
}

export interface SignOff {
  by: string;
  at: string;
  fingerprint: string;
}

export interface ReviewState {
  decisions: Record<string, Decision>;
  signOff?: SignOff;
}

export interface PlaybookState {
  custom: Rule[];
  /** Full replacements for built-in checks, keyed by id. */
  edits: Record<string, Rule>;
  disabled: string[];
}
