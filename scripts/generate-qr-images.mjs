import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import QRCode from "qrcode"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const DOMAIN = process.env.NEXT_PUBLIC_APP_URL || "https://alphatech-nutrition.in"
const OUTPUT_DIR = path.join(__dirname, "..", "public", "qr-codes")

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
}

const ITEMS = [
  {
    fileName: "prime-whey-qr",
    url: `${DOMAIN}/verify?code=e4f9b8c2-3a5d-4e17-b6c8-9d2f1a0e5b7c`,
    title: "PRIME WHEY • 2KG",
    serial: "SKU: ATN-PW-2000 | AUTHENTIC",
    dotColor: "#161B3D",
    eyeColor: "#161B3D",
    eyeInnerColor: "#3B82F6",
    backgroundColor: "#ffffff",
    textColor: "#161B3D"
  },
  {
    fileName: "anabolic-lean-muscle-builder-qr",
    url: `${DOMAIN}/verify?code=b72e1f4a-9c8d-4e2b-a3f5-1d6e7f8a9b0c`,
    title: "ANABOLIC LEAN MUSCLE BUILDER",
    serial: "SKU: ATN-ALMB-3000 | AUTHENTIC",
    dotColor: "#161B3D",
    eyeColor: "#161B3D",
    eyeInnerColor: "#6366F1",
    backgroundColor: "#ffffff",
    textColor: "#161B3D"
  },
  {
    fileName: "alpha-super-mass-gainer-qr",
    url: `${DOMAIN}/verify?code=c1f2e3d4-5a6b-7c8d-9e0f-1a2b3c4d5e6f`,
    title: "ALPHA SUPER MASS GAINER",
    serial: "SKU: ATN-ASMG-3000 | AUTHENTIC",
    dotColor: "#161B3D",
    eyeColor: "#161B3D",
    eyeInnerColor: "#0284C7",
    backgroundColor: "#ffffff",
    textColor: "#161B3D"
  },
  {
    fileName: "verify-main-qr",
    url: `${DOMAIN}/verify`,
    title: "ALPHA TECH NUTRITION",
    serial: "OFFICIAL AUTHENTICITY PORTAL",
    dotColor: "#3B82F6",
    eyeColor: "#3B82F6",
    eyeInnerColor: "#ffffff",
    backgroundColor: "#0B0E23",
    textColor: "#60A5FA"
  },
  {
    fileName: "batch-2026-001-qr",
    url: `${DOMAIN}/verify?code=ATN-PW-2026-001`,
    title: "BATCH #ATN-PW-2026-001",
    serial: "LAB TESTED • PURITY 99.8%",
    dotColor: "#161B3D",
    eyeColor: "#161B3D",
    eyeInnerColor: "#10B981",
    backgroundColor: "#ffffff",
    textColor: "#161B3D"
  },
  {
    fileName: "batch-2026-002-qr",
    url: `${DOMAIN}/verify?code=ATN-ALMB-2026-002`,
    title: "BATCH #ATN-ALMB-2026-002",
    serial: "LAB TESTED • PURITY 100.1%",
    dotColor: "#161B3D",
    eyeColor: "#161B3D",
    eyeInnerColor: "#10B981",
    backgroundColor: "#ffffff",
    textColor: "#161B3D"
  },
  {
    fileName: "batch-2026-003-qr",
    url: `${DOMAIN}/verify?code=ATN-ASMG-2026-003`,
    title: "BATCH #ATN-ASMG-2026-003",
    serial: "LAB TESTED • PURITY 99.9%",
    dotColor: "#161B3D",
    eyeColor: "#161B3D",
    eyeInnerColor: "#10B981",
    backgroundColor: "#ffffff",
    textColor: "#161B3D"
  }
]

