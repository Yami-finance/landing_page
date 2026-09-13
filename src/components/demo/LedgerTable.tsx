import React from 'react';
import type { LedgerEntry } from '@/lib/demo/types';
import { formatNaira, formatDateTime } from '@/lib/demo/format';

interface Props {
  entries: LedgerEntry[];
  dark?: boolean;
}

export function LedgerTable({ entries, dark = false }: Props) {
  if (entries.length === 0) {
    return (
      <div className={`p-8 border ${dark ? 'border-rule-dark bg-forest' : 'border-ink/20 bg-ink/5'} border-dashed text-center opacity-60 text-sm font-mono`}>
        No ledger entries found.
      </div>
    );
  }

  // Sort descending
  const sorted = [...entries].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <div className={`flex flex-col border overflow-x-auto ${dark ? 'border-rule-dark bg-forest text-paper' : 'border-ink shadow-ticket bg-card text-ink'}`}>
      <table className="w-full text-left whitespace-nowrap">
        <thead>
          <tr className={`font-mono text-[10px] uppercase tracking-widest border-b ${dark ? 'border-rule-dark bg-ink text-forest-text' : 'border-ink/20 bg-ink/5 text-ink-soft'}`}>
            <th className="p-4 font-normal">ID / Time</th>
            <th className="p-4 font-normal">Type</th>
            <th className="p-4 font-normal">Debit (Dr)</th>
            <th className="p-4 font-normal">Credit (Cr)</th>
            <th className="p-4 font-normal text-right">Amount</th>
            <th className="p-4 font-normal">Ref</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map(entry => (
            <tr key={entry.id} className={`border-b last:border-0 transition-colors ${dark ? 'border-rule-dark hover:bg-ink' : 'border-ink/10 hover:bg-ink/5'}`}>
              <td className="p-4 flex flex-col gap-1">
                <span className="font-mono text-xs font-bold">LGR-{entry.id}</span>
                <span className="font-mono text-[10px] opacity-60">{formatDateTime(entry.timestamp)}</span>
              </td>
              <td className="p-4">
                <span className={`px-2 py-1 text-[10px] font-mono uppercase tracking-widest rounded-sm ${dark ? 'border border-rule-dark text-paper' : 'border border-ink/20 text-ink'}`}>
                  {entry.type.replace(/_/g, ' ')}
                </span>
              </td>
              <td className="p-4 font-mono text-xs opacity-80">{entry.debitAccount}</td>
              <td className="p-4 font-mono text-xs opacity-80">{entry.creditAccount}</td>
              <td className="p-4 font-mono text-right text-sm font-bold">{formatNaira(entry.amount)}</td>
              <td className="p-4 font-mono text-[10px] opacity-60">{entry.financingId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
