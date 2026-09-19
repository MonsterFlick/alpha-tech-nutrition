"use client"

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import JSZip from "jszip"
import {
  Lock,
  Unlock,
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
} from "lucide-react"
import { PRODUCTS_CATALOG, type ProductItem } from "@/lib/product-catalog"
import { getVerificationUrl } from "@/lib/qr-service"
import { registerNewRecord, getAllVerificationRecords } from "@/lib/verification"
import { generateAestheticQRSvg, svgToPngDataUrl } from "@/lib/aesthetic-qr"
import { AestheticQRView } from "@/components/aesthetic-qr-view"

// Permanent official registered codes for each product - cannot be deleted or lost
const PERMANENT_PRODUCT_CODES: Record<
  string,
  { code: string; batchNumber: string; mfgDate: string; expDate: string }
> = {
  "prime-whey": {
    code: "ATN-PW-2026-0001",
    batchNumber: "ATN-PW-B26-01",
    mfgDate: "01/2026",
    expDate: "12/2027",
  },
  "anabolic-lean-muscle-builder": {
    code: "ATN-ALMB-2026-0002",
    batchNumber: "ATN-ALMB-B26-02",
    mfgDate: "02/2026",
    expDate: "01/2028",
  },
  "alpha-super-mass-gainer": {
    code: "ATN-ASMG-2026-0003",
    batchNumber: "ATN-ASMG-B26-03",
    mfgDate: "01/2026",
    expDate: "12/2027",
  },
}

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "alphatech2026"
const AUTH_STORAGE_KEY = "alpha_tech_admin_authenticated"

