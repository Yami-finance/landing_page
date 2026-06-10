import { Card } from "@/components/ui/Card";

const problems = [
  {
    title: "No Trust Data",
    description:
      "Risk is invisible. You have no way of knowing who is reliable before lending.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v4M12 16h.01" />
      </svg>
    ),
  },
  {
    title: "No Documentation",
    description:
      "Agreements exist only in WhatsApp chats. Nothing formal. Nothing enforceable.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <path d="M14 2v6h6M8 13h8M8 17h8" />
      </svg>
    ),
  },
  {
    title: "No Payment Trail",
    description:
      "Money moves with no record. When disputes arise, there's nothing to reference.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path d="M3 12h4l3-8 4 16 3-8h4" />
      </svg>
    ),
  },
  {
    title: "No Consequences",
    description:
      "Bad actors face zero accountability. They simply move on to the next lender.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <circle cx="12" cy="12" r="9" />
        <path d="M4.5 4.5l15 15" />
      </svg>
    ),
  },
];

export function Problem() {
  return (
    <section id="for-borrowers" className="bg-yami-deep py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-yami-accent">
            The Problem
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
            Students already lend to each other. The problem is there&apos;s no
            infrastructure.
          </h2>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((item) => (
            <Card key={item.title} className="flex flex-col gap-4">
              <div className="text-yami-accent">{item.icon}</div>
              <h3 className="text-lg font-bold tracking-tight text-white">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-yami-muted">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
