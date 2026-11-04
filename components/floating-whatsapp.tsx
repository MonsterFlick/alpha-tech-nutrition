"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, ShieldCheck, ArrowRight } from "lucide-react"
import { WHATSAPP_DISPLAY_PHONE, getWhatsAppConsultationUrl, FSSAI_LICENSE, INSTAGRAM_URL } from "@/lib/whatsapp"
import { PRODUCTS_CATALOG } from "@/lib/product-catalog"

export function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <aside aria-label="WhatsApp Quick Order and Support" className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto">
      {/* Expanded Quick-Order Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="mb-4 w-80 sm:w-96 rounded-3xl bg-[#0B0E23]/95 backdrop-blur-xl border border-emerald-500/30 shadow-2xl shadow-black/80 overflow-hidden text-white"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-green-700 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.585 1.961.942 2.796.943 3.18 0 5.767-2.587 5.767-5.766.001-3.187-2.575-5.77-6.767-6.13zm6.657 8.789c-.279.785-1.391 1.439-1.921 1.53-.51.087-1.15.124-3.69-1.023-3.247-1.467-5.321-4.786-5.48-5.003-.16-.217-1.309-1.742-1.309-3.324 0-1.581.828-2.361 1.12-2.68.291-.319.638-.399.85-.399.213 0 .426.002.612.011.199.01.464-.075.726.554.279.669.957 2.335 1.042 2.508.085.172.141.374.027.601-.114.227-.171.369-.341.568-.17.199-.358.444-.512.597-.17.17-.348.354-.15.694.198.341.88 1.448 1.887 2.345 1.298 1.155 2.392 1.514 2.732 1.684.341.171.54.142.74-.085.199-.228.851-.994 1.078-1.336.227-.341.455-.285.768-.17.313.114 1.989.938 2.33 1.109.341.17.568.256.653.398.085.142.085.824-.194 1.609zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.434 5.176L2 22l4.982-1.398C8.423 21.498 10.158 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-black text-sm text-white">Alpha Tech Nutrition</h4>
                  <p className="text-[11px] font-mono text-emerald-100 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                    Online • Direct WhatsApp Desk
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-colors"
                aria-label="Close WhatsApp dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 space-y-3">
              <p className="text-xs text-white/70 font-mono">
                Chat directly with our official nutrition desk at{" "}
                <span className="text-emerald-400 font-bold">{WHATSAPP_DISPLAY_PHONE}</span> for instant orders, diet guidance, or stock checks.
              </p>

              {/* Quick Order by Product */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 font-bold">
                  Quick 1-Click WhatsApp Order:
                </span>
                {PRODUCTS_CATALOG.map((p) => {
                  const orderText = encodeURIComponent(
                    `Hello Alpha Tech Nutrition, I would like to order *${p.name}* (${p.flavor}, ${p.weight}) at ${p.mrp}. Please share payment and shipping details!`
                  )
                  return (
                    <a
                      key={p.id}
                      href={`https://wa.me/918380889935?text=${orderText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-emerald-500/15 border border-white/10 hover:border-emerald-500/40 transition-all group"
                    >
                      <div className="text-left">
                        <div className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                          {p.name}
                        </div>
                        <div className="text-[10px] font-mono text-white/50">
                          {p.weight} • {p.mrp}
                        </div>
                      </div>
                      <span className="text-emerald-400 text-xs flex items-center gap-1 font-mono font-bold group-hover:translate-x-1 transition-transform">
                        Order <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </a>
                  )
                })}
              </div>

              {/* General Inquiry */}
              <a
                href={getWhatsAppConsultationUrl("general")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-600/30"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat with Nutrition Expert</span>
              </a>

              {/* Trust Badges */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/50">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" /> FSSAI Lic. {FSSAI_LICENSE}
                </span>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors"
                >
                  @alphatech_nutrition
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="relative group p-4 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white shadow-xl shadow-emerald-500/40 hover:shadow-emerald-500/60 border border-emerald-300/40 flex items-center justify-center transition-all cursor-pointer"
        aria-label="Order on WhatsApp - 8380889935"
      >
        {/* Pulsing ring indicator */}
        <span className="absolute -inset-1 rounded-full bg-emerald-400/30 animate-ping pointer-events-none" />

        {/* WhatsApp Icon */}
        <svg
          className="w-7 h-7 fill-current drop-shadow-md relative z-10"
          viewBox="0 0 24 24"
        >
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.585 1.961.942 2.796.943 3.18 0 5.767-2.587 5.767-5.766.001-3.187-2.575-5.77-6.767-6.13zm6.657 8.789c-.279.785-1.391 1.439-1.921 1.53-.51.087-1.15.124-3.69-1.023-3.247-1.467-5.321-4.786-5.48-5.003-.16-.217-1.309-1.742-1.309-3.324 0-1.581.828-2.361 1.12-2.68.291-.319.638-.399.85-.399.213 0 .426.002.612.011.199.01.464-.075.726.554.279.669.957 2.335 1.042 2.508.085.172.141.374.027.601-.114.227-.171.369-.341.568-.17.199-.358.444-.512.597-.17.17-.348.354-.15.694.198.341.88 1.448 1.887 2.345 1.298 1.155 2.392 1.514 2.732 1.684.341.171.54.142.74-.085.199-.228.851-.994 1.078-1.336.227-.341.455-.285.768-.17.313.114 1.989.938 2.33 1.109.341.17.568.256.653.398.085.142.085.824-.194 1.609zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.434 5.176L2 22l4.982-1.398C8.423 21.498 10.158 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
        </svg>

        {/* Floating tooltip label */}
        <span className="hidden sm:block absolute right-16 bg-[#0B0E23]/90 text-white border border-emerald-500/40 text-[11px] font-mono font-bold px-3 py-1.5 rounded-xl whitespace-nowrap shadow-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
          Order on WhatsApp • 83808 89935
        </span>
      </motion.button>
    </aside>
  )
}
