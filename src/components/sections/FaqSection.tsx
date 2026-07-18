import { SectionHead } from "@/components/ledger/SectionHead";
import { Reveal } from "@/components/motion/Reveal";
import { faqs } from "@/content/landing";

// Native <details> so the FAQ works with zero JS (§2.6). "+" rotates 45° on open
// via the .faq-item CSS in globals.
export function FaqSection() {
  return (
    <section id="faq" className="scroll-mt-20 border-t border-ink">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
        <SectionHead folio="07 — FAQ">Questions, answered.</SectionHead>

        <Reveal className="mt-12 border-t border-ink">
          {faqs.map((f, i) => (
            <details
              key={f.q}
              className="faq-item border-b border-rule"
              open={i === 0}
            >
              <summary className="grid grid-cols-[1fr_auto] items-center gap-4 py-5 md:grid-cols-[200px_1fr_auto] md:gap-10">
                <span className="col-label hidden md:block">
                  Q.0{i + 1}
                </span>
                <span className="text-[18px] font-bold text-ink">{f.q}</span>
                <span className="faq-plus flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-[1.5px] border-ink font-mono text-[18px] leading-none text-ink">
                  +
                </span>
              </summary>
              <div className="pb-6 md:pl-[calc(200px+2.5rem)]">
                <p className="max-w-2xl text-[15.5px] leading-relaxed text-ink-soft">
                  {f.a}
                </p>
              </div>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
