"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, ArrowRight, Dumbbell, ShieldCheck, Instagram, Globe } from "lucide-react"

const BANNERS = [
  {
    id: "all-products",
    tagline: "BREAK YOUR POTENTIAL",
    productTitle: "ALPHA TECH HARDCORE NUTRITION",
    specs: "100% PURITY • MAXIMUM GAINS • SCIENTIFICALLY BACKED FORMULAS",
    bgImage: "/images/fullscreen_banner_all_products.png",
    accentColor: "#A855F7",
    slug: "", // links to /products
    ctaText: "Explore All Products",
  },
  {
    id: "prime-whey",
    tagline: "FUEL YOUR MUSCLE RECOVERY",
    productTitle: "PRIME WHEY",
    specs: "24G ISOLATE & CONCENTRATE • 6.8G BCAA • ZERO SUGAR",
    bgImage: "/images/fullscreen_banner_prime_whey.png",
    accentColor: "#A855F7",
    slug: "prime-whey",
    ctaText: "Explore Prime Whey",
  },
  {
    id: "anabolic-lean-muscle-builder",
    tagline: "UNLEASH HARDCORE GAINS",
    productTitle: "ANABOLIC LEAN MUSCLE BUILDER",
    specs: "18G HIGH PROTEIN • 3G CREATINE MONOHYDRATE • STRENGTH MATRIX",
    bgImage: "/images/fullscreen_banner_anabolic_muscle.png",
    accentColor: "#3B82F6",
    slug: "anabolic-lean-muscle-builder",
    ctaText: "Explore Muscle Builder",
  },
  {
    id: "alpha-super-mass-gainer",
    tagline: "DOMINATE EVERY SET",
    productTitle: "ALPHA SUPER MASS GAINER",
    specs: "CLEAN COMPLEX CARB MATRIX • EXPLOSIVE CALORIC DENSITY",
    bgImage: "/images/fullscreen_banner_super_mass_gainer.png",
    accentColor: "#0284C7",
    slug: "alpha-super-mass-gainer",
    ctaText: "Explore Mass Gainer",
  }
]

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.25, 0.4, 0.25, 1] as const,
    },
  }),
}

