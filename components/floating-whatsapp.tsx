"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, ShieldCheck, ArrowRight, MapPin, Phone, Navigation } from "lucide-react"
import { WHATSAPP_DISPLAY_PHONE, getWhatsAppConsultationUrl, FSSAI_LICENSE, INSTAGRAM_URL } from "@/lib/whatsapp"
import { PRODUCTS_CATALOG } from "@/lib/product-catalog"
import { AUTHORIZED_DISTRIBUTORS, getDistributorWhatsAppUrl } from "@/lib/distributors"
import { WhatsAppIcon } from "@/components/whatsapp-icon"
import Image from "next/image"

export function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedDistributorIndex, setSelectedDistributorIndex] = useState(0)
  const activeDistributor = AUTHORIZED_DISTRIBUTORS[selectedDistributorIndex] || AUTHORIZED_DISTRIBUTORS[0]

  return (
    <aside aria-label="WhatsApp Quick Order and Support" className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pointer-events-auto">
      {/* Expanded Quick-Order Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="mb-3 w-[calc(100vw-2rem)] max-w-sm sm:w-96 rounded-3xl bg-[#0B0E23]/95 backdrop-blur-xl border border-emerald-500/30 shadow-2xl shadow-black/80 overflow-hidden text-white"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-green-700 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                  <WhatsAppIcon className="w-6 h-6 text-white" />
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
                className="p-1.5 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
                aria-label="Close WhatsApp dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 space-y-3 max-h-[75vh] overflow-y-auto">
              {/* Local Distributor Selector & Card */}
              {activeDistributor && (
                <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-950/70 to-indigo-950/60 border border-blue-500/30 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-blue-300 font-bold flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-blue-400" /> Authorized Store
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      {activeDistributor.city} ({activeDistributor.district})
                    </span>
                  </div>

                  {/* Store Selector Tabs */}
                  <div className="flex items-center gap-1 p-1 bg-[#070A1B] rounded-xl border border-white/10">
                    {AUTHORIZED_DISTRIBUTORS.map((d, idx) => (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => setSelectedDistributorIndex(idx)}
                        className={`flex-1 py-1 px-2 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer truncate ${
                          selectedDistributorIndex === idx
                            ? "bg-blue-600 text-white shadow-sm"
                            : "text-white/60 hover:text-white"
                        }`}
                      >
                        {d.city}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="relative w-11 h-11 rounded-xl bg-white p-1 shrink-0 overflow-hidden border border-white/20">
                      <Image
                        src={activeDistributor.logo}
                        alt={activeDistributor.shopName}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h5 className="text-xs font-black text-white truncate">
                        {activeDistributor.shopName}
                      </h5>
                      <p className="text-[10px] font-mono text-white/70">
                        {activeDistributor.ownerName} • {activeDistributor.displayPhone}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <a
                      href={getDistributorWhatsAppUrl(activeDistributor)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-1.5 px-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5" />
                      <span>Chat Store</span>
                    </a>
                    <a
                      href={`tel:${activeDistributor.phone.replace(/[^0-9+]/g, "")}`}
                      className="py-1.5 px-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-[11px] font-bold flex items-center justify-center gap-1 transition-colors"
                      title="Call Store"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call</span>
                    </a>
                    {activeDistributor.googleMapsUrl && (
                      <a
                        href={activeDistributor.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-1.5 px-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-300 font-mono text-[11px] font-bold flex items-center justify-center gap-1 transition-colors"
                        title="View Location on Google Maps"
                      >
                        <Navigation className="w-3.5 h-3.5 text-blue-400" />
                        <span>Map</span>
                      </a>
                    )}
                  </div>
                </div>
              )}

              <p className="text-xs text-white/70 font-mono">
                Or order factory-direct from our official nutrition desk at{" "}
                <span className="text-emerald-400 font-bold">{WHATSAPP_DISPLAY_PHONE}</span>:
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
        <WhatsAppIcon className="w-7 h-7 text-white drop-shadow-md relative z-10" />

        {/* Floating tooltip label */}
        <span className="hidden sm:block absolute right-16 bg-[#0B0E23]/90 text-white border border-emerald-500/40 text-[11px] font-mono font-bold px-3 py-1.5 rounded-xl whitespace-nowrap shadow-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
          Order on WhatsApp • 83808 89935
        </span>
      </motion.button>
    </aside>
  )
}
