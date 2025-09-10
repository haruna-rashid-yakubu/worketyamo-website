import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import QueryProvider from "@/components/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://worketyamo.com'),
  title: {
    default: "Worketyamo | Formations Tech & Bootcamps Certifiants | Accélérateur de Talents",
    template: "%s | Worketyamo"
  },
  description: "🚀 Formations tech intensives & bootcamps certifiants. AWS, Python, Docker, UX/UI, IA, DevOps. ✅ Certification reconnue • Projets réels • Formateurs experts • Garantie emploi.",
  
  keywords: [
    "formation tech", "bootcamp", "certification", "aws formation", "python cours",
    "docker training", "ux ui design", "intelligence artificielle", "devops",
    "formation professionnelle", "reconversion tech", "développeur formation",
    "worketyamo", "bootcamp france", "formation en ligne", "certification technique"
  ],
  
  authors: [{ name: "Worketyamo", url: "https://worketyamo.com" }],
  creator: "Worketyamo",
  publisher: "Worketyamo",
  applicationName: "Worketyamo",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  
  icons: {
    icon: [
      { url: "/Images/icons/worketyamo-favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/Images/icons/worketyamo-favicon-64.png", sizes: "64x64", type: "image/png" },
    ],
    apple: [
      { url: "/Images/icons/worketyamo-apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/Images/icons/worketyamo-favicon.png",
  },
  
  manifest: "/manifest.json",
  
  openGraph: {
    title: "Worketyamo | Formations Tech & Bootcamps Certifiants",
    description: "Formations tech intensives & bootcamps certifiants. AWS, Python, Docker, UX/UI, IA. Certification reconnue, projets réels, formateurs experts.",
    url: "https://worketyamo.com",
    siteName: "Worketyamo",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/seo.jpg",
        width: 1200,
        height: 630,
        alt: "Worketyamo - Tech talent Accelerator - Deep-dive bootcamps and live project experience",
        type: "image/jpeg",
      }
    ],
  },
  
  twitter: {
    card: "summary_large_image",
    title: "Worketyamo | Formations Tech & Bootcamps Certifiants",
    description: "Formations tech intensives & bootcamps certifiants. AWS, Python, Docker, UX/UI, IA.",
    images: ["/seo.jpg"],
    creator: "@worketyamo",
    site: "@worketyamo",
  },
  
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "",
  },
  
  alternates: {
    canonical: "https://worketyamo.com",
    languages: {
      "fr": "https://worketyamo.com",
      "fr-FR": "https://worketyamo.com",
    },
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  category: "Education",
  
  other: {
    // Geographic and language targeting
    "geo.region": "FR",
    "geo.country": "France",
    "content-language": "fr",
    
    // Mobile optimization
    "mobile-web-app-capable": "yes",
    "mobile-web-app-status-bar-style": "black-translucent",
    "mobile-web-app-title": "Worketyamo",
    
    // Social media optimization
    "fb:app_id": process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || "",
    "article:publisher": "https://www.facebook.com/worketyamo",
    
    // Content classification
    "audience": "professionals,students",
    "subject": "Education,Technology,Programming",
    "coverage": "worldwide",
    "distribution": "global",
    "rating": "general",
    
    // Pinterest optimization
    "pinterest:description": "Formations tech intensives & bootcamps certifiants pour accélérer votre carrière",
    
    // Schema hints
    "schema:organization": "true",
    "schema:educationalOrganization": "true",
  },
};

// Viewport configuration for mobile SEO
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#FF6B35',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* DNS Prefetch for external domains */}
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//www.clarity.ms" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        
        {/* Preconnect for critical resources */}
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="" />
        <link rel="preconnect" href="https://www.clarity.ms" crossOrigin="" />
        
        {/* Preload critical assets */}
        <link rel="preload" href="/Images/worketyamo.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/Images/background-place.jpg" as="image" type="image/jpeg" />
        
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YJ9DNFNHGH"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YJ9DNFNHGH');
          `}
        </Script>

        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "rkwdh50loc");
          `}
        </Script>
      </head>
      <body
        className={`antialiased ${geistSans.variable} ${geistMono.variable}`}
      >
        <QueryProvider>
          {children}
          <SpeedInsights />
        </QueryProvider>
      </body>
    </html>
  );
}