// ─────────────────────────────────────────────────────────────────────────────
// Yami Demo — Use Cases (Domain Operations)
//
// Every function in this file represents a complete business operation.
// They take the current DemoState and inputs, validate preconditions (including
// idempotency), orchestrate state machine transitions, generate side effects
// (events, ledger, webhooks), and return a new DemoState.
//
// These functions DO NOT mutate the input state. They return a new state object.
// ─────────────────────────────────────────────────────────────────────────────

import type {
  DemoState,
  DemoResult,
  Financing,
  DemoEvent,
  LedgerEntry,
  DemoErrorCode,
  DemoFlags,
} from './types';
import { deriveInvoiceStatus } from './types';
import { calculateFinancingTerms, TRUST_SCORE_INCREMENT, calculateInsurancePayout, calculateSponsorLoss, outstandingPrincipal, INSURANCE_PREMIUM_RATE } from './calculations';
import { DEMO_SEED_STATE } from './seed';

// ── Helpers ──────────────────────────────────────────────────────────────────

function createError(code: DemoErrorCode, message: string): DemoResult<never> {
  return { ok: false, error: { code, message } };
}

function generateId(state: DemoState): number {
  return state.nextId;
}

const getTimestamp = () => new Date().toISOString();

function cloneState(state: DemoState): DemoState {
  return JSON.parse(JSON.stringify(state));
}

function addEvent(
  state: DemoState,
  type: DemoEvent['type'],
  actor: DemoEvent['actor'],
  description: string,
  financingId: string | null = null,
): DemoState {
  state.events.push({
    id: generateId(state),
    timestamp: getTimestamp(),
    type,
    actor,
    description,
    financingId,
  });
  state.nextId++;
  return state;
}

function addLedgerEntry(
  state: DemoState,
  type: LedgerEntry['type'],
  debitAccount: string,
  creditAccount: string,
  amount: number,
  description: string,
  financingId: string,
): DemoState {
  state.ledger.push({
    id: generateId(state),
    timestamp: getTimestamp(),
    type,
    debitAccount,
    creditAccount,
    amount,
    description,
    financingId,
  });
  state.nextId++;
  return state;
}

function cloneAndCheckFinancing(
  state: DemoState,
  expectedStatus?: import('./types').FinancingStatus[],
): { nextState: DemoState; financing: Financing } | DemoResult<never> {
  const nextState = cloneState(state);
  const financing = nextState.financing;
  if (!financing) {
    return createError('FINANCING_NOT_FOUND', 'No active financing found.');
  }
  if (expectedStatus && !expectedStatus.includes(financing.status)) {
    return createError(
      'INVALID_STATE_TRANSITION',
      `Cannot perform action when financing status is ${financing.status}`,
    );
  }
  return { nextState, financing };
}

// ── Use Cases ────────────────────────────────────────────────────────────────

export function startFinancingApplication(state: DemoState): DemoResult<DemoState> {
  if (state.financing) {
    return createError('FINANCING_ALREADY_EXISTS', 'A financing application already exists.');
  }
  if (deriveInvoiceStatus(state.financing) !== 'UNPAID') {
    return createError('INVALID_STATE_TRANSITION', 'Invoice must be UNPAID.');
  }

  const terms = calculateFinancingTerms(state.invoice.amount);
  const nextState = cloneState(state);

  const financing: Financing = {
    id: `FIN-YAMI-${state.invoice.id.split('-')[1]}`,
    invoiceId: state.invoice.id,
    guardianId: state.guardian.id,
    sponsorId: null,
    principal: terms.principal,
    termMonths: terms.termMonths,
    yamiMarginRate: terms.yamiMarginRate,
    sponsorYieldRate: terms.sponsorYieldRate,
    monthlyInstallment: terms.monthlyInstallment,
    status: 'SUBMITTED',
    underwriting: null,
    funding: null,
    disbursement: null,
    repayments: [],
    createdAt: getTimestamp(),
  };

  nextState.financing = financing;
  addEvent(nextState, 'FINANCING_REQUESTED', 'guardian', 'Financing application submitted', financing.id);

  return { ok: true, value: nextState };
}

