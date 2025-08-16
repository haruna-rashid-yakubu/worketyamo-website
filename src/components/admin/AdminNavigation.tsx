'use client';

import { ReactNode, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Settings, Plus, List, LogOut, User, Loader2, Users } from 'lucide-react';

interface AdminNavigationProps {
  children: ReactNode;
}

export default function AdminNavigation({ children }: AdminNavigationProps) {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      window.location.href = '/login';
    }
  }, [status]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Vérification de la session...</p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Redirection vers la page de connexion...</p>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Settings className="h-6 w-6 text-blue-600 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">Administration Worketyamo</h1>
            </div>
            <div className="flex items-center space-x-4">
              {session && (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-sm text-gray-800">
                    <User className="h-4 w-4 mr-1 text-gray-600" />
                    <span className="font-medium">{session.user?.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors border border-gray-300 hover:border-gray-400"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Déconnexion
                  </button>
                </div>
              )}
              <Link 
                href="/" 
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium border border-gray-300 hover:border-gray-400 transition-colors"
              >
                Retour au site
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex flex-col lg:flex-row gap-6">
            <aside className="w-full lg:w-64 flex-shrink-0">
              <nav className="bg-white rounded-lg shadow p-4">
                <ul className="space-y-2">
                  <li>
                    <Link 
                      href="/admin/courses"
                      className="flex items-center px-4 py-2 text-sm font-medium text-gray-800 rounded-lg hover:bg-blue-50 hover:text-blue-900 hover:border-blue-200 transition-colors border border-transparent"
                    >
                      <List className="h-4 w-4 mr-3 text-gray-600" />
                      Gestion des cours
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/admin/courses/new"
                      className="flex items-center px-4 py-2 text-sm font-medium text-gray-800 rounded-lg hover:bg-green-50 hover:text-green-900 hover:border-green-200 transition-colors border border-transparent"
                    >
                      <Plus className="h-4 w-4 mr-3 text-gray-600" />
                      Nouveau cours
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/admin/registrations"
                      className="flex items-center px-4 py-2 text-sm font-medium text-gray-800 rounded-lg hover:bg-purple-50 hover:text-purple-900 hover:border-purple-200 transition-colors border border-transparent"
                    >
                      <Users className="h-4 w-4 mr-3 text-gray-600" />
                      Inscriptions
                    </Link>
                  </li>
                </ul>
              </nav>
            </aside>

            <main className="flex-1">
              <div className="bg-white rounded-lg shadow">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}