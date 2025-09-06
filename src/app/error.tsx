'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0D1117] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-red-500 mb-4">500</h1>
          <h2 className="text-2xl font-heading text-white mb-4">
            Erreur du serveur
          </h2>
          <p className="text-gray-300 font-body mb-8">
            Une erreur inattendue s'est produite. Notre équipe technique a été notifiée 
            et travaille à résoudre le problème.
          </p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={reset}
            className="inline-flex items-center px-6 py-3 bg-orange-500 text-white font-heading rounded-lg hover:bg-orange-600 transition-colors mr-4"
          >
            Réessayer
          </button>
          
          <Link 
            href="/"
            className="inline-flex items-center px-6 py-3 bg-gray-600 text-white font-heading rounded-lg hover:bg-gray-700 transition-colors"
          >
            Retour à l'accueil
          </Link>
        </div>
        
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-8 p-4 bg-gray-800 rounded-lg text-left">
            <summary className="cursor-pointer text-orange-400 font-heading">
              Détails de l'erreur (dev only)
            </summary>
            <pre className="mt-2 text-xs text-gray-300 whitespace-pre-wrap overflow-auto">
              {error.message}
              {error.stack && '\n\nStack trace:\n' + error.stack}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}