import React from 'react';
import { Stamp, type StampState } from '@/components/ledger/Stamp';
import { FINANCING_STATUS_DISPLAY, INVOICE_STATUS_DISPLAY } from '@/lib/demo/state-machine';
import type { FinancingStatus, InvoiceStatus, FundingStatus, DisbursementStatus, RepaymentStatus, WebhookStatus } from '@/lib/demo/types';

export function FinancingStatusStamp({ status }: { status: FinancingStatus }) {
  const display = FINANCING_STATUS_DISPLAY[status];
  return <Stamp state={display.stamp}>{display.label}</Stamp>;
}

export function InvoiceStatusStamp({ status }: { status: InvoiceStatus }) {
  const display = INVOICE_STATUS_DISPLAY[status];
  return <Stamp state={display.stamp}>{display.label}</Stamp>;
}

export function GenericStatusStamp({ 
  status, 
  successState = 'done', 
  pendingState = 'now' 
}: { 
  status: FundingStatus | DisbursementStatus | RepaymentStatus | WebhookStatus;
  successState?: StampState;
  pendingState?: StampState;
}) {
  let state: StampState = 'outline';
  let label = status.toString();

  switch (status) {
    case 'SUCCESS':
    case 'PAID':
    case 'DELIVERED':
      state = successState;
      label = status === 'PAID' ? 'Paid' : status === 'SUCCESS' ? 'Success' : 'Delivered';
      break;
    case 'PENDING':
    case 'QUEUED':
    case 'SCHEDULED':
      state = 'outline';
      label = status === 'SCHEDULED' ? 'Scheduled' : status === 'QUEUED' ? 'Queued' : 'Pending';
      break;
    case 'PROCESSING':
    case 'DELIVERING':
      state = pendingState;
      label = 'Processing';
      break;
    case 'DUE':
      state = 'now';
      label = 'Due';
      break;
    case 'FAILED':
      state = 'outline';
      label = 'Failed';
      break;
    case 'RETRYING':
      state = 'now';
      label = 'Retrying';
      break;
  }

  return <Stamp state={state}>{label}</Stamp>;
}
