import { Card } from "@/components/ui/Card";

const features = [
  {
    title: "Trust Score",
    description:
      "AI-powered reputation built from real behaviour — every repayment, every agreement, every interaction shapes your score.",
    icon: "★",
  },
  {
    title: "Structured Agreements",
    description:
      "Every loan is documented, enforceable, and biometrically signed. No more 'I thought we agreed on...'",
    icon: "📄",
  },
  {
    title: "Peer Network",
    description:
      "Student-to-student, campus by campus. Borrow from people who understand your world, lend to people you can verify.",
    icon: "◎",
  },
];

export function Solution() {
  return (
    <section id="for-lenders" className="bg-yami-deep py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-yami-accent">
              The Solution
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Yami is the rails. Not the money.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-yami-muted">
              We don&apos;t lend money. We provide the trust infrastructure that
              makes peer-to-peer lending actually work — verified identities,
              structured agreements, and a reputation system that rewards good
              behaviour.
            </p>

            <Card className="mt-8 inline-flex items-center gap-4" padding="md">
              <span className="text-4xl font-bold text-yami-accent">791</span>
              <span className="text-sm font-medium text-white">Trust Score</span>
            </Card>
          </div>

          <div className="flex flex-col gap-4">
            {features.map((feature) => (
              <Card key={feature.title} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-yami-border bg-yami-deep text-yami-accent">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-bold tracking-tight text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-yami-muted">
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
