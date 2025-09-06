import { Metadata } from 'next';
import { CourseDetailWithTranslations } from '@/lib/courses';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://worketyamo.com';

export function createMetadata({
  title,
  description,
  path = '',
  image,
  noIndex = false,
  type = 'website',
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  type?: 'website' | 'article';
}): Metadata {
  const url = `${BASE_URL}${path}`;
  const ogImage = image || `${BASE_URL}/Images/og-image.png`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Worketyamo',
      type,
      locale: 'fr_FR',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: '@worketyamo',
    },
    robots: noIndex ? {
      index: false,
      follow: true,
    } : {
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

export function generateCourseMetadata(
  courseDetail: CourseDetailWithTranslations,
  courseId: string
): Metadata {
  const title = `${courseDetail.fullTitle} | Formation ${courseDetail.label} | Worketyamo`;
  const description = `🚀 ${courseDetail.subtitle || courseDetail.description} ✅ Certification • ${courseDetail.enrollmentCount} étudiants • Note ${courseDetail.rating}/5 • ${courseDetail.modules?.length} modules • Formateurs experts.`;
  
  // Generate comprehensive keywords
  const keywords = [
    courseDetail.label.toLowerCase(),
    'formation',
    'cours',
    'bootcamp',
    'certification',
    'worketyamo',
    ...(courseDetail.skills?.map(s => s.name.toLowerCase()) || []),
    ...(courseDetail.modules?.flatMap(m => m.topics?.map(t => t.toLowerCase()) || []) || []),
    courseDetail.level?.toLowerCase(),
    'tech',
    'technologie',
    'apprentissage',
    'professionnel'
  ].filter(Boolean);

  return {
    title: {
      absolute: title,
    },
    description,
    keywords: keywords.join(', '),
    
    alternates: {
      canonical: `${BASE_URL}/course/${courseId}`,
      languages: {
        'fr': `${BASE_URL}/course/${courseId}`,
        'fr-FR': `${BASE_URL}/course/${courseId}`,
      },
    },
    
    openGraph: {
      title: courseDetail.fullTitle,
      description: courseDetail.subtitle || description,
      url: `${BASE_URL}/course/${courseId}`,
      siteName: 'Worketyamo',
      type: 'website',
      locale: 'fr_FR',
      images: [
        {
          url: `${BASE_URL}/course/${courseId}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `Formation ${courseDetail.fullTitle} - Worketyamo`,
          type: 'image/png',
        },
      ],
    },
    
    twitter: {
      card: 'summary_large_image',
      title: `${courseDetail.fullTitle} | Worketyamo`,
      description: courseDetail.subtitle || description,
      images: [`${BASE_URL}/course/${courseId}/opengraph-image`],
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
    
    category: 'Education',
    
    other: {
      // Course-specific meta tags
      'course:name': courseDetail.fullTitle,
      'course:provider': 'Worketyamo',
      'course:duration': courseDetail.scheduleDuration || '',
      'course:level': courseDetail.level || '',
      'course:language': courseDetail.languages?.join(',') || 'fr',
      'course:rating': courseDetail.rating?.toString() || '',
      'course:students': courseDetail.enrollmentCount?.toString() || '',
      'course:modules': courseDetail.modules?.length.toString() || '',
      
      // Educational schema hints
      'educational-audience': 'adult',
      'educational-use': 'instruction',
      'time-required': courseDetail.scheduleDuration || '',
      'interactivity-type': 'mixed',
      'learning-resource-type': 'course',
      
      // Geographic targeting
      'geo.region': 'FR',
      'geo.country': 'France',
      'content-language': 'fr',
      
      // Additional SEO
      'subject': courseDetail.label,
      'audience': 'professionals,students',
      'coverage': 'global',
    },
  };
}

// Generate static params for better SEO
export function generateStaticParams() {
  const courseIds = [
    'aws', 'python', 'docker', 'ux-ui', 
    'terraform', 'github', 'burp-suite', 'ai'
  ];
  
  return courseIds.map((courseId) => ({
    courseId,
  }));
}