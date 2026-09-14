'use client';

import React from 'react';
import { useDemo } from '@/lib/demo/store';
import { formatNaira, formatPercent } from '@/lib/demo/format';
import { FinancingStatusStamp } from '@/components/demo/StatusStamp';

export default function OrderBookPage() {
  const { state, isHydrated } = useDemo();

  if (!isHydrated) return null;

  const { financing } = state;

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      
      <div className="flex flex-col gap-2">
        <h2 className="font-disp text-2xl text-paper">Financing Order Book</h2>
        <p className="text-sm text-forest-muted">
          All financing agreements in the system.
        </p>
      </div>

      {!financing ? (
        <div className="p-8 border border-rule-dark border-dashed bg-ink text-center text-forest-muted">
          No financing orders exist in the system yet.
        </div>
      ) : (
        <div className="flex flex-col border border-rule-dark bg-ink overflow-x-auto shadow-ticket">
          <table className="w-full text-left whitespace-nowrap">
            <thead>
              <tr className="font-mono text-[10px] uppercase tracking-widest text-forest-muted border-b border-rule-dark">
                <th className="p-4 font-normal">Financing ID</th>
                <th className="p-4 font-normal">Guardian / Sponsor</th>
                <th className="p-4 font-normal">Principal</th>
                <th className="p-4 font-normal">Terms</th>
                <th className="p-4 font-normal">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-rule-dark last:border-0">
                <td className="p-4 font-mono text-xs text-paper">{financing.id}</td>
                <td className="p-4 flex flex-col gap-1">
                  <span className="text-sm text-paper">G: {state.guardian.firstName} {state.guardian.lastName}</span>
                  <span className="text-xs text-forest-muted">
                    S: {financing.sponsorId ? `${state.sponsor.firstName} ${state.sponsor.lastName}` : 'Unassigned'}
                  </span>
                </td>
                <td className="p-4 font-mono text-sm text-paper">{formatNaira(financing.principal)}</td>
                <td className="p-4 flex flex-col gap-1 text-xs text-forest-muted">
                  <span>{financing.termMonths} Months</span>
                  <span>M: {formatPercent(financing.yamiMarginRate)} / Y: {formatPercent(financing.sponsorYieldRate)}</span>
                </td>
                <td className="p-4">
                  <FinancingStatusStamp status={financing.status} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}
