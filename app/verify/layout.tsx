import type { Metadata } from "next"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://alphatech-nutrition.in"

export const metadata: Metadata = {
  title: "Verify Product Authenticity | 100% Genuine Certified",
  description:
    "Official Alpha Tech Nutrition anti-counterfeiting verification portal. Enter your security serial code or scan your product QR sticker to verify batch authenticity, lab clearance, and genuine quality.",
  keywords: [
    "Alpha Tech Nutrition verification",
    "verify genuine supplements",
    "anti counterfeit gym supplements",
    "prime whey authenticity",
    "batch verification",
    "lab tested sports nutrition",
    "FSSAI 21524018000384",
  ],
  alternates: {
    canonical: "/verify",
  },
  openGraph: {
    title: "Verify Product Authenticity | Alpha Tech Nutrition",
    description:
      "Instant authentication for Prime Whey, Anabolic Lean Muscle Builder, and Alpha Super Mass Gainer. Confirm 100% genuine formulation.",
    url: `${siteUrl}/verify`,
    siteName: "Alpha Tech Nutrition",
    images: [
      {
        url: "/images/prime-whey.png",
        width: 1200,
        height: 630,
        alt: "Alpha Tech Nutrition Authenticity Verification",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Verify Product Authenticity | Alpha Tech Nutrition",
    description: "Scan or enter your security serial code to verify 100% genuine Alpha Tech Nutrition supplements.",
    images: ["/images/prime-whey.png"],
  },
}

export default function VerifyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const verifyJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${siteUrl}/verify#app`,
        name: "Alpha Tech Supplement Authenticity Verifier",
        applicationCategory: "SecurityApplication",
        operatingSystem: "All",
        url: `${siteUrl}/verify`,
        description: "Official QR code and batch serial verification tool for Alpha Tech Nutrition supplements.",
        browserRequirements: "Requires JavaScript. Requires HTML5.",
        creator: {
          "@type": "Organization",
          name: "Alpha Tech Nutrition",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}/verify#breadcrumbs`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Verify Authenticity",
            item: `${siteUrl}/verify`,
          },
        ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(verifyJsonLd) }}
      />
      {children}
    </>
  )
}
