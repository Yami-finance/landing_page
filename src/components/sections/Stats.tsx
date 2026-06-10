import Image from "next/image";
import statsBg from "@/assets/images/stats-bg.svg";

const stats = [
  { value: "12", label: "Universities across Lagos, Abuja, and Ibadan" },
  { value: "94%", label: "Repayment rate on documented loans vs ~70% informal" },
  { value: "₦0", label: "Lent informally without documentation. Yami changes that." },
  { value: "4.8", suffix: "★", label: "From early beta users across pilot campuses" },
];

const testimonials = [
  {
    quote:
      "I lent ₦20,000 to a coursemate through Yami. It came back on the exact day we agreed. First time that's ever happened.",
    name: "Tunde K.",
    detail: "400L, UNILAG",
    score: "834",
    avatar: "T",
    accent: true,
  },
  {
    quote:
      "Before Yami, I was afraid to ask anyone for help. Now I just post a request and get fair offers within hours. My score speaks for me.",
    name: "Amara N.",
    detail: "300L, University of Ibadan",
    score: "791",
    avatar: "A",
    accent: false,
  },
];

export function Stats() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <Image
        src={statsBg}
        alt=""
        fill
        className="object-cover object-center"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-yami-accent">
            By the Numbers
          </p>
          <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem]">
            The case for structured lending
          </h2>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.value}
              className="flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-yami-card/60 px-5 py-8 text-center backdrop-blur-md sm:px-6"
            >
              <p className="flex items-baseline justify-center gap-1 text-4xl font-bold leading-none text-yami-accent lg:text-5xl">
                {stat.value}
                {stat.suffix && (
                  <span className="text-3xl lg:text-4xl">{stat.suffix}</span>
                )}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/80">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-2 lg:gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-yami-accent bg-yami-card/40 p-6 backdrop-blur-md lg:p-8"
            >
              <p className="text-base italic leading-relaxed text-white lg:text-lg">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-8 flex items-center gap-3">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                    t.accent
                      ? "bg-yami-accent text-yami-deep"
                      : "bg-yami-border text-yami-muted"
                  }`}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-white">{t.name}</p>
                  <p className="mt-0.5 text-sm text-yami-muted">
                    {t.detail} · Trust Score:{" "}
                    <span className="font-sine text-base text-yami-accent">
                      {t.score}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
