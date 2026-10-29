---
name: vppa-rec-assumption-review
description: Give a clear recommendation on a VPPA vs. unbundled REC decision from whatever the user provides (spreadsheet, PDF, deck, email, or pasted numbers). Extracts the assumptions, corrects unrealistic ones against checks written by experienced reviewers, and reports the better option, how sure it is, what would change it, and what to ask the model’s owner. Use for any VPPA, virtual PPA, renewable PPA, or REC procurement analysis.
---

# VPPA vs. REC advisor

A procurement model can be arithmetically right and still give the wrong answer because one assumption is off, like wholesale prices rising 7.5% a year for fifteen years. This skill holds the checks experienced reviewers apply and a small calculator that runs them. The user should get one clear piece of advice, not a list of things to work out themselves.

## Procedure

1. **Extract.** Read what the user gave you and write the assumptions to `inputs.json` using the keys in "Input keys" below. Convert units: percentages as fractions (7.5% → 0.075), prices in $/MWh, energy in MWh per year. If the source gives annual generation instead of a capacity factor, use `annualGenerationMWh`. Leave out anything the source doesn’t state; the calculator fills gaps and reports them.
2. **Run.** From this skill’s folder: `node scripts/preflight.mjs inputs.json`. It runs every check below (plus any `team-checks.json` in this folder), replaces clearly unrealistic values with benchmarks, runs the cost model both ways, and prints the advice as Markdown. Add `--json` for structured output.
3. **Advise.** Reply with the calculator’s advice: the recommendation and confidence first, then the assumptions it corrected and what each did to the answer, then what would change the answer, then the questions for whoever built the model. Use its numbers; don’t recompute them by hand.
4. **Add your own read.** After the advice, note anything in the source that the checks don’t cover (contract clauses, counterparty, location, market specifics), labeled as your observations. If one of them should be checked every time, propose it as a new check in the format below.
5. **Flag uncertain extraction.** If you had to guess a value (an unlabeled cell, an ambiguous unit), say so, re-run with the other reading, and report whether the recommendation changes.

If Node isn’t available, apply the checks by hand: evaluate each check’s conditions, swap in the benchmark for every critical or warning finding that has one, compare the corrected cost of each option, and present the result in the same order as step 3.

Benchmarks are defaults with sources and dates. If you have newer market data, say so and re-run with it.

## Input keys

| Key | Meaning | Unit | If missing |
|---|---|---|---|
| `technology` | Technology: solar or wind | solar, wind | solar |
| `market` | Market: ISO/RTO the project sits in | ERCOT, PJM, MISO, SPP, CAISO, NYISO, ISO-NE, Other | Other |
| `capacityMW` | Project size: Contracted capacity, MW AC | MW (AC) | Benchmark, reported as assumed |
| `capacityFactor` | Capacity factor: Average output as a share of nameplate | fraction (0.075 = 7.5%) | Benchmark, reported as assumed |
| `degradation` | Output degradation: Annual loss of output | fraction (0.075 = 7.5%) | Treated as not modeled (0), so the check fires |
| `termYears` | Contract term: VPPA length in years | years | Benchmark, reported as assumed |
| `strikePrice` | Strike price: Fixed VPPA price, year 1 | $/MWh | Benchmark, reported as assumed |
| `strikeEscalation` | Strike escalator: Annual increase in the strike price | fraction (0.075 = 7.5%) | 0 (flat strike) |
| `settlementPoint` | Settlement point: hub or node | hub, node | hub |
| `basis` | Basis (node minus hub): Applies only to node settlement | $/MWh | 0 |
| `transactionCost` | Transaction costs: One-time legal, advisory, and procurement costs | $ | Treated as not modeled ($0), so the check fires |
| `hubPrice` | Hub price, year 1: Around-the-clock wholesale price | $/MWh | Benchmark, reported as assumed |
| `wholesaleEscalation` | Wholesale price escalation: Annual growth in wholesale prices | fraction (0.075 = 7.5%) | Benchmark, reported as assumed |
| `captureRate` | Capture rate: Project's generation-weighted price as a share of the around-the-clock price | fraction (0.075 = 7.5%) | Treated as not modeled (100%), so the check fires |
| `annualLoadMWh` | Annual load: Electricity use to be matched with RECs | MWh per year | Year-1 generation (project sized to load), reported as assumed |
| `recPrice` | REC price, year 1: Unbundled REC price | $/MWh | Benchmark, reported as assumed |
| `recEscalation` | REC price escalation: Annual growth in REC prices | fraction (0.075 = 7.5%) | Benchmark, reported as assumed |
| `discountRate` | Discount rate: Rate used to discount future costs | fraction (0.075 = 7.5%) | Benchmark, reported as assumed |
| `accountingReviewed` | Derivative accounting reviewed: ASC 815 / IFRS 9 treatment confirmed | true / false | false (unknown), so it becomes a question |
| `creditSupportReviewed` | Credit support reviewed: Collateral or guarantee requirements known | true / false | false (unknown), so it becomes a question |
| `negativePriceTermsReviewed` | Negative-price terms reviewed: Floor or curtailment clause checked | true / false | false (unknown), so it becomes a question |
| `marketBoundaryConfirmed` | REC market boundary confirmed: RECs come from the same market as the load | true / false | false (unknown), so it becomes a question |
| `scope2RevisionConsidered` | Scope 2 revision considered: GHG Protocol Scope 2 proposals reviewed | true / false | false (unknown), so it becomes a question |
| `annualGenerationMWh` | Annual generation, in place of size or capacity factor | MWh per year | Derived from size × capacity factor |
| `scenarioName`, `assumptionOwner` | Name of the deal; who supplied the assumptions | text | Generic name; questions addressed generically |

