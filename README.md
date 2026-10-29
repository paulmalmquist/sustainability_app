# PPA Preflight

A VPPA vs. unbundled REC comparison that checks its own assumptions before it shows a result, prices each problem, and holds the answer as a draft until a named reviewer signs off. When a review catches something the checks missed, the reviewer adds it as a new check. From then on it runs on every analysis, and it exports as a Claude skill so Claude raises it too.

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

## The Claude skill

[`skill/vppa-rec-assumption-review/SKILL.md`](skill/vppa-rec-assumption-review/SKILL.md) is the built-in playbook as a Claude skill. It covers the procedure (findings before the headline, draft until signed, propose new checks for anything missed), every check with its benchmark, source, and question, and a machine-readable copy.

- **Claude Code:** copy the `vppa-rec-assumption-review` folder into `~/.claude/skills/` (or a project's `.claude/skills/`).
- **Claude apps:** zip the folder and upload it as a custom skill.
- **Including your team's checks:** in the app, open Playbook → *Download SKILL.md*. The export includes every check you've added, with who added it.

Regenerate the checked-in file after changing the built-in checks:

```sh
npm run export-skill
```

A test fails if the checked-in skill drifts from the code.

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
```

The engine in `src/engine/` is plain TypeScript with no UI dependencies:

| File | What it does |
|---|---|
| `model.ts` | Cash-flow model, break-even solver |
| `facts.ts` | Every value a check can test, inputs and calculated |
| `builtinRules.ts` | The starter playbook |
| `rules.ts` | Check evaluation and per-finding impact |
| `review.ts` | Decisions, the reviewed scenario, sign-off status |
| `sensitivity.ts` | One-at-a-time swings for the "what the answer depends on" chart |
| `memo.ts` | Pushback memo |
| `skill.ts` | SKILL.md export |
| `secondLook.ts` | Prompt and parser for Claude's second look |

Your scenario, decisions, and added checks are saved in the browser's local storage. Use Playbook → *Download JSON* / *Import JSON* to share checks with colleagues.