export function runUnderwriting(state: DemoState): DemoResult<DemoState> {
  const check = cloneAndCheckFinancing(state, ['SUBMITTED']);
  if (!('nextState' in check)) return check;
  const { nextState, financing } = check;

  const declined = nextState.flags.forceUnderwritingDecline;
  nextState.flags.forceUnderwritingDecline = false; // consume flag

  if (declined) {
    financing.status = 'DECLINED';
    financing.underwriting = {
      status: 'DECLINED',
      score: nextState.guardian.trustScore,
      incomeVerified: true,
      affordabilityRatio: 0.5,
      reason: 'Debt-to-income ratio exceeds allowable limits',
      decidedAt: getTimestamp(),
    };
    addEvent(nextState, 'UNDERWRITING_STARTED', 'system', 'Underwriting evaluation started', financing.id);
    addEvent(nextState, 'UNDERWRITING_DECLINED', 'system', 'Application declined', financing.id);
  } else {
    financing.status = 'APPROVED';
    financing.underwriting = {
      status: 'APPROVED',
      score: nextState.guardian.trustScore,
      incomeVerified: true,
      affordabilityRatio: 0.24,
      reason: null,
      decidedAt: getTimestamp(),
    };
    addEvent(nextState, 'UNDERWRITING_STARTED', 'system', 'Underwriting evaluation started', financing.id);
    addEvent(nextState, 'UNDERWRITING_APPROVED', 'system', 'Application approved', financing.id);
  }

  return { ok: true, value: nextState };
}

export function acceptFinancingOffer(state: DemoState): DemoResult<DemoState> {
  const check = cloneAndCheckFinancing(state, ['APPROVED']);
  if (!('nextState' in check)) return check;
  const { nextState, financing } = check;

  financing.status = 'ACCEPTED';
  addEvent(nextState, 'OFFER_ACCEPTED', 'guardian', 'Guardian accepted financing offer', financing.id);

  return { ok: true, value: nextState };
}

export function fundFinancing(state: DemoState): DemoResult<DemoState> {
  const check = cloneAndCheckFinancing(state, ['ACCEPTED']);
  if (!('nextState' in check)) return check;
  const { nextState, financing } = check;

  const sponsor = nextState.sponsor;
  if (sponsor.walletBalance < financing.principal) {
    return createError('INSUFFICIENT_FUNDS', 'Sponsor has insufficient funds.');
  }

  const failed = nextState.flags.forceFundingFailure;
  nextState.flags.forceFundingFailure = false; // consume flag

  addEvent(nextState, 'FUNDING_STARTED', 'sponsor', 'Sponsor initiated funding', financing.id);

  if (failed) {
    financing.funding = {
      status: 'FAILED',
      sponsorId: sponsor.id,
      amount: financing.principal,
      processedAt: getTimestamp(),
    };
    // Reverts to ACCEPTED so it can be retried
    financing.status = 'ACCEPTED';
    addEvent(nextState, 'FUNDING_FAILED', 'system', 'Sponsor payment failed', financing.id);
    return { ok: true, value: nextState }; // Still valid state
  }

  financing.status = 'FUNDED';
  financing.sponsorId = sponsor.id;
  financing.funding = {
    status: 'SUCCESS',
    sponsorId: sponsor.id,
    amount: financing.principal,
    processedAt: getTimestamp(),
  };

  sponsor.walletBalance -= financing.principal;
  addLedgerEntry(nextState, 'FUNDING', sponsor.id, 'YAMI_ESCROW', financing.principal, 'Sponsor funding', financing.id);
  addEvent(nextState, 'FUNDING_SUCCEEDED', 'system', 'Sponsor funding successful', financing.id);

  return { ok: true, value: nextState };
}

