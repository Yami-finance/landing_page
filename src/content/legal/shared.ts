// Shared scaffolding for the legal pages.
//
// The drafts in privacy.ts and terms.ts were written against what the code
// actually does today (src/lib/waitlist/{schema,store}.ts, src/lib/analytics.ts,
// src/lib/ratelimit.ts). If any of those change, these documents must change too.

export type LegalSection = {
  heading: string;
  /** Paragraphs. */
  body?: string[];
  /** Rendered as a bulleted list after the paragraphs. */
  list?: string[];
};

export type LegalDoc = {
  folio: string;
  title: string;
  effective: string;
  intro: string[];
  sections: LegalSection[];
};

/** Read by both documents — change the address here only. */
export const CONTACT_EMAIL = "privacy@yami.finance";

export const COMPANY = "Arcturian Limited";
export const COMPANY_LOCATION = "Lagos, Nigeria";

/** Internal notes for a reviewing lawyer. Not rendered on the page. */
export const openQuestions = [
  "Retention period for waitlist records if a cohort never opens in someone's area.",
  "Whether Yami's processing volume triggers the NDPA data-protection-officer designation requirement, and registration with the NDPC.",
  "Whether WhatsApp as the notification channel needs its own separate consent line at the point of signup, given Meta is a further processor.",
  "Whether the pre-launch waitlist requires a data-processing agreement with Supabase, and which hosting region should be pinned.",
  "Minimum age: the documents say 'adults' without a number. The first cohort is a university community where some students are 16–17, so confirm what age the terms should actually require.",
  "Whether the 'not a lender or deposit-taker' framing needs specific CBN wording to be relied on.",
];
