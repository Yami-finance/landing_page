"use client";

import { CountUp } from "@/components/motion/CountUp";
import { TIERS, tierIndexFor, tierNameFor } from "@/lib/score";

/**
 * Dark Trust Score card (§4.6 / §6). Score numeral is a mono count-up; the
 * 5-segment scale fills from the left up to the active tier (consistent with
 * the /trust-score simulator's progressive fill — the spec's "segments 3–4"
 * note described the Trusted state specifically).
 */
export function ScoreCard({
  score,
  pulseIndex = null,
  className = "",
  animate = true,
}: {
  score: number;
  /** Segment to briefly emphasise on factor hover (§4.6 interactive). */
  pulseIndex?: number | null;
  className?: string;
  /**
   * Count up to the score on first view. Off for the simulator, where the value
   * changes on every slider tick and a 1.1s count-up would fight the drag.
   */
  animate?: boolean;
}) {
  const activeIndex = tierIndexFor(score);
  const tier = tierNameFor(score);

  return (
    <div
      className={`rounded-md border border-[rgba(237,243,234,0.18)] bg-forest p-7 lg:p-8 ${className}`}
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-forest-muted">
        Trust Score
      </p>

      <div className="mt-3">
        {animate ? (
          <CountUp
            value={score}
            className="text-[clamp(56px,9vw,76px)] font-medium leading-none text-green"
          />
        ) : (
          <span className="font-mono tabular-nums text-[clamp(56px,9vw,76px)] font-medium leading-none text-green">
            {String(score).padStart(3, "0")}
          </span>
        )}
      </div>
      <p className="mt-3 font-mono text-[12px] font-semibold uppercase tracking-[0.3em] text-green">
        {tier}
      </p>

      {/* 5-segment scale */}
      <div className="mt-7 flex gap-1.5" aria-hidden="true">
        {TIERS.map((t, i) => (
          <span
            key={t.name}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              i <= activeIndex ? "bg-green" : "bg-[rgba(237,243,234,0.18)]"
            } ${pulseIndex === i ? "scale-y-[2.2] bg-green" : ""}`}
          />
        ))}
      </div>
      <div className="mt-3 flex justify-between gap-1">
        {TIERS.map((t, i) => (
          <span
            key={t.name}
            className={`font-mono text-[10px] uppercase tracking-[0.08em] ${
              i === activeIndex
                ? "font-semibold text-green"
                : i <= activeIndex
                  ? "text-green/70"
                  : "text-forest-muted"
            }`}
          >
            {t.name}
          </span>
        ))}
      </div>
    </div>
  );
}
