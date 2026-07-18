"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ledger/Button";

const links = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Trust Score", href: "/#trust-score" },
  { label: "Where we are", href: "/#where-we-are" },
  { label: "FAQ", href: "/#faq" },
];

/**
 * Global nav. On a page with the dark brand hero (`overHero`), it starts
 * transparent with the green-on-dark logo, then transitions to a solid paper
 * bar with the ink logo once the hero scrolls past. Elsewhere it's always solid.
 */
export function Nav({ overHero = false }: { overHero?: boolean }) {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(!overHero);

  useEffect(() => {
    if (!overHero) {
      setSolid(true);
      return;
    }
    const onScroll = () => {
      const hero = document.getElementById("brand-hero");
      const h = hero?.offsetHeight ?? 600;
      setSolid(window.scrollY > h - 72);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [overHero]);

  const linkColor = solid
    ? "text-ink-soft hover:text-ink"
    : "text-forest-muted hover:text-paper";

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        solid
          ? "border-b border-ink bg-paper/90 backdrop-blur-md"
          : "border-b border-transparent bg-brand-dark"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 lg:px-8">
        <Logo tone={solid ? "default" : "onDark"} />

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`font-mono text-[12.5px] uppercase tracking-[0.12em] transition-colors ${linkColor}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Button
            href="/#waitlist"
            size="sm"
            className={solid ? "" : "bg-green text-ink"}
          >
            Join the waitlist
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className={`flex h-10 w-10 items-center justify-center rounded-md border-[1.5px] font-mono lg:hidden ${
            solid ? "border-ink text-ink" : "border-paper/40 text-paper"
          }`}
        >
          {open ? "✕" : "≡"}
        </button>
      </nav>

      {open && (
        <div className="border-t border-rule bg-paper px-5 py-4 lg:hidden">
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-2.5 font-mono text-[13px] uppercase tracking-[0.12em] text-ink-soft hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-3">
              <Button href="/#waitlist" size="sm" className="w-full">
                Join the waitlist
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
