import type { Metadata } from "next";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { SectionHead } from "@/components/ledger/SectionHead";
import { LedgerRow } from "@/components/ledger/LedgerRow";
import { Button } from "@/components/ledger/Button";
import { Stamp } from "@/components/ledger/Stamp";
import { Highlight } from "@/components/ledger/Highlight";
import { Reveal } from "@/components/motion/Reveal";
import { ScoreSimulator } from "@/components/score/ScoreSimulator";
import { factors } from "@/content/landing";
import {
  intro,
  simulator,
  tierNote,
  disclaimer,
  cta,
} from "@/content/trustScore";

export const metadata: Metadata = {
  title: "Trust Score",
  description:
    "How the Yami Trust Score works: repayment rate, repayment speed, and agreement completion. Move the sliders and see how the number responds.",
};

// The target of the Centrepiece "See how it moves →" link. No dark hero here, so
// the nav renders solid from the top (no `overHero`).
export default function TrustScorePage() {
  return (
    <>
      <Nav />
      <main>
        {/* Intro */}
        <section className="border-b border-ink">
          <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-20">
            <SectionHead folio={intro.folio} level="h1">
              {intro.heading}
            </SectionHead>
            <Reveal delay={80}>
              <p className="mt-8 max-w-2xl text-[18px] leading-relaxed text-ink-soft">
                {intro.lead}
              </p>
            </Reveal>
          </div>
        </section>

        {/* Simulator — the #simulator anchor. scroll-mt clears the sticky nav. */}
        <section id="simulator" className="scroll-mt-24 border-b border-ink">
          <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
            <SectionHead folio={simulator.folio}>
              {simulator.heading}
            </SectionHead>
            <Reveal delay={60}>
              <p className="mt-8 max-w-2xl text-[17px] leading-relaxed text-ink-soft">
                {simulator.lead}
              </p>
            </Reveal>

            <div className="mt-14">
              <ScoreSimulator />
            </div>

            <Reveal delay={80}>
              <p className="mt-12 max-w-2xl text-[15.5px] leading-relaxed text-ink-soft">
                {tierNote}
              </p>
            </Reveal>
          </div>
        </section>

        {/* The three factors — reuses the same copy as the landing page. */}
        <section className="border-b border-ink">
          <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
            <SectionHead folio="03 · What counts">
              Three things, and nothing you can game.
            </SectionHead>
            <div className="mt-12 border-t border-ink">
              {factors.map((f, i) => (
                <LedgerRow
                  key={f.title}
                  label={f.label}
                  title={f.title}
                  detail={f.detail}
                  delay={i * 60}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Illustrative-model disclaimer — the page must not imply a live model. */}
        <section className="border-b border-ink bg-paper-2">
          <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
            <Reveal>
              <div className="max-w-2xl">
                <Stamp state="outline">{disclaimer.label}</Stamp>
                <h2 className="mt-5 text-[24px] font-bold leading-snug text-ink">
                  {disclaimer.title}
                </h2>
                <p className="mt-3 text-[15.5px] leading-relaxed text-ink-soft">
                  {disclaimer.body}
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="mx-auto max-w-4xl px-5 py-24 text-center lg:px-8">
            <Reveal>
              <h2 className="text-[clamp(30px,4.2vw,48px)] font-extrabold leading-[1.08] text-ink">
                <Highlight>{cta.heading}</Highlight>
              </h2>
            </Reveal>
            <Reveal delay={60}>
              <p className="mx-auto mt-6 max-w-xl text-[16.5px] leading-relaxed text-ink-soft">
                {cta.body}
              </p>
            </Reveal>
            <Reveal delay={120}>
              <div className="mt-10">
                <Button href="/#waitlist">{cta.button}</Button>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
