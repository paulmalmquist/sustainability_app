import { useMemo, useState } from 'react';
import { FACTS, FACT_BY_KEY, type FactFormat } from '../engine/facts.ts';
import { describeCondition, formatFact, fromDisplayNumber, toDisplayNumber } from '../engine/format.ts';
import { ruleFires } from '../engine/rules.ts';
import { NUMERIC_INPUT_KEYS } from '../engine/secondLook.ts';
import { CATEGORIES, SEVERITIES, type Category, type Condition, type Facts, type NumericInputKey, type Operator, type Rule, type Severity } from '../engine/types.ts';

interface Props {
  initial: Rule;
  facts: Facts;
  isNew: boolean;
  onSave: (rule: Rule) => void;
  onCancel: () => void;
}

const NUMERIC_OPS: Operator[] = ['>', '>=', '<', '<=', '==', '!=', 'outside', 'between'];
const EQUALITY_OPS: Operator[] = ['==', '!='];
const OP_LABEL: Record<Operator, string> = {
  '>': 'is above',
  '>=': 'is at least',
  '<': 'is below',
  '<=': 'is at most',
  '==': 'is',
  '!=': 'is not',
  outside: 'is outside',
  between: 'is between',
};

function unit(key: string): string {
  const f = FACT_BY_KEY[key]?.format;
  return f === 'pct' ? '%' : f === 'perMWh' ? '$/MWh' : f === 'usd' ? '$' : f === 'mwh' ? 'MWh' : f === 'mw' ? 'MW' : f === 'years' ? 'yrs' : '';
}

function defaultCondition(key: string, facts: Facts): Condition {
  const def = FACT_BY_KEY[key];
  const current = facts[key];
  if (def.format === 'bool') return { fact: key, op: '==', value: false };
  if (def.format === 'text') return { fact: key, op: '==', value: def.options?.[0] ?? '' };
  return { fact: key, op: '>', value: typeof current === 'number' && Number.isFinite(current) ? current : 0 };
}

function NumberBox({ id, value, format, onChange, label }: { id: string; value: number; format: FactFormat; onChange: (n: number) => void; label: string }) {
  const [text, setText] = useState(String(toDisplayNumber(value, format)));
  return (
    <input
      id={id}
      aria-label={label}
      className="input"
      inputMode="decimal"
      value={text}
      onChange={(e) => {
        setText(e.target.value);
        const n = Number(e.target.value.replace(/[,$%\s]/g, ''));
        if (e.target.value.trim() && Number.isFinite(n)) onChange(fromDisplayNumber(n, format));
      }}
    />
  );
}

