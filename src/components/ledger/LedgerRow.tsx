import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";

/**
 * A ledger row (§2.3): `200px | 1fr | 1.4fr` — mono label | H3 | detail —
 * hairline-ruled and baseline-aligned. This replaces cards everywhere.
 */
export function LedgerRow({
  label,
  title,
  detail,
  trailing,
  dark = false,
  delay = 0,
}: {
  label: ReactNode;
  title: ReactNode;
  detail?: ReactNode;
  /** Right-aligned adornment on the detail column (e.g. a stamp). */
  trailing?: ReactNode;
  dark?: boolean;
  delay?: number;
}) {
  const muted = dark ? "text-forest-muted" : "text-ink-soft";
  const strong = dark ? "text-forest-text" : "text-ink";
  return (
    <Reveal
      delay={delay}
      className={`ledger-row ${dark ? "rule-faint-dark" : ""}`}
    >
      <div className={`col-label ${dark ? "text-forest-muted" : ""}`}>
        {label}
      </div>
      <h3 className={`text-[19px] font-bold leading-snug ${strong}`}>{title}</h3>
      <div className="flex items-start justify-between gap-4">
        {detail ? (
          <p className={`text-[15.5px] leading-relaxed ${muted}`}>{detail}</p>
        ) : (
          <span />
        )}
        {trailing ? <div className="shrink-0 pt-1">{trailing}</div> : null}
      </div>
    </Reveal>
  );
}