See `example-inputs.json` for a complete example.

## Checks (27)

### Market prices

#### MKT-ESC-HIGH: Wholesale price escalation far above long-run norms (critical)

- **Fires when:** Wholesale price escalation is above 4%
- **Report:** Wholesale prices are assumed to rise {wholesaleEscalation} a year. Compounded over {termYears}, that puts the hub price at {finalYearHubPrice} in the final year, {hubPriceMultiple} today’s level.
- **Why:** PPA models typically escalate wholesale prices 2.5–3% a year, roughly long-run inflation, because long-range forecasts show flat real power prices. A rate like 7.5% looks like one high-inflation year applied to the whole term. Higher escalation raises every future VPPA settlement, so it makes the VPPA look better than it is. Load growth from data centers has lifted near-term prices in some markets (PJM, for example). That can support a higher rate for the first few years, not for the full term.
- **Benchmark:** 2.75%/yr, the midpoint of the typical 2.5–3% range (set `wholesaleEscalation` = 2.75%)
- **Ask:** What is the source for this escalation rate, and why should it hold for every year of the contract?
- **Source:** Typical PPA modeling range; Federal Reserve 2% inflation target; EIA Annual Energy Outlook (roughly flat real wholesale prices)
- **Origin:** Added after a reviewer caught a VPPA vs. REC model that used 7.5%/yr wholesale price inflation for the whole term. It made the VPPA look favorable when it was not.

#### MKT-ESC-ELEVATED: Wholesale price escalation at the high end (warning)

- **Fires when:** Wholesale price escalation is between 3.51% and 4%
- **Report:** Wholesale prices rise {wholesaleEscalation} a year, above the typical 2.5–3% range.
- **Why:** Small differences in escalation compound over a long contract. Half a point above the norm can decide a close comparison.
- **Benchmark:** 2.75%/yr (set `wholesaleEscalation` = 2.75%)
- **Ask:** What market view supports escalation above 3.5% a year?
- **Source:** Typical PPA modeling range

#### MKT-ESC-VS-DISCOUNT: Prices grow as fast as the discount rate (warning)

- **Fires when:** Escalation minus discount rate is at least 0%
- **Report:** Wholesale prices grow {wholesaleEscalation} a year, at or above the {discountRate} discount rate. The final years count as much as the first.
- **Why:** When escalation matches or beats the discount rate, distant settlements are not discounted away. The answer then rests on price forecasts 10 or more years out, which are the least reliable part of the model.
- **Ask:** Is the discount rate the company’s real cost of capital, and is escalation in the same nominal or real terms?
- **Source:** Basic discounting consistency

#### MKT-CAPTURE-SOLAR: Solar valued at the full around-the-clock price (warning)

- **Fires when:** Technology is solar AND Capture rate is at least 98%
- **Report:** Solar output is valued at {captureRate} of the around-the-clock hub price.
- **Why:** Solar produces in midday hours, when prices are lowest, and the discount deepens as more solar is built. CAISO solar captured about 72% of the average price in 2021 and went negative in spring 2026. Pricing solar at 100% overstates the VPPA’s settlements every year.
- **Benchmark:** 85% (planning placeholder; replace with a market-specific shape study) (set `captureRate` = 85%)
- **Ask:** Is there a shape or capture-rate analysis for this project’s location?
- **Source:** Modo Energy, CAISO solar capture (spring 2026); Enverus; IER analysis of CAISO 2021

