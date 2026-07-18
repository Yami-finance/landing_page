/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // Palette is REPLACED, not extended — the §2.1 Ledger tokens are the only
    // colors that exist. Any off-token color (gray-500, emerald, etc.) fails to
    // compile, which makes token drift impossible.
    colors: {
      transparent: "transparent",
      current: "currentColor",
      inherit: "inherit",
      paper: "#F4F2EA",
      "paper-2": "#EDEBE1",
      card: "#FDFCF7",
      ink: "#141711",
      "ink-soft": "#4E544A",
      faint: "#8C9186",
      green: "#DFFF3B",
      "green-ink": "#3D4A00",
      forest: "#16301F",
      // The brand's own dark (from the brand card) — used ONLY on the hero
      // brand panel. Distinct from --forest.
      "brand-dark": "#101315",
      // On-forest text tokens (§2.5) — kept on-palette so dark panels never
      // reach for arbitrary values.
      "forest-text": "#EDF3EA",
      "forest-muted": "#AEBFB2",
      rule: "#D8D5C8",
    },
    fontFamily: {
      disp: ["var(--font-disp)", "sans-serif"],
      body: ["var(--font-body)", "system-ui", "sans-serif"],
      mono: ["var(--font-mono)", "ui-monospace", "monospace"],
    },
    extend: {
      boxShadow: {
        // Hard offset shadows only — the paper never gets a soft glow (§2.3).
        ticket: "6px 6px 0 rgba(20,23,17,0.12)",
        "btn-hover": "3px 3px 0 var(--green)",
        "btn-ghost-hover": "3px 3px 0 var(--ink)",
      },
      transitionTimingFunction: {
        thump: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
};
