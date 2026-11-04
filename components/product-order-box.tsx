"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { ShoppingBag, Plus, Minus, Check, ShieldCheck, Truck, MessageCircle } from "lucide-react"
import type { ProductItem } from "@/lib/product-catalog"
import { getWhatsAppOrderUrl, WHATSAPP_DISPLAY_PHONE, FSSAI_LICENSE } from "@/lib/whatsapp"

export function ProductOrderBox({ product }: { product: ProductItem }) {
  const [quantity, setQuantity] = useState(1)

  // Parse numeric MRP if possible (e.g. ₹4,460 -> 4460)
  const numericMrp = parseInt(product.mrp.replace(/[^0-9]/g, ""), 10) || 0
  const totalPriceFormatted = numericMrp > 0 ? `₹${(numericMrp * quantity).toLocaleString("en-IN")}` : product.mrp

  const whatsappUrl = getWhatsAppOrderUrl({
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

      {/* Primary WhatsApp Order CTA */}
      <div>
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 via-emerald-600 to-green-600 hover:from-emerald-400 hover:via-emerald-500 hover:to-green-500 text-white font-black text-sm sm:text-base font-mono uppercase tracking-wider rounded-2xl transition-all shadow-xl shadow-emerald-500/30 flex items-center justify-center gap-3 cursor-pointer border border-emerald-400/40 relative overflow-hidden group"
        >
          {/* Shimmer sweep */}
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />

          {/* WhatsApp SVG Icon */}
          <svg className="w-6 h-6 fill-current shrink-0" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.585 1.961.942 2.796.943 3.18 0 5.767-2.587 5.767-5.766.001-3.187-2.575-5.77-6.767-6.13zm6.657 8.789c-.279.785-1.391 1.439-1.921 1.53-.51.087-1.15.124-3.69-1.023-3.247-1.467-5.321-4.786-5.48-5.003-.16-.217-1.309-1.742-1.309-3.324 0-1.581.828-2.361 1.12-2.68.291-.319.638-.399.85-.399.213 0 .426.002.612.011.199.01.464-.075.726.554.279.669.957 2.335 1.042 2.508.085.172.141.374.027.601-.114.227-.171.369-.341.568-.17.199-.358.444-.512.597-.17.17-.348.354-.15.694.198.341.88 1.448 1.887 2.345 1.298 1.155 2.392 1.514 2.732 1.684.341.171.54.142.74-.085.199-.228.851-.994 1.078-1.336.227-.341.455-.285.768-.17.313.114 1.989.938 2.33 1.109.341.17.568.256.653.398.085.142.085.824-.194 1.609zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.434 5.176L2 22l4.982-1.398C8.423 21.498 10.158 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
          </svg>

          <span className="flex flex-col text-left">
            <span>Buy Now on WhatsApp</span>
            <span className="text-[11px] font-normal normal-case opacity-90">
              Instant Order Confirmation • {WHATSAPP_DISPLAY_PHONE}
            </span>
          </span>
        </motion.a>
      </div>

      {/* Trust & Guarantee Badges */}
      <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono text-white/70">
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