/** Add or edit a check. Thresholds are entered in the units people use (7.5 for 7.5%). */
export function RuleEditor({ initial, facts, isNew, onSave, onCancel }: Props) {
  const [rule, setRule] = useState<Rule>(initial);
  const [touched, setTouched] = useState(false);
  const set = <K extends keyof Rule>(key: K, value: Rule[K]) => setRule((r) => ({ ...r, [key]: value }));
  const setCond = (i: number, c: Condition) => set('when', rule.when.map((x, j) => (j === i ? c : x)));

  const fires = useMemo(() => ruleFires(rule, facts), [rule, facts]);
  const problems = [
    !rule.title.trim() && 'Give the check a title.',
    !rule.when.length && 'Add at least one condition.',
    !rule.why.trim() && 'Say why it matters, so the next reviewer understands it.',
  ].filter(Boolean) as string[];

  return (
    <section className="panel editor" aria-labelledby="editor-title">
      <div className="panel-head">
        <h2 id="editor-title">{isNew ? 'Add a check' : `Edit ${rule.id}`}</h2>
        <span className="sub">{rule.origin === 'built-in' ? 'Changes apply in this browser; reset any time.' : 'Saved to this browser’s playbook.'}</span>
      </div>
      <form
        className="panel-body"
        onSubmit={(e) => {
          e.preventDefault();
          setTouched(true);
          if (!problems.length) onSave({ ...rule, title: rule.title.trim(), why: rule.why.trim(), message: rule.message.trim() || `${rule.title.trim()}.` });
        }}
      >
        <div className="grid-2">
          <label className="field" htmlFor="r-title" style={{ gridColumn: '1 / -1' }}>
            <span className="field-label">What to check</span>
            <input id="r-title" className="input" value={rule.title} placeholder="e.g. Strike escalator above inflation" onChange={(e) => set('title', e.target.value)} />
          </label>
          <label className="field" htmlFor="r-sev">
            <span className="field-label">Severity</span>
            <select id="r-sev" className="select" value={rule.severity} onChange={(e) => set('severity', e.target.value as Severity)}>
              {SEVERITIES.map((s) => (
                <option key={s} value={s}>
                  {s === 'critical' ? 'Critical: blocks sign-off until decided' : s === 'warning' ? 'Warning: needs a decision' : 'Note: informational'}
                </option>
              ))}
            </select>
          </label>
          <label className="field" htmlFor="r-cat">
            <span className="field-label">Category</span>
            <select id="r-cat" className="select" value={rule.category} onChange={(e) => set('category', e.target.value as Category)}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
        </div>

        <fieldset className="field" style={{ border: 0, padding: 0, margin: 0, display: 'grid', gap: 8 }}>
          <legend className="field-label" style={{ marginBottom: 6 }}>
            Fires when all of these are true
          </legend>
          {rule.when.map((c, i) => {
            const def = FACT_BY_KEY[c.fact];
            const ops = def?.format === 'bool' || def?.format === 'text' ? EQUALITY_OPS : NUMERIC_OPS;
            const ranged = c.op === 'outside' || c.op === 'between';
            return (
              <div className="cond-row" key={i}>
                <label className="field" htmlFor={`c-fact-${i}`}>
                  <span className="field-help">Value (now {formatFact(c.fact, facts[c.fact])})</span>
                  <select id={`c-fact-${i}`} className="select" value={c.fact} onChange={(e) => setCond(i, defaultCondition(e.target.value, facts))}>
                    <optgroup label="Assumptions">
                      {FACTS.filter((f) => f.kind === 'input').map((f) => (
                        <option key={f.key} value={f.key}>
                          {f.label}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Calculated">
                      {FACTS.filter((f) => f.kind === 'derived').map((f) => (
                        <option key={f.key} value={f.key}>
                          {f.label}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </label>
                <label className="field" htmlFor={`c-op-${i}`}>
                  <span className="field-help">Test</span>
                  <select
                    id={`c-op-${i}`}
                    className="select"
                    value={c.op}
                    onChange={(e) => {
                      const op = e.target.value as Operator;
                      const now = typeof facts[c.fact] === 'number' ? (facts[c.fact] as number) : 0;
                      const value = op === 'outside' || op === 'between' ? (Array.isArray(c.value) ? c.value : ([now, now] as [number, number])) : Array.isArray(c.value) ? c.value[0] : c.value;
                      setCond(i, { ...c, op, value });
                    }}
                  >
                    {ops.map((o) => (
                      <option key={o} value={o}>
                        {OP_LABEL[o]}
                      </option>
                    ))}
                  </select>
                </label>
                <div className="field">
                  <span className="field-help">Threshold {unit(c.fact) ? `(${unit(c.fact)})` : ''}</span>
                  {def?.format === 'bool' ? (
                    <select aria-label="Threshold" className="select" value={String(c.value)} onChange={(e) => setCond(i, { ...c, value: e.target.value === 'true' })}>
                      <option value="false">no</option>
                      <option value="true">yes</option>
                    </select>
                  ) : def?.format === 'text' ? (
                    <select aria-label="Threshold" className="select" value={String(c.value)} onChange={(e) => setCond(i, { ...c, value: e.target.value })}>
                      {def.options?.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  ) : ranged && Array.isArray(c.value) ? (
                    <div className="grid-2" key={`${c.fact}-${c.op}`}>
                      <NumberBox id={`c-lo-${i}`} label="Low" value={c.value[0]} format={def.format} onChange={(n) => setCond(i, { ...c, value: [n, (c.value as [number, number])[1]] })} />
                      <NumberBox id={`c-hi-${i}`} label="High" value={c.value[1]} format={def.format} onChange={(n) => setCond(i, { ...c, value: [(c.value as [number, number])[0], n] })} />
                    </div>
                  ) : (
                    <NumberBox key={`${c.fact}-${c.op}`} id={`c-val-${i}`} label="Threshold" value={Number(c.value)} format={def?.format ?? 'usd'} onChange={(n) => setCond(i, { ...c, value: n })} />
                  )}
                </div>
                <button type="button" className="btn btn-quiet" aria-label="Remove condition" onClick={() => set('when', rule.when.filter((_, j) => j !== i))}>
                  Remove
                </button>
              </div>
            );
          })}
          <div>
            <button type="button" className="btn" onClick={() => set('when', [...rule.when, defaultCondition('wholesaleEscalation', facts)])}>
              Add condition
            </button>
          </div>
        </fieldset>

        <p className="preview-line" role="status">
          {rule.when.length ? (
            <>
              {rule.when.map(describeCondition).join(' and ')}.{' '}
              <strong>{fires ? 'This check fires on the current scenario.' : 'It does not fire on the current scenario.'}</strong>
            </>
          ) : (
            'No conditions yet.'
          )}
        </p>

        <label className="field" htmlFor="r-message">
          <span className="field-label">Message when it fires</span>
          <input id="r-message" className="input" value={rule.message} onChange={(e) => set('message', e.target.value)} />
          <span className="field-help">Use {'{factName}'} to insert a value, e.g. {'{strikeEscalation}'}.</span>
        </label>
        <label className="field" htmlFor="r-why">
          <span className="field-label">Why it matters</span>
          <textarea id="r-why" className="textarea" rows={3} value={rule.why} onChange={(e) => set('why', e.target.value)} />
        </label>
        <label className="field" htmlFor="r-ask">
          <span className="field-label">Question for the assumption owner</span>
          <input id="r-ask" className="input" value={rule.ask ?? ''} onChange={(e) => set('ask', e.target.value)} />
        </label>

        <div className="grid-2">
          <label className="field" htmlFor="r-bench-input">
            <span className="field-label">Benchmark to test against (optional)</span>
            <select
              id="r-bench-input"
              className="select"
              value={rule.benchmark?.input ?? ''}
              onChange={(e) => {
                const input = e.target.value as NumericInputKey | '';
                set('benchmark', input ? { input, value: typeof facts[input] === 'number' ? (facts[input] as number) : 0, label: '' } : undefined);
              }}
            >
              <option value="">None</option>
              {NUMERIC_INPUT_KEYS.map((k) => (
                <option key={k} value={k}>
                  {FACT_BY_KEY[k].label}
                </option>
              ))}
            </select>
          </label>
          {rule.benchmark ? (
            <div className="field">
              <span className="field-label">Benchmark value {unit(rule.benchmark.input) ? `(${unit(rule.benchmark.input)})` : ''}</span>
              <NumberBox
                key={rule.benchmark.input}
                id="r-bench-value"
                label="Benchmark value"
                value={rule.benchmark.value}
                format={FACT_BY_KEY[rule.benchmark.input].format}
                onChange={(n) => rule.benchmark && set('benchmark', { ...rule.benchmark, value: n })}
              />
            </div>
          ) : null}
          {rule.benchmark ? (
            <label className="field" htmlFor="r-bench-label" style={{ gridColumn: '1 / -1' }}>
              <span className="field-label">Benchmark description</span>
              <input
                id="r-bench-label"
                className="input"
                value={rule.benchmark.label}
                placeholder="e.g. Flat strike, as in most current offers"
                onChange={(e) => rule.benchmark && set('benchmark', { ...rule.benchmark, label: e.target.value })}
              />
            </label>
          ) : null}
        </div>

        <div className="grid-2">
          <label className="field" htmlFor="r-source">
            <span className="field-label">Source</span>
            <input id="r-source" className="input" value={rule.source ?? ''} placeholder="Report, index, or ‘reviewer judgment’" onChange={(e) => set('source', e.target.value)} />
          </label>
          <label className="field" htmlFor="r-by">
            <span className="field-label">Added by</span>
            <input id="r-by" className="input" value={rule.addedBy ?? ''} onChange={(e) => set('addedBy', e.target.value)} />
          </label>
        </div>
        <label className="field" htmlFor="r-lesson">
          <span className="field-label">What happened (optional)</span>
          <textarea
            id="r-lesson"
            className="textarea"
            rows={2}
            value={rule.lesson ?? ''}
            placeholder="The review where this was caught, so the next person knows why the check exists."
            onChange={(e) => set('lesson', e.target.value)}
          />
        </label>

        {touched && problems.length ? (
          <ul className="small" role="alert" style={{ margin: 0, color: 'var(--critical)' }}>
            {problems.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        ) : null}

        <div className="btn-row">
          <button type="submit" className="btn btn-primary">
            {isNew ? 'Add to playbook' : 'Save check'}
          </button>
          <button type="button" className="btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}
