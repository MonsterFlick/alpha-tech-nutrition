"use client"

import React from "react"
import { motion } from "framer-motion"
import { getWhatsAppOrderUrl, WHATSAPP_DISPLAY_PHONE } from "@/lib/whatsapp"

interface WhatsAppOrderButtonProps {
  productName: string
  flavor?: string
  weight?: string
  mrp?: string
  sku?: string
  quantity?: number
  className?: string
  size?: "sm" | "md" | "lg"
  fullWidth?: boolean
  label?: string
  sublabel?: string
}

export function WhatsAppOrderButton({
  productName,
  flavor = "Belgian Chocolate",
  weight,
  mrp,
  sku,
  quantity = 1,
  className = "",
  size = "md",
  fullWidth = false,
  label = "Buy Now on WhatsApp",
  sublabel,
}: WhatsAppOrderButtonProps) {
  const url = getWhatsAppOrderUrl({
    name: productName,
    flavor,
    weight,
    mrp,
    sku,
    quantity,
  })

  const sizeClasses = {
    sm: "px-3.5 py-2 text-xs gap-1.5",
    md: "px-5 py-3 text-sm gap-2.5",
    lg: "px-6 py-4 text-base gap-3",
  }[size]

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={`relative inline-flex items-center justify-center font-bold font-mono uppercase tracking-wider rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-green-600 hover:from-emerald-400 hover:via-emerald-500 hover:to-green-500 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all border border-emerald-400/30 overflow-hidden group cursor-pointer ${
        fullWidth ? "w-full" : ""
      } ${sizeClasses} ${className}`}
    >
      {/* Shimmer sweep effect */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />

      {/* WhatsApp SVG Icon */}
      <svg
        className="w-5 h-5 fill-current shrink-0 text-white drop-shadow-sm"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.585 1.961.942 2.796.943 3.18 0 5.767-2.587 5.767-5.766.001-3.187-2.575-5.77-6.767-6.13zm6.657 8.789c-.279.785-1.391 1.439-1.921 1.53-.51.087-1.15.124-3.69-1.023-3.247-1.467-5.321-4.786-5.48-5.003-.16-.217-1.309-1.742-1.309-3.324 0-1.581.828-2.361 1.12-2.68.291-.319.638-.399.85-.399.213 0 .426.002.612.011.199.01.464-.075.726.554.279.669.957 2.335 1.042 2.508.085.172.141.374.027.601-.114.227-.171.369-.341.568-.17.199-.358.444-.512.597-.17.17-.348.354-.15.694.198.341.88 1.448 1.887 2.345 1.298 1.155 2.392 1.514 2.732 1.684.341.171.54.142.74-.085.199-.228.851-.994 1.078-1.336.227-.341.455-.285.768-.17.313.114 1.989.938 2.33 1.109.341.17.568.256.653.398.085.142.085.824-.194 1.609zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.434 5.176L2 22l4.982-1.398C8.423 21.498 10.158 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
      </svg>

      <span className="flex flex-col text-left">
        <span className="leading-tight drop-shadow-sm">{label}</span>
        {sublabel && (
          <span className="text-[10px] font-normal normal-case opacity-85 leading-tight">
            {sublabel}
          </span>
        )}
      </span>
    </motion.a>
  )
}
