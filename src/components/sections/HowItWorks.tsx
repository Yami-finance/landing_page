"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import howItWorksBg from "@/assets/images/how-it-works-bg.svg";

type Step = {
  title: string;
  description: string;
  icon: ReactNode;
};

const borrowSteps: Step[] = [
  {
    title: "Verify Your Identity",
    description:
      "School email, BVN, and photo ID — verified once, trusted everywhere.",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" />
      </svg>
    ),
  },
  {
    title: "Create a Request",
    description:
      "Describe your need in plain language. Our AI structures it into a formal request.",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L8 18l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    title: "Receive Offers",
    description:
      "See offers from verified lenders — their trust score, rates, and terms, all transparent.",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path d="M21 12a8.5 8.5 0 01-8.5 8.5H6l-4 3 1.5-5.5A8.5 8.5 0 1112.5 3.5 8.4 8.4 0 0121 12z" />
        <path d="M8 12h8M8 9h5" />
      </svg>
    ),
  },
  {
    title: "Sign the Agreement",
    description:
      "Biometric signature. Documented forever. Both parties protected.",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <path d="M14 2v6h6M9 15l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Repay On Time",
    description:
      "Every on-time repayment builds your trust score. Your reputation grows with you.",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path d="M12 19V5M7 10l5-5 5 5" />
      </svg>
    ),
  },
];

const lendSteps: Step[] = [
  {
    title: "Verify Your Identity",
    description:
      "School email, BVN, and photo ID — verified once, trusted everywhere.",
    icon: borrowSteps[0].icon,
  },
  {
    title: "Browse Requests",
    description:
      "Filter by campus, amount, and trust score. See full borrower profiles before you commit.",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3.5-3.5" />
      </svg>
    ),
  },
  {
    title: "Make an Offer",
    description:
      "Set your rate and terms. Our AI helps you stay within fair market range.",
    icon: borrowSteps[2].icon,
  },
  {
    title: "Sign the Agreement",
    description:
      "Biometric signature. Documented forever. Both parties protected.",
    icon: borrowSteps[3].icon,
  },
  {
    title: "Track Repayment",
    description:
      "Get notified on due dates. Every successful lend builds your lender reputation.",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path d="M20 6L9 17l-5-5" />
      </svg>
    ),
  },
];

function StepTimeline({ steps }: { steps: Step[] }) {
  return (
    <div className="relative hidden lg:block">
      <div
        className="absolute left-[8%] right-[8%] top-5 h-px bg-yami-accent/90"
        aria-hidden="true"
      />
      <div className="grid grid-cols-5 gap-6">
        {steps.map((step, i) => (
          <div key={`${step.title}-${i}`} className="relative text-center">
            <div className="relative z-10 mx-auto flex h-10 w-10 items-center justify-center rounded-full border-2 border-yami-accent bg-yami-deep text-sm font-bold text-white">
              {i + 1}
            </div>
            <div className="mx-auto mt-6 flex h-10 w-10 items-center justify-center rounded-xl bg-yami-accent text-yami-deep">
              {step.icon}
            </div>
            <h3 className="mt-4 text-sm font-bold leading-snug text-white">
              {step.title}
            </h3>
            <p className="mx-auto mt-2 max-w-[11rem] text-xs leading-relaxed text-yami-muted">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HowItWorks() {
  const [mode, setMode] = useState<"borrow" | "lend">("borrow");
  const steps = mode === "borrow" ? borrowSteps : lendSteps;

  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden py-20 lg:py-28"
      aria-label="How it works"
    >
      <Image
        src={howItWorksBg}
        alt=""
        fill
        priority={false}
        className="object-cover object-center"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-yami-accent">
            How It Works
          </p>
          <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem]">
            Simple, Structured, Secure
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-yami-muted">
            Whether you&apos;re borrowing or lending, Yami guides you through
            every step.
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          <div className="inline-flex rounded-full bg-yami-card/80 p-1 backdrop-blur-sm">
            <button
              type="button"
              onClick={() => setMode("borrow")}
              className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${
                mode === "borrow"
                  ? "bg-yami-accent text-yami-deep shadow-[0_0_24px_rgba(210,245,62,0.2)]"
                  : "text-yami-muted hover:text-white"
              }`}
            >
              I want to borrow
            </button>
            <button
              type="button"
              onClick={() => setMode("lend")}
              className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${
                mode === "lend"
                  ? "bg-yami-accent text-yami-deep shadow-[0_0_24px_rgba(210,245,62,0.2)]"
                  : "text-yami-muted hover:text-white"
              }`}
            >
              I want to lend
            </button>
          </div>
        </div>

        <div className="mt-16 lg:mt-20">
          <StepTimeline steps={steps} />

          <div className="grid gap-4 sm:grid-cols-2 lg:hidden">
            {steps.map((step, i) => (
              <div
                key={`${step.title}-${i}`}
                className="rounded-2xl border border-yami-border/80 bg-yami-card/50 p-5 backdrop-blur-md"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-yami-accent bg-yami-deep text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-yami-accent text-yami-deep">
                    {step.icon}
                  </div>
                  <h3 className="font-bold text-white">{step.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-yami-muted">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
