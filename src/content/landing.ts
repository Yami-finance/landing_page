// §13 — approved copy, verbatim source of truth. Centralized so it's reusable
// across routes and greppable for the §1.1 Honesty Rule check. Nothing in here
// is a fabricated traction metric; the only numbers are literally true.

export const heroLead =
  "Young Nigerians already lend to each other every day — through DMs, transfers, and trust. Yami gives that lending what it's always lacked: structured agreements, repayment history, and a trust score that opens doors.";

export const heroMeta = [
  { k: "You lend. You borrow.", v: "Between real people" },
  { k: "Not a loan app", v: "We never touch the money" },
  { k: "First cohort", v: "Campus communities" },
];

export const ledgerStrip = [
  {
    date: "— · —",
    entry: "The lending your people already do",
    amount: "₦ every day",
    status: "Unrecorded",
    stamp: false,
  },
  {
    date: "— · —",
    entry: "What Yami makes of it",
    amount: "On record",
    status: "Trust ↑",
    stamp: true,
  },
];

export const problems = [
  {
    label: "Missing",
    title: "Trust data",
    detail:
      "Risk is invisible. You have no way of knowing who's reliable before you lend.",
  },
  {
    label: "Missing",
    title: "Documentation",
    detail:
      "Agreements live in chat threads. Nothing formal. Nothing enforceable.",
  },
  {
    label: "Missing",
    title: "A payment trail",
    detail:
      "Money moves with no record. When disputes come, there's nothing to point to.",
  },
  {
    label: "Missing",
    title: "Consequences",
    detail:
      "Bad actors face zero accountability. They simply move on to the next lender.",
  },
];

export const solutionLead =
  "We don't lend money, hold deposits, or set your rates. We provide the trust infrastructure that makes lending between people actually work.";

export const pillars = [
  {
    label: "a.",
    title: "Trust Score",
    detail:
      "A reputation built from real behaviour — every repayment, every agreement, every kept promise shapes your score.",
  },
  {
    label: "b.",
    title: "Structured agreements",
    detail:
      "Every loan is documented, enforceable, and signed. No more 'I thought we agreed on…'",
  },
  {
    label: "c.",
    title: "Verified people",
    detail:
      "Borrow from and lend to real, verified people — starting inside communities where reputation already matters.",
  },
];

export const factors = [
  {
    label: "i.",
    title: "Repayment rate",
    detail: "Did you pay back what you agreed?",
  },
  {
    label: "ii.",
    title: "Repayment speed",
    detail: "Did you pay on time — or early?",
  },
  {
    label: "iii.",
    title: "Agreement completion",
    detail: "Do you finish what you sign?",
  },
];

export const portability =
  "Your score is portable. It starts on Yami and grows into a financial identity that's yours — for bigger loans, better terms, and doors that were closed before.";

export const borrowSteps = [
  {
    title: "Verify your identity",
    detail:
      "BVN and photo ID — verified once through a licensed provider, trusted everywhere on Yami.",
  },
  {
    title: "Create a request",
    detail:
      "Describe what you need in plain language. Yami structures it into a formal request with clear terms.",
  },
  {
    title: "Receive offers",
    detail:
      "See offers from verified lenders — their trust score, rates, and terms, all transparent.",
  },
  {
    title: "Sign the agreement",
    detail: "Signed and documented for good. Both parties protected.",
  },
  {
    title: "Repay on time",
    detail:
      "Every on-time repayment builds your trust score. Your reputation grows with you.",
  },
];

export const lendSteps = [
  {
    title: "Verify your identity",
    detail:
      "Same bar for everyone. Lenders are verified people, not anonymous accounts.",
  },
  {
    title: "Browse requests",
    detail:
      "See verified borrowers — trust score, purpose, amount, and timeline upfront.",
  },
  {
    title: "Make an offer",
    detail:
      "Set your terms. Negotiate transparently until both sides agree.",
  },
  {
    title: "Sign the agreement",
    detail: "Every naira you lend is documented and enforceable.",
  },
  {
    title: "Get repaid",
    detail:
      "Track repayments in real time. Your lending history builds your reputation too.",
  },
];

export const statusEntries = [
  {
    id: "001",
    title: "The platform is built",
    detail:
      "The full lending engine — matching, agreements, wallets, identity verification, and the trust score — is complete and running on staging, backed by 500+ automated tests.",
    stamp: "done" as const,
    stampLabel: "Done",
  },
  {
    id: "002",
    title: "Company registered",
    detail:
      "Yami is built by Arcturian Limited, registered in Nigeria, with the legal and compliance groundwork for a lending marketplace in place.",
    stamp: "done" as const,
    stampLabel: "Done",
  },
  {
    id: "003",
    title: "Waitlist open",
    detail:
      "We're gathering the first cohort of borrowers and lenders. Early members shape the product and get first access at launch.",
    stamp: "now" as const,
    stampLabel: "Now",
  },
  {
    id: "004",
    title: "First cohort goes live",
    detail:
      "First loans launch inside a single campus community — where reputation already matters — then expand community by community, city by city.",
    stamp: "next" as const,
    stampLabel: "Next",
  },
];

export const founderNote = {
  paras: [
    "Everyone knows the message: “Abeg, I'll pay you back next week.” Sometimes they do. Sometimes they don't — and there's no record, no recourse, and no reward for the people who always keep their word.",
    "We think keeping your word should count for something. Your repayment history — proof that you're good for it — should open doors long after the loan: bigger amounts, better terms, a financial identity that's actually yours.",
    "We built the entire platform before asking anyone to sign up. Now we're inviting the first cohort in.",
  ],
  signature: "Murewa, Timi & Olu — Founders, Yami",
};

export const faqs = [
  {
    q: "Is Yami a loan app?",
    a: "No. Yami doesn't lend money, hold deposits, or set rates. We provide the infrastructure — verified identities, structured agreements, and a trust score — that lets people lend to each other safely and on the record.",
  },
  {
    q: "Who is Yami for?",
    a: "Any young Nigerian who already lends or borrows within their circle — students and young professionals alike. We're opening access community by community, starting where reputation already carries weight.",
  },
  {
    q: "When does Yami launch?",
    a: "The platform is built and running on staging. We're gathering the first cohort now and going live inside a single community first, then expanding city by city. Join the waitlist and we'll message you when your community opens.",
  },
  {
    q: "Why join the waitlist now?",
    a: "Early members shape the product and get first access when their community goes live. The earlier you join, the earlier your place in line — and the sooner your trust score starts building.",
  },
  {
    q: "Is my BVN safe?",
    a: "Yes. Your BVN is used only to verify your identity through a licensed provider. We don't store it on our servers, and verification data is encrypted in line with industry standards.",
  },
  {
    q: "What happens if someone doesn't repay?",
    a: "Their trust score drops sharply — trust breaks faster than it builds — which limits their access to borrow again. The signed agreement stands as documented proof of the debt, and repeat defaulters are flagged across the network. On Yami, behaviour has consequences.",
  },
  {
    q: "How does the trust score work?",
    a: "Your score is built from real behaviour: your repayment rate, your repayment speed, and whether you complete the agreements you sign. It starts when you verify your identity and grows with every kept promise. It's your financial reputation, made visible.",
  },
];

export const closing = "Your word is worth something. Put it on the record.";
