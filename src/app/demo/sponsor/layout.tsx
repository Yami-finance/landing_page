'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDemo } from '@/lib/demo/store';
import { formatNaira } from '@/lib/demo/format';

export default function SponsorLayout({ children }: { children: React.ReactNode }) {
  const { state, isHydrated } = useDemo();
  const pathname = usePathname();

  if (!isHydrated) return null;

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-8 animate-in fade-in duration-500">
      
      {/* Sponsor Header & Wallet */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-ink/20 pb-8">
        <div className="flex flex-col gap-2">
          <h1 className="font-disp text-4xl">Sponsor Portal</h1>
          <p className="text-ink-soft">Welcome back, {state.sponsor.firstName}</p>
        </div>
        
        <div className="flex flex-col gap-1 text-left md:text-right bg-ink text-paper p-4 rounded-sm shadow-ticket">
          <span className="font-mono text-[10px] uppercase tracking-widest opacity-80">Available Wallet Balance</span>
          <span className="font-disp text-3xl text-green">{formatNaira(state.sponsor.walletBalance)}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-ink/20 font-mono text-sm uppercase tracking-widest">
        <Link 
          href="/demo/sponsor"
          className={`px-6 py-3 transition-colors border-b-2 ${pathname === '/demo/sponsor' || pathname.includes('/fund/') ? 'border-ink text-ink font-bold' : 'border-transparent text-ink-soft hover:text-ink hover:bg-ink/5'}`}
        >
          Marketplace
        </Link>
        <Link 
          href="/demo/sponsor/portfolio"
          className={`px-6 py-3 transition-colors border-b-2 ${pathname === '/demo/sponsor/portfolio' ? 'border-ink text-ink font-bold' : 'border-transparent text-ink-soft hover:text-ink hover:bg-ink/5'}`}
        >
          Portfolio
        </Link>
      </div>

      {/* Tab Content */}
      <div className="py-4">
        {children}
      </div>

    </div>
  );
}
