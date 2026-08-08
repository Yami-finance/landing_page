import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { privacy } from "@/content/legal/privacy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What Yami collects when you join the waitlist, why, who else touches it, and how to have it deleted.",
};

export default function PrivacyPage() {
  return <LegalDocument doc={privacy} />;
}
