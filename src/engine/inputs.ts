import { FACT_BY_KEY } from './facts.ts';
import { MARKETS, type Diligence, type Inputs, type Market } from './types.ts';

/** For percentage fields given without a % sign: values above this are read as percents. */
const MAX_FRACTION: Record<string, number> = {
  capacityFactor: 0.7,
  captureRate: 1.5,
  degradation: 0.05,
  wholesaleEscalation: 0.25,
  strikeEscalation: 0.25,
  recEscalation: 0.5,
  discountRate: 0.3,
};

/** Reads 7.5, "7.5%", and 0.075 all as 7.5% for percentage fields. */
function asFraction(key: string, value: number, hadPercentSign: boolean): number {
  if (!(key in MAX_FRACTION)) return value;
  return hadPercentSign || Math.abs(value) > MAX_FRACTION[key] ? value / 100 : value;
}

const DILIGENCE_KEYS: (keyof Diligence)[] = [
  'accountingReviewed',
  'creditSupportReviewed',
  'negativePriceTermsReviewed',
  'marketBoundaryConfirmed',
  'scope2RevisionConsidered',
];

/**
 * What to use when a model doesn't state a value. Core economics get a
 * benchmark and are reported as assumed. Refinements a model can silently
 * leave out (degradation, capture rate, transaction costs, basis) default to
 * "not modeled", so the checks that look for those gaps still fire.
 */
function defaultsFor(technology: Inputs['technology']): Omit<Inputs, 'diligence'> {
  return {
    scenarioName: 'VPPA vs. unbundled RECs',
    assumptionOwner: '',
    technology,
    market: 'Other',
    capacityMW: 100,
    capacityFactor: technology === 'wind' ? 0.36 : 0.24,
    degradation: 0,
    termYears: 15,
    strikePrice: technology === 'wind' ? 72 : 63,
    strikeEscalation: 0,
    settlementPoint: 'hub',
    basis: 0,
    transactionCost: 0,
    hubPrice: 45,
    wholesaleEscalation: 0.0275,
    captureRate: 1,
    annualLoadMWh: 0,
    recPrice: 4.5,
    recEscalation: 0.02,
    discountRate: 0.08,
  };
}

/** Defaults that stand in for a missing number rather than a missing refinement. */
const ASSUMED_WHEN_MISSING = new Set<keyof Inputs>([
  'capacityMW',
  'capacityFactor',
  'termYears',
  'strikePrice',
  'hubPrice',
  'wholesaleEscalation',
  'recPrice',
  'recEscalation',
  'discountRate',
  'annualLoadMWh',
]);

export interface Completed {
  inputs: Inputs;
  /** Input keys the source didn't give, filled with a benchmark. */
  assumed: string[];
  /** Keys in the source this tool doesn't use. */
  ignored: string[];
}

function toNumber(v: unknown): number | undefined {
  if (typeof v === 'number') return Number.isFinite(v) ? v : undefined;
  if (typeof v === 'string' && v.trim()) {
    const n = Number(v.replace(/[,$%\s]/g, ''));
    return Number.isFinite(n) ? n : undefined;
  }
  return undefined;
}

function toBool(v: unknown): boolean | undefined {
  if (typeof v === 'boolean') return v;
  if (typeof v === 'string') {
    if (/^(true|yes|y|done|1)$/i.test(v.trim())) return true;
    if (/^(false|no|n|0)$/i.test(v.trim())) return false;
  }
  return undefined;
}

/**
 * Turns a partial, loosely typed set of assumptions (from a pasted table, a
 * JSON file Claude wrote, or a form) into a full scenario, and records which
 * values were filled in so the advice can say so.
 */
