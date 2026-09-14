'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDemo } from '@/lib/demo/store';
import { formatNaira } from '@/lib/demo/format';
import { outstandingPrincipal, outstandingTotalObligation } from '@/lib/demo/calculations';
import { FinancingStatusStamp } from '@/components/demo/StatusStamp';
import { RepaymentSchedule } from '@/components/demo/RepaymentSchedule';
import { FinancingTimeline } from '@/components/demo/FinancingTimeline';
import { ScoreCard } from '@/components/score/ScoreCard';
import { SectionHead } from '@/components/ledger/SectionHead';

export default function BorrowerDashboard() {
  const { state, dispatch, isHydrated } = useDemo();
  const router = useRouter();

  useEffect(() => {
    if (!isHydrated) return;
    const status = state.financing?.status;
    if (!state.financing || status === 'SUBMITTED' || status === 'APPROVED' || status === 'DECLINED') {
      router.push('/demo/borrower/apply');
    }
  }, [state.financing, state.financing?.status, isHydrated, router]);

  if (!isHydrated || !state.financing) return null;

  const { financing, guardian } = state;
  const isFindingSponsor = financing.status === 'ACCEPTED' || financing.status === 'FUNDING';
  const isDisbursing = financing.status === 'FUNDED' || financing.status === 'DISBURSING';
  const isActive = financing.status === 'ACTIVE' || financing.status === 'COMPLETED' || financing.status === 'DEFAULTED';

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-12 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-ink/20 pb-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <h1 className="font-disp text-4xl">Dashboard</h1>
            <FinancingStatusStamp status={financing.status} />
          </div>
          <p className="text-ink-soft">
            Tuition financing for {state.student.firstName} {state.student.lastName}
          </p>
        </div>
        
        {isActive && (
          <div className="flex flex-col gap-1 text-left md:text-right">
            <span className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">
              {financing.status === 'DEFAULTED' ? 'Outstanding Total Obligation' : 'Outstanding Principal'}
            </span>
            <span className={`font-disp text-3xl ${financing.status === 'DEFAULTED' ? 'text-red-500' : ''}`}>
              {formatNaira(financing.status === 'DEFAULTED' ? outstandingTotalObligation(financing) : outstandingPrincipal(financing))}
            </span>
          </div>
        )}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
        
        {/* Left Column */}
        <div className="flex flex-col gap-12">
          
          {isFindingSponsor && (
            <div className="p-8 border border-ink shadow-ticket bg-paper-2 flex flex-col items-center justify-center min-h-[300px] text-center gap-6">
              <div className="w-12 h-12 border-4 border-ink/20 border-t-green rounded-full animate-spin" />
              <div className="flex flex-col gap-2">
                <h3 className="font-disp text-2xl">Finding a Sponsor</h3>
                <p className="text-ink-soft max-w-sm">
                  Your approved request is currently listed in the Yami marketplace. 
                  We will notify you the moment a sponsor funds your tuition.
                </p>
              </div>
            </div>
          )}

          {isDisbursing && (
            <div className="p-8 border border-ink shadow-ticket bg-paper-2 flex flex-col items-center justify-center min-h-[300px] text-center gap-6">
              <div className="w-12 h-12 bg-green rounded-full flex items-center justify-center animate-pulse">
                <span className="font-disp text-xl text-ink">✓</span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-disp text-2xl">Sponsor Found!</h3>
                <p className="text-ink-soft max-w-sm">
                  Your tuition has been fully funded. We are currently disbursing the payment to {state.institution.shortName}.
                </p>
              </div>
            </div>
          )}

          {financing.collections && financing.collections.status !== 'CURED' && (
            <div className="p-6 border border-red-500/30 bg-red-50 text-red-900 shadow-ticket mb-4">
              <h3 className="font-mono text-sm uppercase tracking-widest mb-2 font-bold text-red-700">Account Alert: {financing.collections.status.replace(/_/g, ' ')}</h3>
              <p className="text-sm">
                Your account is currently in {financing.collections.status.replace(/_/g, ' ').toLowerCase()}. 
                {financing.collections.status === 'DEFAULTED' 
                  ? ' This debt has been transferred to recovery.' 
                  : ' Please make a payment immediately to cure your account status.'}
              </p>
            </div>
          )}

          {isActive && (
            <RepaymentSchedule 
              repayments={financing.repayments} 
              showPayButton={financing.status !== 'DEFAULTED'}
              onPay={(month) => dispatch({ type: 'PROCESS_REPAYMENT', month })}
            />
          )}

          {/* Timeline */}
          <div className="mt-4">
            <FinancingTimeline events={state.events} financingId={financing.id} />
          </div>

        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-8">
          
          <div className="flex flex-col gap-4">
            <div className="font-mono text-sm uppercase tracking-widest text-ink-soft border-b border-ink/10 pb-2">
              Trust Score
            </div>
            {/* The existing ScoreCard requires a dark background container to look correct (it's designed for DarkPanel) */}
            <div className="bg-forest p-6 rounded-sm">
              <ScoreCard score={guardian.trustScore} pulseIndex={-1} />
              <p className="text-forest-muted text-xs text-center mt-4 font-mono">
                Increases by 10 points for every on-time repayment.
              </p>
            </div>
          </div>

          <div className="flex flex-col border border-ink/20 bg-card">
            <SectionHead folio="FIN·DETAILS" />
            <div className="p-4 flex flex-col gap-4 font-mono text-xs">
              <div className="flex justify-between border-b border-ink/10 pb-2">
                <span className="text-ink-soft">Financing ID</span>
                <span>{financing.id}</span>
              </div>
              <div className="flex justify-between border-b border-ink/10 pb-2">
                <span className="text-ink-soft">Invoice Ref</span>
                <span>{financing.invoiceId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-soft">Date Approved</span>
                <span>{financing.underwriting?.decidedAt ? new Date(financing.underwriting.decidedAt).toLocaleDateString() : '-'}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
      
    </div>
  );
}
