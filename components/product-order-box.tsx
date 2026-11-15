"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ShoppingBag,
  Plus,
  Minus,
  Check,
  ShieldCheck,
  Truck,
  MapPin,
  Store,
  ChevronDown,
  Phone,
} from "lucide-react"
import type { ProductItem } from "@/lib/product-catalog"
import { getWhatsAppOrderUrl, WHATSAPP_DISPLAY_PHONE, FSSAI_LICENSE } from "@/lib/whatsapp"
import { AUTHORIZED_DISTRIBUTORS } from "@/lib/distributors"
import { DistributorCard } from "@/components/distributor-card"
import { WhatsAppIcon } from "@/components/whatsapp-icon"

export function ProductOrderBox({ product }: { product: ProductItem }) {
  const [quantity, setQuantity] = useState(1)
  const [orderMode, setOrderMode] = useState<"direct" | "distributor">("direct")

  // Parse numeric MRP if possible (e.g. ₹4,460 -> 4460)
  const numericMrp = parseInt(product.mrp.replace(/[^0-9]/g, ""), 10) || 0
  const totalPriceFormatted =
    numericMrp > 0 ? `₹${(numericMrp * quantity).toLocaleString("en-IN")}` : product.mrp

  const factoryWhatsappUrl = getWhatsAppOrderUrl({
    name: product.name,
    sku: product.sku,
    flavor: product.flavor,
    weight: product.weight,
    mrp: totalPriceFormatted,
    quantity,
  })

  return (
    <div className="space-y-5 rounded-3xl bg-gradient-to-b from-[#0E132D] to-[#0A0E24] border-2 border-blue-500/30 p-6 shadow-2xl">
      {/* Price Callout & Quantity Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="text-[11px] font-mono text-white/50 uppercase tracking-wider">
            Total Price ({quantity} {quantity === 1 ? "Unit" : "Units"} • Incl. All Taxes)
          </div>
          <div className="flex items-baseline gap-3 mt-1">
            <span className="text-3xl sm:text-4xl font-black text-white font-mono">
              {totalPriceFormatted}
            </span>
            {quantity > 1 && (
              <span className="text-xs font-mono text-white/50">
                ({product.mrp} each)
              </span>
            )}
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-white/60 uppercase">Quantity:</span>
          <div className="flex items-center bg-[#070A1B] border border-white/15 rounded-2xl p-1">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent flex items-center justify-center text-white transition-all cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-10 text-center font-mono font-black text-base text-white">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => Math.min(10, q + 1))}
              disabled={quantity >= 10}
              className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent flex items-center justify-center text-white transition-all cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Buy Mode Selection Tabs */}
      <div className="space-y-2">
        <div className="text-[11px] font-mono uppercase tracking-wider text-white/60 font-bold flex items-center justify-between">
          <span>Choose How to Buy:</span>
          {orderMode === "direct" && (
            <button
              onClick={() => setOrderMode("distributor")}
              className="text-blue-400 hover:text-blue-300 text-[11px] font-mono flex items-center gap-1 cursor-pointer"
            >
              <MapPin className="w-3 h-3 text-red-400" />
              <span>Buy from Bhiwandi Store</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-[#070A1B] border border-white/10">
          <button
            onClick={() => setOrderMode("direct")}
            className={`py-2.5 px-3 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              orderMode === "direct"
                ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-md border border-emerald-400/40"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Factory Direct (Online)</span>
          </button>

          <button
            onClick={() => setOrderMode("distributor")}
            className={`py-2.5 px-3 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              orderMode === "distributor"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-400/40"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            <span>Local Store ({AUTHORIZED_DISTRIBUTORS.length})</span>
          </button>
        </div>
      </div>

      {/* Mode A: Factory Direct Delivery via WhatsApp */}
      {orderMode === "direct" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="space-y-3"
        >
          <motion.a
            href={factoryWhatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 via-emerald-600 to-green-600 hover:from-emerald-400 hover:via-emerald-500 hover:to-green-500 text-white font-black text-sm sm:text-base font-mono uppercase tracking-wider rounded-2xl transition-all shadow-xl shadow-emerald-500/30 flex items-center justify-center gap-3 cursor-pointer border border-emerald-400/40 relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
            <WhatsAppIcon className="w-6 h-6 text-white shrink-0" />
            <span className="flex flex-col text-left">
              <span>Buy Now on WhatsApp</span>
              <span className="text-[11px] font-normal normal-case opacity-90">
                Direct Dispatch • {WHATSAPP_DISPLAY_PHONE}
              </span>
            </span>
          </motion.a>

          {/* Quick Callout to Bhiwandi Distributor */}
          <div
            onClick={() => setOrderMode("distributor")}
            className="p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 transition-colors cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <div className="text-left">
                <span className="text-xs font-bold text-white block">
                  Available locally in Bhiwandi at Dynamic Fitness Nutrition
                </span>
                <span className="text-[10px] font-mono text-white/50 block">
                  Ambadi Naka • Roshan Thakare (+91 88882 71583)
                </span>
              </div>
            </div>
            <span className="text-xs font-mono text-blue-400 font-bold shrink-0">
              View Store →
            </span>
          </div>
        </motion.div>
      )}

      {/* Mode B: Authorized Local Store (Bhiwandi) */}
      {orderMode === "distributor" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="space-y-4"
        >
          <div className="text-xs font-mono text-white/70">
            Pick up in-store today or arrange direct same-day delivery through our authorized regional distributor in Bhiwandi:
          </div>

          <div className="space-y-3">
            {AUTHORIZED_DISTRIBUTORS.map((distributor) => (
              <DistributorCard
                key={distributor.id}
                distributor={distributor}
                product={{
                  name: product.name,
                  flavor: product.flavor,
                  weight: product.weight,
                  mrp: totalPriceFormatted,
                  quantity,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Trust & Guarantee Badges */}
      <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono text-white/70 border-t border-white/10">
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/5">
          <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-[11px]">Free Express Delivery Across India</span>
        </div>
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/5">
          <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
          <span className="text-[11px]">FSSAI Central Lic. {FSSAI_LICENSE}</span>
        </div>
      </div>
    </div>
  )
}
