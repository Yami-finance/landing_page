"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, prefersReducedMotion } from "./useInView";

type TypewriterProps = {
  text: string;
  /** ms per character (§4: 18ms/char). */
  speed?: number;
  startDelay?: number;
  className?: string;
};

/**
 * Types its text out once on first reveal (§2.4 ledger-write). Mono elsewhere is
 * the caller's job. ReactBits: Decrypted/Scramble — replaced with a plain
 * typewriter, restyled to ledger tokens, used ONLY on the ledger strip.
 */
export function Typewriter({
  text,
  speed = 18,
  startDelay = 0,
  className = "",
}: TypewriterProps) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [shown, setShown] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    if (!inView || done.current) return;
    if (prefersReducedMotion()) {
      setShown(text.length);
      done.current = true;
      return;
    }
    let i = 0;
    let interval: ReturnType<typeof setInterval>;
    const startTimer = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setShown(i);
        if (i >= text.length) {
          clearInterval(interval);
          done.current = true;
        }
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(startTimer);
      clearInterval(interval);
    };
  }, [inView, text, speed, startDelay]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">{text.slice(0, shown)}</span>
    </span>
  );
}
