import type { ReactNode } from "react";

export type StampState =
  | "done"
  | "now"
  | "next"
  | "recorded"
  | "green"
  | "outline";

const stateClass: Record<StampState, string> = {
  done: "stamp stamp-green",
  green: "stamp stamp-green",
  now: "stamp stamp-now",
  next: "stamp stamp-next",
  recorded: "stamp stamp-recorded",
  outline: "stamp",
};

/** Ledger stamp (§2.3). `state` picks the fill/outline/rotation treatment. */
export function Stamp({
  state = "outline",
  children,
  className = "",
}: {
  state?: StampState;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={[stateClass[state], className].filter(Boolean).join(" ")}>
      {state === "recorded" ? "✓ " : ""}
      {children}
    </span>
  );
}
