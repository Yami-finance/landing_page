'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDemo } from '@/lib/demo/store';
import { formatNaira } from '@/lib/demo/format';
import { Button } from '@/components/ledger/Button';
import { SectionHead } from '@/components/ledger/SectionHead';

export default function ApplyPage() {
  const { state, dispatch, isHydrated } = useDemo();
  const router = useRouter();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!isHydrated) return;

    const status = state.financing?.status;

    if (status === 'SUBMITTED') {
      setIsAnimating(true);
      // Simulate underwriting delay (2 seconds)
      const timer = setTimeout(() => {
        dispatch({ type: 'RUN_UNDERWRITING' });
        setIsAnimating(false);
      }, 2000);
      return () => clearTimeout(timer);
    }

    if (status === 'APPROVED' || status === 'ACCEPTED' || status === 'FUNDING' || status === 'FUNDED' || status === 'DISBURSING' || status === 'ACTIVE' || status === 'COMPLETED') {
      // If already past underwriting and approved, go to offer or dashboard
      if (status === 'APPROVED') {
        router.push('/demo/borrower/offer');
      } else {
        router.push('/demo/borrower/dashboard');
      }
    }
  }, [state.financing?.status, isHydrated, dispatch, router]);

  if (!isHydrated) return null;

  const { invoice, guardian, student } = state;
  const status = state.financing?.status;

  if (status === 'DECLINED') {
    return (
      <div className="max-w-2xl mx-auto flex flex-col gap-8 animate-in fade-in duration-500">
        <h1 className="font-disp text-4xl">Application Declined</h1>
        <div className="p-6 border border-ink bg-paper-2 shadow-ticket">
          <p className="text-ink-soft mb-4">
            Unfortunately, we cannot approve this financing request at this time.
          </p>
          <div className="font-mono text-sm uppercase tracking-widest opacity-60 mb-1">Reason</div>
          <div className="font-semibold">{state.financing?.underwriting?.reason}</div>
        </div>
        <button 
          onClick={() => dispatch({ type: 'RESET' })}
          className="text-sm underline hover:text-green-ink self-start"
        >
          Reset Demo to try again
        </button>
      </div>
    );
  }

  if (status === 'SUBMITTED' || isAnimating) {
    return (
      <div className="max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[50vh] gap-8 animate-in fade-in duration-500">
        <div className="w-16 h-16 border-4 border-ink/20 border-t-ink rounded-full animate-spin" />
        <div className="flex flex-col items-center gap-2">
          <h2 className="font-disp text-2xl">Evaluating Application</h2>
          <p className="text-ink-soft text-center font-mono text-sm">
            Verifying income, credit profile, and affordability...
          </p>
        </div>
      </div>
    );
  }

  // Not started yet
  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-12 animate-in fade-in duration-500">
      
      <div className="flex flex-col gap-4">
        <h1 className="font-disp text-4xl md:text-5xl">Tuition Financing</h1>
        <p className="text-lg text-ink-soft">
          You are applying to finance tuition for {student.firstName} {student.lastName} at {state.institution.name}.
        </p>
      </div>

      <div className="border border-ink shadow-ticket bg-card flex flex-col">
        <SectionHead folio="APP·DETAILS" />
        
        <div className="p-6 md:p-8 flex flex-col gap-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">Invoice Amount</span>
              <span className="font-disp text-2xl">{formatNaira(invoice.amount)}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">Financing Term</span>
              <span className="font-disp text-2xl">4 Months</span>
            </div>
          </div>

          <div className="w-full h-px bg-ink/10" />

          <div className="flex flex-col gap-4">
            <h3 className="font-disp text-xl">Applicant Profile</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">Name</span>
                <span>{guardian.firstName} {guardian.lastName}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">Relationship</span>
                <span>{guardian.relationship}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">Monthly Income</span>
                <span>{formatNaira(guardian.monthlyIncome)}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">Linked BVN</span>
                <span className="font-mono">{guardian.bvn}</span>
              </div>
            </div>
          </div>

        </div>

        <div className="p-6 md:p-8 border-t border-ink/20 bg-paper-2 flex justify-end">
          <Button 
            onClick={() => dispatch({ type: 'START_APPLICATION' })}
            variant="primary"
          >
            Submit Application
          </Button>
        </div>
      </div>
      
    </div>
  );
}
