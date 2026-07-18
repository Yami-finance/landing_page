import { SectionHead } from "@/components/ledger/SectionHead";
import { LedgerRow } from "@/components/ledger/LedgerRow";
import { problems } from "@/content/landing";

export function ProblemSection() {
  return (
    <section id="problem" className="border-t border-ink">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
        <SectionHead folio="01 — The Problem">
          Nigerians already lend to each other. There&apos;s just no
          infrastructure.
        </SectionHead>

        <div className="mt-12 border-t border-ink">
          {problems.map((p, i) => (
            <LedgerRow
              key={p.title}
              label={p.label}
              title={p.title}
              detail={p.detail}
              delay={i * 60}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
