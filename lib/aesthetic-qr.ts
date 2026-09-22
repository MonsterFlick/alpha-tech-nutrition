import QRCode from "qrcode"
import { ALPHA_TECH_ICON_BASE64 } from "./brand-assets"

export type DotStyle = "dots" | "rounded" | "squircle"
export type EyeStyle = "smooth" | "circle" | "squircle"
export type QRTheme = "royal_navy" | "cobalt_glow" | "classic_dark" | "print_clean" | "stealth_black" | "neon_lime"

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
  centerLogoImage?: string
  productTitle?: string
  serialCode?: string
}

const THEME_COLORS: Record<
  string,
  { dotColor: string; eyeColor: string; eyeInnerColor: string; backgroundColor: string; textColor: string }
> = {
  royal_navy: {
    dotColor: "#161B3D",
    eyeColor: "#161B3D",
    eyeInnerColor: "#3B82F6",
    backgroundColor: "#ffffff",
    textColor: "#161B3D",
  },
  cobalt_glow: {
    dotColor: "#3B82F6",
    eyeColor: "#3B82F6",
    eyeInnerColor: "#ffffff",
    backgroundColor: "#0B0E23",
    textColor: "#60A5FA",
  },
  classic_dark: {
    dotColor: "#161B3D",
    eyeColor: "#161B3D",
    eyeInnerColor: "#2563EB",
    backgroundColor: "#ffffff",
    textColor: "#161B3D",
  },
  print_clean: {
    dotColor: "#000000",
    eyeColor: "#000000",
    eyeInnerColor: "#000000",
    backgroundColor: "#ffffff",
    textColor: "#000000",
  },
  stealth_black: {
    dotColor: "#3B82F6",
    eyeColor: "#3B82F6",
    eyeInnerColor: "#ffffff",
    backgroundColor: "#0B0E23",
    textColor: "#3B82F6",
  },
  neon_lime: {
    dotColor: "#161B3D",
    eyeColor: "#161B3D",
    eyeInnerColor: "#3B82F6",
    backgroundColor: "#ffffff",
    textColor: "#161B3D",
  },
}

const THEME_PRESETS = THEME_COLORS

