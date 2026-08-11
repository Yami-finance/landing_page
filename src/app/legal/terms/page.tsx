import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { terms } from "@/content/legal/terms";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The terms covering yami.ng and the waitlist. Yami is not a lender, not a deposit-taker, and never holds your money.",
};

export default function TermsPage() {
  return <LegalDocument doc={terms} />;
}
