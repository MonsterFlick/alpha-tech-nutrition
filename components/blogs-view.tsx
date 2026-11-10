"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsAppOrderButton } from "@/components/whatsapp-order-button"
import { BLOG_POSTS } from "@/lib/blog-data"
import { getProductById } from "@/lib/product-catalog"
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  Filter,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react"
import { WHATSAPP_DISPLAY_PHONE, INSTAGRAM_HANDLE, FSSAI_LICENSE } from "@/lib/whatsapp"

const CATEGORIES = ["All", "Local Guide", "Protein Science", "Mass Building", "Hypertrophy", "Authenticity", "Nutrition Guide"]

export function BlogsView() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredPosts = BLOG_POSTS.filter(
    (post) => selectedCategory === "All" || post.category === selectedCategory
  )

  const featuredPost = BLOG_POSTS[0]

  return (
    <main className="min-h-screen bg-[#070A1B] text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-[#0B0E23] via-[#080B1C] to-[#070A1B]">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-blue-600/15 blur-[140px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-bold uppercase tracking-wider mb-4"
          >
            <BookOpen className="w-4 h-4" />
            Alpha Tech Performance & Nutrition Science Hub
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase"
          >
            TRAINING & NUTRITION <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-400">
              RESEARCH ARTICLES & GUIDES
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-white/60 text-sm sm:text-base max-w-2xl mx-auto font-mono leading-relaxed"
          >
            Evidence-based supplement guides, hypertrophy protocols, and anti-counterfeit safety education. Backed by certified sports nutritionists.
          </motion.p>

          {/* Quick Info Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-white/60"
          >
            <span className="flex items-center gap-1.5 bg-[#0E132D] px-3.5 py-1.5 rounded-full border border-blue-500/20">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> FSSAI Lic. {FSSAI_LICENSE}
            </span>
            <span className="flex items-center gap-1.5 bg-[#0E132D] px-3.5 py-1.5 rounded-full border border-blue-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400" /> WhatsApp Orders: {WHATSAPP_DISPLAY_PHONE}
            </span>
            <a
              href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-[#0E132D] hover:bg-[#151C42] px-3.5 py-1.5 rounded-full border border-blue-500/20 text-white hover:text-blue-400 transition-colors"
            >
              <span>@{INSTAGRAM_HANDLE}</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Featured Blog Highlight Banner */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto -mt-4 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-r from-[#0D122B] via-[#101738] to-[#0D122B] border-2 border-blue-500/30 rounded-3xl p-6 sm:p-10 overflow-hidden shadow-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/30 px-3 py-1 rounded-full">
                  ★ Featured Article
                </span>
                <span className="text-[11px] font-mono text-white/40">
                  {featuredPost.readTime}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-white tracking-tight leading-tight">
                {featuredPost.title}
              </h2>

              <p className="text-sm font-mono text-white/70 leading-relaxed">
                {featuredPost.excerpt}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href={`/blogs/${featuredPost.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-blue-600/30"
                >
                  <span>Read Complete Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <WhatsAppOrderButton
                  productName="Prime Whey"
                  flavor="Belgian Chocolate"
                  weight="2 kg (4.4 lbs)"
                  mrp="₹4,460"
                  size="sm"
                  label="Order Prime Whey"
                />
              </div>
            </div>

            <div className="lg:col-span-5 relative aspect-video lg:aspect-square rounded-2xl overflow-hidden border border-white/10 bg-[#070A1B]">
              <Image
                src={featuredPost.featuredImage}
                alt={featuredPost.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Filter and Grid */}
      <section className="py-8 px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-white/70">
            <Filter className="w-4 h-4 text-blue-400" />
            <span>Filter By Topic:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-105"
                    : "bg-[#0E132D] text-white/60 hover:text-white hover:bg-[#151C42] border border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, idx) => {
            const promotedProduct = getProductById(post.promotedProductId)
            return (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-[#0D122B] border-2 border-blue-950/70 hover:border-blue-500/50 rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between shadow-xl hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] group"
              >
                <div>
                  {/* Image */}
                  <div className="relative aspect-video w-full bg-[#070A1B] rounded-2xl overflow-hidden mb-5 border border-white/5">
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono text-blue-400 border border-blue-500/30">
                      {post.category}
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center gap-4 text-[11px] font-mono text-white/50 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {post.publishDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {post.readTime}
                    </span>
                  </div>

                  {/* Title & Excerpt */}
                  <h3 className="text-lg font-black uppercase text-white tracking-tight group-hover:text-blue-400 transition-colors line-clamp-2">
                    <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-xs font-mono text-white/60 mt-2 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Promoted Product Capsule */}
                  {promotedProduct && (
                    <div className="mt-4 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] font-mono uppercase text-blue-400 font-bold">
                          Featured Supplement:
                        </div>
                        <div className="text-xs font-bold text-white">
                          {promotedProduct.name}
                        </div>
                      </div>
                      <span className="text-[11px] font-mono font-bold text-emerald-400">
                        {promotedProduct.mrp}
                      </span>
                    </div>
                  )}
                </div>

                {/* Bottom Actions */}
                <div className="pt-5 mt-5 border-t border-white/10 flex items-center justify-between gap-3">
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400 hover:text-blue-300 flex items-center gap-1.5 transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  {promotedProduct && (
                    <WhatsAppOrderButton
                      productName={promotedProduct.name}
                      flavor={promotedProduct.flavor}
                      weight={promotedProduct.weight}
                      mrp={promotedProduct.mrp}
                      size="sm"
                      label="Buy"
                    />
                  )}
                </div>
              </motion.article>
            )
          })}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-blue-900/40 border border-blue-500/30 p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1.5 rounded-full">
              <CheckCircle2 className="w-4 h-4" /> Official WhatsApp Order Support
            </span>
            <h2 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight">
              NEED HELP CHOOSING THE RIGHT SUPPLEMENT?
            </h2>
            <p className="text-xs sm:text-sm font-mono text-white/70">
              Chat directly with our certified sports nutrition advisors on WhatsApp at{" "}
              <strong className="text-white">{WHATSAPP_DISPLAY_PHONE}</strong> for personalized supplement stacks, bulk ordering, or gym partner inquiries.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <a
                href={`https://wa.me/918380889935?text=${encodeURIComponent(
                  "Hello Alpha Tech Nutrition, I need personalized supplement stack advice for my workout goals!"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-500/30 transition-all"
              >
                <span>Chat on WhatsApp Now</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                href="/products"
                className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all"
              >
                Browse Full Catalog
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

