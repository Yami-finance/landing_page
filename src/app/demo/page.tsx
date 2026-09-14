'use client';

import React from 'react';
import Link from 'next/link';
import { SectionHead } from '@/components/ledger/SectionHead';
import { Button } from '@/components/ledger/Button';

export default function DemoHubPage() {
  return (
    <div className="flex flex-col gap-16 animate-in fade-in duration-500">
      
      <div className="flex flex-col gap-6 max-w-2xl">
        <h1 className="font-disp text-4xl md:text-5xl leading-tight">
          Yami Interactive Demo
        </h1>
        <p className="text-lg text-ink-soft leading-relaxed">
          Welcome to the interactive prototype of the Yami Educational BNPL network. 
          This demo simulates the end-to-end lifecycle of a tuition financing agreement 
          across four distinct portals, all reading from a single shared state.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        <SectionHead folio="01 · The Narrative" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div className="border border-ink/20 p-6 flex flex-col gap-4 bg-card shadow-ticket">
            <h3 className="font-disp text-xl">The Start</h3>
            <p className="text-sm text-ink-soft">
              Mr. Babatunde Adebayo needs to pay ₦2,000,000 in tuition for his son Tunde at Demo University. 
              Instead of paying upfront, he uses the &quot;Pay with Yami&quot; integration on the university fee portal.
            </p>
            <div className="mt-auto pt-4">
              <Button href="/demo/portal/university" variant="primary">
                Start at University Portal
              </Button>
            </div>
          </div>

          <div className="border border-ink/20 p-6 flex flex-col gap-4 bg-card shadow-ticket">
            <h3 className="font-disp text-xl">The Ecosystem</h3>
            <p className="text-sm text-ink-soft">
              Once an application is approved and listed, you can explore the other sides of the network 
              simultaneously by opening them in different tabs.
            </p>
            <div className="flex flex-col gap-2 mt-auto pt-4">
              <Link href="/demo/sponsor" className="text-sm underline hover:text-green-ink">Open Sponsor Marketplace</Link>
              <Link href="/demo/institution" className="text-sm underline hover:text-green-ink">Open Institution Dashboard</Link>
              <Link href="/demo/admin" className="text-sm underline hover:text-green-ink">Open Admin Ledger</Link>
            </div>
          </div>
          
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <SectionHead folio="02 · How to use" />
        <div className="max-w-2xl text-ink-soft space-y-4 text-sm leading-relaxed">
          <p>
            <strong>Cross-tab sync:</strong> The demo state is shared. Open the Sponsor portal in one window and the Admin portal in another. When the Sponsor funds a loan, the Admin ledger will update instantly.
          </p>
          <p>
            <strong>Operator Controls:</strong> Click the gear icon in the bottom right to open the controls. You can reset the demo to its initial state or trigger failure simulations (e.g., failed webhook delivery or failed funding) to see how the state machines recover.
          </p>
        </div>
      </div>

    </div>
  );
}
