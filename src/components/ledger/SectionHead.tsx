import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Section header (§2.3): two-column `200px | 1fr`. Left = mono folio label
 * ("01 — THE PROBLEM"), right = display H2. Stacks on ≤860px.
 */
export function SectionHead({
  folio,
  children,
  className = "",
  dark = false,
}: {
  folio: string;
  children?: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <Reveal
      as="header"
      className={["section-head", className].filter(Boolean).join(" ")}
    >
      <p className={`folio ${dark ? "text-forest-muted" : ""} pt-2`}>{folio}</p>
      {children && (
        <h2
          className={`text-balance text-[clamp(32px,4.4vw,54px)] font-extrabold leading-[1.04] ${
            dark ? "text-forest-text" : "text-ink"
          }`}
        >
          {children}
        </h2>
      )}
    </Reveal>
  );
}
