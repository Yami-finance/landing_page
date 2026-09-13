'use client';

import React from 'react';
import { useDemo } from '@/lib/demo/store';
import { WebhookEvent } from '@/components/demo/WebhookEvent';

export default function AdminWebhooksPage() {
  const { state, dispatch, isHydrated } = useDemo();

  if (!isHydrated) return null;

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      
      <div className="flex flex-col gap-2">
        <h2 className="font-disp text-2xl text-paper">Webhook Operations</h2>
        <p className="text-sm text-forest-muted">
          Global webhook delivery queue and dead-letter queue. Operators can manually trigger retries here.
        </p>
      </div>

      {state.webhooks.length === 0 ? (
        <div className="p-8 border border-rule-dark border-dashed bg-ink text-center text-forest-muted">
          No webhooks in system.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {[...state.webhooks].reverse().map(webhook => (
            <WebhookEvent 
              key={webhook.id} 
              webhook={webhook}
              onRetry={(id) => {
                dispatch({ type: 'RETRY_WEBHOOK', webhookId: id });
                // Simulate delay then attempt delivery again
                setTimeout(() => {
                  dispatch({ type: 'DELIVER_WEBHOOK', webhookId: id });
                }, 1500);
              }}
              dark={true}
            />
          ))}
        </div>
      )}

    </div>
  );
}
