'use client';

import React from 'react';
import { useDemo } from '@/lib/demo/store';
import { formatNaira, formatDateTime } from '@/lib/demo/format';

export default function PaymentsPage() {
  const { state, isHydrated } = useDemo();

  if (!isHydrated) return null;

  // Find ledger entries that are disbursements to this institution
  const payments = state.ledger
    .filter(entry => entry.type === 'DISBURSEMENT' && entry.creditAccount === state.institution.id)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      
      <div className="flex flex-col gap-2">
        <h2 className="font-disp text-2xl">Settlement & Payments</h2>
        <p className="text-sm text-ink-soft">
          History of tuition funds disbursed by Yami to your institutional account.
        </p>
      </div>

      {payments.length === 0 ? (
        <div className="p-8 border border-ink/20 border-dashed text-center text-ink-soft">
          No payments have been received yet.
        </div>
      ) : (
        <div className="flex flex-col border border-ink shadow-ticket bg-card overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead>
              <tr className="font-mono text-[10px] uppercase tracking-widest text-ink-soft border-b border-ink/20 bg-ink/5">
                <th className="p-4 font-normal">Date / Time</th>
                <th className="p-4 font-normal">Financing Ref</th>
                <th className="p-4 font-normal">Description</th>
                <th className="p-4 font-normal text-right">Amount Settled</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(payment => (
                <tr key={payment.id} className="border-b border-ink/10 last:border-0 hover:bg-ink/5 transition-colors">
                  <td className="p-4 font-mono text-xs">{formatDateTime(payment.timestamp)}</td>
                  <td className="p-4 font-mono text-xs">{payment.financingId}</td>
                  <td className="p-4 text-sm">{payment.description}</td>
                  <td className="p-4 font-mono text-right text-green-ink font-bold">{formatNaira(payment.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}
