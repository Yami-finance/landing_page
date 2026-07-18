import { Reveal } from "@/components/motion/Reveal";
import { Highlight } from "@/components/ledger/Highlight";
import { Stamp } from "@/components/ledger/Stamp";
import { TicketForm } from "@/components/waitlist/TicketForm";
import { heroLead, heroMeta } from "@/content/landing";
import handFill from "@/assets/brand/hand-fill.svg";

// § amendment — the hero (and the nav over it) inverts to the brand's own dark.
// Two green hands reach in from opposite corners and converge on the Ticket:
// "two hands, and between them, your spot."
export function Hero() {
  return (
    <section
      id="brand-hero"
      className="relative overflow-hidden bg-brand-dark text-paper"
    >
      {/* Giving hand — lower-left corner. Kept (reduced) on mobile. */}
      <div
        aria-hidden="true"
        className="hand-give pointer-events-none absolute bottom-[-15%] left-[-11%] z-0 h-[44%] w-[46%] max-w-[320px] rotate-[-4deg] bg-contain bg-left-bottom bg-no-repeat sm:w-[28%]"
        style={{ backgroundImage: `url(${handFill.src})` }}
      />
      {/* Receiving hand — upper-right. Hidden on ≤768px to keep the ticket clear. */}
      <div
        aria-hidden="true"
        className="hand-receive pointer-events-none absolute right-[-6%] top-[-16%] z-0 hidden h-[64%] w-[34%] max-w-[380px] rotate-[168deg] bg-contain bg-right-top bg-no-repeat md:block"
        style={{ backgroundImage: `url(${handFill.src})` }}
      />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:px-8 lg:pb-24 lg:pt-20">
        {/* Left */}
        <div>
          <Reveal className="flex flex-wrap items-center gap-3">
            <Stamp state="green">Pre-launch</Stamp>
            <span className="font-mono text-[12px] uppercase tracking-[0.16em] text-forest-muted">
              Lagos, Nigeria — est. 2026
            </span>
          </Reveal>

          <Reveal delay={60}>
            <h1 className="mt-6 text-[clamp(44px,5.8vw,80px)] font-extrabold leading-[1.04] text-paper">
              Lending between people,{" "}
              <Highlight>
                <span className="text-ink">on the record.</span>
              </Highlight>
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-6 max-w-xl text-[18px] leading-relaxed text-forest-muted">
              {heroLead}
            </p>
          </Reveal>

          <Reveal delay={180}>
            <dl className="mt-10 grid max-w-xl grid-cols-1 gap-y-4 border-t border-[rgba(244,242,234,0.16)] pt-6 sm:grid-cols-3 sm:gap-x-6">
              {heroMeta.map((m) => (
                <div key={m.k}>
                  <dt className="font-mono text-[13px] font-semibold uppercase tracking-[0.08em] text-paper">
                    {m.k}
                  </dt>
                  <dd className="mt-1 font-mono text-[12px] uppercase tracking-[0.08em] text-forest-muted">
                    {m.v}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Right — the ticket passes between the hands. */}
        <div id="waitlist" className="relative z-10 scroll-mt-24 lg:pl-4">
          <TicketForm defaultIntent="both" source="/" />
        </div>
      </div>
    </section>
  );
}
