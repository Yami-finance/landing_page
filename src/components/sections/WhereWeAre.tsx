import { SectionHead } from "@/components/ledger/SectionHead";
import { LedgerRow } from "@/components/ledger/LedgerRow";
import { Stamp } from "@/components/ledger/Stamp";
import { Reveal } from "@/components/motion/Reveal";
import { statusEntries } from "@/content/landing";

// §4.8 — the honesty section. Every line here is literally true; it must never
// gain a metric that isn't (§1.1).
export function WhereWeAre() {
  return (
    <section id="where-we-are" className="scroll-mt-20 border-t border-ink">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
        <SectionHead folio="05 · Where we are">
          Almost. Not yet. Soon.
        </SectionHead>

        <Reveal className="section-head mt-6">
          <span className="hidden md:block" />
          <p className="max-w-2xl text-[18px] leading-relaxed text-ink-soft">
            We&apos;re not live yet. When we are, you&apos;ll be the first to know.
          </p>
        </Reveal>

        <div className="mt-10 border-t border-ink">
          {statusEntries.map((e, i) => (
            <LedgerRow
              key={e.id}
              label={`Entry ${e.id}`}
              title={e.title}
              detail={e.detail}
              delay={i * 60}
              trailing={<Stamp state={e.stamp}>{e.stampLabel}</Stamp>}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