const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 20,
      delay: 0.3,
    },
  },
}

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 160])
  const textX1 = useTransform(scrollYProgress, [0, 1], [0, -60])
  const textX2 = useTransform(scrollYProgress, [0, 1], [0, 60])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.94])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BANNERS.length)
    }, 5500)
    return () => clearInterval(timer)
  }, [isPaused])

  const banner = BANNERS[currentSlide]

  return (
    <div className="w-full">
      {/* ============================================================ */}
      {/* POSITION 1: FULL-BLEED 100VW / 100VH FULLSCREEN AI SLIDESHOW   */}
      {/* ============================================================ */}
      <section
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative w-full h-[92vh] sm:h-[95vh] min-h-[600px] flex items-end overflow-hidden bg-black text-white"
      >
        {/* Fullscreen AI Background Image Artwork */}
        <AnimatePresence mode="wait">
          <motion.div
            key={banner.bgImage}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            className="absolute inset-0 z-0 pointer-events-none"
          >
            <Image
              src={banner.bgImage}
              alt={`${banner.productTitle} AI Fullscreen Graphic`}
              fill
              priority
              className="object-cover object-center w-full h-full"
            />
            {/* Cinematic Gradient Overlays for High Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40 z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/20 z-10" />
          </motion.div>
        </AnimatePresence>

        {/* Diagonal Speed Chevrons Decorative Watermark */}
        <div className="absolute top-24 right-8 flex gap-1.5 opacity-40 z-10 pointer-events-none">
          <div className="w-3 h-20 bg-purple-500 transform -skew-x-[25deg]" />
          <div className="w-3 h-20 bg-purple-400 transform -skew-x-[25deg]" />
          <div className="w-3 h-20 bg-blue-500 transform -skew-x-[25deg]" />
        </div>

        {/* Slide Content Overlay */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 pb-16 w-full flex flex-col md:flex-row md:items-end justify-between gap-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={banner.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="space-y-4 max-w-3xl"
            >
              {/* Badge Tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-600/30 border border-purple-500/40 text-purple-300 font-mono text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                <Dumbbell className="w-3.5 h-3.5" />
                <span>OFFICIAL BRAND BANNER • SLIDE {currentSlide + 1} OF {BANNERS.length}</span>
              </div>

              {/* Tagline & Product Headline */}
              <div className="space-y-1">
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-black italic tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-purple-400 leading-none drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
                  {banner.tagline}
                </h2>
                <h1 className="text-xl sm:text-3xl font-mono font-black uppercase text-blue-400 tracking-tight pt-1 drop-shadow-md">
                  {banner.productTitle}
                </h1>
              </div>

              {/* Specs Tag */}
              <p className="text-xs sm:text-sm font-mono text-purple-200/90 font-semibold tracking-wider drop-shadow-md">
                ⚡ {banner.specs}
              </p>

              {/* Action Button */}
              <div className="pt-2">
                <Link href={banner.slug ? `/products/${banner.slug}` : "/products"}>
                  <button className="px-8 py-3.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-black text-xs font-mono uppercase tracking-widest rounded-xl transition-all shadow-[0_0_25px_rgba(168,85,247,0.5)] flex items-center gap-3 cursor-pointer group">
                    <span>{banner.ctaText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls & Dots */}
          <div className="flex items-center gap-4 self-start md:self-end">
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md p-2 rounded-2xl border border-white/10 shadow-xl">
              {BANNERS.map((b, index) => (
                <button
                  key={b.id}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    index === currentSlide ? "w-10 bg-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.8)]" : "w-3 bg-white/30 hover:bg-white/60"
                  }`}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentSlide((prev) => (prev - 1 + BANNERS.length) % BANNERS.length)}
                className="w-11 h-11 rounded-2xl border border-white/20 bg-black/60 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md shadow-xl"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % BANNERS.length)}
                className="w-11 h-11 rounded-2xl border border-white/20 bg-black/60 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md shadow-xl"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* POSITION 2: SECONDARY HERO SECTION                           */}
      {/* ============================================================ */}
      <section
        id="secondary-hero"
        ref={ref}
        className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-white"
      >
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/30 to-slate-100/50 pointer-events-none" />

        {/* Ambient glows */}
        <div
          className="absolute top-20 left-10 w-44 h-44 rounded-full bg-blue-600/10 blur-3xl pointer-events-none"
          style={{ transform: "translateZ(0)" }}
        />
        <div
          className="absolute bottom-40 right-20 w-52 h-52 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none"
          style={{ transform: "translateZ(0)" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Text Content */}
            <motion.div style={{ opacity }} className="space-y-5">
              <motion.div
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0}
                className="inline-flex items-center gap-2 bg-[#10163A] text-white px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider shadow-md shadow-blue-950/20"
              >
                <motion.span
                  className="w-2 h-2 bg-blue-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                />
                PREMIUM GYM SUPPLEMENTS
              </motion.div>

              <div className="space-y-1 overflow-hidden">
                <motion.h1
                  style={{ x: textX1 }}
                  className="text-5xl md:text-7xl font-black tracking-tighter text-[#10163A] leading-[0.9]"
                >
                  <motion.span
                    variants={fadeUpVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={1}
                    className="inline-block"
                  >
                    FUEL YOUR
                  </motion.span>
                </motion.h1>
                <motion.h1
                  style={{ x: textX2 }}
                  className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9]"
                >
                  <motion.span
                    variants={fadeUpVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={2}
                    className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500"
                  >
                    GAINS
                  </motion.span>
                </motion.h1>
                <motion.p
                  variants={fadeUpVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={3}
                  className="text-lg md:text-xl font-mono text-[#10163A]/70 tracking-tight pt-2 max-w-md"
                >
                  Maximum purity. Proven results. Premium supplements engineered for real muscle growth.
                </motion.p>
              </div>

              <motion.div
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={4}
                className="flex flex-wrap gap-3 pt-2"
              >
                <Link href="/products">
                  <motion.button
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full font-bold text-sm tracking-wide flex items-center gap-2 group relative overflow-hidden shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
                      whileHover={{ x: "200%" }}
                      transition={{ duration: 0.6 }}
                    />
                    <span className="relative z-10">Explore Products</span>
                    <motion.svg
                      className="w-4 h-4 relative z-10"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      initial={{ x: 0 }}
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </motion.svg>
                  </motion.button>
                </Link>
                <motion.button
                  className="border-2 border-[#10163A] text-[#10163A] px-6 py-3 rounded-full font-bold text-sm tracking-wide relative overflow-hidden cursor-pointer"
                  whileHover={{ scale: 1.02, backgroundColor: "#10163A", color: "#fff" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  onClick={() => {
                    const element = document.querySelector("#flavours")
                    element?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  Explore Formulas
                </motion.button>
              </motion.div>

              <motion.div
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={5}
                className="flex flex-wrap gap-4 pt-2"
              >
                {["24G Protein", "6.8G BCAA", "100% Whey Formula", "No Added Sugar"].map((benefit, i) => (
                  <motion.div
                    key={benefit}
                    className="flex items-center gap-2 text-xs font-mono text-[#10163A]/70"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                  >
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    {benefit}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div style={{ y, scale }} className="relative flex justify-center items-center py-16 overflow-visible">
              <motion.div variants={scaleInVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative flex items-center justify-center w-full">
                <div
                  className="absolute inset-0 bg-gradient-to-r from-blue-600/60 via-indigo-600/50 to-purple-600/60 blur-[140px] rounded-full pointer-events-none scale-150"
                  style={{ transform: "translateZ(0)" }}
                />

                {/* Massive 3D Floating Cluster of All 3 Products */}
                <div className="relative flex items-center justify-center z-10 w-full max-w-4xl py-8">
                  {/* Product 1: Anabolic Lean Muscle Builder (Left) */}
                  <motion.div
                    animate={{
                      y: [0, -20, 0],
                      rotate: [-6, 2, -6],
                    }}
                    transition={{
                      duration: 5.5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                    className="relative w-56 sm:w-80 md:w-96 lg:w-[400px] aspect-square -mr-16 sm:-mr-28 lg:-mr-36 z-10 group cursor-pointer"
                  >
                    <Link href="/products/anabolic-lean-muscle-builder">
                      <Image
                        src="/images/anabolic-lean-muscle-builder.png"
                        alt="Alpha Tech Nutrition - Anabolic Lean Muscle Builder"
                        fill
                        className="object-contain drop-shadow-[0_30px_45px_rgba(0,0,0,0.8)] group-hover:scale-115 group-hover:z-30 transition-all duration-300"
                      />
                    </Link>
                    <div className="absolute -bottom-12 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity z-30">
                      <span className="bg-[#10163A] text-white text-xs font-mono px-4 py-2 rounded-full font-bold shadow-2xl border border-white/20 tracking-wider">
                        ANABOLIC BUILDER
                      </span>
                    </div>
                  </motion.div>

                  {/* Product 2: Prime Whey (Giant Center Leader) */}
                  <motion.div
                    animate={{
                      y: [0, -32, 0],
                      rotate: [0, 5, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                    className="relative w-72 sm:w-[460px] md:w-[580px] lg:w-[640px] aspect-square z-20 group cursor-pointer"
                  >
                    <Link href="/products/prime-whey">
                      <Image
                        src="/images/prime-whey.png"
                        alt="Alpha Tech Nutrition - Prime Whey Protein Concentrate"
                        fill
                        priority
                        className="object-contain drop-shadow-[0_35px_70px_rgba(59,130,246,0.8)] group-hover:scale-115 transition-all duration-300"
                      />
                    </Link>
                    <div className="absolute -bottom-14 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity z-30">
                      <span className="bg-blue-600 text-white text-sm font-mono px-5 py-2 rounded-full font-bold shadow-2xl border border-white/40 tracking-wider">
                        PRIME WHEY ISOLATE
                      </span>
                    </div>
                  </motion.div>

                  {/* Product 3: Alpha Super Mass Gainer (Right) */}
                  <motion.div
                    animate={{
                      y: [0, -18, 0],
                      rotate: [6, -2, 6],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                    className="relative w-56 sm:w-80 md:w-96 lg:w-[400px] aspect-square -ml-16 sm:-ml-28 lg:-ml-36 z-10 group cursor-pointer"
                  >
                    <Link href="/products/alpha-super-mass-gainer">
                      <Image
                        src="/images/alpha-super-mass-gainer-front.png"
                        alt="Alpha Tech Nutrition - Alpha Super Mass Gainer"
                        fill
                        className="object-contain drop-shadow-[0_30px_45px_rgba(0,0,0,0.8)] group-hover:scale-115 group-hover:z-30 transition-all duration-300"
                      />
                    </Link>
                    <div className="absolute -bottom-12 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity z-30">
                      <span className="bg-[#10163A] text-white text-xs font-mono px-4 py-2 rounded-full font-bold shadow-2xl border border-white/20 tracking-wider">
                        SUPER MASS GAINER
                      </span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
