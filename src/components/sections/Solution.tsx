import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { TrustScoreGraphic } from "@/components/ui/TrustScoreGraphic";
import solutionBg from "@/assets/images/solution-bg.svg";

const features = [
  {
    title: "Trust Score",
    description:
      "AI-powered reputation built from real behaviour — every repayment, every agreement, every interaction shapes your score.",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17.8l-6.2 4.5 2.4-7.4L2 9.4h7.6L12 2z" />
      </svg>
    ),
    iconAccent: true,
  },
  {
    title: "Structured Agreements",
    description:
      "Every loan is documented, enforceable, and biometrically signed. No more 'I thought we agreed on...'",
    icon: (
      <svg
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <path d="M14 2v6h6M8 13h8M8 17h8" />
      </svg>
    ),
    iconAccent: false,
  },
  {
    title: "Peer Network",
    description:
      "Student-to-student, campus by campus. Borrow from people who understand your world, lend to people you can verify.",
    icon: (
      <svg
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <circle cx="9" cy="8" r="3" />
        <circle cx="17" cy="10" r="2.5" />
        <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M14 20c0-2.2 1.8-4 4-4" />
      </svg>
    ),
    iconAccent: true,
  },
];

export function Solution() {
  return (
    <section id="for-lenders" className="relative overflow-hidden py-20 lg:py-28">
      <Image
        src={solutionBg}
        alt=""
        fill
        priority={false}
        className="object-cover object-top"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-yami-accent">
              The Solution
            </p>
            <h2 className="mt-5 text-[2rem] font-bold leading-[1.15] tracking-tight sm:text-4xl lg:text-[2.75rem]">
              Yami is the rails.
              <br />
              Not the money.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-yami-muted">
              We don&apos;t lend money. We provide the trust infrastructure that
              makes peer-to-peer lending actually work — verified identities,
              structured agreements, and a reputation system that rewards good
              behaviour.
            </p>

            <div className="mt-10 inline-flex items-center gap-5 rounded-2xl border border-yami-border bg-yami-card/60 px-6 py-4 backdrop-blur-md">
              <TrustScoreGraphic size="md" />
              <span className="text-base font-medium text-white">Trust Score</span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="flex gap-4 border-white/5 bg-yami-card/50"
                padding="lg"
              >
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${
                    feature.iconAccent
                      ? "border-yami-accent/25 bg-yami-accent/10 text-yami-accent"
                      : "border-yami-border bg-yami-deep text-white"
                  }`}
                >
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold tracking-tight text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-yami-muted">
                    {feature.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
