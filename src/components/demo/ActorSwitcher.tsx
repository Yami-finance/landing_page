'use client';

import React from 'react';
import { useDemo } from '@/lib/demo/store';
import { useRouter } from 'next/navigation';


export function ActorSwitcher() {
  const { state, dispatch, isHydrated } = useDemo();
  const router = useRouter();

  if (!isHydrated) return null;

  const accounts = Object.values(state.accounts || {});


  return (
    <div className="fixed top-4 right-4 z-50 font-mono text-xs flex items-center gap-2">
      <span className="text-ink-soft bg-paper/80 px-2 py-1 backdrop-blur-sm rounded-sm">ACTOR:</span>
      <select 
        className="bg-paper border border-ink shadow-ticket px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green cursor-pointer"
        value={state.activeAccountId || ''}
        onChange={(e) => {
          const val = e.target.value;
          dispatch({ type: 'SWITCH_ACTOR', accountId: val });
          if (!val) {
            router.push('/demo/auth/login');
          }
        }}
      >
        <option value="">-- Signed Out --</option>
        {accounts.map(account => (
          <option key={account.id} value={account.id}>
            {account.name} ({account.role})
          </option>
        ))}
      </select>
      {state.activeAccountId && (
        <button 
          onClick={() => {
            dispatch({ type: 'SWITCH_ACTOR', accountId: '' });
            router.push('/demo/auth/login');
          }}
          className="bg-red-50 text-red-600 border border-red-200 shadow-ticket px-3 py-1.5 hover:bg-red-100 transition-colors"
        >
          Sign Out
        </button>
      )}
    </div>
  );
}
