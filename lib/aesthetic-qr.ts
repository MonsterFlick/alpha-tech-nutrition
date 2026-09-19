import QRCode from "qrcode"

export type DotStyle = "dots" | "rounded" | "squircle"
export type EyeStyle = "smooth" | "circle" | "squircle"
export type QRTheme = "classic_dark" | "neon_lime" | "print_clean" | "stealth_black"

export interface AestheticQROptions {
  size?: number
  margin?: number
  dotStyle?: DotStyle
  eyeStyle?: EyeStyle
  theme?: QRTheme
  dotColor?: string
  eyeColor?: string
  eyeInnerColor?: string
  backgroundColor?: string
  includeCenterLogo?: boolean
  centerLogoText?: string
}

const THEME_PRESETS: Record<
  QRTheme,
  { dotColor: string; eyeColor: string; eyeInnerColor: string; backgroundColor: string }
> = {
  classic_dark: {
    dotColor: "#121212",
    eyeColor: "#121212",
    eyeInnerColor: "#84cc16",
    backgroundColor: "#ffffff",
  },
  neon_lime: {
    dotColor: "#121212",
    eyeColor: "#121212",
    eyeInnerColor: "#AFFF00",
    backgroundColor: "#ffffff",
  },
  print_clean: {
    dotColor: "#000000",
    eyeColor: "#000000",
    eyeInnerColor: "#000000",
    backgroundColor: "#ffffff",
  },
  stealth_black: {
    dotColor: "#AFFF00",
    eyeColor: "#AFFF00",
    eyeInnerColor: "#ffffff",
    backgroundColor: "#12141a",
  },
}

