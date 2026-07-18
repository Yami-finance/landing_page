"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { TicketForm } from "./TicketForm";
import { INTENTS, type Intent } from "@/lib/waitlist/schema";

function Inner({ source }: { source: string }) {
  const sp = useSearchParams();
  const raw = sp.get("intent");
  const intent = (INTENTS as readonly string[]).includes(raw ?? "")
    ? (raw as Intent)
    : "both";
  return <TicketForm defaultIntent={intent} source={source} />;
}

/** Ticket that reads an `?intent=borrow|lend|both` preset (§7/§8/§11.2). */
export function TicketFormWithParams({ source = "/waitlist" }: { source?: string }) {
  return (
    <Suspense fallback={<TicketForm source={source} />}>
      <Inner source={source} />
    </Suspense>
  );
}
