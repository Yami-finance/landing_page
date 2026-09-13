'use client';

import React, { useState } from 'react';
import { useDemo } from '@/lib/demo/store';
import type { DemoFlags } from '@/lib/demo/types';

export function DemoControls() {
  const { state, dispatch, isHydrated } = useDemo();
  const [isOpen, setIsOpen] = useState(false);

  if (!isHydrated) return null;

  const flags: { key: keyof DemoFlags; label: string }[] = [
    { key: 'forceUnderwritingDecline', label: 'Force Underwriting Decline' },
    { key: 'forceFundingFailure', label: 'Force Funding Failure' },
    { key: 'forceDisbursementFailure', label: 'Force Disbursement Failure' },
    { key: 'forceWebhookFailure', label: 'Force Webhook Failure' },
    { key: 'forceRepaymentFailure', label: 'Force Repayment Failure' },
  ];

  const toggleFlag = (flag: keyof DemoFlags) => {
    dispatch({ type: 'SET_FLAG', flag, value: !state.flags[flag] });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 font-body">
      {isOpen && (
        <div className="mb-4 bg-paper border border-ink shadow-ticket w-80 rounded-sm overflow-hidden flex flex-col">
          <div className="bg-ink text-paper p-3 flex justify-between items-center">
            <span className="font-mono text-xs uppercase tracking-widest">Operator Controls</span>
            <button onClick={() => setIsOpen(false)} className="text-paper/60 hover:text-paper font-mono text-xs">
              [X]
            </button>
          </div>
          
          <div className="p-4 flex flex-col gap-4 max-h-[70vh] overflow-y-auto">
            
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[10px] text-ink-soft uppercase tracking-widest">Global Actions</span>
              <button 
                onClick={() => dispatch({ type: 'RESET' })}
                className="w-full text-left px-3 py-2 text-sm bg-ink/5 hover:bg-ink/10 border border-ink/20 rounded-sm transition-colors"
              >
                Reset Entire Demo
              </button>
            </div>

            <div className="w-full h-px bg-ink/10" />

            <div className="flex flex-col gap-2">
              <span className="font-mono text-[10px] text-ink-soft uppercase tracking-widest">Failure Simulation</span>
              <p className="text-[11px] text-ink/70 leading-tight mb-2">
                Toggle these flags to simulate failure on the <strong>next</strong> corresponding action. Flags auto-reset after consumption.
              </p>
              
              {flags.map(({ key, label }) => {
                const isActive = state.flags[key];
                return (
                  <label key={key} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="hidden" checked={isActive} onChange={() => toggleFlag(key)} />
                    <div className={`
                      w-4 h-4 border flex items-center justify-center transition-colors
                      ${isActive ? 'bg-ink border-ink' : 'border-ink/30 group-hover:border-ink'}
                    `}>
                      {isActive && <div className="w-2 h-2 bg-paper" />}
                    </div>
                    <span className={`text-sm select-none ${isActive ? 'text-ink font-semibold' : 'text-ink-soft'}`}>
                      {label}
                    </span>
                  </label>
                );
              })}
            </div>
            
            <div className="w-full h-px bg-ink/10" />

            <div className="flex flex-col gap-2">
              <span className="font-mono text-[10px] text-ink-soft uppercase tracking-widest">Collections & Default</span>
              <p className="text-[11px] text-ink/70 leading-tight mb-2">
                Trigger lifecycle events for defaulted accounts.
              </p>
              
              <button 
                onClick={() => {
                  const failedRepayment = state.financing?.repayments.find(r => r.status === 'FAILED');
                  if (failedRepayment) {
                    dispatch({ type: 'MARK_OVERDUE', month: failedRepayment.month });
                  } else {
                    alert('No FAILED repayment to mark overdue. Toggle "Force Repayment Failure" and process a repayment first.');
                  }
                }}
                className="w-full text-left px-3 py-2 text-sm bg-ink/5 hover:bg-ink/10 border border-ink/20 rounded-sm transition-colors"
              >
                1. Mark Failed Repayment Overdue
              </button>
              <button 
                onClick={() => dispatch({ type: 'START_COLLECTIONS' })}
                className="w-full text-left px-3 py-2 text-sm bg-ink/5 hover:bg-ink/10 border border-ink/20 rounded-sm transition-colors"
              >
                2. Enter Active Collections
              </button>
              <button 
                onClick={() => dispatch({ type: 'DEFAULT_FINANCING' })}
                className="w-full text-left px-3 py-2 text-sm bg-red-500/10 hover:bg-red-500/20 text-red-700 border border-red-500/30 rounded-sm transition-colors"
              >
                3. Declare Default
              </button>
              <button 
                onClick={() => dispatch({ type: 'SUBMIT_CLAIM' })}
                className="w-full text-left px-3 py-2 text-sm bg-blue-500/10 hover:bg-blue-500/20 text-blue-700 border border-blue-500/30 rounded-sm transition-colors"
              >
                4. Submit Insurance Claim
              </button>
            </div>
            
            <div className="w-full h-px bg-ink/10" />

            <div className="flex flex-col gap-2">
              <span className="font-mono text-[10px] text-ink-soft uppercase tracking-widest">Support</span>
              <button 
                onClick={() => dispatch({ type: 'FILE_COMPLAINT', actorId: 'GUA-20491', category: 'Payment Issue', description: 'My account still says overdue but I have paid.' })}
                className="w-full text-left px-3 py-2 text-sm bg-ink/5 hover:bg-ink/10 border border-ink/20 rounded-sm transition-colors"
              >
                File Sample Complaint (Guardian)
              </button>
            </div>

          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-ink text-paper rounded-full shadow-ticket flex items-center justify-center hover:-translate-y-1 transition-transform ml-auto"
        aria-label="Demo Controls"
      >
        <span className="font-mono text-xl leading-none">⚙</span>
      </button>
    </div>
  );
}
