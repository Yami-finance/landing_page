import { DarkPanel } from "@/components/ledger/DarkPanel";
import { Reveal } from "@/components/motion/Reveal";
import { founderNote } from "@/content/landing";

const ABEG = "“Abeg, I'll pay you back next week.”";

function FirstPara({ text }: { text: string }) {
  const [before, after] = text.split(ABEG);
  return (
    <p>
      {before}
      <em className="italic text-green">{ABEG}</em>
      {after}
    </p>
  );
}

// §4.9 — dark panel, founder note verbatim. The "Abeg…" line gets the
// italic-highlight (green on forest) treatment.
export function FounderNote() {
  return (
    <DarkPanel id="why">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
        <Reveal className="section-head">
          <p className="folio pt-2 text-forest-muted">
            06 — Why we&apos;re building this
          </p>
          <div className="max-w-2xl space-y-6 text-[19px] leading-relaxed text-forest-text">
            {founderNote.paras.map((para, i) =>
              i === 0 ? (
                <FirstPara key={i} text={para} />
              ) : (
                <p key={i}>{para}</p>
              )
            )}
            <p className="pt-2 font-mono text-[13px] uppercase tracking-[0.14em] text-forest-muted">
              {founderNote.signature}
            </p>
          </div>
        </Reveal>
      </div>
    </DarkPanel>
  );
}
