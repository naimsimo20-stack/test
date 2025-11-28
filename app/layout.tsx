import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Script from "next/script"
import { SkipToContent } from "@/components/accessibility-skip-link"

const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
})
const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title:
    "Prestigia Agency - Agence Digital Marketing à Casablanca | SEO, Branding & Web Design",
  description:
    "Prestigia Agency : Agence de marketing digital à Casablanca spécialisée en SEO, branding, développement web et stratégie digitale. 150+ projets réalisés.",
  keywords: [
    "agence marketing digital Casablanca",
    "SEO Casablanca",
    "branding Maroc",
    "développement web Casablanca",
    "agence web Maroc",
    "référencement naturel Maroc",
    "community management",
    "stratégie digitale",
  ],
  metadataBase: new URL("https://prestigia-agency.com"),
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    title:
      "Prestigia Agency - Excellence Digitale | SEO & Marketing Digital",
    description:
      "Transformez votre présence digitale avec notre agence spécialisée en SEO, branding et développement web.",
    siteName: "Prestigia Agency",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Prestigia Agency - Excellence Digitale",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prestigia Agency - Excellence Digitale",
    description:
      "Agence de marketing digital à Casablanca (SEO, branding, développement web)",
    images: ["/og-image.png"],
    creator: "@prestigia_agency",
  },
  icons: {
    icon: "/images/prestigia-logo.png",
    apple: "/images/prestigia-logo.png",
  },
  alternates: {
    canonical: "/",
    languages: {
      fr: "/fr",
      en: "/en",
    },
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
    other: {
      "msvalidate.01": "ms-verification-code",
    },
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${geistSans.className} ${geistMono.variable}`}>
      <head>
        {/* Font Preload */}
        <link
          rel="preload"
          href="/fonts/Geist.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://wa.me" />

        {/* Preload hero image */}
        <link rel="preload" as="image" href="/images/hero-innovation.png" />

        {/* Analytics */}
        <Script
          src="https://cdn.vercel-analytics.com/v1/web.js"
          strategy="afterInteractive"
        />

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script
          id="ga-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />
      </head>

      <body className="antialiased">
        <SkipToContent />
        <main id="main-content">{children}</main>
      </body>
    </html>
  )
}
