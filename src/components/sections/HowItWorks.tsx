"use client";

import { useState } from "react";

const borrowSteps = [
  {
    title: "Verify Your Identity",
    description:
      "School email, BVN, and photo ID — verified once, trusted everywhere.",
    icon: "👤",
  },
  {
    title: "Create a Request",
    description:
      "Describe your need in plain language. Our AI structures it into a formal request.",
    icon: "✎",
  },
  {
    title: "Receive Offers",
    description:
      "See offers from verified lenders — their trust score, rates, and terms, all transparent.",
    icon: "💬",
  },
  {
    title: "Sign the Agreement",
    description:
      "Biometric signature. Documented forever. Both parties protected.",
    icon: "📋",
  },
  {
    title: "Repay On Time",
    description:
      "Every on-time repayment builds your trust score. Your reputation grows with you.",
    icon: "↩",
  },
];

const lendSteps = [
  {
    title: "Verify Your Identity",
    description:
      "School email, BVN, and photo ID — verified once, trusted everywhere.",
    icon: "👤",
  },
  {
    title: "Browse Requests",
    description:
      "Filter by campus, amount, and trust score. See full borrower profiles before you commit.",
    icon: "⌕",
  },
  {
    title: "Make an Offer",
    description:
      "Set your rate and terms. Our AI helps you stay within fair market range.",
    icon: "💬",
  },
  {
    title: "Sign the Agreement",
    description:
      "Biometric signature. Documented forever. Both parties protected.",
    icon: "📋",
  },
  {
    title: "Track Repayment",
    description:
      "Get notified on due dates. Every successful lend builds your lender reputation.",
    icon: "✓",
  },
];

export function HowItWorks() {
  const [mode, setMode] = useState<"borrow" | "lend">("borrow");
  const steps = mode === "borrow" ? borrowSteps : lendSteps;

  return (
    <section
      id="how-it-works"
      className="bg-yami-deep py-20 lg:py-28"
      aria-label="How it works"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-yami-accent">
            How It Works
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Simple. Structured. Secure.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-yami-muted">
            Whether you&apos;re borrowing or lending, Yami guides you through
            every step.
          </p>
        </div>

        {/* Toggle */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex rounded-full border border-yami-border bg-yami-card/60 p-1 backdrop-blur-md">
            <button
              type="button"
              onClick={() => setMode("borrow")}
              className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-colors ${
                mode === "borrow"
                  ? "bg-yami-accent text-yami-deep"
                  : "text-white hover:text-yami-accent"
              }`}
            >
              I want to borrow
            </button>
            <button
              type="button"
              onClick={() => setMode("lend")}
              className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-colors ${
                mode === "lend"
                  ? "bg-yami-accent text-yami-deep"
                  : "text-white hover:text-yami-accent"
              }`}
            >
              I want to lend
            </button>
          </div>
        </div>

        {/* Steps */}
        <div className="mt-16">
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute left-0 right-0 top-5 h-px bg-yami-border" />
              <div className="grid grid-cols-5 gap-4">
                {steps.map((step, i) => (
                  <div key={step.title} className="relative text-center">
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-yami-accent text-sm font-bold text-yami-deep">
                      {i + 1}
                    </div>
                    <div className="mt-4 text-yami-accent">{step.icon}</div>
                    <h3 className="mt-2 text-sm font-bold text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-yami-muted">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:hidden">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="rounded-xl border border-yami-border bg-yami-card/60 p-5 backdrop-blur-md"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-yami-accent text-sm font-bold text-yami-deep">
                    {i + 1}
                  </span>
                  <h3 className="font-bold text-white">{step.title}</h3>
                </div>
                <p className="mt-3 text-sm text-yami-muted">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
