import type { ReactNode } from "react";

/**
 * Highlighter sweep (§2.3). Green bar behind the lower ~40% of the phrase.
 * When rendered inside a <Reveal>, it draws on left→right (§2.4). Max one per
 * viewport-height of content — that's a discipline the caller keeps, not code.
 */
export function Highlight({ children }: { children: ReactNode }) {
  return <span className="hl">{children}</span>;
}
