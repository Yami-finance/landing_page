'use client';

import React from 'react';
import { useDemo } from '@/lib/demo/store';
import { deriveInvoiceStatus, deriveClearanceStatus } from '@/lib/demo/types';

export default function StudentsPage() {
  const { state, isHydrated } = useDemo();

  if (!isHydrated) return null;

  const { student } = state;
  const clearance = deriveClearanceStatus(deriveInvoiceStatus(state.financing));

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      
      <div className="flex flex-col gap-2">
        <h2 className="font-disp text-2xl">Enrolled Students</h2>
        <p className="text-sm text-ink-soft">
          Manage student financial clearance and records.
        </p>
      </div>

      <div className="flex flex-col border border-ink shadow-ticket bg-card overflow-x-auto">
        <table className="w-full text-left whitespace-nowrap">
          <thead>
            <tr className="font-mono text-[10px] uppercase tracking-widest text-ink-soft border-b border-ink/20 bg-ink/5">
              <th className="p-4 font-normal">Matric No</th>
              <th className="p-4 font-normal">Name</th>
              <th className="p-4 font-normal">Programme</th>
              <th className="p-4 font-normal">Level</th>
              <th className="p-4 font-normal">Clearance Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-ink/10 last:border-0 hover:bg-ink/5 transition-colors">
              <td className="p-4 font-mono text-xs">{student.matricNumber}</td>
              <td className="p-4 text-sm font-semibold">{student.lastName}, {student.firstName}</td>
              <td className="p-4 text-sm">{student.programme}</td>
              <td className="p-4 text-sm">{student.level}</td>
              <td className="p-4">
                <span className={`px-2 py-1 text-[10px] font-mono uppercase tracking-widest rounded-sm ${
                  clearance === 'CLEARED' ? 'border border-ink text-ink font-bold' : 'bg-red-100 text-red-900 border border-red-200'
                }`}>
                  {clearance}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}
