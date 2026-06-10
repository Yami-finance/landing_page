import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yami — Your Financial Reputation, Finally Visible",
  description:
    "Yami formalizes student lending networks across Nigerian campuses with trust scores and structured agreements.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={urbanist.variable}>
      <body className="font-sans overflow-x-hidden">{children}</body>
    </html>
  );
}
