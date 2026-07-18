import type { Metadata } from "next";
import { Bricolage_Grotesque, Public_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

// §2.2 — Display / Body / Data. Self-hosted via next/font (preconnect-free,
// display:swap, zero layout shift), which satisfies the §2.6 perf floor.
const disp = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-disp",
  display: "swap",
});

const body = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yami.ng"),
  title: {
    default: "Yami — Lending between people, on the record.",
    template: "%s — Yami",
  },
  description:
    "Yami gives the lending young Nigerians already do what it's always lacked: structured agreements, repayment history, and a trust score that opens doors. Not a loan app.",
  openGraph: {
    title: "Yami — Lending between people, on the record.",
    description:
      "Structured agreements, repayment history, and a trust score for the lending young Nigerians already do.",
    url: "https://yami.ng",
    siteName: "Yami",
    locale: "en_NG",
    type: "website",
  },
};

// Sets the `.js` gate before paint so scroll-reveal states only apply when
// JavaScript is present — no flash of empty content, fully readable without JS.
const jsGate = `document.documentElement.classList.add('js')`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${disp.variable} ${body.variable} ${mono.variable}`}
      // The jsGate script below adds the `js` class before hydration; that's an
      // intentional pre-paint DOM change, so tell React not to flag it.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsGate }} />
      </head>
      <body className="font-body">{children}</body>
    </html>
  );
}
