import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsAppOrderButton } from "@/components/whatsapp-order-button"
import { BLOG_POSTS, getBlogPostBySlug } from "@/lib/blog-data"
import { getProductById } from "@/lib/product-catalog"
import {
  ChevronRight,
  Calendar,
  Clock,
  Share2,
  Instagram,
} from "lucide-react"
import { WHATSAPP_DISPLAY_PHONE, INSTAGRAM_HANDLE, INSTAGRAM_URL, FSSAI_LICENSE } from "@/lib/whatsapp"

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) {
    return {
      title: "Blog Post Not Found",
    }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://alphatech-nutrition.in"
  const url = `${siteUrl}/blogs/${post.slug}`
  const imageUrl = post.featuredImage.startsWith("http")
    ? post.featuredImage
    : `${siteUrl}${post.featuredImage}`

  return {
    title: `${post.title} | Alpha Tech Nutrition`,
    description: post.excerpt,
    alternates: {
      canonical: `/blogs/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime: post.publishDate,
      authors: [post.author.name],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [imageUrl],
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://alphatech-nutrition.in"
  const imageUrl = post.featuredImage.startsWith("http")
    ? post.featuredImage
    : `${siteUrl}${post.featuredImage}`
  const promotedProduct = getProductById(post.promotedProductId)
  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3)

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${siteUrl}/blogs/${post.slug}#article`,
        headline: post.title,
        description: post.excerpt,
        image: imageUrl,
        datePublished: "2026-11-02T08:00:00+05:30",
        dateModified: "2026-11-10T12:00:00+05:30",
        author: {
          "@type": "Person",
          name: post.author.name,
          jobTitle: post.author.role,
        },
        publisher: {
          "@type": "Organization",
          name: "Alpha Tech Nutrition",
          url: siteUrl,
          logo: {
            "@type": "ImageObject",
            url: `${siteUrl}/icon.svg`,
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${siteUrl}/blogs/${post.slug}`,
        },
        about: {
          "@type": "Product",
          name: promotedProduct?.name || "Alpha Tech Nutrition Supplements",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}/blogs/${post.slug}#breadcrumbs`,
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
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: `${siteUrl}/blogs/${post.slug}`,
          },
        ],
      },
    ],
  }

  return (
    <main className="min-h-screen bg-[#070A1B] text-white selection:bg-blue-600 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <Navigation />

      {/* Article Header & Breadcrumbs */}
      <section className="pt-32 pb-12 px-4 sm:px-6 relative overflow-hidden bg-gradient-to-b from-[#0B0E23] via-[#080B1C] to-[#070A1B]">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-[150px] pointer-events-none rounded-full" />

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-mono text-white/50 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/30" />
            <Link href="/blogs" className="hover:text-white transition-colors">
              Blog
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/30" />
            <span className="text-blue-400 font-bold truncate">{post.category}</span>
          </div>

          {/* Category Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-bold uppercase tracking-wider mb-4">
            {post.category}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="mt-4 text-base sm:text-lg font-mono text-white/70 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Author & Meta bar */}
          <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-white/60">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600/30 border border-blue-500/30 flex items-center justify-center p-1.5 overflow-hidden">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>
              <div>
                <div className="font-bold text-white">{post.author.name}</div>
                <div className="text-[11px] text-white/40">{post.author.role}</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-blue-400" /> {post.publishDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-400" /> {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="px-4 sm:px-6 max-w-4xl mx-auto -mt-4 mb-12">
        <div className="relative aspect-video w-full rounded-3xl overflow-hidden border-2 border-blue-950/70 shadow-2xl bg-[#080B1C]">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Main Content & Promotional Spotlight */}
      <section className="px-4 sm:px-6 max-w-4xl mx-auto pb-16">
        <div className="space-y-8 font-mono text-white/80 leading-relaxed text-sm sm:text-base">
          {/* Article Markdown Rendered Content */}
          <div className="prose prose-invert max-w-none space-y-6">
            {post.content.split("\n\n").map((block, i) => {
              if (block.startsWith("## ")) {
                return (
                  <h2
                    key={i}
                    className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight mt-10 mb-4 pt-4 border-t border-white/10"
                  >
                    {block.replace("## ", "")}
                  </h2>
                )
              }
              if (block.startsWith("### ")) {
                return (
                  <h3
                    key={i}
                    className="text-xl sm:text-2xl font-black uppercase text-blue-400 tracking-tight mt-6 mb-3"
                  >
                    {block.replace("### ", "")}
                  </h3>
                )
              }
              if (block.startsWith("- ")) {
                return (
                  <ul key={i} className="list-disc pl-6 space-y-2 text-white/70">
                    {block.split("\n").map((item, j) => (
                      <li key={j}>{item.replace("- ", "")}</li>
                    ))}
                  </ul>
                )
              }
              if (block.startsWith("1. ") || block.startsWith("2. ")) {
                return (
                  <ol key={i} className="list-decimal pl-6 space-y-2 text-white/70">
                    {block.split("\n").map((item, j) => (
                      <li key={j}>{item.replace(/^\d+\.\s*/, "")}</li>
                    ))}
                  </ol>
                )
              }
              return (
                <p key={i} className="text-white/75 leading-relaxed">
                  {block}
                </p>
              )
            })}
          </div>

          {/* Promoted Product Feature Card Embedded inside Article */}
          {promotedProduct && (
            <div className="my-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0D122B] via-[#101738] to-[#0D122B] border-2 border-emerald-500/40 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-gradient-to-l from-emerald-500/10 to-transparent w-full h-full pointer-events-none" />

              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full">
                  ★ Official Alpha Tech Supplement
                </span>
                <span className="text-[10px] font-mono text-white/40">
                  FSSAI Lic. {FSSAI_LICENSE}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-4 relative aspect-square rounded-2xl bg-[#070A1B] p-4 border border-white/10 flex items-center justify-center">
                  <Image
                    src={promotedProduct.image}
                    alt={promotedProduct.name}
                    width={240}
                    height={240}
                    className="object-contain max-h-48 drop-shadow-2xl"
                  />
                </div>

                <div className="md:col-span-8 space-y-3">
                  <h3 className="text-2xl font-black uppercase text-white tracking-tight">
                    {promotedProduct.name}
                  </h3>
                  <p className="text-xs font-mono text-blue-400 font-semibold">
                    {promotedProduct.tagline}
                  </p>

                  <div className="grid grid-cols-3 gap-2 py-2 text-xs font-mono">
                    <div className="bg-[#070A1B] p-2.5 rounded-xl border border-white/5">
                      <div className="text-[10px] text-white/40">WEIGHT</div>
                      <div className="font-bold text-white mt-0.5">{promotedProduct.weight}</div>
                    </div>
                    <div className="bg-[#070A1B] p-2.5 rounded-xl border border-white/5">
                      <div className="text-[10px] text-white/40">SERVINGS</div>
                      <div className="font-bold text-white mt-0.5">{promotedProduct.servings}</div>
                    </div>
                    <div className="bg-[#070A1B] p-2.5 rounded-xl border border-white/5">
                      <div className="text-[10px] text-white/40">MRP</div>
                      <div className="font-bold text-emerald-400 mt-0.5">{promotedProduct.mrp}</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <WhatsAppOrderButton
                      productName={promotedProduct.name}
                      flavor={promotedProduct.flavor}
                      weight={promotedProduct.weight}
                      mrp={promotedProduct.mrp}
                      sku={promotedProduct.sku}
                      size="md"
                      label="Buy Now on WhatsApp"
                      sublabel={`Direct Order • ${WHATSAPP_DISPLAY_PHONE}`}
                    />

                    <Link
                      href={`/products/${promotedProduct.id}`}
                      className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all"
                    >
                      <span>View Full Specs</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Social Share & Instagram Follow */}
          <div className="p-6 rounded-2xl bg-[#0E132D] border border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono uppercase font-bold text-white">
                Share This Article Or Connect With Us:
              </div>
              <div className="text-xs font-mono text-white/50 mt-0.5">
                Follow our official fitness community on Instagram
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-mono font-bold text-xs flex items-center gap-2 shadow-md transition-all"
              >
                <Instagram className="w-4 h-4" />
                <span>@{INSTAGRAM_HANDLE}</span>
              </a>

              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  `Check out this article from Alpha Tech Nutrition: ${post.title} - https://alphatech-nutrition.in/blogs/${post.slug}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs flex items-center gap-2 shadow-md transition-all"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-12 px-4 sm:px-6 bg-[#050714] border-t border-white/10">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
              Related Articles & Research
            </h2>
            <Link
              href="/blogs"
              className="text-xs font-mono font-bold uppercase text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              <span>View All Blogs</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((rel) => (
              <Link
                key={rel.slug}
                href={`/blogs/${rel.slug}`}
                className="p-5 rounded-2xl bg-[#0B0E23] border border-white/10 hover:border-blue-500/50 transition-all group flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono text-blue-400 uppercase tracking-wider font-bold">
                    {rel.category}
                  </span>
                  <h3 className="text-sm font-black uppercase text-white group-hover:text-blue-400 transition-colors mt-2 line-clamp-2">
                    {rel.title}
                  </h3>
                  <p className="text-xs font-mono text-white/50 mt-1 line-clamp-2">
                    {rel.excerpt}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-white/5 text-[11px] font-mono text-white/40 flex items-center justify-between">
                  <span>{rel.readTime}</span>
                  <span className="text-blue-400 flex items-center gap-1">
                    Read <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
