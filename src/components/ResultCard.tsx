import { fmtPct, fmtPerMWh, fmtUSD } from '../engine/format.ts';
import type { ReviewStatus } from '../engine/review.ts';
import type { Inputs, ModelResult, ReviewState } from '../engine/types.ts';

interface Props {
  inputs: Inputs;
  submitted: ModelResult;
  reviewed: ModelResult;
  status: ReviewStatus;
  openCount: number;
  review: ReviewState;
  breakEven: { submittedEsc: number; reviewedEsc: number; submittedStrike: number; reviewedStrike: number };
}

const winnerName = (r: ModelResult) => (r.recommendation === 'VPPA' ? 'VPPA' : 'Unbundled RECs');

function banner(status: ReviewStatus, openCount: number, review: ReviewState): string {
  switch (status) {
    case 'needs-review':
      return `Draft. ${openCount} flagged ${openCount === 1 ? 'assumption needs' : 'assumptions need'} a decision before this result can be signed.`;
    case 'ready':
      return 'All flags decided. Ready for sign-off.';
    case 'stale':
      return 'Assumptions or decisions changed after sign-off. Sign again to confirm.';
    case 'signed':
      return `Signed off by ${review.signOff?.by} on ${review.signOff?.at.slice(0, 10)}.`;
  }
}

export function ResultCard({ inputs, submitted, reviewed, status, openCount, review, breakEven }: Props) {
  const flipped = submitted.recommendation !== reviewed.recommendation;
  const same = Math.abs(submitted.npvAdvantage - reviewed.npvAdvantage) < 1;
  const savings = Math.abs(reviewed.npvAdvantage);

  return (
    <section className="panel" aria-labelledby="result-title">
      <div className="panel-head">
        <h2 id="result-title">Result</h2>
        <span className="sub">
          NPV over {inputs.termYears} years at {fmtPct(inputs.discountRate)}
        </span>
      </div>
      <div className="panel-body">
        <div className="result-banner" data-status={status} role="status">
          {banner(status, openCount, review)}
        </div>

        <div className="hero">
          <span className="hero-label">
            {same ? (status === 'needs-review' ? 'Lower-cost option, as submitted (unreviewed)' : 'Lower-cost option') : 'After review, lower-cost option'}
          </span>
          <span className="hero-figure">
            {winnerName(reviewed)} by {fmtUSD(savings)}
          </span>
          <p className="hero-sub">
            {flipped
              ? `As submitted, the model favored the ${submitted.recommendation === 'VPPA' ? 'VPPA' : 'REC purchase'} by ${fmtUSD(Math.abs(submitted.npvAdvantage))}. The benchmark choices you made reverse it.`
              : same
                ? 'No benchmark values have been applied yet. Decide the flags above to see the reviewed result.'
                : `As submitted: ${winnerName(submitted)} by ${fmtUSD(Math.abs(submitted.npvAdvantage))}.`}
          </p>
        </div>

        <div className="table-scroll">
          <table className="compare">
            <thead>
              <tr>
                <th scope="col" />
                <th scope="col">As submitted</th>
                <th scope="col">After review</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Lower-cost option</th>
                <td className="col-submitted">{winnerName(submitted)}</td>
                <td className="winner">{winnerName(reviewed)}</td>
              </tr>
              <tr>
                <th scope="row">VPPA advantage (NPV)</th>
                <td className="col-submitted">{fmtUSD(submitted.npvAdvantage, { sign: true })}</td>
                <td>{fmtUSD(reviewed.npvAdvantage, { sign: true })}</td>
              </tr>
              <tr>
                <th scope="row">VPPA net cost (NPV)</th>
                <td className="col-submitted">{fmtUSD(submitted.npvVppaCost)}</td>
                <td>{fmtUSD(reviewed.npvVppaCost)}</td>
              </tr>
              <tr>
                <th scope="row">REC purchases (NPV)</th>
                <td className="col-submitted">{fmtUSD(submitted.npvRecCost)}</td>
                <td>{fmtUSD(reviewed.npvRecCost)}</td>
              </tr>
              <tr>
                <th scope="row">VPPA settlements, total</th>
                <td className="col-submitted">{fmtUSD(submitted.totalSettlement, { sign: true })}</td>
                <td>{fmtUSD(reviewed.totalSettlement, { sign: true })}</td>
              </tr>
              <tr>
                <th scope="row">Break-even wholesale escalation</th>
                <td className="col-submitted">{fmtPct(breakEven.submittedEsc)}</td>
                <td>{fmtPct(breakEven.reviewedEsc)}</td>
              </tr>
              <tr>
                <th scope="row">Break-even strike price</th>
                <td className="col-submitted">{fmtPerMWh(breakEven.submittedStrike)}</td>
                <td>{fmtPerMWh(breakEven.reviewedStrike)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="leaves-out">
          <strong>Not in these numbers:</strong> the VPPA’s value as a long-term price hedge, earnings volatility if it is
          marked to market, and the stronger impact claim that comes from helping finance a new project. Unbundled RECs
          rarely add new renewable capacity.
        </p>
      </div>
    </section>
  );
}
