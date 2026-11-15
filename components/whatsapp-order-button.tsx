"use client"

import React from "react"
import { motion } from "framer-motion"
import { getWhatsAppOrderUrl, WHATSAPP_DISPLAY_PHONE } from "@/lib/whatsapp"
import { WhatsAppIcon } from "@/components/whatsapp-icon"

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

      {/* Official WhatsApp Vector Icon */}
      <WhatsAppIcon className="w-5 h-5 shrink-0 text-white drop-shadow-sm" />

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
