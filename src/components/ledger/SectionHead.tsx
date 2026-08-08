import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Section header (§2.3): two-column `200px | 1fr`. Left = mono folio label
 * ("01 — THE PROBLEM"), right = display H2 (or H1 for the page's first section).
 * Stacks on ≤860px.
 */
export function SectionHead({
  folio,
  children,
  className = "",
  dark = false,
  level = "h2",
}: {
  folio: string;
  children: ReactNode;
  className?: string;
  dark?: boolean;
  /** Heading level. Use "h1" for the page's first section. */
  level?: "h1" | "h2";
}) {
  const Heading = level;
  return (
    <Reveal
      as="header"
      className={["section-head", className].filter(Boolean).join(" ")}
    >
      <p className={`folio ${dark ? "text-forest-muted" : ""} pt-2`}>{folio}</p>
      <Heading
        className={`text-balance text-[clamp(32px,4.4vw,54px)] font-extrabold leading-[1.04] ${
          dark ? "text-forest-text" : "text-ink"
        }`}
      >
        {children}
      </Heading>
    </Reveal>
  );
}
