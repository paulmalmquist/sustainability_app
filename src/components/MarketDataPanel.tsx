import { fmtPct, fmtPerMWh } from '../engine/format.ts';
import { marketData } from '../engine/marketData.ts';
import { MARKETS } from '../engine/types.ts';

const STATUS_TEXT = { ok: 'Updated', stale: 'Using last good copy', failed: 'Unavailable', skipped: 'Needs a free key' } as const;

/** What the weekly refresh pulled, with dates and sources, so every benchmark can be traced. */
export function MarketDataPanel() {
  const d = marketData();
  const markets = MARKETS.filter((m) => d.markets?.[m] || d.onPeak?.[m] || d.solarSites?.[m]);

  return (
    <section className="panel" aria-labelledby="data-title">
      <div className="panel-head">
        <h2 id="data-title">Live market data</h2>
        <span className="sub">{d.generatedAt ? `refreshed ${d.generatedAt.slice(0, 10)}, weekly` : 'not yet refreshed'}</span>
      </div>
      <div className="panel-body">
        <p className="small">
          A weekly job pulls these public sources, and the checks compare each model against them. Strike and REC prices
          have no free public source; Claude looks those up on the web when it runs the skill.
        </p>

        <div className="data-figures">
          {d.inflation ? (
            <div className="stat">
              <span className="stat-label">Inflation markets expect, 10 years</span>
              <span className="stat-value">{fmtPct(d.inflation.breakeven10y)}</span>
              <span className="stat-label">
                Last 12 months: {fmtPct(d.inflation.cpiYoY)}. 2022 peak: {fmtPct(d.inflation.cpiPeak2022)}.
              </span>
            </div>
          ) : null}
          {d.rates ? (
            <div className="stat">
              <span className="stat-label">10-year Treasury yield</span>
              <span className="stat-value">{fmtPct(d.rates.treasury10y)}</span>
              <span className="stat-label">Baa corporate bonds: {fmtPct(d.rates.baaCorporate)}</span>
            </div>
          ) : null}
          {d.costOfCapital ? (
            <div className="stat">
              <span className="stat-label">US cost of capital</span>
              <span className="stat-value">{fmtPct(d.costOfCapital.totalMarket)}</span>
              <span className="stat-label">
                Industries: {fmtPct(d.costOfCapital.p10)} to {fmtPct(d.costOfCapital.p90)}
              </span>
            </div>
          ) : null}
          {d.capacityFactors ? (
            <div className="stat">
              <span className="stat-label">US fleet capacity factor</span>
              <span className="stat-value">
                {fmtPct(d.capacityFactors.solar)} solar · {fmtPct(d.capacityFactors.wind)} wind
              </span>
              <span className="stat-label">{d.capacityFactors.period}</span>
            </div>
          ) : null}
        </div>

        {markets.length ? (
          <div className="table-scroll">
            <table className="data-table">
              <thead>
                <tr>
                  <th scope="col">Market</th>
                  <th scope="col">Hub</th>
                  <th scope="col">Avg price</th>
                  <th scope="col">On-peak</th>
                  <th scope="col">Negative hours</th>
                  <th scope="col">Solar capture</th>
                  <th scope="col">Wind capture</th>
                  <th scope="col">Solar CF here</th>
                </tr>
              </thead>
              <tbody>
                {markets.map((m) => {
                  const p = d.markets?.[m];
                  return (
                    <tr key={m}>
                      <td>{m}</td>
                      <td>{p?.hub ?? '—'}</td>
                      <td>{p ? fmtPerMWh(p.atcPrice) : '—'}</td>
                      <td>{d.onPeak?.[m] ? fmtPerMWh(d.onPeak[m]!.onPeakPrice) : '—'}</td>
                      <td>{p ? fmtPct(p.negativeHourShare) : '—'}</td>
                      <td>{p?.solarCapture !== undefined ? fmtPct(p.solarCapture) : '—'}</td>
                      <td>{p?.windCapture !== undefined ? fmtPct(p.windCapture) : '—'}</td>
                      <td>{d.solarSites?.[m] ? fmtPct(d.solarSites[m]!.capacityFactorAC) : '—'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : null}
        {d.window ? (
          <p className="small muted">
            Prices are day-ahead, {d.window.start} to {d.window.end}. Texas uses every hour; other markets use one day every{' '}
            {d.window.sampledEveryDays} days. Capture rates weight each hour’s hub price by that market’s total solar or wind
            output (EIA-930), so a single project can differ.
          </p>
        ) : null}

        {d.sources?.length ? (
          <ul className="sources">
            {d.sources.map((s) => (
              <li key={s.id}>
                <span className="badge" data-kind={s.status === 'ok' ? 'team' : undefined}>
                  {STATUS_TEXT[s.status]}
                </span>{' '}
                {s.url ? (
                  <a href={s.url} target="_blank" rel="noreferrer" style={{ color: 'var(--accent)' }}>
                    {s.name}
                  </a>
                ) : (
                  s.name
                )}
                {s.status !== 'ok' && s.detail ? <span className="muted"> ({s.detail})</span> : null}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
