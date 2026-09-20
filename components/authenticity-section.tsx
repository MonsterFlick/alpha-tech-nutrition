"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { ShieldCheck, Search, QrCode, ArrowRight, Award, Lock, Sparkles, CheckCircle2 } from "lucide-react"
import { AestheticQRView } from "@/components/aesthetic-qr-view"
import { getVerificationUrl } from "@/lib/qr-service"

export function AuthenticitySection() {
  const router = useRouter()
  const [code, setCode] = useState("")

  const handleQuickVerify = (e: React.FormEvent) => {
    e.preventDefault()
    const clean = code.trim().toUpperCase()
    if (clean) {
      router.push(`/verify?code=${encodeURIComponent(clean)}`)
    } else {
      router.push("/verify")
    }
  }

  return (
    <section id="verify-section" className="relative py-16 sm:py-24 bg-[#080B1C] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-blue-600/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-80 sm:w-[500px] h-80 sm:h-[500px] bg-indigo-600/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            100% Anti-Counterfeit Protection
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
            Verify Your Product{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              Authenticity
            </span>
          </h2>

          <p className="mt-2 sm:mt-3 text-white/60 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Every Alpha Tech Nutrition tub features a tamper-evident holographic QR seal. Scan with any smartphone camera
            or enter your security code to confirm genuine lab-certified purity.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          {/* Left Column: Interactive QR Card Preview */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-5 flex justify-center w-full"
          >
            <div className="w-full max-w-sm bg-[#0E132D] border-2 border-blue-500/30 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-[0_0_40px_rgba(59,130,246,0.15)] relative overflow-hidden text-center">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest mb-2 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/30">
                <Sparkles className="w-3 h-3" /> Official Holographic Seal
              </div>

              <div className="font-black text-base sm:text-lg text-white tracking-tight uppercase">
                ALPHA <span className="text-blue-400">TECH</span> NUTRITION
              </div>
              <div className="text-[10px] font-mono text-white/60 uppercase">
                Instant Authenticity Verification
              </div>

              {/* Responsive Aesthetic QR */}
              <div className="my-4 sm:my-5 flex justify-center">
                <div className="p-2.5 sm:p-3 bg-white rounded-2xl sm:rounded-3xl shadow-xl relative max-w-full flex items-center justify-center">
                  <AestheticQRView
                    value={getVerificationUrl("e4f9b8c2-3a5d-4e17-b6c8-9d2f1a0e5b7c")}
                    size={200}
                    margin={4}
                    className="max-w-[200px] w-full"
                    dotStyle="dots"
                    eyeStyle="smooth"
                    theme="royal_navy"
                    includeCenterLogo={true}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-[10px] sm:text-[11px] font-mono font-bold text-blue-300 bg-black/60 py-1.5 px-3 rounded-xl border border-white/10 tracking-wider">
                  OFFICIAL CRYPTOGRAPHIC QR SEAL
                </div>
                <div className="text-[9px] font-mono text-white/40 pt-1">
                  POINT YOUR PHONE CAMERA TO TEST LIVE VERIFICATION
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Search Box & 3 Key Features */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-7 space-y-5 sm:space-y-6 w-full"
          >
            {/* Direct Code Verification Form */}
            <div className="bg-[#0E132D] border border-blue-950/80 rounded-2xl p-4 sm:p-6 shadow-xl">
              <label htmlFor="homeSerial" className="block text-xs font-mono text-white/70 uppercase tracking-wider mb-2 font-bold">
                Quick Product UUID Verification:
              </label>

              <form onSubmit={handleQuickVerify} className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <div className="relative flex-1">
                  <input
                    id="homeSerial"
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value.trim())}
                    placeholder="Enter Product UUID (e.g. e4f9b8c2-...)"
                    className="w-full bg-[#080B1C] border-2 border-white/15 focus:border-blue-500 text-white font-mono text-sm sm:text-base px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-white/25 tracking-wider"
                  />
                  {code && (
                    <button
                      type="button"
                      onClick={() => setCode("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white p-1 text-[11px] font-mono"
                    >
                      CLEAR
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 sm:px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black rounded-xl text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/30 shrink-0 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>Verify Now</span>
                </button>
              </form>
            </div>

            {/* 3 Verification Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-[#0E132D]/70 border border-white/10 rounded-xl p-3.5 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">Unique Hash</h4>
                  <p className="text-[11px] text-white/50 leading-tight mt-0.5">
                    One-time serial codes registered on manufacture
                  </p>
                </div>
              </div>

              <div className="bg-[#0E132D]/70 border border-white/10 rounded-xl p-3.5 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">Lab Clearance</h4>
                  <p className="text-[11px] text-white/50 leading-tight mt-0.5">
                    Third-party purity assay & dope-free certified
                  </p>
                </div>
              </div>

              <div className="bg-[#0E132D]/70 border border-white/10 rounded-xl p-3.5 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">Tamper Alert</h4>
                  <p className="text-[11px] text-white/50 leading-tight mt-0.5">
                    Instant warnings if a code has been scanned before
                  </p>
                </div>
              </div>
            </div>

            {/* Portal Link Banner */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl bg-blue-950/30 border border-blue-500/30">
              <div className="flex items-center gap-2.5 text-xs font-mono text-white/80">
                <QrCode className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Want to inspect batch records or test samples?</span>
              </div>
              <Link
                href="/verify"
                className="w-full sm:w-auto text-center px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs font-mono transition-colors flex items-center justify-center gap-1.5 shrink-0"
              >
                <span>Open Full Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
