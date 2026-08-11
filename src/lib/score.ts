// Trust Score tiers (§6). Single source of truth for the landing card and the
// /trust-score simulator so both stay consistent.
export const TIERS = [
  { name: "New", min: 0 },
  { name: "Building", min: 400 },
  { name: "Reliable", min: 600 },
  { name: "Trusted", min: 750 },
  { name: "Elite", min: 850 },
] as const;

export const SCORE_MIN = 300;
export const SCORE_MAX = 900;

export function tierIndexFor(score: number): number {
  let idx = 0;
  for (let i = 0; i < TIERS.length; i += 1) {
    if (score >= TIERS[i].min) idx = i;
  }
  return idx;
}

export function tierNameFor(score: number): string {
  return TIERS[tierIndexFor(score)].name;
}

export function clampScore(score: number): number {
  return Math.max(SCORE_MIN, Math.min(SCORE_MAX, score));
}

// ─────────────────────────────────────────────────────────────────────────────
// Simulator — illustrative model (the real one doesn't exist yet).
// ─────────────────────────────────────────────────────────────────────────────
export type ScoreInputs = {
  repaymentRate: number; // 0..1 — share of agreed amount actually repaid
  speed: number; // 0..1 — 0 = chronically late, 1 = consistently early
  completion: number; // 0..1 — share of signed agreements closed clean
};

export const WEIGHTS = {
  repaymentRate: 0.55,
  speed: 0.25,
  completion: 0.2,
} as const;

/**
 * Illustrative scoring model. Repayment rate carries the most weight because
 * "did you pay it back" is the question the score answers.
 */
export function simulateScore(i: ScoreInputs): number {
  const normalized =
    WEIGHTS.repaymentRate * i.repaymentRate +
    WEIGHTS.speed * i.speed +
    WEIGHTS.completion * i.completion;
  return clampScore(Math.round(SCORE_MIN + (SCORE_MAX - SCORE_MIN) * normalized));
}

/**
 * Default preset — the "typical" reliable borrower.
 *
 * INVARIANT: simulateScore(DEFAULT_INPUTS) === 791, the same number shown on the
 * landing page (Centrepiece.tsx). Two pages quoting different "typical" scores is
 * exactly the drift the content layer exists to prevent. If you change WEIGHTS or
 * these defaults, re-solve so the product stays 791 — or change both places.
 */
export const DEFAULT_INPUTS: ScoreInputs = {
  repaymentRate: 0.92, // 92% of what was agreed
  speed: 0.5, // "On time" — the middle step
  completion: 0.94, // 94% of signed agreements closed clean
};

/**
 * The score quoted on the landing page and opened on by the simulator.
 *
 * Derived, not typed in, so the two can't drift: Centrepiece imports this rather
 * than hardcoding a numeral. Change WEIGHTS or DEFAULT_INPUTS and both move together.
 */
export const SHOWCASE_SCORE = simulateScore(DEFAULT_INPUTS);

// The published number is 791. If a weights change moves it, that's a copy decision
// (the homepage headline number changes), not a silent one — so say so in dev.
if (process.env.NODE_ENV !== "production" && SHOWCASE_SCORE !== 791) {
  console.warn(
    `[score] Showcase score is now ${SHOWCASE_SCORE}, was 791. ` +
      `The homepage number moves with it — confirm that's intended.`
  );
}
