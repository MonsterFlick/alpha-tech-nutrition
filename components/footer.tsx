"use client"

import { motion, useInView } from "framer-motion"
import { useState, useRef } from "react"
import Link from "next/link"
import { BrandLogo } from "@/components/brand-logo"
import { WHATSAPP_DISPLAY_PHONE, INSTAGRAM_HANDLE, INSTAGRAM_URL, FSSAI_LICENSE } from "@/lib/whatsapp"
import { ShieldCheck, Instagram } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 20,
    },
  },
}

export function Footer() {
  const [isHovering, setIsHovering] = useState(false)
  const footerRef = useRef(null)
  const isInView = useInView(footerRef, { once: true, margin: "-100px" })

  const footerLinks = [
    {
      title: "Products",
      links: [
        { name: "Browse Products Catalog", href: "/products" },
        { name: "Prime Whey (2kg / 60 Servings)", href: "/products/prime-whey" },
        { name: "Alpha Super Mass Gainer (3kg)", href: "/products/alpha-super-mass-gainer" },
        { name: "Anabolic Lean Muscle Builder (3kg)", href: "/products/anabolic-lean-muscle-builder" },
        { name: "Verify Supplement Authenticity", href: "/verify" },
      ],
    },
    {
      title: "Resources & Blogs",
      links: [
        { name: "Training & Nutrition Blog Hub", href: "/blogs" },
        { name: "Prime Whey Recovery Science", href: "/blogs/prime-whey-protein-recovery-guide" },
        { name: "Hardgainer Mass Blueprint", href: "/blogs/hardgainer-super-mass-gainer-muscle-building" },
        { name: "Anti-Counterfeit QR Security", href: "/blogs/supplement-authenticity-anti-counterfeit-qr-code" },
        { name: "Whey vs Mass Gainer Guide", href: "/blogs/whey-protein-vs-mass-gainer-which-is-best" },
      ],
    },
    {
      title: "Direct Orders & Support",
      links: [
        { name: `WhatsApp Orders (${WHATSAPP_DISPLAY_PHONE})`, href: "https://wa.me/918380889935" },
        { name: `Instagram (@${INSTAGRAM_HANDLE})`, href: INSTAGRAM_URL },
        { name: "Email: alphatechnutrition.in@gmail.com", href: "mailto:alphatechnutrition.in@gmail.com" },
        { name: "Partners & Gym Distributors", href: "#distributors" },
      ],
    },
    {
      title: "Compliance & Safety",
      links: [
        { name: `FSSAI Lic. ${FSSAI_LICENSE}`, href: "/verify" },
        { name: "GMP Quality Certified", href: "/verify" },
        { name: "ISO 22000 Food Safety", href: "/verify" },
        { name: "100% WADA Dope Free", href: "/verify" },
      ],
    },
  ]

  return (
    <footer ref={footerRef} className="relative bg-[#080B1C] pt-12 pb-6 overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {footerLinks.map((section) => (
            <motion.div key={section.title} variants={itemVariants}>
              <h4 className="font-bold text-white text-sm mb-3">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((item) => (
                  <li key={item.name}>
                    <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                      {item.href.startsWith("http") || item.href.startsWith("mailto:") ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/60 hover:text-blue-400 font-mono text-xs transition-colors inline-block"
                        >
                          {item.name}
                        </a>
                      ) : (
                        <Link
                          href={item.href}
                          className="text-white/60 hover:text-blue-400 font-mono text-xs transition-colors inline-block"
                        >
                          {item.name}
                        </Link>
                      )}
                    </motion.div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* FSSAI & WhatsApp Banner Bar */}
        <div className="py-4 my-2 border-y border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-white/60">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>FSSAI Central Food Safety Registration Lic. No. <strong className="text-white">{FSSAI_LICENSE}</strong></span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/918380889935"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors"
            >
              WhatsApp Desk: {WHATSAPP_DISPLAY_PHONE}
            </a>
            <span>•</span>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 font-bold transition-colors"
            >
              Instagram: @{INSTAGRAM_HANDLE}
            </a>
          </div>
        </div>

        <motion.div
          className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-white/10 gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <BrandLogo size="md" scrolled={true} />

          <p className="text-white/40 font-mono text-xs">
            © 2026 Alpha Tech Nutrition. Marketed by Muscle Care. All rights reserved.
          </p>

          <motion.p
            className="text-white/30 font-mono text-xs cursor-pointer"
            onHoverStart={() => setIsHovering(true)}
            onHoverEnd={() => setIsHovering(false)}
            animate={
              isHovering
                ? {
                    rotate: [0, -5, 5, -5, 5, 0],
                    scale: [1, 1.1, 1],
                    color: "#60A5FA",
                  }
                : {
                    rotate: 0,
                    scale: 1,
                    color: "rgba(255,255,255,0.3)",
                  }
            }
            transition={{ duration: 0.5 }}
          >
            engineered for athletes
          </motion.p>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[10rem] md:text-[20rem] font-black text-white/[0.02] pointer-events-none select-none leading-none whitespace-nowrap"
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        ALPHA TECH
      </motion.div>
    </footer>
  )
}
