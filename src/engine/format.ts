import { FACT_BY_KEY, type FactFormat } from './facts.ts';
import type { Condition, FactValue, Facts } from './types.ts';

export function fmtUSD(value: number, opts: { sign?: boolean } = {}): string {
  if (!Number.isFinite(value)) return '—';
  const sign = value < 0 ? '−' : opts.sign && value > 0 ? '+' : '';
  const abs = Math.abs(value);
  let body: string;
  if (abs >= 1e9) body = `$${(abs / 1e9).toFixed(2)}B`;
  else if (abs >= 1e6) body = `$${(abs / 1e6).toFixed(abs >= 1e8 ? 0 : abs >= 1e7 ? 1 : 2)}M`;
  else if (abs >= 1e3) body = `$${(abs / 1e3).toFixed(abs >= 1e5 ? 0 : 1)}K`;
  else body = `$${abs.toFixed(0)}`;
  return sign + body;
}

export function fmtPct(value: number, digits?: number): string {
  if (!Number.isFinite(value)) return '—';
  const pct = value * 100;
  const d = digits ?? (Math.abs(pct) < 10 && Math.round(pct * 100) % 100 !== 0 ? 2 : 1);
  return `${trimZeros(pct.toFixed(d))}%`;
}

export function fmtPerMWh(value: number): string {
  if (!Number.isFinite(value)) return '—';
  const sign = value < 0 ? '−' : '';
  return `${sign}$${Math.abs(value).toFixed(2)}/MWh`;
}

export function fmtNumber(value: number, digits = 0): string {
  if (!Number.isFinite(value)) return '—';
  return value.toLocaleString('en-US', { maximumFractionDigits: digits, minimumFractionDigits: 0 });
}

function trimZeros(s: string): string {
  return s.includes('.') ? s.replace(/\.?0+$/, '') : s;
}

export function formatValue(value: FactValue | undefined, format: FactFormat): string {
  if (value === undefined) return '—';
  if (typeof value === 'boolean') return value ? 'yes' : 'no';
  if (typeof value === 'string') return value;
  switch (format) {
    case 'pct':
      return fmtPct(value);
    case 'usd':
      return fmtUSD(value);
    case 'perMWh':
      return fmtPerMWh(value);
    case 'mwh':
      return `${fmtNumber(value)} MWh`;
    case 'mw':
      return `${fmtNumber(value, 1)} MW`;
    case 'years':
      return `${fmtNumber(value)} years`;
    case 'year':
      return value ? `year ${fmtNumber(value)}` : 'never';
    case 'multiple':
      return `${value.toFixed(2)}×`;
    default:
      return fmtNumber(value, 2);
  }
}

export function formatFact(key: string, value: FactValue | undefined): string {
  return formatValue(value, FACT_BY_KEY[key]?.format ?? 'text');
}

/** Replaces `{factKey}` placeholders with formatted fact values. */
export function renderTemplate(template: string, facts: Facts): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in facts ? formatFact(key, facts[key]) : match));
}

const OP_WORDS: Record<string, string> = {
  '>': 'is above',
  '>=': 'is at least',
  '<': 'is below',
  '<=': 'is at most',
  '==': 'is',
  '!=': 'is not',
  outside: 'is outside',
  between: 'is between',
};

export function describeCondition(c: Condition): string {
  const def = FACT_BY_KEY[c.fact];
  const label = def?.label ?? c.fact;
  const format = def?.format ?? 'text';
  const value = Array.isArray(c.value)
    ? `${formatValue(c.value[0], format)} ${c.op === 'between' ? 'and' : 'to'} ${formatValue(c.value[1], format)}`
    : formatValue(c.value, format);
  return `${label} ${OP_WORDS[c.op] ?? c.op} ${value}`;
}

/** Converts a stored value to what a person types (7.5 for 7.5%). */
export function toDisplayNumber(value: number, format: FactFormat): number {
  return format === 'pct' ? round(value * 100, 6) : value;
}

export function fromDisplayNumber(value: number, format: FactFormat): number {
  return format === 'pct' ? round(value / 100, 8) : value;
}

function round(value: number, digits: number): number {
  const f = Math.pow(10, digits);
  return Math.round(value * f) / f;
}
