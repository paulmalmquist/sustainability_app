import type { Inputs } from './types.ts';

/**
 * The worked example: a solar VPPA model with 7.5%/yr wholesale price
 * inflation, plus a few quieter problems (100% solar capture, no
 * degradation, no transaction costs) that often travel with it.
 */
export const EXAMPLE_SCENARIO: Inputs = {
  scenarioName: 'Example: 80 MW solar VPPA vs. unbundled RECs',
  assumptionOwner: 'Procurement advisor',

  technology: 'solar',
  market: 'PJM',
  capacityMW: 80,
  capacityFactor: 0.24,
  degradation: 0,
  termYears: 15,

  strikePrice: 63,
  strikeEscalation: 0,
  settlementPoint: 'hub',
  basis: 0,
  transactionCost: 0,

  hubPrice: 48,
  wholesaleEscalation: 0.075,
  captureRate: 1,

  annualLoadMWh: 180000,
  recPrice: 4.5,
  recEscalation: 0.02,

  discountRate: 0.08,

  diligence: {
    accountingReviewed: true,
    creditSupportReviewed: true,
    negativePriceTermsReviewed: false,
    marketBoundaryConfirmed: true,
    scope2RevisionConsidered: false,
  },
};

/** A scenario that passes the decision-required checks, for comparison. */
export const BENCHMARK_SCENARIO: Inputs = {
  ...EXAMPLE_SCENARIO,
  scenarioName: 'Example: same deal, benchmark assumptions',
  degradation: 0.005,
  transactionCost: 350000,
  wholesaleEscalation: 0.0275,
  captureRate: 0.85,
  diligence: {
    accountingReviewed: true,
    creditSupportReviewed: true,
    negativePriceTermsReviewed: true,
    marketBoundaryConfirmed: true,
    scope2RevisionConsidered: true,
  },
};
