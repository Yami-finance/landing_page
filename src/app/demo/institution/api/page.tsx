'use client';

import React, { useState } from 'react';
import { useDemo } from '@/lib/demo/store';
import { SectionHead } from '@/components/ledger/SectionHead';

export default function ApiKeysPage() {
  const { state, isHydrated } = useDemo();
  const [revealed, setRevealed] = useState(false);

  if (!isHydrated) return null;

  return (
    <div className="flex flex-col gap-12 animate-in fade-in duration-500 max-w-3xl">
      
      <div className="flex flex-col gap-2">
        <h2 className="font-disp text-2xl">Developer Settings</h2>
        <p className="text-sm text-ink-soft">
          Manage API keys and webhook endpoints for the Yami integration.
        </p>
      </div>

      <div className="flex flex-col border border-ink shadow-ticket bg-card">
        <SectionHead folio="API·CONF" />
        
        <div className="p-6 md:p-8 flex flex-col gap-8">
          
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-widest text-ink-soft">Webhook URL</span>
            <div className="flex gap-2">
              <input 
                type="text" 
                readOnly 
                value={state.institution.webhookUrl} 
                className="flex-1 bg-ink/5 border border-ink/20 px-4 py-2 font-mono text-sm rounded-sm"
              />
            </div>
            <p className="text-xs text-ink-soft mt-1">Yami will send POST requests to this URL when payments are disbursed or failed.</p>
          </div>

          <div className="w-full h-px bg-ink/10" />

          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-widest text-ink-soft">Live API Key</span>
            <div className="flex gap-2">
              <input 
                type={revealed ? 'text' : 'password'} 
                readOnly 
                value={state.institution.apiKey} 
                className="flex-1 bg-ink/5 border border-ink/20 px-4 py-2 font-mono text-sm rounded-sm"
              />
              <button 
                onClick={() => setRevealed(!revealed)}
                className="px-4 py-2 border border-ink/20 hover:bg-ink/5 font-mono text-xs uppercase tracking-widest rounded-sm transition-colors"
              >
                {revealed ? 'Hide' : 'Reveal'}
              </button>
            </div>
            <p className="text-xs text-ink-soft mt-1">Use this key in the Authorization header: <code className="bg-ink/5 px-1 rounded-sm">Bearer {state.institution.apiKey.substring(0, 7)}...</code></p>
          </div>

        </div>
      </div>

    </div>
  );
}
