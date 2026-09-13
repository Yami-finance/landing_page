'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDemo } from '@/lib/demo/store';
import { calculateFinancingTerms } from '@/lib/demo/calculations';
import { FinancingSummary } from '@/components/demo/FinancingSummary';
import { Button } from '@/components/ledger/Button';

export default function OfferPage() {
  const { state, dispatch, isHydrated } = useDemo();
  const router = useRouter();

  useEffect(() => {
    if (!isHydrated) return;
    
    const status = state.financing?.status;
    if (!state.financing || status === 'DECLINED') {
      router.push('/demo/borrower/apply');
    } else if (status !== 'APPROVED') {
      // If past APPROVED, go to dashboard
      router.push('/demo/borrower/dashboard');
    }
  }, [state.financing, state.financing?.status, isHydrated, router]);

  if (!isHydrated || state.financing?.status !== 'APPROVED') return null;

  const terms = calculateFinancingTerms(state.financing.principal);

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-12 animate-in fade-in duration-500">
      
      <div className="flex flex-col gap-4">
        <h1 className="font-disp text-4xl md:text-5xl">Financing Offer</h1>
        <p className="text-lg text-ink-soft">
          Your application has been approved. Please review the repayment schedule and terms below.
        </p>
      </div>

      <FinancingSummary terms={terms} />

      <div className="flex flex-col gap-6 p-6 border border-ink/20 bg-card">
        <h3 className="font-disp text-xl">Agreement</h3>
        <p className="text-sm text-ink-soft leading-relaxed">
          By accepting this offer, your request will be placed in the Yami marketplace for funding by a sponsor. 
          Once funded, the principal amount will be disbursed directly to {state.institution.name}. 
          You agree to make {terms.termMonths} equal monthly installments of {terms.monthlyInstallment.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Button 
            onClick={() => dispatch({ type: 'ACCEPT_OFFER' })}
            variant="primary"
          >
            Accept Offer & Find Sponsor
          </Button>
          <Button 
            onClick={() => dispatch({ type: 'CANCEL_FINANCING' })}
            variant="ghost"
          >
            Decline
          </Button>
        </div>
      </div>
      
    </div>
  );
}