function generateStyledSvg(item) {
  const { url, title, serial, dotColor, eyeColor, eyeInnerColor, backgroundColor, textColor } = item
  const size = 400
  const margin = 12
  
  const qr = QRCode.create(url, { errorCorrectionLevel: "H" })
  const N = qr.modules.size
  const innerSize = size - margin * 2
  const cellSize = innerSize / N

  const isFinderEye = (r, c) => {
    if (r < 7 && c < 7) return true
    if (r < 7 && c >= N - 7) return true
    if (r >= N - 7 && c < 7) return true
    return false
  }

  const centerRadius = Math.floor(N * 0.14)
  const centerPos = Math.floor(N / 2)
  const isCenterArea = (r, c) => Math.abs(r - centerPos) <= centerRadius && Math.abs(c - centerPos) <= centerRadius

  const elements = []

  // Background
  elements.push(`<rect width="${size}" height="${size + 50}" rx="24" fill="${backgroundColor}" />`)

  // Data modules
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (isFinderEye(r, c) || isCenterArea(r, c)) continue
      if (qr.modules.get(r, c)) {
        const cx = margin + c * cellSize + cellSize / 2
        const cy = margin + r * cellSize + cellSize / 2
        const radius = cellSize * 0.44
        elements.push(`<circle cx="${cx.toFixed(2)}" cy="${cy.toFixed(2)}" r="${radius.toFixed(2)}" fill="${dotColor}" />`)
      }
    }
  }

  // Finder eyes
  const eyePositions = [{ r: 0, c: 0 }, { r: 0, c: N - 7 }, { r: N - 7, c: 0 }]
  eyePositions.forEach(({ r, c }) => {
    const originX = margin + c * cellSize
    const originY = margin + r * cellSize
    const eyeSize = 7 * cellSize
    const strokeW = cellSize
    const outerX = originX + strokeW / 2
    const outerY = originY + strokeW / 2
    const outerW = eyeSize - strokeW
    const outerRx = cellSize * 2.2

    elements.push(
      `<rect x="${outerX.toFixed(2)}" y="${outerY.toFixed(2)}" width="${outerW.toFixed(2)}" height="${outerW.toFixed(2)}" rx="${outerRx.toFixed(2)}" fill="none" stroke="${eyeColor}" stroke-width="${strokeW.toFixed(2)}" />`
    )

    const pupilInset = 2 * cellSize
    const pupilW = 3 * cellSize
    const pupilRx = cellSize * 1.5
    elements.push(
      `<rect x="${(originX + pupilInset).toFixed(2)}" y="${(originY + pupilInset).toFixed(2)}" width="${pupilW.toFixed(2)}" height="${pupilW.toFixed(2)}" rx="${pupilRx.toFixed(2)}" fill="${eyeInnerColor}" />`
    )
  })

  // Center Emblem
  const centerDim = (centerRadius * 2 + 1) * cellSize + cellSize * 0.4
  const logoX = margin + (centerPos - centerRadius) * cellSize - cellSize * 0.2
  const logoY = margin + (centerPos - centerRadius) * cellSize - cellSize * 0.2
  const logoRx = centerDim * 0.28
  const centerX = logoX + centerDim / 2
  const centerY = logoY + centerDim / 2

  elements.push(
    `<rect x="${logoX.toFixed(2)}" y="${logoY.toFixed(2)}" width="${centerDim.toFixed(2)}" height="${centerDim.toFixed(2)}" rx="${logoRx.toFixed(2)}" fill="#0B0E23" stroke="#3B82F6" stroke-width="${(cellSize * 0.35).toFixed(2)}" />`
  )
  elements.push(
    `<text x="${centerX.toFixed(2)}" y="${(centerY + 2).toFixed(2)}" font-family="system-ui, -apple-system, sans-serif" font-size="${(centerDim * 0.45).toFixed(2)}" font-weight="900" fill="#60A5FA" text-anchor="middle" dominant-baseline="middle">AT</text>`
  )

  // Bottom text
  elements.push(`<line x1="${margin}" y1="${size - 2}" x2="${size - margin}" y2="${size - 2}" stroke="${dotColor}" stroke-opacity="0.15" stroke-width="1" />`)
  elements.push(
    `<text x="${size / 2}" y="${size + 18}" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="800" fill="${textColor}" text-anchor="middle" letter-spacing="0.04em">${title.toUpperCase()}</text>`
  )
  elements.push(
    `<text x="${size / 2}" y="${size + 34}" font-family="ui-monospace, monospace" font-size="8.5" font-weight="700" fill="${textColor}" opacity="0.75" text-anchor="middle" letter-spacing="0.04em">${serial.toUpperCase()}</text>`
  )

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size + 50}" width="${size}" height="${size + 50}" style="display:block; background-color:${backgroundColor};">
    ${elements.join("\n    ")}
  </svg>`
}

async function run() {
  console.log(`🚀 Generating QR Code Assets using domain: ${DOMAIN}`)
  console.log(`📁 Target directory: ${OUTPUT_DIR}\n`)

  for (const item of ITEMS) {
    const svgPath = path.join(OUTPUT_DIR, `${item.fileName}.svg`)
    const pngPath = path.join(OUTPUT_DIR, `${item.fileName}.png`)

    const svgContent = generateStyledSvg(item)
    fs.writeFileSync(svgPath, svgContent, "utf-8")
    console.log(`✓ Created SVG: ${item.fileName}.svg`)

    // Generate high resolution PNG using qrcode toDataURL / toFile
    await QRCode.toFile(pngPath, item.url, {
      width: 1024,
      margin: 2,
      color: {
        dark: item.dotColor === "#3B82F6" ? "#0B0E23" : "#0B0E23",
        light: "#FFFFFF"
      },
      errorCorrectionLevel: "H"
    })
    console.log(`✓ Created PNG: ${item.fileName}.png`)
  }

  console.log(`\n🎉 Successfully generated all QR code assets in ${OUTPUT_DIR}`)
}

run().catch((err) => {
  console.error("❌ Failed to generate QR codes:", err)
  process.exit(1)
})
