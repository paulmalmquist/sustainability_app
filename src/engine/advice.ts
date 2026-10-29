import { FACT_BY_KEY, validateInputs, type InputProblem } from './facts.ts';
import type { Rejected } from './inputs.ts';
import { fmtPct, fmtPerMWh, fmtUSD, formatFact } from './format.ts';
import { shift } from './memo.ts';
import { breakEvenEscalation, breakEvenStrike, runModel, withInput } from './model.ts';
import { decisionFor } from './review.ts';
import { runPreflight } from './rules.ts';
import { sensitivity, type Swing } from './sensitivity.ts';
import type { Finding, Inputs, ModelResult, ReviewState, Rule } from './types.ts';

export type Confidence = 'high' | 'medium' | 'low';

export interface Advice {
  inputs: Inputs;
  assumed: string[];
  findings: Finding[];
  submitted: ModelResult;
  correctedInputs: Inputs;
  corrected: ModelResult;
  /** Findings whose benchmark replaced the submitted value. */
  corrections: Finding[];
  /** Findings whose benchmark lost to a more serious finding on the same input. */
  superseded: Finding[];
  /** Values that can't be right; the advice is not reliable until they're fixed. */
  problems: InputProblem[];
  /** Values the source gave that were outside the possible range and were replaced. */
  rejected: Rejected[];
  /** Needed inputs that were filled in rather than given. */
  assumedCore: string[];
  /** Flagged values a reviewer chose to keep. */
  kept: Finding[];
  /** Things the assumption owner should answer, most important first. */
  questions: Finding[];
  /** Lower-stakes notes, including benchmarks not applied automatically. */
  notes: Finding[];
  reversed: boolean;
  breakEvenStrike: number;
  breakEvenEscalation: number;
  /** Corrected VPPA cost minus REC cost per discounted MWh of output. Positive = VPPA costs more. */
  premiumPerMWh: number;
  /** One-at-a-time swings that would reverse the corrected answer. */
  flips: Swing[];
  confidence: Confidence;
  headline: string;
  summary: string;
}

/**
 * Turns a scenario into a single recommendation. Critical and warning
 * findings that carry a benchmark are corrected automatically, unless a
 * reviewer has decided otherwise; the advice then reports the corrected
 * answer, how sure it is, and what would change it.
 */
