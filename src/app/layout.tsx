import type { Metadata } from "next";
import { Bricolage_Grotesque, Public_Sans, IBM_Plex_Mono } from "next/font/google";
import { faqs } from "@/content/landing";
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

// FAQ structured data (§ SEO) — generated from the same copy the FAQ renders,
// so the schema and the page can never disagree.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export const metadata: Metadata = {
  metadataBase: new URL("https://yami.finance"),
  title: {
    default:
      "Yami | P2P Lending Between Friends in Nigeria | Borrow. Lend. Build Trust.",
    template: "%s | Yami",
  },
  description:
    "You already lend money to people you trust. Yami makes it official, verified identities, a real agreement, and a trust score that grows every time you keep your word.",
  applicationName: "Yami",
  alternates: { canonical: "https://yami.finance" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Yami | P2P Lending Between Friends in Nigeria",
    description:
      "Verified identities, signed agreements, and a trust score for the lending young Nigerians already do between friends.",
    url: "https://yami.finance",
    siteName: "Yami",
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Yami | P2P Lending Between Friends in Nigeria",
    description:
      "Verified identities, signed agreements, and a trust score for the lending young Nigerians already do between friends.",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body className="font-body">{children}</body>
    </html>
  );
}
