import { useEffect, useRef, useState, type ReactNode } from 'react';
import { copyText, saveTextFile } from '../runtime.ts';
import type { Severity } from '../engine/types.ts';

const SEV_LABEL: Record<Severity, string> = { critical: 'Critical', warning: 'Warning', info: 'Note' };

function SevIcon({ severity }: { severity: Severity }) {
  if (severity === 'critical') {
    return (
      <svg viewBox="0 0 12 12" aria-hidden="true">
        <path d="M6 1 11 10H1Z" fill="currentColor" opacity="0.25" />
        <path d="M6 4v3M6 8.6v.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  if (severity === 'warning') {
    return (
      <svg viewBox="0 0 12 12" aria-hidden="true">
        <circle cx="6" cy="6" r="5" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path d="M6 3.4v3.2M6 8.4v.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 12 12" aria-hidden="true">
      <circle cx="6" cy="6" r="5" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M6 5.4v3M6 3.4v.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function SeverityChip({ severity }: { severity: Severity }) {
  return (
    <span className="sev" data-sev={severity}>
      <SevIcon severity={severity} />
      {SEV_LABEL[severity]}
    </span>
  );
}

interface NumberFieldProps {
  id: string;
  label: string;
  value: number;
  onChange: (v: number) => void;
  /** Stored as a fraction, shown as a percent. */
  percent?: boolean;
  prefix?: string;
  suffix?: string;
  step?: number;
  help?: string;
  flag?: Severity;
  /** Shown when the value is outside its possible range. */
  error?: string;
}

function shown(value: number, percent?: boolean): string {
  if (!Number.isFinite(value)) return '';
  const v = percent ? Math.round(value * 1e6) / 1e4 : value;
  return String(v);
}

/** A numeric input that keeps what the person is typing until it parses. */
export function NumberField({ id, label, value, onChange, percent, prefix, suffix, step, help, flag, error }: NumberFieldProps) {
  const [text, setText] = useState(shown(value, percent));
  const focused = useRef(false);

  useEffect(() => {
    if (!focused.current) setText(shown(value, percent));
  }, [value, percent]);

  return (
    <label className="field" data-flag={error ? 'critical' : flag} htmlFor={id}>
      <span className="field-label">
        {label}
        {flag ? <span className="flag-dot" data-sev={flag} title={`Flagged: ${flag}`} /> : null}
      </span>
      <span className="input-wrap">
        {prefix ? <span className="affix">{prefix}</span> : null}
        <input
          id={id}
          className="input"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          inputMode="decimal"
          value={text}
          step={step}
          onFocus={() => (focused.current = true)}
          onBlur={() => {
            focused.current = false;
            setText(shown(value, percent));
          }}
          onChange={(e) => {
            setText(e.target.value);
            const n = Number(e.target.value.replace(/[,$%\s]/g, ''));
            if (e.target.value.trim() !== '' && Number.isFinite(n)) onChange(percent ? n / 100 : n);
          }}
        />
        {suffix ? <span className="affix">{suffix}</span> : null}
      </span>
      {error ? (
        <span className="field-error" id={`${id}-error`}>
          {error}
        </span>
      ) : help ? (
        <span className="field-help">{help}</span>
      ) : null}
    </label>
  );
}

export function Segmented<T extends string>({
  value,
  options,
  onChange,
  label,
}: {
  value: T;
  options: { value: T; label: string; disabled?: boolean }[];
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <div className="segmented" role="group" aria-label={label}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={value === o.value}
          disabled={o.disabled}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/** Copy and download buttons for a block of text, with a short status line. */
export function ExportButtons({ text, filename, copyLabel = 'Copy', children }: { text: string | (() => string); filename?: string; copyLabel?: string; children?: ReactNode }) {
  const [note, setNote] = useState<{ text: string; tone?: 'warn' } | null>(null);
  const resolve = () => (typeof text === 'function' ? text() : text);

  useEffect(() => {
    if (!note) return;
    const t = setTimeout(() => setNote(null), 4000);
    return () => clearTimeout(t);
  }, [note]);

  return (
    <div className="btn-row">
      <button
        type="button"
        className="btn"
        onClick={async () => setNote((await copyText(resolve())) ? { text: 'Copied' } : { text: 'Copy failed. Select the text instead.', tone: 'warn' })}
      >
        {copyLabel}
      </button>
      {filename ? (
        <button
          type="button"
          className="btn"
          onClick={async () => {
            const body = resolve();
            const outcome = await saveTextFile(filename, body);
            if (outcome === 'saved') setNote({ text: `Saved ${filename}` });
            else if (outcome === 'declined') setNote(null);
            else {
              const copied = await copyText(body);
              setNote({ text: copied ? 'Downloads are off here, so it was copied instead' : 'Downloads are off here. Use Copy.', tone: 'warn' });
            }
          }}
        >
          Download {filename.split('.').pop()?.toUpperCase()}
        </button>
      ) : null}
      {children}
      {note ? (
        <span className="toast" data-tone={note.tone} role="status">
          {note.text}
        </span>
      ) : null}
    </div>
  );
}

/** Tracks an element's width so charts can draw text at real pixel size. */
export function useWidth<T extends HTMLElement>(fallback = 560) {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(fallback);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setWidth(Math.max(260, Math.round(el.getBoundingClientRect().width)));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, width] as const;
}