export function processDisbursement(state: DemoState): DemoResult<DemoState> {
  const check = cloneAndCheckFinancing(state, ['FUNDED']);
  if (!('nextState' in check)) return check;
  const { nextState, financing } = check;

  const failed = nextState.flags.forceDisbursementFailure;
  nextState.flags.forceDisbursementFailure = false;

  addEvent(nextState, 'DISBURSEMENT_STARTED', 'system', 'Disbursement to institution started', financing.id);

  if (failed) {
    financing.disbursement = {
      status: 'FAILED',
      amount: financing.principal,
      institutionId: nextState.institution.id,
      processedAt: getTimestamp(),
    };
    // Remains FUNDED
    financing.status = 'FUNDED';
    addEvent(nextState, 'DISBURSEMENT_FAILED', 'system', 'Disbursement to institution failed', financing.id);
    return { ok: true, value: nextState };
  }

  financing.status = 'ACTIVE';
  financing.disbursement = {
    status: 'SUCCESS',
    amount: financing.principal,
    institutionId: nextState.institution.id,
    processedAt: getTimestamp(),
  };

  // Create repayment schedule
  const terms = calculateFinancingTerms(financing.principal);
  const now = Date.now();
  for (let i = 1; i <= terms.termMonths; i++) {
    financing.repayments.push({
      month: i,
      amount: terms.monthlyInstallment,
      principalPortion: terms.principalPerPayment,
      yamiPortion: terms.yamiPerPayment,
      sponsorPortion: terms.sponsorReturnPerPayment,
      status: i === 1 ? 'DUE' : 'SCHEDULED',
      dueDate: new Date(now + i * 30 * 24 * 60 * 60 * 1000).toISOString(),
      paidAt: null,
      attempts: [],
    });
  }

  addLedgerEntry(nextState, 'DISBURSEMENT', 'YAMI_ESCROW', nextState.institution.id, financing.principal, 'Tuition disbursement', financing.id);
  
  const premium = financing.principal * INSURANCE_PREMIUM_RATE;
  addLedgerEntry(nextState, 'INSURANCE_PREMIUM', 'YAMI_OPERATING', 'YAMI_ESCROW', premium, 'Platform Insurance Premium', financing.id);
  addEvent(nextState, 'DISBURSEMENT_SUCCEEDED', 'system', 'Tuition disbursed to institution', financing.id);

  // Queue webhook
  nextState.webhooks.push({
    id: generateId(nextState),
    createdAt: getTimestamp(),
    type: 'invoice.payment.disbursed',
    status: 'QUEUED',
    url: nextState.institution.webhookUrl,
    payload: { invoiceId: nextState.invoice.id, amount: financing.principal, status: 'paid' },
    attempts: 0,
    lastAttemptAt: null,
    deliveredAt: null,
  });
  nextState.nextId++;
  addEvent(nextState, 'WEBHOOK_QUEUED', 'system', 'Disbursement webhook queued', financing.id);

  return { ok: true, value: nextState };
}

export function deliverWebhook(state: DemoState, webhookId: number): DemoResult<DemoState> {
  const nextState = cloneState(state);
  const webhook = nextState.webhooks.find(w => w.id === webhookId);
  
  if (!webhook) return createError('INVALID_STATE_TRANSITION', 'Webhook not found');
  if (webhook.status !== 'QUEUED' && webhook.status !== 'RETRYING') {
    return createError('ALREADY_PROCESSED', 'Webhook already processed');
  }

  const failed = nextState.flags.forceWebhookFailure;
  nextState.flags.forceWebhookFailure = false;

  webhook.attempts++;
  webhook.lastAttemptAt = getTimestamp();

  if (failed) {
    webhook.status = 'FAILED';
    return { ok: true, value: addEvent(nextState, 'WEBHOOK_FAILED', 'system', 'Webhook delivery failed') };
  }

  webhook.status = 'DELIVERED';
  webhook.deliveredAt = getTimestamp();
  return { ok: true, value: addEvent(nextState, 'WEBHOOK_DELIVERED', 'system', 'Webhook delivered successfully') };
}

