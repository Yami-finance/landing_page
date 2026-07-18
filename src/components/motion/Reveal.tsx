"use client";

import { createElement, type ReactNode } from "react";
import { useInView } from "./useInView";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms (§2.4: 60ms within groups). */
  delay?: number;
  as?: "div" | "section" | "li" | "article" | "header";
};

/**
 * Scroll-reveal wrapper (§2.4): opacity 0→1, translateY 16px→0, 0.55s ease.
 * The hidden state lives under the `.js` gate in globals.css, so this is a pure
 * enhancement — content is fully present without JS and never flashes empty.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  as = "div",
}: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>();

  return createElement(
    as,
    {
      ref,
      className: ["reveal", inView ? "is-visible" : "", className]
        .filter(Boolean)
        .join(" "),
      style: delay ? { transitionDelay: `${delay}ms` } : undefined,
    },
    children
  );
}
