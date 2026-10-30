# PPA Preflight

Give it the assumptions behind a VPPA vs. unbundled REC comparison. You get one piece of advice back: which option is cheaper once unrealistic assumptions are corrected, how confident that is, what would change the answer, and what to ask whoever built the model.

The advice comes from a playbook of checks written by experienced reviewers. When a review catches something the checks missed, it becomes a new check. From then on it runs every time, in the app and in Claude.

**Live app:** https://paulmalmquist.github.io/sustainability_app/

## Three ways to get advice

1. **Ask Claude.** Download the skill (Playbook tab → *Download skill (.zip)*) and upload it to Claude. Then give Claude the model in any form (spreadsheet, PDF, slide, pasted numbers) and ask which option is better. Claude extracts the assumptions, runs the bundled calculator, and replies with the advice, plus anything it notices that the checks don't cover.
2. **Paste into the app.** On the Advice tab, paste the assumption rows from Excel ("Wholesale price inflation · 7.5%") and choose *Read assumptions*. Anything missing is filled with a benchmark and listed.
3. **Command line.** `node skill/vppa-rec-assumption-review/scripts/preflight.mjs inputs.json` prints the advice as Markdown. Add `--json` for structured output and `--checks team-checks.json` for your team's checks.

For the 7.5% example, the advice reads (figures shift a little each week as the market data refreshes):

> **Buy unbundled RECs. At $63.00/MWh, this VPPA costs $14.0M more over 15 years.**
> The model as submitted says the opposite (the VPPA by $25.1M), mainly because of one assumption: wholesale price escalation far above long-run norms. The VPPA only beats RECs at a strike below $53.00/MWh. […]
> **Confidence:** High: no single assumption, moved across its plausible range, reverses this.

The **Detailed review** tab is still there for anyone who wants to see each flag, decide it by hand, and sign off. Decisions made there carry into the advice.

### How the advice treats inputs

