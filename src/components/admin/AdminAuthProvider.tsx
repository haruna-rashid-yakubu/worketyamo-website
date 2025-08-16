'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

interface AdminAuthProviderProps {
  children: ReactNode;
}

export default function AdminAuthProvider({ children }: AdminAuthProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
}