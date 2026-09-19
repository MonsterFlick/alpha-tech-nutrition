"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
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
} from "lucide-react"
import { verifyCode, type VerificationResult, DEFAULT_VERIFICATION_RECORDS } from "@/lib/verification"
import { AestheticQRView } from "@/components/aesthetic-qr-view"
import { getVerificationUrl } from "@/lib/qr-service"

function VerificationContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const queryCode = searchParams.get("code")

  const [inputCode, setInputCode] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [result, setResult] = useState<VerificationResult | null>(null)
  const [searchedCode, setSearchedCode] = useState("")

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
    <div className="min-h-screen bg-[#0d0e12] text-white selection:bg-[#AFFF00] selection:text-[#121212] relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#AFFF00]/10 blur-[150px] pointer-events-none -z-10 rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#84cc16]/5 blur-[180px] pointer-events-none -z-10 rounded-full" />

      {/* Top Header */}
      <header className="border-b border-white/10 bg-[#121212]/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <ArrowLeft className="w-5 h-5 text-white/60 group-hover:text-[#AFFF00] group-hover:-translate-x-1 transition-all" />
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight">
                ALPHA <span className="text-[#AFFF00]">TECH</span>
              </span>
              <span className="text-[9px] font-mono tracking-[0.2em] text-[#AFFF00] uppercase font-bold">
                Authenticity Portal
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/qr-generator"
              className="text-xs font-mono font-medium px-3.5 py-1.5 rounded-full border border-[#AFFF00]/30 text-[#AFFF00] hover:bg-[#AFFF00]/10 transition-colors flex items-center gap-1.5"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>QR Generator Suite</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Portal Hero */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#AFFF00]/10 border border-[#AFFF00]/30 text-[#AFFF00] text-xs font-mono font-semibold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-4 h-4" />
            Official Security & Verification Protocol
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase">
            Verify Product <span className="text-[#AFFF00]">Authenticity</span>
          </h1>
          <p className="mt-3 text-white/60 text-sm md:text-base max-w-xl mx-auto">
            Scan your Alpha Tech bottle QR code or enter the unique security serial code below to confirm your supplement
            is 100% genuine and certified.
          </p>
        </div>

        {/* Verification Input Box */}
        <div className="bg-[#16181f]/90 border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-xl relative mb-12">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <label htmlFor="serialCode" className="block text-xs font-mono text-white/60 uppercase tracking-wider mb-2">
                Enter Security Serial Code (from QR Sticker / Hologram)
              </label>
              <div className="relative flex items-center">
                <input
                  id="serialCode"
                  type="text"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                  placeholder="e.g. ATN-PW-2026-9842"
                  className="w-full bg-[#0d0e12] border-2 border-white/20 focus:border-[#AFFF00] text-white font-mono text-lg md:text-xl px-5 py-4 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#AFFF00]/20 transition-all uppercase placeholder:text-white/20 tracking-wider"
                />
                <button
                  type="submit"
                  disabled={isVerifying || !inputCode.trim()}
                  className="absolute right-2 px-6 py-3 bg-[#AFFF00] hover:bg-[#9de600] disabled:opacity-40 disabled:hover:bg-[#AFFF00] text-[#121212] font-black rounded-lg text-sm tracking-wide flex items-center gap-2 transition-all shadow-lg hover:shadow-[#AFFF00]/25 cursor-pointer disabled:cursor-not-allowed"
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

            {/* Quick Demo Test Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-white/40 font-mono">Test Sample Codes:</span>
              {DEFAULT_VERIFICATION_RECORDS.map((rec) => (
                <button
                  key={rec.code}
                  type="button"
                  onClick={() => {
                    setInputCode(rec.code)
                    handlePerformVerification(rec.code)
                  }}
                  className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 font-mono hover:text-[#AFFF00] transition-colors"
                >
                  {rec.code}
                </button>
              ))}
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
              className="bg-[#16181f]/80 border border-[#AFFF00]/30 rounded-2xl p-12 text-center my-8 relative overflow-hidden"
            >
              <div className="w-24 h-24 mx-auto mb-6 relative flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-[#AFFF00]/20 animate-ping" />
                <div className="absolute inset-0 rounded-full border-4 border-[#AFFF00] border-t-transparent animate-spin" />
                <ShieldCheck className="w-10 h-10 text-[#AFFF00]" />
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
              {/* CASE 1: GENUINE FIRST SCAN */}
              {result.status === "genuine_first_scan" && result.product && (
                <div className="bg-gradient-to-b from-[#192613] to-[#121612] border-2 border-[#AFFF00] rounded-3xl p-6 md:p-10 shadow-[0_0_50px_rgba(175,255,0,0.2)] relative overflow-hidden">
                  <div className="absolute top-0 right-0 transform translate-x-10 -translate-y-10 w-48 h-48 bg-[#AFFF00]/10 rounded-full blur-3xl pointer-events-none" />

                  {/* Genuine Banner */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-white/10">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-[#AFFF00]/20 border border-[#AFFF00] flex items-center justify-center shrink-0 shadow-lg shadow-[#AFFF00]/20">
                        <CheckCircle2 className="w-9 h-9 text-[#AFFF00]" />
                      </div>
                      <div>
                        <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#AFFF00] uppercase tracking-widest">
                          <Sparkles className="w-3.5 h-3.5" /> 100% Certified Authentic
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                          Genuine Alpha Tech Product
                        </h2>
                        <p className="text-white/60 text-xs md:text-sm font-mono mt-0.5">
                          First Authentication Check Confirmed • Serial: {searchedCode}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-3.5 py-1.5 rounded-full bg-[#AFFF00] text-[#121212] font-black text-xs uppercase tracking-wider">
                        Scan #1 (Original)
                      </span>
                    </div>
                  </div>

                  {/* Product Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 items-center">
                    {/* Product Image */}
                    <div className="md:col-span-1 flex justify-center">
                      <div className="relative w-48 h-48 md:w-56 md:h-56">
                        <Image
                          src={result.product.image}
                          alt={result.product.name}
                          fill
                          className="object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]"
                        />
                      </div>
                    </div>

                    {/* Product Specs */}
                    <div className="md:col-span-2 space-y-4">
                      <div>
                        <span className="text-xs font-mono text-[#AFFF00] uppercase font-bold">
                          {result.product.category} Formulation
                        </span>
                        <h3 className="text-2xl md:text-3xl font-black text-white">
                          {result.product.name}
                        </h3>
                        <p className="text-white/70 text-sm mt-1">{result.product.tagline}</p>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                          <span className="text-[10px] font-mono text-white/40 uppercase block">Batch Number</span>
                          <span className="text-sm font-bold text-white font-mono">{result.record?.batchNumber}</span>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                          <span className="text-[10px] font-mono text-white/40 uppercase block">Mfg / Exp Date</span>
                          <span className="text-sm font-bold text-white font-mono">
                            {result.record?.mfgDate} - {result.record?.expDate}
                          </span>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                          <span className="text-[10px] font-mono text-white/40 uppercase block">Net Quantity</span>
                          <span className="text-sm font-bold text-white font-mono">{result.product.weight}</span>
                        </div>
                      </div>

                      {/* Nutrition Specs */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        <span className="px-3 py-1 rounded-lg bg-[#AFFF00]/10 border border-[#AFFF00]/30 text-[#AFFF00] text-xs font-bold font-mono">
                          {result.product.proteinPerServing} Protein / Serving
                        </span>
                        <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white/80 text-xs font-bold font-mono">
                          {result.product.bcaaPerServing} BCAAs
                        </span>
                        <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white/80 text-xs font-bold font-mono">
                          Flavor: {result.product.flavor}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Certified Lab Report Section */}
                  <div className="border-t border-white/10 pt-6 space-y-4">
                    <div className="flex items-center gap-2 text-sm font-bold text-white">
                      <Award className="w-4 h-4 text-[#AFFF00]" />
                      <span>Certified Quality & Lab Clearance Report</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="bg-black/30 border border-white/5 rounded-xl p-3 flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#AFFF00] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-white block">Protein Purity Assay</span>
                          <span className="text-white/60">{result.product.labReport.proteinPurity}</span>
                        </div>
                      </div>
                      <div className="bg-black/30 border border-white/5 rounded-xl p-3 flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#AFFF00] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-white block">Heavy Metals Analysis</span>
                          <span className="text-white/60">{result.product.labReport.heavyMetals}</span>
                        </div>
                      </div>
                      <div className="bg-black/30 border border-white/5 rounded-xl p-3 flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#AFFF00] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-white block">WADA Compliance & Dope Test</span>
                          <span className="text-white/60">{result.product.labReport.dopingSubstances}</span>
                        </div>
                      </div>
                      <div className="bg-black/30 border border-white/5 rounded-xl p-3 flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#AFFF00] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-white block">Microbiological Testing</span>
                          <span className="text-white/60">{result.product.labReport.microbiologicalQuality}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Digital Authenticity Passport with Rounded QR */}
                  <div className="mt-6 p-4 rounded-2xl bg-black/40 border border-[#AFFF00]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="p-1.5 bg-white rounded-2xl shadow-lg shrink-0">
                        <AestheticQRView
                          value={getVerificationUrl(searchedCode)}
                          size={84}
                          dotStyle="dots"
                          eyeStyle="smooth"
                          theme="neon_lime"
                          includeCenterLogo={true}
                          centerLogoText="α"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono font-bold text-[#AFFF00] uppercase tracking-wider block">
                          Digital Authenticity Passport
                        </span>
                        <span className="text-sm font-bold text-white block">Verified QR Security Token</span>
                        <span className="text-xs font-mono text-white/50 block">
                          Cryptographic Hash: {searchedCode}
                        </span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[10px] font-mono text-white/40 block">MANUFACTURER STATUS</span>
                      <span className="text-xs font-mono font-bold text-[#AFFF00] flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#AFFF00]" /> 100% AUTHENTIC
                      </span>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                    <div className="text-xs text-white/50 font-mono">
                      Timestamp: {new Date(result.firstScannedAt || Date.now()).toLocaleString()}
                    </div>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold font-mono transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      Verify Another Code
                    </button>
                  </div>
                </div>
              )}

              {/* CASE 2: GENUINE BUT RE-SCANNED WARNING */}
              {result.status === "genuine_repeated_scan" && result.product && (
                <div className="bg-gradient-to-b from-[#2a1c0d] to-[#1a140f] border-2 border-amber-500 rounded-3xl p-6 md:p-10 shadow-[0_0_50px_rgba(245,158,11,0.2)] relative overflow-hidden">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-amber-500/20">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500 flex items-center justify-center shrink-0">
                        <AlertTriangle className="w-9 h-9 text-amber-400" />
                      </div>
                      <div>
                        <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
                          ⚠️ Security Advisory
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                          Code Previously Scanned ({result.scanCount} Times)
                        </h2>
                        <p className="text-white/70 text-xs md:text-sm font-mono mt-0.5">
                          Authentic Alpha Tech code, but this product has been verified before.
                        </p>
                      </div>
                    </div>

                    <span className="px-3.5 py-1.5 rounded-full bg-amber-500 text-black font-black text-xs uppercase tracking-wider self-start md:self-auto">
                      Scan Count: {result.scanCount}
                    </span>
                  </div>

                  <div className="my-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-sm">
                    <p className="font-semibold mb-1">Notice for Buyers:</p>
                    <p className="text-xs text-amber-300/80 leading-relaxed">
                      This security serial was first authenticated on{" "}
                      <strong>
                        {result.firstScannedAt ? new Date(result.firstScannedAt).toLocaleString() : "an earlier date"}
                      </strong>
                      . If you are opening this tub for the first time, check that the induction seal under the cap was intact.
                      If the seal was broken or missing, this product might have been tampered with or refilled.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                    <div className="relative w-36 h-36 mx-auto">
                      <Image
                        src={result.product.image}
                        alt={result.product.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <h3 className="text-xl font-bold text-white">{result.product.name}</h3>
                      <p className="text-white/60 text-xs">{result.product.tagline}</p>
                      <div className="text-xs font-mono text-white/50">
                        Batch: {result.record?.batchNumber} • Exp: {result.record?.expDate}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-amber-500/20 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold transition-colors cursor-pointer"
                    >
                      Verify Another Code
                    </button>
                    <a
                      href="mailto:support@alphatechnutrition.com?subject=Authenticity%20Scan%20Query"
                      className="text-xs font-mono text-amber-400 hover:underline"
                    >
                      Report Suspicious Product →
                    </a>
                  </div>
                </div>
              )}

              {/* CASE 3: INVALID / COUNTERFEIT WARNING */}
              {result.status === "invalid" && (
                <div className="bg-gradient-to-b from-[#2b1111] to-[#180d0d] border-2 border-red-500 rounded-3xl p-6 md:p-10 shadow-[0_0_50px_rgba(239,68,68,0.2)] relative overflow-hidden">
                  <div className="flex items-center gap-4 pb-6 border-b border-red-500/20">
                    <div className="w-16 h-16 rounded-2xl bg-red-500/20 border border-red-500 flex items-center justify-center shrink-0">
                      <ShieldAlert className="w-9 h-9 text-red-400" />
                    </div>
                    <div>
                      <div className="text-xs font-mono font-bold text-red-400 uppercase tracking-widest">
                        ❌ Verification Failed
                      </div>
                      <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                        Unregistered / Fake Serial Code
                      </h2>
                      <p className="text-white/60 text-xs md:text-sm font-mono mt-0.5">
                        Serial: <span className="text-red-300 font-bold">{searchedCode}</span>
                      </p>
                    </div>
                  </div>

                  <div className="my-6 p-5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-200 text-sm space-y-3">
                    <p className="font-bold text-red-400">WARNING: POTENTIAL COUNTERFEIT SUPPLEMENT</p>
                    <p className="text-xs text-red-200/80 leading-relaxed">
                      The serial code you provided does not exist in the official Alpha Tech Nutrition manufacturer database.
                      Counterfeit dietary supplements can pose severe health risks.
                    </p>
                    <ul className="text-xs text-red-200/70 list-disc list-inside space-y-1">
                      <li>Do not consume this product.</li>
                      <li>Contact the vendor or retailer where this was purchased immediately.</li>
                      <li>Report this batch and vendor to Alpha Tech Nutrition Brand Protection.</li>
                    </ul>
                  </div>

                  <div className="mt-8 pt-6 border-t border-red-500/20 flex flex-wrap items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold transition-colors cursor-pointer"
                    >
                      Try Another Code
                    </button>
                    <a
                      href="mailto:support@alphatechnutrition.com?subject=Counterfeit%20Report"
                      className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-mono font-bold transition-colors"
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
        <div className="mt-16 pt-12 border-t border-white/10">
          <h3 className="text-center text-sm font-mono uppercase tracking-widest text-[#AFFF00] mb-8 font-bold">
            Alpha Tech Anti-Counterfeit Verification Protocol
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#16181f]/60 border border-white/5 rounded-2xl p-6 relative">
              <div className="w-10 h-10 rounded-xl bg-[#AFFF00]/10 text-[#AFFF00] flex items-center justify-center font-black text-sm mb-4">
                01
              </div>
              <h4 className="text-base font-bold text-white mb-2">Locate the QR Sticker</h4>
              <p className="text-xs text-white/60 leading-relaxed">
                Find the tamper-evident security seal located on the lid or neck of your Alpha Tech supplement container.
              </p>
            </div>

            <div className="bg-[#16181f]/60 border border-white/5 rounded-2xl p-6 relative">
              <div className="w-10 h-10 rounded-xl bg-[#AFFF00]/10 text-[#AFFF00] flex items-center justify-center font-black text-sm mb-4">
                02
              </div>
              <h4 className="text-base font-bold text-white mb-2">Scan or Enter Code</h4>
              <p className="text-xs text-white/60 leading-relaxed">
                Scan using any smartphone camera or enter the alphanumeric serial code manually into this portal.
              </p>
            </div>

            <div className="bg-[#16181f]/60 border border-white/5 rounded-2xl p-6 relative">
              <div className="w-10 h-10 rounded-xl bg-[#AFFF00]/10 text-[#AFFF00] flex items-center justify-center font-black text-sm mb-4">
                03
              </div>
              <h4 className="text-base font-bold text-white mb-2">Instant Lab Verification</h4>
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
        <div className="min-h-screen bg-[#0d0e12] flex items-center justify-center text-[#AFFF00] font-mono text-sm">
          Loading Security Protocol...
        </div>
      }
    >
      <VerificationContent />
    </Suspense>
  )
}
