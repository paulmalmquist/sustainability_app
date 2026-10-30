import { useEffect, useRef, useState } from 'react';
import { changeConditions, confidenceText, firmUpList, renderAdvice, type Advice } from '../engine/advice.ts';
import { FACTS, FACT_BY_KEY } from '../engine/facts.ts';
import { fmtPerMWh, fmtUSD, formatFact } from '../engine/format.ts';
import { readAssumptions, type ReadLine } from '../engine/inputs.ts';
import { shift } from '../engine/memo.ts';
import type { Inputs } from '../engine/types.ts';
import { marketData } from '../engine/marketData.ts';
import { capability, inClaudeViewer, type SampleFn } from '../runtime.ts';
import { ExportButtons } from './ui.tsx';

interface Props {
  advice: Advice;
  onRead: (values: Record<string, unknown>) => void;
  onExample: () => void;
  onOpenReview: () => void;
}

const PLACEHOLDER = `Paste the assumptions from your model, one per line. For example:

Technology	Solar
Market	PJM
Project size (MW)	80
Capacity factor	24%
PPA price ($/MWh)	63
Contract term	15 years
Year 1 hub price ($/MWh)	48
Wholesale price inflation	7.5%
REC price ($/MWh)	4.50
Annual load (MWh)	180,000
Discount rate	8%`;

function extractionPrompt(text: string): string {
  const keys = FACTS.filter((f) => f.kind === 'input')
    .map((f) => `- ${f.key}: ${f.label} (${f.format === 'pct' ? 'fraction, 0.075 = 7.5%' : f.format === 'bool' ? 'true/false' : f.options ? f.options.join(' | ') : f.format})`)
    .join('\n');
  return [
    'Extract the assumptions of a VPPA vs. unbundled REC financial model from the text below.',
    'Reply with only one JSON object using any of these keys. Leave out keys the text does not state; do not guess.',
    keys,
    '- annualGenerationMWh: annual generation in MWh, if given instead of a capacity factor',
    '- scenarioName, assumptionOwner: text',
    '',
    'Text:',
    text.slice(0, 20000),
  ].join('\n');
}

function lineLabel(l: ReadLine): string {
  if (!l.key) return '';
  if (l.key === 'annualGenerationMWh') return `Annual generation = ${Number(l.value).toLocaleString('en-US')} MWh`;
  const def = FACT_BY_KEY[l.key];
  return `${def?.label ?? l.key} = ${typeof l.value === 'number' ? formatFact(l.key, l.value) : String(l.value)}`;
}