export function retryWebhook(state: DemoState, webhookId: number): DemoResult<DemoState> {
  const nextState = cloneState(state);
  const webhook = nextState.webhooks.find(w => w.id === webhookId);
  
  if (!webhook || webhook.status !== 'FAILED') {
    return createError('INVALID_STATE_TRANSITION', 'Can only retry failed webhooks');
  }
  
  webhook.status = 'RETRYING';
  return { ok: true, value: addEvent(nextState, 'WEBHOOK_RETRYING', 'operator', 'Retrying webhook delivery') };
}

export function processRepayment(state: DemoState, month: number): DemoResult<DemoState> {
  const check = cloneAndCheckFinancing(state, ['ACTIVE']);
  if (!('nextState' in check)) return check;
  const { nextState, financing } = check;

  const repayment = financing.repayments.find(r => r.month === month);
  if (!repayment) return createError('INVALID_STATE_TRANSITION', 'Repayment not found');

  if (repayment.status === 'PAID') {
    return createError('ALREADY_PROCESSED', 'Repayment already paid');
  }
  if (repayment.status !== 'DUE' && repayment.status !== 'FAILED') {
    return createError('REPAYMENT_NOT_DUE', 'Repayment is not due');
  }

  // Check invariants: Prior month must be paid
  if (month > 1) {
    const prior = financing.repayments.find(r => r.month === month - 1);
    if (!prior || prior.status !== 'PAID') {
      return createError('PRIOR_MONTH_UNPAID', 'Prior month must be paid first');
    }
  }

  const failed = nextState.flags.forceRepaymentFailure;
  nextState.flags.forceRepaymentFailure = false;

  addEvent(nextState, 'REPAYMENT_PROCESSING', 'system', `Processing Month ${month} repayment`, financing.id);

  if (failed) {
    repayment.status = 'FAILED';
    repayment.attempts.push({
      timestamp: getTimestamp(),
      outcome: 'FAILED',
      reason: 'Insufficient funds in linked card',
    });
    addEvent(nextState, 'REPAYMENT_FAILED', 'system', `Month ${month} repayment failed`, financing.id);
    return { ok: true, value: nextState };
  }

  repayment.status = 'PAID';
  repayment.paidAt = getTimestamp();
  repayment.attempts.push({ timestamp: repayment.paidAt, outcome: 'SUCCESS' });

  // Update balances and score
  nextState.guardian.trustScore += TRUST_SCORE_INCREMENT;
  if (financing.sponsorId && nextState.sponsor.id === financing.sponsorId) {
    nextState.sponsor.walletBalance += repayment.sponsorPortion;
  }

  // Ledger entries
  addLedgerEntry(nextState, 'REPAYMENT_RECEIVED', nextState.guardian.id, 'YAMI_ESCROW', repayment.amount, `Repayment Month ${month}`, financing.id);
  addLedgerEntry(nextState, 'SPONSOR_RETURN', 'YAMI_ESCROW', nextState.sponsor.id, repayment.sponsorPortion, `Sponsor yield + principal return`, financing.id);
  addLedgerEntry(nextState, 'YAMI_REVENUE', 'YAMI_ESCROW', 'YAMI_OPERATING', repayment.yamiPortion, `Yami margin`, financing.id);

  addEvent(nextState, 'REPAYMENT_SUCCEEDED', 'system', `Month ${month} repayment successful`, financing.id);

  // Set next month to DUE
  if (month < financing.termMonths) {
    const nextRepayment = financing.repayments.find(r => r.month === month + 1);
    if (nextRepayment) nextRepayment.status = 'DUE';
  }

  return { ok: true, value: nextState };
}

