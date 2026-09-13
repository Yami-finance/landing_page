import React from 'react';
import type { DemoEvent } from '@/lib/demo/types';
import { formatDateTime } from '@/lib/demo/format';
import { SectionHead } from '@/components/ledger/SectionHead';

interface Props {
  events: DemoEvent[];
  financingId?: string;
  dark?: boolean;
}

export function FinancingTimeline({ events, financingId, dark = false }: Props) {
  // Filter events for this financing, or show all if no ID provided
  const timelineEvents = financingId 
    ? events.filter(e => e.financingId === financingId)
    : events;

  if (timelineEvents.length === 0) return null;

  // Sort descending (newest first)
  const sorted = [...timelineEvents].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className={`flex flex-col border border-ink/20 ${dark ? 'bg-forest' : 'bg-paper'}`}>
      <SectionHead folio="LOG·EVENTS" dark={dark} />
      
      <div className="flex flex-col p-6 gap-6 relative">
        {/* Vertical line connecting events */}
        <div className="absolute left-[39px] top-8 bottom-8 w-px bg-ink/10" />

        {sorted.map((event) => {
          const isError = event.type.includes('FAILED') || event.type.includes('DECLINED') || event.type.includes('DEFAULTED');
          const isSuccess = event.type.includes('SUCCEEDED') || event.type.includes('COMPLETED') || event.type.includes('APPROVED');
          
          return (
            <div key={event.id} className="flex gap-4 relative z-10">
              {/* Timeline Dot */}
              <div className={`
                w-4 h-4 rounded-full mt-1 border-[2px] flex-shrink-0 bg-paper
                ${dark ? 'border-paper' : 'border-ink'}
                ${isError ? 'border-red-500 bg-red-500' : ''}
                ${isSuccess ? 'border-green bg-green' : ''}
              `} />
              
              <div className="flex flex-col gap-1">
                <span className={`text-sm font-semibold ${dark ? 'text-paper' : 'text-ink'}`}>
                  {event.description}
                </span>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] uppercase opacity-60">
                    {formatDateTime(event.timestamp)}
                  </span>
                  <span className="font-mono text-[10px] uppercase opacity-60 border border-ink/20 px-1 rounded-sm">
                    {event.actor}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
