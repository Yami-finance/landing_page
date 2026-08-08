import { SectionHead } from "@/components/ledger/SectionHead";
import { Reveal } from "@/components/motion/Reveal";
import { type LegalDoc } from "@/content/legal/shared";

/**
 * Renders a legal document from the content layer. Both /legal pages share this,
 * so the two documents can never drift apart structurally.
 */
export function LegalDocument({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <section className="border-b border-ink">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-20">
          <SectionHead folio={doc.folio} level="h1">
            {doc.title}
          </SectionHead>

          <Reveal delay={60}>
            <p className="mt-8 font-mono text-[12px] uppercase tracking-[0.18em] text-faint">
              Effective {doc.effective}
            </p>
            <div className="legal-prose mt-6 max-w-2xl">
              {doc.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Body. The intro's bottom rule is this table's top rule — the rows start
          straight below it, so there's only ever one heavy line between them. */}
      <section>
        <div className="mx-auto max-w-6xl px-5 pb-16 lg:px-8 lg:pb-24">
          {doc.sections.map((s, i) => (
            <Reveal
              key={s.heading}
              delay={Math.min(i, 4) * 40}
              className="section-head border-b border-rule py-8"
            >
              <h2 className="col-label pt-1">{s.heading}</h2>
              <div className="legal-prose max-w-2xl">
                {s.body?.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                {s.list && (
                  <ul>
                    {s.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