#### MKT-CAPTURE-CAISO: CAISO solar capture rate looks optimistic (warning)

- **Fires when:** Technology is solar AND Market is CAISO AND Capture rate is between 75% and 97.9%
- **Report:** A {captureRate} capture rate is high for solar in CAISO.
- **Why:** CAISO has the deepest midday price discount in the US. Solar capture rates there have fallen well below 75%, and were negative in spring 2026.
- **Benchmark:** 65% (placeholder; verify with a current CAISO shape study) (set `captureRate` = 65%)
- **Ask:** What recent CAISO shape data supports this capture rate?
- **Source:** Modo Energy, CAISO solar capture (spring 2026); Enverus

#### MKT-CAPTURE-WIND: Wind valued at the full around-the-clock price (info)

- **Fires when:** Technology is wind AND Capture rate is at least 98%
- **Report:** Wind output is valued at {captureRate} of the around-the-clock hub price.
- **Why:** Wind often blows hardest at night and in shoulder seasons, when prices are lower, so its capture rate is usually below 100%.
- **Benchmark:** 90% (placeholder) (set `captureRate` = 90%)
- **Ask:** Is there a shape analysis for this wind project?
- **Source:** General market practice

#### MKT-NODE-BASIS: Node settlement with no basis (warning)

- **Fires when:** Settlement point is node AND Basis (node minus hub) is $0.00/MWh
- **Report:** The VPPA settles at the project node, but the model assumes the node price equals the hub price.
- **Why:** Nodes with a lot of renewable output often price below the hub when output is high, because of congestion. With node settlement the buyer carries that basis risk.
- **Benchmark:** −$3/MWh (placeholder; use the node’s history) (set `basis` = −$3.00/MWh)
- **Ask:** What does the node’s price history show against the hub?
- **Source:** General market practice

#### MKT-HUB-RANGE: Year-1 hub price outside recent ranges (info)

- **Fires when:** Hub price, year 1 is outside $20.00/MWh to $100.00/MWh
- **Report:** A year-1 hub price of {hubPrice} is outside the $20–$100/MWh band most US hubs have traded in recently.
- **Why:** The starting price sets the level for every year that follows. An old or mislabeled forward curve shifts the whole result.
- **Ask:** Which forward curve is this from, and what date?
- **Source:** General market practice

### Project output

#### PRJ-CF-SOLAR: Solar capacity factor outside the usual range (warning)

- **Fires when:** Technology is solar AND Capacity factor is outside 15% to 33%
- **Report:** A {capacityFactor} capacity factor is outside the 15–33% range for utility-scale solar.
- **Why:** US utility-scale solar averages about 24%. Single-axis trackers in the Southwest reach the low 30s.
- **Benchmark:** 24%, the US utility-scale average (set `capacityFactor` = 24%)
- **Ask:** Is this from an independent energy yield assessment (P50)?
- **Source:** EIA Electric Power Monthly, capacity factors for utility-scale solar

#### PRJ-CF-WIND: Wind capacity factor outside the usual range (warning)

- **Fires when:** Technology is wind AND Capacity factor is outside 25% to 50%
- **Report:** A {capacityFactor} capacity factor is outside the 25–50% range for US wind.
- **Why:** The US wind fleet averages roughly 35%; newer projects in strong wind regions reach the mid-40s.
- **Benchmark:** 36% (set `capacityFactor` = 36%)
- **Ask:** Is this from an independent energy yield assessment (P50)?
- **Source:** EIA Electric Power Monthly; LBNL Land-Based Wind Market Report

#### PRJ-NO-DEGRADATION: No output degradation (warning)

- **Fires when:** Output degradation is at most 0%
- **Report:** The project produces the same amount every year for {termYears}.
- **Why:** Solar panels lose about 0.5% of output a year, and wind turbine output also declines with age. Ignoring this overstates generation and settlements in later years.
- **Benchmark:** 0.5%/yr (set `degradation` = 0.5%)
- **Ask:** What degradation rate does the developer’s yield assessment use?
- **Source:** NREL photovoltaic degradation studies; LBNL wind performance studies

#### PRJ-OVERSIZED: Project larger than the load (warning)

