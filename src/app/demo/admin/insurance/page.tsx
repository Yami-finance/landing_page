'use client';

import React from 'react';
import { useDemo } from '@/lib/demo/store';
import { formatNaira, formatDateTime } from '@/lib/demo/format';

export default function AdminInsurancePage() {
  const { state, dispatch, isHydrated } = useDemo();

  if (!isHydrated) return null;

  const { financing } = state;
  const insurance = financing?.insurance;

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      
      <div className="flex flex-col gap-2">
        <h2 className="font-disp text-2xl text-paper">Insurance Claims Management</h2>
        <p className="text-sm text-forest-muted">
          Review submitted claims for defaulted financing agreements.
        </p>
      </div>

      {!insurance ? (
        <div className="p-8 border border-rule-dark border-dashed bg-ink text-center text-forest-muted">
          No active insurance claims.
        </div>
      ) : (
        <div className="flex flex-col border border-rule-dark bg-ink shadow-ticket">
          <div className="p-6 border-b border-rule-dark flex justify-between items-center">
            <div>
              <h3 className="font-mono text-sm text-paper mb-1">CLAIM REF: {insurance.id}</h3>
              <p className="text-xs text-forest-muted">Financing: {financing.id}</p>
            </div>
            <span className={`px-3 py-1 font-mono text-[10px] uppercase tracking-widest border rounded-sm ${
              insurance.status === 'APPROVED' ? 'border-green text-green' :
              insurance.status === 'DENIED' ? 'border-red-400 text-red-400' :
              'border-blue-400 text-blue-400'
            }`}>
              {insurance.status.replace(/_/g, ' ')}
            </span>
          </div>
          
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] uppercase tracking-widest text-forest-muted">Claim Amount</span>
                <span className="font-disp text-2xl text-paper">{formatNaira(insurance.claimAmount)}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] uppercase tracking-widest text-forest-muted">Submitted At</span>
                <span className="text-sm text-paper">{insurance.submittedAt ? formatDateTime(insurance.submittedAt) : '-'}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] uppercase tracking-widest text-forest-muted">Resolved At</span>
                <span className="text-sm text-paper">{insurance.resolvedAt ? formatDateTime(insurance.resolvedAt) : '-'}</span>
              </div>
            </div>

            {insurance.status === 'SUBMITTED' || insurance.status === 'UNDER_REVIEW' ? (
              <div className="flex flex-col gap-4 justify-center p-4 border border-rule-dark border-dashed rounded-sm bg-forest">
                <span className="font-mono text-[10px] uppercase tracking-widest text-center text-forest-muted">Operator Decision</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => dispatch({ type: 'PROCESS_CLAIM', outcome: 'APPROVED' })}
                    className="flex-1 py-3 bg-green hover:bg-[#c9f000] text-ink font-mono text-xs uppercase tracking-widest transition-colors"
                  >
                    Approve Claim
                  </button>
                  <button 
                    onClick={() => dispatch({ type: 'PROCESS_CLAIM', outcome: 'DENIED' })}
                    className="flex-1 py-3 border border-red-500/50 hover:bg-red-500/10 text-red-400 font-mono text-xs uppercase tracking-widest transition-colors"
                  >
                    Deny Claim
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4 justify-center">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-forest-muted">Final Payout</span>
                  <span className="font-disp text-2xl text-green">{insurance.payoutAmount !== null ? formatNaira(insurance.payoutAmount) : '₦0.00'}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
