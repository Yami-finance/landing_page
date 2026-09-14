'use client';

import React from 'react';
import { useDemo } from '@/lib/demo/store';
import { deriveInvoiceStatus, deriveClearanceStatus } from '@/lib/demo/types';
import { formatNaira } from '@/lib/demo/format';

export default function InstitutionOverview() {
  const { state, isHydrated } = useDemo();

  if (!isHydrated) return null;

  const { invoice, financing, student } = state;
  const status = deriveInvoiceStatus(financing);
  const clearance = deriveClearanceStatus(status);

  // In a real app this would aggregate multiple invoices. 
  // For the demo we summarize the canonical scenario.
  const totalSettled = status === 'PAID' ? invoice.amount : 0;
  const processing = status === 'PAYMENT_PROCESSING' ? invoice.amount : 0;

  return (
    <div className="flex flex-col gap-12 animate-in fade-in duration-500">
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 border border-ink/20 bg-card flex flex-col gap-2 shadow-ticket">
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">Total Yami Settlement</span>
          <span className="font-disp text-3xl text-green-ink">{formatNaira(totalSettled)}</span>
        </div>
        <div className="p-6 border border-ink/20 bg-card flex flex-col gap-2 shadow-ticket">
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">Processing</span>
          <span className="font-disp text-3xl">{formatNaira(processing)}</span>
        </div>
        <div className="p-6 border border-ink/20 bg-card flex flex-col gap-2 shadow-ticket">
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">Financed Students</span>
          <span className="font-disp text-3xl">1</span>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <h2 className="font-disp text-2xl">Recent Invoices</h2>
        
        <div className="flex flex-col border border-ink shadow-ticket bg-card overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead>
              <tr className="font-mono text-[10px] uppercase tracking-widest text-ink-soft border-b border-ink/20 bg-ink/5">
                <th className="p-4 font-normal">Invoice ID</th>
                <th className="p-4 font-normal">Student</th>
                <th className="p-4 font-normal">Amount</th>
                <th className="p-4 font-normal">Payment Status</th>
                <th className="p-4 font-normal">Clearance</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-ink/10 last:border-0 hover:bg-ink/5 transition-colors">
                <td className="p-4 font-mono text-xs">{invoice.id}</td>
                <td className="p-4 text-sm font-semibold">{student.lastName}, {student.firstName}</td>
                <td className="p-4 font-mono">{formatNaira(invoice.amount)}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-[10px] font-mono uppercase tracking-widest rounded-sm ${
                    status === 'PAID' ? 'bg-green text-ink' :
                    status === 'PAYMENT_PROCESSING' ? 'border border-ink/30 text-ink' :
                    'bg-ink/10 text-ink-soft'
                  }`}>
                    {status.replace(/_/g, ' ')}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-[10px] font-mono uppercase tracking-widest rounded-sm ${
                    clearance === 'CLEARED' ? 'border border-ink text-ink font-bold' : 'text-ink-soft'
                  }`}>
                    {clearance}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {status === 'PAID' && (
        <div className="flex flex-col gap-4 mt-4">
          <h2 className="font-disp text-2xl">Yami Settlement Details</h2>
          <div className="p-6 border border-ink shadow-ticket bg-card flex flex-col md:flex-row gap-8 justify-between">
            <div className="flex flex-col gap-4 max-w-sm">
              <p className="text-sm text-ink-soft">
                This tuition was financed through Yami. The full amount has been settled to your institution upfront, 
                and the student is cleared. The borrower&apos;s subsequent repayment obligation is managed entirely by Yami.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-x-12 gap-y-4 font-mono text-sm">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-widest text-ink-soft">Payment Method</span>
                <span>Yami Financing</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-widest text-ink-soft">Financing Term</span>
                <span>{financing?.termMonths} months</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-widest text-ink-soft">Settlement Amount</span>
                <span className="text-green-ink font-bold">{formatNaira(invoice.amount)}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-widest text-ink-soft">Settlement Date</span>
                <span>{financing?.disbursement?.processedAt ? new Date(financing.disbursement.processedAt).toLocaleDateString() : '-'}</span>
              </div>
              <div className="flex flex-col gap-1 col-span-2 mt-2 pt-2 border-t border-ink/10">
                <span className="text-[10px] uppercase tracking-widest text-ink-soft">Institution Risk Exposure</span>
                <span className="text-ink font-bold">None (Non-Recourse)</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
