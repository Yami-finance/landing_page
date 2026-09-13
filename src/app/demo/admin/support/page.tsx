'use client';

import React from 'react';
import { useDemo } from '@/lib/demo/store';
import { formatDateTime } from '@/lib/demo/format';

export default function AdminSupportPage() {
  const { state, dispatch, isHydrated } = useDemo();

  if (!isHydrated) return null;

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      
      <div className="flex flex-col gap-2">
        <h2 className="font-disp text-2xl text-paper">Support Tickets & Complaints</h2>
        <p className="text-sm text-forest-muted">
          Manage user complaints and escalation flows.
        </p>
      </div>

      {state.complaints.length === 0 ? (
        <div className="p-8 border border-rule-dark border-dashed bg-ink text-center text-forest-muted">
          No active support tickets.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {[...state.complaints].reverse().map(complaint => {
            const actor = state.accounts[complaint.actorId];
            return (
              <div key={complaint.id} className="flex flex-col border border-rule-dark bg-ink shadow-ticket">
                <div className="p-4 border-b border-rule-dark flex justify-between items-start">
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-sm text-paper">{complaint.category}</span>
                    <span className="text-xs text-forest-muted">Ticket {complaint.id} • {actor?.name || complaint.actorId} • {formatDateTime(complaint.createdAt)}</span>
                  </div>
                  <span className={`px-2 py-1 font-mono text-[10px] uppercase tracking-widest border rounded-sm ${
                    complaint.status === 'RESOLVED' ? 'border-green text-green' : 'border-blue-400 text-blue-400'
                  }`}>
                    {complaint.status.replace(/_/g, ' ')}
                  </span>
                </div>
                <div className="p-4 text-sm text-paper">
                  {complaint.description}
                </div>
                
                {complaint.status !== 'RESOLVED' && (
                  <div className="p-4 bg-forest border-t border-rule-dark flex gap-4 items-center">
                    <button 
                      onClick={() => dispatch({ type: 'RESOLVE_COMPLAINT', complaintId: complaint.id, resolution: 'Issue investigated and resolved by Yami Ops.' })} // we haven't added action yet, let's fix that
                      className="px-4 py-2 border border-rule-dark hover:bg-ink text-paper font-mono text-xs uppercase tracking-widest transition-colors"
                    >
                      Mark Resolved
                    </button>
                    <span className="text-xs text-forest-muted italic">In a real app, an operator would type a response here.</span>
                  </div>
                )}
                {complaint.resolution && (
                  <div className="p-4 bg-ink/50 border-t border-rule-dark">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-forest-muted block mb-2">Resolution Note</span>
                    <p className="text-sm text-green">{complaint.resolution}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
