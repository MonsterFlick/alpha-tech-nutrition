import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Verify Product Authenticity | 100% Genuine Certified | Alpha Tech Nutrition",
  description:
    "Official Alpha Tech Nutrition anti-counterfeiting verification portal. Enter your security serial code or scan your product QR sticker to verify batch authenticity, lab clearance, and genuine quality.",
  keywords: [
    "Alpha Tech Nutrition verification",
    "verify genuine supplements",
    "anti counterfeit gym supplements",
    "prime whey authenticity",
    "batch verification",
    "lab tested sports nutrition",
  ],
  openGraph: {
    title: "Verify Product Authenticity | Alpha Tech Nutrition",
    description:
      "Instant authentication for Prime Whey, Anabolic Lean Muscle Builder, and Alpha Super Mass Gainer. Confirm 100% genuine formulation.",
    url: "https://alphatechnutrition.com/verify",
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
  return <>{children}</>
}
