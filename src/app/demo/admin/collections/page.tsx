'use client';

import React from 'react';
import { useDemo } from '@/lib/demo/store';
import { formatNaira } from '@/lib/demo/format';
import { outstandingTotalObligation } from '@/lib/demo/calculations';
import { FinancingStatusStamp } from '@/components/demo/StatusStamp';

export default function AdminCollectionsPage() {
  const { state, isHydrated } = useDemo();

  if (!isHydrated) return null;

  const { financing } = state;

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      
      <div className="flex flex-col gap-2">
        <h2 className="font-disp text-2xl text-paper">Collections & Default Management</h2>
        <p className="text-sm text-forest-muted">
          Track delinquent accounts, grace periods, and manual default declarations.
        </p>
      </div>

      {!financing || !financing.collections ? (
        <div className="p-8 border border-rule-dark border-dashed bg-ink text-center text-forest-muted">
          No accounts in active collections.
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-6 border border-rule-dark bg-ink flex flex-col gap-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-forest-muted">Collections Status</span>
              <span className="font-mono text-lg text-paper">{financing.collections.status.replace(/_/g, ' ')}</span>
            </div>
            <div className="p-6 border border-rule-dark bg-ink flex flex-col gap-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-forest-muted">Days Overdue</span>
              <span className="font-disp text-3xl text-red-400">{financing.collections.daysOverdue}</span>
            </div>
            <div className="p-6 border border-rule-dark bg-ink flex flex-col gap-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-forest-muted">Reminders Sent</span>
              <span className="font-disp text-3xl text-paper">{financing.collections.remindersSent}</span>
            </div>
            <div className="p-6 border border-rule-dark bg-ink flex flex-col gap-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-forest-muted">Total Outstanding</span>
              <span className="font-disp text-3xl text-paper">{formatNaira(outstandingTotalObligation(financing))}</span>
            </div>
          </div>

          <div className="flex flex-col border border-rule-dark bg-ink overflow-x-auto shadow-ticket">
            <table className="w-full text-left whitespace-nowrap">
              <thead>
                <tr className="font-mono text-[10px] uppercase tracking-widest text-forest-muted border-b border-rule-dark">
                  <th className="p-4 font-normal">Financing ID</th>
                  <th className="p-4 font-normal">Borrower</th>
                  <th className="p-4 font-normal">Status</th>
                  <th className="p-4 font-normal">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-rule-dark last:border-0">
                  <td className="p-4 font-mono text-xs text-paper">{financing.id}</td>
                  <td className="p-4 text-sm text-paper">{state.guardian.firstName} {state.guardian.lastName}</td>
                  <td className="p-4">
                    <FinancingStatusStamp status={financing.status} />
                  </td>
                  <td className="p-4">
                    {/* Operator actions are managed through DemoControls to maintain clear boundaries */}
                    <span className="text-xs text-forest-muted italic">Managed via Operator Controls</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
