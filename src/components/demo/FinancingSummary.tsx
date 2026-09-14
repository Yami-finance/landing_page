import React from 'react';
import { formatNaira, formatPercent } from '@/lib/demo/format';
import type { FinancingTerms } from '@/lib/demo/calculations';
import { LedgerRow } from '@/components/ledger/LedgerRow';
import { SectionHead } from '@/components/ledger/SectionHead';

export function FinancingSummary({ terms, dark = false }: { terms: FinancingTerms; dark?: boolean }) {
  return (
    <div className="flex flex-col border border-ink/20">
      <SectionHead folio="FIN·TERMS" dark={dark} />
      
      <div className="flex flex-col">
        <LedgerRow 
          label="Principal" 
          title="Tuition Amount" 
          detail="Paid directly to institution" 
          trailing={<span className="font-mono text-lg">{formatNaira(terms.principal)}</span>} 
          dark={dark} 
        />
        
        <LedgerRow 
          label="Yami Margin" 
          title={`Platform Fee (${formatPercent(terms.yamiMarginRate)})`} 
          detail="Operating margin" 
          trailing={<span className="font-mono">{formatNaira(terms.yamiMargin)}</span>} 
          dark={dark} 
        />
        
        <LedgerRow 
          label="Sponsor Yield" 
          title={`Return (${formatPercent(terms.sponsorYieldRate)})`} 
          detail="Earned by the sponsor" 
          trailing={<span className="font-mono">{formatNaira(terms.sponsorYield)}</span>} 
          dark={dark} 
        />
        
        <div className={`
          grid grid-cols-[1fr_1fr] md:grid-cols-[200px_1fr_1.4fr] gap-4 p-4 border-t
          ${dark ? 'border-rule-dark text-paper' : 'border-rule text-ink'}
          bg-ink/5
        `}>
          <div className="font-mono text-[10px] uppercase tracking-widest opacity-60 pt-1 md:block hidden">
            Total
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-disp text-base">Total Repayment</span>
            <span className="text-sm opacity-60">Divided into {terms.termMonths} equal installments</span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="font-mono text-xl font-bold">{formatNaira(terms.totalRepayment)}</span>
            <span className="font-mono text-xs opacity-60">
              {formatNaira(terms.monthlyInstallment)} / month
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
