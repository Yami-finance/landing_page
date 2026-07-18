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
