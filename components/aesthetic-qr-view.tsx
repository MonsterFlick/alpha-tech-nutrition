"use client"

import { useState, useEffect, useMemo } from "react"
import { generateAestheticQRSvg, type DotStyle, type EyeStyle, type QRTheme } from "@/lib/aesthetic-qr"

export interface AestheticQRViewProps {
  value: string
  size?: number
  dotStyle?: DotStyle
  eyeStyle?: EyeStyle
  theme?: QRTheme
  includeCenterLogo?: boolean
  centerLogoText?: string
  className?: string
  productTitle?: string
  serialCode?: string
}

export function AestheticQRView({
  value,
  size = 320,
  dotStyle = "dots",
  eyeStyle = "smooth",
  theme = "neon_lime",
  includeCenterLogo = true,
  centerLogoText = "α",
  className = "",
  productTitle,
  serialCode,
}: AestheticQRViewProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const svgString = useMemo(() => {
    if (!value) return ""
    return generateAestheticQRSvg(value, {
      size,
      dotStyle,
      eyeStyle,
      theme,
      includeCenterLogo,
      centerLogoText,
      productTitle,
      serialCode,
    })
  }, [value, size, dotStyle, eyeStyle, theme, includeCenterLogo, centerLogoText, productTitle, serialCode])

  // Before mount, render matching placeholder to prevent SSR hydration mismatch
  if (!isMounted || !svgString) {
    const extraH = productTitle ? 56 : 0
    return (
      <div
        style={{ width: size, height: size + extraH }}
        className={`flex flex-col items-center justify-center bg-white/5 rounded-3xl text-white/30 font-mono text-xs ${className}`}
      >
        <div className="w-8 h-8 rounded-full border-2 border-[#AFFF00]/30 border-t-[#AFFF00] animate-spin mb-2" />
        <span className="text-[10px] tracking-wider">SECURE QR CODE</span>
      </div>
    )
  }

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-3xl overflow-hidden transition-all duration-300 ${className}`}
      dangerouslySetInnerHTML={{ __html: svgString }}
    />
  )
}
