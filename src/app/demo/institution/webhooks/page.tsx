'use client';

import React from 'react';
import { useDemo } from '@/lib/demo/store';
import { WebhookEvent } from '@/components/demo/WebhookEvent';

export default function WebhooksPage() {
  const { state, isHydrated } = useDemo();

  if (!isHydrated) return null;

  const { webhooks } = state;
  // In a real app we'd filter by institutionId. Here all webhooks are for the university.

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      
      <div className="flex flex-col gap-2">
        <h2 className="font-disp text-2xl">Webhook Deliveries</h2>
        <p className="text-sm text-ink-soft">
          Log of server-to-server notifications sent to {state.institution.webhookUrl}
        </p>
      </div>

      {webhooks.length === 0 ? (
        <div className="p-8 border border-ink/20 border-dashed text-center text-ink-soft">
          No webhooks have been triggered yet.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {[...webhooks].reverse().map(webhook => (
            <WebhookEvent 
              key={webhook.id} 
              webhook={webhook}
              // The retry action is theoretically an operator/admin action, but we expose it here for the demo
            />
          ))}
        </div>
      )}

    </div>
  );
}
