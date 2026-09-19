"use client"

import { useMemo } from "react"
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
}: AestheticQRViewProps) {
  const svgString = useMemo(() => {
    if (!value) return ""
    return generateAestheticQRSvg(value, {
      size,
      dotStyle,
      eyeStyle,
      theme,
      includeCenterLogo,
      centerLogoText,
    })
  }, [value, size, dotStyle, eyeStyle, theme, includeCenterLogo, centerLogoText])

  if (!svgString) {
    return (
      <div
        style={{ width: size, height: size }}
        className="flex items-center justify-center bg-white/5 rounded-3xl text-white/30 font-mono text-xs"
      >
        Generating QR...
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
