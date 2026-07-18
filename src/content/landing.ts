// Approved copy — source of truth. No fabricated traction (§1.1); no mention of
// the backend, staging, or internal readiness anywhere. Launch status is "Soon"
// with a wink. Written to read like a person, not a pitch deck.

export const heroLead =
  "You already lend to friends and borrow from them. It happens over WhatsApp, in bank transfers, on trust. Yami makes it real: verified people, a clear agreement, and a trust score that grows every time you keep your word.";

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
      "You can't see who's reliable. So every loan is a guess, and every guess is a risk.",
  },
  {
    label: "Missing",
    title: "Documentation",
    detail:
      "The agreement lives in a chat thread. It isn't formal, and it isn't something you can hold anyone to.",
  },
  {
    label: "Missing",
    title: "A payment trail",
    detail:
      "Money moves and leaves no trace. When something goes wrong, it's your word against theirs.",
  },
  {
    label: "Missing",
    title: "Consequences",
    detail:
      "Nobody's accountable. The person who doesn't pay just moves on to the next friend.",
  },
];

export const solutionLead =
  "We don't lend money, hold your cash, or set your rates. We give the lending you already do the things it's missing: proof of who you're dealing with, an agreement that holds, and a reputation you build as you go.";

export const pillars = [
  {
    label: "a.",
    title: "Trust Score",
    detail:
      "A reputation built from what you actually do. Every repayment and every agreement you keep makes it stronger.",
  },
  {
    label: "b.",
    title: "Structured agreements",
    detail:
      "Every loan is written down, agreed by both sides, and signed. No more 'I thought we said something else.'",
  },
  {
    label: "c.",
    title: "Verified people",
    detail:
      "You know exactly who you're dealing with. Real, verified people, starting inside communities where your name already means something.",
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
    detail: "Did you pay on time, or early?",
  },
  {
    label: "iii.",
    title: "Agreement completion",
    detail: "Do you finish what you start?",
  },
];

export const portability =
  "Your score is yours to keep. It starts on Yami and grows into a real financial reputation, the kind that earns you bigger loans, better terms, and a yes where you used to get a no.";

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
      "Built by Arcturian Limited and registered in Nigeria. Not a concept, not a maybe. A real company building this properly.",
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
    detail: "Soon. And we mean actual soon, not 'I'm outside' soon.",
    stamp: "green" as const,
    stampLabel: "Soon",
  },
];

export const founderNote = {
  paras: [
    "Everyone knows the message: “Abeg, I'll pay you back next week.” Sometimes they do. Sometimes they don't. And there's never a record, never any recourse, and never a reward for the people who always come through.",
    "We think keeping your word should count for something. Your history of paying people back is proof that you're good for it, and it should open doors long after the loan: bigger amounts, better terms, a financial name that's actually yours.",
    "We did the hard part before asking anyone to sign up. Now we're letting the first people in.",
  ],
  signature: "Murewa, Timi & Olu, Founders of Yami",
};

export const faqs = [
  {
    q: "Is Yami a loan app?",
    a: "No. Yami doesn't lend money, hold your cash, or set rates. We give people the tools to lend to each other safely: verified identities, a real agreement, and a trust score. The money is always between you and another person.",
  },
  {
    q: "Who is Yami for?",
    a: "Any young Nigerian who already lends or borrows within their circle. Students, young professionals, anyone whose word is good. We're opening up community by community, starting where reputation already matters.",
  },
  {
    q: "When does Yami launch?",
    a: "Soon. We're opening in one community first, then more, city by city. Join the waitlist and you'll be first to know when yours goes live. And when we say soon, we actually mean it.",
  },
  {
    q: "Why join the waitlist now?",
    a: "Because the earlier you join, the earlier your spot. Early members help shape the product, get in first when their community opens, and start building their trust score before everyone else.",
  },
  {
    q: "Is my BVN safe?",
    a: "Yes. Your BVN is only used to confirm you're really you, through a licensed partner. We don't keep it on our servers, and your details are encrypted.",
  },
  {
    q: "What happens if someone doesn't repay?",
    a: "Their trust score takes a real hit, which makes it harder for them to borrow again. The signed agreement is proof of the debt, and people who keep defaulting get flagged across the network. On Yami, how you behave follows you.",
  },
  {
    q: "How does the trust score work?",
    a: "It's built from what you actually do: whether you pay back what you agreed, how quickly you pay, and whether you finish the agreements you sign. It starts the day you verify yourself and grows with every promise you keep.",
  },
];

export const closing = "Your word is worth something. Put it on the record.";