export function completeInputs(partial: Record<string, unknown>): Completed {
  const src: Record<string, unknown> = { ...partial };
  if (src.diligence && typeof src.diligence === 'object') Object.assign(src, src.diligence as object);

  const technology = String(src.technology ?? '').toLowerCase() === 'wind' ? 'wind' : 'solar';
  const base = defaultsFor(technology);
  const diligence: Diligence = {
    accountingReviewed: false,
    creditSupportReviewed: false,
    negativePriceTermsReviewed: false,
    marketBoundaryConfirmed: false,
    scope2RevisionConsidered: false,
  };
  const inputs: Inputs = { ...base, diligence };
  const assumed: string[] = [];
  const known = new Set<string>([...Object.keys(base), ...DILIGENCE_KEYS, 'diligence', 'annualGenerationMWh']);
  const ignored = Object.keys(partial).filter((k) => !known.has(k));

  if (typeof src.scenarioName === 'string' && src.scenarioName.trim()) inputs.scenarioName = src.scenarioName.trim();
  if (typeof src.assumptionOwner === 'string') inputs.assumptionOwner = src.assumptionOwner.trim();
  const market = MARKETS.find((m) => m.toLowerCase() === String(src.market ?? '').toLowerCase().replace(/\s+/g, ''));
  if (market) inputs.market = market as Market;
  else if (String(src.market ?? '').toLowerCase().replace(/[\s-]/g, '') === 'isone') inputs.market = 'ISO-NE';
  if (String(src.settlementPoint ?? '').toLowerCase().startsWith('node')) inputs.settlementPoint = 'node';

  for (const key of Object.keys(base) as (keyof Omit<Inputs, 'diligence'>)[]) {
    if (FACT_BY_KEY[key]?.format === 'text' || key === 'scenarioName' || key === 'assumptionOwner') continue;
    const n = toNumber(src[key]);
    const percentSign = typeof src[key] === 'string' && (src[key] as string).includes('%');
    if (n !== undefined) (inputs as unknown as Record<string, number>)[key] = asFraction(key, n, percentSign);
    else if (ASSUMED_WHEN_MISSING.has(key)) assumed.push(key);
  }

  // Annual generation can stand in for size or capacity factor.
  const generation = toNumber(src.annualGenerationMWh);
  if (generation && generation > 0) {
    const hasMW = !assumed.includes('capacityMW');
    const hasCF = !assumed.includes('capacityFactor');
    if (hasMW && !hasCF) {
      inputs.capacityFactor = generation / (inputs.capacityMW * 8760);
      assumed.splice(assumed.indexOf('capacityFactor'), 1);
    } else if (!hasMW) {
      inputs.capacityMW = generation / (inputs.capacityFactor * 8760);
      assumed.splice(assumed.indexOf('capacityMW'), 1);
    }
  }

  // With no load given, assume the project is sized to cover it.
  if (assumed.includes('annualLoadMWh') || inputs.annualLoadMWh <= 0) {
    inputs.annualLoadMWh = Math.round(inputs.capacityMW * 8760 * inputs.capacityFactor);
    if (!assumed.includes('annualLoadMWh')) assumed.push('annualLoadMWh');
  }

  for (const k of DILIGENCE_KEYS) {
    const b = toBool(src[k]);
    if (b !== undefined) inputs.diligence[k] = b;
  }

  return { inputs, assumed, ignored };
}

// ── Reading a pasted table ─────────────────────────────────────────

export interface ReadLine {
  text: string;
  key?: string;
  value?: number | string;
}

/** Ordered: the first pattern that matches a label wins, so specific ones come first. */
const LABELS: [RegExp, string][] = [
  [/(strike|ppa|contract|vppa).*(escalat|escalator|indexation)/i, 'strikeEscalation'],
  [/\brecs?\b.*(escalat|inflat|growth)|(certificate|credit).*(escalat|growth)/i, 'recEscalation'],
  [/escalat|inflat|price growth|annual growth/i, 'wholesaleEscalation'],
  [/capture|shape (factor|discount)|realization/i, 'captureRate'],
  [/basis/i, 'basis'],
  [/capacity factor|\bcf\b|net capacity|\bncf\b/i, 'capacityFactor'],
  [/degradation/i, 'degradation'],
  [/(annual )?(generation|production|output)\b/i, 'annualGenerationMWh'],
  [/strike|ppa price|vppa price|contract price|fixed price|offer price/i, 'strikePrice'],
  [/\brecs?\b|renewable energy (credit|certificate)|eac\b/i, 'recPrice'],
  [/hub|market price|wholesale|power price|energy price|forward|merchant|lmp/i, 'hubPrice'],
  [/term|tenor|contract length|duration|years/i, 'termYears'],
  [/project size|nameplate|capacity|\bmw\b|size/i, 'capacityMW'],
  [/load|consumption|usage|demand/i, 'annualLoadMWh'],
  [/discount|wacc|hurdle|cost of capital/i, 'discountRate'],
  [/transaction|legal|advisory|fees/i, 'transactionCost'],
];

