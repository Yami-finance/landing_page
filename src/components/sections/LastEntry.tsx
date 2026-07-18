import { Button } from "@/components/ledger/Button";
import { Highlight } from "@/components/ledger/Highlight";
import { Reveal } from "@/components/motion/Reveal";

// §4.11 — the final entry. One clean CTA back to the ticket.
export function LastEntry() {
  return (
    <section className="border-t border-ink">
      <div className="mx-auto max-w-4xl px-5 py-24 text-center lg:px-8 lg:py-32">
        <Reveal>
          <h2 className="text-[clamp(32px,4.6vw,56px)] font-extrabold leading-[1.06] text-ink">
            Your word is worth something.{" "}
            <Highlight>Put it on the record.</Highlight>
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <div className="mt-10">
            <Button href="/#waitlist" size="md">
              Claim your spot →
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
