"use client";

import { useState } from "react";
import { SectionHead } from "@/components/ledger/SectionHead";
import { ScoreCard } from "@/components/score/ScoreCard";
import { Reveal } from "@/components/motion/Reveal";
import { factors, portability } from "@/content/landing";

export function Centrepiece() {
  // Factor i lights a segment in the aspirational band (Reliable→Elite),
  // suggesting each behaviour pushes you up the scale (§4.6 interactive).
  const [pulse, setPulse] = useState<number | null>(null);

  return (
    <section id="trust-score" className="scroll-mt-20 border-t border-ink">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
        <SectionHead folio="03 — The Centrepiece">
          A number that means you keep your word.
        </SectionHead>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
          <Reveal>
            <ScoreCard score={791} pulseIndex={pulse} />
          </Reveal>

          <Reveal delay={80}>
            <div className="border-t border-ink">
              {factors.map((f, i) => (
                <div
                  key={f.title}
                  tabIndex={0}
                  onMouseEnter={() => setPulse(i + 2)}
                  onMouseLeave={() => setPulse(null)}
                  onFocus={() => setPulse(i + 2)}
                  onBlur={() => setPulse(null)}
                  className="grid grid-cols-[42px_1fr] gap-3 border-b border-rule py-5 outline-none transition-colors hover:bg-paper-2 focus-visible:bg-paper-2"
                >
                  <span className="col-label pt-1">{f.label}</span>
                  <div>
                    <h3 className="text-[18px] font-bold text-ink">{f.title}</h3>
                    <p className="mt-1 text-[15.5px] text-ink-soft">{f.detail}</p>
                  </div>
                </div>
              ))}

              <p className="mt-7 max-w-xl text-[15.5px] leading-relaxed text-ink-soft">
                {portability}
              </p>
              <a
                href="/trust-score#simulator"
                className="mt-5 inline-block font-mono text-[13px] uppercase tracking-[0.12em] text-ink underline decoration-green decoration-2 underline-offset-4 hover:text-green-ink"
              >
                See how it moves →
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
