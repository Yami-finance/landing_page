import React from 'react';
import { DemoProvider } from '@/lib/demo/store';
import { DemoShell } from '@/components/demo/DemoShell';
import { DemoControls } from '@/components/demo/DemoControls';

export const metadata = {
  title: 'Yami Interactive Demo',
  description: 'Simulated multi-actor network for Yami Educational BNPL.',
};

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DemoProvider>
      <DemoShell>
        {children}
      </DemoShell>
      <DemoControls />
    </DemoProvider>
  );
}