export function AdviceView({ advice, onRead, onExample, onOpenReview }: Props) {
  const [text, setText] = useState('');
  const [lines, setLines] = useState<ReadLine[] | null>(null);
  const [sample, setSample] = useState<SampleFn | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const ctl = useRef<AbortController | null>(null);

  useEffect(() => {
    let live = true;
    if (inClaudeViewer()) capability<SampleFn>('sample').then((s) => live && setSample(() => s));
    return () => {
      live = false;
      ctl.current?.abort();
    };
  }, []);

  const read = () => {
    const r = readAssumptions(text);
    const found = r.lines.filter((l) => l.key).length;
    if (!found) {
      setError('No assumptions recognized. Put one per line, with the label first and the value after it.');
      setLines(r.lines);
      return;
    }
    setError('');
    setLines(r.lines);
    onRead(r.values);
  };

  const readWithClaude = async () => {
    if (!sample) return;
    ctl.current = new AbortController();
    setBusy(true);
    setError('');
    try {
      const values = await sample.json<Record<string, unknown>>(extractionPrompt(text), { signal: ctl.current.signal, cache: false });
      if (!values || typeof values !== 'object' || Array.isArray(values)) throw { code: 'invalid_json' };
      setLines(Object.entries(values).map(([key, value]) => ({ text: key, key, value: value as number | string })));
      onRead(values);
    } catch (e) {
      const code = (e as { code?: string }).code;
      if (code === 'not_granted' || code === 'sampling_disabled') setSample(null);
      if (code !== 'cancelled') setError('Claude couldn’t read that. Try “Read assumptions” instead.');
    } finally {
      setBusy(false);
    }
  };

  const a = advice;
  const i: Inputs = a.inputs;
  const recs = a.corrected.recommendation === 'RECs';
  const change = changeConditions(a);
  const owner = i.assumptionOwner.trim();

  return (
    <div className="advice">
      <section className="panel" aria-labelledby="paste-title">
        <div className="panel-head">
          <h2 id="paste-title">Your model</h2>
          <span className="sub">
            {i.scenarioName} · {i.technology} · {i.market} · {fmtPerMWh(i.strikePrice)} strike · {i.termYears} years
          </span>
        </div>
        <div className="panel-body">
          <label className="field" htmlFor="paste-box">
            <span className="field-label">Paste assumptions from a spreadsheet, memo, or email</span>
            <textarea
              id="paste-box"
              className="textarea paste"
              rows={6}
              value={text}
              placeholder={PLACEHOLDER}
              onChange={(e) => setText(e.target.value)}
            />
          </label>
          <div className="btn-row">
            <button type="button" className="btn btn-primary" disabled={!text.trim() || busy} onClick={read}>
              Read assumptions
            </button>
            {sample ? (
              <button type="button" className="btn" disabled={!text.trim() || busy} onClick={readWithClaude}>
                {busy ? 'Reading…' : 'Read with Claude'}
              </button>
            ) : null}
            <button type="button" className="btn btn-quiet" onClick={onExample}>
              Use the 7.5% example
            </button>
          </div>
          {error ? (
            <p className="small" role="alert">
              {error}
            </p>
          ) : null}
          {lines ? (
            <details className="disclosure" open={lines.some((l) => !l.key)}>
              <summary>
                Read {lines.filter((l) => l.key).length} of {lines.length} lines
              </summary>
              <ul className="read-lines">
                {lines.map((l, n) => (
                  <li key={n} data-matched={!!l.key}>
                    <span className="read-src">{l.text}</span>
                    <span className="read-arrow" aria-hidden="true">
                      →
                    </span>
                    <span>{l.key ? lineLabel(l) : 'not used'}</span>
                  </li>
                ))}
              </ul>
              <p className="small muted">Adjust any value in Detailed review.</p>
            </details>
          ) : null}
        </div>
      </section>

      <section className="panel advice-card" aria-labelledby="advice-title">
        <div className="panel-body advice-body">
          <div className="advice-eyebrow">
            <span className="hero-label">Advice</span>
            <span className="confidence" data-level={a.confidence}>
              {a.confidence === 'high' ? 'High confidence' : a.confidence === 'medium' ? 'Medium confidence' : 'Low confidence'}
            </span>
          </div>
          <h2 id="advice-title" className="advice-headline">
            {a.headline}
          </h2>
          {a.summary ? <p className="advice-summary">{a.summary}</p> : null}
          <p className="small muted">{confidenceText(a)}</p>

          {a.problems.length ? (
            <div className="advice-section problems" role="alert">
              <h3>Fix these inputs first</h3>
              <ul className="advice-list">
                {a.problems.map((p) => (
                  <li key={p.key}>
                    {p.message} The model has {formatFact(p.key, p.value)}; check the units.
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="advice-figures">
            <div className="stat">
              <span className="stat-label">Corrected result (NPV)</span>
              <span className="stat-value">
                {recs ? 'RECs' : 'VPPA'} by {fmtUSD(Math.abs(a.corrected.npvAdvantage))}
              </span>
              <span className="stat-label">
                As submitted: {a.submitted.recommendation === 'RECs' ? 'RECs' : 'VPPA'} by {fmtUSD(Math.abs(a.submitted.npvAdvantage))}
              </span>
            </div>
            <div className="stat">
              <span className="stat-label">{recs ? 'VPPA wins below' : 'VPPA wins up to'}</span>
              <span className="stat-value">{Number.isFinite(a.breakEvenStrike) ? fmtPerMWh(a.breakEvenStrike) : '—'}</span>
              <span className="stat-label">strike, offered {fmtPerMWh(i.strikePrice)}</span>
            </div>
            <div className="stat">
              <span className="stat-label">{a.premiumPerMWh > 0 ? 'VPPA premium over RECs' : 'VPPA saving over RECs'}</span>
              <span className="stat-value">{Number.isFinite(a.premiumPerMWh) ? fmtPerMWh(Math.abs(a.premiumPerMWh)) : '—'}</span>
              <span className="stat-label">per MWh of project output</span>
            </div>
          </div>

          {a.corrections.length ? (
            <div className="advice-section">
              <h3>Assumptions corrected</h3>
              <div className="table-scroll">
                <table className="compare">
                  <thead>
                    <tr>
                      <th scope="col">Assumption</th>
                      <th scope="col">Model</th>
                      <th scope="col">Used</th>
                      <th scope="col">Effect on its own</th>
                    </tr>
                  </thead>
                  <tbody>
                    {a.corrections.map((f) => {
                      const b = f.rule.benchmark!;
                      return (
                        <tr key={f.rule.id}>
                          <th scope="row">{FACT_BY_KEY[b.input]?.label ?? b.input}</th>
                          <td className="col-submitted">{formatFact(b.input, i[b.input])}</td>
                          <td>{formatFact(b.input, b.value)}</td>
                          <td>
                            {shift(f.impact?.delta ?? 0)}
                            {f.impact?.flips ? <span className="flip"> ⇄ reverses</span> : null}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <ul className="advice-list">
                {a.corrections.map((f) => (
                  <li key={f.rule.id}>
                    <strong>{f.rule.title}.</strong> {f.message} <span className="muted">{f.rule.why}</span>
                  </li>
                ))}
                {a.superseded.map((f) => (
                  <li key={f.rule.id} className="muted">
                    {f.rule.title} suggested {formatFact(f.rule.benchmark!.input, f.rule.benchmark!.value)}; the more serious check above takes precedence.
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="advice-section">No assumption needed correcting. The model’s own numbers stand.</p>
          )}

          {a.kept.length ? (
            <div className="advice-section">
              <h3>Flagged but kept by the reviewer</h3>
              <ul className="advice-list">
                {a.kept.map((f) => (
                  <li key={f.rule.id}>
                    <strong>{f.rule.title}.</strong> {f.message}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {change.length ? (
            <div className="advice-section">
              <h3>What would change the answer</h3>
              <ul className="advice-list">
                {change.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {a.questions.length ? (
            <div className="advice-section">
              <h3>Questions for {owner || 'whoever built the model'}</h3>
              <ol className="advice-list">
                {a.questions.map((f) => (
                  <li key={f.rule.id}>
                    {f.rule.ask || f.message} <span className="muted">({f.rule.title})</span>
                  </li>
                ))}
              </ol>
            </div>
          ) : null}

          {a.notes.length ? (
            <div className="advice-section">
              <h3>Also worth checking</h3>
              <ul className="advice-list">
                {a.notes.map((f) => (
                  <li key={f.rule.id}>
                    <strong>{f.rule.title}.</strong> {f.message}
                    {f.impact && f.rule.benchmark ? ` Using ${f.rule.benchmark.label} would move the result ${shift(f.impact.delta)}.` : ''}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {a.assumed.length || a.rejected.length ? (
            <div className="advice-section">
              <h3>Filled in for you</h3>
              <ul className="advice-list">
                {firmUpList(a).map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {marketData().generatedAt ? (
            <p className="small muted">
              Benchmarks use public market data refreshed {marketData().generatedAt!.slice(0, 10)} (inflation, interest rates,
              cost of capital, grid prices, solar and wind output). Sources are under How it works.
            </p>
          ) : null}

          <p className="leaves-out">
            <strong>Not in the numbers:</strong> the VPPA’s value as a long-term price hedge, earnings volatility if it is
            marked to market, and the stronger impact claim that comes from helping finance a new project.
          </p>

          <ExportButtons text={() => renderAdvice(a)} filename="advice.md" copyLabel="Copy advice">
            <button type="button" className="btn btn-quiet" onClick={onOpenReview}>
              Open the detailed review →
            </button>
          </ExportButtons>
        </div>
      </section>
    </div>
  );
}
