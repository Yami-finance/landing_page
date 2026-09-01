import { Logo } from "@/components/brand/Logo";

const legal = [
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Terms", href: "/legal/terms" },
];

export function Footer() {
  return (
    <footer className="border-t border-ink bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Logo tone="onDark" />
            <p className="mt-4 font-mono text-[12.5px] leading-relaxed tracking-wide text-forest-muted">
              Lending between people, on the record.
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-2">
            {legal.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-mono text-[12.5px] uppercase tracking-[0.12em] text-forest-muted transition-colors hover:text-paper"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[rgba(244,242,234,0.14)] pt-6 font-mono text-[11.5px] uppercase tracking-[0.14em] text-forest-muted md:flex-row md:items-center md:justify-between">
          <p>Built by Arcturian Limited · Lagos, Nigeria</p>
          <p className="normal-case tracking-normal">
            Yami is not a balance-sheet lender or deposit-taker.
          </p>
          <p>© 2026 Yami</p>
        </div>
      </div>
    </footer>
  );
}
