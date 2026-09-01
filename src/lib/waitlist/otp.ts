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
  
  // Send email with Yami Ticket & Ledger design system
  try {
    const htmlContent = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${code} is your Yami code</title>
  <style type="text/css">
    @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;700;800&family=IBM+Plex+Mono:wght@400;500;600;700&family=Public+Sans:wght@400;500;600&display=swap');
    body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; background-color: #F4F2EA; }
    table, td { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #F4F2EA; font-family: 'Public Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #141711; -webkit-font-smoothing: antialiased;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F4F2EA; padding: 32px 12px 48px;">
    <tr>
      <td align="center">
        <!-- Main Container / Ticket Card -->
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 540px; background-color: #FDFCF7; border: 1.5px solid #141711; border-radius: 10px; box-shadow: 5px 5px 0px rgba(20, 23, 17, 0.14); overflow: hidden;">
          
          <!-- Ticket Header -->
          <tr>
            <td style="padding: 24px 28px 18px; background-color: #FDFCF7;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="left" style="vertical-align: middle;">
                    <table border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="background-color: #141711; width: 28px; height: 28px; border-radius: 6px; text-align: center; vertical-align: middle; color: #DFFF3B; font-family: 'IBM Plex Mono', monospace; font-size: 16px; font-weight: 800;">
                          Y
                        </td>
                        <td style="padding-left: 10px; font-family: 'Bricolage Grotesque', -apple-system, sans-serif; font-size: 22px; font-weight: 800; letter-spacing: -0.02em; color: #141711;">
                          Yami
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td align="right" style="vertical-align: middle;">
                    <span style="font-family: 'IBM Plex Mono', monospace; font-size: 10.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.14em; color: #141711; background-color: #DFFF3B; border: 1px solid #141711; padding: 4px 9px; border-radius: 4px; display: inline-block;">
                      ADMIT ONE · PILOT 01
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Perforated Line with Notches -->
          <tr>
            <td style="padding: 0; position: relative;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="border-top: 1.5px dashed #141711; height: 1px; font-size: 1px; line-height: 1px;">&nbsp;</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Ticket Body -->
          <tr>
            <td style="padding: 28px 28px 20px;">
              <p style="margin: 0 0 8px; font-family: 'IBM Plex Mono', monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em; color: #4E544A;">
                00 · Verification
              </p>
              
              <h1 style="margin: 0 0 16px; font-family: 'Bricolage Grotesque', -apple-system, sans-serif; font-size: 24px; font-weight: 800; line-height: 1.2; letter-spacing: -0.02em; color: #141711;">
                Your word is worth something.<br />
                <span style="background-color: #DFFF3B; padding: 2px 6px; box-decoration-clone: clone; display: inline;">Put it on the record.</span>
              </h1>
              
              <p style="margin: 0 0 20px; font-size: 15px; line-height: 1.6; color: #4E544A;">
                We built Yami because honest people who always pay back deserve to prove it. You shouldn't have to face predatory rates or awkward favors just to stay in school.
              </p>

              <!-- Stamped Code Box -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 22px 0 24px;">
                <tr>
                  <td align="center" style="background-color: #EDEBE1; border: 1.5px solid #141711; border-radius: 6px; padding: 20px 16px;">
                    <div style="font-family: 'IBM Plex Mono', monospace; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.22em; color: #4E544A; margin-bottom: 6px;">
                      6-Digit Access Code
                    </div>
                    <div style="font-family: 'IBM Plex Mono', monospace; font-size: 36px; font-weight: 700; letter-spacing: 8px; text-indent: 8px; color: #141711; margin: 4px 0 6px;">
                      ${code}
                    </div>
                    <div style="font-family: 'IBM Plex Mono', monospace; font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.12em; color: #8C9186;">
                      Expires in 10 minutes · Single use
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Ledger Section -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 24px 0 16px; border-top: 1.5px solid #141711;">
                <!-- Ledger Row 1 -->
                <tr>
                  <td style="padding: 14px 0; border-bottom: 1px solid #D8D5C8; vertical-align: top; width: 32px; font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: #4E544A; font-weight: 600;">
                    a.
                  </td>
                  <td style="padding: 14px 0; border-bottom: 1px solid #D8D5C8; vertical-align: top;">
                    <div style="font-size: 14.5px; font-weight: 700; color: #141711; margin-bottom: 2px;">
                      Instant Academic Clearance
                    </div>
                    <div style="font-size: 13.5px; color: #4E544A; line-height: 1.45;">
                      Principal routes directly to your university bursary so you get cleared for classes immediately.
                    </div>
                  </td>
                </tr>
                <!-- Ledger Row 2 -->
                <tr>
                  <td style="padding: 14px 0; border-bottom: 1px solid #D8D5C8; vertical-align: top; width: 32px; font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: #4E544A; font-weight: 600;">
                    b.
                  </td>
                  <td style="padding: 14px 0; border-bottom: 1px solid #D8D5C8; vertical-align: top;">
                    <div style="font-size: 14.5px; font-weight: 700; color: #141711; margin-bottom: 2px;">
                      4 Manageable Installments
                    </div>
                    <div style="font-size: 13.5px; color: #4E544A; line-height: 1.45;">
                      Tuition split into simple monthly payments. No more panic raising lump sums at the start of semester.
                    </div>
                  </td>
                </tr>
                <!-- Ledger Row 3 -->
                <tr>
                  <td style="padding: 14px 0; border-bottom: 1px solid #D8D5C8; vertical-align: top; width: 32px; font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: #4E544A; font-weight: 600;">
                    c.
                  </td>
                  <td style="padding: 14px 0; border-bottom: 1px solid #D8D5C8; vertical-align: top;">
                    <div style="font-size: 14.5px; font-weight: 700; color: #141711; margin-bottom: 2px;">
                      Build Your Trust Score
                    </div>
                    <div style="font-size: 13.5px; color: #4E544A; line-height: 1.45;">
                      Every on-time monthly repayment counts toward building a verifiable financial reputation you own.
                    </div>
                  </td>
                </tr>
              </table>

              <p style="margin: 20px 0 0; font-size: 13px; line-height: 1.5; color: #8C9186;">
                If you did not request to join the Yami waitlist on yami.finance, you can safely disregard this message.
              </p>
            </td>
          </tr>

          <!-- Ticket Footer / Endorsement -->
          <tr>
            <td style="padding: 18px 28px 22px; background-color: #EDEBE1; border-top: 1.5px solid #141711;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="left" style="vertical-align: top;">
                    <p style="margin: 0 0 4px; font-family: 'IBM Plex Mono', monospace; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; color: #141711;">
                      Lending between people, on the record.
                    </p>
                    <p style="margin: 0; font-family: 'IBM Plex Mono', monospace; font-size: 10.5px; color: #8C9186; text-transform: uppercase; letter-spacing: 0.08em;">
                      Built by Arcturian Limited · Lagos, Nigeria
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();

    await transporter.sendMail({
      from: EMAIL_FROM,
      to: email,
      subject: `${code} is your Yami verification code`,
      text: `Your Yami verification code is: ${code}\n\nThis code expires in 10 minutes.\n\nYour word is worth something. Put it on the record.\n\nYami gives everyday Nigerians access to fair, structured financing starting with educational Buy Now, Pay Later.\n\nLending between people, on the record.\nBuilt by Arcturian Limited · Lagos, Nigeria`,
      html: htmlContent,
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