export function advise(
  inputs: Inputs,
  rules: Rule[],
  opts: { assumed?: string[]; rejected?: Rejected[]; review?: ReviewState } = {},
): Advice {
  const review = opts.review ?? { decisions: {} };
  const submitted = runModel(inputs);
  const findings = runPreflight(inputs, rules, submitted);

  // Findings arrive most serious first, then largest impact. When two
  // benchmarks target the same input, the first one wins.
  const corrections: Finding[] = [];
  const superseded: Finding[] = [];
  const kept: Finding[] = [];
  const correctedKeys = new Set<string>();
  let correctedInputs = inputs;
  for (const f of findings) {
    const d = decisionFor(review, f.rule.id).disposition;
    if (d === 'accept') {
      kept.push(f);
      continue;
    }
    const auto = f.rule.severity !== 'info' || d === 'use-benchmark';
    if (f.rule.benchmark && auto) {
      if (correctedKeys.has(f.rule.benchmark.input)) {
        superseded.push(f);
        continue;
      }
      correctedKeys.add(f.rule.benchmark.input);
      correctedInputs = withInput(correctedInputs, f.rule.benchmark.input, f.rule.benchmark.value);
      corrections.push(f);
    }
  }
  const problems = validateInputs(inputs);

  const corrected = runModel(correctedInputs);
  const keptIds = new Set(kept.map((f) => f.rule.id));
  const correctedIds = new Set(corrections.map((f) => f.rule.id));
  // Every warning reaches the reader: as a question if it has one, or as its message.
  const questions = findings.filter(
    (f) => f.rule.severity !== 'info' && !keptIds.has(f.rule.id) && (f.rule.ask || !correctedIds.has(f.rule.id)),
  );
  const notes = findings.filter((f) => f.rule.severity === 'info' && !correctedIds.has(f.rule.id));

  const discountedMWh = corrected.rows.reduce((sum, r) => sum + r.generationMWh * r.discountFactor, 0);
  const premiumPerMWh = discountedMWh > 0 ? -corrected.npvAdvantage / discountedMWh : NaN;

  const base = corrected.npvAdvantage;
  const flips = sensitivity(correctedInputs).filter(
    (s) => Math.sign(base + s.lowDelta) !== Math.sign(base) || Math.sign(base + s.highDelta) !== Math.sign(base),
  );
  const assumedCore = [...new Set([...(opts.assumed ?? []), ...(opts.rejected ?? []).map((r) => r.key)])].filter((k) => FACT_BY_KEY[k]?.core);
  let confidence: Confidence = problems.length ? 'low' : flips.length === 0 ? 'high' : flips.length <= 2 ? 'medium' : 'low';
  // An answer built on filled-in numbers is only as good as those numbers.
  if (confidence === 'high' && assumedCore.length) confidence = 'medium';

  const beStrike = breakEvenStrike(correctedInputs);
  const beEsc = breakEvenEscalation(correctedInputs);
  const reversed = submitted.recommendation !== corrected.recommendation;
  const savings = fmtUSD(Math.abs(corrected.npvAdvantage));
  const strike = fmtPerMWh(inputs.strikePrice);

  let headline: string;
  if (corrected.recommendation === 'RECs') {
    headline = `Buy unbundled RECs. At ${strike}, this VPPA costs ${savings} more over ${inputs.termYears} years.`;
  } else {
    headline = `Sign the VPPA. It beats unbundled RECs by ${savings} over ${inputs.termYears} years, even with realistic assumptions.`;
  }

  const parts: string[] = [];
  if (reversed) {
    const top = [...corrections].sort((a, b) => Math.abs(b.impact?.delta ?? 0) - Math.abs(a.impact?.delta ?? 0))[0];
    parts.push(
      `The model as submitted says the opposite (${submitted.recommendation === 'VPPA' ? 'the VPPA' : 'RECs'} by ${fmtUSD(Math.abs(submitted.npvAdvantage))}), mainly because of one assumption: ${top ? top.rule.title.toLowerCase() : 'the corrected values below'}.`,
    );
  } else if (corrections.length) {
    parts.push(`The model as submitted reaches the same answer, by ${fmtUSD(Math.abs(submitted.npvAdvantage))}.`);
  }
  if (corrected.recommendation === 'RECs') {
    if (Number.isFinite(beStrike) && beStrike > 0) parts.push(`The VPPA only beats RECs at a strike below ${fmtPerMWh(beStrike)}.`);
    if (Number.isFinite(premiumPerMWh)) {
      parts.push(
        `At the offered price it costs about ${fmtPerMWh(premiumPerMWh)} more than RECs for each MWh the project produces. That premium buys a long-term price hedge and a stronger claim to adding new renewable capacity; pay it only if those are worth that much to you.`,
      );
    }
  } else {
    if (Number.isFinite(beStrike)) parts.push(`It stays ahead as long as the strike is below ${fmtPerMWh(beStrike)}.`);
    if (Number.isFinite(beEsc)) parts.push(`It needs wholesale prices to rise at least ${fmtPct(beEsc)} a year.`);
  }

  return {
    inputs,
    assumed: opts.assumed ?? [],
    findings,
    submitted,
    correctedInputs,
    corrected,
    corrections,
    superseded,
    problems,
    rejected: opts.rejected ?? [],
    assumedCore,
    kept,
    questions,
    notes,
    reversed,
    breakEvenStrike: beStrike,
    breakEvenEscalation: beEsc,
    premiumPerMWh,
    flips,
    confidence,
    headline,
    summary: parts.join(' '),
  };
}

const CONFIDENCE_TEXT: Record<Confidence, string> = {
  high: 'High: no single assumption, moved across its plausible range, reverses this.',
  medium: 'Medium: one or two assumptions could reverse this if they land at the edge of their range.',
  low: 'Low: several assumptions could reverse this. Firm them up before deciding.',
};

export function confidenceText(a: Advice): string {
  if (a.problems.length) return 'Low: some inputs are outside their possible range, so the numbers can’t be trusted yet. Fix them first.';
  if (!a.flips.length && a.assumedCore.length) {
    const names = a.assumedCore.map((k) => FACT_BY_KEY[k]?.label ?? k).join('; ');
    return `Medium: no single assumption reverses this, but ${a.assumedCore.length === 1 ? 'one needed input was' : `${a.assumedCore.length} needed inputs were`} filled in (${names}). Firm ${a.assumedCore.length === 1 ? 'it' : 'them'} up to raise confidence.`;
  }
  if (!a.flips.length) return CONFIDENCE_TEXT.high;
  return `${CONFIDENCE_TEXT[a.confidence]} Watch: ${a.flips.map((s) => s.label.toLowerCase()).join(', ')}.`;
}

