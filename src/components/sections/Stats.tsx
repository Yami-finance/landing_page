import { Card } from "@/components/ui/Card";

const stats = [
  { value: "12", label: "Universities across Lagos, Abuja, and Ibadan" },
  { value: "94%", label: "Repayment rate on documented loans vs ~70% informal" },
  { value: "₦0", label: "Lent informally without documentation. Yami changes that." },
  { value: "4.8 ★", label: "From early beta users across pilot campuses" },
];

const testimonials = [
  {
    quote:
      "I lent ₦20,000 to a coursemate through Yami. It came back on the exact day we agreed. First time that's ever happened.",
    name: "Tunde K.",
    detail: "400L, UNILAG · Trust Score: 834",
    avatar: "T",
    accent: true,
  },
  {
    quote:
      "Before Yami, I was afraid to ask anyone for help. Now I just post a request and get fair offers within hours. My score speaks for me.",
    name: "Amara N.",
    detail: "300L, University of Ibadan · Trust Score: 791",
    avatar: "A",
    accent: false,
  },
];

export function Stats() {
  return (
    <section className="bg-yami-deep py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-yami-accent">
            By the Numbers
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            The case for structured lending
          </h2>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.value} className="text-center sm:text-left">
              <p className="text-4xl font-bold text-yami-accent">{stat.value}</p>
              <p className="mt-2 text-sm leading-relaxed text-yami-muted">
                {stat.label}
              </p>
            </Card>
          ))}
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-xl border border-yami-accent/40 bg-yami-card/40 p-6 backdrop-blur-md"
            >
              <p className="text-base italic leading-relaxed text-white">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
                    t.accent
                      ? "bg-yami-accent text-yami-deep"
                      : "bg-yami-border text-yami-muted"
                  }`}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-white">{t.name}</p>
                  <p className="text-sm text-yami-muted">{t.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
