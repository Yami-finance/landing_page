'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDemo } from '@/lib/demo/store';

export default function InstitutionLayout({ children }: { children: React.ReactNode }) {
  const { state, isHydrated } = useDemo();
  const pathname = usePathname();

  if (!isHydrated) return null;

  const links = [
    { href: '/demo/institution', label: 'Overview' },
    { href: '/demo/institution/students', label: 'Students' },
    { href: '/demo/institution/payments', label: 'Payments' },
    { href: '/demo/institution/webhooks', label: 'Webhooks' },
    { href: '/demo/institution/api', label: 'API Keys' },
  ];

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-ink/20 pb-8">
        <div className="flex flex-col gap-2">
          <h1 className="font-disp text-4xl">{state.institution.shortName} Portal</h1>
          <p className="text-ink-soft">Partner Institution Dashboard</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 border-b border-ink/20 font-mono text-sm uppercase tracking-widest">
        {links.map(link => (
          <Link 
            key={link.href}
            href={link.href}
            className={`px-4 md:px-6 py-3 transition-colors border-b-2 whitespace-nowrap ${pathname === link.href ? 'border-ink text-ink font-bold' : 'border-transparent text-ink-soft hover:text-ink hover:bg-ink/5'}`}
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