/** What would have to be true for the answer to change. */
export function changeConditions(a: Advice): string[] {
  const out: string[] = [];
  const recs = a.corrected.recommendation === 'RECs';
  if (Number.isFinite(a.breakEvenStrike) && a.breakEvenStrike > 0) {
    out.push(`${recs ? 'A strike below' : 'A strike above'} ${fmtPerMWh(a.breakEvenStrike)} (offered: ${fmtPerMWh(a.inputs.strikePrice)}).`);
  }
  if (Number.isFinite(a.breakEvenEscalation)) {
    out.push(
      `Wholesale prices rising ${recs ? 'faster than' : 'slower than'} ${fmtPct(a.breakEvenEscalation)} a year for the whole term (typical: 2.5–3%).`,
    );
  }
  for (const s of a.flips) {
    const lowFlips = Math.sign(a.corrected.npvAdvantage + s.lowDelta) !== Math.sign(a.corrected.npvAdvantage);
    const value = lowFlips ? s.lowValue : s.highValue;
    out.push(`${s.label} at ${formatFact(s.input, value)} instead of ${formatFact(s.input, a.correctedInputs[s.input])}.`);
  }
  return out;
}

/** The advice as Markdown, for Claude to relay or for a person to paste into an email. */
export function renderAdvice(a: Advice): string {
  const L: string[] = [];
  const owner = a.inputs.assumptionOwner.trim();
  L.push(`# ${a.inputs.scenarioName}`);
  L.push('');
  L.push(`**${a.headline}**`);
  L.push('');
  if (a.summary) {
    L.push(a.summary);
    L.push('');
  }
  L.push(`**Confidence:** ${confidenceText(a)}`);
  L.push('');
  if (a.problems.length) {
    L.push('## Fix these inputs first');
    L.push('');
    for (const p of a.problems) L.push(`- ${p.message} The model has ${formatFact(p.key, p.value)}; check the units.`);
    L.push('');
  }
  L.push('| | As submitted | Corrected |');
  L.push('|---|---|---|');
  L.push(`| Lower-cost option | ${a.submitted.recommendation} | ${a.corrected.recommendation} |`);
  L.push(`| VPPA advantage (NPV, ${a.inputs.termYears} yrs at ${fmtPct(a.inputs.discountRate)}) | ${fmtUSD(a.submitted.npvAdvantage, { sign: true })} | ${fmtUSD(a.corrected.npvAdvantage, { sign: true })} |`);
  L.push(`| Break-even strike | ${fmtPerMWh(breakEvenStrike(a.inputs))} | ${fmtPerMWh(a.breakEvenStrike)} |`);
  L.push(`| Break-even wholesale escalation | ${fmtPct(breakEvenEscalation(a.inputs))} | ${fmtPct(a.breakEvenEscalation)} |`);
  L.push('');

  if (a.corrections.length) {
    L.push('## Assumptions corrected');
    L.push('');
    L.push('| Assumption | Model | Used | Effect on its own |');
    L.push('|---|---|---|---|');
    for (const f of a.corrections) {
      const b = f.rule.benchmark!;
      const label = FACT_BY_KEY[b.input]?.label ?? b.input;
      L.push(
        `| ${label} | ${formatFact(b.input, a.inputs[b.input])} | ${formatFact(b.input, b.value)} | ${shift(f.impact?.delta ?? 0)}${f.impact?.flips ? ' (reverses the answer)' : ''} |`,
      );
    }
    L.push('');
    for (const f of a.corrections) L.push(`- **${f.rule.title}.** ${f.message} ${f.rule.why}${f.rule.source ? ` _Source: ${f.rule.source}._` : ''}`);
    for (const f of a.superseded) {
      L.push(`- _${f.rule.title} suggested ${formatFact(f.rule.benchmark!.input, f.rule.benchmark!.value)}; the more serious check above takes precedence._`);
    }
    L.push('');
  }

  if (a.kept.length) {
    L.push('## Flagged but kept by the reviewer');
    L.push('');
    for (const f of a.kept) L.push(`- **${f.rule.title}.** ${f.message}`);
    L.push('');
  }

  const change = changeConditions(a);
  if (change.length) {
    L.push('## What would change the answer');
    L.push('');
    for (const c of change) L.push(`- ${c}`);
    L.push('');
  }

  if (a.questions.length) {
    L.push(`## Questions for ${owner || 'whoever built the model'}`);
    L.push('');
    a.questions.forEach((f, i) => L.push(`${i + 1}. ${f.rule.ask || f.message} _(${f.rule.title})_`));
    L.push('');
  }

  if (a.notes.length) {
    L.push('## Also worth checking');
    L.push('');
    for (const f of a.notes) {
      const impact = f.impact ? ` Using ${f.rule.benchmark!.label} would move the result ${shift(f.impact.delta)}.` : '';
      L.push(`- **${f.rule.title}.** ${f.message}${impact}`);
    }
    L.push('');
  }

  const firmUp = firmUpList(a);
  if (firmUp.length) {
    L.push('## Filled in for you');
    L.push('');
    for (const item of firmUp) L.push(`- ${item}`);
    L.push('');
  }

  L.push('## Not in the numbers');
  L.push('');
  L.push('- The VPPA’s value as a long-term hedge against rising power prices.');
  L.push('- Earnings volatility if the VPPA is marked to market as a derivative.');
  L.push('- Impact: a VPPA for a new project can claim to add renewable capacity; unbundled RECs rarely can.');
  L.push('');
  return L.join('\n');
}

