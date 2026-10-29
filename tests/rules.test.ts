import { describe, expect, it } from 'vitest';
import { BUILT_IN_RULES } from '../src/engine/builtinRules.ts';
import { deriveFacts, FACT_BY_KEY } from '../src/engine/facts.ts';
import { runModel } from '../src/engine/model.ts';
import { activeRules, applyBenchmarks, evaluateCondition, newRuleId, ruleFires, runPreflight } from '../src/engine/rules.ts';
import { BENCHMARK_SCENARIO, EXAMPLE_SCENARIO } from '../src/engine/scenarios.ts';
import type { PlaybookState, Rule } from '../src/engine/types.ts';

const empty: PlaybookState = { custom: [], edits: {}, disabled: [] };

describe('evaluateCondition', () => {
  const facts = { a: 0.05, flag: false, tech: 'solar', bad: NaN };
  it('handles each operator', () => {
    expect(evaluateCondition({ fact: 'a', op: '>', value: 0.04 }, facts)).toBe(true);
    expect(evaluateCondition({ fact: 'a', op: '>', value: 0.05 }, facts)).toBe(false);
    expect(evaluateCondition({ fact: 'a', op: '>=', value: 0.05 }, facts)).toBe(true);
    expect(evaluateCondition({ fact: 'a', op: '==', value: 0.05 }, facts)).toBe(true);
    expect(evaluateCondition({ fact: 'a', op: 'between', value: [0.04, 0.06] }, facts)).toBe(true);
    expect(evaluateCondition({ fact: 'a', op: 'outside', value: [0.04, 0.06] }, facts)).toBe(false);
    expect(evaluateCondition({ fact: 'a', op: 'outside', value: [0.06, 0.08] }, facts)).toBe(true);
    expect(evaluateCondition({ fact: 'flag', op: '==', value: false }, facts)).toBe(true);
    expect(evaluateCondition({ fact: 'tech', op: '!=', value: 'wind' }, facts)).toBe(true);
  });
  it('never fires on missing or NaN values', () => {
    expect(evaluateCondition({ fact: 'missing', op: '>', value: 0 }, facts)).toBe(false);
    expect(evaluateCondition({ fact: 'bad', op: '<', value: 1 }, facts)).toBe(false);
    expect(evaluateCondition({ fact: 'bad', op: 'outside', value: [0, 1] }, facts)).toBe(false);
  });
});

describe('built-in playbook', () => {
  it('only references known facts and numeric inputs', () => {
    const ids = new Set<string>();
    for (const r of BUILT_IN_RULES) {
      expect(ids.has(r.id), `duplicate id ${r.id}`).toBe(false);
      ids.add(r.id);
      for (const c of r.when) expect(FACT_BY_KEY[c.fact], `${r.id} uses ${c.fact}`).toBeDefined();
      if (r.benchmark) expect(FACT_BY_KEY[r.benchmark.input]?.kind).toBe('input');
      for (const m of r.message.matchAll(/\{(\w+)\}/g)) expect(FACT_BY_KEY[m[1]], `${r.id} message uses ${m[1]}`).toBeDefined();
    }
  });
});

describe('runPreflight on the 7.5% example', () => {
  const findings = runPreflight(EXAMPLE_SCENARIO, activeRules(empty));
  const byId = Object.fromEntries(findings.map((f) => [f.rule.id, f]));

  it('favors the VPPA as submitted', () => {
    expect(runModel(EXAMPLE_SCENARIO).recommendation).toBe('VPPA');
  });

  it('flags the escalation rate as critical and shows it reverses the answer', () => {
    const esc = byId['MKT-ESC-HIGH'];
    expect(esc.rule.severity).toBe('critical');
    expect(esc.message).toContain('7.5%');
    expect(esc.message).toContain('2.75×');
    expect(esc.impact?.flips).toBe(true);
    expect(esc.impact!.delta).toBeLessThan(-20e6);
    expect(findings[0].rule.id).toBe('MKT-ESC-HIGH');
  });

  it('catches the quieter problems that travel with it', () => {
    for (const id of ['MKT-CAPTURE-SOLAR', 'PRJ-NO-DEGRADATION', 'CTR-NO-TXN-COST', 'RES-LATE-VALUE', 'CTR-NEGATIVE-PRICES']) {
      expect(byId[id], id).toBeDefined();
    }
  });

  it('favors RECs once every benchmark is applied', () => {
    expect(runModel(applyBenchmarks(EXAMPLE_SCENARIO, findings)).recommendation).toBe('RECs');
  });

  it('raises nothing that needs a decision on the benchmark version', () => {
    const clean = runPreflight(BENCHMARK_SCENARIO, activeRules(empty));
    expect(clean.filter((f) => f.rule.severity !== 'info')).toEqual([]);
  });
});

describe('playbook state', () => {
  it('skips disabled checks and uses edited thresholds', () => {
    const disabled = runPreflight(EXAMPLE_SCENARIO, activeRules({ ...empty, disabled: ['MKT-ESC-HIGH'] }));
    expect(disabled.some((f) => f.rule.id === 'MKT-ESC-HIGH')).toBe(false);

    const original = BUILT_IN_RULES.find((r) => r.id === 'MKT-ESC-HIGH')!;
    const loosened: Rule = { ...original, when: [{ fact: 'wholesaleEscalation', op: '>', value: 0.08 }] };
    const edited = runPreflight(EXAMPLE_SCENARIO, activeRules({ ...empty, edits: { 'MKT-ESC-HIGH': loosened } }));
    expect(edited.some((f) => f.rule.id === 'MKT-ESC-HIGH')).toBe(false);
  });

  it('runs a reviewer-added check exactly like a built-in one', () => {
    const twist: Rule = {
      id: 'TEAM-01',
      title: 'Strike escalator above inflation',
      category: 'Contract terms',
      severity: 'warning',
      when: [{ fact: 'strikeEscalation', op: '>', value: 0.02 }],
      message: 'Strike rises {strikeEscalation} a year.',
      why: 'Escalating strikes erode the hedge.',
      benchmark: { input: 'strikeEscalation', value: 0, label: 'flat strike' },
      origin: 'team',
      addedBy: 'Reviewer',
    };
    const scenario = { ...EXAMPLE_SCENARIO, strikeEscalation: 0.03 };
    expect(ruleFires(twist, deriveFacts(scenario))).toBe(true);
    const found = runPreflight(scenario, activeRules({ ...empty, custom: [twist] })).find((f) => f.rule.id === 'TEAM-01');
    expect(found?.message).toBe('Strike rises 3% a year.');
    expect(found?.impact?.delta).toBeGreaterThan(0);
  });

  it('numbers new team checks without collisions', () => {
    const rules = activeRules({ ...empty, custom: [{ ...BUILT_IN_RULES[0], id: 'TEAM-01', origin: 'team' }] });
    expect(newRuleId(rules)).toBe('TEAM-02');
  });
});
