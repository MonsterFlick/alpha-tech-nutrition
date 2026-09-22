import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PRODUCTS_CATALOG, getProductById } from "@/lib/product-catalog"
import {
  ShieldCheck,
  Award,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  Flame,
  Check,
  Zap,
  ShoppingBag
} from "lucide-react"

export async function generateStaticParams() {
  return PRODUCTS_CATALOG.map((product) => ({
    id: product.id,
  }))
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = getProductById(id)

  if (!product) {
    notFound()
  }

  const otherProducts = PRODUCTS_CATALOG.filter((p) => p.id !== product.id)

  return (
    <main className="min-h-screen bg-[#070A1B] text-white">
      <Navigation />

      {/* Hero / Main Product Detail Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 relative overflow-hidden bg-gradient-to-b from-[#0B0E23] via-[#080B1C] to-[#070A1B]">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[300px] bg-blue-600/10 blur-[140px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs font-mono text-white/50 mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/30" />
            <Link href="/products" className="hover:text-white transition-colors">
              Products
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/30" />
            <span className="text-blue-400 font-bold">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Large Product Image Card */}
            <div className="lg:col-span-6 bg-[#0D122B] border-2 border-blue-950/80 rounded-3xl p-8 relative flex items-center justify-center shadow-2xl">
              <div className="absolute top-4 left-4 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                {product.category}
              </div>

              <div className="absolute top-4 right-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 100% Purity
              </div>

              <div className="my-6 relative w-full aspect-square max-w-md flex items-center justify-center">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={420}
                  height={420}
                  priority
                  className="object-contain max-h-[380px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Right Column: Specifications & Purchasing */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="text-xs font-mono text-white/40 uppercase tracking-widest mb-1">
                  SKU: {product.sku}
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white tracking-tight">
                  {product.name}
                </h1>
                <p className="text-sm font-mono text-blue-400 mt-2 font-semibold">
                  {product.tagline}
                </p>
              </div>

              {/* Key Specs Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[#0E132D] border border-white/10 text-xs font-mono">
                <div>
                  <div className="text-white/40 text-[10px] uppercase">Net Weight</div>
                  <div className="font-bold text-white mt-1 text-sm">{product.weight}</div>
                </div>
                <div>
                  <div className="text-white/40 text-[10px] uppercase">Servings</div>
                  <div className="font-bold text-white mt-1 text-sm">{product.servings}</div>
                </div>
                <div>
                  <div className="text-white/40 text-[10px] uppercase">Protein</div>
                  <div className="font-bold text-blue-400 mt-1 text-sm">{product.proteinPerServing}</div>
                </div>
                <div>
                  <div className="text-white/40 text-[10px] uppercase">BCAA</div>
                  <div className="font-bold text-indigo-400 mt-1 text-sm">{product.bcaaPerServing}</div>
                </div>
              </div>

              {/* Flavor Profile */}
              <div className="p-4 bg-[#0E132D]/70 rounded-2xl border border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-white/60 uppercase">Flavor Profile:</span>
                <span className="font-bold text-white bg-blue-500/10 border border-blue-500/30 px-3 py-1 rounded-lg">
                  {product.flavor}
                </span>
              </div>

              {/* Certifications List */}
              <div className="space-y-2 pt-2">
                <div className="text-xs font-mono text-white/50 uppercase tracking-wider font-bold">
                  Quality Certifications & Compliance:
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.certifications.map((cert) => (
                    <div
                      key={cert}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white/80"
                    >
                      <Check className="w-3.5 h-3.5 text-blue-400" />
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Button */}
              <div className="pt-4">
                <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-sm font-mono uppercase tracking-wider rounded-2xl transition-all shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer">
                  <ShoppingBag className="w-4 h-4" />
                  <span>Order Now • Free Express Shipping</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lab Report & Quality Assays Section */}
      <section className="py-16 px-4 sm:px-6 bg-[#050714] border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
              <Award className="w-4 h-4" /> Official 3rd-Party Lab Report
            </div>
            <h2 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight">
              VERIFIED PURITY & <span className="text-blue-400">LAB ASSAY PARAMETERS</span>
            </h2>
            <p className="text-xs sm:text-sm font-mono text-white/60 max-w-xl mx-auto mt-2">
              Batch tested for guaranteed label accuracy, heavy metal safety, and 100% WADA prohibited substance clearance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#0B0E23] border border-blue-900/40 rounded-2xl p-5">
              <div className="text-[10px] font-mono text-white/50 uppercase mb-1">Protein Purity</div>
              <div className="font-bold text-base text-emerald-400 font-mono mt-1">
                {product.labReport.proteinPurity}
              </div>
              <p className="text-[11px] font-mono text-white/40 mt-2 leading-relaxed">
                Independent nitrogen-content analysis confirming exact protein content delivery per serving.
              </p>
            </div>

            <div className="bg-[#0B0E23] border border-blue-900/40 rounded-2xl p-5">
              <div className="text-[10px] font-mono text-white/50 uppercase mb-1">Heavy Metals Assay</div>
              <div className="font-bold text-base text-emerald-400 font-mono mt-1">
                {product.labReport.heavyMetals}
              </div>
              <p className="text-[11px] font-mono text-white/40 mt-2 leading-relaxed">
                ICP-MS testing for Lead, Cadmium, Arsenic, and Mercury below safety thresholds.
              </p>
            </div>

            <div className="bg-[#0B0E23] border border-blue-900/40 rounded-2xl p-5">
              <div className="text-[10px] font-mono text-white/50 uppercase mb-1">WADA Doping Screening</div>
              <div className="font-bold text-base text-emerald-400 font-mono mt-1">
                {product.labReport.dopingSubstances}
              </div>
              <p className="text-[11px] font-mono text-white/40 mt-2 leading-relaxed">
                100% free of WADA prohibited anabolic agents, stimulants, and hormone modulators.
              </p>
            </div>

            <div className="bg-[#0B0E23] border border-blue-900/40 rounded-2xl p-5">
              <div className="text-[10px] font-mono text-white/50 uppercase mb-1">Microbiological Quality</div>
              <div className="font-bold text-base text-emerald-400 font-mono mt-1">
                {product.labReport.microbiologicalQuality}
              </div>
              <p className="text-[11px] font-mono text-white/40 mt-2 leading-relaxed">
                Clean Lot clearance testing negative for E. coli, Salmonella, and harmful pathogens.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Other Products Section */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-black uppercase text-white font-mono">
            Explore Other Supplements
          </h3>
          <Link
            href="/products"
            className="text-xs font-mono font-bold text-blue-400 hover:text-white flex items-center gap-1"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {otherProducts.map((op) => (
            <Link
              key={op.id}
              href={`/products/${op.id}`}
              className="bg-[#0D122B] border border-white/10 hover:border-blue-500/50 rounded-2xl p-5 flex items-center gap-5 transition-all group"
            >
              <div className="w-24 h-24 bg-[#070A1B] rounded-xl p-2 flex items-center justify-center shrink-0">
                <Image
                  src={op.image}
                  alt={op.name}
                  width={90}
                  height={90}
                  className="object-contain max-h-20"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-mono text-blue-400 font-bold uppercase">{op.category}</div>
                <h4 className="font-bold text-base uppercase text-white truncate group-hover:text-blue-400 transition-colors">
                  {op.name}
                </h4>
                <p className="text-xs font-mono text-white/50 truncate mt-0.5">{op.tagline}</p>
                <div className="text-xs font-mono text-blue-300 font-bold mt-2 flex items-center gap-1">
                  <span>Explore Product</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
