// ─────────────────────────────────────────────────────────────────────────────
// Yami Demo — State Machine Validators
//
// Pure functions that enforce valid state transitions for every lifecycle in
// the demo. Use cases call these BEFORE mutating state to ensure consistency.
//
// These are deterministic and side-effect-free — they answer "can this
// transition happen?" and nothing else.
// ─────────────────────────────────────────────────────────────────────────────

import type {
  FinancingStatus,
  FundingStatus,
  DisbursementStatus,
  RepaymentStatus,
  WebhookStatus,
  UnderwritingStatus,
} from './types';

// ── Financing ────────────────────────────────────────────────────────────────

const FINANCING_TRANSITIONS: Record<FinancingStatus, readonly FinancingStatus[]> = {
  SUBMITTED:    ['UNDERWRITING'],
  UNDERWRITING: ['APPROVED', 'DECLINED'],
  APPROVED:     ['ACCEPTED', 'CANCELLED'],
  DECLINED:     [],                        // terminal
  ACCEPTED:     ['FUNDING', 'CANCELLED'],
  FUNDING:      ['FUNDED', 'ACCEPTED'],    // ACCEPTED = funding failed, back to market
  FUNDED:       ['DISBURSING'],
  DISBURSING:   ['ACTIVE', 'FUNDED'],      // FUNDED = disbursement failed, can retry
  ACTIVE:       ['COMPLETED', 'DEFAULTED'],
  COMPLETED:    [],                        // terminal
  DEFAULTED:    [],                        // terminal
  CANCELLED:    [],                        // terminal
};

export function canTransitionFinancing(
  from: FinancingStatus,
  to: FinancingStatus,
): boolean {
  return FINANCING_TRANSITIONS[from].includes(to);
}

export function validFinancingTransitions(
  from: FinancingStatus,
): readonly FinancingStatus[] {
  return FINANCING_TRANSITIONS[from];
}

export function isTerminalFinancingStatus(status: FinancingStatus): boolean {
  return FINANCING_TRANSITIONS[status].length === 0;
}

// ── Underwriting ─────────────────────────────────────────────────────────────

const UNDERWRITING_TRANSITIONS: Record<UnderwritingStatus, readonly UnderwritingStatus[]> = {
  NOT_STARTED: ['RUNNING'],
  RUNNING:     ['APPROVED', 'DECLINED'],
  APPROVED:    [],  // terminal
  DECLINED:    [],  // terminal
};

export function canTransitionUnderwriting(
  from: UnderwritingStatus,
  to: UnderwritingStatus,
): boolean {
  return UNDERWRITING_TRANSITIONS[from].includes(to);
}

// ── Funding ──────────────────────────────────────────────────────────────────

const FUNDING_TRANSITIONS: Record<FundingStatus, readonly FundingStatus[]> = {
  PENDING:    ['PROCESSING'],
  PROCESSING: ['SUCCESS', 'FAILED'],
  SUCCESS:    [],  // terminal
  FAILED:     [],  // terminal — new Funding record created on retry
};

export function canTransitionFunding(
  from: FundingStatus,
  to: FundingStatus,
): boolean {
  return FUNDING_TRANSITIONS[from].includes(to);
}

// ── Disbursement ─────────────────────────────────────────────────────────────

const DISBURSEMENT_TRANSITIONS: Record<DisbursementStatus, readonly DisbursementStatus[]> = {
  PENDING:    ['PROCESSING'],
  PROCESSING: ['SUCCESS', 'FAILED'],
  SUCCESS:    [],  // terminal
  FAILED:     [],  // terminal — new Disbursement record created on retry
};

export function canTransitionDisbursement(
  from: DisbursementStatus,
  to: DisbursementStatus,
): boolean {
  return DISBURSEMENT_TRANSITIONS[from].includes(to);
}

// ── Repayment ────────────────────────────────────────────────────────────────

const REPAYMENT_TRANSITIONS: Record<RepaymentStatus, readonly RepaymentStatus[]> = {
  SCHEDULED:  ['DUE'],
  DUE:        ['PROCESSING'],
  PROCESSING: ['PAID', 'FAILED'],
  PAID:       [],                // terminal
  FAILED:     ['PROCESSING', 'OVERDUE'],
  OVERDUE:    ['PROCESSING'],    // can retry — FAILED → PROCESSING → PAID
};

export function canTransitionRepayment(
  from: RepaymentStatus,
  to: RepaymentStatus,
): boolean {
  return REPAYMENT_TRANSITIONS[from].includes(to);
}

// ── Webhook ──────────────────────────────────────────────────────────────────

const WEBHOOK_TRANSITIONS: Record<WebhookStatus, readonly WebhookStatus[]> = {
  QUEUED:     ['DELIVERING'],
  DELIVERING: ['DELIVERED', 'FAILED'],
  DELIVERED:  [],              // terminal
  FAILED:     ['RETRYING'],
  RETRYING:   ['DELIVERED', 'FAILED'],
};

export function canTransitionWebhook(
  from: WebhookStatus,
  to: WebhookStatus,
): boolean {
  return WEBHOOK_TRANSITIONS[from].includes(to);
}

// ── Display Labels ───────────────────────────────────────────────────────────

import type { StampState } from '@/components/ledger/Stamp';

/** Human-readable label + Stamp variant for every financing status. */
export const FINANCING_STATUS_DISPLAY: Record<
  FinancingStatus,
  { label: string; description: string; stamp: StampState }
> = {
  SUBMITTED:    { label: 'Submitted',         description: 'Application received',             stamp: 'outline' },
  UNDERWRITING: { label: 'Evaluating',        description: 'Underwriting in progress',         stamp: 'now' },
  APPROVED:     { label: 'Offer Ready',       description: 'Review your financing terms',      stamp: 'green' },
  DECLINED:     { label: 'Declined',          description: 'Application was not approved',     stamp: 'outline' },
  ACCEPTED:     { label: 'Finding Sponsor',   description: 'Searching the marketplace',        stamp: 'now' },
  FUNDING:      { label: 'Funding',           description: 'Sponsor payment processing',       stamp: 'now' },
  FUNDED:       { label: 'Funded',            description: 'Sponsor payment confirmed',        stamp: 'green' },
  DISBURSING:   { label: 'Disbursing',        description: 'Payment to institution in progress', stamp: 'now' },
  ACTIVE:       { label: 'Active',            description: 'Repayment period',                 stamp: 'recorded' },
  COMPLETED:    { label: 'Completed',         description: 'All obligations fulfilled',        stamp: 'done' },
  DEFAULTED:    { label: 'Defaulted',         description: 'Repayment default',                stamp: 'outline' },
  CANCELLED:    { label: 'Cancelled',         description: 'Financing cancelled',              stamp: 'outline' },
};

/** Human-readable label + Stamp variant for invoice status. */
export const INVOICE_STATUS_DISPLAY: Record<
  import('./types').InvoiceStatus,
  { label: string; stamp: StampState }
> = {
  UNPAID:                 { label: 'Unpaid',             stamp: 'outline' },
  FINANCING_IN_PROGRESS:  { label: 'Financing Active',   stamp: 'now' },
  PAYMENT_PROCESSING:     { label: 'Processing',         stamp: 'now' },
  PAID:                   { label: 'Paid',               stamp: 'done' },
  PAYMENT_FAILED:         { label: 'Payment Failed',     stamp: 'outline' },
};
