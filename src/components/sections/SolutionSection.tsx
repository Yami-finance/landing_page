import { DarkPanel } from "@/components/ledger/DarkPanel";
import { SectionHead } from "@/components/ledger/SectionHead";
import { LedgerRow } from "@/components/ledger/LedgerRow";
import { Reveal } from "@/components/motion/Reveal";
import { pillars, solutionLead } from "@/content/landing";

export function SolutionSection() {
  return (
    <DarkPanel id="solution">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
        <SectionHead dark folio="02 · The Solution">
          Yami is the rails.
          <br />
          <span className="text-green">Not the money.</span>
        </SectionHead>

        {/* Lead aligned under the H2 column */}
        <Reveal className="section-head mt-6">
          <span className="hidden md:block" />
          <p className="max-w-2xl text-[18px] leading-relaxed text-forest-muted">
            {solutionLead}
          </p>
        </Reveal>

        <div className="mt-10 border-t border-ink">
          {pillars.map((p, i) => (
            <LedgerRow
              key={p.title}
              dark
              label={p.label}
              title={p.title}
              detail={p.detail}
              delay={i * 60}
            />
          ))}
        </div>
      </div>
    </DarkPanel>
  );
}
