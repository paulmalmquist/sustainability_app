import { FACTS, FACT_BY_KEY } from './facts.ts';
import { fmtUSD, formatFact } from './format.ts';
import {
  OPERATORS,
  SEVERITIES,
  type Benchmark,
  type Condition,
  type Facts,
  type Finding,
  type ModelResult,
  type NumericInputKey,
  type Operator,
  type Rule,
  type Severity,
} from './types.ts';

export interface Suggestion {
  title: string;
  severity: Severity;
  why: string;
  ask: string;
  when: Condition[];
  benchmark?: Benchmark;
}

export const NUMERIC_INPUT_KEYS = FACTS.filter((f) => f.kind === 'input' && f.format !== 'text' && f.format !== 'bool').map(
  (f) => f.key as NumericInputKey,
);

/**
 * The prompt for an open-ended second look. The checklist has already run;
 * Claude is asked only for what it missed, in a shape that can become a
 * new check once a person agrees with it.
 */
export function buildSecondLookPrompt(facts: Facts, result: ModelResult, findings: Finding[], rules: Rule[]): string {
  const flagged = new Set(findings.map((f) => f.rule.id));
  const factLines = FACTS.map((f) => `- ${f.key} = ${JSON.stringify(facts[f.key])} (${f.label}; shown as ${formatFact(f.key, facts[f.key])})`);
  const flaggedLines = findings.map((f) => `- [${f.rule.severity}] ${f.rule.title}: ${f.message}`);
  const quietLines = rules.filter((r) => !flagged.has(r.id)).map((r) => `- ${r.title}`);

  return [
    'You are a senior reviewer of corporate renewable energy procurement: VPPAs, physical PPAs, and unbundled RECs.',
    'A checklist has already reviewed the VPPA vs. unbundled REC model below. Find up to 5 problems the checklist did NOT catch: assumptions that look wrong, inconsistent with each other, missing, or risky for this specific deal.',
    'Do not repeat anything already flagged. Do not state market figures you are unsure of; say what should be verified instead. Be specific to these numbers.',
    '',
    'Model facts (key = machine value):',
    ...factLines,
    '',
    `Result: the model favors ${result.recommendation === 'VPPA' ? 'the VPPA' : 'buying RECs'} by ${fmtUSD(Math.abs(result.npvAdvantage))} NPV.`,
    '',
    'Already flagged by the checklist:',
    ...(flaggedLines.length ? flaggedLines : ['- (nothing)']),
    '',
    'Checks that ran and did not fire:',
    ...quietLines,
    '',
    'Where a problem can be written as a reusable check on the fact keys above, include it. Operators: > >= < <= == != outside between (outside/between take [low, high]). Use machine values: fractions for percentages (0.03 = 3%), $/MWh for prices, true/false for yes/no facts, and the exact strings shown for text facts. A benchmark may only set one of these inputs: ' +
      NUMERIC_INPUT_KEYS.join(', ') +
      '.',
    '',
    'Reply with only a JSON array, for example:',
    '[{"title":"Strike escalator outpaces inflation","severity":"warning","why":"...","ask":"...","check":{"when":[{"fact":"strikeEscalation","op":">","value":0.025}],"benchmark":{"input":"strikeEscalation","value":0,"label":"flat strike"}}}]',
    'severity is one of critical, warning, info. Use "check": null when the problem cannot be expressed with these facts.',
  ].join('\n');
}

function asCondition(raw: unknown): Condition | null {
  if (!raw || typeof raw !== 'object') return null;
  const { fact, op, value } = raw as Record<string, unknown>;
  if (typeof fact !== 'string' || !FACT_BY_KEY[fact]) return null;
  if (typeof op !== 'string' || !OPERATORS.includes(op as Operator)) return null;
  const def = FACT_BY_KEY[fact];
  if (op === 'outside' || op === 'between') {
    if (!Array.isArray(value) || value.length !== 2) return null;
    const pair = value.map(Number);
    if (pair.some((n) => !Number.isFinite(n))) return null;
    return { fact, op, value: [Math.min(pair[0], pair[1]), Math.max(pair[0], pair[1])] };
  }
  if (def.format === 'bool') {
    if (typeof value === 'boolean') return { fact, op: op as Operator, value };
    if (value === 'true' || value === 'false') return { fact, op: op as Operator, value: value === 'true' };
    return null;
  }
  if (def.format === 'text') {
    if (typeof value !== 'string' || (def.options && !def.options.includes(value))) return null;
    return { fact, op: op as Operator, value };
  }
  const n = Number(value);
  return Number.isFinite(n) ? { fact, op: op as Operator, value: n } : null;
}

function asBenchmark(raw: unknown): Benchmark | undefined {
  if (!raw || typeof raw !== 'object') return undefined;
  const { input, value, label } = raw as Record<string, unknown>;
  if (typeof input !== 'string' || !NUMERIC_INPUT_KEYS.includes(input as NumericInputKey)) return undefined;
  const n = Number(value);
  if (!Number.isFinite(n)) return undefined;
  return {
    input: input as NumericInputKey,
    value: n,
    label: typeof label === 'string' && label.trim() ? label.trim() : formatFact(input, n),
  };
}

/** Keeps only well-formed suggestions; drops conditions that name unknown facts. */
export function parseSuggestions(raw: unknown): Suggestion[] {
  const list = Array.isArray(raw) ? raw : raw && typeof raw === 'object' && Array.isArray((raw as { suggestions?: unknown }).suggestions) ? (raw as { suggestions: unknown[] }).suggestions : [];
  const out: Suggestion[] = [];
  for (const item of list.slice(0, 8)) {
    if (!item || typeof item !== 'object') continue;
    const r = item as Record<string, unknown>;
    if (typeof r.title !== 'string' || !r.title.trim()) continue;
    const check = r.check && typeof r.check === 'object' ? (r.check as Record<string, unknown>) : null;
    const when = Array.isArray(check?.when) ? (check.when as unknown[]).map(asCondition).filter((c): c is Condition => c !== null) : [];
    out.push({
      title: r.title.trim(),
      severity: SEVERITIES.includes(r.severity as Severity) ? (r.severity as Severity) : 'info',
      why: typeof r.why === 'string' ? r.why.trim() : '',
      ask: typeof r.ask === 'string' ? r.ask.trim() : '',
      when,
      benchmark: when.length ? asBenchmark(check?.benchmark) : undefined,
    });
  }
  return out;
}

/**
 * Reads a pasted reply: the whole text as JSON, else a fenced block, else
 * the span from the first bracket to the last.
 */
export function parseSuggestionText(text: string): Suggestion[] {
  const attempts = [text.trim()];
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fence) attempts.push(fence[1].trim());
  const start = text.search(/[[{]/);
  const end = Math.max(text.lastIndexOf(']'), text.lastIndexOf('}'));
  if (start >= 0 && end > start) attempts.push(text.slice(start, end + 1));
  for (const a of attempts) {
    try {
      return parseSuggestions(JSON.parse(a));
    } catch {
      // try the next shape
    }
  }
  throw new Error('No JSON found in that reply.');
}
