'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Logo } from '@/components/brand/Logo';
import { useDemo } from '@/lib/demo/store';

function OnboardingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { dispatch, isHydrated } = useDemo();
  const [step, setStep] = useState(1);
  const [isVerifying, setIsVerifying] = useState(false);

  const role = searchParams?.get('role') || 'BORROWER';

  if (!isHydrated) return null;

  const handleNext = () => setStep(step + 1);

  const handleComplete = () => {
    setIsVerifying(true);
    setTimeout(() => {
      // Route to appropriate seeded account for demo purposes
      if (role === 'BORROWER') {
        dispatch({ type: 'SWITCH_ACTOR', accountId: 'GUA-20491' });
        router.push('/demo/borrower/apply');
      } else if (role === 'SPONSOR') {
        dispatch({ type: 'SWITCH_ACTOR', accountId: 'SPO-99210' });
        router.push('/demo/sponsor');
      } else {
        dispatch({ type: 'SWITCH_ACTOR', accountId: 'INST-DEMO' });
        router.push('/demo/institution');
      }
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-paper flex flex-col items-center p-4 pt-12 animate-in fade-in duration-500">
      <div className="w-full max-w-2xl flex flex-col gap-8">
        
        <div className="flex flex-col gap-6">
          <Logo href="/demo" />
          <div className="flex justify-between items-center border-b border-ink/10 pb-4">
            <h1 className="font-disp text-2xl text-ink">
              {role === 'INSTITUTION' ? 'Institution Setup' : 'Complete Your Profile'}
            </h1>
            <span className="font-mono text-xs uppercase tracking-widest text-ink-soft">
              Step {step} of 3
            </span>
          </div>
        </div>

        {isVerifying ? (
          <div className="p-12 border border-ink shadow-ticket bg-paper flex flex-col items-center justify-center gap-6">
            <div className="w-12 h-12 border-4 border-ink/20 border-t-green rounded-full animate-spin" />
            <div className="flex flex-col gap-2 text-center">
              <h3 className="font-disp text-2xl">Verifying Information</h3>
              <p className="text-sm text-ink-soft">Running automated KYC and anti-fraud checks...</p>
            </div>
          </div>
        ) : (
          <div className="border border-ink shadow-ticket bg-paper p-8 flex flex-col gap-8">
            
            {/* STEP 1: Basic Information */}
            {step === 1 && (
              <div className="flex flex-col gap-6 animate-in slide-in-from-right-4 duration-300">
                <div className="flex flex-col gap-1">
                  <h2 className="font-mono text-sm uppercase tracking-widest text-ink font-bold">Personal Details</h2>
                  <p className="text-sm text-ink-soft">We need some basic information to get started.</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-xs uppercase tracking-widest text-ink">First Name</label>
                    <input type="text" className="border border-ink p-3 bg-paper font-mono text-sm focus:outline-none focus:ring-2 focus:ring-green" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-xs uppercase tracking-widest text-ink">Last Name</label>
                    <input type="text" className="border border-ink p-3 bg-paper font-mono text-sm focus:outline-none focus:ring-2 focus:ring-green" />
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-xs uppercase tracking-widest text-ink">Phone Number</label>
                  <input type="tel" className="border border-ink p-3 bg-paper font-mono text-sm focus:outline-none focus:ring-2 focus:ring-green" />
                </div>

                <div className="flex justify-end pt-4">
                  <button onClick={handleNext} className="bg-ink text-paper font-mono text-xs uppercase tracking-widest px-8 py-3 hover:bg-ink/90">
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: KYC & Identity */}
            {step === 2 && (
              <div className="flex flex-col gap-6 animate-in slide-in-from-right-4 duration-300">
                <div className="flex flex-col gap-1">
                  <h2 className="font-mono text-sm uppercase tracking-widest text-ink font-bold">Identity Verification (KYC)</h2>
                  <p className="text-sm text-ink-soft">
                    {role === 'INSTITUTION' 
                      ? 'Please provide your institutional registration details.' 
                      : 'Please provide your Bank Verification Number (BVN) to verify your identity.'}
                  </p>
                </div>
                
                {role === 'INSTITUTION' ? (
                  <>
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-xs uppercase tracking-widest text-ink">Institution Name</label>
                      <input type="text" className="border border-ink p-3 bg-paper font-mono text-sm focus:outline-none focus:ring-2 focus:ring-green" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-xs uppercase tracking-widest text-ink">RC Number / Registration ID</label>
                      <input type="text" className="border border-ink p-3 bg-paper font-mono text-sm focus:outline-none focus:ring-2 focus:ring-green" />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-xs uppercase tracking-widest text-ink">Bank Verification Number (BVN)</label>
                      <input type="text" maxLength={11} className="border border-ink p-3 bg-paper font-mono text-sm focus:outline-none focus:ring-2 focus:ring-green tracking-widest" placeholder="00000000000" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-xs uppercase tracking-widest text-ink">Date of Birth</label>
                      <input type="date" className="border border-ink p-3 bg-paper font-mono text-sm focus:outline-none focus:ring-2 focus:ring-green" />
                    </div>
                  </>
                )}

                <div className="flex justify-between pt-4">
                  <button onClick={() => setStep(1)} className="border border-ink text-ink font-mono text-xs uppercase tracking-widest px-8 py-3 hover:bg-ink/5">
                    Back
                  </button>
                  <button onClick={handleNext} className="bg-ink text-paper font-mono text-xs uppercase tracking-widest px-8 py-3 hover:bg-ink/90">
                    Verify Identity
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Financial Setup */}
            {step === 3 && (
              <div className="flex flex-col gap-6 animate-in slide-in-from-right-4 duration-300">
                <div className="flex flex-col gap-1">
                  <h2 className="font-mono text-sm uppercase tracking-widest text-ink font-bold">
                    {role === 'INSTITUTION' ? 'Settlement Account' : 'Financial Profile'}
                  </h2>
                  <p className="text-sm text-ink-soft">
                    {role === 'INSTITUTION' ? 'Where should we disburse settled tuition funds?' : 'Link your bank account for transactions.'}
                  </p>
                </div>
                
                <div className="flex flex-col gap-4 p-4 border border-ink/20 bg-ink/5 rounded-sm">
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-xs uppercase tracking-widest text-ink">Bank Name</label>
                    <select className="border border-ink p-3 bg-paper font-mono text-sm focus:outline-none focus:ring-2 focus:ring-green">
                      <option>Guaranty Trust Bank (GTB)</option>
                      <option>Zenith Bank</option>
                      <option>Access Bank</option>
                      <option>First Bank of Nigeria</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-xs uppercase tracking-widest text-ink">Account Number</label>
                    <input type="text" maxLength={10} className="border border-ink p-3 bg-paper font-mono text-sm focus:outline-none focus:ring-2 focus:ring-green tracking-widest" placeholder="0000000000" />
                  </div>
                </div>

                {role === 'SPONSOR' && (
                  <div className="flex flex-col gap-2 mt-2">
                    <label className="font-mono text-xs uppercase tracking-widest text-ink">Source of Funds Declaration</label>
                    <select className="border border-ink p-3 bg-paper font-mono text-sm focus:outline-none focus:ring-2 focus:ring-green">
                      <option>Personal Savings</option>
                      <option>Business Revenue</option>
                      <option>Investment Returns</option>
                    </select>
                  </div>
                )}

                <div className="flex justify-between pt-4">
                  <button onClick={() => setStep(2)} className="border border-ink text-ink font-mono text-xs uppercase tracking-widest px-8 py-3 hover:bg-ink/5">
                    Back
                  </button>
                  <button onClick={handleComplete} className="bg-green text-ink font-mono text-xs uppercase tracking-widest px-8 py-3 hover:bg-[#c9f000] transition-colors">
                    Complete Setup
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}


export default function OnboardingFlow() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-paper flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 border-4 border-ink/20 border-t-green rounded-full animate-spin" />
      </div>
    }>
      <OnboardingContent />
    </Suspense>
  );
}
