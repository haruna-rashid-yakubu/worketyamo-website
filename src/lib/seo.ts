import { Metadata } from 'next';
import { CourseDetailWithTranslations } from '@/lib/courses';

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noIndex?: boolean;
  structuredData?: any;
}

export function generateCourseSEO(
  courseDetail: CourseDetailWithTranslations,
  courseId: string
): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://worketyamo.com';
  const courseUrl = `${baseUrl}/course/${courseId}`;
  
  // Generate comprehensive keywords
  const keywords = [
    courseDetail.label,
    'formation',
    'bootcamp',
    'certification',
    'cours en ligne',
    'formation professionnelle',
    'tech',
    'worketyamo',
    ...(courseDetail.skills?.map(s => s.name.toLowerCase()) || []),
    ...(courseDetail.modules?.flatMap(m => m.topics || []) || []),
    courseDetail.level?.toLowerCase(),
    'développeur',
    'carrière tech',
    'apprentissage'
  ].filter(Boolean);

  // Advanced title optimization
  const title = `${courseDetail.fullTitle} | Formation ${courseDetail.label} Certifiante | Worketyamo`;
  
  // Rich description with benefits
  const description = `🚀 Formation ${courseDetail.label} complète avec ${courseDetail.modules?.length || 0} modules pratiques. ${courseDetail.subtitle} ✅ Certification • ${courseDetail.enrollmentCount} étudiants • Note ${courseDetail.rating}/5 • Formateurs experts.`;

  return {
    title: {
      default: title,
      template: '%s | Worketyamo'
    },
    description,
    keywords: keywords.join(', '),
    
    // Canonical URL
    alternates: {
      canonical: courseUrl,
      languages: {
        'fr': courseUrl,
        'fr-FR': courseUrl,
      }
    },
    
    // Open Graph optimization
    openGraph: {
      title: courseDetail.fullTitle,
      description: courseDetail.subtitle || description,
      url: courseUrl,
      siteName: 'Worketyamo',
      type: 'website',
      locale: 'fr_FR',
      images: [
        {
          url: courseDetail.iconUrl || `${baseUrl}/Images/og-course-default.png`,
          width: 1200,
          height: 630,
          alt: `Formation ${courseDetail.fullTitle} - Worketyamo`,
          type: 'image/png',
        },
        {
          url: `${baseUrl}/Images/worketyamo-logo-og.png`,
          width: 800,
          height: 600,
          alt: 'Worketyamo - Accélérateur de talents tech',
          type: 'image/png',
        }
      ],
    },
    
    // Twitter Card optimization
    twitter: {
      card: 'summary_large_image',
      title: `${courseDetail.fullTitle} | Worketyamo`,
      description: courseDetail.subtitle || description,
      images: [courseDetail.iconUrl || `${baseUrl}/Images/twitter-course-default.png`],
      creator: '@worketyamo',
      site: '@worketyamo',
    },
    
    // Additional meta tags for SEO
    other: {
      // Educational specific meta tags
      'course:duration': courseDetail.scheduleDuration || '',
      'course:level': courseDetail.level || '',
      'course:rating': courseDetail.rating?.toString() || '',
      'course:price': 'paid',
      'course:language': courseDetail.languages?.join(',') || 'fr',
      'course:instructor': courseDetail.instructors?.map(i => i.name).join(',') || '',
      
      // Geographic targeting
      'geo.region': 'FR',
      'geo.country': 'France',
      'geo.placename': 'France',
      
      // Content classification
      'content-language': 'fr',
      'audience': 'professionals,students',
      'subject': courseDetail.label,
      'coverage': 'worldwide',
      'distribution': 'global',
      'rating': 'general',
      
      // Mobile optimization
      'mobile-web-app-capable': 'yes',
      'mobile-web-app-status-bar-style': 'black-translucent',
      'mobile-web-app-title': `${courseDetail.label} | Worketyamo`,
      
      // Social media optimization
      'fb:app_id': process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || '',
      'article:author': 'Worketyamo',
      'article:publisher': 'https://www.facebook.com/worketyamo',
      'article:section': 'Education',
      'article:tag': keywords.slice(0, 10).join(','),
      
      // Schema.org markup hints
      'schema:course': 'true',
      'schema:provider': 'Worketyamo',
      'schema:educationalLevel': courseDetail.level || '',
      
      // Pinterest optimization
      'pinterest:description': description,
      'pinterest:media': courseDetail.iconUrl || `${baseUrl}/Images/pinterest-course.png`,
      
      // LinkedIn optimization
      'linkedin:owner': 'worketyamo',
    },
    
    // Robots directives
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    
    // Application info
    applicationName: 'Worketyamo',
    authors: [
      { name: 'Worketyamo', url: 'https://worketyamo.com' },
      ...(courseDetail.instructors?.map(instructor => ({
        name: instructor.name,
        url: `https://worketyamo.com/instructor/${instructor.name.toLowerCase().replace(/\s+/g, '-')}`
      })) || [])
    ],
    creator: 'Worketyamo',
    publisher: 'Worketyamo',
    generator: 'Next.js',
    
    // Verification tags
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
    },
    
    // App links for mobile deep linking
    appLinks: {
      web: {
        url: courseUrl,
        should_fallback: true,
      },
    },
    
    // Category and classification
    category: 'Education',
    classification: 'Educational Content',
    
    // Referrer policy for security
    referrer: 'origin-when-cross-origin',
  };
}

export function generateHomepageSEO(): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://worketyamo.com';
  
  return {
    title: {
      default: 'Worketyamo | Formations Tech & Bootcamps Certifiants | Accélérateur de Talents',
      template: '%s | Worketyamo'
    },
    description: '🚀 Formations tech intensives & bootcamps certifiants. AWS, Python, Docker, UX/UI, IA, DevOps. ✅ Certification reconnue • Projets réels • Formateurs experts • Garantie emploi.',
    keywords: [
      'formation tech',
      'bootcamp',
      'certification',
      'aws formation',
      'python cours',
      'docker training',
      'ux ui design',
      'intelligence artificielle',
      'devops',
      'formation professionnelle',
      'reconversion tech',
      'développeur formation',
      'worketyamo',
      'bootcamp france',
      'formation en ligne',
      'certification technique'
    ].join(', '),
    
    alternates: {
      canonical: baseUrl,
      languages: {
        'fr': baseUrl,
        'fr-FR': baseUrl,
      }
    },
    
    openGraph: {
      title: 'Worketyamo | Formations Tech & Bootcamps Certifiants',
      description: 'Formations tech intensives & bootcamps certifiants. AWS, Python, Docker, UX/UI, IA. Certification reconnue, projets réels, formateurs experts.',
      url: baseUrl,
      siteName: 'Worketyamo',
      type: 'website',
      locale: 'fr_FR',
      images: [
        {
          url: `${baseUrl}/Images/og-image.png`,
          width: 1200,
          height: 630,
          alt: 'Worketyamo - Formations Tech & Bootcamps Certifiants',
        }
      ],
    },
    
    twitter: {
      card: 'summary_large_image',
      title: 'Worketyamo | Formations Tech & Bootcamps Certifiants',
      description: 'Formations tech intensives & bootcamps certifiants. AWS, Python, Docker, UX/UI, IA.',
      images: [`${baseUrl}/Images/twitter-image.jpg`],
      creator: '@worketyamo',
      site: '@worketyamo',
    },
    
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}