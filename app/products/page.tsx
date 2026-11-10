import type { Metadata } from "next"
import { ProductsView } from "@/components/products-view"
import { PRODUCTS_CATALOG } from "@/lib/product-catalog"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://alphatech-nutrition.in"

export const metadata: Metadata = {
  title: "Products Catalog | High-Performance Gym & Sports Supplements",
  description:
    "Explore Alpha Tech Nutrition's laboratory-tested sports nutrition range: Prime Whey, Anabolic Lean Muscle Builder, and Alpha Super Mass Gainer. FSSAI Lic. 21524018000384. Order via WhatsApp.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "Products Catalog | Alpha Tech Nutrition",
    description:
      "Engineered for serious lifters and athletes. 100% lab certified, anti-counterfeit QR code verified, direct WhatsApp ordering.",
    url: `${siteUrl}/products`,
    type: "website",
    images: [
      {
        url: "/logo/social-opengraph-ad-1200x630.png",
        width: 1200,
        height: 630,
        alt: "Alpha Tech Nutrition Product Lineup",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alpha Tech Nutrition Products Catalog",
    description: "Premium whey protein, lean muscle builders, and mass gainers. FSSAI Lic. 21524018000384.",
    images: ["/logo/social-opengraph-ad-1200x630.png"],
  },
}

export default function ProductsPage() {
  const catalogJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${siteUrl}/products#webpage`,
        url: `${siteUrl}/products`,
        name: "Alpha Tech Nutrition Products Catalog",
        description: "High-performance sports nutrition and bodybuilding dietary supplements.",
        isPartOf: {
          "@id": `${siteUrl}/#website`,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}/products#breadcrumbs`,
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
            name: "Products",
            item: `${siteUrl}/products`,
          },
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${siteUrl}/products#catalog`,
        name: "Alpha Tech Nutrition Dietary Supplements",
        numberOfItems: PRODUCTS_CATALOG.length,
        itemListElement: PRODUCTS_CATALOG.map((p, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: p.name,
          url: `${siteUrl}/products/${p.id}`,
          image: `${siteUrl}${p.image}`,
        })),
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogJsonLd) }}
      />
      <ProductsView />
    </>
  )
}
