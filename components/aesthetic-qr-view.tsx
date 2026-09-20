"use client"

import { useState, useEffect, useMemo } from "react"
import { generateAestheticQRSvg, type DotStyle, type EyeStyle, type QRTheme } from "@/lib/aesthetic-qr"
import { ALPHA_TECH_ICON_BASE64 } from "@/lib/brand-assets"

export interface AestheticQRViewProps {
  value: string
  size?: number
  margin?: number
  dotStyle?: DotStyle
  eyeStyle?: EyeStyle
  theme?: QRTheme
  includeCenterLogo?: boolean
  centerLogoText?: string
  centerLogoImage?: string
  className?: string
  productTitle?: string
  serialCode?: string
}

export function AestheticQRView({
  value,
  size = 320,
  margin,
  dotStyle = "dots",
  eyeStyle = "smooth",
  theme = "royal_navy",
  includeCenterLogo = true,
  centerLogoText = "AT",
  centerLogoImage = ALPHA_TECH_ICON_BASE64,
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
      margin,
      dotStyle,
      eyeStyle,
      theme,
      includeCenterLogo,
      centerLogoText,
      centerLogoImage,
      productTitle,
      serialCode,
    })
  }, [value, size, margin, dotStyle, eyeStyle, theme, includeCenterLogo, centerLogoText, centerLogoImage, productTitle, serialCode])

  // Before mount, render matching placeholder to prevent SSR hydration mismatch
  if (!isMounted || !svgString) {
    const extraH = productTitle ? (serialCode ? 66 : 46) : (serialCode ? 50 : 0)
    return (
      <div
        style={{ maxWidth: size, width: "100%", aspectRatio: productTitle ? `${size} / ${size + extraH}` : "1 / 1" }}
        className={`flex flex-col items-center justify-center bg-white/5 rounded-3xl text-white/30 font-mono text-xs max-w-full ${className}`}
      >
        <div className="w-8 h-8 rounded-full border-2 border-blue-500/30 border-t-blue-500 animate-spin mb-2" />
        <span className="text-[10px] tracking-wider text-blue-300/70">SECURE QR CODE</span>
      </div>
    )
  }

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-3xl overflow-hidden transition-all duration-300 max-w-full [&>svg]:max-w-full [&>svg]:h-auto [&>svg]:w-full ${className}`}
      dangerouslySetInnerHTML={{ __html: svgString }}
    />
  )
}
