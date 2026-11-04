"use client"

import type React from "react"
import { motion, AnimatePresence, useSpring } from "framer-motion"
import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react"
import { WhatsAppOrderButton } from "@/components/whatsapp-order-button"
import { FSSAI_LICENSE } from "@/lib/whatsapp"

interface Flavor {
  id: number
  name: string
  tagline: string
  description: string
  image: string
  bgColor: string
  accentColor: string
  badges: string[]
  weight: string
  mrp: string
  servings: string
  mystery?: boolean
}

const flavors: (Flavor & { slug: string })[] = [
  {
    id: 1,
    name: "Prime Whey",
    slug: "prime-whey",
    tagline: "Whey Protein Concentrate • Belgian Chocolate",
    description:
      "Advanced 100% Ultra-Filtered Whey Protein Concentrate delivering 24G Protein, 5.4G BCAA, and 100% Whey Formula per serving. Engineered for lean muscle support, faster recovery, and zero added sugar. Net Wt. 2kg (4.4 lbs) • 60 Servings.",
    image: "/images/prime-whey.png",
    bgColor: "from-blue-600/20 via-blue-500/10 to-transparent",
    accentColor: "#3B82F6",
    weight: "2 kg (4.4 lbs)",
    mrp: "₹4,460",
    servings: "60 Servings",
    badges: [
      "24G Protein",
      "5.4G BCAA",
      "100% Whey Formula",
      "Lean Muscle Support",
      "Faster Recovery",
      "Zero Added Sugar",
      "60 Servings",
    ],
  },
  {
    id: 2,
    name: "Anabolic Lean Muscle Builder",
    slug: "anabolic-lean-muscle-builder",
    tagline: "High-Carb Supplement For Lean Muscle Growth • Belgian Chocolate",
    description:
      "Hypertrophy Engineered Performance Matrix delivering 46G Protein, 10.3G BCAA, and 48G Carbs per 100g. Fast-absorbing energy drink powder with calcium, iron, and complete essential amino acids. Net Wt. 3kg (6.6 lbs) • 37 Servings.",
    image: "/images/anabolic-lean-muscle-builder.png",
    bgColor: "from-indigo-600/20 via-indigo-500/10 to-transparent",
    accentColor: "#6366F1",
    weight: "3 kg (6.6 lbs)",
    mrp: "₹4,460",
    servings: "37 Servings",
    badges: [
      "46G Protein / 100g",
      "10.3G BCAA",
      "48G Carbs",
      "Lean Muscle Growth",
      "Fast Absorbing",
      "37 Servings",
    ],
  },
  {
    id: 3,
    name: "Alpha Super Mass Gainer",
    slug: "alpha-super-mass-gainer",
    tagline: "Advanced Complex Carbohydrate Matrix • Belgian Chocolate",
    description:
      "Bulk Like a Beast formulation providing 31.5G Protein, 7.1G BCAA, and 58.5G Carbs per 100g. Infused with Ashwagandha, Safed Musli, Shatavari, and Purified Shilajit for explosive mass gains. Net Wt. 3kg (6.6 lbs) • 37 Servings.",
    image: "/images/alpha-super-mass-gainer.png",
    bgColor: "from-sky-600/20 via-blue-500/10 to-transparent",
    accentColor: "#0284C7",
    weight: "3 kg (6.6 lbs)",
    mrp: "₹3,520",
    servings: "37 Servings",
    badges: [
      "31.5G Protein / 100g",
      "7.1G BCAA",
      "58.5G Carbs",
      "Ashwagandha & Shilajit",
      "Explosive Gains",
      "37 Servings",
    ],
  },
]

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9,
    rotateY: direction > 0 ? 15 : -15,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 30,
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
    scale: 0.9,
    rotateY: direction > 0 ? -15 : 15,
  }),
}

