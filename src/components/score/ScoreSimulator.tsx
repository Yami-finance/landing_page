"use client";

import { useState } from "react";
import { ScoreCard } from "@/components/score/ScoreCard";
import { Button } from "@/components/ledger/Button";
import {
  DEFAULT_INPUTS,
  simulateScore,
  tierIndexFor,
  tierNameFor,
  type ScoreInputs,
} from "@/lib/score";
import { simulator, sliders, speedSteps } from "@/content/trustScore";

/** Speed is a 5-step slider; store it as 0..1 so the model stays continuous. */
const SPEED_STEP = 1 / (speedSteps.length - 1);

function speedWord(value: number): string {
  const i = Math.round(value / SPEED_STEP);
  return speedSteps[Math.max(0, Math.min(speedSteps.length - 1, i))];
}

/**
 * Interactive Trust Score simulator (the /trust-score#simulator anchor target).
 *
 * Native range inputs — keyboard support and the focus ring come for free, and
 * the project deliberately carries no motion/UI library. The score is set
 * directly rather than counted up: a 1.1s CountUp per slider tick would fight
 * the drag. ScoreCard still animates on first paint elsewhere on the page.
 */
export function ScoreSimulator() {
  const [inputs, setInputs] = useState<ScoreInputs>(DEFAULT_INPUTS);

  const score = simulateScore(inputs);
  const tier = tierNameFor(score);
  const isDefault =
    inputs.repaymentRate === DEFAULT_INPUTS.repaymentRate &&
    inputs.speed === DEFAULT_INPUTS.speed &&
    inputs.completion === DEFAULT_INPUTS.completion;

  function set(key: keyof ScoreInputs, value: number) {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
      {/* Score readout. The sr-only line is the live region — it carries the
          whole announcement. The card itself is aria-hidden so the score and
          the five tier names aren't read out a second time on every tick. */}
      <div>
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {simulator.scoreLabel}: {score}, tier {tier}
        </p>
        <div aria-hidden="true">
          <ScoreCard
            score={score}
            animate={false}
            pulseIndex={tierIndexFor(score)}
          />
        </div>

        {!isDefault && (
          <div className="mt-5">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setInputs(DEFAULT_INPUTS)}
            >
              {simulator.reset}
            </Button>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="border-t border-ink">
        {sliders.map((s) => {
          const value = inputs[s.key];
          const isSteps = s.kind === "steps";
          return (
            <div key={s.key} className="border-b border-rule py-6">
              <div className="flex items-baseline justify-between gap-4">
                <label htmlFor={`sim-${s.key}`} className="col-label">
                  {s.label}
                </label>
                <span className="font-mono text-[14px] font-medium tabular-nums text-ink">
                  {isSteps ? speedWord(value) : `${Math.round(value * 100)}%`}
                </span>
              </div>

              <input
                id={`sim-${s.key}`}
                type="range"
                min={0}
                max={1}
                step={isSteps ? SPEED_STEP : 0.01}
                value={value}
                onChange={(e) => set(s.key, Number(e.target.value))}
                aria-describedby={`sim-${s.key}-hint`}
                aria-valuetext={isSteps ? speedWord(value) : undefined}
                className="sim-range mt-1 w-full"
              />

              <p
                id={`sim-${s.key}-hint`}
                className="text-[15px] leading-relaxed text-ink-soft"
              >
                {s.hint}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