export function completeFinancing(state: DemoState): DemoResult<DemoState> {
  const check = cloneAndCheckFinancing(state, ['ACTIVE']);
  if (!('nextState' in check)) return check;
  const { nextState, financing } = check;

  const allPaid = financing.repayments.every(r => r.status === 'PAID');
  if (!allPaid) {
    return createError('INVALID_STATE_TRANSITION', 'All repayments must be PAID');
  }

  financing.status = 'COMPLETED';
  addEvent(nextState, 'FINANCING_COMPLETED', 'system', 'Financing successfully completed', financing.id);

  return { ok: true, value: nextState };
}

// ── Operator Scenarios ───────────────────────────────────────────────────────

export function cancelFinancing(state: DemoState): DemoResult<DemoState> {
  const check = cloneAndCheckFinancing(state);
  if (!('nextState' in check)) return check;
  const { nextState, financing } = check;

  financing.status = 'CANCELLED';
  addEvent(nextState, 'FINANCING_CANCELLED', 'operator', 'Financing cancelled by operator', financing.id);
  return { ok: true, value: nextState };
}

export function markRepaymentOverdue(state: DemoState, month: number): DemoResult<DemoState> {
  const check = cloneAndCheckFinancing(state, ['ACTIVE']);
  if (!('nextState' in check)) return check;
  const { nextState, financing } = check;

  const repayment = financing.repayments.find(r => r.month === month);
  if (!repayment || repayment.status !== 'FAILED') return createError('INVALID_STATE_TRANSITION', 'Only FAILED repayments can become OVERDUE');

  repayment.status = 'OVERDUE';
  if (!financing.collections || financing.collections.status === 'CURED') {
    financing.collections = {
      status: 'GRACE_PERIOD',
      daysOverdue: 1,
      remindersSent: 1,
      enteredAt: getTimestamp()
    };
  }
  
  addEvent(nextState, 'REPAYMENT_OVERDUE', 'system', `Repayment Month ${month} is now OVERDUE`, financing.id);
  return { ok: true, value: nextState };
}

export function startCollections(state: DemoState): DemoResult<DemoState> {
  const check = cloneAndCheckFinancing(state, ['ACTIVE']);
  if (!('nextState' in check)) return check;
  const { nextState, financing } = check;

  if (financing.collections?.status !== 'GRACE_PERIOD') {
    return createError('INVALID_STATE_TRANSITION', 'Can only start collections from GRACE_PERIOD');
  }

  financing.collections.status = 'COLLECTIONS_ACTIVE';
  financing.collections.daysOverdue = 15;
  financing.collections.remindersSent = 3;
  
  addEvent(nextState, 'COLLECTIONS_STARTED', 'system', 'Financing moved to active collections', financing.id);
  return { ok: true, value: nextState };
}

export function defaultFinancing(state: DemoState): DemoResult<DemoState> {
  const check = cloneAndCheckFinancing(state, ['ACTIVE']);
  if (!('nextState' in check)) return check;
  const { nextState, financing } = check;

  if (financing.collections?.status !== 'COLLECTIONS_ACTIVE') {
    return createError('INVALID_STATE_TRANSITION', 'Must be in active collections to default');
  }

  financing.status = 'DEFAULTED';
  financing.collections.status = 'DEFAULTED';
  
  addEvent(nextState, 'FINANCING_DEFAULTED', 'operator', 'Financing defaulted by operator', financing.id);
  return { ok: true, value: nextState };
}