export function FlavorCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [[page, direction], setPage] = useState([0, 0])
  const currentFlavor = flavors[currentIndex]

  const rotateX = useSpring(0, { stiffness: 150, damping: 20 })
  const rotateY = useSpring(0, { stiffness: 150, damping: 20 })
  const cardRectRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null)

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    cardRectRef.current = { left: r.left, top: r.top, width: r.width, height: r.height }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRectRef.current
    if (!rect) return
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / rect.width - 0.5
    const yPct = mouseY / rect.height - 0.5
    rotateX.set(-yPct * 10)
    rotateY.set(xPct * 10)
  }

  const handleMouseLeave = () => {
    cardRectRef.current = null
    rotateX.set(0)
    rotateY.set(0)
  }

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection])
    setCurrentIndex((prev) => {
      if (newDirection > 0) {
        return prev === flavors.length - 1 ? 0 : prev + 1
      }
      return prev === 0 ? flavors.length - 1 : prev - 1
    })
  }

  return (
    <section id="flavours" className="relative py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="font-mono text-blue-600 text-xs tracking-widest uppercase font-bold inline-flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              FSSAI LIC. {FSSAI_LICENSE} • 100% PURE FORMULAS
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-[#10163A] tracking-tighter mt-1">
              ELITE ATHLETE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                PRODUCT LINEUP
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-3 mt-6 md:mt-0">
            <button
              onClick={() => paginate(-1)}
              className="w-12 h-12 rounded-full border-2 border-[#10163A] flex items-center justify-center text-[#10163A] hover:bg-[#10163A] hover:text-white transition-all cursor-pointer shadow-md"
              aria-label="Previous product"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => paginate(1)}
              className="w-12 h-12 rounded-full border-2 border-[#10163A] flex items-center justify-center text-[#10163A] hover:bg-[#10163A] hover:text-white transition-all cursor-pointer shadow-md"
              aria-label="Next product"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Showcase */}
        <div className="relative min-h-[540px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full"
            >
              <motion.div
                onMouseEnter={handleMouseEnter}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50/40 rounded-3xl p-8 md:p-12 border-2 border-slate-200 shadow-2xl overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  {/* Left: Product Image */}
                  <div className="md:col-span-5 relative aspect-square flex items-center justify-center">
                    <motion.div
                      className="absolute inset-0 rounded-full blur-3xl opacity-30"
                      style={{ backgroundColor: currentFlavor.accentColor }}
                    />
                    <Image
                      src={currentFlavor.image}
                      alt={currentFlavor.name}
                      width={380}
                      height={380}
                      className="object-contain max-h-[380px] drop-shadow-[0_20px_35px_rgba(0,0,0,0.35)] relative z-10"
                      priority
                    />
                  </div>

                  {/* Right: Product Details & WhatsApp Ordering */}
                  <div className="md:col-span-7 space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                        {currentFlavor.tagline}
                      </span>
                      <span className="font-mono text-lg font-black text-[#10163A]">
                        {currentFlavor.mrp}
                      </span>
                    </div>

                    <h3 className="text-3xl md:text-5xl font-black text-[#10163A] tracking-tight uppercase leading-tight">
                      {currentFlavor.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-700 font-mono leading-relaxed">
                      {currentFlavor.description}
                    </p>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {currentFlavor.badges.map((b) => (
                        <span
                          key={b}
                          className="px-2.5 py-1 bg-[#10163A]/5 border border-[#10163A]/10 rounded-lg text-xs font-mono font-semibold text-[#10163A]"
                        >
                          ✓ {b}
                        </span>
                      ))}
                    </div>

                    {/* Actions: Buy on WhatsApp + View Details */}
                    <div className="pt-4 flex flex-wrap items-center gap-3">
                      <WhatsAppOrderButton
                        productName={currentFlavor.name}
                        flavor="Belgian Chocolate"
                        weight={currentFlavor.weight}
                        mrp={currentFlavor.mrp}
                        size="md"
                        label="Buy on WhatsApp"
                      />

                      <Link
                        href={`/products/${currentFlavor.slug}`}
                        className="px-6 py-3 rounded-2xl bg-[#10163A] hover:bg-[#1a235c] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-blue-950/20"
                      >
                        View Full Specs & Label
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
