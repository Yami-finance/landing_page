/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        yami: {
          deep: "#060F14",
          card: "#0B151C",
          accent: "#D2F53E",
          muted: "#8E9CA6",
          border: "#1E2D38",
        },
      },
      fontFamily: {
        sans: ["var(--font-urbanist)", "system-ui", "sans-serif"],
        sine: ["Sine", "sans-serif"],
      },
    },
  },
  plugins: [],
};
