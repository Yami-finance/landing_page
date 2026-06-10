const statusLevels = ["New", "Building", "Reliable", "Trusted", "Elite"];
const activeIndex = 3;

const metrics = [
  { label: "Repayment Rate", icon: "!" },
  { label: "Repayment Speed", icon: "♡" },
  { label: "Agreement Completion", icon: "✓" },
];

export function Centrepiece() {
  return (
    <section id="trust-score" className="relative bg-yami-deep py-20 lg:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(210,245,62,0.08)_0%,_transparent_60%)]" />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-medium uppercase tracking-widest text-yami-accent">
          The Centrepiece
        </p>

        <div className="mt-8">
          <p className="text-[6rem] font-bold leading-none tracking-tighter text-yami-accent sm:text-[8rem] lg:text-[10rem]">
            791
          </p>
          <p className="mt-2 text-2xl font-bold uppercase tracking-widest text-yami-accent sm:text-3xl">
            TRUSTED
          </p>
        </div>

        {/* Status bar */}
        <div className="mt-12">
          <div className="flex justify-center gap-1 sm:gap-2">
            {statusLevels.map((level, i) => (
              <div
                key={level}
                className={`h-1 w-12 rounded-full sm:w-16 ${
                  i <= activeIndex ? "bg-yami-accent" : "bg-yami-border"
                }`}
              />
            ))}
          </div>
          <div className="mt-3 flex justify-center gap-2 sm:gap-4">
            {statusLevels.map((level, i) => (
              <span
                key={level}
                className={`text-[10px] sm:text-xs ${
                  i === activeIndex
                    ? "font-semibold text-yami-accent"
                    : i < activeIndex
                      ? "text-yami-muted"
                      : "text-yami-muted/50"
                }`}
              >
                {level}
              </span>
            ))}
          </div>
        </div>

        {/* Metrics */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 sm:gap-10">
          {metrics.map((metric) => (
            <div key={metric.label} className="flex flex-col items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-yami-accent/30 bg-yami-card/60 text-sm text-yami-accent backdrop-blur-md">
                {metric.icon}
              </div>
              <span className="text-xs text-white">{metric.label}</span>
            </div>
          ))}
        </div>

        <a
          href="#early-access"
          className="mt-10 inline-block text-sm font-medium text-yami-accent hover:underline"
        >
          Start building yours →
        </a>
      </div>
    </section>
  );
}
