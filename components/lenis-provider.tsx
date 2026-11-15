"use client"

import { ReactLenis } from "lenis/react"
import { useState, useEffect, type ReactNode } from "react"

interface LenisProviderProps {
  children: ReactNode
}

export function LenisProvider({ children }: LenisProviderProps) {
  const [isTouchDevice, setIsTouchDevice] = useState<boolean | null>(null)

  useEffect(() => {
    // Check if the current device relies on touch input
    const isTouch =
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0

    setIsTouchDevice(isTouch)
  }, [])

  // On touch/mobile devices, bypass Lenis entirely to allow 100% native GPU compositor scrolling
  if (isTouchDevice === true) {
    return <>{children}</>
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.12,
        duration: 0.8,
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 0,
        syncTouch: false,
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  )
}
