import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://worketyamo.com';
  
  return {
    rules: [
      // Main rule for all search engines
      {
        userAgent: '*',
        allow: [
          '/',
          '/course/',
          '/Images/',
          '/icons/',
        ],
        disallow: [
          '/api/',
          '/admin/',
          '/_next/static/',
          '/private/',
          '/temp/',
          '/draft/',
          '/test/',
          '/dev/',
          '/*.json$',
          '/*?*utm_*',
          '/*?*ref=*',
          '/*?*source=*',
          '/*?*fbclid=*',
          '/*?*gclid=*',
          '/search?*',
          '/filter?*',
          '/*?*sessionid=*',
          '/*?*preview=*',
          '/*?sort=*',
          '/*?page=*',
          '/course/*?*',
        ],
        crawlDelay: 1,
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
        ],
        crawlDelay: 0.5, // Faster crawling for Google
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
        ],
        crawlDelay: 1,
      },
      {
        userAgent: 'facebookexternalhit',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
        ],
      },
      {
        userAgent: 'Twitterbot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
        ],
      },
      {
        userAgent: 'LinkedInBot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
        ],
      },
      // Block known bad bots and scrapers
      {
        userAgent: [
          'AhrefsBot',
          'SemrushBot',
          'MJ12bot',
          'DotBot',
          'AspiegelBot',
          'DataForSeoBot',
        ],
        disallow: '/',
      },
      // Allow educational and research bots
      {
        userAgent: [
          'archive.org_bot',
          'ia_archiver',
          'Wayback',
        ],
        allow: '/',
        crawlDelay: 5, // Slower crawling for archive bots
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/course-sitemap.xml`, // Dedicated course sitemap
      `${baseUrl}/blog-sitemap.xml`,   // Blog sitemap if exists
    ],
    host: baseUrl,
  };
}