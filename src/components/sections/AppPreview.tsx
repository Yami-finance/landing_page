import { Card } from "@/components/ui/Card";

const lenders = [
  { name: "Chidi O.", amount: "₦20,000", term: "14 days", uni: "UNILAG", score: "812" },
  { name: "Fatima A.", amount: "₦15,000", term: "21 days", uni: "UI", score: "798" },
  { name: "Emeka N.", amount: "₦10,000", term: "7 days", uni: "ABU", score: "845" },
];

export function AppPreview() {
  return (
    <section className="bg-yami-deep py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-yami-accent">
            App Preview
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Designed for How Students Actually Move
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-yami-muted">
            Every screen built around clarity, speed, and trust. Here&apos;s
            what&apos;s inside Yami.
          </p>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {/* Trust Score — tall left */}
          <Card className="lg:row-span-2" padding="lg">
            <h3 className="font-bold text-white">Your reputation at a glance</h3>
            <p className="mt-2 text-sm text-yami-muted">
              The home screen score that tells lenders everything they need to know.
            </p>
            <div className="mt-6 rounded-xl border border-yami-border bg-yami-deep p-4">
              <p className="text-5xl font-bold text-yami-accent">847</p>
              <p className="text-sm font-bold uppercase text-yami-accent">TRUSTED</p>
              <div className="mt-4 flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <div
                    key={n}
                    className={`h-1 flex-1 rounded-full ${n <= 4 ? "bg-yami-accent" : "bg-yami-border"}`}
                  />
                ))}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-yami-border p-3">
                  <p className="text-xs text-yami-muted">Total Lent</p>
                  <p className="font-bold text-white">₦45k</p>
                </div>
                <div className="rounded-lg border border-yami-border p-3">
                  <p className="text-xs text-yami-muted">Repayment</p>
                  <p className="font-bold text-white">100%</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Borrow Request Builder */}
          <Card padding="lg">
            <h3 className="font-bold text-white">Borrow Request Builder</h3>
            <p className="mt-2 text-sm text-yami-muted">
              AI structures your need into a formal, postable request.
            </p>
            <div className="mt-4 space-y-3">
              <div className="rounded-lg border border-yami-border bg-yami-deep p-3 text-xs text-yami-muted">
                I need ₦15,000 for textbooks and I can pay back in 3 weeks
              </div>
              <div className="rounded-lg border border-yami-accent/30 bg-yami-accent/10 p-3 text-xs text-yami-accent">
                Got it. I&apos;ve structured your request: ₦15,000 · 21-day term ·
                Purpose: Academic materials. Ready to post?
              </div>
            </div>
          </Card>

          {/* Lender Marketplace */}
          <Card padding="lg">
            <h3 className="font-bold text-white">Lender Marketplace</h3>
            <p className="mt-2 text-sm text-yami-muted">
              Browse verified requests with full trust profiles.
            </p>
            <div className="mt-4 space-y-3">
              {lenders.map((lender) => (
                <div
                  key={lender.name}
                  className="flex items-center justify-between rounded-lg border border-yami-border bg-yami-deep p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yami-border text-xs font-bold text-white">
                      {lender.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{lender.name}</p>
                      <p className="text-xs text-yami-muted">
                        {lender.amount} · {lender.term} · {lender.uni}
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-yami-accent/20 px-2 py-0.5 text-xs font-bold text-yami-accent">
                    {lender.score}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Smart Loan Agreement */}
          <Card padding="lg" className="lg:col-span-1">
            <h3 className="font-bold text-white">Smart Loan Agreement</h3>
            <p className="mt-2 text-sm text-yami-muted">
              Biometrically signed, legally documented, forever accessible.
            </p>
            <div className="mt-4 rounded-lg border border-yami-border bg-yami-deep p-4">
              <p className="text-xs text-yami-muted">Loan Agreement</p>
              <p className="font-semibold text-white">#YM-2847</p>
              <div className="mt-4 flex gap-2">
                <span className="rounded-full bg-yami-accent/20 px-3 py-1 text-xs text-yami-accent">
                  ✓ Signed
                </span>
                <span className="rounded-full border border-yami-border px-3 py-1 text-xs text-yami-muted">
                  Active
                </span>
              </div>
            </div>
          </Card>

          {/* AI Credit Report — wide */}
          <Card padding="lg" className="lg:col-span-2">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-bold text-white">AI Credit Report</h3>
                <a href="#early-access" className="mt-2 text-sm text-yami-accent hover:underline">
                  Generate yours →
                </a>
              </div>
              <div className="rounded-xl border border-yami-border bg-yami-deep p-4 sm:min-w-[280px]">
                <p className="text-xs text-yami-muted">Yami Credit Report</p>
                <p className="text-3xl font-bold text-yami-accent">847 TRUSTED</p>
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded border border-yami-border p-2">
                    <p className="text-yami-muted">Repayment</p>
                    <p className="font-bold text-white">100%</p>
                  </div>
                  <div className="rounded border border-yami-border p-2">
                    <p className="text-yami-muted">Agreements</p>
                    <p className="font-bold text-white">12</p>
                  </div>
                  <div className="rounded border border-yami-border p-2">
                    <p className="text-yami-muted">Avg Early</p>
                    <p className="font-bold text-white">1.2 days</p>
                  </div>
                  <div className="rounded border border-yami-border p-2">
                    <p className="text-yami-muted">Total Volume</p>
                    <p className="font-bold text-white">₦185k</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Next Payment + Smart Negotiation */}
          <Card padding="lg">
            <h3 className="font-bold text-white">Next Credit Payment</h3>
            <p className="mt-2 text-sm text-yami-muted">
              Schedule reminders so you never miss a due date.
            </p>
            <div className="mt-4 rounded-lg border border-yami-border bg-yami-deep p-4">
              <div className="flex justify-between text-sm">
                <span className="text-yami-muted">Due in</span>
                <span className="font-bold text-yami-accent">5 days</span>
              </div>
              <p className="mt-2 text-lg font-bold text-white">₦15,400</p>
              <p className="text-xs text-yami-muted">@oficialkeys · Borrower</p>
              <div className="mt-3 h-1.5 rounded-full bg-yami-border">
                <div className="h-full w-2/3 rounded-full bg-yami-accent" />
              </div>
            </div>
          </Card>

          <Card padding="lg">
            <h3 className="font-bold text-white">Smart Negotiation</h3>
            <p className="mt-2 text-sm text-yami-muted">
              AI-assisted chat to reach fair terms faster.
            </p>
            <div className="mt-4 space-y-2">
              <div className="rounded-lg border border-yami-border bg-yami-deep p-2 text-xs text-yami-muted">
                Can we extend to 21 days? I get my allowance on the 15th
              </div>
              <div className="rounded-lg border border-yami-accent/20 bg-yami-accent/5 p-2 text-xs text-white">
                I can do 21 days if we add ₦500 to the interest
              </div>
              <div className="rounded-lg border border-yami-accent/40 bg-yami-accent/10 p-2 text-xs text-yami-accent">
                AI SUGGESTION: Both terms are fair. 21 days + ₦500 is within
                market range for this score level.
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