export function generateAestheticQRSvg(text: string, options: AestheticQROptions = {}): string {
  const {
    size = 400,
    margin = 24,
    dotStyle = "dots",
    eyeStyle = "smooth",
    theme = "neon_lime",
    includeCenterLogo = true,
    centerLogoText = "α",
  } = options

  const palette = THEME_PRESETS[theme] || THEME_PRESETS.neon_lime
  const dotColor = options.dotColor || palette.dotColor
  const eyeColor = options.eyeColor || palette.eyeColor
  const eyeInnerColor = options.eyeInnerColor || palette.eyeInnerColor
  const backgroundColor = options.backgroundColor || palette.backgroundColor

  const qr = QRCode.create(text, { errorCorrectionLevel: "H" })
  const N = qr.modules.size

  // Calculate cell dimensions
  const innerSize = size - margin * 2
  const cellSize = innerSize / N

  // Helper to check if a cell is part of the 3 finder eyes (7x7 corners)
  const isFinderEye = (r: number, c: number) => {
    if (r < 7 && c < 7) return true // Top-Left
    if (r < 7 && c >= N - 7) return true // Top-Right
    if (r >= N - 7 && c < 7) return true // Bottom-Left
    return false
  }

  // Center logo boundary (approx 22% of matrix width)
  const centerRadius = includeCenterLogo ? Math.floor(N * 0.14) : 0
  const centerPos = Math.floor(N / 2)
  const isCenterArea = (r: number, c: number) => {
    if (!includeCenterLogo) return false
    return Math.abs(r - centerPos) <= centerRadius && Math.abs(c - centerPos) <= centerRadius
  }

  const elements: string[] = []

  // 1. Background
  elements.push(
    `<rect width="${size}" height="${size}" rx="24" fill="${backgroundColor}" />`
  )

  // 2. Render Data Modules (Rounded Dots / Squircles)
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (isFinderEye(r, c) || isCenterArea(r, c)) continue

      if (qr.modules.get(r, c)) {
        const x = margin + c * cellSize
        const y = margin + r * cellSize
        const cx = x + cellSize / 2
        const cy = y + cellSize / 2

        if (dotStyle === "dots") {
          // Circular rounded dot
          const radius = cellSize * 0.44
          elements.push(`<circle cx="${cx.toFixed(2)}" cy="${cy.toFixed(2)}" r="${radius.toFixed(2)}" fill="${dotColor}" />`)
        } else if (dotStyle === "squircle") {
          // Rounded squircle
          const inset = cellSize * 0.08
          const w = cellSize - inset * 2
          const rx = cellSize * 0.38
          elements.push(
            `<rect x="${(x + inset).toFixed(2)}" y="${(y + inset).toFixed(2)}" width="${w.toFixed(2)}" height="${w.toFixed(2)}" rx="${rx.toFixed(2)}" fill="${dotColor}" />`
          )
        } else {
          // Rounded pill/soft corner
          const inset = cellSize * 0.05
          const w = cellSize - inset * 2
          const rx = cellSize * 0.28
          elements.push(
            `<rect x="${(x + inset).toFixed(2)}" y="${(y + inset).toFixed(2)}" width="${w.toFixed(2)}" height="${w.toFixed(2)}" rx="${rx.toFixed(2)}" fill="${dotColor}" />`
          )
        }
      }
    }
  }

  // 3. Render Custom Rounded Finder Eyes
  const eyePositions = [
    { r: 0, c: 0 }, // Top-Left
    { r: 0, c: N - 7 }, // Top-Right
    { r: N - 7, c: 0 }, // Bottom-Left
  ]

  eyePositions.forEach(({ r, c }) => {
    const originX = margin + c * cellSize
    const originY = margin + r * cellSize
    const eyeSize = 7 * cellSize

    if (eyeStyle === "circle") {
      // Concentric Target Circles
      const cx = originX + eyeSize / 2
      const cy = originY + eyeSize / 2
      const outerR = (eyeSize - cellSize) / 2
      const innerR = 1.5 * cellSize

      elements.push(
        `<circle cx="${cx.toFixed(2)}" cy="${cy.toFixed(2)}" r="${outerR.toFixed(2)}" fill="none" stroke="${eyeColor}" stroke-width="${cellSize.toFixed(2)}" />`
      )
      elements.push(
        `<circle cx="${cx.toFixed(2)}" cy="${cy.toFixed(2)}" r="${innerR.toFixed(2)}" fill="${eyeInnerColor}" />`
      )
    } else if (eyeStyle === "smooth") {
      // Ultra-Smooth Rounded Eye
      const strokeW = cellSize
      const outerX = originX + strokeW / 2
      const outerY = originY + strokeW / 2
      const outerW = eyeSize - strokeW
      const outerRx = cellSize * 2.2

      elements.push(
        `<rect x="${outerX.toFixed(2)}" y="${outerY.toFixed(2)}" width="${outerW.toFixed(2)}" height="${outerW.toFixed(2)}" rx="${outerRx.toFixed(2)}" fill="none" stroke="${eyeColor}" stroke-width="${strokeW.toFixed(2)}" />`
      )

      // Inner Pupil
      const pupilInset = 2 * cellSize
      const pupilW = 3 * cellSize
      const pupilRx = cellSize * 1.5
      elements.push(
        `<rect x="${(originX + pupilInset).toFixed(2)}" y="${(originY + pupilInset).toFixed(2)}" width="${pupilW.toFixed(2)}" height="${pupilW.toFixed(2)}" rx="${pupilRx.toFixed(2)}" fill="${eyeInnerColor}" />`
      )
    } else {
      // Modern Squircle Eye
      const strokeW = cellSize
      const outerX = originX + strokeW / 2
      const outerY = originY + strokeW / 2
      const outerW = eyeSize - strokeW
      const outerRx = cellSize * 1.4

      elements.push(
        `<rect x="${outerX.toFixed(2)}" y="${outerY.toFixed(2)}" width="${outerW.toFixed(2)}" height="${outerW.toFixed(2)}" rx="${outerRx.toFixed(2)}" fill="none" stroke="${eyeColor}" stroke-width="${strokeW.toFixed(2)}" />`
      )

      const pupilInset = 2 * cellSize
      const pupilW = 3 * cellSize
      const pupilRx = cellSize * 0.8
      elements.push(
        `<rect x="${(originX + pupilInset).toFixed(2)}" y="${(originY + pupilInset).toFixed(2)}" width="${pupilW.toFixed(2)}" height="${pupilW.toFixed(2)}" rx="${pupilRx.toFixed(2)}" fill="${eyeInnerColor}" />`
      )
    }
  })

  // 4. Render Center Emblem / Logo (If enabled)
  if (includeCenterLogo) {
    const centerDim = (centerRadius * 2 + 1) * cellSize + cellSize * 0.4
    const logoX = margin + (centerPos - centerRadius) * cellSize - cellSize * 0.2
    const logoY = margin + (centerPos - centerRadius) * cellSize - cellSize * 0.2
    const logoRx = centerDim * 0.35
    const centerX = logoX + centerDim / 2
    const centerY = logoY + centerDim / 2

    // Background shield badge
    elements.push(
      `<rect x="${logoX.toFixed(2)}" y="${logoY.toFixed(2)}" width="${centerDim.toFixed(2)}" height="${centerDim.toFixed(2)}" rx="${logoRx.toFixed(2)}" fill="#121212" stroke="#AFFF00" stroke-width="${(cellSize * 0.35).toFixed(2)}" />`
    )

    // Inner glowing logo text / emblem
    elements.push(
      `<text x="${centerX.toFixed(2)}" y="${(centerY + centerDim * 0.12).toFixed(2)}" font-family="system-ui, -apple-system, sans-serif" font-size="${(centerDim * 0.52).toFixed(2)}" font-weight="900" fill="#AFFF00" text-anchor="middle" dominant-baseline="middle">${centerLogoText}</text>`
    )
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
    <defs>
      <filter id="soft-shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.15"/>
      </filter>
    </defs>
    ${elements.join("\n    ")}
  </svg>`
}

export async function svgToPngDataUrl(svgString: string, targetSize = 600): Promise<string> {
  if (typeof window === "undefined") {
    // Server-side fallback: Return base64 encoded SVG data url
    return `data:image/svg+xml;base64,${Buffer.from(svgString).toString("base64")}`
  }

  return new Promise((resolve, reject) => {
    const img = new Image()
    const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" })
    const URL = window.URL || window.webkitURL || window
    const blobURL = URL.createObjectURL(svgBlob)

    img.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = targetSize
      canvas.height = targetSize
      const ctx = canvas.getContext("2d")
      if (!ctx) {
        URL.revokeObjectURL(blobURL)
        return resolve(`data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgString)))}`)
      }

      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = "high"
      ctx.drawImage(img, 0, 0, targetSize, targetSize)
      URL.revokeObjectURL(blobURL)
      resolve(canvas.toDataURL("image/png"))
    }

    img.onerror = () => {
      URL.revokeObjectURL(blobURL)
      resolve(`data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgString)))}`)
    }

    img.src = blobURL
  })
}
