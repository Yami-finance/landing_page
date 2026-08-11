// Approved copy — source of truth. No fabricated traction (§1.1); no mention of
// the backend, staging, or internal readiness anywhere. Launch status is "Soon"
// with a wink. Written to read like a person, not a pitch deck.
// Mirrors src/content/site-copy.json (the reference bundle for non-engineers).

export const heroLead =
  "You've lent money to someone you trusted. Maybe they paid you back. Maybe they didn't. Either way, there was no agreement, no record, and nothing you could do about it. Yami fixes that, not by being a bank, but by making the lending you already do mean something.";

export const heroSubtitle =
  "The peer-to-peer lending platform for Nigerians who already lend to each other.";

export const heroMeta = [
  { k: "You lend. You borrow.", v: "Between real people" },
  { k: "Not a loan app", v: "We never touch your money" },
  { k: "First cohort", v: "Communities, soon" },
];

export const ledgerStrip = [
  {
    date: "···",
    entry: "The lending your people already do",
    amount: "₦ every day",
    status: "Unrecorded",
    stamp: false,
  },
  {
    date: "···",
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
      "You're lending blind. No way to know if the person asking has paid anyone back before. So you go with your gut and hope.",
  },
  {
    label: "Missing",
    title: "Documentation",
    detail:
      "The agreement is a WhatsApp message. Which means it's not really an agreement at all.",
  },
  {
    label: "Missing",
    title: "A payment trail",
    detail:
      "The transfer happened. The debt didn't. Money moved but nothing was recorded. If it goes wrong, good luck proving anything.",
  },
  {
    label: "Missing",
    title: "Consequences",
    detail:
      "The person who flaked just finds another friend to ask. There's no record, no consequence, and no reason to change.",
  },
];

export const solutionHeading = "Yami doesn't lend you money.";
export const solutionHeadingHighlight = "We make lending between people work.";

export const solutionLead =
  "The money stays between you and whoever you're dealing with. What we add is everything that's been missing: proof of who you're dealing with, a real agreement, and a reputation you actually own.";

export const pillars = [
  {
    label: "a.",
    title: "Trust Score",
    detail:
      "A score built on what you actually did. Every time you pay back what you owe, it counts. Show the world you're good for it.",
  },
  {
    label: "b.",
    title: "Structured agreements",
    detail:
      "Both sides agree, both sides sign. No more 'I thought you said next month.' It's written down and it holds.",
  },
  {
    label: "c.",
    title: "Verified people",
    detail:
      "You're not lending to a stranger. Everyone on Yami is verified. Real name, real face, real accountability.",
  },
];

export const centrepieceHeading = "A number that follows your good name.";

export const factors = [
  {
    label: "i.",
    title: "Repayment rate",
    detail: "Did you pay back what you agreed?",
  },
  {
    label: "ii.",
    title: "Repayment speed",
    detail: "Did you pay on time, or early?",
  },
  {
    label: "iii.",
    title: "Agreement completion",
    detail: "Do you finish what you start?",
  },
];

export const portability =
  "Every bank has told you they don't have enough data on you. Yami builds that data from the ground up, from the real lending you already do. Pay people back consistently, and your score opens doors that were closed before.";

export const borrowSteps = [
  {
    title: "Verify your identity",
    detail:
      "BVN and a photo ID, checked once through a licensed partner. Do it once and you're trusted everywhere on Yami.",
  },
  {
    title: "Create a request",
    detail:
      "Say what you need in plain words. Yami turns it into a clear request with real terms.",
  },
  {
    title: "Receive offers",
    detail:
      "Verified lenders make you offers. You see their trust score, their rate, and their terms before you decide.",
  },
  {
    title: "Sign the agreement",
    detail: "Both of you sign. It's documented for good, and it protects you both.",
  },
  {
    title: "Repay on time",
    detail:
      "Every repayment on time lifts your score. Your reputation grows with you.",
  },
];

