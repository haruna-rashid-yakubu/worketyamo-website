import { ReactNode } from 'react';
import AdminAuthProvider from '@/components/admin/AdminAuthProvider';
import AdminNavigation from '@/components/admin/AdminNavigation';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <AdminAuthProvider>
      <AdminNavigation>
        {children}
      </AdminNavigation>
    </AdminAuthProvider>
  );
}