- **Fires when:** Load covered by the project is above 110%
- **Report:** The project generates {coverageRatio} of annual load.
- **Why:** Surplus RECs have no value in this comparison unless you can resell them, and you carry price risk on volume you do not use.
- **Ask:** Is there a plan for the surplus RECs, or should the contracted share be smaller?
- **Source:** General procurement practice

### Contract terms

#### CTR-STRIKE-SOLAR: Solar strike price far from current offers (info)

- **Fires when:** Technology is solar AND Strike price is outside $45.00/MWh to $85.00/MWh
- **Report:** A {strikePrice} strike is far from current North American solar offers (about $61–65/MWh in 2026).
- **Why:** A strike well below the market makes the VPPA look cheap; one well above it may signal a stale quote.
- **Benchmark:** $63/MWh, LevelTen P25 solar index, 2026 (set `strikePrice` = $63.00/MWh)
- **Ask:** Is this a firm offer, and from when?
- **Source:** LevelTen Energy PPA Price Index, North America, Q1–Q3 2026

#### CTR-STRIKE-WIND: Wind strike price far from current offers (info)

- **Fires when:** Technology is wind AND Strike price is outside $55.00/MWh to $100.00/MWh
- **Report:** A {strikePrice} strike is far from current North American wind offers (about $68–80/MWh in 2026).
- **Why:** A strike well below the market makes the VPPA look cheap; one well above it may signal a stale quote.
- **Benchmark:** $72/MWh, LevelTen P25 wind index, 2026 (set `strikePrice` = $72.00/MWh)
- **Ask:** Is this a firm offer, and from when?
- **Source:** LevelTen Energy PPA Price Index, North America, 2026

#### CTR-TERM: Unusual contract length (info)

- **Fires when:** Contract term is outside 8 years to 20 years
- **Report:** A {termYears} term is outside the usual 10–20 years for a VPPA.
- **Why:** Longer terms lean harder on long-range price forecasts; shorter ones are hard to get financed.
- **Source:** General market practice

#### CTR-NO-TXN-COST: No transaction costs (info)

- **Fires when:** Transaction costs is at most $0
- **Report:** The VPPA carries no legal, advisory, or procurement costs.
- **Why:** Negotiating a VPPA usually involves outside counsel and an advisor. Buying unbundled RECs costs little to set up.
- **Benchmark:** $350K (placeholder) (set `transactionCost` = $350K)
- **Ask:** What will counsel and the advisor charge for this deal?
- **Source:** General market practice

#### CTR-NEGATIVE-PRICES: Negative-price terms not reviewed (warning)

- **Fires when:** Negative-price terms reviewed is no
- **Report:** Nobody has confirmed how the VPPA settles when prices go negative.
- **Why:** In markets with frequent negative prices (ERCOT, SPP, CAISO), a VPPA with no price floor or curtailment clause can make the buyer pay the strike plus the negative price. This model uses annual averages and cannot show that cost.
- **Ask:** Does the contract include a floor at $0 or a curtailment right during negative prices?
- **Source:** General market practice

### Finance & RECs

#### FIN-DISCOUNT: Discount rate outside the usual corporate range (warning)

- **Fires when:** Discount rate is outside 5% to 12%
- **Report:** A {discountRate} discount rate is outside the 5–12% range typical for corporate cost of capital.
- **Why:** A low rate inflates the weight of distant years, where VPPA value usually sits.
- **Benchmark:** 8% (set `discountRate` = 8%)
- **Ask:** Did finance supply this rate?
- **Source:** General corporate finance practice

#### FIN-REC-COMPLIANCE-PRICE: REC price looks like a compliance-market price (warning)

- **Fires when:** REC price, year 1 is above $15.00/MWh
- **Report:** A REC price of {recPrice} is far above national voluntary RECs.
- **Why:** National voluntary wind RECs traded around $4–5/MWh for 2025 vintage. Prices above $15 look like state compliance RECs (New York Tier 1 sells for about $24–41/MWh). A high REC price makes the REC strategy look expensive and flatters the VPPA, which brings its own RECs.
- **Benchmark:** $5/MWh, national voluntary (set `recPrice` = $5.00/MWh)
- **Ask:** Which REC product and vintage is this price for?
- **Source:** S&P Global Platts assessments (2025); NYSERDA Tier 1 2026 pre-sale

#### FIN-REC-STALE-PRICE: REC price below recent levels (info)

