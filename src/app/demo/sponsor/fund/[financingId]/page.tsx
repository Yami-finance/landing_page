'use client';

import React, { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { useDemo } from '@/lib/demo/store';
import { calculateFinancingTerms } from '@/lib/demo/calculations';
import { FinancingSummary } from '@/components/demo/FinancingSummary';
import { Button } from '@/components/ledger/Button';

export default function FundPage({ params }: { params: Promise<{ financingId: string }> }) {
  const resolvedParams = use(params);
  const { state, dispatch, isHydrated } = useDemo();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const financing = state.financing;

  useEffect(() => {
    if (!isHydrated) return;
    
    // If we're FUNDING (delay), set processing
    if (financing?.status === 'FUNDING') {
      setIsProcessing(true);
    }

    // If we passed FUNDED successfully, redirect to portfolio
    if (financing && ['FUNDED', 'DISBURSING', 'ACTIVE', 'COMPLETED'].includes(financing.status)) {
      router.push('/demo/sponsor/portfolio');
    }
  }, [financing, financing?.status, isHydrated, router]);

  if (!isHydrated || !financing || financing.id !== resolvedParams.financingId) {
    return <div className="p-8 text-center text-ink-soft">Financing not found or no longer available.</div>;
  }

  // If funding failed, we revert to ACCEPTED. We can check funding.status to show an error.
  const hasFailedAttempt = financing.status === 'ACCEPTED' && financing.funding?.status === 'FAILED';

  const terms = calculateFinancingTerms(financing.principal);
  const canAfford = state.sponsor.walletBalance >= financing.principal;

  const handleFund = () => {
    setIsProcessing(true);
    // Simulate payment processing delay
    setTimeout(() => {
      dispatch({ type: 'FUND_FINANCING' });
      setIsProcessing(false);
    }, 1500);
  };

  if (isProcessing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-8 animate-in fade-in duration-500">
        <div className="w-16 h-16 border-4 border-ink/20 border-t-green rounded-full animate-spin" />
        <div className="flex flex-col items-center gap-2">
          <h2 className="font-disp text-2xl">Processing Payment</h2>
          <p className="text-ink-soft text-center font-mono text-sm">
            Transferring funds from your wallet to Yami Escrow...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      
      <div className="flex flex-col gap-2">
        <Link href="/demo/sponsor" className="text-xs font-mono uppercase tracking-widest text-ink-soft hover:text-ink mb-4">
          ← Back to Marketplace
        </Link>
        <h2 className="font-disp text-3xl">Fund Opportunity</h2>
      </div>

      {hasFailedAttempt && (
        <div className="bg-red-50 text-red-900 border border-red-200 p-4 rounded-sm text-sm">
          <strong>Funding Failed.</strong> The simulated payment could not be processed. Please try again.
        </div>
      )}

      {!canAfford && (
        <div className="bg-red-50 text-red-900 border border-red-200 p-4 rounded-sm text-sm">
          <strong>Insufficient Funds.</strong> Your wallet balance is less than the required principal amount.
        </div>
      )}

      <FinancingSummary terms={terms} />

      <div className="flex flex-col gap-4 p-6 bg-paper-2 border border-ink/20 shadow-ticket">
        <p className="text-sm text-ink-soft">
          By funding this opportunity, <strong>{terms.principal.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</strong> will be deducted from your wallet balance.
          You will receive a total return of <strong>{terms.totalRepayment.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</strong> over {terms.termMonths} months.
        </p>
        
        <div className="mt-4 flex justify-end">
          <Button 
            onClick={handleFund}
            variant="primary"
            disabled={!canAfford}
          >
            Confirm & Fund
          </Button>
        </div>
      </div>

    </div>
  );
}
import Link from 'next/link';
