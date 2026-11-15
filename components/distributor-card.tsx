"use client"

import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { MapPin, Phone, ShieldCheck, Clock, ExternalLink, Navigation } from "lucide-react"
import { Distributor, getDistributorWhatsAppUrl } from "@/lib/distributors"
import { WhatsAppIcon } from "@/components/whatsapp-icon"

interface DistributorCardProps {
  distributor: Distributor
  product?: { name: string; flavor?: string; weight?: string; mrp?: string; quantity?: number }
  compact?: boolean
  className?: string
}

export function DistributorCard({
  distributor,
  product,
  compact = false,
  className = "",
}: DistributorCardProps) {
  const whatsappUrl = getDistributorWhatsAppUrl(distributor, product)
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    distributor.googleMapsQuery || distributor.address
  )}`

  return (
    <div
      className={`rounded-2xl border transition-all duration-300 ${
        compact
          ? "bg-[#0B0E23]/90 border-blue-500/30 p-4"
          : "bg-gradient-to-b from-[#0e132d] to-[#080b1d] border-blue-500/40 p-5 sm:p-6 shadow-xl"
      } ${className}`}
    >
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
        {/* Distributor Logo Container */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white p-2 shrink-0 border-2 border-red-500/30 shadow-md flex items-center justify-center overflow-hidden">
          <Image
            src={distributor.logo}
            alt={`${distributor.shopName} - Logo`}
            fill
            sizes="(max-width: 640px) 64px, 80px"
            className="object-contain p-1"
          />
        </div>

        {/* Store & Contact Information */}
        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              {distributor.badge}
            </span>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-300 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/30">
              {distributor.city} • Pin {distributor.pincode}
            </span>
          </div>

          <h4 className="text-base sm:text-lg font-black text-white uppercase tracking-tight">
            {distributor.shopName}
          </h4>

          <div className="text-xs font-mono text-white/80">
            <span className="text-white/50">Authorized Person: </span>
            <strong className="text-white">{distributor.ownerName}</strong>
          </div>

          <div className="flex items-start gap-1.5 text-xs font-mono text-white/70 leading-relaxed">
            <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
            <span>{distributor.address}</span>
          </div>

          {distributor.operatingHours && (
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-white/50">
              <Clock className="w-3 h-3 text-white/40 shrink-0" />
              <span>{distributor.operatingHours}</span>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons Suite */}
      <div className="mt-4 pt-3.5 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {/* WhatsApp Order Action */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="sm:col-span-2 py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
        >
          <WhatsAppIcon className="w-4 h-4 text-white shrink-0" />
          <span>
            {product
              ? `Buy ${product.name.replace("Alpha ", "")} on WhatsApp`
              : "Order on WhatsApp"}
          </span>
        </a>

        {/* Direct Call Button */}
        <a
          href={`tel:${distributor.phone.replace(/[^0-9+]/g, "")}`}
          className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-mono text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
        >
          <Phone className="w-3.5 h-3.5 text-blue-400" />
          <span>Call ({distributor.displayPhone.replace("+91 ", "")})</span>
        </a>
      </div>
    </div>
  )
}
