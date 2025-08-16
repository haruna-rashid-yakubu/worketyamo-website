'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

interface LoginLayoutProps {
  children: ReactNode;
}

export default function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}