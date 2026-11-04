"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, BookOpen, Clock, Calendar } from "lucide-react"
import { BLOG_POSTS } from "@/lib/blog-data"
import { getProductById } from "@/lib/product-catalog"
import { WhatsAppOrderButton } from "@/components/whatsapp-order-button"

export function BlogPreviewSection() {
  const featuredPosts = BLOG_POSTS.slice(0, 3)

  return (
    <section className="relative py-20 bg-[#070A1B] overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-blue-400 text-xs tracking-widest uppercase font-bold inline-flex items-center gap-1.5 mb-2">
              <BookOpen className="w-4 h-4" />
              NUTRITION RESEARCH & EDUCATION
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase">
              LATEST ARTICLES & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                TRAINING GUIDES
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all"
            >
              <span>Explore All Guides</span>
              <ArrowRight className="w-4 h-4 text-blue-400" />
            </Link>
          </motion.div>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredPosts.map((post, idx) => {
            const product = getProductById(post.promotedProductId)
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
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-5 bg-[#070A1B] border border-white/5">
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono text-blue-400 border border-blue-500/30">
                      {post.category}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-[11px] font-mono text-white/50 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {post.publishDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-black uppercase text-white tracking-tight group-hover:text-blue-400 transition-colors line-clamp-2">
                    <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <p className="text-xs font-mono text-white/60 mt-2 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-white/10 flex items-center justify-between gap-2">
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
                  >
                    <span>Read</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  {product && (
                    <WhatsAppOrderButton
                      productName={product.name}
                      flavor={product.flavor}
                      weight={product.weight}
                      mrp={product.mrp}
                      size="sm"
                      label="Buy via WhatsApp"
                    />
                  )}
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
