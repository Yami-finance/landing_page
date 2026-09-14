import React from 'react';
import type { Repayment } from '@/lib/demo/types';
import { formatNaira, formatDate } from '@/lib/demo/format';
import { GenericStatusStamp } from './StatusStamp';
import { SectionHead } from '@/components/ledger/SectionHead';

interface Props {
  repayments: Repayment[];
  dark?: boolean;
  onPay?: (month: number) => void;
  showPayButton?: boolean;
}

export function RepaymentSchedule({ repayments, dark = false, onPay, showPayButton = false }: Props) {
  if (!repayments || repayments.length === 0) return null;

  return (
    <div className={`flex flex-col border border-ink/20 ${dark ? 'bg-forest' : 'bg-paper'}`}>
      <SectionHead folio="SCHED·REP" dark={dark} />
      
      <div className="flex flex-col">
        {repayments.map((rep) => (
          <div 
            key={rep.month}
            className={`
              grid grid-cols-[80px_1fr_auto] md:grid-cols-[100px_1fr_1fr_auto] gap-4 p-4 border-b last:border-b-0 items-center
              ${dark ? 'border-rule-dark text-paper' : 'border-rule text-ink'}
            `}
          >
            <div className="font-mono text-xs opacity-60">
              Month {rep.month}
            </div>
            
            <div className="flex flex-col gap-1">
              <span className="font-disp text-base">{formatNaira(rep.amount)}</span>
              <span className="font-mono text-[10px] opacity-60 uppercase">
                Due: {formatDate(rep.dueDate)}
              </span>
            </div>

            <div className="hidden md:flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <GenericStatusStamp status={rep.status} />
              </div>
              {rep.paidAt && (
                <span className="font-mono text-[10px] opacity-60 uppercase">
                  Paid: {formatDate(rep.paidAt)}
                </span>
              )}
            </div>

            <div className="flex items-center justify-end">
              {/* Mobile Status */}
              <div className="md:hidden mr-4">
                <GenericStatusStamp status={rep.status} />
              </div>

              {showPayButton && (rep.status === 'DUE' || rep.status === 'FAILED') && onPay && (
                <button
                  onClick={() => onPay(rep.month)}
                  className={`
                    px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-sm transition-all
                    ${dark 
                      ? 'bg-green text-ink hover:bg-[#c9e635]' 
                      : 'bg-ink text-paper hover:-translate-y-px hover:shadow-ticket'
                    }
                  `}
                >
                  Pay Now
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
