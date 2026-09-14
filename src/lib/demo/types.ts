// ─────────────────────────────────────────────────────────────────────────────
// Yami Demo — Domain Types
//
// Single source of truth for every entity, status union, value object, and
// error type in the demo. Nothing outside this file should define domain types.
//
// Conventions:
//   • Status unions use UPPER_SNAKE_CASE string literals
//   • Entity IDs are plain strings with prefixed conventions (FIN-, BAB-, etc.)
//   • Fields marked `readonly` are immutable after entity creation
//   • Invoice status and student clearance are DERIVED — see derivation
//     functions at the bottom of this file
// ─────────────────────────────────────────────────────────────────────────────

// ── Status Unions ────────────────────────────────────────────────────────────

/** Financing lifecycle — the central state machine. See state-machine.ts for
 *  valid transitions. */
export type FinancingStatus =
  | 'SUBMITTED'
  | 'UNDERWRITING'
  | 'APPROVED'
  | 'DECLINED'
  | 'ACCEPTED'
  | 'FUNDING'
  | 'FUNDED'
  | 'DISBURSING'
  | 'ACTIVE'
  | 'COMPLETED'
  | 'DEFAULTED'
  | 'CANCELLED';

/** Invoice payment status — DERIVED from Financing + Disbursement state.
 *  Never stored independently. */
export type InvoiceStatus =
  | 'UNPAID'
  | 'FINANCING_IN_PROGRESS'
  | 'PAYMENT_PROCESSING'
  | 'PAID'
  | 'PAYMENT_FAILED';

/** Student academic clearance — DERIVED from InvoiceStatus. */
export type ClearanceStatus = 'HELD' | 'CLEARED';

/** Underwriting evaluation status. Nested inside Financing. */
export type UnderwritingStatus =
  | 'NOT_STARTED'
  | 'RUNNING'
  | 'APPROVED'
  | 'DECLINED';

/** Sponsor funding attempt status. */
export type FundingStatus = 'PENDING' | 'PROCESSING' | 'SUCCESS' | 'FAILED';

/** Tuition disbursement to institution. */
export type DisbursementStatus =
  | 'PENDING'
  | 'PROCESSING'
  | 'SUCCESS'
  | 'FAILED';

/** Individual monthly repayment status. */
export type RepaymentStatus =
  | 'SCHEDULED'
  | 'DUE'
  | 'PROCESSING'
  | 'PAID'
  | 'FAILED'
  | 'OVERDUE';

/** Webhook delivery status. */
export type WebhookStatus =
  | 'QUEUED'
  | 'DELIVERING'
  | 'DELIVERED'
  | 'FAILED'
  | 'RETRYING';

// ── Entities ─────────────────────────────────────────────────────────────────

export interface Institution {
  readonly id: string;
  readonly name: string;
  readonly shortName: string;
  readonly location: string;
  readonly accountNumber: string;
  readonly bankName: string;
  readonly webhookUrl: string;
  readonly apiKey: string;
}

export interface Student {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly matricNumber: string;
  readonly institutionId: string;
  readonly programme: string;
  readonly level: string;
  readonly guardianId: string;
}

export interface Guardian {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly relationship: string;
  readonly email: string;
  readonly phone: string;
  /** Masked BVN for display — never the real value. */
  readonly bvn: string;
  readonly monthlyIncome: number;
  /** Mutable — incremented by +10 per on-time repayment. */
  trustScore: number;
}

export interface Sponsor {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly type: 'individual' | 'cooperative';
  readonly email: string;
  readonly phone: string;
  readonly trustScore: number;
  /** Mutable — decremented on funding, incremented on repayment allocation. */
  walletBalance: number;
}

export interface Invoice {
  readonly id: string;
  readonly institutionId: string;
  readonly studentId: string;
  readonly description: string;
  /** Immutable tuition amount — canonical source for all principal references. */
  readonly amount: number;
  readonly semester: string;
  readonly dueDate: string;
  readonly issuedAt: string;
  // NOTE: status is NOT stored here — use deriveInvoiceStatus()
}

// ── Value Objects (nested within Financing) ──────────────────────────────────

export type CollectionsStatus = 'NOT_STARTED' | 'GRACE_PERIOD' | 'COLLECTIONS_ACTIVE' | 'CURED' | 'DEFAULTED';
export type InsuranceClaimStatus = 'ELIGIBLE' | 'SUBMITTED' | 'UNDER_REVIEW' | 'APPROVED' | 'DENIED';
export type ComplaintStatus = 'OPEN' | 'IN_REVIEW' | 'RESOLVED';

export type Role = 'BORROWER' | 'SPONSOR' | 'INSTITUTION' | 'ADMIN';

export interface UserAccount {
  id: string;
  role: Role;
  email: string;
  name: string;
  verificationStatus: 'NOT_STARTED' | 'PENDING' | 'VERIFIED' | 'FAILED';
}

