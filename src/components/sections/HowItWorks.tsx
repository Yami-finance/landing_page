"use client";

import { useState } from "react";
import { SectionHead } from "@/components/ledger/SectionHead";
import { LedgerRow } from "@/components/ledger/LedgerRow";
import { borrowSteps, lendSteps } from "@/content/landing";

type Mode = "borrow" | "lend";

export function HowItWorks() {
  const [mode, setMode] = useState<Mode>("borrow");
  const steps = mode === "borrow" ? borrowSteps : lendSteps;

  return (
    <section id="how-it-works" className="scroll-mt-20 border-t border-ink">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
        <SectionHead folio="04 · How it works">
          Simple. Structured. Secure.
        </SectionHead>

        <div className="mt-10 flex">
          <div className="inline-flex rounded-md border-[1.5px] border-ink p-1">
            {(["borrow", "lend"] as Mode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                aria-pressed={mode === m}
                className={`rounded-[4px] px-5 py-2.5 font-mono text-[12.5px] uppercase tracking-[0.1em] transition-colors ${
                  mode === m
                    ? "bg-ink text-green"
                    : "text-ink-soft hover:text-ink"
                }`}
              >
                {m === "borrow" ? "I want to borrow" : "I want to lend"}
              </button>
            ))}
          </div>
        </div>

        <div
          key={mode}
          className="mt-12 border-t border-ink transition-opacity duration-200"
        >
          {steps.map((s, i) => (
            <LedgerRow
              key={s.title}
              label={`Step ${i + 1} / 5`}
              title={s.title}
              detail={s.detail}
              delay={i * 60}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
