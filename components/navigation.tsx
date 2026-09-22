"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { BrandLogo } from "@/components/brand-logo"
import { useLenis } from "lenis/react"
import { Menu, X, ShieldCheck } from "lucide-react"

const linkVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
}

const mobileMenuVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.2,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
}

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
    { label: "Partners", href: "#distributors" },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || pathname !== "/" ? "bg-[#0B0E23]/95 backdrop-blur-md border-b border-blue-950/60 shadow-lg shadow-blue-950/20" : "bg-transparent"
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
                scrolled || pathname !== "/" ? "text-white/80 hover:text-blue-400" : "text-[#10163A]/85 hover:text-blue-600 font-semibold"
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
                <X className={scrolled ? "text-white" : "text-[#121212]"} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className={scrolled ? "text-white" : "text-[#121212]"} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
