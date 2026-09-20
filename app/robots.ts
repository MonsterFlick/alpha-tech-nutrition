import type { MetadataRoute } from "next"

export const dynamic = "force-static"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://alphatech-nutrition.in"

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/qr-generator", "/api/admin/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
