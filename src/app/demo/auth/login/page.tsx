'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';
import { useDemo } from '@/lib/demo/store';
import { useRouter } from 'next/navigation';

export default function DemoLoginPage() {
  const { dispatch, isHydrated } = useDemo();
  const router = useRouter();

  if (!isHydrated) return null;

  return (
    <div className="min-h-screen bg-paper flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md flex flex-col gap-8">
        <div className="flex justify-center">
          <Logo href="/demo" />
        </div>
        
        <div className="border border-ink shadow-ticket bg-paper p-8 flex flex-col gap-6">
          <div>
            <h1 className="font-disp text-2xl text-ink">Sign In to Yami</h1>
            <p className="text-sm text-ink-soft mt-1">Welcome back to the network.</p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs uppercase tracking-widest text-ink">Email Address</label>
              <input 
                type="email" 
                defaultValue="babatunde.a@example.com"
                className="w-full border border-ink p-3 bg-paper font-mono text-sm focus:outline-none focus:ring-2 focus:ring-green placeholder:text-ink-soft/50"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs uppercase tracking-widest text-ink">Password</label>
              <input 
                type="password" 
                defaultValue="••••••••"
                className="w-full border border-ink p-3 bg-paper font-mono text-sm focus:outline-none focus:ring-2 focus:ring-green placeholder:text-ink-soft/50"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-2">
            <button 
              className="w-full bg-ink text-paper font-mono text-sm uppercase tracking-widest py-4 hover:bg-ink/90 transition-colors"
              onClick={() => {
                dispatch({ type: 'SWITCH_ACTOR', accountId: 'GUA-20491' });
                router.push('/demo/borrower/dashboard');
              }}
            >
              Sign In
            </button>
            <p className="text-xs text-center text-ink-soft">
              Don&apos;t have an account? <Link href="/demo/auth/signup" className="underline">Create one</Link>
            </p>
          </div>
        </div>

        <div className="p-4 border border-blue-400 bg-blue-50 text-blue-900 text-sm font-mono flex gap-3 shadow-ticket">
          <span className="font-bold shrink-0">DEMO NOTE:</span>
          <p>
            You can bypass this screen entirely by using the <strong>ACTOR</strong> dropdown in the top right corner.
          </p>
        </div>
      </div>
    </div>
  );
}
