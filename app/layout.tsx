import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { LenisProvider } from "@/components/lenis-provider"
import ClickSpark from "@/components/click-spark"
import "./globals.css"

const _inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const _jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://alphatech-nutrition.in"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Alpha Tech Nutrition | High-Performance Gym & Sports Supplements",
    template: "%s | Alpha Tech Nutrition",
  },
  description:
    "Engineered for serious gains. Discover Alpha Tech Nutrition's premium sports nutrition line: Prime Whey, Anabolic Lean Muscle Builder, and Alpha Super Mass Gainer. 100% lab certified, zero banned substances.",
  keywords: [
    "Alpha Tech Nutrition",
    "Prime Whey",
    "Anabolic Lean Muscle Builder",
    "Alpha Super Mass Gainer",
    "Gym Supplements",
    "Sports Nutrition",
    "Whey Protein Concentrate",
    "Creatine Monohydrate",
    "Mass Gainer",
    "Supplement Authenticity Check",
    "Anti Counterfeit QR Verification",
  ],
  authors: [{ name: "Alpha Tech Nutrition", url: siteUrl }],
  creator: "Alpha Tech Nutrition",
  publisher: "Alpha Tech Nutrition",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/logo/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/logo/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/logo/apple-touch-icon-180x180.png",
    shortcut: "/logo/favicon-32x32.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Alpha Tech Nutrition",
    title: "Alpha Tech Nutrition | High-Performance Gym & Sports Supplements",
    description:
      "Fuel explosive muscle growth and rapid recovery with lab-certified sports nutrition formulas. Features 100% anti-counterfeit QR code authenticity verification.",
    images: [
      {
        url: "/logo/social-opengraph-ad-1200x630.png",
        width: 1200,
        height: 630,
        alt: "Alpha Tech Nutrition - High Performance Supplements",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alpha Tech Nutrition | High-Performance Gym & Sports Supplements",
    description: "Lab-tested sports nutrition formulas with QR authenticity verification.",
    images: ["/logo/social-opengraph-ad-1200x630.png"],
    creator: "@AlphaTechNutr",
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
}

export const viewport: Viewport = {
  themeColor: "#121212",
  colorScheme: "dark",
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Alpha Tech Nutrition",
      url: siteUrl,
      logo: `${siteUrl}/icon.svg`,
      description: "Manufacturer and brand of high-performance gym and sports nutrition dietary supplements.",
      sameAs: [
        "https://www.instagram.com/alphatechnutrition",
        "https://twitter.com/AlphaTechNutr",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Alpha Tech Nutrition",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-[#0B0E23] text-white">
        <ClickSpark
          sparkColor="#3B82F6"
          sparkSize={12}
          sparkRadius={20}
          sparkCount={8}
          duration={400}
          easing="ease-out"
        >
          <LenisProvider>{children}</LenisProvider>
        </ClickSpark>
        <Analytics />
      </body>
    </html>
  )
}
