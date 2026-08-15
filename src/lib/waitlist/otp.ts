import { createTransport } from "nodemailer";

const URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const EMAIL_FROM = process.env.EMAIL_FROM || "Yami <noreply@yami.finance>";

export function otpEnabled(): boolean {
  return Boolean(URL && SERVICE_KEY && SMTP_HOST && SMTP_USER && SMTP_PASS);
}

async function supabaseClient() {
  const { createClient } = await import("@supabase/supabase-js");
  return createClient(URL as string, SERVICE_KEY as string, {
    auth: { persistSession: false },
  });
}

// Ensure SMTP_PORT is converted to a number properly for Nodemailer
const port = Number(SMTP_PORT) || 465;

const transporter = createTransport({
  host: SMTP_HOST,
  port: port,
  secure: port === 465,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

export type OtpResult = { ok: boolean; rateLimited?: boolean; error?: string };

export async function sendOtp(email: string): Promise<OtpResult> {
  if (!otpEnabled()) return { ok: false, error: "OTP not configured" };
  
  const supabase = await supabaseClient();
  
  // Generate 6 digit code
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  
  // Expiry (10 minutes)
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();
  
  // Upsert to DB
  const { error: dbError } = await supabase
    .from("otps")
    .upsert({ email, otp: code, expires_at: expiresAt });
    
  if (dbError) {
    console.error("Failed to store OTP:", dbError);
    return { ok: false, error: "Failed to generate code." };
  }
  
  // Send email
  try {
    await transporter.sendMail({
      from: EMAIL_FROM,
      to: email,
      subject: `${code} is your Yami verification code`,
      text: `Your verification code for Yami is ${code}. It expires in 10 minutes.`,
      html: `<p>Your verification code for Yami is <strong>${code}</strong>.</p><p>It expires in 10 minutes.</p>`
    });
    return { ok: true };
  } catch (err: unknown) {
    console.error("Failed to send email:", err);
    return { ok: false, error: "Failed to send email." };
  }
}

export async function verifyOtp(email: string, token: string): Promise<OtpResult> {
  const supabase = await supabaseClient();
  
  const { data, error } = await supabase
    .from("otps")
    .select("*")
    .eq("email", email)
    .maybeSingle();
    
  if (error || !data) {
    return { ok: false, error: "Code not found." };
  }
  
  if (data.otp !== token) {
    return { ok: false, error: "That code didn't match. Try again." };
  }
  
  if (new Date(data.expires_at) < new Date()) {
    return { ok: false, error: "Code expired. Request a new one." };
  }
  
  // Delete after successful verification
  await supabase.from("otps").delete().eq("email", email);
  
  return { ok: true };
}
