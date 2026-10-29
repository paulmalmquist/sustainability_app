import { FACT_BY_KEY } from './facts.ts';
import { fmtPct, fmtUSD, formatFact } from './format.ts';
import { decisionFor, type ReviewStatus } from './review.ts';
import type { Finding, Inputs, ModelResult, ReviewState } from './types.ts';

export interface MemoInput {
  inputs: Inputs;
  submitted: ModelResult;
  reviewed: ModelResult;
  findings: Finding[];
  review: ReviewState;
  status: ReviewStatus;
  breakEvenEscalation: number;
  reviewer: string;
}

/** "$41.2M toward RECs" — which way, and how far, a change pushes the answer. */
export function shift(delta: number): string {
  if (Math.abs(delta) < 0.5) return 'by less than $1';
  return `${fmtUSD(Math.abs(delta))} toward ${delta > 0 ? 'the VPPA' : 'buying RECs'}`;
}

function verdict(result: ModelResult): string {
  const winner = result.recommendation === 'VPPA' ? 'the VPPA' : 'buying unbundled RECs';
  return `${winner}, by ${fmtUSD(Math.abs(result.npvAdvantage))} (net present value)`;
}

/**
 * Drafts the note a reviewer sends back to whoever built the model: what
 * was flagged, what each assumption does to the answer, and what to ask.
 */
export function buildMemo(m: MemoInput): string {
  const { inputs, submitted, reviewed, findings, review } = m;
  const term = `${inputs.termYears} years`;
  const lines: string[] = [];
  const owner = inputs.assumptionOwner.trim() || 'team';

  lines.push(`Subject: Assumption questions on "${inputs.scenarioName}"`);
  lines.push('');
  lines.push(`Hi ${owner},`);
  lines.push('');
  lines.push(
    `Before we rely on the VPPA vs. REC comparison, I'd like to resolve a few assumptions. As submitted, the model favors ${verdict(submitted)} over ${term} at a ${fmtPct(inputs.discountRate)} discount rate.`,
  );

  const changed = submitted.npvAdvantage !== reviewed.npvAdvantage;
  if (changed) {
    const flipped = submitted.recommendation !== reviewed.recommendation;
    lines.push(
      `With the benchmark values below, it favors ${verdict(reviewed)}.${flipped ? ' The recommendation reverses.' : ''}`,
    );
  }
  if (Number.isFinite(m.breakEvenEscalation)) {
    lines.push(
      `For reference, the two options cost the same at ${fmtPct(m.breakEvenEscalation)} annual wholesale price escalation (model assumes ${fmtPct(inputs.wholesaleEscalation)}).`,
    );
  }
  lines.push('');

  const questions = findings.filter((f) => {
    const d = decisionFor(review, f.rule.id).disposition;
    return f.rule.severity !== 'info' && (d === 'send-back' || d === 'use-benchmark' || d === 'open');
  });
  const notes = findings.filter((f) => f.rule.severity === 'info' && f.rule.ask);

  if (questions.length) {
    lines.push('Assumptions to resolve');
    lines.push('');
    questions.forEach((f, i) => {
      const fact = f.rule.benchmark ? FACT_BY_KEY[f.rule.benchmark.input] : undefined;
      lines.push(`${i + 1}. ${f.rule.title}`);
      lines.push(`   ${f.message}`);
      if (f.impact && fact) {
        const current = formatFact(fact.key, inputs[f.rule.benchmark!.input]);
        lines.push(
          `   Benchmark: ${f.rule.benchmark!.label}. Using it instead of ${current} moves the result ${shift(f.impact.delta)}${f.impact.flips ? ' and, on its own, reverses the recommendation' : ''}.`,
        );
      }
      lines.push(`   Why it matters: ${f.rule.why}`);
      if (f.rule.ask) lines.push(`   Question: ${f.rule.ask}`);
      const note = decisionFor(review, f.rule.id).note.trim();
      if (note) lines.push(`   Reviewer note: ${note}`);
      if (f.rule.source) lines.push(`   Source: ${f.rule.source}`);
      lines.push('');
    });
  }

  const kept = findings.filter((f) => decisionFor(review, f.rule.id).disposition === 'accept');
  if (kept.length) {
    lines.push('Flagged but kept as submitted');
    lines.push('');
    for (const f of kept) lines.push(`- ${f.rule.title}: ${decisionFor(review, f.rule.id).note.trim()}`);
    lines.push('');
  }

  if (notes.length) {
    lines.push('Smaller items');
    lines.push('');
    for (const f of notes) lines.push(`- ${f.rule.title}. ${f.rule.ask}`);
    lines.push('');
  }

  lines.push(
    'Not captured in either number: the VPPA’s value as a price hedge, its derivative-accounting treatment, and the stronger impact claim that comes from helping finance a new project.',
  );
  lines.push('');
  lines.push('Thanks,');
  lines.push(m.reviewer.trim() || '[Reviewer]');
  if (m.status === 'signed' && review.signOff) {
    lines.push('');
    lines.push(`Reviewed and signed off by ${review.signOff.by} on ${review.signOff.at.slice(0, 10)}.`);
  }
  return lines.join('\n');
}
