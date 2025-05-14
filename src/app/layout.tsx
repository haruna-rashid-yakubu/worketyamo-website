import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased"
      >
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
