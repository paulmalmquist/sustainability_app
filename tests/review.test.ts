import { describe, expect, it } from 'vitest';
import { runModel } from '../src/engine/model.ts';
import { fingerprint, isDecided, openFindings, reviewStatus, reviewedInputs } from '../src/engine/review.ts';
import { activeRules, runPreflight } from '../src/engine/rules.ts';
import { EXAMPLE_SCENARIO } from '../src/engine/scenarios.ts';
import type { ReviewState } from '../src/engine/types.ts';

const findings = runPreflight(EXAMPLE_SCENARIO, activeRules({ custom: [], edits: {}, disabled: [] }));

function decideAll(): ReviewState {
  const decisions: ReviewState['decisions'] = {};
  for (const f of findings) {
    if (f.rule.severity === 'info') continue;
    decisions[f.rule.id] = f.rule.benchmark ? { disposition: 'use-benchmark', note: '' } : { disposition: 'send-back', note: '' };
  }
  return { decisions };
}

describe('review gate', () => {
  it('starts as a draft with every critical and warning open', () => {
    const review: ReviewState = { decisions: {} };
    expect(reviewStatus(EXAMPLE_SCENARIO, findings, review)).toBe('needs-review');
    expect(openFindings(findings, review).length).toBe(findings.filter((f) => f.rule.severity !== 'info').length);
  });

  it('requires a written reason to keep a flagged value', () => {
    expect(isDecided({ disposition: 'accept', note: '   ' })).toBe(false);
    expect(isDecided({ disposition: 'accept', note: 'Contract escalator matches.' })).toBe(true);
  });

  it('moves to ready, then signed, then stale when an input changes', () => {
    const review = decideAll();
    expect(reviewStatus(EXAMPLE_SCENARIO, findings, review)).toBe('ready');
    const signed: ReviewState = { ...review, signOff: { by: 'Reviewer', at: '2026-10-29T00:00:00Z', fingerprint: fingerprint(EXAMPLE_SCENARIO, findings, review) } };
    expect(reviewStatus(EXAMPLE_SCENARIO, findings, signed)).toBe('signed');
    const changed = { ...EXAMPLE_SCENARIO, strikePrice: 64 };
    expect(reviewStatus(changed, findings, signed)).toBe('stale');
  });

  it('builds the reviewed scenario from the decisions', () => {
    const reviewed = reviewedInputs(EXAMPLE_SCENARIO, findings, decideAll());
    expect(reviewed.wholesaleEscalation).toBe(0.0275);
    expect(reviewed.captureRate).toBe(0.85);
    expect(reviewed.degradation).toBe(0.005);
    expect(reviewed.transactionCost).toBe(0); // info item, left as submitted
    expect(runModel(reviewed).recommendation).toBe('RECs');
  });
});
