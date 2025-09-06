import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Non Trouvée | Worketyamo',
  description: 'La page que vous recherchez n\'existe pas. Découvrez nos formations tech et bootcamps certifiants.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0D1117] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-orange-500 mb-4">404</h1>
          <h2 className="text-2xl font-heading text-white mb-4">
            Page non trouvée
          </h2>
          <p className="text-gray-300 font-body mb-8">
            Désolé, nous ne trouvons pas la page que vous recherchez. 
            Elle a peut-être été déplacée ou n&apos;existe plus.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link 
            href="/"
            className="inline-flex items-center px-6 py-3 bg-orange-500 text-white font-heading rounded-lg hover:bg-orange-600 transition-colors"
          >
            Retour à l&apos;accueil
          </Link>
          
          <div className="text-gray-400 text-sm">
            <p className="mb-2">Vous cherchez peut-être :</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Link href="/course/aws" className="text-blue-400 hover:text-blue-300 underline">
                Formation AWS
              </Link>
              <Link href="/course/python" className="text-blue-400 hover:text-blue-300 underline">
                Formation Python
              </Link>
              <Link href="/course/ai" className="text-blue-400 hover:text-blue-300 underline">
                Formation IA
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}