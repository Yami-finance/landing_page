import { DarkPanel } from "@/components/ledger/DarkPanel";
import { Reveal } from "@/components/motion/Reveal";
import { founderNote } from "@/content/landing";

// §4.9 — dark panel, founder note verbatim. The "Abeg…" line gets the
// italic-highlight (green on forest) treatment.
export function FounderNote() {
  return (
    <DarkPanel id="why">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
        <Reveal className="section-head">
          <p className="folio pt-2 text-forest-muted">
            {"06 · Why we're building this"}
          </p>
          <div className="max-w-2xl space-y-6 text-[19px] leading-relaxed text-forest-text">
            <p>
              <em className="italic text-green">{founderNote.abegLine}</em>
            </p>
            {founderNote.paras.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
            <p className="text-[16.5px] text-forest-muted">
              {founderNote.nameNote}
            </p>
            <p className="pt-2 font-mono text-[13px] uppercase tracking-[0.14em] text-forest-muted">
              {founderNote.signature}
            </p>
          </div>
        </Reveal>
      </div>
    </DarkPanel>
  );
}
