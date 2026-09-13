'use client';

import React from 'react';
import { useDemo } from '@/lib/demo/store';
import { formatNaira, formatPercent } from '@/lib/demo/format';
import { sponsorTotalReturned, repaymentProgress, calculateFinancingTerms, outstandingPrincipal, calculateSponsorLoss } from '@/lib/demo/calculations';
import { SectionHead } from '@/components/ledger/SectionHead';
import { RepaymentSchedule } from '@/components/demo/RepaymentSchedule';
import { FinancingStatusStamp } from '@/components/demo/StatusStamp';
import { FinancingTimeline } from '@/components/demo/FinancingTimeline';

export default function PortfolioPage() {
  const { state, isHydrated } = useDemo();

  if (!isHydrated) return null;

  const { financing } = state;
  const isFunded = financing && ['FUNDED', 'DISBURSING', 'ACTIVE', 'COMPLETED', 'DEFAULTED'].includes(financing.status);

  if (!isFunded) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] border border-ink/20 border-dashed bg-ink/5 p-8 text-center gap-4">
        <span className="font-mono text-4xl opacity-20">∅</span>
        <h3 className="font-disp text-2xl">Empty Portfolio</h3>
        <p className="text-ink-soft max-w-md">
          You have not funded any tuition financing agreements yet. Visit the marketplace to find opportunities.
        </p>
      </div>
    );
  }

  const terms = calculateFinancingTerms(financing.principal);
  const returned = sponsorTotalReturned(financing);
  const insurancePayout = financing.insurance?.payoutAmount || 0;
  const totalReceived = returned + insurancePayout;
  
  let expectedYield = terms.sponsorYield;
  let sponsorLoss = 0;
  if (financing.status === 'DEFAULTED') {
    expectedYield = 0; // Yield is halted on default
    if (financing.insurance?.status === 'DENIED') {
      sponsorLoss = outstandingPrincipal(financing);
    } else if (financing.insurance?.status === 'APPROVED') {
      sponsorLoss = calculateSponsorLoss(outstandingPrincipal(financing));
    }
  }
  const progress = repaymentProgress(financing);

  return (
    <div className="flex flex-col gap-12 animate-in fade-in duration-500">
      
      {/* Portfolio Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 border border-ink/20 bg-card flex flex-col gap-2 shadow-ticket">
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">Active Capital</span>
          <span className="font-disp text-3xl">{formatNaira(financing.principal)}</span>
        </div>
        <div className="p-6 border border-ink/20 bg-card flex flex-col gap-2 shadow-ticket">
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">Expected Yield</span>
          <span className={`font-disp text-3xl ${financing.status === 'DEFAULTED' ? 'text-ink-soft line-through' : 'text-green-ink'}`}>{formatNaira(expectedYield)}</span>
        </div>
        <div className="p-6 border border-ink/20 bg-card flex flex-col gap-2 shadow-ticket">
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">Total Returned</span>
          <span className="font-disp text-3xl">{formatNaira(totalReceived)}</span>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <h2 className="font-disp text-2xl">Active Investments</h2>
        
        <div className="flex flex-col border border-ink shadow-ticket bg-card">
          <SectionHead folio="INV·01" />
          
          <div className="p-6 flex flex-col gap-6">
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-xs uppercase tracking-widest text-ink-soft">Institution</span>
                <h3 className="font-disp text-xl">{state.institution.name}</h3>
                <span className="text-sm text-ink-soft font-mono opacity-80">REF: {financing.id}</span>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex flex-col text-right">
                  <span className="font-mono text-xl font-bold">{formatNaira(financing.principal)}</span>
                  <span className="text-xs text-ink-soft">{formatPercent(financing.sponsorYieldRate)} Yield</span>
                </div>
                <FinancingStatusStamp status={financing.status} />
              </div>
            </div>

            {/* Progress Bar */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs font-mono text-ink-soft">
                <span>Repayment Progress</span>
                <span>{formatPercent(progress)}</span>
              </div>
              <div className="w-full h-2 bg-ink/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green transition-all duration-1000 ease-out" 
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
            </div>

          </div>

          {financing.insurance && (
            <div className="p-6 border-t border-ink/20 bg-blue-50/50">
              <h4 className="font-mono text-xs uppercase tracking-widest text-blue-900 mb-4">Insurance & Recovery</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">Claim Status</span>
                  <span className="font-mono text-sm text-ink">{financing.insurance.status.replace(/_/g, ' ')}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">Insurance Recovery</span>
                  <span className="font-mono text-sm text-green-ink">{formatNaira(insurancePayout)}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">Realized Loss (Uncovered)</span>
                  <span className="font-mono text-sm text-red-500">{formatNaira(sponsorLoss)}</span>
                </div>
              </div>
            </div>
          )}
          <RepaymentSchedule repayments={financing.repayments} />
          
          <div className="p-6 border-t border-ink/20">
            <h4 className="font-mono text-xs uppercase tracking-widest text-ink-soft mb-4">Investment Timeline</h4>
            <FinancingTimeline events={state.events} financingId={financing.id} />
          </div>

        </div>
      </div>

    </div>
  );
}
