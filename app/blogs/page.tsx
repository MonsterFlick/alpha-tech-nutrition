import type { Metadata } from "next"
import { BlogsView } from "@/components/blogs-view"
import { BLOG_POSTS } from "@/lib/blog-data"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://alphatech-nutrition.in"

export const metadata: Metadata = {
  title: "Training & Nutrition Science Blog Hub | Alpha Tech Nutrition",
  description:
    "Evidence-based supplement guides, muscle hypertrophy protocols, mass building nutrition, and supplement authenticity verification. Backed by certified sports nutritionists.",
  alternates: {
    canonical: "/blogs",
  },
  openGraph: {
    title: "Training & Nutrition Science Hub | Alpha Tech Nutrition",
    description:
      "Deep dives into whey protein kinetics, hardgainer mass formulas, and anti-counterfeit QR code security.",
    url: `${siteUrl}/blogs`,
    type: "website",
    images: [
      {
        url: "/images/fullscreen_banner_prime_whey.png",
        width: 1200,
        height: 630,
        alt: "Alpha Tech Nutrition Research Articles",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alpha Tech Training & Nutrition Science Hub",
    description: "Evidence-based supplement guides and muscle building protocols.",
    images: ["/images/fullscreen_banner_prime_whey.png"],
  },
}

export default function BlogsPage() {
  const blogsJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${siteUrl}/blogs#webpage`,
        url: `${siteUrl}/blogs`,
        name: "Training & Nutrition Science Hub",
        description: "Evidence-based research articles and sports nutrition guides by Alpha Tech Nutrition.",
        isPartOf: {
          "@id": `${siteUrl}/#website`,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}/blogs#breadcrumbs`,
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
            name: "Blog",
            item: `${siteUrl}/blogs`,
          },
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${siteUrl}/blogs#articles`,
        name: "Sports Nutrition Guides and Hypertrophy Articles",
        numberOfItems: BLOG_POSTS.length,
        itemListElement: BLOG_POSTS.map((post, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: post.title,
          url: `${siteUrl}/blogs/${post.slug}`,
        })),
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogsJsonLd) }}
      />
      <BlogsView />
    </>
  )
}
