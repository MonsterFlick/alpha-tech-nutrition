"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

export interface BrandLogoProps {
  size?: "sm" | "md" | "lg"
  showText?: boolean
  scrolled?: boolean
  className?: string
  href?: string
  subtitle?: string
}

export function BrandLogo({
  size = "md",
  showText = true,
  scrolled = true,
  className = "",
  href = "/",
  subtitle = "Nutrition",
}: BrandLogoProps) {
  const iconDimensions = {
    sm: { w: 32, h: 32 },
    md: { w: 40, h: 40 },
    lg: { w: 48, h: 48 },
  }[size]

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl md:text-2xl",
    lg: "text-2xl md:text-3xl",
  }[size]

  const subTextSizeClasses = {
    sm: "text-[8px]",
    md: "text-[9px]",
    lg: "text-[10px]",
  }[size]

  const content = (
    <motion.div
      className={`inline-flex items-center gap-2.5 group cursor-pointer ${className}`}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {/* Official Master Icon Emblem */}
      <div
        className="relative shrink-0 rounded-2xl overflow-hidden shadow-lg border border-[#AFFF00]/30 group-hover:border-[#AFFF00] group-hover:shadow-[0_0_20px_rgba(175,255,0,0.4)] transition-all duration-300 bg-[#0d0e12]"
        style={{ width: iconDimensions.w, height: iconDimensions.h }}
      >
        <Image
          src="/logo/icon-512x512.png"
          alt="Alpha Tech Nutrition"
          fill
          className="object-cover scale-105"
          priority
        />
      </div>

      {/* Typography */}
      {showText && (
        <div className="flex flex-col">
          <span className={`${textSizeClasses} font-black tracking-tighter leading-none`}>
            <span className={scrolled ? "text-white" : "text-[#121212] transition-colors"}>
              ALPHA{" "}
            </span>
            <span className="text-[#AFFF00] drop-shadow-[0_0_12px_rgba(175,255,0,0.5)]">
              TECH
            </span>
          </span>
          <span
            className={`${subTextSizeClasses} font-mono tracking-[0.25em] text-[#AFFF00] uppercase font-bold mt-0.5`}
          >
            {subtitle}
          </span>
        </div>
      )}
    </motion.div>
  )

  if (href) {
    return <Link href={href}>{content}</Link>
  }

  return content
}
