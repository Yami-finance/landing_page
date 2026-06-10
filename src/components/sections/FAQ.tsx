"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Is Yami a loan app?",
    answer:
      "No. Yami does not lend money, hold deposits, or operate as a financial institution. We provide the infrastructure — verified identities, structured agreements — that allows students to lend to each other safely and transparently.",
  },
  {
    question: "Is my BVN safe?",
    answer:
      "Absolutely. Your BVN is used only for identity verification through licensed, regulated providers. We never store your BVN on our servers. All data is encrypted using bank-grade security protocols.",
  },
  {
    question: "What happens if someone doesn't repay?",
    answer:
      "Their trust score drops significantly, limiting their ability to borrow in the future. The signed agreement serves as legal proof of the debt. Repeat offenders are flagged across the network. Behaviour has consequences on Yami.",
  },
  {
    question: "Is this available at my university?",
    answer:
      "We're launching campus by campus, starting with universities in Lagos, Abuja, and Ibadan. Join the waitlist and we'll notify you as soon as your campus goes live.",
  },
  {
    question: "How does the trust score work?",
    answer:
      "Your trust score is calculated from your real behaviour on the platform: repayment rate, repayment speed, and agreement compliance. It starts when you verify your identity and grows with every successful transaction. It's your financial reputation, made visible.",
  },
  {
    question: "What's the maximum I can borrow?",
    answer:
      "There's no fixed maximum — it depends on your trust score, your history on the platform, and what individual lenders are willing to offer. As your score grows, so does your access. Behaviour is the ultimate collateral.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-yami-deep py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-yami-accent">
            FAQ
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Questions We Get Asked
          </h2>
          <p className="mt-4 text-yami-muted">
            Everything you need to know about Yami, your trust score, and how
            it all works.
          </p>
        </div>

        <div className="mt-12 divide-y divide-yami-border border-y border-yami-border">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-white">{faq.question}</span>
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-yami-border text-yami-muted transition-transform duration-200"
                    style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                  >
                    +
                  </span>
                </button>
                <div
                  className="grid transition-all duration-300 ease-in-out"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                  }}
                >
                  <div className="overflow-hidden">
                    <p className="pb-5 text-sm leading-relaxed text-yami-muted">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
