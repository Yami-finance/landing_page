import {
  CONTACT_EMAIL,
  COMPANY,
  COMPANY_LOCATION,
  type LegalDoc,
} from "./shared";

// Grounded in the actual code: schema.ts defines the fields, store.ts writes them,
// analytics.ts is a no-op until a provider loads, ratelimit.ts hashes the IP.
// If any of those change, this document must change with them.

export const privacy: LegalDoc = {
  folio: "Legal · 01",
  title: "Privacy Policy",
  effective: "6 August 2026",
  intro: [
    `Yami is operated by ${COMPANY}, a company registered in Nigeria and based in ${COMPANY_LOCATION}. ${COMPANY} is the data controller for the personal data described here.`,
    "Yami has not launched. Today this website does one thing: it takes waitlist signups. This policy describes what we collect for that, why, and what you can ask us to do about it. It also flags what will change at launch, so nothing arrives as a surprise.",
  ],
  sections: [
    {
      heading: "What we collect right now",
      body: [
        "When you join the waitlist, you give us:",
      ],
      list: [
        "Your name.",
        "Your email address.",
        "Your phone number, which we store in international format (+234…). We use it as the unique key for your place in line, so one number holds one spot.",
        "Whether you want to borrow, lend, or both.",
        "The amount range you selected.",
        "The school or city you told us you're in.",
        "Which page you signed up from.",
      ],
    },
    {
      heading: "What we collect automatically",
      body: [
        "Two things are recorded by the server rather than typed by you:",
      ],
      list: [
        "Your browser's user-agent string, which describes your device and browser. We keep it to tell real signups from automated ones.",
        "A one-way cryptographic hash of your IP address, used to limit how many signups can come from one place in a minute. We do not store your IP address itself, and a hash cannot be reversed back into one. The hash is deleted within an hour of the time window it applies to closing.",
      ],
    },
    {
      heading: "What we do not collect yet",
      body: [
        "At launch, verifying your identity will involve your BVN and a photo ID, checked through a licensed verification partner. None of that happens today, and the waitlist asks for none of it.",
        "When it does happen: your BVN will be used only to confirm you are who you say you are. We will not store your BVN on our servers. That check runs through the licensed partner, and we keep the result of the check, not the number itself.",
      ],
    },
    {
      heading: "Why we are allowed to hold this",
      body: [
        "Our lawful basis under the Nigeria Data Protection Act 2023 is your consent, which you give by submitting the waitlist form. You can withdraw it at any time, and withdrawing it means we delete your record.",
        "We ask for the minimum that makes the waitlist work. The intent and amount-range answers exist so we can open the right communities in a sensible order, not to build a profile of you.",
      ],
    },
    {
      heading: "What we use it for",
      body: [
        "One purpose: to contact you when Yami opens in your community, and to work out which communities to open first.",
        "We said on the signup form that we would message you on WhatsApp when your cohort opens. That is what your phone number is for. We will not use it to send you unrelated marketing, and we do not sell or rent your details to anyone.",
      ],
    },
    {
      heading: "Who else touches your data",
      body: [
        "Supabase, which provides the hosted database your record is stored in. They process it on our instructions and have no independent right to use it.",
        "Nobody else at present. This site currently loads no analytics, no advertising trackers, and no third-party cookies. If we add an analytics provider later, we will update this section before switching it on, and we will choose one that does not require us to hand over your identifying details.",
      ],
    },
    {
      heading: "Where your data is held",
      body: [
        "Our database is hosted by Supabase, which may store and process data on servers outside Nigeria. That means your personal data may be transferred out of the country.",
        "Where the destination is not covered by an adequacy decision, we rely on your consent and on contractual protections with the provider. If you would prefer your data not to leave Nigeria, we cannot currently offer that, and the right response is to ask us to delete your record.",
      ],
    },
    {
      heading: "How long we keep it",
      body: [
        "Until Yami opens in your community and you either join or tell us you are not interested — or until you ask us to delete it, whichever comes first.",
        "If we abandon the waitlist or the product, we delete the whole table. We will not quietly hold your details indefinitely against some future use.",
      ],
    },
    {
      heading: "Your rights",
      body: [
        "Under the Nigeria Data Protection Act 2023 you can ask us to:",
      ],
      list: [
        "Tell you what we hold about you, and give you a copy.",
        "Correct anything that is wrong.",
        "Delete your record entirely.",
        "Stop processing your data, or object to a particular use of it.",
        "Hand your data over in a portable form.",
        "Withdraw the consent you gave, with no penalty and no questions asked.",
      ],
    },
    {
      heading: "How to exercise them",
      body: [
        `Email ${CONTACT_EMAIL} from the address you signed up with, or tell us the phone number you used. We will respond within 30 days, and normally much sooner — the waitlist is small and the request is usually a one-line database change.`,
        "If you are not satisfied with how we handle it, you can complain to the Nigeria Data Protection Commission.",
      ],
    },
    {
      heading: "How we protect it",
      body: [
        "Your record sits in a Postgres database with row-level security switched on, reachable only by our server using a secret key that is never sent to your browser. Traffic to this site is encrypted in transit.",
        "We are not going to claim this is unbreakable. It is a waitlist for a product that has not launched, and we have deliberately kept the amount of data worth stealing small.",
      ],
    },
    {
      heading: "Children",
      body: [
        "Yami is intended for adults. We do not knowingly collect data from children. If you believe a child has signed up, tell us and we will remove the record.",
      ],
    },
    {
      heading: "Changes",
      body: [
        "When we change this policy we will update the effective date at the top. If a change materially affects what we do with data we already hold — particularly at launch, when identity verification begins — we will contact people on the waitlist rather than rely on you noticing.",
      ],
    },
    {
      heading: "Contact",
      body: [
        `${COMPANY}, ${COMPANY_LOCATION}. Email ${CONTACT_EMAIL} for anything in this document.`,
      ],
    },
  ],
};