export interface CollectionsRecord {
  status: CollectionsStatus;
  daysOverdue: number;
  remindersSent: number;
  enteredAt: string | null;
}

export interface InsuranceClaim {
  readonly id: string;
  status: InsuranceClaimStatus;
  claimAmount: number;
  payoutAmount: number | null;
  submittedAt: string | null;
  resolvedAt: string | null;
}

export interface Complaint {
  readonly id: string;
  readonly actorId: string;
  readonly category: string;
  readonly financingId?: string;
  status: ComplaintStatus;
  description: string;
  resolution: string | null;
  createdAt: string;
}

export interface UnderwritingDecision {
  status: UnderwritingStatus;
  score: number | null;
  incomeVerified: boolean;
  affordabilityRatio: number | null;
  reason: string | null;
  decidedAt: string | null;
}

export interface Funding {
  status: FundingStatus;
  readonly sponsorId: string;
  readonly amount: number;
  processedAt: string | null;
}

export interface Disbursement {
  status: DisbursementStatus;
  readonly amount: number;
  readonly institutionId: string;
  processedAt: string | null;
}

/** A single failed or successful attempt at processing a repayment. */
export interface RepaymentAttempt {
  readonly timestamp: string;
  readonly outcome: 'SUCCESS' | 'FAILED';
  readonly reason?: string;
}

export interface Repayment {
  readonly month: number;
  /** Immutable — equals Financing.monthlyInstallment */
  readonly amount: number;
  /** Immutable — principal portion per payment. */
  readonly principalPortion: number;
  /** Immutable — Yami margin portion per payment. */
  readonly yamiPortion: number;
  /** Immutable — sponsor yield + principal return per payment. */
  readonly sponsorPortion: number;
  status: RepaymentStatus;
  readonly dueDate: string;
  paidAt: string | null;
  /** Ordered log of all attempts — preserves failure history per user requirement. */
  attempts: RepaymentAttempt[];
}

// ── Financing (Central Aggregate) ────────────────────────────────────────────

/**
 * The financing is the central aggregate of the demo. It references all
 * other entities by ID and contains all sub-objects (underwriting, funding,
 * disbursement, repayments) as nested value objects.
 *
 * IMMUTABILITY CONTRACT:
 * Once a Financing is created, the following fields MUST NEVER change:
 *   id, invoiceId, guardianId, principal, termMonths,
 *   yamiMarginRate, sponsorYieldRate, monthlyInstallment, createdAt
 *
 * sponsorId is set once during funding and is immutable after that.
 */
export interface Financing {
  readonly id: string;
  readonly invoiceId: string;
  readonly guardianId: string;
  /** Set when a sponsor funds this financing — immutable once set. */
  sponsorId: string | null;
  readonly principal: number;
  readonly termMonths: number;
  readonly yamiMarginRate: number;
  readonly sponsorYieldRate: number;
  readonly monthlyInstallment: number;
  status: FinancingStatus;
  underwriting: UnderwritingDecision | null;
  funding: Funding | null;
  disbursement: Disbursement | null;
  collections?: CollectionsRecord;
  insurance?: InsuranceClaim;
  repayments: Repayment[];
  readonly createdAt: string;
}

// ── Append-Only Records ──────────────────────────────────────────────────────

export interface LedgerEntry {
  readonly id: number;
  readonly timestamp: string;
  readonly type:
    | 'FUNDING'
    | 'DISBURSEMENT'
    | 'REPAYMENT_RECEIVED'
    | 'SPONSOR_RETURN'
    | 'YAMI_REVENUE'
    | 'INSURANCE_PREMIUM'
    | 'INSURANCE_PAYOUT'
    | 'SPONSOR_LOSS';
  readonly debitAccount: string;
  readonly creditAccount: string;
  readonly amount: number;
  readonly description: string;
  readonly financingId: string;
}

export type WebhookEventType =
  | 'financing.submitted'
  | 'financing.approved'
  | 'invoice.payment.processing'
  | 'invoice.payment.disbursed'
  | 'invoice.payment.failed'
  | 'repayment.received';

export interface WebhookEvent {
  readonly id: number;
  readonly createdAt: string;
  readonly type: WebhookEventType;
  status: WebhookStatus;
  readonly url: string;
  readonly payload: Record<string, unknown>;
  attempts: number;
  lastAttemptAt: string | null;
  deliveredAt: string | null;
}

