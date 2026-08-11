// Email OTP verification via Supabase Auth. Uses the PUBLIC anon key (never the
// service-role key): signInWithOtp / verifyOtp are user-facing GoTrue endpoints.
// When SUPABASE_ANON_KEY is unset the flow is disabled and the waitlist falls
// back to a direct insert.
//
// Dashboard setup: Authentication → Email → enable, and the "Magic Link" email
// template must include {{ .Token }} so the 6-digit code appears in the mail.

const URL = process.env.SUPABASE_URL;
const ANON = process.env.SUPABASE_ANON_KEY;

export function otpEnabled(): boolean {
  return Boolean(URL && ANON);
}

async function authClient() {
  const { createClient } = await import("@supabase/supabase-js");
  return createClient(URL as string, ANON as string, {
    auth: { persistSession: false },
  });
}

export type OtpResult = { ok: boolean; rateLimited?: boolean; error?: string };

export async function sendOtp(email: string): Promise<OtpResult> {
  const supabase = await authClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { shouldCreateUser: true },
  });
  if (!error) return { ok: true };
  if (/60 seconds|after .* seconds|rate limit/i.test(error.message)) {
    return { ok: false, rateLimited: true, error: error.message };
  }
  return { ok: false, error: error.message };
}

export async function verifyOtp(
  email: string,
  token: string
): Promise<OtpResult> {
  const supabase = await authClient();
  const { error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "email",
  });
  return error ? { ok: false, error: error.message } : { ok: true };
}
