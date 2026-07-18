"use client";

import { useEffect, useState } from "react";
import { Typewriter } from "@/components/motion/Typewriter";
import { useInView, prefersReducedMotion } from "@/components/motion/useInView";
import { ledgerStrip } from "@/content/landing";
import handOutline from "@/assets/brand/hand-outline-rule.svg";

const COLS = ["Date", "Entry", "Amount", "Status"];

export function LedgerStrip() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [showStamp, setShowStamp] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => setReduced(prefersReducedMotion()), []);

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion()) {
      setShowStamp(true);
      return;
    }
    const t = setTimeout(() => setShowStamp(true), 1150);
    return () => clearTimeout(t);
  }, [inView]);

  return (
    <section className="tear-line relative overflow-hidden border-b border-ink bg-paper-2">
      {/* Hands pattern re-colored to the ledger world: outlined hands in rule
          ink on paper, low density — a watermark, not the neon tile. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage: `url(${handOutline.src})`,
          backgroundRepeat: "repeat-x",
          backgroundPosition: "left center",
          backgroundSize: "auto 42px",
        }}
      />
      <div ref={ref} className="relative mx-auto max-w-6xl px-5 py-8 lg:px-8">
        <div className="overflow-x-auto">
          <div className="min-w-[560px]">
            {/* Column headings */}
            <div className="grid grid-cols-[90px_1fr_130px_130px] gap-4 border-b border-rule pb-2">
              {COLS.map((c) => (
                <span
                  key={c}
                  className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-faint"
                >
                  {c}
                </span>
              ))}
            </div>

            {ledgerStrip.map((row, r) => (
              <div
                key={row.entry}
                className="grid grid-cols-[90px_1fr_130px_130px] items-center gap-4 border-b border-rule py-4 font-mono text-[14px] text-ink"
              >
                <Cell text={row.date} on={inView} reduced={reduced} delay={r * 500} />
                <Cell
                  text={row.entry}
                  on={inView}
                  reduced={reduced}
                  delay={r * 500 + 140}
                  className="text-ink-soft"
                />
                <Cell
                  text={row.amount}
                  on={inView}
                  reduced={reduced}
                  delay={r * 500 + 260}
                />
                {row.stamp ? (
                  <span>
                    {(showStamp || reduced) && (
                      <span
                        className={`stamp stamp-green text-[11px] ${
                          reduced ? "" : "thump"
                        }`}
                      >
                        {row.status}
                      </span>
                    )}
                  </span>
                ) : (
                  <Cell
                    text={row.status}
                    on={inView}
                    reduced={reduced}
                    delay={r * 500 + 380}
                    className="text-faint"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Cell({
  text,
  on,
  reduced,
  delay,
  className = "",
}: {
  text: string;
  on: boolean;
  reduced: boolean;
  delay: number;
  className?: string;
}) {
  // Reduced motion: static full text, no typing and no scroll dependency.
  if (reduced) return <span className={className}>{text}</span>;
  if (!on) return <span className={className} />;
  return <Typewriter text={text} startDelay={delay} className={className} />;
}
