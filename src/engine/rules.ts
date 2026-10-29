import { BUILT_IN_RULES } from './builtinRules.ts';
import { deriveFacts } from './facts.ts';
import { renderTemplate } from './format.ts';
import { runModel, withInput } from './model.ts';
import type { Condition, Facts, Finding, Inputs, ModelResult, PlaybookState, Rule, Severity } from './types.ts';

const EPSILON = 1e-9;

export function evaluateCondition(c: Condition, facts: Facts): boolean {
  const actual = facts[c.fact];
  if (actual === undefined) return false;

  if (c.op === 'outside' || c.op === 'between') {
    if (typeof actual !== 'number' || !Array.isArray(c.value) || Number.isNaN(actual)) return false;
    const [lo, hi] = c.value;
    const inside = actual >= lo - EPSILON && actual <= hi + EPSILON;
    return c.op === 'between' ? inside : !inside;
  }

  const expected = c.value;
  if (Array.isArray(expected)) return false;

  if (typeof actual === 'number') {
    const n = typeof expected === 'number' ? expected : Number(expected);
    if (Number.isNaN(actual) || Number.isNaN(n)) return false;
    switch (c.op) {
      case '>':
        return actual > n + EPSILON;
      case '>=':
        return actual >= n - EPSILON;
      case '<':
        return actual < n - EPSILON;
      case '<=':
        return actual <= n + EPSILON;
      case '==':
        return Math.abs(actual - n) <= EPSILON;
      case '!=':
        return Math.abs(actual - n) > EPSILON;
    }
  }

  // Strings and booleans only support equality.
  const same = String(actual) === String(expected);
  if (c.op === '==') return same;
  if (c.op === '!=') return !same;
  return false;
}

export function ruleFires(rule: Rule, facts: Facts): boolean {
  return rule.when.length > 0 && rule.when.every((c) => evaluateCondition(c, facts));
}

export const SEVERITY_RANK: Record<Severity, number> = { critical: 0, warning: 1, info: 2 };

export function needsDecision(rule: Rule): boolean {
  return rule.severity !== 'info';
}

/** Built-in checks (with any local edits) followed by checks reviewers added. */
export function effectiveRules(playbook: PlaybookState): Rule[] {
  const builtIns = BUILT_IN_RULES.map((r) => playbook.edits[r.id] ?? r);
  return [...builtIns, ...playbook.custom];
}

export function activeRules(playbook: PlaybookState): Rule[] {
  const disabled = new Set(playbook.disabled);
  return effectiveRules(playbook).filter((r) => !disabled.has(r.id));
}

/**
 * Runs every active check against the scenario. For checks that carry a
 * benchmark, re-runs the model with only that one value swapped so the
 * reviewer sees how much each assumption moves the answer on its own.
 */
export function runPreflight(inputs: Inputs, rules: Rule[], base: ModelResult = runModel(inputs)): Finding[] {
  const facts = deriveFacts(inputs, base);
  const findings: Finding[] = [];

  for (const rule of rules) {
    if (!ruleFires(rule, facts)) continue;
    const finding: Finding = { rule, message: renderTemplate(rule.message, facts) };
    if (rule.benchmark) {
      const after = runModel(withInput(inputs, rule.benchmark.input, rule.benchmark.value));
      finding.impact = {
        benchmark: rule.benchmark,
        advantageAfter: after.npvAdvantage,
        delta: after.npvAdvantage - base.npvAdvantage,
        flips: after.recommendation !== base.recommendation,
      };
    }
    findings.push(finding);
  }

  return findings.sort(
    (a, b) =>
      SEVERITY_RANK[a.rule.severity] - SEVERITY_RANK[b.rule.severity] ||
      Math.abs(b.impact?.delta ?? 0) - Math.abs(a.impact?.delta ?? 0),
  );
}

/** Applies a set of benchmarks to the inputs. Later entries win on the same input. */
export function applyBenchmarks(inputs: Inputs, findings: Finding[]): Inputs {
  let next = inputs;
  for (const f of findings) {
    if (f.rule.benchmark) next = withInput(next, f.rule.benchmark.input, f.rule.benchmark.value);
  }
  return next;
}

export function newRuleId(existing: Rule[]): string {
  const taken = new Set(existing.map((r) => r.id));
  let n = existing.filter((r) => r.origin === 'team').length + 1;
  while (taken.has(`TEAM-${String(n).padStart(2, '0')}`)) n++;
  return `TEAM-${String(n).padStart(2, '0')}`;
}
