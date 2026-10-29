import { useState } from 'react';
import { fmtUSD } from '../engine/format.ts';
import type { ModelResult } from '../engine/types.ts';
import { useWidth } from './ui.tsx';

interface Props {
  submitted: ModelResult;
  reviewed: ModelResult;
  showReviewed: boolean;
}

const HEIGHT = 240;
const M = { top: 12, right: 16, bottom: 28, left: 52 };

function niceStep(span: number, target: number): number {
  const raw = span / target;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const norm = raw / mag;
  return (norm < 1.5 ? 1 : norm < 3 ? 2 : norm < 7 ? 5 : 10) * mag;
}

/** Annual VPPA settlement, as submitted vs. after review, on one $ axis. */
export function SettlementChart({ submitted, reviewed, showReviewed }: Props) {
  const [ref, width] = useWidth<HTMLDivElement>();
  const [hover, setHover] = useState<number | null>(null);

  const a = submitted.rows.map((r) => r.settlement);
  const b = reviewed.rows.map((r) => r.settlement);
  const values = showReviewed ? [...a, ...b, 0] : [...a, 0];
  const step = niceStep(Math.max(...values) - Math.min(...values) || 1, 5);
  const yMin = Math.floor(Math.min(...values) / step) * step;
  const yMax = Math.ceil(Math.max(...values) / step) * step;
  const n = a.length;

  const innerW = width - M.left - M.right;
  const innerH = HEIGHT - M.top - M.bottom;
  const x = (i: number) => M.left + (n === 1 ? innerW / 2 : (i / (n - 1)) * innerW);
  const y = (v: number) => M.top + (1 - (v - yMin) / (yMax - yMin || 1)) * innerH;
  const path = (vs: number[]) => vs.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join('');

  const ticks: number[] = [];
  for (let v = yMin; v <= yMax + step / 2; v += step) ticks.push(v);
  const xEvery = n > 12 ? (width < 420 ? 5 : 2) : 1;

  const onMove = (clientX: number, rect: DOMRect) => {
    const px = ((clientX - rect.left) / rect.width) * width;
    const i = Math.round(((px - M.left) / innerW) * (n - 1));
    setHover(Math.max(0, Math.min(n - 1, i)));
  };

  const tipLeft = hover === null ? 0 : Math.min(Math.max(x(hover) + 12, 0), width - 170);

  return (
    <figure className="chart" style={{ margin: 0 }}>
      <div>
        <div className="chart-title">Annual VPPA settlement</div>
        <div className="chart-sub">Above zero, the developer pays you. Below zero, you pay the developer.</div>
      </div>
      <div className="legend">
        <span>
          <span className="key-line" style={{ background: 'var(--series-muted)' }} /> As submitted
        </span>
        {showReviewed ? (
          <span>
            <span className="key-line" style={{ background: 'var(--series-a)' }} /> After review
          </span>
        ) : null}
      </div>
      <div ref={ref} style={{ position: 'relative' }}>
        <svg
          viewBox={`0 0 ${width} ${HEIGHT}`}
          role="img"
          aria-label="Line chart of annual VPPA settlement by contract year, as submitted and after review. Values are in the year-by-year table."
          onPointerMove={(e) => onMove(e.clientX, e.currentTarget.getBoundingClientRect())}
          onPointerLeave={() => setHover(null)}
        >
          {ticks.map((t) => (
            <g key={t}>
              <line x1={M.left} x2={width - M.right} y1={y(t)} y2={y(t)} stroke={t === 0 ? 'var(--axis)' : 'var(--grid)'} strokeWidth={1} />
              <text x={M.left - 8} y={y(t) + 4} textAnchor="end" className={t === 0 ? 'strong' : undefined}>
                {t === 0 ? '$0' : fmtUSD(t)}
              </text>
            </g>
          ))}
          {a.map((_, i) =>
            i % xEvery === 0 || i === n - 1 ? (
              <text key={i} x={x(i)} y={HEIGHT - 8} textAnchor="middle">
                {i === 0 ? 'Yr 1' : i + 1}
              </text>
            ) : null,
          )}
          <path d={path(a)} fill="none" stroke="var(--series-muted)" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
          {showReviewed ? (
            <path d={path(b)} fill="none" stroke="var(--series-a)" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
          ) : null}
          <circle cx={x(n - 1)} cy={y(a[n - 1])} r={4} fill="var(--series-muted)" stroke="var(--surface)" strokeWidth={2} />
          {showReviewed ? <circle cx={x(n - 1)} cy={y(b[n - 1])} r={4} fill="var(--series-a)" stroke="var(--surface)" strokeWidth={2} /> : null}
          {hover !== null ? (
            <g>
              <line x1={x(hover)} x2={x(hover)} y1={M.top} y2={HEIGHT - M.bottom} stroke="var(--axis)" strokeWidth={1} />
              <circle cx={x(hover)} cy={y(a[hover])} r={4} fill="var(--series-muted)" stroke="var(--surface)" strokeWidth={2} />
              {showReviewed ? <circle cx={x(hover)} cy={y(b[hover])} r={4} fill="var(--series-a)" stroke="var(--surface)" strokeWidth={2} /> : null}
            </g>
          ) : null}
        </svg>
        {hover !== null ? (
          <div className="tooltip" style={{ left: tipLeft, top: 8 }}>
            <span className="tooltip-head">Year {hover + 1}</span>
            <span className="tooltip-row">
              <span className="key-line" style={{ background: 'var(--series-muted)' }} />
              <strong>{fmtUSD(a[hover], { sign: true })}</strong> as submitted
            </span>
            {showReviewed ? (
              <span className="tooltip-row">
                <span className="key-line" style={{ background: 'var(--series-a)' }} />
                <strong>{fmtUSD(b[hover], { sign: true })}</strong> after review
              </span>
            ) : null}
          </div>
        ) : null}
      </div>
    </figure>
  );
}