export default function QRGeneratorPage() {
  // Password Protection State
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
        code: `ATN-PROD-2026-0001`,
        batchNumber: "ATN-B26-01",
        mfgDate: "01/2026",
        expDate: "12/2027",
      }
    )
  }, [selectedProduct])

  const serialCode = permanentDetails.code
  const batchNumber = permanentDetails.batchNumber
  const mfgDate = permanentDetails.mfgDate
  const expDate = permanentDetails.expDate

  // Bulk Labels State
  const [bulkCount, setBulkCount] = useState(6)
  const [isZipping, setIsZipping] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [copied, setCopied] = useState(false)

  // Check existing session authentication on client mount
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(AUTH_STORAGE_KEY)
      if (stored === "true") {
        setIsAuthenticated(true)
      }
    } catch {
      // ignore storage error
    }
    setIsCheckingAuth(false)
  }, [])

  // Ensure permanent codes are always registered in the verification registry
  useEffect(() => {
    PRODUCTS_CATALOG.forEach((p) => {
      const perm = PERMANENT_PRODUCT_CODES[p.id]
      if (perm) {
        registerNewRecord({
          code: perm.code,
          productId: p.id,
          batchNumber: perm.batchNumber,
          mfgDate: perm.mfgDate,
          expDate: perm.expDate,
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

  // Download official product QR as PNG with product name at bottom
  const handleDownloadPNG = async () => {
    setIsExporting(true)
    const svgStr = generateAestheticQRSvg(verificationUrl, {
      size: 700,
      productTitle: `${selectedProduct.name} • ${selectedProduct.weight}`,
      serialCode,
    })
    const pngDataUrl = await svgToPngDataUrl(svgStr, 700)
    const a = document.createElement("a")
    a.href = pngDataUrl
    const safeName = selectedProduct.name.replace(/\s+/g, "_")
    a.download = `AlphaTech_${safeName}_${serialCode}.png`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    setIsExporting(false)
  }

  // Download official product QR as SVG with product name at bottom
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
    a.download = `AlphaTech_${safeName}_${serialCode}.svg`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  // Download all batch codes as a ZIP archive with product names
  const handleDownloadZip = async () => {
    setIsZipping(true)
    try {
      const zip = new JSZip()
      const folderName = `AlphaTech_${selectedProduct.name.replace(/\s+/g, "_")}_Batch_Labels`
      const folder = zip.folder(folderName) || zip

      // 1. Add the primary permanent code
      const mainSvg = generateAestheticQRSvg(verificationUrl, {
        size: 700,
        productTitle: `${selectedProduct.name} • ${selectedProduct.weight}`,
        serialCode,
      })
      const mainPng = await svgToPngDataUrl(mainSvg, 700)
      const base64Data = mainPng.split(",")[1]
      folder.file(`01_${selectedProduct.name.replace(/\s+/g, "_")}_${serialCode}.png`, base64Data, { base64: true })

      // 2. Generate and add remaining unique batch codes
      let prefix = "PW"
      if (selectedProduct.id.includes("lean")) prefix = "ALMB"
      if (selectedProduct.id.includes("mass")) prefix = "ASMG"

      for (let i = 2; i <= bulkCount; i++) {
        const padIndex = String(i).padStart(4, "0")
        const batchCode = `ATN-${prefix}-2026-${padIndex}`

        // Register in system
        registerNewRecord({
          code: batchCode,
          productId: selectedProduct.id,
          batchNumber,
          mfgDate,
          expDate,
        })

        const itemUrl = getVerificationUrl(batchCode)
        const itemSvg = generateAestheticQRSvg(itemUrl, {
          size: 700,
          productTitle: `${selectedProduct.name} • ${selectedProduct.weight}`,
          serialCode: batchCode,
        })
        const itemPng = await svgToPngDataUrl(itemSvg, 700)
        const itemBase64 = itemPng.split(",")[1]

        folder.file(
          `${String(i).padStart(2, "0")}_${selectedProduct.name.replace(/\s+/g, "_")}_${batchCode}.png`,
          itemBase64,
          { base64: true }
        )
      }

      // Generate zip file blob
      const content = await zip.generateAsync({ type: "blob" })
      const a = document.createElement("a")
      a.href = URL.createObjectURL(content)
      a.download = `AlphaTech_${selectedProduct.name.replace(/\s+/g, "_")}_Labels.zip`
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

  // If checking authentication
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#0d0e12] flex items-center justify-center text-[#AFFF00] font-mono text-sm">
        Initializing Security Protocol...
      </div>
    )
  }

  // PASSWORD LOCKOUT SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0d0e12] text-white flex items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#AFFF00]/10 blur-[180px] pointer-events-none rounded-full" />

        <div className="max-w-md w-full bg-[#16181f]/95 border-2 border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-xl relative z-10 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#AFFF00]/15 border border-[#AFFF00]/40 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#AFFF00]/20">
            <Lock className="w-8 h-8 text-[#AFFF00]" />
          </div>

          <div className="text-[10px] font-mono font-bold text-[#AFFF00] uppercase tracking-widest mb-1">
            Restricted Access
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-white mb-2">
            Packaging QR Suite
          </h1>
          <p className="text-xs text-white/60 mb-6 leading-relaxed">
            This module is restricted to authorized factory production staff and brand administrators.
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
                className={`w-full bg-[#0d0e12] border-2 ${
                  passwordError ? "border-red-500 ring-2 ring-red-500/20" : "border-white/20 focus:border-[#AFFF00]"
                } text-white font-mono text-sm px-4 py-3.5 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#AFFF00]/20 transition-all pr-10`}
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
              className="w-full bg-[#AFFF00] hover:bg-[#9de600] text-[#121212] font-black rounded-xl py-3 text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#AFFF00]/20 cursor-pointer"
            >
              <KeyRound className="w-4 h-4" />
              <span>Unlock Suite</span>
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-center">
            <Link
              href="/"
              className="text-xs font-mono text-white/40 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Store Home</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // AUTHENTICATED ADMIN SUITE
  return (
    <div className="min-h-screen bg-[#0d0e12] text-white selection:bg-[#AFFF00] selection:text-[#121212]">
      {/* Print sheet styles */}
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
      <header className="border-b border-white/10 bg-[#121212]/90 backdrop-blur-xl sticky top-0 z-40 print:hidden">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <ArrowLeft className="w-5 h-5 text-white/60 group-hover:text-[#AFFF00] group-hover:-translate-x-1 transition-all" />
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight">
                ALPHA <span className="text-[#AFFF00]">TECH</span>
              </span>
              <span className="text-[9px] font-mono tracking-[0.2em] text-[#AFFF00] uppercase font-bold">
                Packaging QR Suite (Admin Session Active)
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href={`/verify?code=${encodeURIComponent(serialCode)}`}
              target="_blank"
              className="text-xs font-mono font-bold px-3.5 py-1.5 rounded-full border border-[#AFFF00]/40 text-[#AFFF00] hover:bg-[#AFFF00]/10 transition-colors flex items-center gap-1.5"
            >
              <span>Test Customer Scan</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="text-xs font-mono text-white/60 hover:text-white px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Lock className="w-3 h-3" />
              <span>Lock Session</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 print:hidden">
        {/* Title Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#AFFF00]/10 border border-[#AFFF00]/30 text-[#AFFF00] text-xs font-mono font-semibold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4" />
            Permanent Authenticity Registry & Packaging QR
          </div>
          <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tight">
            Product Packaging <span className="text-[#AFFF00]">QR Code Generator</span>
          </h1>
          <p className="text-white/60 text-sm mt-1 max-w-2xl">
            Each product has a permanent, certified security QR code with the product title printed at the bottom.
            Select your product below to download high-res files or export complete batch sheets as ZIP archives.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT COLUMN: Product Selector & Batch Zip Generator */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Select Product */}
            <div className="bg-[#16181f] border border-white/10 rounded-2xl p-6">
              <label className="block text-xs font-mono text-[#AFFF00] uppercase tracking-wider font-bold mb-3">
                1. Select Product Formulation
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {PRODUCTS_CATALOG.map((p) => {
                  const isSelected = selectedProduct.id === p.id
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedProduct(p)}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col items-center text-center ${
                        isSelected
                          ? "bg-[#AFFF00]/15 border-[#AFFF00] shadow-[0_0_15px_rgba(175,255,0,0.15)]"
                          : "bg-white/5 border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="relative w-20 h-20 mb-2">
                        <Image src={p.image} alt={p.name} fill className="object-contain" />
                      </div>
                      <span className="font-black text-xs text-white leading-tight line-clamp-1">{p.name}</span>
                      <span className="text-[10px] font-mono text-[#AFFF00] mt-1 font-bold">{p.weight}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Step 2: Locked Permanent Product Authentication Specs */}
            <div className="bg-[#16181f] border border-white/10 rounded-2xl p-6 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono text-white/60 uppercase tracking-wider font-bold">
                  2. Permanent Registered Product Credentials (Locked)
                </label>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#AFFF00] bg-[#AFFF00]/10 px-2 py-0.5 rounded-full">
                  <ShieldCheck className="w-3 h-3" /> Permanent & Active
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0d0e12] border border-white/10 font-mono text-sm flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-white/40 block">OFFICIAL SERIAL ID</span>
                  <span className="font-black text-white tracking-wider">{serialCode}</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#AFFF00]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied" : "Copy URL"}</span>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-1">
                <div className="bg-[#0d0e12] border border-white/10 rounded-xl p-3 text-center">
                  <span className="text-[10px] font-mono text-white/40 block">BATCH NUMBER</span>
                  <span className="text-xs font-bold font-mono text-white">{batchNumber}</span>
                </div>
                <div className="bg-[#0d0e12] border border-white/10 rounded-xl p-3 text-center">
                  <span className="text-[10px] font-mono text-white/40 block">MFG DATE</span>
                  <span className="text-xs font-bold font-mono text-white">{mfgDate}</span>
                </div>
                <div className="bg-[#0d0e12] border border-white/10 rounded-xl p-3 text-center">
                  <span className="text-[10px] font-mono text-white/40 block">EXP DATE</span>
                  <span className="text-xs font-bold font-mono text-white">{expDate}</span>
                </div>
              </div>
            </div>

            {/* Step 3: Multi-Label Batch Generator (Export All as ZIP) */}
            <div className="bg-[#16181f] border border-[#AFFF00]/30 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono text-[#AFFF00] uppercase tracking-wider font-bold flex items-center gap-1.5">
                  <FileArchive className="w-4 h-4" />
                  3. Batch Production: Download All Labels as ZIP
                </label>
                <span className="text-[11px] font-mono text-white/50">Each image includes Product Name</span>
              </div>
              <p className="text-xs text-white/60 mb-5 leading-relaxed">
                Generate a batch of high-resolution rounded QR labels for this product. Every PNG inside the ZIP archive
                is titled with the product name and serial code (e.g.{" "}
                <span className="text-white font-mono">
                  AlphaTech_{selectedProduct.name.replace(/\s+/g, "_")}_0001.png
                </span>
                ) and has the product name stamped at the bottom.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <select
                  value={bulkCount}
                  onChange={(e) => setBulkCount(Number(e.target.value))}
                  className="bg-[#0d0e12] border border-white/20 text-white rounded-xl px-4 py-3 text-xs font-mono focus:outline-none focus:border-[#AFFF00]"
                >
                  <option value={4}>Package 4 Labels</option>
                  <option value={8}>Package 8 Labels</option>
                  <option value={12}>Package 12 Labels</option>
                  <option value={20}>Package 20 Labels</option>
                </select>

                <button
                  type="button"
                  onClick={handleDownloadZip}
                  disabled={isZipping}
                  className="px-6 py-3 bg-[#AFFF00] hover:bg-[#9de600] disabled:opacity-50 text-[#121212] font-black text-xs font-mono rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-[#AFFF00]/20"
                >
                  {isZipping ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Generating ZIP Archive...</span>
                    </>
                  ) : (
                    <>
                      <FileArchive className="w-4 h-4" />
                      <span>Download All as ZIP (.zip)</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Official Product QR Card Preview */}
          <div className="lg:col-span-5 space-y-6">
            <div className="sticky top-24">
              <span className="block text-xs font-mono text-white/50 uppercase tracking-wider mb-2">
                Official Authenticity Sticker (Live Preview)
              </span>

              {/* Physical Sticker Card with Product Title at Bottom */}
              <div className="bg-[#12141a] border-2 border-[#AFFF00]/40 rounded-3xl p-6 shadow-2xl relative overflow-hidden text-center backdrop-blur-xl">
                <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#AFFF00] uppercase tracking-widest mb-2 bg-[#AFFF00]/10 px-3 py-1 rounded-full border border-[#AFFF00]/30">
                  <ShieldCheck className="w-3.5 h-3.5" /> Official Tamper-Evident Seal
                </div>

                <div className="font-black text-lg tracking-tight uppercase">
                  ALPHA <span className="text-[#AFFF00]">TECH</span> NUTRITION
                </div>
                <div className="text-[10px] font-mono text-white/60 uppercase">
                  Authenticity Verification Seal
                </div>

                {/* Aesthetic Rounded QR with Product Title */}
                <div className="my-5 flex justify-center">
                  <div className="p-3 bg-white rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative">
                    <AestheticQRView
                      value={verificationUrl}
                      size={240}
                      dotStyle="dots"
                      eyeStyle="smooth"
                      theme="neon_lime"
                      includeCenterLogo={true}
                      centerLogoText="α"
                      productTitle={`${selectedProduct.name} • ${selectedProduct.weight}`}
                      serialCode={serialCode}
                    />
                  </div>
                </div>

                {/* Bottom Sticker Metadata */}
                <div className="space-y-1.5">
                  <div className="text-[11px] font-mono font-bold text-[#AFFF00] bg-black/60 py-1.5 px-3 rounded-xl border border-white/10 tracking-wider">
                    BATCH: {batchNumber} • EXP: {expDate}
                  </div>
                  <div className="text-[9px] font-mono text-white/40 pt-1">
                    SCAN WITH SMARTPHONE CAMERA TO VERIFY 100% GENUINE FORMULA
                  </div>
                </div>
              </div>

              {/* Export Buttons */}
              <div className="grid grid-cols-2 gap-2.5 mt-4">
                <button
                  type="button"
                  onClick={handleDownloadPNG}
                  disabled={isExporting}
                  className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isExporting ? "Exporting..." : "Download PNG"}</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadSVG}
                  className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download SVG</span>
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Sheet</span>
                </button>
                <Link
                  href={`/verify?code=${encodeURIComponent(serialCode)}`}
                  target="_blank"
                  className="px-4 py-3 rounded-xl bg-[#AFFF00] hover:bg-[#9de600] text-[#121212] font-mono text-xs font-black transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-[#AFFF00]/20"
                >
                  <span>Test Scan</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* PRINT-ONLY SECTION */}
      <div id="print-section" className="hidden print:block p-8 bg-white text-black">
        <h2 className="text-xl font-bold mb-2 pb-2 border-b">
          Alpha Tech Nutrition - Official Packaging Labels
        </h2>
        <p className="text-xs text-gray-500 mb-6 font-mono">
          Product: {selectedProduct.name} ({selectedProduct.sku}) • Batch: {batchNumber} • Exp: {expDate}
        </p>

        <div className="grid grid-cols-2 gap-6">
          {Array.from({ length: bulkCount }).map((_, idx) => {
            const pad = String(idx + 1).padStart(4, "0")
            const code = idx === 0 ? serialCode : `ATN-${selectedProduct.id.slice(0, 4).toUpperCase()}-2026-${pad}`
            const itemUrl = getVerificationUrl(code)
            const itemSvg = generateAestheticQRSvg(itemUrl, {
              size: 260,
              margin: 12,
              theme: "print_clean",
              productTitle: `${selectedProduct.name} • ${selectedProduct.weight}`,
              serialCode: code,
            })

            return (
              <div
                key={code}
                className="border-2 border-dashed border-black p-4 rounded-2xl flex items-center gap-4 page-break-inside-avoid"
              >
                <div
                  className="w-32 h-36 shrink-0 flex items-center justify-center"
                  dangerouslySetInnerHTML={{ __html: itemSvg }}
                />
                <div className="space-y-1 font-mono">
                  <span className="text-xs font-black tracking-tight block">ALPHA TECH NUTRITION</span>
                  <span className="text-[11px] font-bold text-gray-800 block">{selectedProduct.name}</span>
                  <span className="text-[10px] font-bold block">SERIAL: {code}</span>
                  <span className="text-[9px] text-gray-500 block">BATCH: {batchNumber}</span>
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
