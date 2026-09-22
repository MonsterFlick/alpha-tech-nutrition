"use client"

import { motion, useInView } from "framer-motion"
import { useState, useRef } from "react"
import Link from "next/link"
import { BrandLogo } from "@/components/brand-logo"

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
  const [email, setEmail] = useState("")
  const [isHovering, setIsHovering] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const footerRef = useRef(null)
  const isInView = useInView(footerRef, { once: true, margin: "-100px" })

  const handleSubmit = () => {
    setIsSubmitting(true)
    setTimeout(() => setIsSubmitting(false), 2000)
  }

  const footerLinks = [
    {
      title: "Products",
      links: [
        { name: "Browse Products Catalog", href: "/products" },
        { name: "Prime Whey", href: "/products" },
        { name: "Anabolic Lean Muscle Builder", href: "/products" },
        { name: "Alpha Super Mass Gainer", href: "/products" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Alpha Tech", href: "#" },
        { name: "Partners & Distributors", href: "#distributors" },
        { name: "Athletes & Creators", href: "#creators" },
        { name: "Instagram (@alphatech_nutrition)", href: "https://instagram.com/alphatech_nutrition" },
        { name: "Contact Support", href: "mailto:support@alphatech-nutrition.in" },
      ],
    },
    {
      title: "Quality Standards",
      links: [
        { name: "FSSAI Registered", href: "#" },
        { name: "ISO 22000 Certified", href: "#" },
        { name: "100% Dope Free", href: "#" },
        { name: "Privacy Policy", href: "#" },
      ],
    },
  ]

  return (
    <footer ref={footerRef} id="careers" className="relative bg-[#080B1C] pt-12 pb-6 overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-6 py-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {footerLinks.map((section, sectionIndex) => (
            <motion.div key={section.title} variants={itemVariants}>
              <h4 className="font-bold text-white text-sm mb-3">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((item) => (
                  <li key={item.name}>
                    <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                      <Link
                        href={item.href}
                        className="text-white/60 hover:text-blue-400 font-mono text-xs transition-colors inline-block"
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-white/10 gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <BrandLogo size="md" scrolled={true} />

          <p className="text-white/40 font-mono text-xs">© 2026 Alpha Tech Nutrition. All rights reserved.</p>

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
