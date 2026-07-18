"use client";

import { useEffect, useState } from "react";
import { useInView, prefersReducedMotion } from "./useInView";

type CountUpProps = {
  value: number;
  /** Zero-pad to this many digits (§2.4 — Trust Score is 3 digits). */
  pad?: number;
  duration?: number;
  className?: string;
};

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Count-up for score numerals (§2.4): 1.1s cubic-out, mono tabular, zero-padded.
 * ReactBits: Count Up — restyled to Yami ledger tokens (§2), rebuilt dependency-free.
 */
export function CountUp({
  value,
  pad = 3,
  duration = 1100,
  className = "",
}: CountUpProps) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    // Reduced motion: show the final value immediately, no scroll dependency.
    if (prefersReducedMotion()) {
      setDisplay(value);
      return;
    }
    if (!inView) return;
    let raf = 0;
    let start: number | null = null;
    const from = 0;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setDisplay(Math.round(from + (value - from) * easeOutCubic(progress)));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span
      ref={ref}
      className={["font-mono tabular-nums", className].filter(Boolean).join(" ")}
    >
      {String(display).padStart(pad, "0")}
    </span>
  );
}
