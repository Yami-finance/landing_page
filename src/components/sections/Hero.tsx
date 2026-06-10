import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const avatars = ["A", "B", "C", "D"];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-yami-deep">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(210,245,62,0.06)_0%,_transparent_50%)]" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-24 lg:px-8">
        {/* Left column */}
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-yami-border bg-yami-card/60 px-4 py-1.5 backdrop-blur-md">
            <span className="text-yami-accent">★</span>
            <span className="text-sm font-medium text-yami-accent">
              The Campus Credit Network
            </span>
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-[3.25rem]">
            Your Financial{" "}
            <span className="text-yami-accent">
              Reputation, Finally Visible.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-yami-muted">
            Yami formalizes student lending networks across Nigerian campuses
            with trust scores, verified identities, and structured agreements —
            so peer-to-peer lending actually works.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#early-access">
              <Button>Join the Waitlist</Button>
            </a>
            <a href="#how-it-works">
              <Button variant="secondary">See How It Works</Button>
            </a>
          </div>

          <div className="mt-10 flex items-center gap-4">
            <div className="flex -space-x-2">
              {avatars.map((letter, i) => (
                <div
                  key={letter}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-yami-deep text-xs font-semibold"
                  style={{
                    backgroundColor:
                      i % 2 === 0 ? "#D2F53E" : "#1E2D38",
                    color: i % 2 === 0 ? "#060F14" : "#8E9CA6",
                  }}
                >
                  {letter}
                </div>
              ))}
            </div>
            <p className="text-sm text-yami-muted">
              Trusted by students across{" "}
              <span className="font-semibold text-yami-accent">
                12 universities
              </span>
            </p>
          </div>
        </div>

        {/* Right column — dashboard mockup */}
        <div className="mx-auto w-full max-w-md lg:max-w-none">
          <Card padding="lg" className="overflow-hidden p-0">
            {/* Lime header */}
            <div className="bg-yami-accent px-5 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yami-deep/20 text-sm font-bold text-yami-deep">
                    T
                  </div>
                  <span className="text-sm font-semibold text-yami-deep">
                    Hi @theredhoodguy
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="text-yami-deep/60">⌕</span>
                  <span className="text-yami-deep/60">🔔</span>
                </div>
              </div>

              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="text-xs text-yami-deep/70">Available Balance</p>
                  <p className="text-3xl font-bold tracking-tight text-yami-deep">
                    ₦15,400.00
                  </p>
                </div>
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-yami-deep text-lg font-bold text-yami-accent"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action bar */}
            <div className="border-b border-yami-border bg-white/5 px-5 py-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-yami-deep py-3 text-sm font-semibold text-white"
                >
                  Borrow
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 17L17 7M17 7H7M17 7V17"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-yami-deep py-3 text-sm font-semibold text-white"
                >
                  Lend
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 7L7 17M7 17H17M7 17V7"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className="rounded-full border border-yami-border px-3 py-3 text-yami-muted"
                >
                  ···
                </button>
              </div>
            </div>

            {/* Active transactions */}
            <div className="px-5 py-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white">Active</span>
                  <span className="rounded-full bg-yami-border px-2 py-0.5 text-xs text-yami-muted">
                    2
                  </span>
                </div>
                <span className="text-xs text-yami-muted">See all</span>
              </div>

              <div className="rounded-lg border border-yami-border bg-white/5 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      @oficialkeys
                    </p>
                    <p className="text-xs text-yami-muted">Borrower</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-white">₦15,400</p>
                    <p className="text-xs text-yami-muted">5 days left</p>
                  </div>
                </div>
                <div className="mt-3 h-1.5 w-full rounded-full bg-yami-border">
                  <div
                    className="h-full rounded-full bg-yami-accent"
                    style={{ width: "65%" }}
                  />
                </div>
                <div className="mt-2 flex justify-end">
                  <span className="text-xs text-red-400">!</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
