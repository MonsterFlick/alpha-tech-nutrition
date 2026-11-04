import type { MetadataRoute } from "next"
import { PRODUCTS_CATALOG } from "@/lib/product-catalog"
import { BLOG_POSTS } from "@/lib/blog-data"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://alphatech-nutrition.in"
  const lastModified = new Date()

  const productUrls: MetadataRoute.Sitemap = PRODUCTS_CATALOG.map((p) => ({
    url: `${baseUrl}/products/${p.id}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.9,
  }))

  const blogUrls: MetadataRoute.Sitemap = BLOG_POSTS.map((b) => ({
    url: `${baseUrl}/blogs/${b.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.95,
    },
    ...productUrls,
    {
      url: `${baseUrl}/blogs`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.85,
    },
    ...blogUrls,
    {
      url: `${baseUrl}/verify`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.9,
    },
  ]
}
