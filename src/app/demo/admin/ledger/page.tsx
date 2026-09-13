'use client';

import React from 'react';
import { useDemo } from '@/lib/demo/store';
import { LedgerTable } from '@/components/demo/LedgerTable';

export default function GlobalLedgerPage() {
  const { state, isHydrated } = useDemo();

  if (!isHydrated) return null;

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      
      <div className="flex flex-col gap-2">
        <h2 className="font-disp text-2xl text-paper">Double-Entry Ledger</h2>
        <p className="text-sm text-forest-muted">
          Immutable append-only global ledger tracking all value movement across the network.
        </p>
      </div>

      <LedgerTable entries={state.ledger} dark={true} />

    </div>
  );
}
