// ─────────────────────────────────────────────────────────────────────────────
// Yami Demo — Financing Calculations
//
// Single source of truth for all financing economics. Every component that
// needs margin, yield, installment, or per-payment allocation MUST call these
// functions rather than computing values inline.
//
// IMMUTABILITY: The rates and term are constants. Once a Financing entity is
// created with these values, they never change.
// ─────────────────────────────────────────────────────────────────────────────

/** Yami's margin on the principal — 8.5%. */
export const YAMI_MARGIN_RATE = 0.085;

/** Sponsor's yield on the principal — 11.5%. */
export const SPONSOR_YIELD_RATE = 0.115;

/** Repayment term in months. */
export const TERM_MONTHS = 4;

/** Trust score increment per on-time repayment. */
export const TRUST_SCORE_INCREMENT = 10;

/** Yami's flat insurance premium rate on principal. */
export const INSURANCE_PREMIUM_RATE = 0.015;

/** Sponsor's insurance coverage ratio on outstanding principal. */
export const INSURANCE_COVERAGE_RATIO = 0.80;

/**
 * Complete financing terms derived from a single principal amount.
 * Every value downstream (offer screen, sponsor detail, admin ledger,
 * repayment schedule) must use this output rather than re-deriving.
 */
export interface FinancingTerms {
  readonly principal: number;
  readonly yamiMarginRate: number;
  readonly sponsorYieldRate: number;
  readonly termMonths: number;
  readonly yamiMargin: number;
  readonly sponsorYield: number;
  readonly totalRepayment: number;
  readonly monthlyInstallment: number;
  /** Principal returned to sponsor each month. */
  readonly principalPerPayment: number;
  /** Yami's cut each month. */
  readonly yamiPerPayment: number;
  /** Sponsor's yield portion each month (NOT including principal return). */
  readonly sponsorYieldPerPayment: number;
  /** Total amount sponsor receives each month (principal return + yield). */
  readonly sponsorReturnPerPayment: number;
}

/**
 * Calculate all financing terms from a principal amount.
 *
 * @example
 * ```ts
 * const terms = calculateFinancingTerms(2_000_000);
 * // terms.monthlyInstallment === 600_000
 * // terms.yamiMargin === 170_000
 * // terms.sponsorYield === 230_000
 * ```
 */
export function calculateFinancingTerms(principal: number): FinancingTerms {
  const yamiMargin = principal * YAMI_MARGIN_RATE;
  const sponsorYield = principal * SPONSOR_YIELD_RATE;
  const totalRepayment = principal + yamiMargin + sponsorYield;
  const monthlyInstallment = totalRepayment / TERM_MONTHS;

  const principalPerPayment = principal / TERM_MONTHS;
  const yamiPerPayment = yamiMargin / TERM_MONTHS;
  const sponsorYieldPerPayment = sponsorYield / TERM_MONTHS;
  const sponsorReturnPerPayment = principalPerPayment + sponsorYieldPerPayment;

  return {
    principal,
    yamiMarginRate: YAMI_MARGIN_RATE,
    sponsorYieldRate: SPONSOR_YIELD_RATE,
    termMonths: TERM_MONTHS,
    yamiMargin,
    sponsorYield,
    totalRepayment,
    monthlyInstallment,
    principalPerPayment,
    yamiPerPayment,
    sponsorYieldPerPayment,
    sponsorReturnPerPayment,
  };
}

// ── Derived Metrics (computed from state, never stored) ──────────────────────

import type { Financing, Repayment, RepaymentStatus } from './types';

/** Count repayments matching a given status. */
export function countRepaymentsByStatus(
  repayments: Repayment[],
  status: RepaymentStatus,
): number {
  return repayments.filter((r) => r.status === status).length;
}

/** Outstanding principal remaining (principal minus paid principal portions). */
/** Total outstanding obligation (including unearned yield, used for collections). */
export function outstandingTotalObligation(financing: Financing): number {
  const unpaidCount = financing.termMonths - countRepaymentsByStatus(financing.repayments, 'PAID');
  return unpaidCount * financing.monthlyInstallment;
}

/** Outstanding principal remaining (used for insurance baseline). */
export function outstandingPrincipal(financing: Financing): number {
  const paidCount = countRepaymentsByStatus(financing.repayments, 'PAID');
  const principalPerPayment = financing.principal / financing.termMonths;
  return financing.principal - paidCount * principalPerPayment;
}

/** Total amount sponsor has received back (principal + yield from paid repayments). */
export function sponsorTotalReturned(financing: Financing): number {
  return financing.repayments
    .filter((r) => r.status === 'PAID')
    .reduce((sum, r) => sum + r.sponsorPortion, 0);
}

/** Total Yami revenue earned from paid repayments. */
export function yamiTotalRevenue(financing: Financing): number {
  return financing.repayments
    .filter((r) => r.status === 'PAID')
    .reduce((sum, r) => sum + r.yamiPortion, 0);
}

/** Repayment progress as a fraction (0 to 1). */
export function repaymentProgress(financing: Financing): number {
  if (financing.repayments.length === 0) return 0;
  const paid = countRepaymentsByStatus(financing.repayments, 'PAID');
  return paid / financing.repayments.length;
}

/** Affordability ratio: monthly installment / monthly income. */
/** Compute the insurance payout based on outstanding principal. */
export function calculateInsurancePayout(outstandingPrincipal: number): number {
  return outstandingPrincipal * INSURANCE_COVERAGE_RATIO;
}

/** Compute the sponsor's realized loss when insurance pays out. */
export function calculateSponsorLoss(outstandingPrincipal: number): number {
  return outstandingPrincipal * (1 - INSURANCE_COVERAGE_RATIO);
}

export function affordabilityRatio(
  monthlyInstallment: number,
  monthlyIncome: number,
): number {
  if (monthlyIncome <= 0) return Infinity;
  return monthlyInstallment / monthlyIncome;
}
