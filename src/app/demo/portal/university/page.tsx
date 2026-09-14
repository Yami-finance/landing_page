'use client';

import React from 'react';
import Link from 'next/link';
import { useDemo } from '@/lib/demo/store';
import { deriveInvoiceStatus } from '@/lib/demo/types';
import { formatNaira, formatDate } from '@/lib/demo/format';

export default function UniversityFeePortal() {
  const { state, isHydrated } = useDemo();

  if (!isHydrated) return null;

  const { student, invoice } = state;
  const status = deriveInvoiceStatus(state.financing);

  return (
    <div className="min-h-screen bg-[#F5F7FA] font-body text-[#334155]">
      
      {/* Institutional Header */}
      <header className="bg-[#1E293B] text-white p-4 shadow-md">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#1E293B] font-serif font-bold text-xl">
              B
            </div>
            <div>
              <h1 className="font-serif text-lg font-bold tracking-wide">Demo University</h1>
              <p className="text-[#94A3B8] text-xs">Student Portal / Bursary</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">{student.lastName}, {student.firstName}</p>
            <p className="text-[#94A3B8] text-xs font-mono">{student.matricNumber}</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-4 py-8 md:py-12 flex flex-col gap-8">
        
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-[#0F172A]">Outstanding Fees</h2>
          <p className="text-[#64748B] text-sm">Session: 2026/2027 • {invoice.semester}</p>
        </div>

        {/* Invoice Card */}
        <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] overflow-hidden">
          
          <div className="p-6 border-b border-[#E2E8F0] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <p className="text-sm font-semibold text-[#64748B] uppercase tracking-wider mb-1">Invoice #{invoice.id}</p>
              <h3 className="text-xl font-bold text-[#0F172A]">{invoice.description}</h3>
              <p className="text-sm text-[#64748B] mt-1">Due: {formatDate(invoice.dueDate)}</p>
            </div>
            
            <div className="text-right">
              <p className="text-3xl font-bold text-[#0F172A]">{formatNaira(invoice.amount)}</p>
              
              {status === 'UNPAID' && (
                <span className="inline-block mt-2 px-3 py-1 bg-[#FEE2E2] text-[#991B1B] text-xs font-bold rounded-full border border-[#FCA5A5]">
                  UNPAID
                </span>
              )}
              {status === 'PAID' && (
                <span className="inline-block mt-2 px-3 py-1 bg-[#DCFCE7] text-[#166534] text-xs font-bold rounded-full border border-[#86EFAC]">
                  PAID IN FULL
                </span>
              )}
              {status === 'FINANCING_IN_PROGRESS' && (
                <span className="inline-block mt-2 px-3 py-1 bg-[#FEF9C3] text-[#854D0E] text-xs font-bold rounded-full border border-[#FDE047]">
                  PROCESSING VIA YAMI
                </span>
              )}
            </div>
          </div>

          <div className="p-6 bg-[#F8FAFC]">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-[#64748B] border-b border-[#E2E8F0]">
                  <th className="pb-3 font-medium">Description</th>
                  <th className="pb-3 font-medium text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="text-[#334155]">
                <tr className="border-b border-[#E2E8F0] border-dashed">
                  <td className="py-4">Tuition Fee</td>
                  <td className="py-4 text-right">{formatNaira(invoice.amount * 0.75)}</td>
                </tr>
                <tr className="border-b border-[#E2E8F0] border-dashed">
                  <td className="py-4">Accommodation</td>
                  <td className="py-4 text-right">{formatNaira(invoice.amount * 0.15)}</td>
                </tr>
                <tr className="border-b border-[#E2E8F0] border-dashed">
                  <td className="py-4">Medical & ICT Levy</td>
                  <td className="py-4 text-right">{formatNaira(invoice.amount * 0.10)}</td>
                </tr>
                <tr className="font-bold text-[#0F172A]">
                  <td className="py-4">Total Amount Due</td>
                  <td className="py-4 text-right">{formatNaira(invoice.amount)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Payment Actions */}
          <div className="p-6 border-t border-[#E2E8F0] flex flex-col md:flex-row justify-end gap-4 bg-white">
            
            {status === 'UNPAID' && (
              <>
                <button className="px-6 py-3 rounded-md bg-[#1E293B] hover:bg-[#0F172A] text-white font-medium transition-colors shadow-sm">
                  Pay with Card
                </button>
                <button className="px-6 py-3 rounded-md border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] text-[#334155] font-medium transition-colors">
                  Bank Transfer
                </button>
                
                <div className="w-px bg-[#E2E8F0] hidden md:block mx-2" />
                
                {/* YAMI INTEGRATION BUTTON */}
                <Link 
                  href="/demo/borrower/apply"
                  className="group relative px-6 py-3 bg-green hover:bg-[#c9e635] text-ink font-disp rounded-md shadow-[4px_4px_0_#141711] hover:shadow-[2px_2px_0_#141711] hover:translate-y-[2px] hover:translate-x-[2px] transition-all flex items-center justify-center gap-2"
                >
                  Pay with Yami
                  <span className="text-xs font-mono font-normal opacity-70">4 Months</span>
                </Link>
              </>
            )}

            {status === 'FINANCING_IN_PROGRESS' && (
              <div className="w-full text-center py-2 text-[#64748B] text-sm">
                Tuition financing requested. Awaiting final disbursement from Yami.
                <br/>
                <Link href="/demo/borrower/dashboard" className="text-blue-600 hover:underline mt-2 inline-block">
                  View application status on Yami
                </Link>
              </div>
            )}

            {status === 'PAID' && (
              <div className="w-full flex justify-between items-center text-sm">
                <span className="text-[#166534] font-medium flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Payment Confirmed. Student is cleared for the semester.
                </span>
                <button className="text-blue-600 hover:underline font-medium">Download Receipt</button>
              </div>
            )}

          </div>

        </div>
      </main>

    </div>
  );
}