- **Fires when:** REC price, year 1 is below $1.00/MWh
- **Report:** A REC price of {recPrice} matches pre-2020 levels.
- **Why:** Voluntary REC prices sat under $1/MWh through 2019, then rose. An old quote understates the REC strategy’s cost.
- **Benchmark:** $4.50/MWh, national voluntary wind, 2025 vintage (set `recPrice` = $4.50/MWh)
- **Source:** US EPA Landfill Methane Outreach Program; S&P Global Platts

#### FIN-REC-ESCALATION: REC prices assumed to climb quickly (warning)

- **Fires when:** REC price escalation is above 5%
- **Report:** REC prices are assumed to rise {recEscalation} a year.
- **Why:** Voluntary REC prices have been low and volatile without a steady upward trend. Fast REC escalation inflates the REC strategy’s cost.
- **Benchmark:** 2%/yr (set `recEscalation` = 2%)
- **Ask:** What supports a steady rise in REC prices?
- **Source:** General market practice

### Result robustness

#### RES-LATE-VALUE: Most of the VPPA’s value arrives late (warning)

- **Fires when:** VPPA upside after year 10 is above 60%
- **Report:** {lateValueShare} of the VPPA’s discounted upside arrives after year 10. It first pays out in {firstPositiveYear}.
- **Why:** Value that depends on prices a decade away is the least certain part of any forecast.
- **Ask:** How does the result look if prices stop rising after year 10?
- **Source:** Forecast uncertainty grows with time

#### RES-THIN-CUSHION: The answer flips with a small change in escalation (warning)

- **Fires when:** Distance to break-even escalation is below 1%
- **Report:** The two options cost the same at {breakEvenEscalation} escalation, within one point of the assumed {wholesaleEscalation}.
- **Why:** When a one-point change in a forecast flips the decision, the decision is a bet on that forecast.
- **Source:** Sensitivity analysis

### Claims & accounting

#### ACC-DERIVATIVE: Derivative accounting not reviewed (warning)

- **Fires when:** Derivative accounting reviewed is no
- **Report:** Accounting has not confirmed how the VPPA will be reported.
- **Why:** A VPPA can meet the definition of a derivative under ASC 815 (or IFRS 9). Mark-to-market treatment puts quarterly swings in reported earnings, which this cost comparison does not show.
- **Ask:** Has the controller’s group assessed ASC 815 treatment?
- **Source:** FASB ASC 815; IFRS 9

#### ACC-CREDIT: Credit support not reviewed (info)

- **Fires when:** Credit support reviewed is no
- **Report:** Collateral or guarantee requirements are not in the analysis.
- **Why:** Developers often require a parent guarantee or letter of credit. Collateral has a cost and uses credit capacity.
- **Ask:** What credit support will the developer require?
- **Source:** General market practice

#### CLM-MARKET-BOUNDARY: REC market boundary not confirmed (warning)

- **Fires when:** REC market boundary confirmed is no
- **Report:** Nobody has confirmed that the RECs come from the same market as the load.
- **Why:** Under RE100 criteria and the GHG Protocol Scope 2 quality criteria, RECs must come from the same market as the electricity use they cover. The US and Canada count as one market.
- **Ask:** Where are the RECs generated, and where is the load?
- **Source:** RE100 technical criteria; GHG Protocol Scope 2 Guidance (2015)

#### CLM-SCOPE2-REVISION: Scope 2 revision not considered (info)

- **Fires when:** Scope 2 revision considered is no
- **Report:** The analysis does not consider the GHG Protocol’s Scope 2 revision.
- **Why:** The GHG Protocol is revising Scope 2. Proposals include hourly matching, deliverability, and incrementality, possibly as a stricter method alongside today’s rules. Annual unbundled RECs from outside your grid region would likely count for less. Nothing is final as of 2026; check the current status.
- **Ask:** How would each option count if hourly matching and deliverability are adopted?
- **Source:** GHG Protocol Scope 2 public consultation (Oct 2025–Jan 2026) and 2026 consultation summaries

## Fact reference

Every value a check can test, including calculated ones. Use these names when proposing a new check. Rates are fractions (0.075 = 7.5%); prices are $/MWh.

