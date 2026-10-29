import { useState } from 'react';
import { FACT_BY_KEY } from '../engine/facts.ts';
import { formatFact, fmtUSD } from '../engine/format.ts';
import type { Swing } from '../engine/sensitivity.ts';
import { useWidth } from './ui.tsx';

const ROW = 40;
const short = (key: string, v: number) =>
  FACT_BY_KEY[key]?.format === 'perMWh' ? `$${v.toFixed(v < 10 ? 2 : 0)}` : formatFact(key, v);
const BAR = 12;
const TOP = 4;
const AXIS = 24;

/** One-at-a-time sensitivity: which assumption moves the answer most. */
export function Tornado({ swings }: { swings: Swing[] }) {
  const [ref, width] = useWidth<HTMLDivElement>();
  const [hover, setHover] = useState<{ i: number; which: 'low' | 'high' } | null>(null);

  const labelW = Math.min(170, Math.round(width * 0.38));
  const right = 8;
  const plotW = width - labelW - right;
  const maxAbs = Math.max(1, ...swings.flatMap((s) => [Math.abs(s.lowDelta), Math.abs(s.highDelta)]));
  const x = (v: number) => labelW + ((v + maxAbs) / (2 * maxAbs)) * plotW;
  const height = TOP + swings.length * ROW + AXIS;

  const bar = (s: Swing, i: number, which: 'low' | 'high') => {
    const v = which === 'low' ? s.lowDelta : s.highDelta;
    const y0 = TOP + i * ROW + (which === 'low' ? 7 : 7 + BAR + 2);
    const x0 = Math.min(x(0), x(v));
    const w = Math.max(1, Math.abs(x(v) - x(0)));
    const r = Math.min(4, w / 2);
    const positive = v >= 0;
    // Rounded at the data end, square at the zero line.
    const d = positive
      ? `M${x0},${y0}h${w - r}a${r},${r} 0 0 1 ${r},${r}v${BAR - 2 * r}a${r},${r} 0 0 1 -${r},${r}h-${w - r}Z`
      : `M${x0 + w},${y0}h-${w - r}a${r},${r} 0 0 0 -${r},${r}v${BAR - 2 * r}a${r},${r} 0 0 0 ${r},${r}h${w - r}Z`;
    const active = hover?.i === i && hover.which === which;
    return (
      <g key={which}>
        <path d={d} fill={positive ? 'var(--series-a)' : 'var(--series-b)'} opacity={hover && !active ? 0.55 : 1} />
        <rect
          x={labelW}
          y={y0 - 1}
          width={plotW}
          height={BAR + 2}
          fill="transparent"
          tabIndex={0}
          aria-label={`${s.label} at ${formatFact(s.input, which === 'low' ? s.lowValue : s.highValue)}: ${fmtUSD(v, { sign: true })}`}
          onPointerEnter={() => setHover({ i, which })}
          onPointerLeave={() => setHover(null)}
          onFocus={() => setHover({ i, which })}
          onBlur={() => setHover(null)}
        />
      </g>
    );
  };

  const tip = hover ? swings[hover.i] : null;
  const tipValue = tip && hover ? (hover.which === 'low' ? tip.lowDelta : tip.highDelta) : 0;

  return (
    <figure className="chart" style={{ margin: 0 }}>
      <div>
        <div className="chart-title">What the answer depends on</div>
        <div className="chart-sub">
          Change in the VPPA’s advantage when one assumption moves to a low (top bar) or high (bottom bar) value.
        </div>
      </div>
      <div className="legend">
        <span>
          <span className="key-rect" style={{ background: 'var(--series-a)' }} /> Toward the VPPA
        </span>
        <span>
          <span className="key-rect" style={{ background: 'var(--series-b)' }} /> Toward RECs
        </span>
      </div>
      <div ref={ref} style={{ position: 'relative' }}>
        <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Sensitivity of the VPPA advantage to each assumption">
          <line x1={x(0)} x2={x(0)} y1={TOP} y2={TOP + swings.length * ROW} stroke="var(--axis)" strokeWidth={1} />
          {swings.map((s, i) => (
            <g key={s.input}>
              <text x={0} y={TOP + i * ROW + 16} className="label">
                {s.label}
              </text>
              <text x={0} y={TOP + i * ROW + 31}>
                {short(s.input, s.lowValue)} → {short(s.input, s.highValue)}
              </text>
              {bar(s, i, 'low')}
              {bar(s, i, 'high')}
            </g>
          ))}
          <text x={labelW} y={height - 6} textAnchor="start">
            {fmtUSD(-maxAbs)}
          </text>
          <text x={x(0)} y={height - 6} textAnchor="middle" className="strong">
            $0
          </text>
          <text x={width - right} y={height - 6} textAnchor="end">
            {fmtUSD(maxAbs, { sign: true })}
          </text>
        </svg>
        {tip && hover ? (
          <div className="tooltip" style={{ left: Math.min(Math.max(labelW, x(tipValue) - 80), width - 180), top: TOP + hover.i * ROW + ROW }}>
            <span className="tooltip-head">
              {tip.label} at {formatFact(tip.input, hover.which === 'low' ? tip.lowValue : tip.highValue)}
            </span>
            <span className="tooltip-row">
              <strong>{fmtUSD(tipValue, { sign: true })}</strong> {tipValue >= 0 ? 'toward the VPPA' : 'toward RECs'}
            </span>
          </div>
        ) : null}
      </div>
    </figure>
  );
}
