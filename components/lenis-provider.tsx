"use client"

import { ReactLenis } from "lenis/react"
import type { ReactNode } from "react"

interface LenisProviderProps {
  children: ReactNode
}

export function LenisProvider({ children }: LenisProviderProps) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.14,
        duration: 0.7,
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.0,
        syncTouch: false,
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  )
}
