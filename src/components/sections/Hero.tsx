import { Reveal } from "@/components/motion/Reveal";
import { TicketForm } from "@/components/waitlist/TicketForm";
import { HandFill } from "@/components/brand/HandFill";
import { heroLead, heroSubtitle, heroMeta } from "@/content/landing";

// § amendment — the hero (and the nav over it) inverts to the brand's own dark.
// Two green hands reach in from opposite corners and converge on the Ticket:
// "two hands, and between them, your spot." Hands are inlined SVGs — the hero
// makes zero image requests.
export function Hero() {
  return (
    <section
      id="brand-hero"
      className="relative overflow-hidden bg-brand-dark text-paper"
    >
      {/* Giving hand — palm in the lower-left corner, fingers reaching up-right
          toward the ticket. Smaller on mobile. */}
      <HandFill className="hand-give pointer-events-none absolute bottom-[-3vw] left-[-8vw] z-0 w-[44vw] max-w-[220px] [rotate:180deg] sm:w-[23vw] sm:max-w-[360px]" />
      {/* Receiving hand — palm in the upper-right corner, fingers reaching
          down-left toward the ticket. Hidden on ≤768px to keep the ticket clear. */}
      <HandFill className="hand-receive pointer-events-none absolute right-[-5vw] top-[-6vw] z-0 hidden w-[26vw] max-w-[400px] [rotate:-4deg] md:block" />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:px-8 lg:pb-24 lg:pt-20">
        {/* Left */}
        <div>
          <Reveal delay={60}>
            <h1 className="mt-6 text-[clamp(44px,5.8vw,80px)] font-extrabold leading-[1.15] text-paper">
              Accessible credit,{" "}
              <span className="box-decoration-clone bg-green px-2.5 py-1 text-ink">
                starting with your tuition.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-6 max-w-xl text-[18px] leading-relaxed text-forest-muted">
              {heroLead}
            </p>
          </Reveal>

          <Reveal delay={150}>
            <p className="mt-4 max-w-xl font-mono text-[13px] uppercase tracking-[0.08em] text-green">
              {heroSubtitle}
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
