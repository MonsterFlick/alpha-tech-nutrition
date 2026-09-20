"use client"

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import JSZip from "jszip"
import {
  Lock,
  ShieldCheck,
  Download,
  Printer,
  Copy,
  Check,
  ExternalLink,
  ArrowLeft,
  FileArchive,
  RefreshCw,
  Sparkles,
  AlertCircle,
  KeyRound,
  Eye,
  EyeOff,
  Layers,
  FileCode,
  FileText,
} from "lucide-react"
import { PRODUCTS_CATALOG, type ProductItem } from "@/lib/product-catalog"
import { getVerificationUrl } from "@/lib/qr-service"
import { registerNewRecord } from "@/lib/verification"
import { generateAestheticQRSvg, svgToPngDataUrl } from "@/lib/aesthetic-qr"
import { AestheticQRView } from "@/components/aesthetic-qr-view"
import { BrandLogo } from "@/components/brand-logo"
import { ALPHA_TECH_ICON_BASE64 } from "@/lib/brand-assets"

// Permanent official registered codes for each product - locked and cannot be deleted
const PERMANENT_PRODUCT_CODES: Record<
  string,
  { code: string }
> = {
  "prime-whey": {
    code: "e4f9b8c2-3a5d-4e17-b6c8-9d2f1a0e5b7c",
  },
  "anabolic-lean-muscle-builder": {
    code: "b7c3d1e5-8f2a-4c96-a1d4-6e8b0f3a2c5e",
  },
  "alpha-super-mass-gainer": {
    code: "f2a8c4e0-5d1b-4f73-9e6a-8b1c3d5e7f9a",
  },
}

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "alphatech2026"
const AUTH_STORAGE_KEY = "alpha_tech_admin_authenticated"

