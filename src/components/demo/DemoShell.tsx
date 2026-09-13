'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/brand/Logo';
import { ActorSwitcher } from './ActorSwitcher';

export function DemoShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // The University portal has its own visual identity, so we don't render the Yami shell for it.
  if (pathname?.startsWith('/demo/portal/university')) {
    return <>{children}</>;
  }

  const links = [
    { href: '/demo', label: 'Demo Hub' },
    { href: '/demo/borrower/apply', label: 'Borrower Portal' },
    { href: '/demo/sponsor', label: 'Sponsor Portal' },
    { href: '/demo/institution', label: 'Institution Portal' },
    { href: '/demo/admin', label: 'Admin Portal' },
  ];

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col md:flex-row font-body relative">
      <ActorSwitcher />
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-ink/10 bg-paper sticky top-0 z-40">
        <Logo href="/demo" />
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 font-mono text-sm tracking-widest uppercase border border-ink/20 rounded-sm"
        >
          {mobileMenuOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {/* Sidebar */}
      <nav
        className={`
          fixed md:sticky top-0 left-0 h-screen w-full md:w-64 border-r border-ink/10 bg-paper z-30
          flex flex-col transform transition-transform duration-300 ease-thump
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="hidden md:flex p-6 border-b border-ink/10">
          <Logo href="/demo" />
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-2 px-4">
          <div className="font-mono text-[10px] text-ink-soft uppercase tracking-widest mb-2 px-2">
            Portals
          </div>
          {links.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/demo' && pathname?.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={`
                  block px-4 py-3 font-disp text-sm rounded-sm transition-colors
                  ${isActive ? 'bg-ink text-paper' : 'hover:bg-ink/5 text-ink-soft hover:text-ink'}
                `}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="p-6 border-t border-ink/10">
          <div className="font-mono text-[10px] text-ink-soft uppercase tracking-widest mb-1">
            Demo Environment
          </div>
          <div className="font-disp text-xs text-ink/60">
            Local simulated state. No real data.
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 min-h-screen overflow-x-hidden relative">
        <div className="max-w-6xl mx-auto p-4 md:p-8 pb-32">
          {children}
        </div>
      </main>
    </div>
  );
}