| Fact | Meaning | Kind |
|---|---|---|
| `technology` | Technology: solar or wind | input |
| `market` | Market: ISO/RTO the project sits in | input |
| `capacityMW` | Project size: Contracted capacity, MW AC | input |
| `capacityFactor` | Capacity factor: Average output as a share of nameplate | input |
| `degradation` | Output degradation: Annual loss of output | input |
| `termYears` | Contract term: VPPA length in years | input |
| `strikePrice` | Strike price: Fixed VPPA price, year 1 | input |
| `strikeEscalation` | Strike escalator: Annual increase in the strike price | input |
| `settlementPoint` | Settlement point: hub or node | input |
| `basis` | Basis (node minus hub): Applies only to node settlement | input |
| `transactionCost` | Transaction costs: One-time legal, advisory, and procurement costs | input |
| `hubPrice` | Hub price, year 1: Around-the-clock wholesale price | input |
| `wholesaleEscalation` | Wholesale price escalation: Annual growth in wholesale prices | input |
| `captureRate` | Capture rate: Project's generation-weighted price as a share of the around-the-clock price | input |
| `annualLoadMWh` | Annual load: Electricity use to be matched with RECs | input |
| `recPrice` | REC price, year 1: Unbundled REC price | input |
| `recEscalation` | REC price escalation: Annual growth in REC prices | input |
| `discountRate` | Discount rate: Rate used to discount future costs | input |
| `accountingReviewed` | Derivative accounting reviewed: ASC 815 / IFRS 9 treatment confirmed | input |
| `creditSupportReviewed` | Credit support reviewed: Collateral or guarantee requirements known | input |
| `negativePriceTermsReviewed` | Negative-price terms reviewed: Floor or curtailment clause checked | input |
| `marketBoundaryConfirmed` | REC market boundary confirmed: RECs come from the same market as the load | input |
| `scope2RevisionConsidered` | Scope 2 revision considered: GHG Protocol Scope 2 proposals reviewed | input |
| `year1GenerationMWh` | Year-1 generation: Size x 8,760 h x capacity factor | derived |
| `coverageRatio` | Load covered by the project: Year-1 generation / annual load | derived |
| `year1SettlementPrice` | Project market value, year 1: Hub price x capture rate (+ basis at a node) | derived |
| `year1SpreadToStrike` | Year-1 market value minus strike: Negative means the buyer pays in year 1 | derived |
| `finalYearHubPrice` | Hub price in final year: Year-1 hub price compounded over the term | derived |
| `hubPriceMultiple` | Final-year hub price vs. today: How many times today’s price the model assumes by the last year | derived |
| `escalationMinusDiscount` | Escalation minus discount rate: Positive means distant years weigh as much as near ones | derived |
| `npvAdvantage` | VPPA advantage (NPV): REC strategy cost minus VPPA cost; positive favors the VPPA | derived |
| `recommendsVppa` | Result favors the VPPA: true when the VPPA costs less | derived |
| `breakEvenEscalation` | Break-even escalation: Escalation at which both options cost the same | derived |
| `escalationCushion` | Distance to break-even escalation: Absolute gap between assumed and break-even escalation | derived |
| `breakEvenStrike` | Break-even strike price: Strike at which both options cost the same | derived |
| `lateValueShare` | VPPA upside after year 10: Share of discounted positive settlements that arrive after year 10 | derived |
| `firstPositiveYear` | First year the VPPA pays out: 0 when it never does | derived |

## Machine-readable checks