- **Every input has a valid range.** A value outside it, such as a capacity factor of 2600, is treated as an error (usually a unit mix-up), not as an aggressive assumption. It is replaced and reported, and the advice's confidence drops until it is fixed.
- **Every input has a named source.** For each value that was filled in or rejected, the advice says where a reliable number comes from: an independent energy yield assessment for capacity factor, a dated forward curve for the hub price, a broker quote for the exact REC product, and so on.
- **A minimal checklist.** Eleven inputs are needed for useful advice (marked in the skill's input table). If any of them was filled in, confidence is capped at medium.
- **Clear priority between checks.** When two checks suggest different values for the same input, the more serious one wins (critical over warning, then the larger effect), and the other is noted.

## Why it exists

The app grew out of one real review. A model compared a virtual PPA with buying RECs and assumed wholesale power prices would rise **7.5% a year** for the whole contract. Typical long-run escalation is 2.5–3%, roughly inflation. At 7.5% the VPPA looked like the better deal. AI flagged the number and a person took the argument back to whoever made the assumption.

That raised two questions:

- **Do you still need a person?** Yes, for three jobs: deciding whether a flagged value is actually justified, owning the result, and arguing with whoever supplied the number.
- **Does the person have to catch the same thing every time?** No. Once a twist has been caught, it can be written down as a check and run automatically from then on.

The app does both. The checks run every time, and a person decides and signs.

## The worked example

Click **Load the 7.5% example** (it loads by default). An 80 MW solar VPPA in PJM, $63/MWh flat strike, 15 years, 8% discount rate:

| | As submitted | After review |
|---|---|---|
| Wholesale escalation | 7.5%/yr | 2.75%/yr |
| Solar capture rate | 100% | 85% |
| Degradation | 0 | 0.5%/yr |
| **Lower-cost option (NPV)** | **VPPA by $25.1M** | **RECs by $14.4M** |

- Fixing the escalation rate alone moves the answer $27.6M and reverses it.
- The two options break even at **3.26%** escalation, so the VPPA only wins if wholesale prices outrun the normal 2.5–3% range for 15 straight years.
- The preflight also flags what tends to travel with a bad escalation rate. In this example that is solar valued at the full around-the-clock price, no output degradation, value back-loaded after year 10, unreviewed negative-price terms, and no transaction costs.

## How it works

1. **Model.** Annual cash flows for both paths. VPPA: (market price × capture rate − strike) × generation, plus top-up RECs for load the project doesn't cover. RECs: load × REC price. Both are discounted to NPV.
2. **Preflight.** 27 built-in checks across market prices, project output, contract terms, finance and RECs, result robustness, and claims and accounting. For any check with a benchmark, the model re-runs with only that value changed, so you see how much each assumption moves the answer and whether it reverses it.
3. **Decide and sign.** Each critical and warning finding needs a decision: use the benchmark, keep the value (with a written reason), or send it back to the owner. Sign-off records a fingerprint of the inputs and decisions. Change anything afterwards and the sign-off shows as out of date.
4. **Pushback memo.** A draft note to the assumption owner covering each flagged value, the benchmark and its source, the dollar impact, and the question to ask.
5. **Teach.** The Playbook tab lists every check. *Add a check* builds a new one from any input or calculated value (e.g. "strike escalator is above 2%"), with a severity, a benchmark, the reason, and the story of where it was caught. You can also recalibrate the built-in thresholds when the market moves.
6. **Second look.** Asks Claude for issues the checks didn't cover. In a claude.ai artifact it calls Claude directly. Anywhere else it gives you a prompt to paste into Claude and reads the reply back. Suggestions are marked unverified, and a person decides which ones to turn into checks.

## Live market data

A weekly job (`.github/workflows/refresh-data.yml`, Mondays) runs `scripts/data/refresh.py`, which pulls public data into `src/data/market-data.json`. It then rebuilds the skill, runs the tests, commits, and republishes the site. The checks compare every model against the result:

| Data | Source | Used for |
|---|---|---|
| Inflation expected over 10 years; CPI, including the 2022 peak | FRED (St. Louis Fed): T10YIE, T5YIFR, CPIAUCSL | Wholesale escalation benchmark; flags escalation more than a point above expected inflation |
| 10-year Treasury and Baa corporate bond yields | FRED: DGS10, DBAA | Flags a discount rate below the risk-free rate |
| Cost of capital by industry | Damodaran, NYU Stern | Discount rate benchmark |
| Fleet capacity factors, trailing 12 months | EIA Electric Power Monthly, Table 6.07.B | Capacity factor benchmark (wind; solar fallback) |
| Expected solar output at a site in each market | NREL PVWatts | Solar capacity factor benchmark by market |
| Hourly day-ahead hub prices: ERCOT, CAISO, MISO, SPP, NYISO, ISO-NE (PJM with a key) | Grid operators, via [gridstatus](https://github.com/gridstatus/gridstatus) and their public files | Hub price check, negative-price frequency |
| Hourly solar and wind output by grid operator | EIA-930 | Capture rates (prices weighted by output) |
| On-peak hub prices | EIA wholesale market data (ICE) | Reference price level, including PJM |

Each source is fetched separately, and implausible values are rejected. If a source fails, its last good values stay and are marked stale. The app's *How it works* tab shows every source's status and date, and the skill's `SKILL.md` lists the values.

Strike and REC prices have no free public feed. Claude looks those up on the web when it runs the skill.

**Optional keys** (free) add more data. Add them under the repository's Settings → Secrets and variables → Actions:

- `PJM_API_KEY` from [PJM Data Miner](https://dataminer2.pjm.com/): hourly PJM prices and capture rates.
- `NREL_API_KEY` from [NREL](https://developer.nrel.gov/signup/): replaces the rate-limited demo key for PVWatts.

To refresh by hand, use Actions → *Refresh market data* → *Run workflow*. To refresh locally:

```sh
pip install -r scripts/data/requirements.txt
python scripts/data/refresh.py
npm run build:skill
```

## The Claude skill

[`skill/vppa-rec-assumption-review/`](skill/vppa-rec-assumption-review/) contains:

- `SKILL.md`: the procedure (extract → run → advise → add your own read), the input keys and what happens when one is missing, and every check with its benchmark, source, and question.
- `scripts/preflight.mjs`: the calculator, a single dependency-free Node file built from `src/engine`.
- `example-inputs.json`: the 7.5% example in the input format.
- `team-checks.json`: optional. The app's skill download adds it when your team has added, recalibrated, or turned off checks, and the calculator loads it automatically.

To install it:

- **Claude apps:** upload the zip from the app's Playbook tab as a skill.
- **Claude Code:** copy the folder into `~/.claude/skills/`.

Rebuild after changing the engine or the built-in checks:

```sh
npm run build:skill
```

Tests fail if the checked-in skill or calculator drifts from the code.

## Benchmarks

Defaults are dated and sourced in the app (How it works → *Where the benchmarks come from*). Highlights as of October 2026:

- Wholesale escalation: 2.5–3%/yr typical; 2.75% used as the benchmark.
- Solar VPPA strike: LevelTen P25 index about $61–65/MWh in 2026. Wind: about $68–80/MWh.
- Voluntary national RECs: about $4–5/MWh (2025 vintage). Compliance RECs such as NY Tier 1 run $24–41/MWh.
- Solar capture: well below 100% in solar-heavy markets. CAISO went negative in spring 2026.
- GHG Protocol Scope 2 revision: hourly matching and deliverability are still proposals as of 2026.

Treat them as starting points, not facts about your deal.

## Development

```sh
npm install
npm run dev            # local app at http://localhost:5173
npm test               # engine tests (model, checks, review gate, memo, skill export)
npm run typecheck
npm run build          # static site in dist/
npm run build:artifact # single self-contained page in dist-artifact/
npm run build:skill    # bundled calculator + SKILL.md in skill/
```

Every push to `main` runs the checks and republishes the live app on GitHub Pages (`.github/workflows/ci.yml`).

The engine in `src/engine/` is plain TypeScript with no UI dependencies:

| File | What it does |
|---|---|
| `advice.ts` | Turns a scenario into one recommendation, with confidence and what would change it |
| `inputs.ts` | Fills gaps in partial inputs; reads assumptions pasted from a spreadsheet |
| `model.ts` | Cash-flow model, break-even solver |
| `facts.ts` | Every value a check can test, inputs and calculated |
| `builtinRules.ts` | The starter playbook |
| `rules.ts` | Check evaluation and per-finding impact |
| `review.ts` | Decisions, the reviewed scenario, sign-off status |
| `sensitivity.ts` | One-at-a-time swings for the "what the answer depends on" chart |
| `memo.ts` | Pushback memo |
| `skill.ts` | SKILL.md export |
| `secondLook.ts` | Prompt and parser for Claude's second look |

Your scenario, decisions, and added checks are saved in the browser's local storage. Use Playbook → *Download JSON* / *Import JSON* (`team-checks.json`) to share checks with colleagues.
