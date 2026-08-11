import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { TicketFormWithParams } from "@/components/waitlist/TicketFormWithParams";

export const metadata: Metadata = {
  title: "Get early access",
  description:
    "Claim your place in line for Yami, lending between people, on the record.",
};

// §11.2 — the ticket, centered and larger, on plain ruled paper. Nothing else
// competes for attention on this page.
export default function WaitlistPage() {
  return (
    <main className="min-h-screen bg-paper">
      <div className="mx-auto flex min-h-screen max-w-lg flex-col px-5 py-8">
        <div className="flex items-center justify-between">
          <Logo />
          <Link
            href="/"
            className="font-mono text-[12px] uppercase tracking-[0.14em] text-ink-soft hover:text-ink"
          >
            ← Back
          </Link>
        </div>

        <div className="flex flex-1 flex-col justify-center py-10">
          <h1 className="mb-8 text-center text-[clamp(38px,7vw,56px)] font-extrabold leading-[1.04] text-ink">
            Get early access.
          </h1>
          <TicketFormWithParams source="/waitlist" />
          <p className="mt-8 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
            Built by Arcturian Limited · Lagos, Nigeria
          </p>
        </div>
      </div>
    </main>
  );
}
