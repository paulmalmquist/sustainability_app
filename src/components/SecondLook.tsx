import { useEffect, useRef, useState } from 'react';
import { describeCondition } from '../engine/format.ts';
import { parseSuggestionText, parseSuggestions, type Suggestion } from '../engine/secondLook.ts';
import { capability, inClaudeViewer, type SampleFn } from '../runtime.ts';
import { ExportButtons, SeverityChip } from './ui.tsx';

interface Props {
  prompt: string;
  onPromote: (s: Suggestion) => void;
}

const ERROR_COPY: Record<string, string> = {
  not_granted: 'Claude access was declined for this page. Use the copy-and-paste option below instead.',
  sampling_disabled: 'Claude isn’t available on this account. Use the copy-and-paste option below instead.',
  rate_limited: 'Too many requests right now. Wait a minute and try again.',
  invalid_json: 'Claude’s reply wasn’t in the expected format. Try again.',
  refused: 'Claude declined this request.',
  session_expired: 'Your session expired. Sign in again and retry.',
};

export function SecondLook({ prompt, onPromote }: Props) {
  const [sample, setSample] = useState<SampleFn | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[] | null>(null);
  const [pasted, setPasted] = useState('');
  const ctl = useRef<AbortController | null>(null);

  useEffect(() => {
    let live = true;
    if (inClaudeViewer()) capability<SampleFn>('sample').then((s) => live && setSample(() => s));
    return () => {
      live = false;
      ctl.current?.abort();
    };
  }, []);

  const ask = async () => {
    if (!sample) return;
    ctl.current = new AbortController();
    setBusy(true);
    setError('');
    try {
      const raw = await sample.json(prompt, { signal: ctl.current.signal, cache: false });
      setSuggestions(parseSuggestions(raw));
    } catch (e) {
      const code = (e as { code?: string }).code ?? 'upstream_error';
      if (code === 'not_granted' || code === 'sampling_disabled' || code === 'capability_disabled' || code === 'not_declared') setSample(null);
      if (code !== 'cancelled') setError(ERROR_COPY[code] ?? 'Something went wrong reaching Claude. Try again.');
    } finally {
      setBusy(false);
    }
  };

  const readPasted = () => {
    try {
      setSuggestions(parseSuggestionText(pasted));
      setError('');
    } catch {
      setError('That reply has no JSON in it. Paste Claude’s whole answer.');
    }
  };

  return (
    <section className="panel" aria-labelledby="second-look-title">
      <div className="panel-head">
        <h2 id="second-look-title">Second look</h2>
        <span className="sub">for what the checks don’t cover yet</span>
      </div>
      <div className="panel-body">
        <p className="lede small">
          The checklist only knows what reviewers have taught it. Claude can suggest other issues for this deal. Treat
          them as leads: a person verifies each one before it becomes a check.
        </p>

        {sample ? (
          <div className="btn-row">
            <button type="button" className="btn btn-primary" onClick={ask} disabled={busy}>
              {busy ? 'Thinking…' : suggestions ? 'Ask Claude again' : 'Ask Claude what the checks missed'}
            </button>
            {busy ? (
              <button type="button" className="btn" onClick={() => ctl.current?.abort()}>
                Stop
              </button>
            ) : null}
          </div>
        ) : null}

        <details className="disclosure">
          <summary>{sample ? 'Or use Claude in another window' : 'Ask Claude in another window'}</summary>
          <div style={{ display: 'grid', gap: 10 }}>
            <p className="small">Copy the prompt (it includes this scenario and the checks that already ran), paste it into Claude, then paste the reply here.</p>
            <ExportButtons text={prompt} copyLabel="Copy prompt for Claude" />
            <label className="field" htmlFor="pasted-reply">
              <span className="field-label">Claude’s reply</span>
              <textarea id="pasted-reply" className="textarea" rows={3} value={pasted} onChange={(e) => setPasted(e.target.value)} />
            </label>
            <div>
              <button type="button" className="btn" disabled={!pasted.trim()} onClick={readPasted}>
                Read reply
              </button>
            </div>
          </div>
        </details>

        {error ? (
          <p className="small" role="alert">
            {error}
          </p>
        ) : null}

        {suggestions ? (
          suggestions.length ? (
            <ul className="suggestions">
              {suggestions.map((s, i) => (
                <li className="suggestion" key={`${s.title}-${i}`}>
                  <div className="finding-head">
                    <SeverityChip severity={s.severity} />
                    <span className="finding-title">{s.title}</span>
                    <span className="unverified">Unverified</span>
                  </div>
                  {s.why ? <p className="small">{s.why}</p> : null}
                  {s.ask ? (
                    <p className="small">
                      <strong>Ask:</strong> {s.ask}
                    </p>
                  ) : null}
                  <p className="small muted">
                    {s.when.length ? `Proposed check: fires when ${s.when.map(describeCondition).join(' and ')}.` : 'No automatic check proposed; this one needs judgment each time.'}
                  </p>
                  <div className="btn-row">
                    <button type="button" className="btn" onClick={() => onPromote(s)}>
                      Turn into a check
                    </button>
                    <button type="button" className="btn btn-quiet" onClick={() => setSuggestions(suggestions.filter((_, j) => j !== i))}>
                      Dismiss
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty">No new issues suggested.</p>
          )
        ) : null}
      </div>
    </section>
  );
}
