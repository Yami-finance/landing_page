import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { WaitlistInput } from "@/lib/waitlist/schema";
import { addToWaitlist } from "@/lib/waitlist/store";
import { otpEnabled, verifyOtp } from "@/lib/waitlist/otp";
import { rateLimit } from "@/lib/ratelimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ConfirmBody = WaitlistInput.extend({
  otp: z.string().trim().max(6).optional(),
});

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(req: NextRequest) {
  const ip = clientIp(req);
  const rl = rateLimit(ip);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Too many requests. Try again shortly." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = ConfirmBody.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Check your details.", fields: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const otpOn = otpEnabled();
  if (otpOn) {
    const token = parsed.data.otp ?? "";
    if (token.length !== 6) {
      return NextResponse.json(
        { error: "Enter the code we sent you." },
        { status: 422 }
      );
    }
    const v = await verifyOtp(parsed.data.email, token);
    if (!v.ok) {
      return NextResponse.json(
        { error: "That code didn't match. Try again." },
        { status: 422 }
      );
    }
  }

  try {
    const ua = (req.headers.get("user-agent") ?? "").slice(0, 250);
    const { otp, ...details } = parsed.data;
    void otp;
    const { position, already } = await addToWaitlist({
      ...details,
      email_verified: otpOn,
      ua,
    });
    return NextResponse.json({ position, already });
  } catch (err) {
    console.error("waitlist insert failed", err);
    return NextResponse.json(
      { error: "Couldn't record that, try again." },
      { status: 500 }
    );
  }
}
