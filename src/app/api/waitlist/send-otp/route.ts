import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { rateLimit } from "@/lib/ratelimit";
import { otpEnabled, sendOtp } from "@/lib/waitlist/otp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const Body = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email").max(120),
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

  // No anon key configured — the join flow skips the OTP step entirely.
  if (!otpEnabled()) {
    return NextResponse.json({ otp: false });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = Body.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Enter a valid email." },
      { status: 422 }
    );
  }

  const sent = await sendOtp(parsed.data.email);
  if (sent.ok) return NextResponse.json({ otp: true });
  if (sent.rateLimited) {
    return NextResponse.json(
      { error: "Too many codes. Wait a minute, then try again." },
      { status: 429 }
    );
  }
  console.error("otp send failed", sent.error);
  return NextResponse.json(
    { error: "Couldn't send the code. Check the email and try again." },
    { status: 500 }
  );
}