export const lendSteps = [
  {
    title: "Verify your identity",
    detail:
      "Everyone clears the same bar. The people you lend to are verified, not anonymous.",
  },
  {
    title: "Browse requests",
    detail:
      "See real borrowers with their trust score, what they need, and when they'll pay it back.",
  },
  {
    title: "Make an offer",
    detail: "Set your own terms and agree them out in the open.",
  },
  {
    title: "Sign the agreement",
    detail: "Every naira you lend is written down and enforceable.",
  },
  {
    title: "Get repaid",
    detail:
      "Track it in real time. Every loan you see through builds your reputation too.",
  },
];

export const statusEntries = [
  {
    id: "001",
    title: "Yami is real",
    detail:
      "Built by Arcturian Limited and registered in Nigeria. The product is built, the company is registered. We're not raising money to build it later.",
    stamp: "done" as const,
    stampLabel: "Done",
  },
  {
    id: "002",
    title: "The waitlist is open",
    detail:
      "This is where you come in. Get on the list and you're first in line when your community opens.",
    stamp: "now" as const,
    stampLabel: "Now",
  },
  {
    id: "003",
    title: "First cohort",
    detail:
      "We're starting inside one community where your name already carries weight, then opening up, city by city.",
    stamp: "next" as const,
    stampLabel: "Next",
  },
  {
    id: "004",
    title: "Launch",
    detail:
      "Launch is close. We're being deliberate about who we open to first, because trust starts in communities, not in mass rollouts.",
    stamp: "green" as const,
    stampLabel: "Soon",
  },
];

export const founderNote = {
  abegLine: "“Abeg, I'll pay you back next week.”",
  paras: [
    "We've all sent that message. We've all received it. And we've all had the experience of not knowing which version we were getting.",
    "The frustrating part isn't the money. It's that the people who always pay back have nothing to show for it. No record, no reward, no way to prove they're different from the ones who don't.",
    "We built Yami because that reputation deserves to exist. The product is built, the company is registered, and now we're letting the first people in.",
  ],
  nameNote:
    "Yami comes from Yoruba, “e ya mi”, meaning “borrow me.” It also means friend in pidgin. Both fit. The lending we're building is between people who know each other, not between strangers and algorithms.",
  signature: "Murewa, Timi & Olu, Founders of Yami",
};

export const faqs = [
  {
    q: "Is Yami a loan app or a P2P lending platform?",
    a: "Yami is a peer-to-peer lending platform, not a loan app. We don't lend money, hold your cash, or set rates. We give people the tools to lend to each other safely: verified identities, a real agreement, and a trust score. The money is always between you and another person.",
  },
  {
    q: "Who can use Yami for lending in Nigeria?",
    a: "Any young Nigerian who already lends or borrows within their circle. Students, young professionals, anyone whose word is good. We're opening up community by community, starting where reputation already matters.",
  },
  {
    q: "When is Yami launching in Nigeria?",
    a: "Soon. We're opening in one community first, then more, city by city. Join the waitlist and you'll be first to know when yours goes live.",
  },
  {
    q: "Why join the Yami waitlist now?",
    a: "You get in before the people who'll ask you to refer them later. Early members are first when their city opens, and they start building their trust score before everyone else does.",
  },
  {
    q: "Is it safe to use my BVN on Yami?",
    a: "Yes. Your BVN is only used to confirm you're really you, through a licensed partner. We don't keep it on our servers, and your details are encrypted.",
  },
  {
    q: "What happens if someone doesn't repay a loan on Yami?",
    a: "Their trust score takes a real hit, which makes it harder for them to borrow again. The signed agreement is proof of the debt, and people who keep defaulting get flagged across the network.",
  },
  {
    q: "How does Yami's trust score work?",
    a: "It's built from what you actually do: whether you pay back what you agreed, how quickly you pay, and whether you finish the agreements you sign. It starts the day you verify yourself and grows with every promise you keep.",
  },
];

export const lastEntryHeading = "Your word is worth something.";
export const lastEntryHighlight = "Put it on the record.";
export const lastEntryCta = "Claim your spot →";
