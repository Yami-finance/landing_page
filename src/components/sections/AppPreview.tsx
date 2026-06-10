import Image from "next/image";
import type { ReactNode } from "react";
import miniPhone from "@/assets/images/mini-phone.svg";

const lenders = [
  {
    name: "Chidi O.",
    amount: "₦12,000",
    term: "14 days",
    uni: "UNILAG",
    score: "812",
    color: "#C4956A",
  },
  {
    name: "Fatima A.",
    amount: "₦15,000",
    term: "21 days",
    uni: "UI",
    score: "766",
    color: "#7B8A6E",
  },
  {
    name: "Emeka N.",
    amount: "₦10,000",
    term: "7 days",
    uni: "ABU",
    score: "911",
    color: "#8B7E9B",
  },
];

function PreviewCard({
  label,
  title,
  description,
  className = "",
  children,
}: {
  label: string;
  title: string;
  description: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={[
        "flex flex-col rounded-2xl border border-white/5 bg-yami-card/60 p-5 backdrop-blur-md lg:p-6",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-yami-accent">
        {label}
      </p>
      <h3 className="mt-2 text-lg font-bold tracking-tight text-white lg:text-xl">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-yami-muted">{description}</p>
      {children}
    </div>
  );
}

export function AppPreview() {
  return (
    <section className="bg-black py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-yami-accent">
            App Preview
          </p>
          <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem]">
            Designed for How Students Actually Move
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-yami-muted">
            Every screen built around clarity, speed, and trust. Here&apos;s
            what&apos;s inside Yami.
          </p>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-3 lg:grid-rows-[auto_auto_auto]">
          {/* Trust Score — tall left with mini phone */}
          <PreviewCard
            label="Trust Score"
            title="Your reputation at a glance"
            description="The home screen puts your score front and centre — always visible, always updating."
            className="lg:row-span-2"
          >
            <div className="mt-6 flex flex-1 flex-col items-center justify-end pt-4">
              <Image
                src={miniPhone}
                alt="Yami app trust score screen showing 847 TRUSTED"
                width={280}
                height={460}
                className="w-full max-w-[240px] h-auto drop-shadow-2xl lg:max-w-[260px]"
              />
            </div>
          </PreviewCard>

          {/* Borrow Request Builder */}
          <PreviewCard
            label="AI-Powered"
            title="Borrow Request Builder"
            description="Just describe your need. The AI structures your request professionally."
          >
            <div className="mt-5 space-y-3">
              <div className="rounded-xl border border-yami-border bg-yami-deep/80 p-3 text-xs leading-relaxed text-yami-muted">
                I need ₦15,000 for textbooks and I can pay back in 3 weeks
              </div>
              <div className="rounded-xl border border-yami-accent/25 bg-yami-accent/10 p-3 text-xs leading-relaxed text-yami-accent">
                Got it. I&apos;ve structured your request: ₦15,000 · 21-day term ·
                Purpose: Academic materials. Ready to post?
              </div>
            </div>
          </PreviewCard>

          {/* Lender Marketplace — tall right */}
          <PreviewCard
            label="Marketplace"
            title="Lender Marketplace"
            description="Browse verified requests with trust scores visible on every card."
            className="lg:row-span-2"
          >
            <div className="mt-5 space-y-3">
              {lenders.map((lender) => (
                <div
                  key={lender.name}
                  className="flex items-center justify-between gap-3 rounded-xl border border-yami-border/80 bg-yami-deep/60 p-3"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-yami-deep"
                      style={{ backgroundColor: lender.color }}
                    >
                      {lender.name[0]}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white">
                        {lender.name}
                      </p>
                      <p className="truncate text-xs text-yami-muted">
                        {lender.amount} · {lender.term} · {lender.uni}
                      </p>
                    </div>
                  </div>
                  <span className="shrink-0 rounded-lg bg-yami-accent px-2.5 py-1 text-xs font-bold text-yami-deep">
                    {lender.score}
                  </span>
                </div>
              ))}
            </div>
          </PreviewCard>

          {/* Smart Loan Agreement */}
          <PreviewCard
            label="Agreements"
            title="Smart Loan Agreement"
            description="Clear, structured, and signed biometrically."
          >
            <div className="mt-5 rounded-xl border border-yami-border bg-yami-deep/80 p-4">
              <p className="text-xs text-yami-muted">Loan Agreement</p>
              <p className="mt-1 font-semibold text-white">#YM-2847</p>
              <div className="mt-4 space-y-2">
                {[1, 2, 3].map((line) => (
                  <div
                    key={line}
                    className="h-2 rounded-full bg-white/5"
                    style={{ width: `${100 - line * 12}%` }}
                  />
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-yami-accent px-3 py-1 text-xs font-semibold text-yami-deep">
                  ✓ Signed
                </span>
                <span className="rounded-full border border-yami-border px-3 py-1 text-xs text-yami-muted">
                  Active
                </span>
              </div>
            </div>
          </PreviewCard>

          {/* AI Credit Report — wide */}
          <PreviewCard
            label="Shareable"
            title="AI Credit Report"
            description="A portable financial reputation document. Share it with future landlords, employers, or financial institutions."
            className="lg:col-span-2"
          >
            <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <a
                href="#early-access"
                className="text-sm font-medium text-yami-accent hover:underline"
              >
                Generate yours →
              </a>
              <div className="w-full rounded-xl border border-yami-border bg-yami-deep/80 p-4 lg:max-w-sm lg:shrink-0">
                <p className="text-xs text-yami-muted">Yami Credit Report</p>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="font-sine text-4xl font-medium text-white">
                    847
                  </span>
                  <span className="text-sm font-bold uppercase tracking-widest text-yami-accent">
                    TRUSTED
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-lg border border-yami-border/80 p-2.5">
                    <p className="text-yami-muted">Repayment</p>
                    <p className="mt-0.5 font-bold text-white">100%</p>
                  </div>
                  <div className="rounded-lg border border-yami-border/80 p-2.5">
                    <p className="text-yami-muted">Agreements</p>
                    <p className="mt-0.5 font-bold text-white">12</p>
                  </div>
                  <div className="rounded-lg border border-yami-border/80 p-2.5">
                    <p className="text-yami-muted">Avg Early</p>
                    <p className="mt-0.5 font-bold text-white">1.2 days</p>
                  </div>
                  <div className="rounded-lg border border-yami-border/80 p-2.5">
                    <p className="text-yami-muted">Total Volume</p>
                    <p className="mt-0.5 font-bold text-white">₦185k</p>
                  </div>
                </div>
              </div>
            </div>
          </PreviewCard>

          {/* Smart Negotiation */}
          <PreviewCard
            label="Negotiation"
            title="Smart Negotiation"
            description="AI-assisted chat that helps both sides reach fair terms."
          >
            <div className="mt-5 space-y-2.5">
              <div className="rounded-xl border border-yami-border bg-yami-deep/80 p-3 text-xs leading-relaxed text-yami-muted">
                Can we extend to 21 days? I get my allowance on the 15th
              </div>
              <div className="rounded-xl border border-yami-border bg-yami-deep/80 p-3 text-xs leading-relaxed text-white">
                I can do 21 days if we add ₦500 to the interest
              </div>
              <div className="rounded-xl border border-yami-accent/30 bg-yami-accent/10 p-3 text-xs leading-relaxed">
                <span className="font-semibold text-yami-accent">
                  AI SUGGESTION:
                </span>
                <span className="text-yami-muted">
                  {" "}
                  Both terms are fair. 21 days + ₦500 is within market range for
                  this score level.
                </span>
              </div>
            </div>
          </PreviewCard>
        </div>
      </div>
    </section>
  );
}
