// Copy for /trust-score. Same rule as landing.ts: no fabricated traction, and
// nothing that claims the scoring model is live. The simulator is explicitly
// illustrative — that's stated on the page, not buried here.

export const intro = {
  folio: "01 · The Trust Score",
  heading: "A number that means you keep your word.",
  lead: "Your Trust Score is built from what you actually do: whether you pay back what you agreed, how quickly you pay, and whether you finish the agreements you sign. It starts the day you verify yourself and grows with every promise you keep.",
};

export const simulator = {
  folio: "02 · See how it moves",
  heading: "Move the sliders. Watch the score.",
  lead: "Three things drive the score. Drag any of them to see how the number and the tier respond.",
  reset: "Reset to typical",
  scoreLabel: "Simulated Trust Score",
};

export const sliders = [
  {
    key: "repaymentRate" as const,
    label: "Repayment rate",
    hint: "The share of what you agreed that you actually paid back.",
    kind: "percent" as const,
  },
  {
    key: "speed" as const,
    label: "Repayment speed",
    hint: "Whether you pay late, on time, or ahead of the date you agreed.",
    kind: "steps" as const,
  },
  {
    key: "completion" as const,
    label: "Agreement completion",
    hint: "The share of agreements you signed and saw through to the end.",
    kind: "percent" as const,
  },
];

/** Words for the speed slider — never show the raw 0–1 value. */
export const speedSteps = [
  "Chronically late",
  "Often late",
  "On time",
  "Usually early",
  "Consistently early",
];

export const tierNote =
  "Five tiers, from New to Elite. Each one opens up larger amounts and better terms — and the people you deal with can see it.";

export const disclaimer = {
  label: "Illustrative",
  title: "This is a demonstration, not the live model.",
  body: "The weightings here exist to show how the three factors relate to each other. The scoring model we launch with will be published before anyone is scored by it, and no score shown on this page belongs to a real person.",
};

export const cta = {
  heading: "Start building yours.",
  body: "The score begins the day you verify. Get on the waitlist and you're first in line when your community opens.",
  button: "Claim your spot →",
};
