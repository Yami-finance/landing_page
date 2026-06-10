import { TrustScoreGraphic } from "@/components/ui/TrustScoreGraphic";

const statusLevels = ["New", "Building", "Reliable", "Trusted", "Elite"];
const activeIndex = 3;

const metrics = [
  {
    label: "Repayment Rate",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v4M12 16h.01" />
      </svg>
    ),
  },
  {
    label: "Repayment Speed",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path d="M3 12h4l3-8 4 16 3-8h4" />
      </svg>
    ),
  },
  {
    label: "Agreement Completion",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M8 12l3 3 5-6" />
      </svg>
    ),
  },
];

export function Centrepiece() {
  return (
    <section id="trust-score" className="relative overflow-hidden bg-yami-deep py-20 lg:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_35%,rgba(210,245,62,0.1)_0%,transparent_65%)]" />

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-yami-accent">
          The Centrepiece
        </p>

        <div className="relative mt-10">
          <div className="absolute left-1/2 top-1/2 h-48 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(210,245,62,0.12)_0%,transparent_70%)]" />
          <TrustScoreGraphic size="lg" />
          <p className="mt-3 text-xl font-bold uppercase tracking-[0.25em] text-yami-accent sm:text-2xl">
            TRUSTED
          </p>
        </div>

        {/* Status bar */}
        <div className="mt-14">
          <div className="mx-auto flex max-w-md justify-center gap-1.5 sm:gap-2">
            {statusLevels.map((level, i) => (
              <div
                key={level}
                className={`h-1 flex-1 max-w-16 rounded-full ${
                  i >= 2 ? "bg-yami-accent" : "bg-yami-border"
                }`}
              />
            ))}
          </div>
          <div className="mx-auto mt-4 flex max-w-md justify-between gap-1 px-1">
            {statusLevels.map((level, i) => (
              <span
                key={level}
                className={`text-[10px] sm:text-xs ${
                  i === activeIndex
                    ? "font-semibold text-yami-accent"
                    : i >= 2
                      ? "text-yami-accent/80"
                      : "text-yami-muted"
                }`}
              >
                {level}
              </span>
            ))}
          </div>
        </div>

        {/* Metrics */}
        <div className="mt-14 flex flex-wrap justify-center gap-8 sm:gap-12">
          {metrics.map((metric) => (
            <div key={metric.label} className="flex flex-col items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-yami-accent/30 bg-yami-card/60 text-yami-accent backdrop-blur-md">
                {metric.icon}
              </div>
              <span className="max-w-[7rem] text-center text-xs leading-snug text-yami-muted">
                {metric.label}
              </span>
            </div>
          ))}
        </div>

        <a
          href="#early-access"
          className="mt-12 inline-block text-sm font-medium text-yami-accent transition-opacity hover:opacity-80"
        >
          Start building yours →
        </a>
      </div>
    </section>
  );
}
