const SOURCES: { label: string; href?: string }[] = [
  {
    label: 'LevelTen Energy PPA Price Index, North America, Q1 2026 (solar P25 $64.49/MWh; wind $79.40/MWh), via pv magazine',
    href: 'https://pv-magazine-usa.com/2026/04/20/permitting-headwinds-and-geopolitics-drive-solar-ppa-prices-higher-in-q/',
  },
  {
    label: 'LevelTen Energy, Q2 2026 North America report (solar market average $61.40/MWh), via TaiyangNews',
    href: 'https://taiyangnews.info/business/levelten-energy-q2-2026-report-for-north-america-europe',
  },
  {
    label: 'Modo Energy: CAISO solar capture price and capture rate, spring 2026',
    href: 'https://modoenergy.com/research/en/caiso-solar-capture-price-capture-rate-spring-2026',
  },
  {
    label: 'S&P Global: REC price assessments (NY Tier 1 $41/MWh for 2024; national wind RECs $4.50/MWh for 2025 vintage)',
    href: 'https://www.spglobal.com/commodity-insights/en/news-research/latest-news/energy-transition/080525-new-yorks-energy-transition-road-map-to-have-a-bullish-effect-on-rec-demand-prices',
  },
  {
    label: 'US EPA: Unbundled RECs and historical voluntary REC prices',
    href: 'https://epa.gov/lmop/unbundle-electricity-and-renewable-energy-certificates',
  },
  { label: 'GHG Protocol: Scope 2 revision, public consultation October 2025 to January 2026', href: 'https://ghgprotocol.org/' },
  { label: 'EIA Electric Power Monthly (capacity factors); NREL photovoltaic degradation studies; RE100 technical criteria' },
];

export function HowItWorks({ checkCount }: { checkCount: number }) {
  return (
    <div className="how">
      <section className="panel">
        <div className="panel-body" style={{ gap: 18 }}>
          <p className="pull">Each catch only has to be made once.</p>
          <p className="lede">
            A good reviewer notices when a model quietly assumes something unrealistic, like wholesale power prices rising
            7.5% a year for fifteen years. That knowledge usually lives in one person’s head and gets applied when they
            happen to look. This app writes it down as checks, runs them before any result is shown, and still leaves the
            final call to a named person.
          </p>
          <div className="how-cols">
            <div style={{ display: 'grid', gap: 10 }}>
              <h3>What the software does</h3>
              <ul>
                <li>Runs the VPPA vs. REC comparison on the assumptions as submitted.</li>
                <li>Tests every assumption against the playbook ({checkCount} checks) every time, in the same order.</li>
                <li>Prices each problem: how far the benchmark value moves the answer, and whether it reverses the recommendation.</li>
                <li>Drafts the memo back to whoever supplied the assumptions, with sources and questions.</li>
              </ul>
            </div>
            <div style={{ display: 'grid', gap: 10 }}>
              <h3>What the reviewer does</h3>
              <ul>
                <li>Decides each flag. A flagged value can still be right because of a contract clause or a market event the model can’t see. Keeping it needs a written reason.</li>
                <li>Signs the result. A name goes on it, and the sign-off goes out of date if anything changes afterwards.</li>
                <li>Takes the argument back to the people who made the assumption.</li>
                <li>Teaches the playbook. Anything the checks missed becomes a new check.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="panel-head">
          <h2>How a lesson becomes a check</h2>
        </div>
        <div className="panel-body">
          <ol style={{ margin: 0, paddingLeft: '1.2em', display: 'grid', gap: 8 }}>
            <li>A review catches something new: say, a model that escalates wholesale prices at 7.5% a year.</li>
            <li>The reviewer adds it in the Playbook tab: the condition, a benchmark (2.75%), why it matters, and the source.</li>
            <li>From then on it runs on every scenario, and the exported Claude skill carries it too, so Claude raises it before presenting an analysis.</li>
            <li>The reviewer’s attention moves to whatever no check covers yet. The second-look panel asks Claude for leads there, and a person decides which ones to keep.</li>
          </ol>
        </div>
      </section>

      <section className="panel">
        <div className="panel-head">
          <h2>Where the benchmarks come from</h2>
        </div>
        <div className="panel-body">
          <p className="small">
            Benchmarks are starting points with dates, not facts about your deal. Check them against your advisor’s data,
            and recalibrate a check when the market moves.
          </p>
          <ul className="sources">
            {SOURCES.map((s) => (
              <li key={s.label}>
                {s.href ? (
                  <a href={s.href} target="_blank" rel="noreferrer" style={{ color: 'var(--accent)' }}>
                    {s.label}
                  </a>
                ) : (
                  s.label
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
