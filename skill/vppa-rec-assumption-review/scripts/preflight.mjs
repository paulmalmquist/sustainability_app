// Generated from src/engine by `npm run build:skill`. Do not edit by hand.
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
// src/engine/marketData.ts
var current = {
	inflation: {
		"breakeven10y": .0235,
		"forward5y5y": .0231,
		"cpiYoY": .0402,
		"cpiYoYMonth": "2026-09",
		"cpiPeak2022": .0898,
		"asOf": "2026-10-28",
		"source": "FRED: 10-year breakeven inflation (T10YIE), 5-year forward inflation expectation (T5YIFR), CPI (CPIAUCSL)"
	},
	rates: {
		"treasury10y": .0516,
		"baaCorporate": .0661,
		"asOf": "2026-10-28",
		"source": "FRED: 10-year Treasury yield (DGS10), Moody's Baa corporate bond yield (DBAA)"
	},
	costOfCapital: {
		"totalMarket": .0696,
		"p10": .0521,
		"median": .0709,
		"p90": .0848,
		"industries": 94,
		"asOf": "2026-01-05",
		"source": "Aswath Damodaran, NYU Stern: cost of capital by industry, US companies"
	},
	capacityFactors: {
		"solar": .2398,
		"wind": .3431,
		"period": "2025-09 to 2026-08",
		"asOf": "2026-08",
		"source": "EIA Electric Power Monthly, Table 6.07.B (utility-scale fleet, trailing 12 months)"
	},
	onPeak: {
		"CAISO": {
			"hub": "SP15 EZ Gen DA LMP Peak",
			"onPeakPrice": 27.91,
			"days": 220
		},
		"PJM": {
			"hub": "PJM WH Real Time Peak",
			"onPeakPrice": 91.08,
			"days": 226
		},
		"MISO": {
			"hub": "Indiana Hub RT Peak",
			"onPeakPrice": 92.31,
			"days": 46
		},
		"ISO-NE": {
			"hub": "Nepool MH DA LMP Peak",
			"onPeakPrice": 80.41,
			"days": 204
		}
	},
	markets: {
		"ERCOT": {
			"hub": "HB_NORTH",
			"atcPrice": 34.8,
			"negativeHourShare": .0072,
			"hours": 8734,
			"period": "2025-10-26 to 2026-10-24",
			"solarCapture": .689,
			"windCapture": .8859
		},
		"CAISO": {
			"hub": "TH_SP15_GEN-APND",
			"atcPrice": 24.73,
			"negativeHourShare": .1636,
			"hours": 648,
			"period": "2025-10-26 to 2026-10-26",
			"solarCapture": .4333,
			"windCapture": .9953
		},
		"MISO": {
			"hub": "INDIANA.HUB",
			"atcPrice": 39.01,
			"negativeHourShare": 0,
			"hours": 648,
			"period": "2025-10-26 to 2026-10-26",
			"solarCapture": .8705,
			"windCapture": 1.0077
		},
		"SPP": {
			"hub": "SPPSOUTH_HUB",
			"atcPrice": 22.83,
			"negativeHourShare": .1667,
			"hours": 648,
			"period": "2025-10-26 to 2026-10-26",
			"solarCapture": 1.6109,
			"windCapture": .7264
		},
		"NYISO": {
			"hub": "CENTRL",
			"atcPrice": 58.2,
			"negativeHourShare": 0,
			"hours": 648,
			"period": "2025-10-26 to 2026-10-26",
			"windCapture": .9716
		},
		"ISO-NE": {
			"hub": ".H.INTERNAL_HUB",
			"atcPrice": 66.2,
			"negativeHourShare": 0,
			"hours": 648,
			"period": "2025-10-26 to 2026-10-26",
			"solarCapture": .7481,
			"windCapture": .9834
		}
	},
	window: {
		"start": "2025-10-26",
		"end": "2026-10-25",
		"sampledEveryDays": 14
	},
	generatedAt: "2026-10-29T21:02:44Z",
	sources: [
		{
			"id": "fred-inflation",
			"name": "Inflation expectations and CPI (FRED)",
			"url": "https://fred.stlouisfed.org/series/T10YIE",
			"status": "ok"
		},
		{
			"id": "fred-rates",
			"name": "Treasury and corporate bond yields (FRED)",
			"url": "https://fred.stlouisfed.org/series/DGS10",
			"status": "ok"
		},
		{
			"id": "damodaran",
			"name": "Cost of capital by industry (Damodaran, NYU Stern)",
			"url": "https://pages.stern.nyu.edu/~adamodar/",
			"status": "ok"
		},
		{
			"id": "eia-capacity-factors",
			"name": "Fleet capacity factors (EIA Electric Power Monthly)",
			"url": "https://www.eia.gov/electricity/monthly/",
			"status": "ok"
		},
		{
			"id": "eia-ice",
			"name": "On-peak hub prices (EIA wholesale market data)",
			"url": "https://www.eia.gov/electricity/wholesale/",
			"status": "ok"
		},
		{
			"id": "nrel-pvwatts",
			"name": "Expected solar output by region (NREL PVWatts)",
			"url": "https://pvwatts.nrel.gov/",
			"status": "failed",
			"detail": "HTTPSConnectionPool(host='developer.nrel.gov', port=443): Max retries exceeded with url: /api/pvwatts/v8.json?api_key=DEMO_KEY&lat=31.99&lon=-102.08&system_capacity=1000&module_type=0&losses=14&array_type=2&tilt=0&azimuth=180&dc_ac_ratio=1."
		},
		{
			"id": "eia-930",
			"name": "Hourly solar and wind output by grid operator (EIA-930)",
			"url": "https://www.eia.gov/electricity/gridmonitor/",
			"status": "ok"
		},
		{
			"id": "prices-ercot",
			"name": "Hourly day-ahead prices, ERCOT (HB_NORTH)",
			"url": "",
			"status": "ok"
		},
		{
			"id": "prices-caiso",
			"name": "Hourly day-ahead prices, CAISO (TH_SP15_GEN-APND)",
			"url": "",
			"status": "ok"
		},
		{
			"id": "prices-pjm",
			"name": "Hourly day-ahead prices, PJM (WESTERN HUB)",
			"url": "",
			"status": "skipped",
			"detail": "skipped: set PJM_API_KEY (free from PJM Data Miner) to add hourly PJM prices"
		},
		{
			"id": "prices-miso",
			"name": "Hourly day-ahead prices, MISO (INDIANA.HUB)",
			"url": "",
			"status": "ok"
		},
		{
			"id": "prices-spp",
			"name": "Hourly day-ahead prices, SPP (SPPSOUTH_HUB)",
			"url": "",
			"status": "ok"
		},
		{
			"id": "prices-nyiso",
			"name": "Hourly day-ahead prices, NYISO (CENTRL)",
			"url": "",
			"status": "ok"
		},
		{
			"id": "prices-iso-ne",
			"name": "Hourly day-ahead prices, ISO-NE (.H.INTERNAL_HUB)",
			"url": "",
			"status": "ok"
		}
	]
};
/** 0.0235 → "2.35%", 0.24 → "24%". */
var pct = (v) => `${(v * 100).toFixed(Math.abs(v) < .1 ? 2 : 1).replace(/\.?0+$/, "")}%`;
var day = (iso) => iso ? iso.slice(0, 10) : "n/a";
/** Facts that compare the scenario with public market data. Absent when the data is. */
function dataFacts(inputs, data = current) {
	const f = {};
	const m = data.markets?.[inputs.market];
	f.hasPriceData = !!m;
	if (data.inflation) {
		f.expectedInflation = data.inflation.breakeven10y;
		f.escalationOverInflation = inputs.wholesaleEscalation - data.inflation.breakeven10y;
		f.recentInflation = data.inflation.cpiYoY;
		f.inflationPeak2022 = data.inflation.cpiPeak2022;
	}
	if (data.rates) {
		f.treasury10y = data.rates.treasury10y;
		f.discountOverTreasury = inputs.discountRate - data.rates.treasury10y;
	}
	if (data.costOfCapital) f.marketCostOfCapital = data.costOfCapital.totalMarket;
	if (m) {
		f.marketHubPrice = m.atcPrice;
		if (m.atcPrice > 0) f.hubPriceVsMarket = inputs.hubPrice / m.atcPrice;
		f.marketNegativeHourShare = m.negativeHourShare;
		const capture = inputs.technology === "solar" ? m.solarCapture : m.windCapture;
		if (capture !== void 0) {
			f.marketCaptureRate = capture;
			f.captureRateVsMarket = inputs.captureRate - capture;
		}
	}
	f.expectedCaptureRate = f.marketCaptureRate ?? (inputs.technology === "solar" ? .85 : .9);
	const expectedCF = expectedCapacityFactor(inputs, data);
	if (expectedCF) {
		f.expectedCapacityFactor = expectedCF.value;
		f.capacityFactorVsExpected = inputs.capacityFactor - expectedCF.value;
	}
	return f;
}
function expectedCapacityFactor(inputs, data) {
	if (inputs.technology === "solar") {
		const site = data.solarSites?.[inputs.market];
		if (site) return {
			value: site.capacityFactorAC,
			label: `NREL PVWatts, single-axis tracker at a representative ${inputs.market} site`
		};
	}
	const fleet = data.capacityFactors;
	if (!fleet) return void 0;
	return {
		value: inputs.technology === "solar" ? fleet.solar : fleet.wind,
		label: `US ${inputs.technology} fleet average, ${fleet.period} (EIA)`
	};
}
var round = (v, step) => Math.round(v / step) * step;
/**
* A benchmark backed by current public data, when the check asks for one and
* the data exists; otherwise the check's own default.
*/
function resolveBenchmark(b, inputs, data = current) {
	if (!b.data) return b;
	const m = data.markets?.[inputs.market];
	switch (b.data) {
		case "escalation": {
			const inf = data.inflation;
			if (!inf) return b;
			const value = Math.min(.035, Math.max(.02, round(inf.breakeven10y + .005, 5e-4)));
			return {
				...b,
				value,
				label: `${pct(value)}/yr: the ${pct(inf.breakeven10y)} inflation markets expect over 10 years (FRED, ${day(inf.asOf)}) plus 0.5 points for load growth`
			};
		}
		case "hubPrice":
			if (!m) return b;
			return {
				...b,
				value: m.atcPrice,
				label: `$${m.atcPrice.toFixed(2)}/MWh: average day-ahead price at ${m.hub}, ${m.period}`
			};
		case "captureRate": {
			const capture = inputs.technology === "solar" ? m?.solarCapture : m?.windCapture;
			if (capture === void 0 || !m) return b;
			return {
				...b,
				value: capture,
				label: `${pct(capture)}: what ${inputs.technology} output earned at ${m.hub} against the average price, ${m.period} (grid prices × EIA-930 output)`
			};
		}
		case "capacityFactor": {
			const cf = expectedCapacityFactor(inputs, data);
			if (!cf) return b;
			return {
				...b,
				value: cf.value,
				label: `${pct(cf.value)}: ${cf.label}`
			};
		}
		case "discountRate": {
			const c = data.costOfCapital;
			if (!c) return b;
			return {
				...b,
				value: c.totalMarket,
				label: `${pct(c.totalMarket)}: average US cost of capital (Damodaran, ${day(c.asOf)})`
			};
		}
	}
	return b;
}
// src/engine/model.ts
var HOURS_PER_YEAR = 8760;
/**
* Compares two ways to cover a company's load with renewable attributes:
*
*  - VPPA: a fixed-for-floating swap. Each year the buyer receives
*    (market price - strike) x generation, which is negative when market
*    prices sit below the strike. The buyer keeps the project's RECs and
*    buys unbundled RECs for any load the project doesn't cover.
*  - RECs: buy unbundled RECs for the full load every year.
*
* Cash flows are annual, discounted at year end. Transaction costs land
* at year 0. Surplus RECs (generation above load) are given no value.
*/
function runModel(inputs) {
	const term = Math.max(1, Math.round(inputs.termYears));
	const year1Generation = inputs.capacityMW * HOURS_PER_YEAR * inputs.capacityFactor;
	const basis = inputs.settlementPoint === "node" ? inputs.basis : 0;
	const rows = [];
	let npvVppaCost = inputs.transactionCost;
	let npvRecCost = 0;
	let totalSettlement = 0;
	let npvSettlement = 0;
	for (let year = 1; year <= term; year++) {
		const t = year - 1;
		const generationMWh = year1Generation * Math.pow(1 - inputs.degradation, t);
		const hubPrice = inputs.hubPrice * Math.pow(1 + inputs.wholesaleEscalation, t);
		const settlementPrice = hubPrice * inputs.captureRate + basis;
		const strikePrice = inputs.strikePrice * Math.pow(1 + inputs.strikeEscalation, t);
		const settlement = (settlementPrice - strikePrice) * generationMWh;
		const recPrice = inputs.recPrice * Math.pow(1 + inputs.recEscalation, t);
		const topUpRecsMWh = Math.max(0, inputs.annualLoadMWh - generationMWh);
		const excessRecsMWh = Math.max(0, generationMWh - inputs.annualLoadMWh);
		const vppaCost = -settlement + topUpRecsMWh * recPrice;
		const recCost = inputs.annualLoadMWh * recPrice;
		const discountFactor = 1 / Math.pow(1 + inputs.discountRate, year);
		rows.push({
			year,
			generationMWh,
			hubPrice,
			settlementPrice,
			strikePrice,
			settlement,
			recPrice,
			topUpRecsMWh,
			excessRecsMWh,
			vppaCost,
			recCost,
			discountFactor
		});
		npvVppaCost += vppaCost * discountFactor;
		npvRecCost += recCost * discountFactor;
		totalSettlement += settlement;
		npvSettlement += settlement * discountFactor;
	}
	const npvAdvantage = npvRecCost - npvVppaCost;
	return {
		rows,
		npvVppaCost,
		npvRecCost,
		npvAdvantage,
		recommendation: npvAdvantage > 0 ? "VPPA" : "RECs",
		totalSettlement,
		npvSettlement
	};
}
function withInput(inputs, key, value) {
	return {
		...inputs,
		[key]: value
	};
}
/**
* The value of `key` at which the VPPA and the REC strategy cost the same,
* found by bisection. The advantage must be monotonic in `key` across
* [lo, hi]; returns NaN when there is no crossing in that range.
*/
function breakEven(inputs, key, lo, hi) {
	const f = (x) => runModel(withInput(inputs, key, x)).npvAdvantage;
	let fLo = f(lo);
	const fHi = f(hi);
	if (Number.isNaN(fLo) || Number.isNaN(fHi) || Math.sign(fLo) === Math.sign(fHi)) return NaN;
	let a = lo;
	let b = hi;
	for (let i = 0; i < 60; i++) {
		const mid = (a + b) / 2;
		const fMid = f(mid);
		if (Math.sign(fMid) === Math.sign(fLo)) {
			a = mid;
			fLo = fMid;
		} else b = mid;
	}
	return (a + b) / 2;
}
function breakEvenEscalation(inputs) {
	return breakEven(inputs, "wholesaleEscalation", -.05, .25);
}
function breakEvenStrike(inputs) {
	return breakEven(inputs, "strikePrice", 0, 300);
}
// src/engine/facts.ts
/**
* Every value a check can test. Inputs come straight from the form; derived
* facts are computed from the model so checks can look at consequences
* (e.g. "what hub price does this escalation imply in the final year?").
*/
var FACTS = [
	{
		key: "technology",
		label: "Technology",
		format: "text",
		kind: "input",
		help: "solar or wind",
		options: ["solar", "wind"],
		core: true,
		source: "Term sheet"
	},
	{
		key: "market",
		label: "Market",
		format: "text",
		kind: "input",
		help: "ISO/RTO the project sits in",
		options: [
			"ERCOT",
			"PJM",
			"MISO",
			"SPP",
			"CAISO",
			"NYISO",
			"ISO-NE",
			"Other"
		],
		core: true,
		source: "Term sheet (project location and settlement hub)"
	},
	{
		key: "capacityMW",
		label: "Project size",
		format: "mw",
		kind: "input",
		help: "Contracted capacity, MW AC",
		range: [.1, 5e3],
		core: true,
		source: "Term sheet: contracted share, not the whole project"
	},
	{
		key: "capacityFactor",
		label: "Capacity factor",
		format: "pct",
		kind: "input",
		help: "Average output as a share of nameplate",
		range: [.05, .7],
		core: true,
		source: "Independent energy yield assessment (P50); developer estimates run high"
	},
	{
		key: "degradation",
		label: "Output degradation",
		format: "pct",
		kind: "input",
		help: "Annual loss of output",
		range: [0, .05],
		source: "Energy yield assessment or module warranty"
	},
	{
		key: "termYears",
		label: "Contract term",
		format: "years",
		kind: "input",
		help: "VPPA length in years",
		range: [1, 35],
		core: true,
		source: "Term sheet"
	},
	{
		key: "strikePrice",
		label: "Strike price",
		format: "perMWh",
		kind: "input",
		help: "Fixed VPPA price, year 1",
		range: [1, 300],
		core: true,
		source: "Developer’s firm offer, dated; compare with the LevelTen P25 index"
	},
	{
		key: "strikeEscalation",
		label: "Strike escalator",
		format: "pct",
		kind: "input",
		help: "Annual increase in the strike price",
		range: [-.05, .1],
		source: "Term sheet"
	},
	{
		key: "settlementPoint",
		label: "Settlement point",
		format: "text",
		kind: "input",
		help: "hub or node",
		options: ["hub", "node"],
		source: "Term sheet"
	},
	{
		key: "basis",
		label: "Basis (node minus hub)",
		format: "perMWh",
		kind: "input",
		help: "Applies only to node settlement",
		range: [-100, 100],
		source: "Node vs. hub price history from ISO data, weighted by the project’s output"
	},
	{
		key: "transactionCost",
		label: "Transaction costs",
		format: "usd",
		kind: "input",
		help: "One-time legal, advisory, and procurement costs",
		range: [0, 1e8],
		source: "Quotes from counsel and the procurement advisor"
	},
	{
		key: "hubPrice",
		label: "Hub price, year 1",
		format: "perMWh",
		kind: "input",
		help: "Around-the-clock wholesale price",
		range: [1, 500],
		core: true,
		source: "Dated hub forward curve from a broker or the ISO; stale curves are common"
	},
	{
		key: "wholesaleEscalation",
		label: "Wholesale price escalation",
		format: "pct",
		kind: "input",
		help: "Annual growth in wholesale prices",
		range: [-.05, .25],
		core: true,
		source: "Advisor’s long-run fundamentals forecast; cross-check with EIA’s Annual Energy Outlook. A single year’s inflation is not a forecast"
	},
	{
		key: "captureRate",
		label: "Capture rate",
		format: "pct",
		kind: "input",
		help: "Project's generation-weighted price as a share of the around-the-clock price",
		range: [-1.5, 2.5],
		source: "Shape or capture study for the project’s location"
	},
	{
		key: "annualLoadMWh",
		label: "Annual load",
		format: "mwh",
		kind: "input",
		help: "Electricity use to be matched with RECs",
		range: [1, 1e9],
		core: true,
		source: "Utility bills or the energy management system, for the sites the claim covers"
	},
	{
		key: "recPrice",
		label: "REC price, year 1",
		format: "perMWh",
		kind: "input",
		help: "Unbundled REC price",
		range: [0, 100],
		core: true,
		source: "Broker quote for the exact product and vintage (national voluntary vs. state compliance)"
	},
	{
		key: "recEscalation",
		label: "REC price escalation",
		format: "pct",
		kind: "input",
		help: "Annual growth in REC prices",
		range: [-.2, .5],
		source: "Broker view; voluntary REC prices have no steady trend"
	},
	{
		key: "discountRate",
		label: "Discount rate",
		format: "pct",
		kind: "input",
		help: "Rate used to discount future costs",
		range: [0, .3],
		core: true,
		source: "Treasury or finance (the company’s cost of capital)"
	},
	{
		key: "accountingReviewed",
		label: "Derivative accounting reviewed",
		format: "bool",
		kind: "input",
		help: "ASC 815 / IFRS 9 treatment confirmed",
		source: "Controller’s group"
	},
	{
		key: "creditSupportReviewed",
		label: "Credit support reviewed",
		format: "bool",
		kind: "input",
		help: "Collateral or guarantee requirements known",
		source: "Treasury and the term sheet"
	},
	{
		key: "negativePriceTermsReviewed",
		label: "Negative-price terms reviewed",
		format: "bool",
		kind: "input",
		help: "Floor or curtailment clause checked",
		source: "The contract, reviewed by counsel"
	},
	{
		key: "marketBoundaryConfirmed",
		label: "REC market boundary confirmed",
		format: "bool",
		kind: "input",
		help: "RECs come from the same market as the load",
		source: "REC tracking system records (e.g. M-RETS, PJM-GATS, ERCOT)"
	},
	{
		key: "scope2RevisionConsidered",
		label: "Scope 2 revision considered",
		format: "bool",
		kind: "input",
		help: "GHG Protocol Scope 2 proposals reviewed",
		source: "Sustainability reporting lead"
	},
	{
		key: "year1GenerationMWh",
		label: "Year-1 generation",
		format: "mwh",
		kind: "derived",
		help: "Size x 8,760 h x capacity factor"
	},
	{
		key: "coverageRatio",
		label: "Load covered by the project",
		format: "pct",
		kind: "derived",
		help: "Year-1 generation / annual load"
	},
	{
		key: "year1SettlementPrice",
		label: "Project market value, year 1",
		format: "perMWh",
		kind: "derived",
		help: "Hub price x capture rate (+ basis at a node)"
	},
	{
		key: "year1SpreadToStrike",
		label: "Year-1 market value minus strike",
		format: "perMWh",
		kind: "derived",
		help: "Negative means the buyer pays in year 1"
	},
	{
		key: "finalYearHubPrice",
		label: "Hub price in final year",
		format: "perMWh",
		kind: "derived",
		help: "Year-1 hub price compounded over the term"
	},
	{
		key: "hubPriceMultiple",
		label: "Final-year hub price vs. today",
		format: "multiple",
		kind: "derived",
		help: "How many times today’s price the model assumes by the last year"
	},
	{
		key: "escalationMinusDiscount",
		label: "Escalation minus discount rate",
		format: "pct",
		kind: "derived",
		help: "Positive means distant years weigh as much as near ones"
	},
	{
		key: "npvAdvantage",
		label: "VPPA advantage (NPV)",
		format: "usd",
		kind: "derived",
		help: "REC strategy cost minus VPPA cost; positive favors the VPPA"
	},
	{
		key: "recommendsVppa",
		label: "Result favors the VPPA",
		format: "bool",
		kind: "derived",
		help: "true when the VPPA costs less"
	},
	{
		key: "breakEvenEscalation",
		label: "Break-even escalation",
		format: "pct",
		kind: "derived",
		help: "Escalation at which both options cost the same"
	},
	{
		key: "escalationCushion",
		label: "Distance to break-even escalation",
		format: "pct",
		kind: "derived",
		help: "Absolute gap between assumed and break-even escalation"
	},
	{
		key: "breakEvenStrike",
		label: "Break-even strike price",
		format: "perMWh",
		kind: "derived",
		help: "Strike at which both options cost the same"
	},
	{
		key: "lateValueShare",
		label: "VPPA upside after year 10",
		format: "pct",
		kind: "derived",
		help: "Share of discounted positive settlements that arrive after year 10"
	},
	{
		key: "firstPositiveYear",
		label: "First year the VPPA pays out",
		format: "year",
		kind: "derived",
		help: "0 when it never does"
	},
	{
		key: "expectedInflation",
		label: "Inflation markets expect (10 yr)",
		format: "pct",
		kind: "derived",
		help: "10-year breakeven inflation, FRED"
	},
	{
		key: "escalationOverInflation",
		label: "Escalation above expected inflation",
		format: "pct",
		kind: "derived",
		help: "Assumed wholesale escalation minus expected inflation"
	},
	{
		key: "recentInflation",
		label: "Inflation, last 12 months",
		format: "pct",
		kind: "derived",
		help: "CPI, FRED"
	},
	{
		key: "inflationPeak2022",
		label: "Inflation peak in 2022",
		format: "pct",
		kind: "derived",
		help: "Highest 12-month CPI change in 2022, FRED"
	},
	{
		key: "treasury10y",
		label: "10-year Treasury yield",
		format: "pct",
		kind: "derived",
		help: "Risk-free rate, FRED"
	},
	{
		key: "discountOverTreasury",
		label: "Discount rate above Treasuries",
		format: "pct",
		kind: "derived",
		help: "Discount rate minus the 10-year Treasury yield"
	},
	{
		key: "marketCostOfCapital",
		label: "Average US cost of capital",
		format: "pct",
		kind: "derived",
		help: "Damodaran, all US companies"
	},
	{
		key: "hasPriceData",
		label: "Market price data available",
		format: "bool",
		kind: "derived",
		help: "Hourly hub prices were fetched for this market"
	},
	{
		key: "marketHubPrice",
		label: "Market average price, past year",
		format: "perMWh",
		kind: "derived",
		help: "Average day-ahead price at the market’s main hub"
	},
	{
		key: "hubPriceVsMarket",
		label: "Hub price vs. past year",
		format: "multiple",
		kind: "derived",
		help: "Assumed year-1 hub price divided by the past year’s average"
	},
	{
		key: "marketNegativeHourShare",
		label: "Hours with negative prices",
		format: "pct",
		kind: "derived",
		help: "Share of day-ahead hours below $0 at the hub, past year"
	},
	{
		key: "marketCaptureRate",
		label: "Capture rate in this market",
		format: "pct",
		kind: "derived",
		help: "What solar or wind output earned vs. the average price, past year"
	},
	{
		key: "expectedCaptureRate",
		label: "Expected capture rate",
		format: "pct",
		kind: "derived",
		help: "Measured in this market when available; otherwise a planning default (solar 85%, wind 90%)"
	},
	{
		key: "captureRateVsMarket",
		label: "Capture rate above market",
		format: "pct",
		kind: "derived",
		help: "Assumed capture rate minus what the market delivered"
	},
	{
		key: "expectedCapacityFactor",
		label: "Expected capacity factor",
		format: "pct",
		kind: "derived",
		help: "NREL PVWatts for the region (solar) or the US fleet average (EIA)"
	},
	{
		key: "capacityFactorVsExpected",
		label: "Capacity factor above expected",
		format: "pct",
		kind: "derived",
		help: "Assumed capacity factor minus the expected one"
	}
];
var FACT_BY_KEY = Object.fromEntries(FACTS.map((f) => [f.key, f]));
function deriveFacts(inputs, result = runModel(inputs)) {
	const plain = { ...inputs.diligence };
	for (const [key, value] of Object.entries(inputs)) if (typeof value !== "object") plain[key] = value;
	const rows = result.rows;
	const year1 = rows[0];
	const last = rows[rows.length - 1];
	let positive = 0;
	let positiveLate = 0;
	let firstPositiveYear = 0;
	for (const row of rows) if (row.settlement > 0) {
		const pv = row.settlement * row.discountFactor;
		positive += pv;
		if (row.year > 10) positiveLate += pv;
		if (!firstPositiveYear) firstPositiveYear = row.year;
	}
	const beEsc = breakEvenEscalation(inputs);
	return {
		...plain,
		year1GenerationMWh: year1.generationMWh,
		coverageRatio: inputs.annualLoadMWh > 0 ? year1.generationMWh / inputs.annualLoadMWh : 0,
		year1SettlementPrice: year1.settlementPrice,
		year1SpreadToStrike: year1.settlementPrice - year1.strikePrice,
		finalYearHubPrice: last.hubPrice,
		hubPriceMultiple: inputs.hubPrice > 0 ? last.hubPrice / inputs.hubPrice : 0,
		escalationMinusDiscount: inputs.wholesaleEscalation - inputs.discountRate,
		npvAdvantage: result.npvAdvantage,
		recommendsVppa: result.recommendation === "VPPA",
		breakEvenEscalation: beEsc,
		escalationCushion: Math.abs(inputs.wholesaleEscalation - beEsc),
		breakEvenStrike: breakEvenStrike(inputs),
		lateValueShare: positive > 0 ? positiveLate / positive : 0,
		firstPositiveYear,
		...dataFacts(inputs)
	};
}
/**
* Values that cannot be right, as opposed to values that are merely
* aggressive (those are the checks' job). Usually a unit mix-up, such as a
* capacity factor of 24 meant as 24%.
*/
function validateInputs(inputs) {
	const problems = [];
	for (const f of FACTS) {
		if (f.kind !== "input" || !f.range) continue;
		const value = inputs[f.key];
		if (typeof value !== "number") continue;
		const [lo, hi] = f.range;
		if (!Number.isFinite(value) || value < lo || value > hi) problems.push({
			key: f.key,
			value,
			range: f.range,
			message: `${f.label} must be between ${fmtRange(f.format, lo)} and ${fmtRange(f.format, hi)}.`
		});
	}
	return problems;
}
function fmtRange(format, v) {
	if (format === "pct") return `${Math.round(v * 1e3) / 10}%`;
	if (format === "perMWh") return `$${v}/MWh`;
	if (format === "usd") return `$${v.toLocaleString("en-US")}`;
	return v.toLocaleString("en-US");
}
// src/engine/format.ts
function fmtUSD(value, opts = {}) {
	if (!Number.isFinite(value)) return "—";
	const sign = value < 0 ? "−" : opts.sign && value > 0 ? "+" : "";
	const abs = Math.abs(value);
	let body;
	if (abs >= 1e9) body = `$${(abs / 1e9).toFixed(2)}B`;
	else if (abs >= 1e6) body = `$${(abs / 1e6).toFixed(abs >= 1e8 ? 0 : abs >= 1e7 ? 1 : 2)}M`;
	else if (abs >= 1e3) body = `$${(abs / 1e3).toFixed(abs >= 1e5 ? 0 : 1)}K`;
	else body = `$${abs.toFixed(0)}`;
	return sign + body;
}
function fmtPct(value, digits) {
	if (!Number.isFinite(value)) return "—";
	const pct = value * 100;
	const d = digits ?? (Math.abs(pct) < 10 && Math.round(pct * 100) % 100 !== 0 ? 2 : 1);
	return `${trimZeros(pct.toFixed(d))}%`;
}
function fmtPerMWh(value) {
	if (!Number.isFinite(value)) return "—";
	return `${value < 0 ? "−" : ""}$${Math.abs(value).toFixed(2)}/MWh`;
}
function fmtNumber(value, digits = 0) {
	if (!Number.isFinite(value)) return "—";
	return value.toLocaleString("en-US", {
		maximumFractionDigits: digits,
		minimumFractionDigits: 0
	});
}
function trimZeros(s) {
	return s.includes(".") ? s.replace(/\.?0+$/, "") : s;
}
function formatValue(value, format) {
	if (value === void 0) return "—";
	if (typeof value === "boolean") return value ? "yes" : "no";
	if (typeof value === "string") return value;
	switch (format) {
		case "pct": return fmtPct(value);
		case "usd": return fmtUSD(value);
		case "perMWh": return fmtPerMWh(value);
		case "mwh": return `${fmtNumber(value)} MWh`;
		case "mw": return `${fmtNumber(value, 1)} MW`;
		case "years": return `${fmtNumber(value)} years`;
		case "year": return value ? `year ${fmtNumber(value)}` : "never";
		case "multiple": return `${value.toFixed(2)}×`;
		default: return fmtNumber(value, 2);
	}
}
function formatFact(key, value) {
	return formatValue(value, FACT_BY_KEY[key]?.format ?? "text");
}
/** Replaces `{factKey}` placeholders with formatted fact values. */
function renderTemplate(template, facts) {
	return template.replace(/\{(\w+)\}/g, (match, key) => key in facts ? formatFact(key, facts[key]) : match);
}
// src/engine/builtinRules.ts
/**
* The starter playbook. Every threshold and benchmark here is a default a
* reviewer can edit in the app; sources and dates are listed so people can
* tell when a number has gone stale.
*/
var BUILT_IN_RULES = [
	{
		id: "MKT-ESC-HIGH",
		title: "Wholesale price escalation far above long-run norms",
		category: "Market prices",
		severity: "critical",
		when: [{
			fact: "wholesaleEscalation",
			op: ">",
			value: .04
		}],
		message: "Wholesale prices are assumed to rise {wholesaleEscalation} a year. Compounded over {termYears}, that puts the hub price at {finalYearHubPrice} in the final year, {hubPriceMultiple} today’s level.",
		why: "PPA models typically escalate wholesale prices 2.5–3% a year, roughly long-run inflation, because long-range forecasts show flat real power prices. A rate like 7.5% looks like one high-inflation year applied to the whole term. Higher escalation raises every future VPPA settlement, so it makes the VPPA look better than it is. Load growth from data centers has lifted near-term prices in some markets (PJM, for example). That can support a higher rate for the first few years, not for the full term.",
		ask: "What is the source for this escalation rate, and why should it hold for every year of the contract?",
		benchmark: {
			input: "wholesaleEscalation",
			value: .0275,
			label: "2.75%/yr, the midpoint of the typical 2.5–3% range",
			data: "escalation"
		},
		source: "Typical PPA modeling range; Federal Reserve 2% inflation target; EIA Annual Energy Outlook (roughly flat real wholesale prices)",
		origin: "built-in",
		lesson: "Added after a reviewer caught a VPPA vs. REC model that used 7.5%/yr wholesale price inflation for the whole term. It made the VPPA look favorable when it was not."
	},
	{
		id: "MKT-ESC-ELEVATED",
		title: "Wholesale price escalation at the high end",
		category: "Market prices",
		severity: "warning",
		when: [{
			fact: "wholesaleEscalation",
			op: "between",
			value: [.0351, .04]
		}],
		message: "Wholesale prices rise {wholesaleEscalation} a year, above the typical 2.5–3% range.",
		why: "Small differences in escalation compound over a long contract. Half a point above the norm can decide a close comparison.",
		ask: "What market view supports escalation above 3.5% a year?",
		benchmark: {
			input: "wholesaleEscalation",
			value: .0275,
			label: "2.75%/yr",
			data: "escalation"
		},
		source: "Typical PPA modeling range",
		origin: "built-in"
	},
	{
		id: "MKT-ESC-VS-INFLATION",
		title: "Escalation well above expected inflation",
		category: "Market prices",
		severity: "warning",
		when: [{
			fact: "escalationOverInflation",
			op: ">",
			value: .01
		}, {
			fact: "wholesaleEscalation",
			op: "<",
			value: .0351
		}],
		message: "Wholesale prices rise {wholesaleEscalation} a year, more than a point above the {expectedInflation} inflation bond markets expect over the next decade.",
		why: "Long-run power prices tend to track general inflation. Assuming they outrun it every year for the whole term is a forecast that needs its own support.",
		ask: "What makes power prices rise faster than inflation for the entire term?",
		benchmark: {
			input: "wholesaleEscalation",
			value: .0275,
			label: "2.75%/yr",
			data: "escalation"
		},
		source: "FRED 10-year breakeven inflation (T10YIE), refreshed weekly",
		origin: "built-in"
	},
	{
		id: "MKT-ESC-VS-DISCOUNT",
		title: "Prices grow as fast as the discount rate",
		category: "Market prices",
		severity: "warning",
		when: [{
			fact: "escalationMinusDiscount",
			op: ">=",
			value: 0
		}],
		message: "Wholesale prices grow {wholesaleEscalation} a year, at or above the {discountRate} discount rate. The final years count as much as the first.",
		why: "When escalation matches or beats the discount rate, distant settlements are not discounted away. The answer then rests on price forecasts 10 or more years out, which are the least reliable part of the model.",
		ask: "Is the discount rate the company’s real cost of capital, and is escalation in the same nominal or real terms?",
		source: "Basic discounting consistency",
		origin: "built-in"
	},
	{
		id: "MKT-CAPTURE-SOLAR",
		title: "Solar valued at the full around-the-clock price",
		category: "Market prices",
		severity: "warning",
		when: [
			{
				fact: "technology",
				op: "==",
				value: "solar"
			},
			{
				fact: "captureRate",
				op: ">=",
				value: .98
			},
			{
				fact: "expectedCaptureRate",
				op: "<",
				value: .95
			}
		],
		message: "Solar output is valued at {captureRate} of the around-the-clock hub price; expect about {expectedCaptureRate} here.",
		why: "Solar produces in midday hours, when prices are lowest, and the discount deepens as more solar is built. CAISO solar captured about 72% of the average price in 2021 and went negative in spring 2026. Pricing solar at 100% overstates the VPPA’s settlements every year.",
		ask: "Is there a shape or capture-rate analysis for this project’s location?",
		benchmark: {
			input: "captureRate",
			value: .85,
			label: "85% (planning placeholder; replace with a market-specific shape study)",
			data: "captureRate"
		},
		source: "Modo Energy, CAISO solar capture (spring 2026); Enverus; IER analysis of CAISO 2021",
		origin: "built-in"
	},
	{
		id: "MKT-CAPTURE-VS-MARKET",
		title: "Capture rate above what the market delivered",
		category: "Market prices",
		severity: "warning",
		when: [{
			fact: "captureRateVsMarket",
			op: ">",
			value: .1
		}, {
			fact: "captureRate",
			op: "<",
			value: .98
		}],
		message: "A {captureRate} capture rate is well above the {marketCaptureRate} that {technology} output actually earned in this market over the past year.",
		why: "Capture rates move with how much solar and wind a market already has. Last year’s market-wide figure is the best public starting point; a project-specific shape study can justify a different number.",
		ask: "What shape or capture study supports a higher capture rate than the market delivered?",
		benchmark: {
			input: "captureRate",
			value: .85,
			label: "market capture rate",
			data: "captureRate"
		},
		source: "Grid operator day-ahead hub prices × EIA-930 hourly output, refreshed weekly",
		origin: "built-in"
	},
	{
		id: "MKT-CAPTURE-WIND",
		title: "Wind valued at the full around-the-clock price",
		category: "Market prices",
		severity: "info",
		when: [
			{
				fact: "technology",
				op: "==",
				value: "wind"
			},
			{
				fact: "captureRate",
				op: ">=",
				value: .98
			},
			{
				fact: "expectedCaptureRate",
				op: "<",
				value: .95
			}
		],
		message: "Wind output is valued at {captureRate} of the around-the-clock hub price; expect about {expectedCaptureRate} here.",
		why: "Wind often blows hardest at night and in shoulder seasons, when prices are lower, so its capture rate is usually below 100%.",
		ask: "Is there a shape analysis for this wind project?",
		benchmark: {
			input: "captureRate",
			value: .9,
			label: "90% (placeholder)",
			data: "captureRate"
		},
		source: "General market practice",
		origin: "built-in"
	},
	{
		id: "MKT-NODE-BASIS",
		title: "Node settlement with no basis",
		category: "Market prices",
		severity: "warning",
		when: [{
			fact: "settlementPoint",
			op: "==",
			value: "node"
		}, {
			fact: "basis",
			op: "==",
			value: 0
		}],
		message: "The VPPA settles at the project node, but the model assumes the node price equals the hub price.",
		why: "Nodes with a lot of renewable output often price below the hub when output is high, because of congestion. With node settlement the buyer carries that basis risk.",
		ask: "What does the node’s price history show against the hub?",
		benchmark: {
			input: "basis",
			value: -3,
			label: "−$3/MWh (placeholder; use the node’s history)"
		},
		source: "General market practice",
		origin: "built-in"
	},
	{
		id: "MKT-HUB-RANGE",
		title: "Year-1 hub price outside recent ranges",
		category: "Market prices",
		severity: "info",
		when: [{
			fact: "hubPrice",
			op: "outside",
			value: [20, 100]
		}],
		message: "A year-1 hub price of {hubPrice} is outside the $20–$100/MWh band most US hubs have traded in recently.",
		why: "The starting price sets the level for every year that follows. An old or mislabeled forward curve shifts the whole result.",
		ask: "Which forward curve is this from, and what date?",
		source: "General market practice",
		origin: "built-in"
	},
	{
		id: "MKT-HUB-VS-MARKET",
		title: "Year-1 hub price far from the past year",
		category: "Market prices",
		severity: "warning",
		when: [{
			fact: "hubPriceVsMarket",
			op: "outside",
			value: [.8, 1.25]
		}],
		message: "A year-1 hub price of {hubPrice} is {hubPriceVsMarket} the {marketHubPrice} average day-ahead price at this market’s main hub over the past year.",
		why: "Next year’s prices can differ from last year’s, but a gap of more than 20–25% usually means an old curve, an on-peak price used as an around-the-clock one, or the wrong hub.",
		ask: "Which forward curve and hub is this price from, and is it around-the-clock or on-peak?",
		benchmark: {
			input: "hubPrice",
			value: 45,
			label: "past-year average",
			data: "hubPrice",
			auto: false
		},
		source: "Grid operator day-ahead hub prices, refreshed weekly",
		origin: "built-in"
	},
	{
		id: "PRJ-CF-SOLAR",
		title: "Solar capacity factor outside the usual range",
		category: "Project output",
		severity: "warning",
		when: [{
			fact: "technology",
			op: "==",
			value: "solar"
		}, {
			fact: "capacityFactor",
			op: "outside",
			value: [.15, .33]
		}],
		message: "A {capacityFactor} capacity factor is outside the 15–33% range for utility-scale solar.",
		why: "US utility-scale solar averages about 24%. Single-axis trackers in the Southwest reach the low 30s.",
		ask: "Is this from an independent energy yield assessment (P50)?",
		benchmark: {
			input: "capacityFactor",
			value: .24,
			label: "24%, the US utility-scale average",
			data: "capacityFactor"
		},
		source: "EIA Electric Power Monthly, capacity factors for utility-scale solar",
		origin: "built-in"
	},
	{
		id: "PRJ-CF-WIND",
		title: "Wind capacity factor outside the usual range",
		category: "Project output",
		severity: "warning",
		when: [{
			fact: "technology",
			op: "==",
			value: "wind"
		}, {
			fact: "capacityFactor",
			op: "outside",
			value: [.25, .5]
		}],
		message: "A {capacityFactor} capacity factor is outside the 25–50% range for US wind.",
		why: "The US wind fleet averages roughly 35%; newer projects in strong wind regions reach the mid-40s.",
		ask: "Is this from an independent energy yield assessment (P50)?",
		benchmark: {
			input: "capacityFactor",
			value: .36,
			label: "36%",
			data: "capacityFactor"
		},
		source: "EIA Electric Power Monthly; LBNL Land-Based Wind Market Report",
		origin: "built-in"
	},
	{
		id: "PRJ-CF-VS-EXPECTED",
		title: "Capacity factor above what is expected here",
		category: "Project output",
		severity: "warning",
		when: [{
			fact: "capacityFactorVsExpected",
			op: ">",
			value: .04
		}],
		message: "A {capacityFactor} capacity factor is more than 4 points above the {expectedCapacityFactor} expected for {technology} in this market.",
		why: "Higher output means more MWh settling against the strike every year. Developer estimates often run high; an independent P50 assessment is the reliable number.",
		ask: "Is this from an independent energy yield assessment (P50)?",
		benchmark: {
			input: "capacityFactor",
			value: .24,
			label: "expected capacity factor",
			data: "capacityFactor"
		},
		source: "NREL PVWatts for the region (solar); EIA fleet average (wind); refreshed weekly",
		origin: "built-in"
	},
	{
		id: "PRJ-NO-DEGRADATION",
		title: "No output degradation",
		category: "Project output",
		severity: "warning",
		when: [{
			fact: "degradation",
			op: "<=",
			value: 0
		}],
		message: "The project produces the same amount every year for {termYears}.",
		why: "Solar panels lose about 0.5% of output a year, and wind turbine output also declines with age. Ignoring this overstates generation and settlements in later years.",
		ask: "What degradation rate does the developer’s yield assessment use?",
		benchmark: {
			input: "degradation",
			value: .005,
			label: "0.5%/yr"
		},
		source: "NREL photovoltaic degradation studies; LBNL wind performance studies",
		origin: "built-in"
	},
	{
		id: "PRJ-OVERSIZED",
		title: "Project larger than the load",
		category: "Project output",
		severity: "warning",
		when: [{
			fact: "coverageRatio",
			op: ">",
			value: 1.1
		}],
		message: "The project generates {coverageRatio} of annual load.",
		why: "Surplus RECs have no value in this comparison unless you can resell them, and you carry price risk on volume you do not use.",
		ask: "Is there a plan for the surplus RECs, or should the contracted share be smaller?",
		source: "General procurement practice",
		origin: "built-in"
	},
	{
		id: "CTR-STRIKE-SOLAR",
		title: "Solar strike price far from current offers",
		category: "Contract terms",
		severity: "info",
		when: [{
			fact: "technology",
			op: "==",
			value: "solar"
		}, {
			fact: "strikePrice",
			op: "outside",
			value: [45, 85]
		}],
		message: "A {strikePrice} strike is far from current North American solar offers (about $61–65/MWh in 2026).",
		why: "A strike well below the market makes the VPPA look cheap; one well above it may signal a stale quote.",
		ask: "Is this a firm offer, and from when?",
		benchmark: {
			input: "strikePrice",
			value: 63,
			label: "$63/MWh, LevelTen P25 solar index, 2026"
		},
		source: "LevelTen Energy PPA Price Index, North America, Q1–Q3 2026",
		origin: "built-in"
	},
	{
		id: "CTR-STRIKE-WIND",
		title: "Wind strike price far from current offers",
		category: "Contract terms",
		severity: "info",
		when: [{
			fact: "technology",
			op: "==",
			value: "wind"
		}, {
			fact: "strikePrice",
			op: "outside",
			value: [55, 100]
		}],
		message: "A {strikePrice} strike is far from current North American wind offers (about $68–80/MWh in 2026).",
		why: "A strike well below the market makes the VPPA look cheap; one well above it may signal a stale quote.",
		ask: "Is this a firm offer, and from when?",
		benchmark: {
			input: "strikePrice",
			value: 72,
			label: "$72/MWh, LevelTen P25 wind index, 2026"
		},
		source: "LevelTen Energy PPA Price Index, North America, 2026",
		origin: "built-in"
	},
	{
		id: "CTR-TERM",
		title: "Unusual contract length",
		category: "Contract terms",
		severity: "info",
		when: [{
			fact: "termYears",
			op: "outside",
			value: [8, 20]
		}],
		message: "A {termYears} term is outside the usual 10–20 years for a VPPA.",
		why: "Longer terms lean harder on long-range price forecasts; shorter ones are hard to get financed.",
		source: "General market practice",
		origin: "built-in"
	},
	{
		id: "CTR-NO-TXN-COST",
		title: "No transaction costs",
		category: "Contract terms",
		severity: "info",
		when: [{
			fact: "transactionCost",
			op: "<=",
			value: 0
		}],
		message: "The VPPA carries no legal, advisory, or procurement costs.",
		why: "Negotiating a VPPA usually involves outside counsel and an advisor. Buying unbundled RECs costs little to set up.",
		ask: "What will counsel and the advisor charge for this deal?",
		benchmark: {
			input: "transactionCost",
			value: 35e4,
			label: "$350K (placeholder)"
		},
		source: "General market practice",
		origin: "built-in"
	},
	{
		id: "CTR-NEGATIVE-PRICES",
		title: "Negative-price terms not reviewed",
		category: "Contract terms",
		severity: "warning",
		when: [{
			fact: "negativePriceTermsReviewed",
			op: "==",
			value: false
		}, {
			fact: "hasPriceData",
			op: "==",
			value: false
		}],
		message: "Nobody has confirmed how the VPPA settles when prices go negative.",
		why: "In markets with frequent negative prices (ERCOT, SPP, CAISO), a VPPA with no price floor or curtailment clause can make the buyer pay the strike plus the negative price. This model uses annual averages and cannot show that cost.",
		ask: "Does the contract include a floor at $0 or a curtailment right during negative prices?",
		source: "General market practice",
		origin: "built-in"
	},
	{
		id: "CTR-NEGATIVE-PRICES-FREQUENT",
		title: "Frequent negative prices, terms not reviewed",
		category: "Contract terms",
		severity: "warning",
		when: [{
			fact: "marketNegativeHourShare",
			op: ">",
			value: .02
		}, {
			fact: "negativePriceTermsReviewed",
			op: "==",
			value: false
		}],
		message: "Day-ahead prices at this market’s hub were negative in {marketNegativeHourShare} of hours over the past year, and nobody has confirmed how the VPPA settles then.",
		why: "In those hours a VPPA with no price floor makes the buyer pay the strike plus the negative price. This model uses annual averages and cannot show that cost.",
		ask: "Does the contract include a floor at $0 or a curtailment right during negative prices?",
		source: "Grid operator day-ahead hub prices, refreshed weekly",
		origin: "built-in"
	},
	{
		id: "FIN-DISCOUNT",
		title: "Discount rate outside the usual corporate range",
		category: "Finance & RECs",
		severity: "warning",
		when: [{
			fact: "discountRate",
			op: "outside",
			value: [.05, .12]
		}],
		message: "A {discountRate} discount rate is outside the 5–12% range typical for corporate cost of capital.",
		why: "A low rate inflates the weight of distant years, where VPPA value usually sits.",
		ask: "Did finance supply this rate?",
		benchmark: {
			input: "discountRate",
			value: .08,
			label: "8%",
			data: "discountRate"
		},
		source: "General corporate finance practice",
		origin: "built-in"
	},
	{
		id: "FIN-DISCOUNT-BELOW-TREASURY",
		title: "Discount rate below the risk-free rate",
		category: "Finance & RECs",
		severity: "warning",
		when: [{
			fact: "discountOverTreasury",
			op: "<",
			value: 0
		}],
		message: "A {discountRate} discount rate is below the {treasury10y} yield on 10-year US Treasuries.",
		why: "A company’s cost of capital is almost always above the risk-free rate. Discounting below it overweights distant years, where VPPA value usually sits.",
		ask: "Did finance supply this rate, and is it current?",
		benchmark: {
			input: "discountRate",
			value: .08,
			label: "8%",
			data: "discountRate"
		},
		source: "FRED 10-year Treasury yield (DGS10); Damodaran cost of capital; refreshed weekly",
		origin: "built-in"
	},
	{
		id: "FIN-REC-COMPLIANCE-PRICE",
		title: "REC price looks like a compliance-market price",
		category: "Finance & RECs",
		severity: "warning",
		when: [{
			fact: "recPrice",
			op: ">",
			value: 15
		}],
		message: "A REC price of {recPrice} is far above national voluntary RECs.",
		why: "National voluntary wind RECs traded around $4–5/MWh for 2025 vintage. Prices above $15 look like state compliance RECs (New York Tier 1 sells for about $24–41/MWh). A high REC price makes the REC strategy look expensive and flatters the VPPA, which brings its own RECs.",
		ask: "Which REC product and vintage is this price for?",
		benchmark: {
			input: "recPrice",
			value: 5,
			label: "$5/MWh, national voluntary"
		},
		source: "S&P Global Platts assessments (2025); NYSERDA Tier 1 2026 pre-sale",
		origin: "built-in"
	},
	{
		id: "FIN-REC-STALE-PRICE",
		title: "REC price below recent levels",
		category: "Finance & RECs",
		severity: "info",
		when: [{
			fact: "recPrice",
			op: "<",
			value: 1
		}],
		message: "A REC price of {recPrice} matches pre-2020 levels.",
		why: "Voluntary REC prices sat under $1/MWh through 2019, then rose. An old quote understates the REC strategy’s cost.",
		benchmark: {
			input: "recPrice",
			value: 4.5,
			label: "$4.50/MWh, national voluntary wind, 2025 vintage"
		},
		source: "US EPA Landfill Methane Outreach Program; S&P Global Platts",
		origin: "built-in"
	},
	{
		id: "FIN-REC-ESCALATION",
		title: "REC prices assumed to climb quickly",
		category: "Finance & RECs",
		severity: "warning",
		when: [{
			fact: "recEscalation",
			op: ">",
			value: .05
		}],
		message: "REC prices are assumed to rise {recEscalation} a year.",
		why: "Voluntary REC prices have been low and volatile without a steady upward trend. Fast REC escalation inflates the REC strategy’s cost.",
		ask: "What supports a steady rise in REC prices?",
		benchmark: {
			input: "recEscalation",
			value: .02,
			label: "2%/yr"
		},
		source: "General market practice",
		origin: "built-in"
	},
	{
		id: "RES-LATE-VALUE",
		title: "Most of the VPPA’s value arrives late",
		category: "Result robustness",
		severity: "warning",
		when: [{
			fact: "lateValueShare",
			op: ">",
			value: .6
		}],
		message: "{lateValueShare} of the VPPA’s discounted upside arrives after year 10. It first pays out in {firstPositiveYear}.",
		why: "Value that depends on prices a decade away is the least certain part of any forecast.",
		ask: "How does the result look if prices stop rising after year 10?",
		source: "Forecast uncertainty grows with time",
		origin: "built-in"
	},
	{
		id: "RES-THIN-CUSHION",
		title: "The answer flips with a small change in escalation",
		category: "Result robustness",
		severity: "warning",
		when: [{
			fact: "escalationCushion",
			op: "<",
			value: .01
		}],
		message: "The two options cost the same at {breakEvenEscalation} escalation, within one point of the assumed {wholesaleEscalation}.",
		why: "When a one-point change in a forecast flips the decision, the decision is a bet on that forecast.",
		source: "Sensitivity analysis",
		origin: "built-in"
	},
	{
		id: "ACC-DERIVATIVE",
		title: "Derivative accounting not reviewed",
		category: "Claims & accounting",
		severity: "warning",
		when: [{
			fact: "accountingReviewed",
			op: "==",
			value: false
		}],
		message: "Accounting has not confirmed how the VPPA will be reported.",
		why: "A VPPA can meet the definition of a derivative under ASC 815 (or IFRS 9). Mark-to-market treatment puts quarterly swings in reported earnings, which this cost comparison does not show.",
		ask: "Has the controller’s group assessed ASC 815 treatment?",
		source: "FASB ASC 815; IFRS 9",
		origin: "built-in"
	},
	{
		id: "ACC-CREDIT",
		title: "Credit support not reviewed",
		category: "Claims & accounting",
		severity: "info",
		when: [{
			fact: "creditSupportReviewed",
			op: "==",
			value: false
		}],
		message: "Collateral or guarantee requirements are not in the analysis.",
		why: "Developers often require a parent guarantee or letter of credit. Collateral has a cost and uses credit capacity.",
		ask: "What credit support will the developer require?",
		source: "General market practice",
		origin: "built-in"
	},
	{
		id: "CLM-MARKET-BOUNDARY",
		title: "REC market boundary not confirmed",
		category: "Claims & accounting",
		severity: "warning",
		when: [{
			fact: "marketBoundaryConfirmed",
			op: "==",
			value: false
		}],
		message: "Nobody has confirmed that the RECs come from the same market as the load.",
		why: "Under RE100 criteria and the GHG Protocol Scope 2 quality criteria, RECs must come from the same market as the electricity use they cover. The US and Canada count as one market.",
		ask: "Where are the RECs generated, and where is the load?",
		source: "RE100 technical criteria; GHG Protocol Scope 2 Guidance (2015)",
		origin: "built-in"
	},
	{
		id: "CLM-SCOPE2-REVISION",
		title: "Scope 2 revision not considered",
		category: "Claims & accounting",
		severity: "info",
		when: [{
			fact: "scope2RevisionConsidered",
			op: "==",
			value: false
		}],
		message: "The analysis does not consider the GHG Protocol’s Scope 2 revision.",
		why: "The GHG Protocol is revising Scope 2. Proposals include hourly matching, deliverability, and incrementality, possibly as a stricter method alongside today’s rules. Annual unbundled RECs from outside your grid region would likely count for less. Nothing is final as of 2026; check the current status.",
		ask: "How would each option count if hourly matching and deliverability are adopted?",
		source: "GHG Protocol Scope 2 public consultation (Oct 2025–Jan 2026) and 2026 consultation summaries",
		origin: "built-in"
	}
];
// src/engine/types.ts
var MARKETS = [
	"ERCOT",
	"PJM",
	"MISO",
	"SPP",
	"CAISO",
	"NYISO",
	"ISO-NE",
	"Other"
];
var SEVERITIES = [
	"critical",
	"warning",
	"info"
];
var CATEGORIES = [
	"Market prices",
	"Project output",
	"Contract terms",
	"Finance & RECs",
	"Result robustness",
	"Claims & accounting"
];
var OPERATORS = [
	">",
	">=",
	"<",
	"<=",
	"==",
	"!=",
	"outside",
	"between"
];
// src/engine/rules.ts
var EPSILON = 1e-9;
function evaluateCondition(c, facts) {
	const actual = facts[c.fact];
	if (actual === void 0) return false;
	if (c.op === "outside" || c.op === "between") {
		if (typeof actual !== "number" || !Array.isArray(c.value) || Number.isNaN(actual)) return false;
		const [lo, hi] = c.value;
		const inside = actual >= lo - EPSILON && actual <= hi + EPSILON;
		return c.op === "between" ? inside : !inside;
	}
	const expected = c.value;
	if (Array.isArray(expected)) return false;
	if (typeof actual === "number") {
		const n = typeof expected === "number" ? expected : Number(expected);
		if (Number.isNaN(actual) || Number.isNaN(n)) return false;
		switch (c.op) {
			case ">": return actual > n + EPSILON;
			case ">=": return actual >= n - EPSILON;
			case "<": return actual < n - EPSILON;
			case "<=": return actual <= n + EPSILON;
			case "==": return Math.abs(actual - n) <= EPSILON;
			case "!=": return Math.abs(actual - n) > EPSILON;
		}
	}
	const same = String(actual) === String(expected);
	if (c.op === "==") return same;
	if (c.op === "!=") return !same;
	return false;
}
function ruleFires(rule, facts) {
	return rule.when.length > 0 && rule.when.every((c) => evaluateCondition(c, facts));
}
var SEVERITY_RANK = {
	critical: 0,
	warning: 1,
	info: 2
};
/** Built-in checks (with any local edits) followed by checks reviewers added. */
function effectiveRules(playbook) {
	return [...BUILT_IN_RULES.map((r) => playbook.edits[r.id] ?? r), ...playbook.custom];
}
function activeRules(playbook) {
	const disabled = new Set(playbook.disabled);
	return effectiveRules(playbook).filter((r) => !disabled.has(r.id));
}
/**
* Runs every active check against the scenario. For checks that carry a
* benchmark, re-runs the model with only that one value swapped so the
* reviewer sees how much each assumption moves the answer on its own.
*/
function runPreflight(inputs, rules, base = runModel(inputs)) {
	const facts = deriveFacts(inputs, base);
	const findings = [];
	for (const original of rules) {
		if (!ruleFires(original, facts)) continue;
		const rule = original.benchmark ? {
			...original,
			benchmark: resolveBenchmark(original.benchmark, inputs)
		} : original;
		const finding = {
			rule,
			message: renderTemplate(rule.message, facts)
		};
		if (rule.benchmark) {
			const after = runModel(withInput(inputs, rule.benchmark.input, rule.benchmark.value));
			finding.impact = {
				benchmark: rule.benchmark,
				advantageAfter: after.npvAdvantage,
				delta: after.npvAdvantage - base.npvAdvantage,
				flips: after.recommendation !== base.recommendation
			};
		}
		findings.push(finding);
	}
	return findings.sort((a, b) => SEVERITY_RANK[a.rule.severity] - SEVERITY_RANK[b.rule.severity] || Math.abs(b.impact?.delta ?? 0) - Math.abs(a.impact?.delta ?? 0));
}
function asRule(raw, origin) {
	if (!raw || typeof raw !== "object") return null;
	const r = raw;
	if (typeof r.id !== "string" || typeof r.title !== "string" || !Array.isArray(r.when)) return null;
	const when = r.when.filter((c) => !!c && typeof c === "object" && typeof c.fact === "string" && OPERATORS.includes(c.op));
	if (!when.length) return null;
	return {
		...r,
		id: r.id,
		title: r.title,
		when,
		severity: SEVERITIES.includes(r.severity) ? r.severity : "warning",
		category: CATEGORIES.includes(r.category) ? r.category : "Result robustness",
		message: typeof r.message === "string" && r.message ? r.message : `${r.title}.`,
		why: typeof r.why === "string" ? r.why : "",
		origin
	};
}
/**
* Reads a shared playbook file: the current format ({custom, edits,
* disabled}), the earlier {rules: [...]} export, or a bare array of checks.
*/
function parsePlaybook(data) {
	const obj = Array.isArray(data) ? { rules: data } : data ?? {};
	const builtInIds = new Set(BUILT_IN_RULES.map((r) => r.id));
	const custom = (Array.isArray(obj.custom) ? obj.custom : Array.isArray(obj.rules) ? obj.rules : []).map((r) => asRule(r, "team")).filter((r) => r !== null && !builtInIds.has(r.id));
	const edits = {};
	if (obj.edits && typeof obj.edits === "object") for (const [id, r] of Object.entries(obj.edits)) {
		const rule = asRule(r, "built-in");
		if (rule && builtInIds.has(id) && rule.id === id) edits[id] = rule;
	}
	const disabled = Array.isArray(obj.disabled) ? obj.disabled.filter((d) => typeof d === "string") : [];
	if (!custom.length && !Object.keys(edits).length && !disabled.length) throw new Error("No checks found.");
	return {
		custom,
		edits,
		disabled
	};
}
// src/engine/review.ts
var OPEN = {
	disposition: "open",
	note: ""
};
function decisionFor(review, ruleId) {
	return review.decisions[ruleId] ?? OPEN;
}
// src/engine/memo.ts
/** "$41.2M toward RECs" — which way, and how far, a change pushes the answer. */
function shift(delta) {
	if (Math.abs(delta) < .5) return "by less than $1";
	return `${fmtUSD(Math.abs(delta))} toward ${delta > 0 ? "the VPPA" : "buying RECs"}`;
}
// src/engine/sensitivity.ts
var relative = (f) => (v) => v * f;
var offset = (d, min = -Infinity, max = Infinity) => (v) => Math.min(max, Math.max(min, v + d));
/** Plausible low/high values for each driver, relative to the scenario. */
var SWINGS = [
	{
		input: "wholesaleEscalation",
		label: "Wholesale escalation",
		low: () => .015,
		high: () => .04
	},
	{
		input: "hubPrice",
		label: "Year-1 hub price",
		low: relative(.8),
		high: relative(1.2)
	},
	{
		input: "captureRate",
		label: "Capture rate",
		low: offset(-.15, .3),
		high: offset(.05, 0, 1.1)
	},
	{
		input: "strikePrice",
		label: "Strike price",
		low: relative(.9),
		high: relative(1.1)
	},
	{
		input: "capacityFactor",
		label: "Capacity factor",
		low: relative(.9),
		high: relative(1.1)
	},
	{
		input: "discountRate",
		label: "Discount rate",
		low: offset(-.02, .01),
		high: offset(.02)
	},
	{
		input: "recPrice",
		label: "REC price",
		low: relative(.5),
		high: relative(2)
	},
	{
		input: "degradation",
		label: "Degradation",
		low: () => 0,
		high: () => .01
	}
];
/** One-at-a-time sensitivity of the VPPA advantage, widest swing first. */
function sensitivity(inputs) {
	const base = runModel(inputs).npvAdvantage;
	return SWINGS.map((s) => {
		const current = inputs[s.input];
		const lowValue = s.low(current);
		const highValue = s.high(current);
		const lowDelta = runModel(withInput(inputs, s.input, lowValue)).npvAdvantage - base;
		const highDelta = runModel(withInput(inputs, s.input, highValue)).npvAdvantage - base;
		return {
			input: s.input,
			label: s.label,
			lowValue,
			highValue,
			lowDelta,
			highDelta,
			range: Math.abs(highDelta - lowDelta)
		};
	}).sort((a, b) => b.range - a.range);
}
// src/engine/advice.ts
/**
* Turns a scenario into a single recommendation. Critical and warning
* findings that carry a benchmark are corrected automatically, unless a
* reviewer has decided otherwise; the advice then reports the corrected
* answer, how sure it is, and what would change it.
*/
function advise(inputs, rules, opts = {}) {
	const review = opts.review ?? { decisions: {} };
	const submitted = runModel(inputs);
	const findings = runPreflight(inputs, rules, submitted);
	const corrections = [];
	const superseded = [];
	const kept = [];
	const correctedKeys = /* @__PURE__ */ new Set();
	let correctedInputs = inputs;
	for (const f of findings) {
		const d = decisionFor(review, f.rule.id).disposition;
		if (d === "accept") {
			kept.push(f);
			continue;
		}
		const auto = f.rule.severity !== "info" && f.rule.benchmark?.auto !== false || d === "use-benchmark";
		if (f.rule.benchmark && auto) {
			if (correctedKeys.has(f.rule.benchmark.input)) {
				superseded.push(f);
				continue;
			}
			correctedKeys.add(f.rule.benchmark.input);
			correctedInputs = withInput(correctedInputs, f.rule.benchmark.input, f.rule.benchmark.value);
			corrections.push(f);
		}
	}
	const problems = validateInputs(inputs);
	const corrected = runModel(correctedInputs);
	const keptIds = new Set(kept.map((f) => f.rule.id));
	const correctedIds = new Set(corrections.map((f) => f.rule.id));
	const questions = findings.filter((f) => f.rule.severity !== "info" && !keptIds.has(f.rule.id) && (f.rule.ask || !correctedIds.has(f.rule.id)));
	const notes = findings.filter((f) => (f.rule.severity === "info" || f.rule.benchmark?.auto === false) && !correctedIds.has(f.rule.id) && !keptIds.has(f.rule.id));
	const discountedMWh = corrected.rows.reduce((sum, r) => sum + r.generationMWh * r.discountFactor, 0);
	const premiumPerMWh = discountedMWh > 0 ? -corrected.npvAdvantage / discountedMWh : NaN;
	const base = corrected.npvAdvantage;
	const flips = sensitivity(correctedInputs).filter((s) => Math.sign(base + s.lowDelta) !== Math.sign(base) || Math.sign(base + s.highDelta) !== Math.sign(base));
	const assumedCore = [.../* @__PURE__ */ new Set([...opts.assumed ?? [], ...(opts.rejected ?? []).map((r) => r.key)])].filter((k) => FACT_BY_KEY[k]?.core);
	let confidence = problems.length ? "low" : flips.length === 0 ? "high" : flips.length <= 2 ? "medium" : "low";
	if (confidence === "high" && assumedCore.length) confidence = "medium";
	const beStrike = breakEvenStrike(correctedInputs);
	const beEsc = breakEvenEscalation(correctedInputs);
	const reversed = submitted.recommendation !== corrected.recommendation;
	const savings = fmtUSD(Math.abs(corrected.npvAdvantage));
	const strike = fmtPerMWh(inputs.strikePrice);
	let headline;
	if (corrected.recommendation === "RECs") headline = `Buy unbundled RECs. At ${strike}, this VPPA costs ${savings} more over ${inputs.termYears} years.`;
	else headline = `Sign the VPPA. It beats unbundled RECs by ${savings} over ${inputs.termYears} years, even with realistic assumptions.`;
	const parts = [];
	if (reversed) {
		const top = [...corrections].sort((a, b) => Math.abs(b.impact?.delta ?? 0) - Math.abs(a.impact?.delta ?? 0))[0];
		parts.push(`The model as submitted says the opposite (${submitted.recommendation === "VPPA" ? "the VPPA" : "RECs"} by ${fmtUSD(Math.abs(submitted.npvAdvantage))}), mainly because of one assumption: ${top ? top.rule.title.toLowerCase() : "the corrected values below"}.`);
	} else if (corrections.length) parts.push(`The model as submitted reaches the same answer, by ${fmtUSD(Math.abs(submitted.npvAdvantage))}.`);
	if (corrected.recommendation === "RECs") {
		if (Number.isFinite(beStrike) && beStrike > 0) parts.push(`The VPPA only beats RECs at a strike below ${fmtPerMWh(beStrike)}.`);
		if (Number.isFinite(premiumPerMWh)) parts.push(`At the offered price it costs about ${fmtPerMWh(premiumPerMWh)} more than RECs for each MWh the project produces. That premium buys a long-term price hedge and a stronger claim to adding new renewable capacity; pay it only if those are worth that much to you.`);
	} else {
		if (Number.isFinite(beStrike)) parts.push(`It stays ahead as long as the strike is below ${fmtPerMWh(beStrike)}.`);
		if (Number.isFinite(beEsc)) parts.push(`It needs wholesale prices to rise at least ${fmtPct(beEsc)} a year.`);
	}
	return {
		inputs,
		assumed: opts.assumed ?? [],
		findings,
		submitted,
		correctedInputs,
		corrected,
		corrections,
		superseded,
		problems,
		rejected: opts.rejected ?? [],
		assumedCore,
		kept,
		questions,
		notes,
		reversed,
		breakEvenStrike: beStrike,
		breakEvenEscalation: beEsc,
		premiumPerMWh,
		flips,
		confidence,
		headline,
		summary: parts.join(" ")
	};
}
var CONFIDENCE_TEXT = {
	high: "High: no single assumption, moved across its plausible range, reverses this.",
	medium: "Medium: one or two assumptions could reverse this if they land at the edge of their range.",
	low: "Low: several assumptions could reverse this. Firm them up before deciding."
};
function confidenceText(a) {
	if (a.problems.length) return "Low: some inputs are outside their possible range, so the numbers can’t be trusted yet. Fix them first.";
	if (!a.flips.length && a.assumedCore.length) {
		const names = a.assumedCore.map((k) => FACT_BY_KEY[k]?.label ?? k).join("; ");
		return `Medium: no single assumption reverses this, but ${a.assumedCore.length === 1 ? "one needed input was" : `${a.assumedCore.length} needed inputs were`} filled in (${names}). Firm ${a.assumedCore.length === 1 ? "it" : "them"} up to raise confidence.`;
	}
	if (!a.flips.length) return CONFIDENCE_TEXT.high;
	return `${CONFIDENCE_TEXT[a.confidence]} Watch: ${a.flips.map((s) => s.label.toLowerCase()).join(", ")}.`;
}
/** What would have to be true for the answer to change. */
function changeConditions(a) {
	const out = [];
	const recs = a.corrected.recommendation === "RECs";
	if (Number.isFinite(a.breakEvenStrike) && a.breakEvenStrike > 0) out.push(`${recs ? "A strike below" : "A strike above"} ${fmtPerMWh(a.breakEvenStrike)} (offered: ${fmtPerMWh(a.inputs.strikePrice)}).`);
	if (Number.isFinite(a.breakEvenEscalation)) out.push(`Wholesale prices rising ${recs ? "faster than" : "slower than"} ${fmtPct(a.breakEvenEscalation)} a year for the whole term (typical: 2.5–3%).`);
	for (const s of a.flips) {
		const value = Math.sign(a.corrected.npvAdvantage + s.lowDelta) !== Math.sign(a.corrected.npvAdvantage) ? s.lowValue : s.highValue;
		out.push(`${s.label} at ${formatFact(s.input, value)} instead of ${formatFact(s.input, a.correctedInputs[s.input])}.`);
	}
	return out;
}
/** The advice as Markdown, for Claude to relay or for a person to paste into an email. */
function renderAdvice(a) {
	const L = [];
	const owner = a.inputs.assumptionOwner.trim();
	L.push(`# ${a.inputs.scenarioName}`);
	L.push("");
	L.push(`**${a.headline}**`);
	L.push("");
	if (a.summary) {
		L.push(a.summary);
		L.push("");
	}
	L.push(`**Confidence:** ${confidenceText(a)}`);
	L.push("");
	if (a.problems.length) {
		L.push("## Fix these inputs first");
		L.push("");
		for (const p of a.problems) L.push(`- ${p.message} The model has ${formatFact(p.key, p.value)}; check the units.`);
		L.push("");
	}
	L.push("| | As submitted | Corrected |");
	L.push("|---|---|---|");
	L.push(`| Lower-cost option | ${a.submitted.recommendation} | ${a.corrected.recommendation} |`);
	L.push(`| VPPA advantage (NPV, ${a.inputs.termYears} yrs at ${fmtPct(a.inputs.discountRate)}) | ${fmtUSD(a.submitted.npvAdvantage, { sign: true })} | ${fmtUSD(a.corrected.npvAdvantage, { sign: true })} |`);
	L.push(`| Break-even strike | ${fmtPerMWh(breakEvenStrike(a.inputs))} | ${fmtPerMWh(a.breakEvenStrike)} |`);
	L.push(`| Break-even wholesale escalation | ${fmtPct(breakEvenEscalation(a.inputs))} | ${fmtPct(a.breakEvenEscalation)} |`);
	L.push("");
	if (a.corrections.length) {
		L.push("## Assumptions corrected");
		L.push("");
		L.push("| Assumption | Model | Used | Effect on its own |");
		L.push("|---|---|---|---|");
		for (const f of a.corrections) {
			const b = f.rule.benchmark;
			const label = FACT_BY_KEY[b.input]?.label ?? b.input;
			L.push(`| ${label} | ${formatFact(b.input, a.inputs[b.input])} | ${formatFact(b.input, b.value)} | ${shift(f.impact?.delta ?? 0)}${f.impact?.flips ? " (reverses the answer)" : ""} |`);
		}
		L.push("");
		for (const f of a.corrections) L.push(`- **${f.rule.title}.** ${f.message} ${f.rule.why}${f.rule.source ? ` _Source: ${f.rule.source}._` : ""}`);
		for (const f of a.superseded) L.push(`- _${f.rule.title} suggested ${formatFact(f.rule.benchmark.input, f.rule.benchmark.value)}; the more serious check above takes precedence._`);
		L.push("");
	}
	if (a.kept.length) {
		L.push("## Flagged but kept by the reviewer");
		L.push("");
		for (const f of a.kept) L.push(`- **${f.rule.title}.** ${f.message}`);
		L.push("");
	}
	const change = changeConditions(a);
	if (change.length) {
		L.push("## What would change the answer");
		L.push("");
		for (const c of change) L.push(`- ${c}`);
		L.push("");
	}
	if (a.questions.length) {
		L.push(`## Questions for ${owner || "whoever built the model"}`);
		L.push("");
		a.questions.forEach((f, i) => L.push(`${i + 1}. ${f.rule.ask || f.message} _(${f.rule.title})_`));
		L.push("");
	}
	if (a.notes.length) {
		L.push("## Also worth checking");
		L.push("");
		for (const f of a.notes) {
			const impact = f.impact ? ` Using ${f.rule.benchmark.label} would move the result ${shift(f.impact.delta)}.` : "";
			L.push(`- **${f.rule.title}.** ${f.message}${impact}`);
		}
		L.push("");
	}
	const firmUp = firmUpList(a);
	if (firmUp.length) {
		L.push("## Filled in for you");
		L.push("");
		for (const item of firmUp) L.push(`- ${item}`);
		L.push("");
	}
	L.push("## Not in the numbers");
	L.push("");
	L.push("- The VPPA’s value as a long-term hedge against rising power prices.");
	L.push("- Earnings volatility if the VPPA is marked to market as a derivative.");
	L.push("- Impact: a VPPA for a new project can claim to add renewable capacity; unbundled RECs rarely can.");
	L.push("");
	return L.join("\n");
}
/** A compact, JSON-safe summary for tools and scripts. */
function adviceSummary(a) {
	const brief = (f) => ({
		id: f.rule.id,
		severity: f.rule.severity,
		title: f.rule.title,
		message: f.message,
		ask: f.rule.ask,
		benchmark: f.rule.benchmark ? {
			input: f.rule.benchmark.input,
			value: f.rule.benchmark.value,
			label: f.rule.benchmark.label
		} : void 0,
		impact: f.impact ? {
			delta: Math.round(f.impact.delta),
			reverses: f.impact.flips
		} : void 0
	});
	return {
		headline: a.headline,
		summary: a.summary,
		confidence: a.confidence,
		confidenceText: confidenceText(a),
		recommendation: {
			submitted: a.submitted.recommendation,
			corrected: a.corrected.recommendation
		},
		npvAdvantage: {
			submitted: Math.round(a.submitted.npvAdvantage),
			corrected: Math.round(a.corrected.npvAdvantage)
		},
		breakEvenStrike: Number.isFinite(a.breakEvenStrike) ? Math.round(a.breakEvenStrike * 100) / 100 : null,
		breakEvenEscalation: Number.isFinite(a.breakEvenEscalation) ? Math.round(a.breakEvenEscalation * 1e4) / 1e4 : null,
		premiumPerMWh: Number.isFinite(a.premiumPerMWh) ? Math.round(a.premiumPerMWh * 100) / 100 : null,
		inputProblems: a.problems.map((p) => p.message),
		rejected: a.rejected,
		corrections: a.corrections.map(brief),
		superseded: a.superseded.map(brief),
		questions: a.questions.map(brief),
		notes: a.notes.map(brief),
		changeConditions: changeConditions(a),
		assumed: a.assumed,
		inputs: a.inputs,
		correctedInputs: a.correctedInputs
	};
}
/** Assumed or rejected inputs, each with where to get a reliable number. */
function firmUpList(a) {
	const out = [];
	for (const r of a.rejected) {
		const def = FACT_BY_KEY[r.key];
		out.push(`${def?.label ?? r.key}: the source gave ${JSON.stringify(r.given)}, which is ${r.reason}, so ${formatFact(r.key, a.inputs[r.key])} was used.${def?.source ? ` Get it from: ${def.source}.` : ""}`);
	}
	const rejectedKeys = new Set(a.rejected.map((r) => r.key));
	for (const k of a.assumed) {
		if (rejectedKeys.has(k)) continue;
		const def = FACT_BY_KEY[k];
		out.push(`${def?.label ?? k}: ${formatFact(k, a.inputs[k])}.${def?.source ? ` Get it from: ${def.source}.` : ""}`);
	}
	return out;
}
// src/engine/inputs.ts
/** For percentage fields given without a % sign: values above this are read as percents. */
var MAX_FRACTION = {
	capacityFactor: .7,
	captureRate: 1.5,
	degradation: .05,
	wholesaleEscalation: .25,
	strikeEscalation: .25,
	recEscalation: .5,
	discountRate: .3
};
/** Reads 7.5, "7.5%", and 0.075 all as 7.5% for percentage fields. */
function asFraction(key, value, hadPercentSign) {
	if (!(key in MAX_FRACTION)) return value;
	return hadPercentSign || Math.abs(value) > MAX_FRACTION[key] ? value / 100 : value;
}
var DILIGENCE_KEYS = [
	"accountingReviewed",
	"creditSupportReviewed",
	"negativePriceTermsReviewed",
	"marketBoundaryConfirmed",
	"scope2RevisionConsidered"
];
/**
* What to use when a model doesn't state a value. Core economics get a
* benchmark and are reported as assumed. Refinements a model can silently
* leave out (degradation, capture rate, transaction costs, basis) default to
* "not modeled", so the checks that look for those gaps still fire.
*/
function defaultsFor(technology) {
	return {
		scenarioName: "VPPA vs. unbundled RECs",
		assumptionOwner: "",
		technology,
		market: "Other",
		capacityMW: 100,
		capacityFactor: technology === "wind" ? .36 : .24,
		degradation: 0,
		termYears: 15,
		strikePrice: technology === "wind" ? 72 : 63,
		strikeEscalation: 0,
		settlementPoint: "hub",
		basis: 0,
		transactionCost: 0,
		hubPrice: 45,
		wholesaleEscalation: .0275,
		captureRate: 1,
		annualLoadMWh: 0,
		recPrice: 4.5,
		recEscalation: .02,
		discountRate: .08
	};
}
/** Defaults that stand in for a missing number rather than a missing refinement. */
var ASSUMED_WHEN_MISSING = /* @__PURE__ */ new Set([...FACTS.filter((f) => f.core).map((f) => f.key), "recEscalation"]);
function toNumber(v) {
	if (typeof v === "number") return Number.isFinite(v) ? v : void 0;
	if (typeof v === "string" && v.trim()) {
		const n = Number(v.replace(/[,$%\s]/g, ""));
		return Number.isFinite(n) ? n : void 0;
	}
}
function toBool(v) {
	if (typeof v === "boolean") return v;
	if (typeof v === "string") {
		if (/^(true|yes|y|done|1)$/i.test(v.trim())) return true;
		if (/^(false|no|n|0)$/i.test(v.trim())) return false;
	}
}
/**
* Turns a partial, loosely typed set of assumptions (from a pasted table, a
* JSON file Claude wrote, or a form) into a full scenario, and records which
* values were filled in so the advice can say so.
*/
function completeInputs(partial) {
	const src = { ...partial };
	if (src.diligence && typeof src.diligence === "object") Object.assign(src, src.diligence);
	const base = defaultsFor(String(src.technology ?? "").toLowerCase() === "wind" ? "wind" : "solar");
	const diligence = {
		accountingReviewed: false,
		creditSupportReviewed: false,
		negativePriceTermsReviewed: false,
		marketBoundaryConfirmed: false,
		scope2RevisionConsidered: false
	};
	const inputs = {
		...base,
		diligence
	};
	const assumed = [];
	const known = /* @__PURE__ */ new Set([
		...Object.keys(base),
		...DILIGENCE_KEYS,
		"diligence",
		"annualGenerationMWh"
	]);
	const ignored = Object.keys(partial).filter((k) => !known.has(k));
	const rejected = [];
	if (!/^(solar|wind)$/i.test(String(src.technology ?? "").trim())) assumed.push("technology");
	if (typeof src.scenarioName === "string" && src.scenarioName.trim()) inputs.scenarioName = src.scenarioName.trim();
	if (typeof src.assumptionOwner === "string") inputs.assumptionOwner = src.assumptionOwner.trim();
	const market = MARKETS.find((m) => m.toLowerCase() === String(src.market ?? "").toLowerCase().replace(/\s+/g, ""));
	if (market) inputs.market = market;
	else if (String(src.market ?? "").toLowerCase().replace(/[\s-]/g, "") === "isone") inputs.market = "ISO-NE";
	else assumed.push("market");
	if (String(src.settlementPoint ?? "").toLowerCase().startsWith("node")) inputs.settlementPoint = "node";
	for (const key of Object.keys(base)) {
		if (FACT_BY_KEY[key]?.format === "text" || key === "scenarioName" || key === "assumptionOwner") continue;
		const n = toNumber(src[key]);
		const percentSign = typeof src[key] === "string" && src[key].includes("%");
		const value = n === void 0 ? void 0 : asFraction(key, n, percentSign);
		const range = FACT_BY_KEY[key]?.range;
		if (value !== void 0 && range && (value < range[0] || value > range[1])) {
			rejected.push({
				key,
				given: src[key],
				reason: `outside the possible range for ${FACT_BY_KEY[key].label.toLowerCase()}`
			});
			if (ASSUMED_WHEN_MISSING.has(key)) assumed.push(key);
		} else if (value !== void 0) inputs[key] = value;
		else if (ASSUMED_WHEN_MISSING.has(key)) assumed.push(key);
	}
	const generation = toNumber(src.annualGenerationMWh);
	if (generation && generation > 0) {
		const hasMW = !assumed.includes("capacityMW");
		const hasCF = !assumed.includes("capacityFactor");
		if (hasMW && !hasCF) {
			inputs.capacityFactor = generation / (inputs.capacityMW * 8760);
			assumed.splice(assumed.indexOf("capacityFactor"), 1);
		} else if (!hasMW) {
			inputs.capacityMW = generation / (inputs.capacityFactor * 8760);
			assumed.splice(assumed.indexOf("capacityMW"), 1);
		}
	}
	if (assumed.includes("annualLoadMWh") || inputs.annualLoadMWh <= 0) {
		inputs.annualLoadMWh = Math.round(inputs.capacityMW * 8760 * inputs.capacityFactor);
		if (!assumed.includes("annualLoadMWh")) assumed.push("annualLoadMWh");
	}
	for (const k of DILIGENCE_KEYS) {
		const b = toBool(src[k]);
		if (b !== void 0) inputs.diligence[k] = b;
	}
	return {
		inputs,
		assumed,
		ignored,
		rejected
	};
}
// scripts/preflight-cli.ts
function fail(message) {
	process.stderr.write(`${message}\n\nUsage: node preflight.mjs inputs.json [--checks team-checks.json] [--json]\n`);
	process.exit(1);
}
var args = process.argv.slice(2);
var json = args.includes("--json");
var checksAt = args.indexOf("--checks");
var checksPath = checksAt >= 0 ? args[checksAt + 1] : void 0;
var file = args.find((a, i) => (a === "-" || !a.startsWith("-")) && (checksAt < 0 || i !== checksAt + 1));
if (!file) fail("Give the path to an inputs JSON file, or - to read from stdin.");
var raw;
try {
	raw = JSON.parse(readFileSync(file === "-" ? 0 : file, "utf8"));
} catch (e) {
	fail(`Could not read ${file} as JSON: ${e.message}`);
}
if (!raw || typeof raw !== "object" || Array.isArray(raw)) fail("The inputs file must contain one JSON object.");
var playbook = {
	custom: [],
	edits: {},
	disabled: []
};
var here = dirname(fileURLToPath(import.meta.url));
var teamFile = checksPath ?? [join(here, "..", "team-checks.json"), join(here, "team-checks.json")].find((p) => existsSync(p));
if (teamFile) try {
	playbook = parsePlaybook(JSON.parse(readFileSync(teamFile, "utf8")));
} catch (e) {
	fail(`Could not read team checks from ${teamFile}: ${e.message}`);
}
var { inputs, assumed, ignored, rejected } = completeInputs(raw);
var advice = advise(inputs, activeRules(playbook), {
	assumed,
	rejected
});
if (json) process.stdout.write(`${JSON.stringify({
	...adviceSummary(advice),
	ignoredKeys: ignored,
	teamChecks: playbook.custom.length,
	markdown: renderAdvice(advice)
}, null, 2)}\n`);
else {
	process.stdout.write(renderAdvice(advice));
	if (ignored.length) process.stdout.write(`\n_Ignored unknown keys: ${ignored.join(", ")}._\n`);
}
export {};