```json
[
  {
    "id": "MKT-ESC-HIGH",
    "title": "Wholesale price escalation far above long-run norms",
    "severity": "critical",
    "category": "Market prices",
    "when": [
      {
        "fact": "wholesaleEscalation",
        "op": ">",
        "value": 0.04
      }
    ],
    "benchmark": {
      "input": "wholesaleEscalation",
      "value": 0.0275
    }
  },
  {
    "id": "MKT-ESC-ELEVATED",
    "title": "Wholesale price escalation at the high end",
    "severity": "warning",
    "category": "Market prices",
    "when": [
      {
        "fact": "wholesaleEscalation",
        "op": "between",
        "value": [
          0.0351,
          0.04
        ]
      }
    ],
    "benchmark": {
      "input": "wholesaleEscalation",
      "value": 0.0275
    }
  },
  {
    "id": "MKT-ESC-VS-DISCOUNT",
    "title": "Prices grow as fast as the discount rate",
    "severity": "warning",
    "category": "Market prices",
    "when": [
      {
        "fact": "escalationMinusDiscount",
        "op": ">=",
        "value": 0
      }
    ]
  },
  {
    "id": "MKT-CAPTURE-SOLAR",
    "title": "Solar valued at the full around-the-clock price",
    "severity": "warning",
    "category": "Market prices",
    "when": [
      {
        "fact": "technology",
        "op": "==",
        "value": "solar"
      },
      {
        "fact": "captureRate",
        "op": ">=",
        "value": 0.98
      }
    ],
    "benchmark": {
      "input": "captureRate",
      "value": 0.85
    }
  },
  {
    "id": "MKT-CAPTURE-CAISO",
    "title": "CAISO solar capture rate looks optimistic",
    "severity": "warning",
    "category": "Market prices",
    "when": [
      {
        "fact": "technology",
        "op": "==",
        "value": "solar"
      },
      {
        "fact": "market",
        "op": "==",
        "value": "CAISO"
      },
      {
        "fact": "captureRate",
        "op": "between",
        "value": [
          0.75,
          0.979
        ]
      }
    ],
    "benchmark": {
      "input": "captureRate",
      "value": 0.65
    }
  },
  {
    "id": "MKT-CAPTURE-WIND",
    "title": "Wind valued at the full around-the-clock price",
    "severity": "info",
    "category": "Market prices",
    "when": [
      {
        "fact": "technology",
        "op": "==",
        "value": "wind"
      },
      {
        "fact": "captureRate",
        "op": ">=",
        "value": 0.98
      }
    ],
    "benchmark": {
      "input": "captureRate",
      "value": 0.9
    }
  },
  {
    "id": "MKT-NODE-BASIS",
    "title": "Node settlement with no basis",
    "severity": "warning",
    "category": "Market prices",
    "when": [
      {
        "fact": "settlementPoint",
        "op": "==",
        "value": "node"
      },
      {
        "fact": "basis",
        "op": "==",
        "value": 0
      }
    ],
    "benchmark": {
      "input": "basis",
      "value": -3
    }
  },
  {
    "id": "MKT-HUB-RANGE",
    "title": "Year-1 hub price outside recent ranges",
    "severity": "info",
    "category": "Market prices",
    "when": [
      {
        "fact": "hubPrice",
        "op": "outside",
        "value": [
          20,
          100
        ]
      }
    ]
  },
  {
    "id": "PRJ-CF-SOLAR",
    "title": "Solar capacity factor outside the usual range",
    "severity": "warning",
    "category": "Project output",
    "when": [
      {
        "fact": "technology",
        "op": "==",
        "value": "solar"
      },
      {
        "fact": "capacityFactor",
        "op": "outside",
        "value": [
          0.15,
          0.33
        ]
      }
    ],
    "benchmark": {
      "input": "capacityFactor",
      "value": 0.24
    }
  },
  {
    "id": "PRJ-CF-WIND",
    "title": "Wind capacity factor outside the usual range",
    "severity": "warning",
    "category": "Project output",
    "when": [
      {
        "fact": "technology",
        "op": "==",
        "value": "wind"
      },
      {
        "fact": "capacityFactor",
        "op": "outside",
        "value": [
          0.25,
          0.5
        ]
      }
    ],
    "benchmark": {
      "input": "capacityFactor",
      "value": 0.36
    }
  },
  {
    "id": "PRJ-NO-DEGRADATION",
    "title": "No output degradation",
    "severity": "warning",
    "category": "Project output",
    "when": [
      {
        "fact": "degradation",
        "op": "<=",
        "value": 0
      }
    ],
    "benchmark": {
      "input": "degradation",
      "value": 0.005
    }
  },
  {
    "id": "PRJ-OVERSIZED",
    "title": "Project larger than the load",
    "severity": "warning",
    "category": "Project output",
    "when": [
      {
        "fact": "coverageRatio",
        "op": ">",
        "value": 1.1
      }
    ]
  },
  {
    "id": "CTR-STRIKE-SOLAR",
    "title": "Solar strike price far from current offers",
    "severity": "info",
    "category": "Contract terms",
    "when": [
      {
        "fact": "technology",
        "op": "==",
        "value": "solar"
      },
      {
        "fact": "strikePrice",
        "op": "outside",
        "value": [
          45,
          85
        ]
      }
    ],
    "benchmark": {
      "input": "strikePrice",
      "value": 63
    }
  },
  {
    "id": "CTR-STRIKE-WIND",
    "title": "Wind strike price far from current offers",
    "severity": "info",
    "category": "Contract terms",
    "when": [
      {
        "fact": "technology",
        "op": "==",
        "value": "wind"
      },
      {
        "fact": "strikePrice",
        "op": "outside",
        "value": [
          55,
          100
        ]
      }
    ],
    "benchmark": {
      "input": "strikePrice",
      "value": 72
    }
  },
  {
    "id": "CTR-TERM",
    "title": "Unusual contract length",
    "severity": "info",
    "category": "Contract terms",
    "when": [
      {
        "fact": "termYears",
        "op": "outside",
        "value": [
          8,
          20
        ]
      }
    ]
  },
  {
    "id": "CTR-NO-TXN-COST",
    "title": "No transaction costs",
    "severity": "info",
    "category": "Contract terms",
    "when": [
      {
        "fact": "transactionCost",
        "op": "<=",
        "value": 0
      }
    ],
    "benchmark": {
      "input": "transactionCost",
      "value": 350000
    }
  },
  {
    "id": "CTR-NEGATIVE-PRICES",
    "title": "Negative-price terms not reviewed",
    "severity": "warning",
    "category": "Contract terms",
    "when": [
      {
        "fact": "negativePriceTermsReviewed",
        "op": "==",
        "value": false
      }
    ]
  },
  {
    "id": "FIN-DISCOUNT",
    "title": "Discount rate outside the usual corporate range",
    "severity": "warning",
    "category": "Finance & RECs",
    "when": [
      {
        "fact": "discountRate",
        "op": "outside",
        "value": [
          0.05,
          0.12
        ]
      }
    ],
    "benchmark": {
      "input": "discountRate",
      "value": 0.08
    }
  },
  {
    "id": "FIN-REC-COMPLIANCE-PRICE",
    "title": "REC price looks like a compliance-market price",
    "severity": "warning",
    "category": "Finance & RECs",
    "when": [
      {
        "fact": "recPrice",
        "op": ">",
        "value": 15
      }
    ],
    "benchmark": {
      "input": "recPrice",
      "value": 5
    }
  },
  {
    "id": "FIN-REC-STALE-PRICE",
    "title": "REC price below recent levels",
    "severity": "info",
    "category": "Finance & RECs",
    "when": [
      {
        "fact": "recPrice",
        "op": "<",
        "value": 1
      }
    ],
    "benchmark": {
      "input": "recPrice",
      "value": 4.5
    }
  },
  {
    "id": "FIN-REC-ESCALATION",
    "title": "REC prices assumed to climb quickly",
    "severity": "warning",
    "category": "Finance & RECs",
    "when": [
      {
        "fact": "recEscalation",
        "op": ">",
        "value": 0.05
      }
    ],
    "benchmark": {
      "input": "recEscalation",
      "value": 0.02
    }
  },
  {
    "id": "RES-LATE-VALUE",
    "title": "Most of the VPPA’s value arrives late",
    "severity": "warning",
    "category": "Result robustness",
    "when": [
      {
        "fact": "lateValueShare",
        "op": ">",
        "value": 0.6
      }
    ]
  },
  {
    "id": "RES-THIN-CUSHION",
    "title": "The answer flips with a small change in escalation",
    "severity": "warning",
    "category": "Result robustness",
    "when": [
      {
        "fact": "escalationCushion",
        "op": "<",
        "value": 0.01
      }
    ]
  },
  {
    "id": "ACC-DERIVATIVE",
    "title": "Derivative accounting not reviewed",
    "severity": "warning",
    "category": "Claims & accounting",
    "when": [
      {
        "fact": "accountingReviewed",
        "op": "==",
        "value": false
      }
    ]
  },
  {
    "id": "ACC-CREDIT",
    "title": "Credit support not reviewed",
    "severity": "info",
    "category": "Claims & accounting",
    "when": [
      {
        "fact": "creditSupportReviewed",
        "op": "==",
        "value": false
      }
    ]
  },
  {
    "id": "CLM-MARKET-BOUNDARY",
    "title": "REC market boundary not confirmed",
    "severity": "warning",
    "category": "Claims & accounting",
    "when": [
      {
        "fact": "marketBoundaryConfirmed",
        "op": "==",
        "value": false
      }
    ]
  },
  {
    "id": "CLM-SCOPE2-REVISION",
    "title": "Scope 2 revision not considered",
    "severity": "info",
    "category": "Claims & accounting",
    "when": [
      {
        "fact": "scope2RevisionConsidered",
        "op": "==",
        "value": false
      }
    ]
  }
]
```
