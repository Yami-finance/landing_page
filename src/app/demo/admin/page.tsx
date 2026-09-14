'use client';

import React from 'react';
import { useDemo } from '@/lib/demo/store';
import { formatNaira } from '@/lib/demo/format';
import { yamiTotalRevenue } from '@/lib/demo/calculations';

export default function AdminOverview() {
  const { state, isHydrated } = useDemo();

  if (!isHydrated) return null;

  const { financing } = state;
  
  let platformRevenue = 0;
  let activePrincipal = 0;
  
  if (financing) {
    platformRevenue = yamiTotalRevenue(financing);
    if (financing.status === 'ACTIVE' || financing.status === 'COMPLETED') {
      activePrincipal = financing.principal;
    }
  }

  return (
    <div className="flex flex-col gap-12 animate-in fade-in duration-500">
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 border border-rule-dark bg-ink flex flex-col gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-forest-muted">Network Principal Active</span>
          <span className="font-disp text-3xl text-paper">{formatNaira(activePrincipal)}</span>
        </div>
        <div className="p-6 border border-rule-dark bg-ink flex flex-col gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-forest-muted">Realized Revenue</span>
          <span className="font-disp text-3xl text-green">{formatNaira(platformRevenue)}</span>
        </div>
        <div className="p-6 border border-rule-dark bg-ink flex flex-col gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-forest-muted">System State</span>
          <span className="font-mono text-lg text-paper">Operational</span>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <h2 className="font-disp text-2xl text-paper">Global Event Stream</h2>
        
        <div className="flex flex-col border border-rule-dark bg-ink p-6 gap-4 h-[400px] overflow-y-auto font-mono text-xs">
          {state.events.length === 0 ? (
            <div className="text-forest-muted text-center mt-10">No events recorded.</div>
          ) : (
            [...state.events].reverse().map(event => (
              <div key={event.id} className="flex gap-4 border-b border-rule-dark/50 pb-2">
                <span className="text-forest-muted opacity-50 whitespace-nowrap">
                  {new Date(event.timestamp).toISOString().substring(11, 19)}
                </span>
                <span className={`w-16 ${event.type.includes('FAILED') ? 'text-red-400' : 'text-green'}`}>
                  {event.actor.toUpperCase()}
                </span>
                <span className="text-paper">{event.type}</span>
                <span className="text-forest-muted flex-1">{event.description}</span>
                <span className="text-forest-muted opacity-50">{event.financingId || '-'}</span>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}
