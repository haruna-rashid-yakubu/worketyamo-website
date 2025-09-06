import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://worketyamo.com';
  const currentDate = new Date().toISOString();
  
  // Course data with detailed information for SEO
  const courses = [
    {
      id: 'aws',
      title: 'Amazon Web Services (AWS)',
      description: 'Formation complète AWS Cloud Computing',
      category: 'Cloud Computing',
      level: 'Débutant à Expert',
      duration: '6 semaines',
      priority: 0.9,
    },
    {
      id: 'python',
      title: 'Python Développement',
      description: 'Formation Python complète pour développeurs',
      category: 'Programmation',
      level: 'Débutant à Avancé',
      duration: '8 semaines',
      priority: 0.9,
    },
    {
      id: 'docker',
      title: 'Docker & Containerisation',
      description: 'Maîtrisez Docker et la containerisation',
      category: 'DevOps',
      level: 'Intermédiaire',
      duration: '4 semaines',
      priority: 0.8,
    },
    {
      id: 'ux-ui',
      title: 'UX/UI Design',
      description: 'Formation complète UX/UI Design',
      category: 'Design',
      level: 'Débutant à Avancé',
      duration: '10 semaines',
      priority: 0.9,
    },
    {
      id: 'terraform',
      title: 'Terraform Infrastructure',
      description: 'Infrastructure as Code avec Terraform',
      category: 'DevOps',
      level: 'Intermédiaire à Expert',
      duration: '5 semaines',
      priority: 0.8,
    },
    {
      id: 'github',
      title: 'GitHub & Git Avancé',
      description: 'Maîtrisez Git et GitHub pour le développement collaboratif',
      category: 'Développement',
      level: 'Débutant à Avancé',
      duration: '3 semaines',
      priority: 0.7,
    },
    {
      id: 'burp-suite',
      title: 'Burp Suite & Sécurité Web',
      description: 'Tests de sécurité avec Burp Suite',
      category: 'Cybersécurité',
      level: 'Intermédiaire à Expert',
      duration: '6 semaines',
      priority: 0.8,
    },
    {
      id: 'ai',
      title: 'Intelligence Artificielle',
      description: 'Formation complète en IA et Machine Learning',
      category: 'Intelligence Artificielle',
      level: 'Intermédiaire à Expert',
      duration: '12 semaines',
      priority: 1.0,
    },
  ];
  
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  ${courses.map(course => `
  <url>
    <loc>${baseUrl}/course/${course.id}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${course.priority}</priority>
    <image:image>
      <image:loc>${baseUrl}/Images/logo-icon/${course.id}-icon.png</image:loc>
      <image:title>${course.title} - Formation Worketyamo</image:title>
      <image:caption>${course.description}</image:caption>
      <image:geo_location>France</image:geo_location>
      <image:license>${baseUrl}/license</image:license>
    </image:image>
    ${course.id === 'aws' || course.id === 'ai' ? `
    <video:video>
      <video:thumbnail_loc>${baseUrl}/Images/thumbnails/${course.id}-preview.jpg</video:thumbnail_loc>
      <video:title>Aperçu de la formation ${course.title}</video:title>
      <video:description>${course.description} - Découvrez notre méthode d'apprentissage</video:description>
      <video:content_loc>${baseUrl}/videos/${course.id}-preview.mp4</video:content_loc>
      <video:duration>120</video:duration>
      <video:publication_date>${currentDate}</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:uploader info="${baseUrl}/about">Worketyamo</video:uploader>
      <video:live>no</video:live>
    </video:video>` : ''}
  </url>
  `).join('')}
  
  <!-- Course category pages -->
  <url>
    <loc>${baseUrl}/formations/cloud-computing</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/formations/devops</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/formations/cybersecurite</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/formations/intelligence-artificielle</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/formations/design</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Course landing pages -->
  ${courses.map(course => `
  <url>
    <loc>${baseUrl}/formation-${course.id}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  `).join('')}
</urlset>`;

  return new NextResponse(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400', // 24 hours
    },
  });
}