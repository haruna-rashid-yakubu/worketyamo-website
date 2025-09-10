import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Formation Non Trouvée - 404 | Worketyamo',
  description: 'Cette formation n\'existe pas. Découvrez nos autres formations tech disponibles : AWS, Python, Docker, UX/UI, IA.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function CourseNotFound() {
  const availableCourses = [
    { id: 'aws', name: 'Amazon Web Services (AWS)', icon: '/Images/aws-certificate.png' },
    { id: 'python', name: 'Python Développement', icon: '/Images/logo-icon/python.svg' },
    { id: 'docker', name: 'Docker & Conteneurisation', icon: '/Images/logo-icon/docker.svg' },
    { id: 'ux-ui', name: 'UX/UI Design', icon: '/Images/logo-icon/figma.svg' },
    { id: 'ai', name: 'Intelligence Artificielle', icon: '/Images/logo-icon/n8n.svg' },
    { id: 'terraform', name: 'Terraform Infrastructure', icon: '/Images/logo-icon/terraform.svg' },
  ];

  return (
    <div className="min-h-screen bg-[url('/Images/background-place.jpg')] bg-cover bg-center bg-no-repeat bg-fixed">
      <div className="min-h-screen bg-black/50 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center">
          {/* Header */}
          <div className="mb-12">
            <div className="mb-6">
              <Image 
                src="/Images/worketyamo.svg" 
                alt="Worketyamo" 
                width={200} 
                height={40}
                className="mx-auto"
                priority
              />
            </div>
            
            <h1 className="text-6xl font-bold text-orange-500 mb-4">404</h1>
            <h2 className="text-3xl font-heading text-white mb-4">
              Formation non trouvée
            </h2>
            <p className="text-gray-300 font-body text-lg mb-8 max-w-lg mx-auto">
              Cette formation n&apos;existe pas ou a été supprimée. 
              Découvrez nos autres formations disponibles ci-dessous.
            </p>
          </div>

          {/* Available Courses */}
          <div className="mb-12">
            <h3 className="text-xl font-heading text-white mb-6">Formations disponibles</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {availableCourses.map((course) => (
                <Link
                  key={course.id}
                  href={`/course/${course.id}`}
                  className="group bg-[#21262D]/90 backdrop-blur-md p-4 rounded-lg border border-white/10 hover:border-orange-500/50 transition-all duration-300"
                >
                  <div className="flex flex-col items-center space-y-3">
                    <div className="w-12 h-12 relative">
                      <Image
                        src={course.icon}
                        alt={`${course.name} icon`}
                        width={48}
                        height={48}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-white font-body text-sm group-hover:text-orange-400 transition-colors">
                      {course.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <Link 
              href="/"
              className="inline-flex items-center px-6 py-3 bg-orange-500 text-white font-heading rounded-lg hover:bg-orange-600 transition-colors mr-4"
            >
              Retour à l&apos;accueil
            </Link>
            
            <Link 
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-gray-600 text-white font-heading rounded-lg hover:bg-gray-700 transition-colors"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}