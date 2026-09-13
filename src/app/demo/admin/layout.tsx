'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDemo } from '@/lib/demo/store';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isHydrated } = useDemo();
  const pathname = usePathname();

  if (!isHydrated) return null;

  const links = [
    { href: '/demo/admin', label: 'Network Overview' },
    { href: '/demo/admin/financing', label: 'Order Book' },
    { href: '/demo/admin/ledger', label: 'Global Ledger' },
    { href: '/demo/admin/webhooks', label: 'Webhooks (Ops)' },
    { href: '/demo/admin/collections', label: 'Collections' },
    { href: '/demo/admin/insurance', label: 'Insurance' },
    { href: '/demo/admin/support', label: 'Support' },
  ];

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8 animate-in fade-in duration-500 bg-forest text-forest-text min-h-[80vh] p-8 -m-4 md:-m-8">
      
      {/* Header */}
      <div className="flex flex-col gap-2 border-b border-rule-dark pb-8">
        <h1 className="font-disp text-4xl text-paper">Yami Admin Control</h1>
        <p className="text-forest-muted font-mono text-sm uppercase tracking-widest">Operator View / Superuser</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 border-b border-rule-dark font-mono text-sm uppercase tracking-widest">
        {links.map(link => (
          <Link 
            key={link.href}
            href={link.href}
            className={`px-4 md:px-6 py-3 transition-colors border-b-2 whitespace-nowrap ${pathname === link.href ? 'border-green text-green font-bold' : 'border-transparent text-forest-muted hover:text-paper hover:bg-ink'}`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Tab Content */}
      <div className="py-4">
        {children}
      </div>

    </div>
  );
}
