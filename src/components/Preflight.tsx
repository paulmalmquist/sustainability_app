import { FACT_BY_KEY } from '../engine/facts.ts';
import { formatFact } from '../engine/format.ts';
import { shift } from '../engine/memo.ts';
import { decisionFor, isDecided } from '../engine/review.ts';
import { needsDecision } from '../engine/rules.ts';
import type { Decision, Disposition, Finding, Inputs, ReviewState } from '../engine/types.ts';
import { Segmented, SeverityChip } from './ui.tsx';

interface Props {
  inputs: Inputs;
  findings: Finding[];
  review: ReviewState;
  checksRun: number;
  onDecide: (ruleId: string, decision: Decision) => void;
}

const DECIDED_LABEL: Record<Disposition, string> = {
  open: '',
  'use-benchmark': 'Using benchmark',
  accept: 'Kept, with reason',
  'send-back': 'Sent to owner',
};

function FindingCard({ finding, inputs, decision, onDecide }: { finding: Finding; inputs: Inputs; decision: Decision; onDecide: (d: Decision) => void }) {
  const { rule, impact } = finding;
  const required = needsDecision(rule);
  const decided = isDecided(decision);
  const benchmarkInput = rule.benchmark?.input;
  const current = benchmarkInput ? formatFact(benchmarkInput, inputs[benchmarkInput]) : '';
  const after = rule.benchmark ? formatFact(rule.benchmark.input, rule.benchmark.value) : '';

  const options: { value: Disposition; label: string }[] = [
    ...(rule.benchmark ? [{ value: 'use-benchmark' as const, label: `Use ${after}` }] : []),
    { value: 'accept', label: 'Keep, with reason' },
    { value: 'send-back', label: 'Ask owner' },
  ];

  return (
    <li className="finding" data-sev={rule.severity} data-decided={decided}>
      <div className="finding-head">
        <SeverityChip severity={rule.severity} />
        <span className="finding-title">{rule.title}</span>
        <span className="decision-tag" data-open={!decided}>
          {decided ? `✓ ${DECIDED_LABEL[decision.disposition]}` : required ? 'Needs a decision' : 'Optional'}
        </span>
      </div>
      <p>{finding.message}</p>

      {impact && rule.benchmark ? (
        <div className="impact">
          <span>
            {FACT_BY_KEY[rule.benchmark.input]?.label ?? rule.benchmark.input}: <strong>{current}</strong> → benchmark <strong>{after}</strong>
          </span>
          <span>
            On its own, this moves the result <strong>{shift(impact.delta)}</strong>.
            {impact.flips ? <span className="flip"> ⇄ The recommendation reverses.</span> : null}
          </span>
        </div>
      ) : null}

      <details className="why">
        <summary>Why this matters</summary>
        <p>{rule.why}</p>
        <dl>
          {rule.benchmark ? (
            <>
              <dt>Benchmark</dt>
              <dd>{rule.benchmark.label}</dd>
            </>
          ) : null}
          {rule.ask ? (
            <>
              <dt>Ask</dt>
              <dd>{rule.ask}</dd>
            </>
          ) : null}
          {rule.source ? (
            <>
              <dt>Source</dt>
              <dd>{rule.source}</dd>
            </>
          ) : null}
          {rule.lesson ? (
            <>
              <dt>Origin</dt>
              <dd>{rule.lesson}</dd>
            </>
          ) : null}
          <dt>Check</dt>
          <dd>
            <span className="rule-id">{rule.id}</span>
            {rule.origin === 'team' && rule.addedBy ? ` · added by ${rule.addedBy}` : ''}
          </dd>
        </dl>
      </details>

      <div className="decision">
        <Segmented
          label={`Decision for ${rule.title}`}
          value={decision.disposition}
          options={options}
          onChange={(v) => onDecide({ ...decision, disposition: decision.disposition === v ? 'open' : v })}
        />
        {decision.disposition === 'accept' || decision.disposition === 'send-back' ? (
          <label className="field" htmlFor={`note-${rule.id}`}>
            <span className="field-label">
              {decision.disposition === 'accept' ? 'Why is the submitted value right? (required)' : 'Note for the assumption owner (optional)'}
            </span>
            <textarea
              id={`note-${rule.id}`}
              className="textarea"
              rows={2}
              value={decision.note}
              placeholder={decision.disposition === 'accept' ? 'e.g. Contract has a 2.5% annual escalator, so the gap is smaller than shown.' : ''}
              onChange={(e) => onDecide({ ...decision, note: e.target.value })}
            />
          </label>
        ) : null}
      </div>
    </li>
  );
}

export function Preflight({ inputs, findings, review, checksRun, onDecide }: Props) {
  const count = (sev: string) => findings.filter((f) => f.rule.severity === sev).length;
  const open = findings.filter((f) => needsDecision(f.rule) && !isDecided(decisionFor(review, f.rule.id))).length;

  return (
    <section className="panel" aria-labelledby="preflight-title">
      <div className="panel-head">
        <h2 id="preflight-title">Preflight</h2>
        <span className="sub">
          {checksRun} checks ran before the result was shown
        </span>
      </div>
      <div className="panel-body">
        <div className="tally" aria-live="polite">
          <span>
            <strong>{count('critical')}</strong> critical
          </span>
          <span>
            <strong>{count('warning')}</strong> warnings
          </span>
          <span>
            <strong>{count('info')}</strong> notes
          </span>
          <span>
            <strong>{open}</strong> {open === 1 ? 'decision' : 'decisions'} open
          </span>
        </div>
        {findings.length ? (
          <ul className="findings">
            {findings.map((f) => (
              <FindingCard
                key={f.rule.id}
                finding={f}
                inputs={inputs}
                decision={decisionFor(review, f.rule.id)}
                onDecide={(d) => onDecide(f.rule.id, d)}
              />
            ))}
          </ul>
        ) : (
          <p className="empty">Every check passed. The result below can go straight to sign-off.</p>
        )}
      </div>
    </section>
  );
}
