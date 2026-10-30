import { MARKETS, type Diligence, type Inputs, type Market, type NumericInputKey, type Severity } from '../engine/types.ts';
import { NumberField } from './ui.tsx';

interface Props {
  inputs: Inputs;
  onChange: (next: Inputs) => void;
  flags: Partial<Record<string, Severity>>;
  /** Messages for values outside their possible range, by input key. */
  errors: Partial<Record<string, string>>;
  onLoadExample: (which: 'example' | 'benchmark') => void;
}

type FieldSpec = {
  key: NumericInputKey;
  label: string;
  percent?: boolean;
  prefix?: string;
  suffix?: string;
  help?: string;
};

const GROUPS: { title: string; fields: FieldSpec[] }[] = [
  {
    title: 'Contract',
    fields: [
      { key: 'strikePrice', label: 'Strike price', prefix: '$', suffix: '/MWh' },
      { key: 'strikeEscalation', label: 'Strike escalator', percent: true, suffix: '%/yr' },
      { key: 'termYears', label: 'Term', suffix: 'years' },
      { key: 'transactionCost', label: 'Transaction costs', prefix: '$' },
    ],
  },
  {
    title: 'Project',
    fields: [
      { key: 'capacityMW', label: 'Size', suffix: 'MW' },
      { key: 'capacityFactor', label: 'Capacity factor', percent: true, suffix: '%' },
      { key: 'degradation', label: 'Degradation', percent: true, suffix: '%/yr' },
    ],
  },
  {
    title: 'Market',
    fields: [
      { key: 'hubPrice', label: 'Hub price, year 1', prefix: '$', suffix: '/MWh', help: 'Around-the-clock average' },
      { key: 'wholesaleEscalation', label: 'Wholesale escalation', percent: true, suffix: '%/yr' },
      { key: 'captureRate', label: 'Capture rate', percent: true, suffix: '%', help: 'Project’s output-weighted price vs. the average' },
    ],
  },
  {
    title: 'RECs, load & finance',
    fields: [
      { key: 'annualLoadMWh', label: 'Annual load', suffix: 'MWh' },
      { key: 'recPrice', label: 'REC price, year 1', prefix: '$', suffix: '/MWh' },
      { key: 'recEscalation', label: 'REC escalation', percent: true, suffix: '%/yr' },
      { key: 'discountRate', label: 'Discount rate', percent: true, suffix: '%' },
    ],
  },
];

const DILIGENCE: { key: keyof Diligence; label: string }[] = [
  { key: 'accountingReviewed', label: 'Accounting has assessed derivative treatment (ASC 815 / IFRS 9)' },
  { key: 'creditSupportReviewed', label: 'Credit support or collateral terms are known' },
  { key: 'negativePriceTermsReviewed', label: 'Negative-price and curtailment terms reviewed' },
  { key: 'marketBoundaryConfirmed', label: 'RECs come from the same market as the load' },
  { key: 'scope2RevisionConsidered', label: 'GHG Protocol Scope 2 revision considered' },
];

export function AssumptionsForm({ inputs, onChange, flags, errors, onLoadExample }: Props) {
  const set = <K extends keyof Inputs>(key: K, value: Inputs[K]) => onChange({ ...inputs, [key]: value });

  const field = (f: FieldSpec) => (
    <NumberField
      key={f.key}
      id={`in-${f.key}`}
      label={f.label}
      value={inputs[f.key]}
      percent={f.percent}
      prefix={f.prefix}
      suffix={f.suffix}
      help={f.help}
      flag={flags[f.key]}
      error={errors[f.key]}
      onChange={(v) => set(f.key, v)}
    />
  );

  return (
    <section className="panel" aria-labelledby="assumptions-title">
      <div className="panel-head">
        <h2 id="assumptions-title">Assumptions</h2>
        <span className="sub">as submitted</span>
      </div>
      <div className="panel-body">
        <div className="btn-row">
          <button type="button" className="btn" onClick={() => onLoadExample('example')}>
            Load the 7.5% example
          </button>
          <button type="button" className="btn btn-quiet" onClick={() => onLoadExample('benchmark')}>
            Load benchmark version
          </button>
        </div>

        <div className="ledger-group">
          <label className="field" htmlFor="in-scenarioName">
            <span className="field-label">Scenario</span>
            <input id="in-scenarioName" className="input" value={inputs.scenarioName} onChange={(e) => set('scenarioName', e.target.value)} />
          </label>
          <label className="field" htmlFor="in-assumptionOwner">
            <span className="field-label">Assumptions supplied by</span>
            <input
              id="in-assumptionOwner"
              className="input"
              value={inputs.assumptionOwner}
              placeholder="Advisor, analyst, or team"
              onChange={(e) => set('assumptionOwner', e.target.value)}
            />
          </label>
          <div className="grid-2">
            <label className="field" htmlFor="in-technology" data-flag={flags.technology}>
              <span className="field-label">Technology</span>
              <select id="in-technology" className="select" value={inputs.technology} onChange={(e) => set('technology', e.target.value as Inputs['technology'])}>
                <option value="solar">Solar</option>
                <option value="wind">Wind</option>
              </select>
            </label>
            <label className="field" htmlFor="in-market" data-flag={flags.market}>
              <span className="field-label">Market</span>
              <select id="in-market" className="select" value={inputs.market} onChange={(e) => set('market', e.target.value as Market)}>
                {MARKETS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {GROUPS.map((g) => (
          <div className="ledger-group" key={g.title}>
            <div className="ledger-title">{g.title}</div>
            <div className="grid-2">
              {g.fields.map(field)}
              {g.title === 'Contract' ? (
                <>
                  <label className="field" htmlFor="in-settlementPoint" data-flag={flags.settlementPoint}>
                    <span className="field-label">Settles at</span>
                    <select
                      id="in-settlementPoint"
                      className="select"
                      value={inputs.settlementPoint}
                      onChange={(e) => set('settlementPoint', e.target.value as Inputs['settlementPoint'])}
                    >
                      <option value="hub">Hub</option>
                      <option value="node">Project node</option>
                    </select>
                  </label>
                  {inputs.settlementPoint === 'node'
                    ? field({ key: 'basis', label: 'Basis (node − hub)', prefix: '$', suffix: '/MWh' })
                    : null}
                </>
              ) : null}
            </div>
          </div>
        ))}

        <div className="ledger-group">
          <div className="ledger-title">Diligence</div>
          {DILIGENCE.map((d) => (
            <label className="check" key={d.key} htmlFor={`in-${d.key}`}>
              <input
                id={`in-${d.key}`}
                type="checkbox"
                checked={inputs.diligence[d.key]}
                onChange={(e) => set('diligence', { ...inputs.diligence, [d.key]: e.target.checked })}
              />
              <span>
                {d.label}
                {flags[d.key] ? <> <span className="flag-dot" data-sev={flags[d.key]} /></> : null}
              </span>
            </label>
          ))}
        </div>
      </div>
    </section>
  );
}
