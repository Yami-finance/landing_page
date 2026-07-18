import type { ReactNode } from "react";

/**
 * Dark ledger panel (§2.5) — the bridge to the in-app dark UI. Forest bg,
 * light ink text. Max two per page (caller's discipline). Full-bleed dark rules
 * bound it top and bottom.
 */
export function DarkPanel({
  children,
  id,
  className = "",
}: {
  children: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={[
        "border-y border-ink bg-forest text-forest-text",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </section>
  );
}
