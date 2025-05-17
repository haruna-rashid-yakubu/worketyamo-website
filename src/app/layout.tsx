import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Worketyamo - Accélérateur de talents tech",
  description: "Bootcamps intensifs et expérience de projet réel vous permettant de lancer une carrière technologique à fort impact.",
  icons: {
    icon: "/Images/icons/worketyamo-favicon.png",
    apple: "/Images/icons/worketyamo-favicon.png",
  },
  openGraph: {
    title: "Worketyamo - Accélérateur de talents tech",
    description: "Bootcamps intensifs et expérience de projet réel vous permettant de lancer une carrière technologique à fort impact.",
    images: [
      {
        url: "/Images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Worketyamo Logo et Image de couverture",
      }
    ],
    locale: "fr_FR",
    type: "website",
    siteName: "Worketyamo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Worketyamo - Accélérateur de talents tech",
    description: "Bootcamps intensifs et expérience de projet réel vous permettant de lancer une carrière technologique à fort impact.",
    images: ["/Images/twitter-image.jpg"],
    creator: "@worketyamo",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
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
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}