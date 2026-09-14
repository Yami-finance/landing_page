'use client';

import React from 'react';
import Link from 'next/link';
import { useDemo } from '@/lib/demo/store';
import { formatNaira, formatPercent } from '@/lib/demo/format';
import { SectionHead } from '@/components/ledger/SectionHead';
import { ScoreCard } from '@/components/score/ScoreCard';

export default function MarketplacePage() {
  const { state, isHydrated } = useDemo();

  if (!isHydrated) return null;

  const { financing } = state;
  const isAvailable = financing?.status === 'ACCEPTED'; // ACCEPTED means 'FINDING SPONSOR'

  if (!isAvailable) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] border border-ink/20 border-dashed bg-ink/5 p-8 text-center gap-4">
        <span className="font-mono text-4xl opacity-20">∅</span>
        <h3 className="font-disp text-2xl">No Opportunities</h3>
        <p className="text-ink-soft max-w-md">
          There are currently no approved tuition financing requests waiting for funding in the marketplace.
        </p>
      </div>
    );
  }

  // Display the opportunity (anonymized)
  return (
    <div className="flex flex-col border border-ink shadow-ticket bg-card">
      <SectionHead folio="MKT·OPP" />
      
      <div className="p-6 md:p-8 flex flex-col gap-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-xs uppercase tracking-widest text-ink-soft">Institution</span>
            <h3 className="font-disp text-2xl">{state.institution.name}</h3>
            <span className="text-sm text-ink-soft">B.Sc. Computer Science • 400 Level</span>
          </div>
          
          <div className="flex flex-col gap-1 md:items-end">
            <span className="font-mono text-xs uppercase tracking-widest text-ink-soft">Principal Required</span>
            <span className="font-mono text-3xl font-bold">{formatNaira(financing.principal)}</span>
          </div>
        </div>

        <div className="w-full h-px bg-ink/10" />

        <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8">
          
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">Yield Rate</span>
                <span className="font-disp text-xl">{formatPercent(financing.sponsorYieldRate)}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">Term</span>
                <span className="font-disp text-xl">{financing.termMonths} Months</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">Guarantor Income</span>
                <span className="font-mono">{formatNaira(state.guardian.monthlyIncome)} / mo</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">Affordability Ratio</span>
                <span className="font-mono">{formatPercent(financing.underwriting!.affordabilityRatio!)}</span>
              </div>
            </div>
            
            <p className="text-sm text-ink-soft leading-relaxed">
              This application has passed Yami&apos;s underwriting process. The guarantor has a verified income stream 
              and the affordability ratio is well within safe limits.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">Guarantor Trust Score</span>
            <div className="bg-forest p-4 rounded-sm">
              <ScoreCard score={financing.underwriting!.score!} pulseIndex={-1} />
            </div>
          </div>

        </div>

        <div className="border-t border-ink/20 -mx-6 md:-mx-8 -mb-6 md:-mb-8 p-6 md:p-8 bg-paper-2 flex justify-end">
          <Link 
            href={`/demo/sponsor/fund/${financing.id}`}
            className="px-6 py-3 bg-ink text-paper font-disp text-sm rounded-sm hover:-translate-y-1 hover:shadow-ticket transition-all"
          >
            Review & Fund
          </Link>
        </div>

      </div>
    </div>
  );
}