export function generateAestheticQRSvg(text: string, options: AestheticQROptions = {}): string {
  const {
    size = 400,
    margin = 8,
    dotStyle = "dots",
    eyeStyle = "smooth",
    theme = "royal_navy",
    includeCenterLogo = true,
    centerLogoText = "AT",
    centerLogoImage = ALPHA_TECH_ICON_BASE64,
    productTitle,
    serialCode,
  } = options

  const palette = THEME_PRESETS[theme] || THEME_PRESETS.royal_navy
  const dotColor = options.dotColor || palette.dotColor
  const eyeColor = options.eyeColor || palette.eyeColor
  const eyeInnerColor = options.eyeInnerColor || palette.eyeInnerColor
  const backgroundColor = options.backgroundColor || palette.backgroundColor
  const textColor = palette.textColor

  const qr = QRCode.create(text, { errorCorrectionLevel: "H" })
  const N = qr.modules.size

  // Split title into Line 1 (Product Name) and Line 2 (Weight/Variant) if needed
  let titleLine1 = ""
  let titleLine2 = ""
  if (productTitle) {
    if (productTitle.includes(" • ")) {
      const parts = productTitle.split(" • ")
      titleLine1 = parts[0].trim()
      titleLine2 = parts.slice(1).join(" • ").trim()
    } else if (productTitle.includes(" - ")) {
      const parts = productTitle.split(" - ")
      titleLine1 = parts[0].trim()
      titleLine2 = parts.slice(1).join(" - ").trim()
    } else if (productTitle.length > 22) {
      const middle = Math.floor(productTitle.length / 2)
      const before = productTitle.lastIndexOf(" ", middle)
      const after = productTitle.indexOf(" ", middle)
      const splitIdx = (before !== -1 && (middle - before <= after - middle || after === -1)) ? before : after
      if (splitIdx !== -1) {
        titleLine1 = productTitle.substring(0, splitIdx).trim()
        titleLine2 = productTitle.substring(splitIdx + 1).trim()
      } else {
        titleLine1 = productTitle
      }
    } else {
      titleLine1 = productTitle
    }
  }

  const hasBottom = Boolean(productTitle || serialCode)
  const hasSubtitle = Boolean(titleLine2)
  const hasSerial = Boolean(serialCode)
  const extraBottomHeight = !hasBottom
    ? 0
    : hasSubtitle
    ? (hasSerial ? 66 : 46)
    : (hasSerial ? 50 : 32)
  const totalHeight = size + extraBottomHeight

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

  // 1. Background with rounded corners (omit if transparent)
  if (backgroundColor && backgroundColor !== "transparent" && backgroundColor !== "none") {
    elements.push(
      `<rect width="${size}" height="${totalHeight}" rx="28" fill="${backgroundColor}" />`
    )
  }

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
    const logoRx = centerDim * 0.28
    const centerX = logoX + centerDim / 2
    const centerY = logoY + centerDim / 2

    const clipId = `at-logo-clip-${Math.random().toString(36).substring(2, 9)}`

    // Clip path for rounded center logo image
    elements.push(
      `<defs>
        <clipPath id="${clipId}">
          <rect x="${logoX.toFixed(2)}" y="${logoY.toFixed(2)}" width="${centerDim.toFixed(2)}" height="${centerDim.toFixed(2)}" rx="${logoRx.toFixed(2)}" />
        </clipPath>
      </defs>`
    )

    // Background shield badge
    elements.push(
      `<rect x="${logoX.toFixed(2)}" y="${logoY.toFixed(2)}" width="${centerDim.toFixed(2)}" height="${centerDim.toFixed(2)}" rx="${logoRx.toFixed(2)}" fill="#0B0E23" stroke="#3B82F6" stroke-width="${(cellSize * 0.35).toFixed(2)}" />`
    )

    if (centerLogoImage) {
      elements.push(
        `<image href="${centerLogoImage}" xlink:href="${centerLogoImage}" x="${logoX.toFixed(2)}" y="${logoY.toFixed(2)}" width="${centerDim.toFixed(2)}" height="${centerDim.toFixed(2)}" clip-path="url(#${clipId})" preserveAspectRatio="xMidYMid slice" />`
      )
    } else {
      // Inner glowing logo text / emblem
      elements.push(
        `<text x="${centerX.toFixed(2)}" y="${(centerY + centerDim * 0.12).toFixed(2)}" font-family="system-ui, -apple-system, sans-serif" font-size="${(centerDim * 0.52).toFixed(2)}" font-weight="900" fill="#60A5FA" text-anchor="middle" dominant-baseline="middle">${centerLogoText}</text>`
      )
    }

    // Outer subtle cyan/cobalt accent ring
    elements.push(
      `<rect x="${logoX.toFixed(2)}" y="${logoY.toFixed(2)}" width="${centerDim.toFixed(2)}" height="${centerDim.toFixed(2)}" rx="${logoRx.toFixed(2)}" fill="none" stroke="#60A5FA" stroke-width="${(cellSize * 0.2).toFixed(2)}" stroke-opacity="0.8" />`
    )
  }

  // 5. Render Product Title and Serial at Bottom (If provided)
  if (productTitle || serialCode) {
    const textCenterX = size / 2

    elements.push(
      `<line x1="${margin + 4}" y1="${size - 4}" x2="${size - margin - 4}" y2="${size - 4}" stroke="${dotColor}" stroke-opacity="0.12" stroke-width="1" />`
    )

    if (titleLine1) {
      const safeTitle1 = titleLine1.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").toUpperCase()
      const maxAvailableWidth = size - (margin * 2 + 12)
      const estimatedWidth = safeTitle1.length * 7.0
      const fontSize1 = estimatedWidth > maxAvailableWidth
        ? Math.max(8.5, (maxAvailableWidth / safeTitle1.length) * 1.35).toFixed(1)
        : (titleLine2 ? "10.5" : "11.5")

      elements.push(
        `<text x="${textCenterX}" y="${size + 15}" font-family="system-ui, -apple-system, sans-serif" font-size="${fontSize1}" font-weight="800" fill="${textColor}" text-anchor="middle" letter-spacing="0.04em">${safeTitle1}</text>`
      )
    }

    if (titleLine2) {
      const safeTitle2 = titleLine2.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").toUpperCase()
      elements.push(
        `<text x="${textCenterX}" y="${size + 30}" font-family="system-ui, -apple-system, sans-serif" font-size="9" font-weight="700" fill="${textColor}" opacity="0.75" text-anchor="middle" letter-spacing="0.06em">${safeTitle2}</text>`
      )
    }

    if (serialCode) {
      const serialY = titleLine2 ? size + 46 : (titleLine1 ? size + 32 : size + 18)
      const maxAvailableWidth = size - (margin * 2 + 12)
      const serialFontSize = serialCode.length * 5.4 > maxAvailableWidth
        ? Math.max(7, (maxAvailableWidth / serialCode.length) * 1.6).toFixed(1)
        : "8.5"

      elements.push(
        `<text x="${textCenterX}" y="${serialY}" font-family="ui-monospace, monospace" font-size="${serialFontSize}" font-weight="700" fill="${textColor}" opacity="0.6" text-anchor="middle" letter-spacing="0.04em">${serialCode}</text>`
      )
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${size} ${totalHeight}" width="${size}" height="${totalHeight}" style="max-width: 100%; height: auto; display: block;">
    <defs>
      <filter id="soft-shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.15"/>
      </filter>
    </defs>
    ${elements.join("\n    ")}
  </svg>`
}

export async function svgToPngDataUrl(svgString: string, targetWidth = 800): Promise<string> {
  if (typeof window === "undefined") {
    return `data:image/svg+xml;base64,${Buffer.from(svgString).toString("base64")}`
  }

  return new Promise((resolve) => {
    let cleanSvg = svgString
    if (!cleanSvg.includes('xmlns="http://www.w3.org/2000/svg"')) {
      cleanSvg = cleanSvg.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ')
    }
    if (!cleanSvg.includes('xmlns:xlink=')) {
      cleanSvg = cleanSvg.replace('<svg ', '<svg xmlns:xlink="http://www.w3.org/1999/xlink" ')
    }

    const encodedSvg = btoa(unescape(encodeURIComponent(cleanSvg)))
    const dataUrl = `data:image/svg+xml;charset=utf-8;base64,${encodedSvg}`
    const img = new Image()

    img.onload = () => {
      const match = cleanSvg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/)
      const viewBoxWidth = match ? parseFloat(match[1]) : targetWidth
      const viewBoxHeight = match ? parseFloat(match[2]) : targetWidth
      const targetHeight = (targetWidth / viewBoxWidth) * viewBoxHeight

      const canvas = document.createElement("canvas")
      const scale = 2
      canvas.width = targetWidth * scale
      canvas.height = targetHeight * scale
      const ctx = canvas.getContext("2d")

      if (!ctx) {
        return resolve(dataUrl)
      }

      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = "high"
      ctx.scale(scale, scale)
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight)

      try {
        const pngUrl = canvas.toDataURL("image/png")
        resolve(pngUrl)
      } catch (e) {
        console.error("Canvas toDataURL error:", e)
        resolve(dataUrl)
      }
    }

    img.onerror = (err) => {
      console.error("SVG Image load error, trying Blob fallback:", err)
      const svgBlob = new Blob([cleanSvg], { type: "image/svg+xml;charset=utf-8" })
      const URL = window.URL || window.webkitURL || window
      const blobURL = URL.createObjectURL(svgBlob)
      const fallbackImg = new Image()

      fallbackImg.onload = () => {
        const match = cleanSvg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/)
        const viewBoxWidth = match ? parseFloat(match[1]) : targetWidth
        const viewBoxHeight = match ? parseFloat(match[2]) : targetWidth
        const targetHeight = (targetWidth / viewBoxWidth) * viewBoxHeight

        const canvas = document.createElement("canvas")
        const scale = 2
        canvas.width = targetWidth * scale
        canvas.height = targetHeight * scale
        const ctx = canvas.getContext("2d")

        if (ctx) {
          ctx.imageSmoothingEnabled = true
          ctx.imageSmoothingQuality = "high"
          ctx.scale(scale, scale)
          ctx.drawImage(fallbackImg, 0, 0, targetWidth, targetHeight)
          URL.revokeObjectURL(blobURL)
          try {
            resolve(canvas.toDataURL("image/png"))
            return
          } catch (e) {
            console.error("Fallback canvas toDataURL error:", e)
          }
        }
        URL.revokeObjectURL(blobURL)
        resolve(dataUrl)
      }

      fallbackImg.onerror = () => {
        URL.revokeObjectURL(blobURL)
        resolve(dataUrl)
      }

      fallbackImg.src = blobURL
    }

    img.src = dataUrl
  })
}

export function downloadFile(content: string, fileName: string, mimeType: string = "image/png") {
  let blob: Blob
  if (content.startsWith("data:")) {
    const parts = content.split(",")
    const bstr = atob(parts[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    const extractedMime = parts[0].match(/:(.*?);/)?.[1] || mimeType
    blob = new Blob([u8arr], { type: extractedMime })
  } else {
    blob = new Blob([content], { type: mimeType })
  }

  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = fileName
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  setTimeout(() => {
    URL.revokeObjectURL(url)
  }, 1000)
}