export function submitInsuranceClaim(state: DemoState): DemoResult<DemoState> {
  const check = cloneAndCheckFinancing(state, ['DEFAULTED']);
  if (!('nextState' in check)) return check;
  const { nextState, financing } = check;

  if (financing.insurance) return createError('INVALID_STATE_TRANSITION', 'Claim already exists');

  financing.insurance = {
    id: generateId(nextState).toString(),
    status: 'SUBMITTED',
    claimAmount: calculateInsurancePayout(outstandingPrincipal(financing)),
    payoutAmount: null,
    submittedAt: getTimestamp(),
    resolvedAt: null
  };

  addEvent(nextState, 'INSURANCE_CLAIM_SUBMITTED', 'operator', 'Insurance claim submitted', financing.id);
  return { ok: true, value: nextState };
}

export function processInsuranceClaim(state: DemoState, outcome: 'APPROVED' | 'DENIED'): DemoResult<DemoState> {
  const check = cloneAndCheckFinancing(state, ['DEFAULTED']);
  if (!('nextState' in check)) return check;
  const { nextState, financing } = check;

  if (!financing.insurance || financing.insurance.status !== 'SUBMITTED') {
    return createError('INVALID_STATE_TRANSITION', 'No pending insurance claim');
  }

  financing.insurance.status = outcome;
  financing.insurance.resolvedAt = getTimestamp();

  if (outcome === 'APPROVED') {
    const payout = financing.insurance.claimAmount;
    financing.insurance.payoutAmount = payout;
    
    if (financing.sponsorId === nextState.sponsor.id) {
      nextState.sponsor.walletBalance += payout;
      addLedgerEntry(nextState, 'INSURANCE_PAYOUT', 'YAMI_OPERATING', nextState.sponsor.id, payout, 'Insurance Payout', financing.id);
      
      const unrecovered = calculateSponsorLoss(outstandingPrincipal(financing));
      addLedgerEntry(nextState, 'SPONSOR_LOSS', 'YAMI_ESCROW', nextState.sponsor.id, unrecovered, 'Realized Loss (Uncovered Principal)', financing.id);
    }
    addEvent(nextState, 'INSURANCE_CLAIM_APPROVED', 'system', 'Insurance claim approved and paid', financing.id);
  } else {
    if (financing.sponsorId === nextState.sponsor.id) {
      const totalLoss = outstandingPrincipal(financing);
      addLedgerEntry(nextState, 'SPONSOR_LOSS', 'YAMI_ESCROW', nextState.sponsor.id, totalLoss, 'Realized Loss (Full Exposure)', financing.id);
    }
    addEvent(nextState, 'INSURANCE_CLAIM_DENIED', 'system', 'Insurance claim denied', financing.id);
  }

  return { ok: true, value: nextState };
}

export function fileComplaint(state: DemoState, actorId: string, category: string, description: string, financingId?: string): DemoResult<DemoState> {
  const nextState = cloneState(state);
  const complaintId = generateId(nextState).toString();
  
  nextState.complaints.push({
    id: complaintId,
    actorId,
    category,
    financingId,
    status: 'OPEN',
    description,
    resolution: null,
    createdAt: getTimestamp()
  });
  nextState.nextId++;
  
  addEvent(nextState, 'COMPLAINT_OPENED', 'operator', `Complaint filed: ${category}`, financingId || null);
  return { ok: true, value: nextState };
}

export function resolveComplaint(state: DemoState, complaintId: string, resolution: string): DemoResult<DemoState> {
  const nextState = cloneState(state);
  const complaint = nextState.complaints.find(c => c.id === complaintId);
  if (!complaint) return createError('INVALID_STATE_TRANSITION', 'Complaint not found');
  
  complaint.status = 'RESOLVED';
  complaint.resolution = resolution;
  
  addEvent(nextState, 'COMPLAINT_RESOLVED', 'operator', `Complaint resolved`, complaint.financingId || null);
  return { ok: true, value: nextState };
}

export function resetDemo(): DemoState {

  return cloneState(DEMO_SEED_STATE);
}

export function setDemoFlag(state: DemoState, flag: keyof DemoFlags, value: boolean): DemoState {
  const nextState = cloneState(state);
  nextState.flags[flag] = value;
  return nextState;
}
