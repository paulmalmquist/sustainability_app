import type { ReviewStatus } from '../engine/review.ts';
import type { ReviewState } from '../engine/types.ts';
import { ExportButtons } from './ui.tsx';

interface Props {
  status: ReviewStatus;
  openCount: number;
  review: ReviewState;
  reviewer: string;
  onReviewer: (name: string) => void;
  onSign: () => void;
  onUnsign: () => void;
  memo: string;
}

export function SignOff({ status, openCount, review, reviewer, onReviewer, onSign, onUnsign, memo }: Props) {
  const canSign = (status === 'ready' || status === 'stale') && reviewer.trim().length > 0;

  return (
    <section className="panel" aria-labelledby="signoff-title">
      <div className="panel-head">
        <h2 id="signoff-title">Sign-off & pushback memo</h2>
      </div>
      <div className="panel-body">
        <p className="lede small">
          The checks find and price the problems. A named reviewer decides what to do about each one and owns the result.
        </p>
        <div className="signoff">
          <label className="field" htmlFor="reviewer-name">
            <span className="field-label">Reviewer</span>
            <input
              id="reviewer-name"
              className="input"
              value={reviewer}
              placeholder="Your name"
              onChange={(e) => onReviewer(e.target.value)}
            />
          </label>
          {status === 'signed' ? (
            <button type="button" className="btn" onClick={onUnsign}>
              Withdraw sign-off
            </button>
          ) : (
            <button type="button" className="btn btn-primary" disabled={!canSign} onClick={onSign}>
              {status === 'stale' ? 'Sign again' : 'Sign off on this result'}
            </button>
          )}
        </div>
        <p className="small muted" role="status">
          {status === 'needs-review'
            ? `Sign-off unlocks when all ${openCount} open ${openCount === 1 ? 'decision is' : 'decisions are'} made. Keeping a flagged value needs a written reason.`
            : status === 'signed'
              ? `Signed by ${review.signOff?.by} on ${review.signOff?.at.slice(0, 10)}. Changing any assumption or decision marks this sign-off as out of date.`
              : status === 'stale'
                ? 'Something changed after the last sign-off.'
                : reviewer.trim()
                  ? 'Ready.'
                  : 'Enter your name to sign.'}
        </p>

        <div className="field">
          <span className="field-label">Memo to the assumption owner</span>
          <pre className="memo" tabIndex={0}>
            {memo}
          </pre>
        </div>
        <ExportButtons text={memo} filename="assumption-questions.md" copyLabel="Copy memo" />
      </div>
    </section>
  );
}