export type DemoEventType =
  | 'FINANCING_REQUESTED'
  | 'UNDERWRITING_STARTED'
  | 'UNDERWRITING_APPROVED'
  | 'UNDERWRITING_DECLINED'
  | 'OFFER_ACCEPTED'
  | 'FUNDING_STARTED'
  | 'FUNDING_SUCCEEDED'
  | 'FUNDING_FAILED'
  | 'DISBURSEMENT_STARTED'
  | 'DISBURSEMENT_SUCCEEDED'
  | 'DISBURSEMENT_FAILED'
  | 'WEBHOOK_QUEUED'
  | 'WEBHOOK_DELIVERED'
  | 'WEBHOOK_FAILED'
  | 'WEBHOOK_RETRYING'
  | 'REPAYMENT_PROCESSING'
  | 'REPAYMENT_SUCCEEDED'
  | 'REPAYMENT_FAILED'
  | 'FINANCING_COMPLETED'
  | 'FINANCING_DEFAULTED'
  | 'FINANCING_CANCELLED'
  | 'REPAYMENT_OVERDUE'
  | 'COLLECTIONS_STARTED'
  | 'COLLECTIONS_CURED'
  | 'INSURANCE_CLAIM_SUBMITTED'
  | 'INSURANCE_CLAIM_APPROVED'
  | 'INSURANCE_CLAIM_DENIED'
  | 'COMPLAINT_OPENED'
  | 'COMPLAINT_RESOLVED';

export type DemoActor = 'guardian' | 'sponsor' | 'system' | 'operator';

export interface DemoEvent {
  readonly id: number;
  readonly timestamp: string;
  readonly type: DemoEventType;
  readonly actor: DemoActor;
  readonly description: string;
  readonly financingId: string | null;
  readonly metadata?: Record<string, unknown>;
}

// ── Demo Operator Flags ──────────────────────────────────────────────────────

/** One-shot flags set by the operator to simulate failures. Each flag is
 *  consumed (reset to false) after the corresponding use case reads it. */
export interface DemoFlags {
  forceUnderwritingDecline: boolean;
  forceFundingFailure: boolean;
  forceDisbursementFailure: boolean;
  forceWebhookFailure: boolean;
  forceRepaymentFailure: boolean;
}

// ── Top-Level Demo State ─────────────────────────────────────────────────────

export interface DemoState {
  /** Schema version — used for localStorage migration. */
  readonly version: number;

  activeAccountId: string;
  accounts: Record<string, UserAccount>;

  // Static reference entities
  institution: Institution;
  student: Student;
  guardian: Guardian;
  sponsor: Sponsor;
  invoice: Invoice;

  // Central domain object (null before application submitted)
  financing: Financing | null;

  // Append-only collections
  ledger: LedgerEntry[];
  webhooks: WebhookEvent[];
  events: DemoEvent[];
  complaints: Complaint[];

  // Operator control flags
  flags: DemoFlags;

  /** Auto-incrementing counter for generating IDs on ledger/webhook/event
   *  records. Prevents ID collisions across reset cycles. */
  nextId: number;
}

// ── Error Handling ───────────────────────────────────────────────────────────

export type DemoErrorCode =
  | 'INVALID_STATE_TRANSITION'
  | 'FINANCING_NOT_FOUND'
  | 'FINANCING_ALREADY_EXISTS'
  | 'INSUFFICIENT_FUNDS'
  | 'FUNDING_FAILED'
  | 'DISBURSEMENT_FAILED'
  | 'WEBHOOK_DELIVERY_FAILED'
  | 'REPAYMENT_NOT_DUE'
  | 'REPAYMENT_FAILED'
  | 'PRIOR_MONTH_UNPAID'
  | 'UNDERWRITING_DECLINED'
  | 'ALREADY_PROCESSED';

export interface DemoError {
  readonly code: DemoErrorCode;
  readonly message: string;
}

export type DemoResult<T> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly error: DemoError };

// ── Derivation Functions ─────────────────────────────────────────────────────

/** Derive invoice payment status from the financing lifecycle.
 *  This is the ONLY correct way to determine invoice status. */
export function deriveInvoiceStatus(
  financing: Financing | null,
): InvoiceStatus {
  if (!financing) return 'UNPAID';

  switch (financing.status) {
    case 'DECLINED':
    case 'CANCELLED':
      return 'UNPAID';
    case 'DISBURSING':
      return 'PAYMENT_PROCESSING';
    case 'ACTIVE':
    case 'COMPLETED':
    case 'DEFAULTED':
      return 'PAID';
    default:
      // SUBMITTED, UNDERWRITING, APPROVED, ACCEPTED, FUNDING, FUNDED
      break;
  }

  // Check for failed disbursement while financing is still at FUNDED
  if (
    financing.status === 'FUNDED' &&
    financing.disbursement?.status === 'FAILED'
  ) {
    return 'PAYMENT_FAILED';
  }

  return 'FINANCING_IN_PROGRESS';
}

/** Derive student clearance from invoice status.
 *  Clearance is granted if and only if tuition is paid. */
export function deriveClearanceStatus(
  invoiceStatus: InvoiceStatus,
): ClearanceStatus {
  return invoiceStatus === 'PAID' ? 'CLEARED' : 'HELD';
}
