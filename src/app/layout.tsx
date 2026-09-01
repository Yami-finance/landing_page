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
      "Yami | Peer-to-Peer Lending for Nigerians | Borrow. Lend. Build Trust.",
    template: "%s | Yami",
  },
  description:
    "Banks say no. Loan apps harass you. Yami gives you access to fair, structured credit starting with your tuition. Borrow, pay back on time, and build a trust score you own.",
  applicationName: "Yami",
  alternates: { canonical: "https://yami.finance" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Yami | Peer-to-Peer Lending for Nigerians",
    description:
      "Accessible credit, signed agreements, and a trust score for the lending Nigerians already do every day.",
    url: "https://yami.finance",
    siteName: "Yami",
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Yami | Peer-to-Peer Lending for Nigerians",
    description:
      "Accessible credit, signed agreements, and a trust score for the lending Nigerians already do every day.",
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
