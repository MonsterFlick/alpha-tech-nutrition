"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  QrCode,
  Download,
  Printer,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  ArrowLeft,
  RefreshCw,
  Layers,
  Settings,
  Plus,
} from "lucide-react"
import { PRODUCTS_CATALOG, type ProductItem } from "@/lib/product-catalog"
import { generateQRCodeDataUrl, generateQRCodeSvg, getVerificationUrl } from "@/lib/qr-service"
import { registerNewRecord, generateRandomSerial, getAllVerificationRecords, type VerificationRecord } from "@/lib/verification"

export default function QRGeneratorPage() {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem>(PRODUCTS_CATALOG[0])
  const [batchNumber, setBatchNumber] = useState("ATN-PW-B26-05")
  const [mfgDate, setMfgDate] = useState("03/2026")
  const [expDate, setExpDate] = useState("02/2028")
  const [serialCode, setSerialCode] = useState("ATN-PW-2026-7891")
  const [qrDataUrl, setQrDataUrl] = useState("")
  const [copied, setCopied] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [recentGeneratedList, setRecentGeneratedList] = useState<VerificationRecord[]>([])

  // Bulk generation state
  const [bulkCount, setBulkCount] = useState(5)
  const [bulkList, setBulkList] = useState<{ code: string; qrUrl: string }[]>([])
  const [isBulkGenerating, setIsBulkGenerating] = useState(false)

  // Update batch default prefix when product changes
  useEffect(() => {
    let prefix = "PW"
    if (selectedProduct.id.includes("lean")) prefix = "ALMB"
    if (selectedProduct.id.includes("mass")) prefix = "ASMG"

    const newSerial = generateRandomSerial("ATN", prefix)
    setSerialCode(newSerial)
    setBatchNumber(`ATN-${prefix}-B26-05`)
  }, [selectedProduct])

  // Generate QR code whenever serialCode changes
  useEffect(() => {
    async function updateQR() {
      if (!serialCode) return
      setIsGenerating(true)
      const url = getVerificationUrl(serialCode)
      const dataUrl = await generateQRCodeDataUrl(url, {
        width: 600,
        margin: 2,
        darkColor: "#000000",
        lightColor: "#ffffff",
      })
      setQrDataUrl(dataUrl)

      // Register code into local authenticity registry
      registerNewRecord({
        code: serialCode,
        productId: selectedProduct.id,
        batchNumber,
        mfgDate,
        expDate,
      })

      // Refresh recent list
      setRecentGeneratedList(getAllVerificationRecords().slice(0, 6))
      setIsGenerating(false)
    }

    updateQR()
  }, [serialCode, selectedProduct, batchNumber, mfgDate, expDate])

  const handleGenerateNewRandomCode = () => {
    let prefix = "PW"
    if (selectedProduct.id.includes("lean")) prefix = "ALMB"
    if (selectedProduct.id.includes("mass")) prefix = "ASMG"
    const newCode = generateRandomSerial("ATN", prefix)
    setSerialCode(newCode)
  }

  const handleCopyLink = () => {
    const url = getVerificationUrl(serialCode)
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownloadPNG = () => {
    if (!qrDataUrl) return
    const a = document.createElement("a")
    a.href = qrDataUrl
    a.download = `QR_${serialCode}_AlphaTech.png`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const handleDownloadSVG = async () => {
    const url = getVerificationUrl(serialCode)
    const svgStr = await generateQRCodeSvg(url, { width: 600, margin: 2 })
    const blob = new Blob([svgStr], { type: "image/svg+xml" })
    const a = document.createElement("a")
    a.href = URL.createObjectURL(blob)
    a.download = `QR_${serialCode}_AlphaTech.svg`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const handlePrint = () => {
    window.print()
  }

  const handleGenerateBulk = async () => {
    setIsBulkGenerating(true)
    let prefix = "PW"
    if (selectedProduct.id.includes("lean")) prefix = "ALMB"
    if (selectedProduct.id.includes("mass")) prefix = "ASMG"

    const items: { code: string; qrUrl: string }[] = []
    for (let i = 0; i < bulkCount; i++) {
      const code = generateRandomSerial("ATN", prefix)
      registerNewRecord({
        code,
        productId: selectedProduct.id,
        batchNumber,
        mfgDate,
        expDate,
      })
      const verifyUrl = getVerificationUrl(code)
      const dataUrl = await generateQRCodeDataUrl(verifyUrl, { width: 300, margin: 1 })
      items.push({ code, qrUrl: dataUrl })
    }

    setBulkList(items)
    setRecentGeneratedList(getAllVerificationRecords().slice(0, 8))
    setIsBulkGenerating(false)
  }

  return (
    <div className="min-h-screen bg-[#0d0e12] text-white selection:bg-[#AFFF00] selection:text-[#121212]">
      {/* Print-specific stylesheet */}
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

      {/* Header */}
      <header className="border-b border-white/10 bg-[#121212]/80 backdrop-blur-xl sticky top-0 z-40 print:hidden">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <ArrowLeft className="w-5 h-5 text-white/60 group-hover:text-[#AFFF00] group-hover:-translate-x-1 transition-all" />
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight">
                ALPHA <span className="text-[#AFFF00]">TECH</span>
              </span>
              <span className="text-[9px] font-mono tracking-[0.2em] text-[#AFFF00] uppercase font-bold">
                Production & QR Suite
              </span>
            </div>
          </Link>

          <Link
            href={`/verify?code=${encodeURIComponent(serialCode)}`}
            target="_blank"
            className="text-xs font-mono font-bold px-4 py-2 rounded-full bg-[#AFFF00] text-[#121212] hover:bg-[#9de600] transition-colors flex items-center gap-1.5 shadow-lg shadow-[#AFFF00]/20"
          >
            <span>Test Customer Scan</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 print:hidden">
        {/* Title */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#AFFF00]/10 border border-[#AFFF00]/30 text-[#AFFF00] text-xs font-mono font-semibold uppercase tracking-wider mb-2">
            <QrCode className="w-4 h-4" />
            Packaging Anti-Counterfeit Label Generator
          </div>
          <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tight">
            Security QR Code & <span className="text-[#AFFF00]">Packaging Sticker Generator</span>
          </h1>
          <p className="text-white/60 text-sm mt-1">
            Generate cryptographically registered QR labels for production containers. Each code automatically connects to the official Alpha Tech authenticity verification portal.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT COLUMN: Controls */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Product Selector */}
            <div className="bg-[#16181f] border border-white/10 rounded-2xl p-6">
              <label className="block text-xs font-mono text-white/50 uppercase tracking-wider mb-3">
                Step 1: Select Product Formulation
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {PRODUCTS_CATALOG.map((p) => {
                  const isSelected = selectedProduct.id === p.id
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedProduct(p)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col items-center text-center ${
                        isSelected
                          ? "bg-[#AFFF00]/15 border-[#AFFF00] shadow-[0_0_15px_rgba(175,255,0,0.15)]"
                          : "bg-white/5 border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="relative w-16 h-16 mb-2">
                        <Image src={p.image} alt={p.name} fill className="object-contain" />
                      </div>
                      <span className="font-bold text-xs text-white leading-tight line-clamp-1">{p.name}</span>
                      <span className="text-[10px] font-mono text-[#AFFF00] mt-1">{p.weight}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Step 2: Batch & Serial Number Config */}
            <div className="bg-[#16181f] border border-white/10 rounded-2xl p-6 space-y-4">
              <label className="block text-xs font-mono text-white/50 uppercase tracking-wider">
                Step 2: Batch & Security Credentials
              </label>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-white/80 font-medium">Security Serial Code</span>
                  <button
                    type="button"
                    onClick={handleGenerateNewRandomCode}
                    className="text-xs font-mono text-[#AFFF00] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Regenerate Random Code
                  </button>
                </div>
                <input
                  type="text"
                  value={serialCode}
                  onChange={(e) => setSerialCode(e.target.value.toUpperCase())}
                  className="w-full bg-[#0d0e12] border border-white/20 rounded-xl px-4 py-3 font-mono text-base text-white focus:outline-none focus:border-[#AFFF00]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div>
                  <span className="block text-xs text-white/60 mb-1">Batch Number</span>
                  <input
                    type="text"
                    value={batchNumber}
                    onChange={(e) => setBatchNumber(e.target.value.toUpperCase())}
                    className="w-full bg-[#0d0e12] border border-white/20 rounded-lg px-3 py-2 text-xs font-mono text-white"
                  />
                </div>
                <div>
                  <span className="block text-xs text-white/60 mb-1">Mfg Date (MM/YYYY)</span>
                  <input
                    type="text"
                    value={mfgDate}
                    onChange={(e) => setMfgDate(e.target.value)}
                    className="w-full bg-[#0d0e12] border border-white/20 rounded-lg px-3 py-2 text-xs font-mono text-white"
                  />
                </div>
                <div>
                  <span className="block text-xs text-white/60 mb-1">Exp Date (MM/YYYY)</span>
                  <input
                    type="text"
                    value={expDate}
                    onChange={(e) => setExpDate(e.target.value)}
                    className="w-full bg-[#0d0e12] border border-white/20 rounded-lg px-3 py-2 text-xs font-mono text-white"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Batch Bulk Generation */}
            <div className="bg-[#16181f] border border-white/10 rounded-2xl p-6">
              <label className="block text-xs font-mono text-white/50 uppercase tracking-wider mb-2">
                Step 3: Multi-Label Bulk Generation (For Print Sheets)
              </label>
              <p className="text-xs text-white/60 mb-4">
                Generate a batch of unique stickers ready to print on A4 adhesive sticker sheets.
              </p>

              <div className="flex items-center gap-3">
                <select
                  value={bulkCount}
                  onChange={(e) => setBulkCount(Number(e.target.value))}
                  className="bg-[#0d0e12] border border-white/20 text-white rounded-xl px-4 py-2.5 text-xs font-mono"
                >
                  <option value={3}>Generate 3 Unique Labels</option>
                  <option value={6}>Generate 6 Unique Labels</option>
                  <option value={9}>Generate 9 Unique Labels</option>
                  <option value={12}>Generate 12 Unique Labels</option>
                </select>

                <button
                  type="button"
                  onClick={handleGenerateBulk}
                  disabled={isBulkGenerating}
                  className="px-5 py-2.5 bg-white/10 hover:bg-[#AFFF00] hover:text-[#121212] font-bold text-xs rounded-xl font-mono transition-colors flex items-center gap-2 cursor-pointer"
                >
                  {isBulkGenerating ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Plus className="w-3.5 h-3.5" />
                  )}
                  <span>Generate Label Batch</span>
                </button>
              </div>

              {/* Bulk preview grid */}
              {bulkList.length > 0 && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-[#AFFF00]">
                      {bulkList.length} Labels Generated & Registered in System
                    </span>
                    <button
                      type="button"
                      onClick={handlePrint}
                      className="text-xs font-mono text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      Print All Labels
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1">
                    {bulkList.map((item) => (
                      <div
                        key={item.code}
                        className="bg-black/40 border border-white/10 rounded-lg p-2 text-center text-[10px] font-mono"
                      >
                        {item.qrUrl && (
                          <div className="w-16 h-16 mx-auto mb-1 bg-white p-1 rounded">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={item.qrUrl} alt={item.code} className="w-full h-full object-contain" />
                          </div>
                        )}
                        <span className="text-white/80 font-bold block truncate">{item.code}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Live Physical Sticker & QR Preview */}
          <div className="lg:col-span-5 space-y-6">
            <div className="sticky top-24">
              <span className="block text-xs font-mono text-white/50 uppercase tracking-wider mb-2">
                Live Packaging Sticker Mockup
              </span>

              {/* The Physical Sticker Card */}
              <div className="bg-[#12141a] border-2 border-[#AFFF00]/40 rounded-3xl p-6 shadow-2xl relative overflow-hidden text-center">
                <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#AFFF00] uppercase tracking-widest mb-2 bg-[#AFFF00]/10 px-3 py-1 rounded-full border border-[#AFFF00]/30">
                  <ShieldCheck className="w-3.5 h-3.5" /> Security Authenticity Seal
                </div>

                <div className="font-black text-lg tracking-tight uppercase">
                  ALPHA <span className="text-[#AFFF00]">TECH</span> NUTRITION
                </div>
                <div className="text-[10px] font-mono text-white/60 uppercase">
                  {selectedProduct.name} • Certified Product
                </div>

                {/* QR Code Container */}
                <div className="my-5 flex justify-center">
                  <div className="w-52 h-52 bg-white p-3.5 rounded-2xl shadow-xl flex items-center justify-center relative group">
                    {qrDataUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={qrDataUrl}
                        alt="Alpha Tech Verification QR"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="text-black font-mono text-xs">Generating QR...</div>
                    )}
                  </div>
                </div>

                {/* Sticker Serial & Instructions */}
                <div className="space-y-1.5">
                  <div className="text-[11px] font-mono font-bold text-[#AFFF00] bg-black/50 py-1.5 px-3 rounded-lg border border-white/10 tracking-wider">
                    SERIAL: {serialCode}
                  </div>
                  <div className="text-[10px] font-mono text-white/50">
                    BATCH: {batchNumber} • EXP: {expDate}
                  </div>
                  <div className="text-[9px] font-mono text-white/40 pt-1">
                    SCAN WITH CAMERA TO VERIFY 100% GENUINE FORMULA
                  </div>
                </div>
              </div>

              {/* Export Buttons */}
              <div className="grid grid-cols-2 gap-2.5 mt-4">
                <button
                  type="button"
                  onClick={handleDownloadPNG}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download PNG
                </button>
                <button
                  type="button"
                  onClick={handleDownloadSVG}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download SVG
                </button>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#AFFF00]" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Link Copied!" : "Copy URL"}
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-4 py-2.5 rounded-xl bg-[#AFFF00] hover:bg-[#9de600] text-[#121212] font-mono text-xs font-black transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#AFFF00]/20"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print Sticker
                </button>
              </div>

              {/* Direct Test Scan CTA */}
              <div className="mt-4 p-4 rounded-2xl bg-[#AFFF00]/10 border border-[#AFFF00]/30 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white block">Test Customer Journey</span>
                  <span className="text-[11px] text-white/60">Verify this code immediately</span>
                </div>
                <Link
                  href={`/verify?code=${encodeURIComponent(serialCode)}`}
                  target="_blank"
                  className="px-3.5 py-1.5 rounded-lg bg-[#AFFF00] text-[#121212] text-xs font-black font-mono flex items-center gap-1 hover:bg-[#9de600] transition-colors"
                >
                  <span>Test Scan</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* PRINT-ONLY SECTION: Clean White Label Sheet for Adhesive Stickers */}
      <div id="print-section" className="hidden print:block p-8 bg-white text-black">
        <h2 className="text-xl font-bold mb-4 pb-2 border-b">
          Alpha Tech Nutrition - Official Authenticity QR Labels
        </h2>
        <p className="text-xs text-gray-500 mb-6">
          Product: {selectedProduct.name} ({selectedProduct.sku}) • Batch: {batchNumber} • Mfg: {mfgDate} • Exp: {expDate}
        </p>

        <div className="grid grid-cols-2 gap-6">
          {(bulkList.length > 0 ? bulkList : [{ code: serialCode, qrUrl: qrDataUrl }]).map((item) => (
            <div
              key={item.code}
              className="border-2 border-dashed border-black p-4 rounded-xl flex items-center gap-4 page-break-inside-avoid"
            >
              {item.qrUrl && (
                <div className="w-28 h-28 shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.qrUrl} alt={item.code} className="w-full h-full object-contain" />
                </div>
              )}
              <div className="space-y-1">
                <span className="text-xs font-black tracking-tight block">ALPHA TECH NUTRITION</span>
                <span className="text-[11px] font-bold text-gray-700 block">{selectedProduct.name}</span>
                <span className="text-[10px] font-mono font-bold block">SERIAL: {item.code}</span>
                <span className="text-[9px] font-mono text-gray-500 block">BATCH: {batchNumber}</span>
                <span className="text-[8px] font-mono text-gray-600 block">SCAN OR VISIT: alphatechnutrition.com/verify</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
