import type { Metadata } from "next";
import { HandFill } from "@/components/brand/HandFill";
import { PrintButton } from "@/components/flyer/PrintButton";

export const metadata: Metadata = {
  title: "Yami Waitlist Flyer · Print & Social Media",
  description: "Official marketing flyer for Yami Educational BNPL waitlist.",
};

export default function FlyerPage() {
  return (
    <div className="min-h-screen bg-[#EDEBE1] text-[#141711] p-4 sm:p-10 font-body flex flex-col items-center justify-center print:p-0 print:bg-transparent">
      <style>{`
        @media print {
          @page { size: auto; margin: 0mm; }
          body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; background: transparent !important; }
          .print\\:hidden { display: none !important; }
        }
      `}</style>
      {/* Top Action Header (Hidden during Print / Clean Screenshot) */}
      <div className="print:hidden w-full max-w-[760px] mb-6 flex flex-wrap items-center justify-between gap-4 bg-[#FDFCF7] border-[1.5px] border-[#141711] rounded-lg p-4 shadow-[4px_4px_0_#141711]">
        <div>
          <h1 className="font-disp font-extrabold text-lg text-[#141711] leading-tight">
            Yami Official Waitlist Flyer
          </h1>
          <p className="font-mono text-xs text-[#4E544A] tracking-wider uppercase mt-0.5">
            1080 × 1440 Portrait · Print &amp; Social Export
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <PrintButton />
        </div>
      </div>

      {/* FLYER ARTBOARD (1080 x 1440 Proportions) */}
      <div
        id="flyer-artboard"
        className="relative w-full max-w-[760px] bg-[#101315] text-[#F4F2EA] rounded-2xl border-[2.5px] border-[#141711] shadow-[12px_12px_0_rgba(20,23,17,0.3)] overflow-hidden print:shadow-none print:m-0 print:border-none print:rounded-none"
      >
        {/* Background Corner Hand Illustrations */}
        <HandFill className="pointer-events-none absolute -bottom-10 -left-10 w-64 sm:w-84 opacity-20 rotate-180" />
        <HandFill className="pointer-events-none absolute -top-12 -right-12 w-64 sm:w-84 opacity-20 -rotate-12" />

        {/* Content Wrapper */}
        <div className="relative z-10 p-6 sm:p-10 flex flex-col justify-between">
          
          {/* Top Brand Header */}
          <div className="flex items-center justify-between border-b border-[rgba(244,242,234,0.15)] pb-5">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <svg viewBox="0 0 151 151" className="h-9 w-9 shrink-0" role="img" aria-hidden="true">
                <rect width="151" height="151" rx="30" fill="#DFFF3B" />
                <path d="M71.5189 76.7649C69.3996 73.9676 71.7584 73.3641 73.3948 74.9767L81.3439 82.9073C80.8141 77.0323 84.3244 78.0217 84.2322 80.3662L84.2035 86.4914L85.4877 104.84C85.6734 107.493 84.7377 110.102 82.9081 112.032C78.4428 116.744 70.6686 115.692 67.6184 109.963L67.4236 109.597C65.9612 106.85 65.8918 103.573 67.2366 100.767L71.7722 91.3029L66.1066 87.6875C65.0142 86.9689 65.5642 85.8453 66.7386 86.2804L72.1178 88.4412L66.7772 83.7794C65.4692 82.5706 66.6021 81.4482 67.8446 82.2855L73.8239 86.1943L68.1979 80.2171C66.8567 78.5998 68.2219 77.708 69.4656 78.5774C70.2213 79.1056 76.8707 83.8513 76.7772 83.1622L71.5189 76.7649Z" fill="#101315" />
                <path d="M95.9231 36.2336C102.261 34.8185 108.12 40.0312 107.447 46.4854L107.404 46.8979C107.081 49.9923 105.306 52.7495 102.622 54.326L93.569 59.643L96.2465 65.8044C96.7508 67.0102 95.6665 67.6351 94.9358 66.6187L91.6825 61.8234L93.5054 68.6713C93.9144 70.4041 92.3473 70.7025 91.7849 69.3146L89.0113 62.7345L90.3353 70.8325C90.5436 72.9227 88.9128 72.9002 88.3673 71.4849C88.0359 70.6249 85.1741 62.9767 84.8664 63.6005L85.6508 71.8418C85.8446 75.345 83.5506 74.5286 83.095 72.2776L80.9366 61.2625C78.0913 66.431 75.7329 63.6508 77.1202 61.7578L80.5688 56.6935L89.7625 40.7581C91.0915 38.4546 93.3263 36.8134 95.9231 36.2336Z" fill="#101315" />
                <path d="M43.6549 45.9462C44.8223 39.5626 51.911 36.2037 57.5962 39.3403L57.9594 39.5406C60.6851 41.0444 62.5336 43.7529 62.9396 46.8375L64.3089 57.241L71.031 57.18C72.3389 57.1862 72.4919 58.4276 71.2703 58.7036L65.5827 59.8274L72.6041 60.8204C74.3603 61.1199 74.0242 62.6781 72.5259 62.6543L65.3806 62.6404L73.3594 64.58C75.3668 65.2036 74.7101 66.6954 73.1931 66.6454C72.271 66.6149 64.1069 66.2655 64.5624 66.792L72.4626 69.2841C75.7665 70.4719 74.1198 72.2642 71.8678 71.8056L60.8752 69.4961C64.5284 74.1297 61.0468 75.2157 59.8433 73.201L56.5213 68.0529L45.422 53.379C43.8175 51.2578 43.1765 48.5618 43.6549 45.9462Z" fill="#101315" />
              </svg>
              <span className="font-disp font-extrabold text-2xl tracking-tight text-[#F4F2EA]">
                Yami
              </span>
            </div>

            {/* Status Pill Badge */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.16em] bg-[#DFFF3B] text-[#141711] px-3 py-1.5 rounded border border-[#141711] shadow-[2px_2px_0_#141711]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#141711] animate-pulse" />
                PILOT 01 · WAITLIST OPEN
              </span>
            </div>
          </div>

          {/* Main Headline & Context */}
          <div className="mt-8">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#DFFF3B] font-semibold">
              Educational Buy Now, Pay Later
            </p>
            <h2 className="mt-3 font-disp text-[36px] sm:text-[46px] font-extrabold leading-[1.08] tracking-tight text-[#F4F2EA]">
              Accessible credit, <br />
              <span className="bg-[#DFFF3B] text-[#141711] px-3 py-0.5 rounded box-decoration-clone inline-block mt-1">
                starting with your tuition.
              </span>
            </h2>
            <p className="mt-4 text-base sm:text-[17px] leading-relaxed text-[#AEBFB2] max-w-xl">
              Banks demand collateral you do not have. Loan apps charge predatory rates and harass your contacts. Yami funds your school fees directly to the university bursary — so you get cleared for classes instantly and pay back in 4 simple monthly installments.
            </p>
          </div>

          {/* The Physical Ticket Card */}
          <div className="mt-8 bg-[#FDFCF7] text-[#141711] rounded-xl border-[2px] border-[#141711] shadow-[6px_6px_0_#DFFF3B] overflow-hidden">
            
            {/* Ticket Stub Header */}
            <div className="px-6 py-4 flex items-center justify-between bg-[#FDFCF7]">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#4E544A] font-semibold">
                ADMIT ONE · STUDENT CLEARANCE
              </span>
              <span className="font-mono text-[10.5px] uppercase font-bold tracking-wider bg-[#DFFF3B]/40 text-[#141711] px-2.5 py-1 rounded border border-[#141711]">
                ZERO COLLATERAL
              </span>
            </div>

            {/* Perforated Notched Tear Line */}
            <div className="relative">
              <div className="border-t-[1.5px] border-dashed border-[#141711]" />
              <span className="absolute -left-[9px] top-0 h-[18px] w-[18px] -translate-y-1/2 rounded-full bg-[#101315]" />
              <span className="absolute -right-[9px] top-0 h-[18px] w-[18px] -translate-y-1/2 rounded-full bg-[#101315]" />
            </div>

            {/* Ticket Content */}
            <div className="p-6 sm:p-7 space-y-4">
              
              {/* 3-Pillar Ledger Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-b border-[#D8D5C8] pb-5">
                <div className="bg-[#EDEBE1] p-3.5 rounded border border-[#141711]">
                  <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#4E544A] block mb-1">
                    01 · Instant
                  </span>
                  <div className="font-disp font-extrabold text-[15px] text-[#141711]">
                    Bursary Clearance
                  </div>
                  <p className="text-xs text-[#4E544A] mt-1 leading-snug">
                    Money routes direct to your university via API. Cleared for exams immediately.
                  </p>
                </div>

                <div className="bg-[#EDEBE1] p-3.5 rounded border border-[#141711]">
                  <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#4E544A] block mb-1">
                    02 · Structured
                  </span>
                  <div className="font-disp font-extrabold text-[15px] text-[#141711]">
                    4-Month Plan
                  </div>
                  <p className="text-xs text-[#4E544A] mt-1 leading-snug">
                    Tuition broken into 4 simple installments. No start-of-semester lump-sum panic.
                  </p>
                </div>

                <div className="bg-[#EDEBE1] p-3.5 rounded border border-[#141711]">
                  <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#4E544A] block mb-1">
                    03 · Reputation
                  </span>
                  <div className="font-disp font-extrabold text-[15px] text-[#141711]">
                    Trust Score ↑
                  </div>
                  <p className="text-xs text-[#4E544A] mt-1 leading-snug">
                    Every on-time payment builds your credit profile for larger future financing.
                  </p>
                </div>
              </div>

              {/* Micro Trust Score Element */}
              <div className="flex items-center justify-between bg-[#16301F] text-[#EDF3EA] p-3.5 rounded-lg border border-[#141711]">
                <div className="flex items-center gap-3">
                  <div className="font-mono text-2xl sm:text-3xl font-bold text-[#DFFF3B]">
                    791
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#AEBFB2]">
                      Your Reputation
                    </div>
                    <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#DFFF3B]">
                      Tier: Reliable Member
                    </div>
                  </div>
                </div>
                <div className="font-mono text-[11px] text-right text-[#AEBFB2] hidden sm:block">
                  Built on promises kept · Not algorithms
                </div>
              </div>

            </div>
          </div>

          {/* Bottom CTA & QR Code Section */}
          <div className="mt-8 pt-6 border-t border-[rgba(244,242,234,0.15)] flex flex-col sm:flex-row items-center justify-between gap-6">
            
            {/* Left: Call to Action */}
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#DFFF3B] font-semibold">
                Cohort 01 Now Forming
              </span>
              <h3 className="font-disp text-2xl sm:text-3xl font-extrabold text-[#F4F2EA] mt-1">
                Claim your spot in line.
              </h3>
              <p className="text-xs sm:text-sm text-[#AEBFB2] mt-1.5 max-w-sm leading-relaxed">
                Starting with our campus partners (Partner Universities). Scan or visit to secure early access.
              </p>
              <div className="mt-3 inline-flex items-center gap-2">
                <span className="font-mono text-base sm:text-lg font-bold text-[#DFFF3B] tracking-wider bg-[rgba(223,255,59,0.12)] px-3 py-1 rounded border border-[rgba(223,255,59,0.3)]">
                  👉 yami.finance
                </span>
              </div>
            </div>

            {/* Right: Crisp Vector QR Code Card */}
            <div className="bg-[#FDFCF7] text-[#141711] p-3.5 rounded-xl border-[2px] border-[#141711] shadow-[4px_4px_0_#DFFF3B] text-center flex flex-col items-center shrink-0">
              <svg className="w-28 h-28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="5" y="5" width="28" height="28" fill="#141711" rx="4" />
                <rect x="9" y="9" width="20" height="20" fill="#FDFCF7" rx="2" />
                <rect x="13" y="13" width="12" height="12" fill="#141711" rx="1" />

                <rect x="67" y="5" width="28" height="28" fill="#141711" rx="4" />
                <rect x="71" y="9" width="20" height="20" fill="#FDFCF7" rx="2" />
                <rect x="75" y="13" width="12" height="12" fill="#141711" rx="1" />

                <rect x="5" y="67" width="28" height="28" fill="#141711" rx="4" />
                <rect x="9" y="71" width="20" height="20" fill="#FDFCF7" rx="2" />
                <rect x="13" y="75" width="12" height="12" fill="#141711" rx="1" />

                <rect x="38" y="8" width="6" height="6" fill="#141711" />
                <rect x="48" y="8" width="6" height="6" fill="#141711" />
                <rect x="56" y="16" width="6" height="6" fill="#141711" />
                <rect x="38" y="24" width="6" height="6" fill="#141711" />
                <rect x="48" y="24" width="6" height="6" fill="#141711" />

                <rect x="8" y="38" width="6" height="6" fill="#141711" />
                <rect x="18" y="46" width="6" height="6" fill="#141711" />
                <rect x="8" y="56" width="6" height="6" fill="#141711" />
                <rect x="26" y="38" width="6" height="6" fill="#141711" />

                <rect x="38" y="38" width="10" height="10" fill="#DFFF3B" stroke="#141711" strokeWidth="2" rx="2" />
                <rect x="42" y="42" width="2" height="2" fill="#141711" />

                <rect x="54" y="38" width="6" height="6" fill="#141711" />
                <rect x="68" y="38" width="6" height="6" fill="#141711" />
                <rect x="78" y="46" width="6" height="6" fill="#141711" />
                <rect x="88" y="38" width="6" height="6" fill="#141711" />
                <rect x="54" y="48" width="6" height="6" fill="#141711" />
                <rect x="68" y="56" width="6" height="6" fill="#141711" />
                <rect x="84" y="56" width="6" height="6" fill="#141711" />

                <rect x="38" y="68" width="6" height="6" fill="#141711" />
                <rect x="48" y="78" width="6" height="6" fill="#141711" />
                <rect x="38" y="86" width="6" height="6" fill="#141711" />
                <rect x="56" y="72" width="6" height="6" fill="#141711" />
                <rect x="68" y="72" width="6" height="6" fill="#141711" />
                <rect x="78" y="68" width="6" height="6" fill="#141711" />
                <rect x="86" y="78" width="6" height="6" fill="#141711" />
                <rect x="68" y="86" width="6" height="6" fill="#141711" />
                <rect x="84" y="86" width="6" height="6" fill="#141711" />
              </svg>
              <span className="font-mono text-[9px] uppercase font-bold tracking-wider text-[#141711] mt-1 block">
                Scan to Claim Spot
              </span>
            </div>

          </div>

          {/* Micro Footer Endorsement */}
          <div className="mt-8 pt-4 border-t border-[rgba(244,242,234,0.1)] flex flex-wrap items-center justify-between text-[10.5px] font-mono uppercase tracking-[0.14em] text-[#8C9186]">
            <span>Lending between people, on the record.</span>
            <span>Built by Arcturian Limited · Lagos</span>
            <span>© 2026 Yami</span>
          </div>

        </div>
      </div>
    </div>
  );
}
