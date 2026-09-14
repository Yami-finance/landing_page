'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';

export default function DemoSignupPage() {
  const [role, setRole] = useState('BORROWER');
  const router = useRouter();

  return (
    <div className="min-h-screen bg-paper flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md flex flex-col gap-8">
        <div className="flex justify-center">
          <Logo href="/demo" />
        </div>
        
        <div className="border border-ink shadow-ticket bg-paper p-8 flex flex-col gap-6">
          <div>
            <h1 className="font-disp text-2xl text-ink">Create Yami Account</h1>
            <p className="text-sm text-ink-soft mt-1">Join the educational financing network.</p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs uppercase tracking-widest text-ink">I am a...</label>
              <select 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full border border-ink p-3 bg-paper font-mono text-sm focus:outline-none focus:ring-2 focus:ring-green"
              >
                <option value="BORROWER">Guardian / Borrower</option>
                <option value="SPONSOR">Sponsor / Investor</option>
                <option value="INSTITUTION">Institution Admin</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs uppercase tracking-widest text-ink">Email Address</label>
              <input 
                type="email" 
                placeholder="you@example.com"
                className="w-full border border-ink p-3 bg-paper font-mono text-sm focus:outline-none focus:ring-2 focus:ring-green placeholder:text-ink-soft/50"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-2">
            <button 
              className="w-full bg-green text-ink font-mono text-sm uppercase tracking-widest py-4 hover:bg-[#c9f000] transition-colors"
              onClick={() => router.push(`/demo/auth/onboarding?role=${role}`)}
            >
              Continue to KYC
            </button>
            <p className="text-xs text-center text-ink-soft">
              Already have an account? <Link href="/demo/auth/login" className="underline">Sign in</Link>
            </p>
          </div>
        </div>

        <div className="p-4 border border-blue-400 bg-blue-50 text-blue-900 text-sm font-mono flex gap-3 shadow-ticket">
          <span className="font-bold shrink-0">DEMO NOTE:</span>
          <p>
            You do not need to create a new account to test the platform. 
            Use the <strong>ACTOR</strong> dropdown in the top right corner to instantly jump into seeded accounts.
          </p>
        </div>
      </div>
    </div>
  );
}
