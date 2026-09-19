"use client"

import type React from "react"
import { useRef, useEffect, useCallback } from "react"

interface ClickSparkProps {
  sparkColor?: string
  sparkSize?: number
  sparkRadius?: number
  sparkCount?: number
  duration?: number
  easing?: "linear" | "ease-in" | "ease-out" | "ease-in-out"
  extraScale?: number
  children?: React.ReactNode
}

interface Spark {
  x: number
  y: number
  angle: number
  startTime: number
}

const ClickSpark: React.FC<ClickSparkProps> = ({
  sparkColor = "#3B82F6",
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  easing = "ease-out",
  extraScale = 1.0,
  children,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sparksRef = useRef<Spark[]>([])
  const isRunningRef = useRef<boolean>(false)
  const animFrameIdRef = useRef<number | null>(null)

  // Fast viewport-sized canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const updateSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.scale(dpr, dpr)
      }
    }

    updateSize()
    window.addEventListener("resize", updateSize, { passive: true })
    return () => {
      window.removeEventListener("resize", updateSize)
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current)
      }
    }
  }, [])

  const easeFunc = useCallback(
    (t: number) => {
      switch (easing) {
        case "linear":
          return t
        case "ease-in":
          return t * t
        case "ease-in-out":
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
        default:
          return t * (2 - t)
      }
    },
    [easing],
  )

  const startAnimation = useCallback(() => {
    if (isRunningRef.current) return
    isRunningRef.current = true

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const draw = (timestamp: number) => {
      // Clear viewport
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      // Filter active sparks
      sparksRef.current = sparksRef.current.filter((spark: Spark) => {
        const elapsed = timestamp - spark.startTime
        if (elapsed >= duration) {
          return false
        }

        const progress = elapsed / duration
        const eased = easeFunc(progress)

        const distance = eased * sparkRadius * extraScale
        const lineLength = sparkSize * (1 - eased)

        const x1 = spark.x + distance * Math.cos(spark.angle)
        const y1 = spark.y + distance * Math.sin(spark.angle)
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle)
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle)

        ctx.strokeStyle = sparkColor
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()

        return true
      })

      // If sparks still remain, continue loop. Otherwise STOP RAF completely!
      if (sparksRef.current.length > 0) {
        animFrameIdRef.current = requestAnimationFrame(draw)
      } else {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
        isRunningRef.current = false
        animFrameIdRef.current = null
      }
    }

    animFrameIdRef.current = requestAnimationFrame(draw)
  }, [duration, easeFunc, extraScale, sparkColor, sparkRadius, sparkSize])

  const handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    const x = e.clientX
    const y = e.clientY

    const now = performance.now()
    const newSparks: Spark[] = Array.from({ length: sparkCount }, (_, i) => ({
      x,
      y,
      angle: (2 * Math.PI * i) / sparkCount,
      startTime: now,
    }))

    sparksRef.current.push(...newSparks)
    startAnimation()
  }

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100%",
        position: "relative",
      }}
      onClick={handleClick}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 99999,
        }}
      />
      {children}
    </div>
  )
}

export default ClickSpark
