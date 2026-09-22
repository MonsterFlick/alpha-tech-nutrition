"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PRODUCTS_CATALOG } from "@/lib/product-catalog"
import {
  Award,
  Sparkles,
  CheckCircle2,
  FileCheck,
  Filter,
  ArrowRight
} from "lucide-react"

const CATEGORIES = ["All", "Protein", "Muscle Builder", "Mass Gainer"]

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredProducts = PRODUCTS_CATALOG.filter(
    (p) => selectedCategory === "All" || p.category.toLowerCase() === selectedCategory.toLowerCase()
  )

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
            <Sparkles className="w-4 h-4" />
            Lab-Certified Supplement Lineup
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase"
          >
            ALPHA TECH NUTRITION <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-400">
              PRODUCTS CATALOG
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-white/60 text-sm sm:text-base max-w-2xl mx-auto font-mono leading-relaxed"
          >
            Engineered with ultra-pure pharmaceutical-grade ingredients backed by 3rd-party lab assays.
          </motion.p>

          {/* Quick Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            <div className="bg-[#0E132D]/80 border border-blue-500/20 rounded-2xl p-4 text-center">
              <div className="text-2xl font-black text-blue-400 font-mono">100%</div>
              <div className="text-[11px] font-mono text-white/60 uppercase mt-1">WADA Dope Free</div>
            </div>
            <div className="bg-[#0E132D]/80 border border-blue-500/20 rounded-2xl p-4 text-center">
              <div className="text-2xl font-black text-indigo-400 font-mono">ISO 22000</div>
              <div className="text-[11px] font-mono text-white/60 uppercase mt-1">GMP Certified</div>
            </div>
            <div className="bg-[#0E132D]/80 border border-blue-500/20 rounded-2xl p-4 text-center">
              <div className="text-2xl font-black text-sky-400 font-mono">99.8%+</div>
              <div className="text-[11px] font-mono text-white/60 uppercase mt-1">Protein Purity</div>
            </div>
            <div className="bg-[#0E132D]/80 border border-blue-500/20 rounded-2xl p-4 text-center">
              <div className="text-2xl font-black text-emerald-400 font-mono">100% PURE</div>
              <div className="text-[11px] font-mono text-white/60 uppercase mt-1">3rd-Party Lab Tested</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Products Showcase Section */}
      <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-white/70">
            <Filter className="w-4 h-4 text-blue-400" />
            <span>Filter Category:</span>
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

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, idx) => {
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-[#0D122B] border-2 border-blue-950/70 hover:border-blue-500/50 rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between shadow-xl hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] group"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/30">
                      {product.category}
                    </span>
                    <span className="text-[10px] font-mono text-white/40">
                      SKU: {product.sku}
                    </span>
                  </div>

                  {/* Product Image Container */}
                  <div className="relative aspect-square w-full bg-[#070A1B]/60 rounded-2xl p-4 flex items-center justify-center mb-6 group-hover:scale-102 transition-transform duration-300 border border-white/5">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={280}
                      height={280}
                      className="object-contain max-h-56 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                    />
                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-mono text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> 100% Purity
                    </div>
                  </div>

                  {/* Product Title & Tagline */}
                  <h3 className="text-xl font-black uppercase text-white tracking-tight group-hover:text-blue-400 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs font-mono text-white/60 mt-1 line-clamp-2">
                    {product.tagline}
                  </p>

                  {/* Key Stats Bar */}
                  <div className="grid grid-cols-2 gap-2 my-4 p-3 rounded-xl bg-[#070A1B]/80 border border-white/10 text-xs font-mono">
                    <div>
                      <div className="text-white/40 text-[10px]">WEIGHT / VOL</div>
                      <div className="font-bold text-white mt-0.5">{product.weight}</div>
                    </div>
                    <div>
                      <div className="text-white/40 text-[10px]">PROTEIN / ACTIVE</div>
                      <div className="font-bold text-blue-400 mt-0.5">{product.proteinPerServing}</div>
                    </div>
                  </div>

                  {/* Certifications Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {product.certifications.slice(0, 3).map((cert) => (
                      <span
                        key={cert}
                        className="text-[10px] font-mono bg-white/5 border border-white/10 text-white/70 px-2.5 py-1 rounded-lg"
                      >
                        ✓ {cert}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-white/10">
                  <Link
                    href={`/products/${product.id}`}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs font-mono uppercase tracking-wider rounded-xl transition-all shadow-md shadow-blue-600/20 flex items-center justify-center gap-2"
                  >
                    <FileCheck className="w-4 h-4" />
                    <span>View Product Details</span>
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      <Footer />
    </main>
  )
}
