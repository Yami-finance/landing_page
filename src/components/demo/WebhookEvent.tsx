import React, { useState } from 'react';
import type { WebhookEvent as WebhookEventType } from '@/lib/demo/types';
import { formatDateTime } from '@/lib/demo/format';
import { GenericStatusStamp } from './StatusStamp';

interface Props {
  webhook: WebhookEventType;
  onRetry?: (id: number) => void;
  dark?: boolean;
}

export function WebhookEvent({ webhook, onRetry, dark = false }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`flex flex-col border border-ink/20 ${dark ? 'bg-forest' : 'bg-paper'} shadow-sm`}>
      
      {/* Header Row */}
      <div 
        className={`p-4 flex items-center justify-between cursor-pointer hover:bg-ink/5 transition-colors`}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-4">
          <GenericStatusStamp status={webhook.status} />
          <div className="flex flex-col gap-1">
            <span className="font-mono text-sm font-bold">{webhook.type}</span>
            <span className="font-mono text-[10px] uppercase opacity-60">
              {formatDateTime(webhook.createdAt)}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="font-mono text-[10px] uppercase opacity-60">
            {webhook.attempts} {webhook.attempts === 1 ? 'Attempt' : 'Attempts'}
          </span>
          <span className="font-mono text-xs opacity-60">
            {expanded ? '[-]' : '[+]'}
          </span>
        </div>
      </div>

      {/* Expanded Content */}
      {expanded && (
        <div className={`p-4 border-t ${dark ? 'border-rule-dark' : 'border-rule'} bg-ink/5 flex flex-col gap-4`}>
          
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[10px] uppercase tracking-widest opacity-60">Endpoint URL</span>
            <span className="font-mono text-xs break-all">{webhook.url}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-mono text-[10px] uppercase tracking-widest opacity-60">Payload</span>
            <pre className={`p-3 rounded-sm font-mono text-[11px] overflow-x-auto ${dark ? 'bg-ink text-forest-text' : 'bg-white border border-ink/10'}`}>
              {JSON.stringify(webhook.payload, null, 2)}
            </pre>
          </div>

          {(webhook.status === 'FAILED' || webhook.status === 'RETRYING') && onRetry && (
            <div className="mt-2 flex justify-end">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRetry(webhook.id);
                }}
                disabled={webhook.status === 'RETRYING'}
                className="px-4 py-2 bg-ink text-paper text-xs font-mono uppercase tracking-widest rounded-sm hover:-translate-y-px transition-transform disabled:opacity-50 disabled:hover:translate-y-0"
              >
                {webhook.status === 'RETRYING' ? 'Retrying...' : 'Retry Delivery'}
              </button>
            </div>
          )}
          
        </div>
      )}
      
    </div>
  );
}
