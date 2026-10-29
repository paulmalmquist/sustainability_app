import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { BUILT_IN_RULES } from '../src/engine/builtinRules.ts';
import { deriveFacts } from '../src/engine/facts.ts';
import { fmtPct, fmtUSD } from '../src/engine/format.ts';
import { buildMemo } from '../src/engine/memo.ts';
import { breakEvenEscalation, runModel } from '../src/engine/model.ts';
import { reviewStatus, reviewedInputs } from '../src/engine/review.ts';
import { activeRules, runPreflight } from '../src/engine/rules.ts';
import { EXAMPLE_SCENARIO } from '../src/engine/scenarios.ts';
import { buildSecondLookPrompt, parseSuggestionText, parseSuggestions } from '../src/engine/secondLook.ts';
import { NO_MARKET_DATA, setMarketData, type MarketData } from '../src/engine/marketData.ts';
import { renderSkill, SKILL_NAME } from '../src/engine/skill.ts';
import bundledData from '../src/data/market-data.json' with { type: 'json' };
import type { ReviewState, Rule } from '../src/engine/types.ts';

const rules = activeRules({ custom: [], edits: {}, disabled: [] });
const findings = runPreflight(EXAMPLE_SCENARIO, rules);

describe('formatting', () => {
  it('formats percents and money compactly', () => {
    expect(fmtPct(0.075)).toBe('7.5%');
    expect(fmtPct(0.0275)).toBe('2.75%');
    expect(fmtPct(0.08)).toBe('8%');
    expect(fmtUSD(25131502)).toBe('$25.1M');
    expect(fmtUSD(-350000)).toBe('−$350K');
    expect(fmtUSD(1200, { sign: true })).toBe('+$1.2K');
  });
});

describe('pushback memo', () => {
  it('states the result, the reversal, and the question to ask', () => {
    const review: ReviewState = { decisions: { 'MKT-ESC-HIGH': { disposition: 'use-benchmark', note: '' } } };
    const memo = buildMemo({
      inputs: EXAMPLE_SCENARIO,
      submitted: runModel(EXAMPLE_SCENARIO),
      reviewed: runModel(reviewedInputs(EXAMPLE_SCENARIO, findings, review)),
      findings,
      review,
      status: reviewStatus(EXAMPLE_SCENARIO, findings, review),
      breakEvenEscalation: breakEvenEscalation(EXAMPLE_SCENARIO),
      reviewer: 'A. Reviewer',
    });
    expect(memo).toContain('favors the VPPA, by $25.1M');
    expect(memo).toContain('The recommendation reverses.');
    expect(memo).toContain('Wholesale price escalation far above long-run norms');
    expect(memo).toContain('toward buying RECs and, on its own, reverses the recommendation');
    expect(memo).toContain('What is the source for this escalation rate');
    expect(memo).toContain('3.26%');
    expect(memo.trim().endsWith('A. Reviewer')).toBe(true);
  });
});

describe('Claude skill export', () => {
  it('includes every check, and reviewer-added checks with their author', () => {
    const team: Rule = {
      id: 'TEAM-01',
      title: 'Strike escalator above inflation',
      category: 'Contract terms',
      severity: 'warning',
      when: [{ fact: 'strikeEscalation', op: '>', value: 0.02 }],
      message: 'Strike rises {strikeEscalation} a year.',
      why: 'Escalating strikes erode the hedge.',
      origin: 'team',
      addedBy: 'Mom',
      addedOn: '2026-10-29',
    };
    const md = renderSkill([...BUILT_IN_RULES, team]);
    expect(md.startsWith(`---\nname: ${SKILL_NAME}\n`)).toBe(true);
    for (const r of BUILT_IN_RULES) expect(md).toContain(`#### ${r.id}:`);
    expect(md).toContain('#### TEAM-01: Strike escalator above inflation (warning)');
    expect(md).toContain('**Added by:** Mom, 2026-10-29');
    expect(md).toContain('1 of these were added by reviewers');
  });

  it('matches the checked-in skill file (run npm run export-skill after changing checks)', () => {
    const onDisk = readFileSync(new URL(`../skill/${SKILL_NAME}/SKILL.md`, import.meta.url), 'utf8');
    setMarketData(bundledData as MarketData);
    try {
      expect(onDisk).toBe(renderSkill(BUILT_IN_RULES));
    } finally {
      setMarketData(NO_MARKET_DATA);
    }
  });
});

describe('second look', () => {
  it('builds a prompt that lists what already fired', () => {
    const prompt = buildSecondLookPrompt(deriveFacts(EXAMPLE_SCENARIO), runModel(EXAMPLE_SCENARIO), findings, rules);
    expect(prompt).toContain('wholesaleEscalation = 0.075');
    expect(prompt).toContain('[critical] Wholesale price escalation far above long-run norms');
    expect(prompt).toContain('Reply with only a JSON array');
  });

  it('keeps well-formed suggestions and drops bad conditions', () => {
    const parsed = parseSuggestions([
      {
        title: 'Strike escalator outpaces inflation',
        severity: 'warning',
        why: 'x',
        check: {
          when: [
            { fact: 'strikeEscalation', op: '>', value: '0.025' },
            { fact: 'madeUpFact', op: '>', value: 1 },
            { fact: 'accountingReviewed', op: '==', value: 'false' },
          ],
          benchmark: { input: 'strikeEscalation', value: 0 },
        },
      },
      { title: 'Judgment call', severity: 'urgent', check: null },
      { nope: true },
    ]);
    expect(parsed).toHaveLength(2);
    expect(parsed[0].when).toEqual([
      { fact: 'strikeEscalation', op: '>', value: 0.025 },
      { fact: 'accountingReviewed', op: '==', value: false },
    ]);
    expect(parsed[0].benchmark?.input).toBe('strikeEscalation');
    expect(parsed[1].severity).toBe('info');
    expect(parsed[1].when).toEqual([]);
  });

  it('reads a pasted reply with prose around a fenced block', () => {
    const text = 'Here you go:\n```json\n[{"title":"Basis risk","severity":"info","check":null}]\n```\nHope that helps.';
    expect(parseSuggestionText(text)[0].title).toBe('Basis risk');
    expect(() => parseSuggestionText('no json here')).toThrow();
  });
});
