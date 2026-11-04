"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { BrandLogo } from "@/components/brand-logo"
import { useLenis } from "lenis/react"
import { Menu, X, ShieldCheck } from "lucide-react"
import { WHATSAPP_DISPLAY_PHONE, INSTAGRAM_URL } from "@/lib/whatsapp"

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const lenis = useLenis()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false)
    if (href.startsWith("/")) {
      router.push(href)
      return
    }
    if (pathname !== "/") {
      router.push(`/${href}`)
      return
    }
    const element = document.querySelector(href)
    if (element && lenis) {
      lenis.scrollTo(element as HTMLElement, { offset: -100 })
    }
  }

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Products Catalog", href: "/products" },
    { label: "Blog & Research", href: "/blogs" },
    { label: "Partners", href: "#distributors" },
  ]

  const whatsappDirectUrl = `https://wa.me/918380889935?text=${encodeURIComponent(
    "Hello Alpha Tech Nutrition, I would like to place an order or inquire about your products!"
  )}`

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || pathname !== "/"
          ? "bg-[#0B0E23]/95 backdrop-blur-md border-b border-blue-950/60 shadow-lg shadow-blue-950/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <BrandLogo scrolled={scrolled || pathname !== "/"} size="md" />

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item, i) => (
            <motion.button
              key={item.label}
              onClick={() => handleNavClick(item.href)}
              className={`text-sm font-medium tracking-wide transition-colors relative cursor-pointer ${
                scrolled || pathname !== "/"
                  ? "text-white/80 hover:text-blue-400"
                  : "text-[#10163A]/85 hover:text-blue-600 font-semibold"
              }`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.label}
              <motion.span
                className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
              />
            </motion.button>
          ))}
        </div>

        {/* Right Action: Buy on WhatsApp Button */}
        <div className="hidden md:flex items-center gap-3">
          <motion.a
            href={whatsappDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-md shadow-emerald-500/25 transition-all"
          >
            <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.585 1.961.942 2.796.943 3.18 0 5.767-2.587 5.767-5.766.001-3.187-2.575-5.77-6.767-6.13zm6.657 8.789c-.279.785-1.391 1.439-1.921 1.53-.51.087-1.15.124-3.69-1.023-3.247-1.467-5.321-4.786-5.48-5.003-.16-.217-1.309-1.742-1.309-3.324 0-1.581.828-2.361 1.12-2.68.291-.319.638-.399.85-.399.213 0 .426.002.612.011.199.01.464-.075.726.554.279.669.957 2.335 1.042 2.508.085.172.141.374.027.601-.114.227-.171.369-.341.568-.17.199-.358.444-.512.597-.17.17-.348.354-.15.694.198.341.88 1.448 1.887 2.345 1.298 1.155 2.392 1.514 2.732 1.684.341.171.54.142.74-.085.199-.228.851-.994 1.078-1.336.227-.341.455-.285.768-.17.313.114 1.989.938 2.33 1.109.341.17.568.256.653.398.085.142.085.824-.194 1.609zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.434 5.176L2 22l4.982-1.398C8.423 21.498 10.158 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
            </svg>
            <span>Order on WhatsApp</span>
          </motion.a>
        </div>

        {/* Mobile menu button */}
        <motion.button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            {mobileMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className={scrolled || pathname !== "/" ? "text-white" : "text-[#121212]"} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className={scrolled || pathname !== "/" ? "text-white" : "text-[#121212]"} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="md:hidden bg-[#0B0E23]/95 backdrop-blur-md border-t border-blue-950/60 overflow-hidden"
          >
            <div className="px-6 py-4 space-y-4">
              {navLinks.map((item, i) => (
                <motion.button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className="block w-full text-left text-white/80 hover:text-blue-400 text-lg font-medium py-2 cursor-pointer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {item.label}
                </motion.button>
              ))}

              <div className="pt-2 border-t border-white/10 space-y-2">
                <a
                  href={whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-emerald-500/25"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.585 1.961.942 2.796.943 3.18 0 5.767-2.587 5.767-5.766.001-3.187-2.575-5.77-6.767-6.13zm6.657 8.789c-.279.785-1.391 1.439-1.921 1.53-.51.087-1.15.124-3.69-1.023-3.247-1.467-5.321-4.786-5.48-5.003-.16-.217-1.309-1.742-1.309-3.324 0-1.581.828-2.361 1.12-2.68.291-.319.638-.399.85-.399.213 0 .426.002.612.011.199.01.464-.075.726.554.279.669.957 2.335 1.042 2.508.085.172.141.374.027.601-.114.227-.171.369-.341.568-.17.199-.358.444-.512.597-.17.17-.348.354-.15.694.198.341.88 1.448 1.887 2.345 1.298 1.155 2.392 1.514 2.732 1.684.341.171.54.142.74-.085.199-.228.851-.994 1.078-1.336.227-.341.455-.285.768-.17.313.114 1.989.938 2.33 1.109.341.17.568.256.653.398.085.142.085.824-.194 1.609zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.434 5.176L2 22l4.982-1.398C8.423 21.498 10.158 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                  </svg>
                  <span>Order on WhatsApp (83808 89935)</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
