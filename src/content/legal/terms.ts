import {
  CONTACT_EMAIL,
  COMPANY,
  COMPANY_LOCATION,
  type LegalDoc,
} from "./shared";

// The "not a lender" framing here must stay consistent with the footer disclaimer
// and the "Is Yami a loan app?" FAQ answer. Those three say the same thing in three
// places; if one changes, change all three.

export const terms: LegalDoc = {
  folio: "Legal · 02",
  title: "Terms of Use",
  effective: "6 August 2026",
  intro: [
    `These terms cover your use of yami.ng, operated by ${COMPANY} (registered in Nigeria, based in ${COMPANY_LOCATION}).`,
    "Yami has not launched. At the moment this website is an information page and a waitlist form, so these terms are correspondingly short. They will be replaced with fuller terms before anyone can lend or borrow through Yami, and you will be asked to agree to those separately.",
  ],
  sections: [
    {
      heading: "Agreeing to these terms",
      body: [
        "By using this website or joining the waitlist, you agree to what follows. If you do not, please do not use the site.",
      ],
    },
    {
      heading: "What Yami is",
      body: [
        "Yami is infrastructure for lending that already happens between people. We intend to provide verified identities, structured agreements both sides sign, and a trust score built from repayment behaviour.",
      ],
    },
    {
      heading: "What Yami is not",
      body: [
        "This matters more than anything else in this document, so it is stated plainly:",
      ],
      list: [
        "Yami is not a lender. We do not lend you money.",
        "Yami is not a deposit-taking institution, and we are not a bank.",
        "We never hold, receive, or move your money. Funds move directly between the two people in an agreement.",
        "We do not set interest rates or terms. The people in the agreement set those between themselves.",
        "Nothing on this site is financial, legal, or investment advice.",
      ],
    },
    {
      heading: "The waitlist, specifically",
      body: [
        "Joining the waitlist is not a contract, and it does not oblige either of us to anything:",
      ],
      list: [
        "It does not guarantee you access to Yami, at any particular time or at all.",
        "The position number we show you reflects the order of signups at that moment. It is an indication, not a promise, and not a property right.",
        "We may open communities in any order we judge sensible, and we may change that order.",
        "You are committing to nothing. You can ask us to remove you at any time.",
        "We may decline or remove a signup that appears automated, duplicated, or abusive.",
      ],
    },
    {
      heading: "Who can use this",
      body: [
        "Yami is for adults. You must be legally able to enter contracts in Nigeria. The information you give us must be true, and the phone number and email must be yours.",
      ],
    },
    {
      heading: "Using the site properly",
      body: ["Please do not:"],
      list: [
        "Submit signups automatically, in bulk, or on someone else's behalf without their knowledge.",
        "Try to get around the rate limits, or interfere with how the site runs.",
        "Attempt to access data, accounts, or systems that are not yours.",
        "Copy the site's design, code, or written content for your own product.",
      ],
    },
    {
      heading: "Our content",
      body: [
        `The Yami name, logo, wording, and the design of this site belong to ${COMPANY}. You may read, share, and link to the pages. You may not reuse the material as your own.`,
      ],
    },
    {
      heading: "No warranty",
      body: [
        "The site is provided as it is. We do not promise it will always be available or free of errors. Anything we say here about how Yami will work at launch is a statement of intent about a product still being built, and details may change.",
      ],
    },
    {
      heading: "Limits on our liability",
      body: [
        "To the extent the law allows, we are not liable for indirect or consequential loss arising from your use of this website, or from any delay in launching, or from Yami never launching in your area.",
        "Nothing here excludes liability that cannot lawfully be excluded, including for fraud.",
      ],
    },
    {
      heading: "Privacy",
      body: [
        "How we handle your personal data is set out in our Privacy Policy, which forms part of these terms.",
      ],
    },
    {
      heading: "Changes",
      body: [
        "We may update these terms; the effective date at the top will change when we do. Substantially fuller terms will apply once lending goes live, and we will not apply those to you silently.",
      ],
    },
    {
      heading: "Governing law",
      body: [
        "These terms are governed by the laws of the Federal Republic of Nigeria, and the Nigerian courts have jurisdiction over any dispute.",
      ],
    },
    {
      heading: "Contact",
      body: [
        `${COMPANY}, ${COMPANY_LOCATION}. Email ${CONTACT_EMAIL} with any question about these terms.`,
      ],
    },
  ],
};
