import { needsDecision } from './rules.ts';
import { withInput } from './model.ts';
import type { Decision, Finding, Inputs, ReviewState } from './types.ts';

export type ReviewStatus = 'needs-review' | 'ready' | 'signed' | 'stale';

export const OPEN: Decision = { disposition: 'open', note: '' };

export function decisionFor(review: ReviewState, ruleId: string): Decision {
  return review.decisions[ruleId] ?? OPEN;
}

/** A decision is complete when it is not open and a kept value has a reason. */
export function isDecided(decision: Decision): boolean {
  if (decision.disposition === 'open') return false;
  if (decision.disposition === 'accept') return decision.note.trim().length > 0;
  return true;
}

export function openFindings(findings: Finding[], review: ReviewState): Finding[] {
  return findings.filter((f) => needsDecision(f.rule) && !isDecided(decisionFor(review, f.rule.id)));
}

/** The scenario after the reviewer's decisions: benchmarks swapped in where chosen. */
export function reviewedInputs(inputs: Inputs, findings: Finding[], review: ReviewState): Inputs {
  // Findings are ordered most serious first; the first benchmark chosen for an input wins.
  const done = new Set<string>();
  let next = inputs;
  for (const f of findings) {
    const b = f.rule.benchmark;
    if (!b || done.has(b.input) || decisionFor(review, f.rule.id).disposition !== 'use-benchmark') continue;
    done.add(b.input);
    next = withInput(next, b.input, b.value);
  }
  return next;
}

/**
 * A short hash of the inputs and decisions. A sign-off records it, so any
 * later change to an assumption or a decision shows the sign-off as stale.
 */
export function fingerprint(inputs: Inputs, findings: Finding[], review: ReviewState): string {
  const decisions = findings.map((f) => {
    const d = decisionFor(review, f.rule.id);
    return [f.rule.id, d.disposition, d.note.trim()];
  });
  const text = JSON.stringify([inputs, decisions]);
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(16).padStart(8, '0');
}

export function reviewStatus(inputs: Inputs, findings: Finding[], review: ReviewState): ReviewStatus {
  if (openFindings(findings, review).length > 0) return 'needs-review';
  if (!review.signOff) return 'ready';
  return review.signOff.fingerprint === fingerprint(inputs, findings, review) ? 'signed' : 'stale';
}