/** A compact, JSON-safe summary for tools and scripts. */
export function adviceSummary(a: Advice) {
  const brief = (f: Finding) => ({
    id: f.rule.id,
    severity: f.rule.severity,
    title: f.rule.title,
    message: f.message,
    ask: f.rule.ask,
    benchmark: f.rule.benchmark ? { input: f.rule.benchmark.input, value: f.rule.benchmark.value, label: f.rule.benchmark.label } : undefined,
    impact: f.impact ? { delta: Math.round(f.impact.delta), reverses: f.impact.flips } : undefined,
  });
  return {
    headline: a.headline,
    summary: a.summary,
    confidence: a.confidence,
    confidenceText: confidenceText(a),
    recommendation: { submitted: a.submitted.recommendation, corrected: a.corrected.recommendation },
    npvAdvantage: { submitted: Math.round(a.submitted.npvAdvantage), corrected: Math.round(a.corrected.npvAdvantage) },
    breakEvenStrike: Number.isFinite(a.breakEvenStrike) ? Math.round(a.breakEvenStrike * 100) / 100 : null,
    breakEvenEscalation: Number.isFinite(a.breakEvenEscalation) ? Math.round(a.breakEvenEscalation * 10000) / 10000 : null,
    premiumPerMWh: Number.isFinite(a.premiumPerMWh) ? Math.round(a.premiumPerMWh * 100) / 100 : null,
    inputProblems: a.problems.map((p) => p.message),
    rejected: a.rejected,
    corrections: a.corrections.map(brief),
    superseded: a.superseded.map(brief),
    questions: a.questions.map(brief),
    notes: a.notes.map(brief),
    changeConditions: changeConditions(a),
    assumed: a.assumed,
    inputs: a.inputs,
    correctedInputs: a.correctedInputs,
  };
}

/** Assumed or rejected inputs, each with where to get a reliable number. */
export function firmUpList(a: Advice): string[] {
  const out: string[] = [];
  for (const r of a.rejected) {
    const def = FACT_BY_KEY[r.key];
    out.push(
      `${def?.label ?? r.key}: the source gave ${JSON.stringify(r.given)}, which is ${r.reason}, so ${formatFact(r.key, a.inputs[r.key as keyof Inputs] as number)} was used.${def?.source ? ` Get it from: ${def.source}.` : ''}`,
    );
  }
  const rejectedKeys = new Set(a.rejected.map((r) => r.key));
  for (const k of a.assumed) {
    if (rejectedKeys.has(k)) continue;
    const def = FACT_BY_KEY[k];
    out.push(`${def?.label ?? k}: ${formatFact(k, a.inputs[k as keyof Inputs] as number)}.${def?.source ? ` Get it from: ${def.source}.` : ''}`);
  }
  return out;
}
