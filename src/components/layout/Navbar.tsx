"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { YamiLogo } from "@/components/ui/YamiLogo";

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Trust Score", href: "#trust-score" },
  { label: "For Lenders", href: "#for-lenders" },
  { label: "For Borrowers", href: "#for-borrowers" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-yami-deep/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#" className="shrink-0">
          <YamiLogo />
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-yami-muted transition-colors hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#early-access" className="hidden lg:block">
          <Button size="sm">Join the Waitlist</Button>
        </a>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-yami-border text-white lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-yami-border bg-yami-deep/95 px-4 py-4 lg:hidden">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-yami-muted hover:text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#early-access" onClick={() => setMobileOpen(false)}>
                <Button size="sm" className="w-full">Join the Waitlist</Button>
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
