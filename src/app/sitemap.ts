import { MetadataRoute } from 'next';

// Define all available course IDs
const COURSE_IDS = [
  'aws', 'python', 'docker', 'ux-ui', 
  'terraform', 'github', 'burp-suite', 'ai'
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://worketyamo.com';
  const currentDate = new Date();
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];

  // Course pages - dynamically generated from COURSE_IDS
  const coursePages = COURSE_IDS.map(courseId => ({
    url: `${baseUrl}/course/${courseId}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.9, // High priority for course pages
  }));

  // Category/topic pages for better SEO structure
  const categoryPages = [
    'cloud-computing',
    'devops',
    'cybersecurity',
    'artificial-intelligence',
    'web-development',
    'data-science',
    'ui-ux-design',
    'mobile-development'
  ].map(category => ({
    url: `${baseUrl}/category/${category}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Instructor profile pages
  const instructorPages = [
    'john-doe',
    'jane-smith',
    'alex-martin',
    'sarah-wilson'
  ].map(instructor => ({
    url: `${baseUrl}/instructor/${instructor}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Blog articles (if any)
  const blogPages = [
    'getting-started-with-aws',
    'python-best-practices',
    'docker-containers-guide',
    'ux-design-principles',
    'ai-career-opportunities'
  ].map(slug => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Resource/learning pages
  const resourcePages = [
    'learning-paths',
    'certification-guide',
    'career-guidance',
    'study-materials',
    'practice-tests'
  ].map(resource => ({
    url: `${baseUrl}/resources/${resource}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }));

  // Location-based pages for local SEO
  const locationPages = [
    'paris',
    'lyon',
    'marseille',
    'toulouse',
    'bordeaux',
    'lille',
    'nantes',
    'strasbourg'
  ].map(city => ({
    url: `${baseUrl}/formation-${city}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.4,
  }));

  return [
    ...staticPages,
    ...coursePages,
    ...categoryPages,
    ...instructorPages,
    ...blogPages,
    ...resourcePages,
    ...locationPages,
  ];
}