export default function QRGeneratorPage() {
  // Password Protection
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passwordInput, setPasswordInput] = useState("")
  const [passwordError, setPasswordError] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)

  // Product Selection (Default: Prime Whey)
  const [selectedProduct, setSelectedProduct] = useState<ProductItem>(PRODUCTS_CATALOG[0])

  // Permanent Product Details (Locked & Stable)
  const permanentDetails = useMemo(() => {
    return (
      PERMANENT_PRODUCT_CODES[selectedProduct.id] || {
        code: "e4f9b8c2-3a5d-4e17-b6c8-9d2f1a0e5b7c",
      }
    )
  }, [selectedProduct])

  const serialCode = permanentDetails.code

  // Export States
  const [isZipping, setIsZipping] = useState(false)
  const [exportingType, setExportingType] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  // Check existing session authentication on client mount
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(AUTH_STORAGE_KEY)
      if (stored === "true") {
        setIsAuthenticated(true)
      }
    } catch {
      // ignore
    }
    setIsCheckingAuth(false)
  }, [])

  // Guarantee permanent codes are always registered in the verification database
  useEffect(() => {
    PRODUCTS_CATALOG.forEach((p) => {
      const perm = PERMANENT_PRODUCT_CODES[p.id]
      if (perm) {
        registerNewRecord({
          code: perm.code,
          productId: p.id,
        })
      }
    })
  }, [])

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setPasswordError(false)
      try {
        sessionStorage.setItem(AUTH_STORAGE_KEY, "true")
      } catch {
        // ignore
      }
    } else {
      setPasswordError(true)
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setPasswordInput("")
    try {
      sessionStorage.removeItem(AUTH_STORAGE_KEY)
    } catch {
      // ignore
    }
  }

  const verificationUrl = useMemo(() => {
    return getVerificationUrl(serialCode)
  }, [serialCode])

  const handleCopyLink = () => {
    navigator.clipboard.writeText(verificationUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // 1. Download Transparent PNG (Just the rounded QR code, no white box)
  const handleDownloadTransparentPNG = async () => {
    setExportingType("transparent")
    const svgStr = generateAestheticQRSvg(verificationUrl, {
      size: 800,
      backgroundColor: "transparent",
      dotColor: "#0B0E23",
      eyeColor: "#161B3D",
      eyeInnerColor: "#3B82F6",
      centerLogoImage: ALPHA_TECH_ICON_BASE64,
    })
    const pngDataUrl = await svgToPngDataUrl(svgStr, 800)
    const a = document.createElement("a")
    a.href = pngDataUrl
    const safeName = selectedProduct.name.replace(/\s+/g, "_")
    a.download = `AlphaTech_${safeName}_Transparent.png`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    setExportingType(null)
  }

  // 2. Download Sticker Card PNG (With White Box & Product Info at bottom)
  const handleDownloadStickerCardPNG = async () => {
    setExportingType("sticker")
    const svgStr = generateAestheticQRSvg(verificationUrl, {
      size: 700,
      productTitle: `${selectedProduct.name} • ${selectedProduct.weight}`,
      serialCode,
    })
    const pngDataUrl = await svgToPngDataUrl(svgStr, 700)
    const a = document.createElement("a")
    a.href = pngDataUrl
    const safeName = selectedProduct.name.replace(/\s+/g, "_")
    a.download = `AlphaTech_${safeName}_Sticker_Card.png`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    setExportingType(null)
  }

  // 3. Download Vector SVG
  const handleDownloadSVG = () => {
    const svgStr = generateAestheticQRSvg(verificationUrl, {
      size: 600,
      productTitle: `${selectedProduct.name} • ${selectedProduct.weight}`,
      serialCode,
    })
    const blob = new Blob([svgStr], { type: "image/svg+xml" })
    const a = document.createElement("a")
    a.href = URL.createObjectURL(blob)
    const safeName = selectedProduct.name.replace(/\s+/g, "_")
    a.download = `AlphaTech_${safeName}_Master.svg`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  // 4. Download Complete ZIP Package containing ALL types
  const handleDownloadCompleteZip = async () => {
    setIsZipping(true)
    try {
      const zip = new JSZip()
      const safeName = selectedProduct.name.replace(/\s+/g, "_")
      const folderName = `AlphaTech_${safeName}_QR_Packaging_Kit`
      const folder = zip.folder(folderName) || zip

      // 1. Transparent Background PNG (Navy Midnight + Cobalt Blue eyes)
      const transSvg = generateAestheticQRSvg(verificationUrl, {
        size: 800,
        backgroundColor: "transparent",
        dotColor: "#0B0E23",
        eyeColor: "#161B3D",
        eyeInnerColor: "#3B82F6",
        centerLogoImage: ALPHA_TECH_ICON_BASE64,
      })
      const transPng = await svgToPngDataUrl(transSvg, 800)
      folder.file(`01_Transparent_NavyBlue_QR_${safeName}.png`, transPng.split(",")[1], { base64: true })

      // 2. Transparent Background PNG (Electric Cobalt Blue for dark packaging tubs)
      const transCobaltSvg = generateAestheticQRSvg(verificationUrl, {
        size: 800,
        backgroundColor: "transparent",
        dotColor: "#3B82F6",
        eyeColor: "#60A5FA",
        eyeInnerColor: "#ffffff",
        centerLogoImage: ALPHA_TECH_ICON_BASE64,
      })
      const transCobaltPng = await svgToPngDataUrl(transCobaltSvg, 800)
      folder.file(`02_Transparent_ElectricCobalt_QR_${safeName}.png`, transCobaltPng.split(",")[1], { base64: true })

      // 3. Complete Packaging Sticker Card with White Box & Product Title at Bottom
      const stickerSvg = generateAestheticQRSvg(verificationUrl, {
        size: 700,
        productTitle: `${selectedProduct.name} • ${selectedProduct.weight}`,
        serialCode,
      })
      const stickerPng = await svgToPngDataUrl(stickerSvg, 700)
      folder.file(`03_Packaging_Sticker_Card_${safeName}.png`, stickerPng.split(",")[1], { base64: true })

      // 4. Monochrome High-Contrast Print (Black & White for factory barcode/thermal printers)
      const printBwSvg = generateAestheticQRSvg(verificationUrl, {
        size: 700,
        theme: "print_clean",
        productTitle: `${selectedProduct.name} • ${selectedProduct.weight}`,
        serialCode,
      })
      const printBwPng = await svgToPngDataUrl(printBwSvg, 700)
      folder.file(`04_Print_Ready_Monochrome_${safeName}.png`, printBwPng.split(",")[1], { base64: true })

      // 5. Scalable Vector SVG
      folder.file(`05_Vector_Packaging_Master_${safeName}.svg`, stickerSvg)

      // 6. Complete Documentation & Verification Specs (.txt)
      const specSheet = `=====================================================
ALPHA TECH NUTRITION - OFFICIAL PACKAGING ASSET KIT
=====================================================

Product Name:        ${selectedProduct.name}
Category:            ${selectedProduct.category}
Flavor:              ${selectedProduct.flavor}
Net Weight:          ${selectedProduct.weight}
Servings:            ${selectedProduct.servings}

Product UUID:        ${serialCode}
Direct Verification: ${verificationUrl}

Included Assets in this Kit:
- 01_Transparent_QR_${safeName}.png          -> Transparent PNG (Dark Charcoal & Lime eyes)
- 02_Transparent_NeonLime_QR_${safeName}.png -> Transparent PNG (Neon Lime for dark bottles)
- 03_Packaging_Sticker_Card_${safeName}.png  -> Full sticker with white box & product title
- 04_Print_Ready_Monochrome_${safeName}.png  -> 100% Black & White for thermal label printers
- 05_Vector_Packaging_Master_${safeName}.svg -> Scalable vector file for prepress / Illustrator

Lab Clearance:
- Protein Purity: ${selectedProduct.labReport.proteinPurity}
- Heavy Metals:   ${selectedProduct.labReport.heavyMetals}
- WADA Doping:    ${selectedProduct.labReport.dopingSubstances}
- Pathogens:      ${selectedProduct.labReport.microbiologicalQuality}

Quality Standards: ${selectedProduct.certifications.join(" • ")}
=====================================================
`
      folder.file(`06_Authentication_Credentials_${safeName}.txt`, specSheet)

      // Generate and trigger download
      const content = await zip.generateAsync({ type: "blob" })
      const a = document.createElement("a")
      a.href = URL.createObjectURL(content)
      a.download = `AlphaTech_${safeName}_Official_QR_Kit.zip`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    } catch (err) {
      console.error("Failed to generate ZIP", err)
    } finally {
      setIsZipping(false)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  // Loading Session
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#080B1C] flex items-center justify-center text-blue-400 font-mono text-sm">
        Verifying Security Credentials...
      </div>
    )
  }

  // PASSWORD LOCKOUT SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#080B1C] text-white flex items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/15 blur-[180px] pointer-events-none rounded-full" />

        <div className="max-w-md w-full bg-[#0B0E23]/95 border-2 border-blue-900/40 rounded-3xl p-8 shadow-[0_0_50px_rgba(59,130,246,0.15)] backdrop-blur-xl relative z-10 text-center">
          <div className="flex justify-center mb-6">
            <BrandLogo size="md" scrolled={true} />
          </div>

          <div className="w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-500/40 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/20">
            <Lock className="w-6 h-6 text-blue-400" />
          </div>

          <div className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest mb-1">
            Restricted Production Access
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-white mb-2">
            Packaging QR Suite
          </h1>
          <p className="text-xs text-white/60 mb-6 leading-relaxed">
            Authorized access only for brand packaging and factory production staff.
          </p>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value)
                  setPasswordError(false)
                }}
                placeholder="Enter Admin Security Passcode"
                className={`w-full bg-[#080B1C] border-2 ${
                  passwordError ? "border-red-500 ring-2 ring-red-500/20" : "border-white/20 focus:border-blue-500"
                } text-white font-mono text-sm px-4 py-3.5 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {passwordError && (
              <div className="text-xs text-red-400 font-mono flex items-center justify-center gap-1.5 pt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Incorrect passcode. Please try again.</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-black rounded-xl py-3 text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/25 cursor-pointer"
            >
              <KeyRound className="w-4 h-4" />
              <span>Unlock QR Suite</span>
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-center">
            <Link
              href="/"
              className="text-xs font-mono text-white/40 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Website</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // AUTHENTICATED PACKAGING SUITE
  return (
    <div className="min-h-screen bg-[#080B1C] text-white selection:bg-blue-600 selection:text-white">
      {/* Print-specific layout */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #print-section,
          #print-section * {
            visibility: visible;
          }
          #print-section {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background: white !important;
            color: black !important;
          }
        }
      `}</style>

      {/* Admin Top Header */}
      <header className="border-b border-blue-900/30 bg-[#0B0E23]/90 backdrop-blur-xl sticky top-0 z-40 print:hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <Link
              href="/"
              className="p-2 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/50 text-white/70 hover:text-white transition-all group shrink-0"
              title="Return to Store"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-0.5 transition-transform" />
            </Link>
            <BrandLogo size="sm" scrolled={true} subtitle="Packaging Asset Suite" />
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link
              href={`/verify?code=${encodeURIComponent(serialCode)}`}
              target="_blank"
              className="text-[11px] sm:text-xs font-mono font-bold px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-blue-500/40 text-blue-400 hover:bg-blue-500/10 transition-colors flex items-center gap-1.5"
            >
              <span className="hidden sm:inline">Test Customer Scan</span>
              <span className="sm:hidden">Test Scan</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="text-[11px] sm:text-xs font-mono text-white/60 hover:text-white px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Lock className="w-3 h-3" />
              <span className="hidden sm:inline">Lock Session</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 print:hidden">
        {/* Title Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4" />
            Official Packaging Assets & Production Kit
          </div>
          <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tight">
            Packaging QR <span className="text-blue-400">Asset Kit</span>
          </h1>
          <p className="text-white/60 text-sm mt-1 max-w-2xl">
            Select a product to preview its official locked QR code and download the complete packaging asset kit
            (Transparent PNG, Sticker Card with Product Title, Monochrome Print, and Vector SVG).
          </p>
        </div>

        {/* Product Selector Tabs */}
        <div className="bg-[#0B0E23] border border-blue-900/40 rounded-2xl p-5 mb-8">
          <label className="block text-xs font-mono text-blue-400 uppercase tracking-wider font-bold mb-3">
            Select Product Formulation
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {PRODUCTS_CATALOG.map((p) => {
              const isSelected = selectedProduct.id === p.id
              const perm = PERMANENT_PRODUCT_CODES[p.id]
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedProduct(p)}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-4 ${
                    isSelected
                      ? "bg-blue-600/15 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.2)]"
                      : "bg-white/5 border-white/10 hover:border-blue-500/30"
                  }`}
                >
                  <div className="relative w-16 h-16 shrink-0">
                    <Image src={p.image} alt={p.name} fill className="object-contain" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="font-black text-sm text-white block truncate">{p.name}</span>
                    <span className="text-[11px] font-mono text-blue-400 block">{p.weight}</span>
                    <span className="text-[10px] font-mono text-white/50 block font-bold mt-0.5">
                      {perm?.code}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: The Complete ZIP Kit Download & Assets List */}
          <div className="lg:col-span-7 space-y-6">
            {/* Primary Action Card: Download All in Single ZIP */}
            <div className="bg-gradient-to-br from-[#0B0E23] via-[#10173D] to-[#080B1C] border-2 border-blue-500/50 rounded-3xl p-7 shadow-[0_0_40px_rgba(59,130,246,0.2)] relative overflow-hidden">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500 flex items-center justify-center text-blue-400">
                  <FileArchive className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white uppercase tracking-tight">
                    Download All Assets in Single ZIP
                  </h3>
                  <p className="text-xs font-mono text-blue-400">
                    Complete Packaging & Production Kit for {selectedProduct.name}
                  </p>
                </div>
              </div>

              <p className="text-xs text-white/70 mt-3 mb-6 leading-relaxed">
                Click below to download all image formats, vector assets, and authentication documentation bundled
                cleanly in one .zip archive titled for this product:
              </p>

              {/* What is in the ZIP Checklist */}
              <div className="space-y-2.5 mb-6 text-xs font-mono">
                <div className="flex items-center gap-2.5 bg-black/40 border border-white/10 rounded-xl p-2.5">
                  <Check className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="text-white font-bold">1. Navy Blue Transparent PNG</span>
                  <span className="text-white/50 text-[11px]">
                    — Clean transparent background for overlays & packaging tubs
                  </span>
                </div>
                <div className="flex items-center gap-2.5 bg-black/40 border border-white/10 rounded-xl p-2.5">
                  <Check className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="text-white font-bold">2. Electric Cobalt Transparent PNG</span>
                  <span className="text-white/50 text-[11px]">— High-contrast cobalt blue for dark obsidian bottles</span>
                </div>
                <div className="flex items-center gap-2.5 bg-black/40 border border-white/10 rounded-xl p-2.5">
                  <Check className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="text-white font-bold">3. Sticker Card with Info</span>
                  <span className="text-white/50 text-[11px]">— White card with product title stamped at bottom</span>
                </div>
                <div className="flex items-center gap-2.5 bg-black/40 border border-white/10 rounded-xl p-2.5">
                  <Check className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="text-white font-bold">4. Monochrome Print B&W</span>
                  <span className="text-white/50 text-[11px]">— High-contrast for thermal sticker printers</span>
                </div>
                <div className="flex items-center gap-2.5 bg-black/40 border border-white/10 rounded-xl p-2.5">
                  <Check className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="text-white font-bold">5. Scalable Vector SVG</span>
                  <span className="text-white/50 text-[11px]">— Adobe Illustrator / Prepress master</span>
                </div>
                <div className="flex items-center gap-2.5 bg-black/40 border border-white/10 rounded-xl p-2.5">
                  <Check className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="text-white font-bold">6. Authentication Specs (.txt)</span>
                  <span className="text-white/50 text-[11px]">— Batch, serial, and lab assay text record</span>
                </div>
              </div>

              {/* Big ZIP Download Button */}
              <button
                type="button"
                onClick={handleDownloadCompleteZip}
                disabled={isZipping}
                className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white font-black text-sm tracking-wider uppercase rounded-2xl transition-all shadow-xl shadow-blue-500/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isZipping ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Packaging ZIP Kit...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    <span>Download Complete Packaging Kit (.zip)</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Individual Downloads */}
            <div className="bg-[#0B0E23] border border-blue-900/40 rounded-2xl p-6">
              <label className="block text-xs font-mono text-white/50 uppercase tracking-wider mb-4">
                Or Download Individual Files Directly
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={handleDownloadTransparentPNG}
                  disabled={exportingType === "transparent"}
                  className="p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/40 text-left transition-colors flex flex-col justify-between cursor-pointer"
                >
                  <span className="text-xs font-bold text-white block mb-1">Transparent PNG</span>
                  <span className="text-[10px] font-mono text-white/40 block mb-3">No box, transparent BG</span>
                  <span className="text-xs font-mono text-blue-400 font-bold flex items-center gap-1">
                    <Download className="w-3 h-3" />
                    {exportingType === "transparent" ? "Exporting..." : "Download"}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadStickerCardPNG}
                  disabled={exportingType === "sticker"}
                  className="p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/40 text-left transition-colors flex flex-col justify-between cursor-pointer"
                >
                  <span className="text-xs font-bold text-white block mb-1">Sticker Card PNG</span>
                  <span className="text-[10px] font-mono text-white/40 block mb-3">With box & title bottom</span>
                  <span className="text-xs font-mono text-blue-400 font-bold flex items-center gap-1">
                    <Download className="w-3 h-3" />
                    {exportingType === "sticker" ? "Exporting..." : "Download"}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadSVG}
                  className="p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/40 text-left transition-colors flex flex-col justify-between cursor-pointer"
                >
                  <span className="text-xs font-bold text-white block mb-1">Vector SVG</span>
                  <span className="text-[10px] font-mono text-white/40 block mb-3">Infinitely scalable</span>
                  <span className="text-xs font-mono text-blue-400 font-bold flex items-center gap-1">
                    <Download className="w-3 h-3" />
                    <span>Download</span>
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Live Packaging Sticker Preview */}
          <div className="lg:col-span-5 space-y-6">
            <div className="sticky top-24">
              <span className="block text-xs font-mono text-white/50 uppercase tracking-wider mb-2">
                Official Packaging Sticker (Live Preview)
              </span>

              {/* Physical Sticker Card Preview with Product Title at Bottom */}
              <div className="bg-[#0B0E23]/95 border-2 border-blue-500/40 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-[0_0_30px_rgba(59,130,246,0.15)] relative overflow-hidden text-center backdrop-blur-xl">
                <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest mb-2 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/30">
                  <ShieldCheck className="w-3.5 h-3.5" /> Official Tamper-Evident Seal
                </div>

                <div className="font-black text-base sm:text-lg tracking-tight uppercase">
                  ALPHA <span className="text-blue-400">TECH</span> NUTRITION
                </div>
                <div className="text-[10px] font-mono text-white/60 uppercase">
                  Authenticity Verification Seal
                </div>

                {/* Aesthetic Rounded QR Code */}
                <div className="my-4 sm:my-5 flex justify-center">
                  <div className="p-2 sm:p-3 bg-white rounded-2xl sm:rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative max-w-full flex items-center justify-center">
                    <AestheticQRView
                      value={verificationUrl}
                      size={220}
                      margin={4}
                      className="max-w-[220px] w-full"
                      dotStyle="dots"
                      eyeStyle="smooth"
                      theme="royal_navy"
                      includeCenterLogo={true}
                      centerLogoImage={ALPHA_TECH_ICON_BASE64}
                      productTitle={`${selectedProduct.name} • ${selectedProduct.weight}`}
                      serialCode={serialCode}
                    />
                  </div>
                </div>

                {/* Bottom Sticker Metadata */}
                <div className="space-y-1.5">
                  <div className="text-[10px] sm:text-[11px] font-mono font-bold text-blue-300 bg-black/60 py-1.5 px-2.5 sm:px-3 rounded-xl border border-white/10 tracking-wider break-all">
                    UUID: {serialCode}
                  </div>
                  <div className="text-[9px] font-mono text-white/40 pt-1 leading-tight">
                    SCAN WITH SMARTPHONE CAMERA TO VERIFY 100% GENUINE FORMULA
                  </div>
                </div>
              </div>

              {/* Quick Actions Row */}
              <div className="grid grid-cols-2 gap-2.5 mt-4">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-blue-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Link Copied!" : "Copy URL"}</span>
                </button>

                <Link
                  href={`/verify?code=${encodeURIComponent(serialCode)}`}
                  target="_blank"
                  className="px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-mono text-xs font-black transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-blue-500/25"
                >
                  <span>Test Scan</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>

              <div className="mt-3">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 font-mono text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Sticker Sheet (A4)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* PRINT-ONLY SECTION (A4 sheet with 6 stickers) */}
      <div id="print-section" className="hidden print:block p-8 bg-white text-black">
        <h2 className="text-xl font-bold mb-2 pb-2 border-b">
          Alpha Tech Nutrition - Official Packaging Labels
        </h2>
        <p className="text-xs text-gray-500 mb-6 font-mono">
          Product: {selectedProduct.name} • UUID: {serialCode}
        </p>

        <div className="grid grid-cols-2 gap-6">
          {Array.from({ length: 6 }).map((_, idx) => {
            const itemSvg = generateAestheticQRSvg(verificationUrl, {
              size: 260,
              margin: 12,
              theme: "print_clean",
              productTitle: `${selectedProduct.name} • ${selectedProduct.weight}`,
              serialCode,
            })

            return (
              <div
                key={idx}
                className="border-2 border-dashed border-black p-4 rounded-2xl flex items-center gap-4 page-break-inside-avoid"
              >
                <div
                  className="w-32 h-36 shrink-0 flex items-center justify-center"
                  dangerouslySetInnerHTML={{ __html: itemSvg }}
                />
                <div className="space-y-1 font-mono">
                  <span className="text-xs font-black tracking-tight block">ALPHA TECH NUTRITION</span>
                  <span className="text-[11px] font-bold text-gray-800 block">{selectedProduct.name}</span>
                  <span className="text-[10px] font-bold block">UUID: {serialCode}</span>
                  <span className="text-[8px] text-gray-600 block">SCAN TO VERIFY AUTHENTICITY</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
