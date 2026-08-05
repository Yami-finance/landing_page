import { z } from "zod";

export const INTENTS = ["borrow", "lend", "both"] as const;
export type Intent = (typeof INTENTS)[number];

// Canonical amount-range enum + labels + midpoints (§11.3). Midpoints power the
// demand/supply-volume query Murewa needs day one.
export const AMOUNT_RANGES = [
  { value: "5-20k", label: "₦5,000 – ₦20,000", mid: 12500 },
  { value: "20-50k", label: "₦20,000 – ₦50,000", mid: 35000 },
  { value: "50-100k", label: "₦50,000 – ₦100,000", mid: 75000 },
  { value: "100k+", label: "₦100,000+", mid: 150000 },
] as const;

export const AMOUNT_RANGE_VALUES = AMOUNT_RANGES.map((r) => r.value) as [
  string,
  ...string[],
];

/**
 * Normalize a Nigerian number to E.164 (+234…). Accepts 0XXXXXXXXXX,
 * +234XXXXXXXXXX, or 234XXXXXXXXXX. Returns null if it can't be made valid.
 */
export function normalizePhone(raw: string): string | null {
  const digits = raw.replace(/[^\d+]/g, "");
  let national: string | null = null;

  if (/^\+234\d{10}$/.test(digits)) national = digits.slice(4);
  else if (/^234\d{10}$/.test(digits)) national = digits.slice(3);
  else if (/^0\d{10}$/.test(digits)) national = digits.slice(1);
  else if (/^\d{10}$/.test(digits)) national = digits;

  if (!national || !/^[789]\d{9}$/.test(national)) return null;
  return `+234${national}`;
}

export const WaitlistInput = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Enter your email")
    .email("Enter a valid email")
    .max(120),
  phone: z
    .string()
    .trim()
    .transform((v, ctx) => {
      const n = normalizePhone(v);
      if (!n) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Enter a valid Nigerian number",
        });
        return z.NEVER;
      }
      return n;
    }),
  intent: z.enum(INTENTS),
  amount_range: z.enum(AMOUNT_RANGE_VALUES),
  where: z.string().trim().min(2, "Where are you?").max(80),
  source: z.string().max(120).optional(),
});

export type WaitlistInputParsed = z.infer<typeof WaitlistInput>;
