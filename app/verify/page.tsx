"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ShieldCheck,
  ShieldAlert,
  QrCode,
  Search,
  CheckCircle2,
  Calendar,
  Layers,
  Award,
  ExternalLink,
  RefreshCw,
  Sparkles,
  ArrowLeft,
  ChevronRight,
  Printer,
  Share2,
  Copy,
  Check,
  BadgeCheck,
  PackageCheck,
  FlaskConical,
  Zap,
} from "lucide-react"
import { verifyCode, type VerificationResult } from "@/lib/verification"
import { AestheticQRView } from "@/components/aesthetic-qr-view"
import { getVerificationUrl } from "@/lib/qr-service"
import { BrandLogo } from "@/components/brand-logo"

function VerificationContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const queryCode = searchParams.get("code")

  const [inputCode, setInputCode] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [result, setResult] = useState<VerificationResult | null>(null)
  const [searchedCode, setSearchedCode] = useState("")
  const [isCopied, setIsCopied] = useState(false)

  const handleCopySerial = (codeToCopy: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(codeToCopy)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    }
  }

  // Auto-verify if code is in the URL query string
  useEffect(() => {
    if (queryCode) {
      const formatted = queryCode.trim().toUpperCase()
      setInputCode(formatted)
      handlePerformVerification(formatted)
    }
  }, [queryCode])

  const handlePerformVerification = (codeToVerify: string) => {
    if (!codeToVerify.trim()) return

    setIsVerifying(true)
    setResult(null)
    setSearchedCode(codeToVerify.trim().toUpperCase())

    // Cinematic scanning delay for security check feel
    setTimeout(() => {
      const res = verifyCode(codeToVerify)
      setResult(res)
      setIsVerifying(false)
    }, 900)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputCode.trim()) {
      handlePerformVerification(inputCode)
    }
  }

  const handleReset = () => {
    setInputCode("")
    setResult(null)
    setSearchedCode("")
    router.push("/verify")
  }

  return (
    <div className="min-h-screen bg-[#080B1C] text-white selection:bg-blue-600 selection:text-white relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/15 blur-[150px] pointer-events-none -z-10 rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[180px] pointer-events-none -z-10 rounded-full" />

      {/* Top Header */}
      <header className="border-b border-blue-950/60 bg-[#0B0E23]/90 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <Link
              href="/"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-blue-400 transition-colors flex items-center justify-center shrink-0"
              title="Return to Home"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <BrandLogo size="md" scrolled={true} />
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="text-[11px] sm:text-xs font-mono font-bold px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="hidden xs:inline sm:inline">Official Registry</span>
              <span className="xs:hidden sm:hidden">Registry</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Portal Hero */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-wider mb-3 sm:mb-4">
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Official Security & Verification Protocol
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase">
            Verify Product <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Authenticity</span>
          </h1>
          <p className="mt-2 sm:mt-3 text-white/60 text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Scan your Alpha Tech bottle QR code or enter the unique security serial code below to confirm your supplement
            is 100% genuine and certified.
          </p>
        </div>

        {/* Verification Input Box */}
        <div className="bg-[#0E132D]/90 border border-blue-950/60 rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl backdrop-blur-xl relative mb-8 sm:mb-12">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="serialCode" className="block text-[11px] sm:text-xs font-mono text-white/60 uppercase tracking-wider mb-2">
                Enter Product UUID (from QR sticker or packaging)
              </label>
              <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <div className="relative flex-1">
                  <input
                    id="serialCode"
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value.trim())}
                    placeholder="Enter product UUID (e.g. e4f9b8c2-3a5d-...)"
                    className="w-full bg-[#080B1C] border-2 border-white/20 focus:border-blue-500 text-white font-mono text-base sm:text-lg md:text-xl px-4 sm:px-5 py-3.5 sm:py-4 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all placeholder:text-white/20 tracking-wider"
                  />
                  {inputCode && (
                    <button
                      type="button"
                      onClick={() => setInputCode("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white p-1 text-[11px] font-mono"
                    >
                      CLEAR
                    </button>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isVerifying || !inputCode.trim()}
                  className="w-full sm:w-auto px-6 py-3.5 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-40 disabled:hover:from-blue-600 disabled:hover:to-indigo-600 text-white font-black rounded-xl text-sm tracking-wide flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 cursor-pointer disabled:cursor-not-allowed shrink-0"
                >
                  {isVerifying ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Checking...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      <span>Verify Now</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Verification Loading Animation */}
        <AnimatePresence>
          {isVerifying && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0E132D]/80 border border-blue-500/30 rounded-2xl p-12 text-center my-8 relative overflow-hidden"
            >
              <div className="w-24 h-24 mx-auto mb-6 relative flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-blue-500/20 animate-ping" />
                <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
                <ShieldCheck className="w-10 h-10 text-blue-400" />
              </div>
              <h3 className="text-xl font-black text-white tracking-wide uppercase">
                Validating Cryptographic Seal
              </h3>
              <p className="text-white/50 text-sm mt-2 font-mono">
                Querying Alpha Tech Manufacturer Database & Checking Scan Logs...
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Verification Result Display */}
        <AnimatePresence>
          {!isVerifying && result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* CASE 1: 100% GENUINE AUTHENTIC PRODUCT */}
              {(result.status === "genuine" || result.isValid) && result.product && (
                <div className="bg-gradient-to-b from-[#0F1738] via-[#0D122E] to-[#080B1C] border-2 border-emerald-500/50 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow-[0_0_60px_rgba(16,185,129,0.18)] relative overflow-hidden">
                  {/* Glowing background ambiance */}
                  <div className="absolute top-0 right-0 transform translate-x-12 -translate-y-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                  {/* Top Authenticity Banner */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 sm:pb-8 border-b border-white/10 relative z-10">
                    <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 min-w-0">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-500/15 border-2 border-emerald-400/80 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20">
                        <BadgeCheck className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-400" />
                      </div>
                      <div className="min-w-0">
                        <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
                          <Sparkles className="w-3.5 h-3.5" /> 100% Certified Authentic
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight uppercase">
                          Genuine Product Verified
                        </h2>
                        <p className="text-white/60 text-xs sm:text-sm font-mono mt-0.5">
                          Official Security Seal • Alpha Tech Quality Clearance
                        </p>
                      </div>
                    </div>

                    <div className="self-start sm:self-auto shrink-0">
                      <span className="px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 font-black text-xs uppercase tracking-wider shadow-md flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        Verified Authentic
                      </span>
                    </div>
                  </div>

                  {/* Main Product Showcase Card */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-8 items-center relative z-10">
                    {/* Left Column: Product Image Pedestal */}
                    <div className="md:col-span-5 flex flex-col items-center justify-center">
                      <div className="relative w-full aspect-square max-w-[280px] sm:max-w-[320px] rounded-3xl bg-gradient-to-b from-white/5 to-white/0 border border-white/10 p-6 flex items-center justify-center shadow-2xl group">
                        <div className="absolute inset-0 bg-blue-500/10 rounded-3xl blur-2xl group-hover:bg-emerald-500/15 transition-all pointer-events-none" />
                        <Image
                          src={result.product.image}
                          alt={result.product.name}
                          fill
                          priority
                          className="object-contain p-4 drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="mt-4 text-center">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-mono font-bold">
                          <PackageCheck className="w-3.5 h-3.5" /> SKU: {result.product.sku}
                        </span>
                      </div>
                    </div>

                    {/* Right Column: Specifications & Verified Credentials */}
                    <div className="md:col-span-7 space-y-5">
                      <div>
                        <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
                          <Zap className="w-3.5 h-3.5" /> {result.product.category} Performance Formulation
                        </div>
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight pt-1">
                          {result.product.name}
                        </h3>
                        <p className="text-white/70 text-xs sm:text-sm font-mono mt-1 leading-relaxed">
                          {result.product.tagline}
                        </p>
                      </div>

                      {/* Verified Serial UUID Box */}
                      <div className="bg-black/50 border border-white/15 rounded-2xl p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono text-white/50 uppercase tracking-wider">
                            Verified Security UUID
                          </span>
                          <span className="text-[11px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> MATCH FOUND
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-3 bg-[#050714] border border-blue-500/30 px-3.5 py-2.5 rounded-xl font-mono text-xs sm:text-sm text-blue-300 font-bold">
                          <span className="truncate">{result.record?.code || searchedCode}</span>
                          <button
                            type="button"
                            onClick={() => handleCopySerial(result.record?.code || searchedCode)}
                            className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-mono transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
                            title="Copy Security UUID"
                          >
                            {isCopied ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-emerald-400">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Key Product Metrics */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                          <span className="text-[10px] font-mono text-white/40 uppercase block">Net Volume</span>
                          <span className="text-xs sm:text-sm font-bold text-white font-mono">{result.product.weight}</span>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                          <span className="text-[10px] font-mono text-white/40 uppercase block">Total Servings</span>
                          <span className="text-xs sm:text-sm font-bold text-white font-mono">{result.product.servings}</span>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                          <span className="text-[10px] font-mono text-white/40 uppercase block">Active Protein</span>
                          <span className="text-xs sm:text-sm font-bold text-emerald-400 font-mono">{result.product.proteinPerServing} / Serving</span>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                          <span className="text-[10px] font-mono text-white/40 uppercase block">BCAAs</span>
                          <span className="text-xs sm:text-sm font-bold text-blue-400 font-mono">{result.product.bcaaPerServing}</span>
                        </div>
                      </div>

                      {/* Certification Badges */}
                      <div className="flex flex-wrap gap-2 pt-1">
                        {result.product.certifications.map((cert) => (
                          <span
                            key={cert}
                            className="px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-mono font-bold flex items-center gap-1.5"
                          >
                            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Laboratory Quality & Safety Clearance Section */}
                  <div className="border-t border-white/10 pt-6 mt-4 space-y-4 relative z-10">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2 text-sm font-bold text-white font-mono uppercase tracking-wider">
                        <FlaskConical className="w-4 h-4 text-emerald-400" />
                        <span>Certified Quality & 3rd-Party Lab Assay Clearance</span>
                      </div>
                      <span className="text-xs font-mono text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> All Parameters Passed
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="bg-black/40 border border-white/10 rounded-2xl p-4 flex items-start gap-3">
                        <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-400/40 flex items-center justify-center shrink-0 text-emerald-400 mt-0.5">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="font-mono text-xs font-bold text-white block">Protein Purity Assay</span>
                          <span className="text-white/60 text-xs font-mono">{result.product.labReport.proteinPurity}</span>
                        </div>
                      </div>

                      <div className="bg-black/40 border border-white/10 rounded-2xl p-4 flex items-start gap-3">
                        <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-400/40 flex items-center justify-center shrink-0 text-emerald-400 mt-0.5">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="font-mono text-xs font-bold text-white block">Heavy Metals & Toxins Analysis</span>
                          <span className="text-white/60 text-xs font-mono">{result.product.labReport.heavyMetals}</span>
                        </div>
                      </div>

                      <div className="bg-black/40 border border-white/10 rounded-2xl p-4 flex items-start gap-3">
                        <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-400/40 flex items-center justify-center shrink-0 text-emerald-400 mt-0.5">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="font-mono text-xs font-bold text-white block">WADA Compliance & Dope Test</span>
                          <span className="text-white/60 text-xs font-mono">{result.product.labReport.dopingSubstances}</span>
                        </div>
                      </div>

                      <div className="bg-black/40 border border-white/10 rounded-2xl p-4 flex items-start gap-3">
                        <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-400/40 flex items-center justify-center shrink-0 text-emerald-400 mt-0.5">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="font-mono text-xs font-bold text-white block">Microbiological Testing</span>
                          <span className="text-white/60 text-xs font-mono">{result.product.labReport.microbiologicalQuality}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
                    <div className="text-xs text-white/50 font-mono flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Official Authenticity Passport • Alpha Tech Quality Control</span>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <Link href={`/products/${result.product.id}`} className="flex-1 sm:flex-none">
                        <button
                          type="button"
                          className="w-full px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold font-mono uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span>Product Details</span>
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </Link>

                      <button
                        type="button"
                        onClick={handleReset}
                        className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold font-mono transition-colors flex items-center justify-center gap-2 cursor-pointer shrink-0"
                      >
                        <RefreshCw className="w-4 h-4" />
                        <span>Verify Another</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* CASE 2: INVALID / COUNTERFEIT WARNING */}
              {result.status === "invalid" && (
                <div className="bg-gradient-to-b from-[#2b1111] to-[#180d0d] border-2 border-red-500 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow-[0_0_50px_rgba(239,68,68,0.2)] relative overflow-hidden">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 pb-6 border-b border-red-500/20">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-red-500/20 border border-red-500 flex items-center justify-center shrink-0">
                      <ShieldAlert className="w-8 h-8 sm:w-9 sm:h-9 text-red-400" />
                    </div>
                    <div className="min-w-0">
                      <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-red-400 uppercase tracking-widest">
                        <ShieldAlert className="w-3.5 h-3.5" /> Verification Failed
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
                        Unregistered / Invalid Serial Code
                      </h2>
                      <p className="text-white/60 text-xs sm:text-sm font-mono mt-0.5 break-all">
                        Searched Serial: <span className="text-red-300 font-bold">{searchedCode}</span>
                      </p>
                    </div>
                  </div>

                  <div className="my-6 p-5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-200 text-xs sm:text-sm space-y-3">
                    <p className="font-bold text-red-400 font-mono text-sm uppercase flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-red-400" /> Warning: Potential Counterfeit Supplement
                    </p>
                    <p className="text-xs text-red-200/90 leading-relaxed font-mono">
                      The serial code you provided does not match any official record in the Alpha Tech Nutrition manufacturer database.
                      Counterfeit dietary supplements can pose severe health risks.
                    </p>
                    <ul className="text-xs text-red-200/80 font-mono space-y-1.5 pt-1">
                      <li className="flex items-center gap-2">
                        <ShieldAlert className="w-3.5 h-3.5 text-red-400 shrink-0" />
                        Do not consume this product.
                      </li>
                      <li className="flex items-center gap-2">
                        <ShieldAlert className="w-3.5 h-3.5 text-red-400 shrink-0" />
                        Contact the retailer where this container was purchased immediately.
                      </li>
                      <li className="flex items-center gap-2">
                        <ShieldAlert className="w-3.5 h-3.5 text-red-400 shrink-0" />
                        Report this batch and vendor to Alpha Tech Brand Protection.
                      </li>
                    </ul>
                  </div>

                  <div className="mt-8 pt-6 border-t border-red-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold transition-colors cursor-pointer text-center"
                    >
                      Try Another Code
                    </button>
                    <a
                      href="mailto:support@alphatech-nutrition.in?subject=Counterfeit%20Report"
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-mono font-bold transition-colors text-center"
                    >
                      Report Counterfeit Vendor
                    </a>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* How It Works Explainer Card */}
        <div className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-white/10">
          <h3 className="text-center text-xs sm:text-sm font-mono uppercase tracking-widest text-blue-400 mb-6 sm:mb-8 font-bold">
            Alpha Tech Anti-Counterfeit Verification Protocol
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-[#0B0E23]/80 border border-blue-900/40 rounded-2xl p-5 sm:p-6 relative">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center font-black text-xs sm:text-sm mb-3 sm:mb-4">
                01
              </div>
              <h4 className="text-sm sm:text-base font-bold text-white mb-1.5 sm:mb-2">Locate the QR Sticker</h4>
              <p className="text-xs text-white/60 leading-relaxed">
                Find the tamper-evident security seal located on the lid or neck of your Alpha Tech supplement container.
              </p>
            </div>

            <div className="bg-[#0B0E23]/80 border border-blue-900/40 rounded-2xl p-5 sm:p-6 relative">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center font-black text-xs sm:text-sm mb-3 sm:mb-4">
                02
              </div>
              <h4 className="text-sm sm:text-base font-bold text-white mb-1.5 sm:mb-2">Scan or Enter Code</h4>
              <p className="text-xs text-white/60 leading-relaxed">
                Scan using any smartphone camera or enter the alphanumeric serial code manually into this portal.
              </p>
            </div>

            <div className="bg-[#0B0E23]/80 border border-blue-900/40 rounded-2xl p-5 sm:p-6 relative sm:col-span-2 md:col-span-1">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center font-black text-xs sm:text-sm mb-3 sm:mb-4">
                03
              </div>
              <h4 className="text-sm sm:text-base font-bold text-white mb-1.5 sm:mb-2">Instant Lab Verification</h4>
              <p className="text-xs text-white/60 leading-relaxed">
                Review batch authenticity, manufacturing date, and verified third-party laboratory purity analysis.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function VerificationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#080B1C] flex items-center justify-center text-blue-400 font-mono text-sm">
          Loading Security Protocol...
        </div>
      }
    >
      <VerificationContent />
    </Suspense>
  )
}