function parseAmount(text: string): { value: number; percent: boolean } | null {
  const m = text.match(/(-|−)?\s*\$?\s*(\d[\d,]*\.?\d*|\.\d+)\s*(%|k\b|m\b|mm\b|million|bn\b|gwh|mwh|twh)?/i);
  if (!m) return null;
  let value = Number(m[2].replace(/,/g, ''));
  if (!Number.isFinite(value)) return null;
  if (m[1]) value = -value;
  const unit = (m[3] ?? '').toLowerCase();
  if (unit === 'k') value *= 1e3;
  else if (unit === 'm' || unit === 'mm' || unit === 'million') value *= 1e6;
  else if (unit === 'bn') value *= 1e9;
  else if (unit === 'gwh') value *= 1e3;
  else if (unit === 'twh') value *= 1e6;
  return { value, percent: unit === '%' };
}

/**
 * Reads assumptions from text pasted out of a spreadsheet or document, one
 * per line ("Wholesale price inflation <tab> 7.5%"). Returns what it
 * recognized, so a person can see exactly how each line was read.
 */
export function readAssumptions(text: string): { values: Record<string, unknown>; lines: ReadLine[] } {
  const values: Record<string, unknown> = {};
  const lines: ReadLine[] = [];

  for (const raw of text.split(/\r?\n/)) {
    // "Year 1 hub price" should not read as the number 1.
    const line = raw.trim().replace(/\b(year|yr)[\s-]*1\b/gi, 'year-one');
    if (!line) continue;

    // Split the label from the value at the first tab, colon, or run of spaces before a number.
    const parts = line.split(/\t|:\s+|\s{2,}|=\s*/).map((s) => s.trim()).filter(Boolean);
    const label = parts.length > 1 ? parts[0] : line.replace(/[-−$]?\s*[\d.,]+.*$/, '').trim();
    const rest = parts.length > 1 ? parts.slice(1).join(' ') : line.slice(label.length);
    const whole = line.toLowerCase();

    const tech = /\bwind\b/.test(whole) ? 'wind' : /\bsolar|\bpv\b/.test(whole) ? 'solar' : undefined;
    const market = MARKETS.find((m) => m !== 'Other' && new RegExp(`\\b${m.replace('-', '[- ]?')}\\b`, 'i').test(line));
    if (/^(technology|resource|type)/i.test(label) && tech) {
      values.technology = tech;
      lines.push({ text: line, key: 'technology', value: tech });
      continue;
    }
    if (/^(market|iso|rto|region)/i.test(label) && market) {
      values.market = market;
      lines.push({ text: line, key: 'market', value: market });
      continue;
    }
    if (/settle/i.test(label)) {
      const point = /node|busbar/i.test(rest) ? 'node' : 'hub';
      values.settlementPoint = point;
      lines.push({ text: line, key: 'settlementPoint', value: point });
      continue;
    }
    if (/^(scenario|project|project name|deal|name)$/i.test(label) && rest) {
      values.scenarioName = rest;
      lines.push({ text: line, key: 'scenarioName', value: rest });
      continue;
    }

    const match = LABELS.find(([re]) => re.test(label));
    const amount = parseAmount(rest || line);
    if (!match || !amount) {
      if (tech && !values.technology) values.technology = tech;
      if (market && !values.market) values.market = market;
      lines.push({ text: line });
      continue;
    }

    const key = match[1];
    const value = asFraction(key, amount.value, amount.percent);
    values[key] = value;
    if (tech && !values.technology) values.technology = tech;
    lines.push({ text: line, key, value });
  }

  return { values, lines };
}
