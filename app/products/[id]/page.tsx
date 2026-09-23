import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PRODUCTS_CATALOG, getProductById } from "@/lib/product-catalog"
import { ProductGallery } from "@/components/product-gallery"
import {
  ShieldCheck,
  Award,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  Check,
  Zap,
  ShoppingBag,
  FlaskConical,
  Dumbbell,
  Building2,
  PhoneCall,
  Mail,
  Scale,
  BadgeCheck,
  Table2,
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
    <main className="min-h-screen bg-[#070A1B] text-white selection:bg-blue-600 selection:text-white">
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
            {/* Left Column: Interactive Product Gallery (Main + Thumbnails) */}
            <div className="lg:col-span-6">
              <ProductGallery
                gallery={product.gallery}
                name={product.name}
                category={product.category}
              />
            </div>

            {/* Right Column: Product Specifications, Pricing & Order */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono text-white/40 uppercase tracking-widest">
                    SKU: {product.sku}
                  </span>
                  <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> FSSAI Lic. {product.fssaiLic}
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white tracking-tight pt-2">
                  {product.name}
                </h1>
                <p className="text-sm font-mono text-blue-400 mt-2 font-semibold">
                  {product.tagline}
                </p>
              </div>

              {/* Price Callout */}
              <div className="p-4 rounded-2xl bg-[#0E132D] border border-blue-500/30 flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono text-white/40 uppercase">Maximum Retail Price (Incl. Taxes)</div>
                  <div className="text-3xl font-black text-white font-mono mt-0.5">{product.mrp}</div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-bold">
                    <Check className="w-3.5 h-3.5" /> 100% Genuine Guaranteed
                  </span>
                </div>
              </div>

              {/* Key Specs Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[#0E132D] border border-white/10 text-xs font-mono">
                <div>
                  <div className="text-white/40 text-[10px] uppercase">Net Container Vol.</div>
                  <div className="font-bold text-white mt-1 text-sm">{product.weight}</div>
                </div>
                <div>
                  <div className="text-white/40 text-[10px] uppercase">Servings Count</div>
                  <div className="font-bold text-white mt-1 text-sm">{product.servings}</div>
                </div>
                <div>
                  <div className="text-white/40 text-[10px] uppercase">Protein Ratio</div>
                  <div className="font-bold text-emerald-400 mt-1 text-sm">{product.proteinPerServing}</div>
                </div>
                <div>
                  <div className="text-white/40 text-[10px] uppercase">BCAA Ratio</div>
                  <div className="font-bold text-blue-400 mt-1 text-sm">{product.bcaaPerServing}</div>
                </div>
              </div>

              {/* Flavor Profile */}
              <div className="p-4 bg-[#0E132D]/70 rounded-2xl border border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-white/60 uppercase">Official Flavor Profile:</span>
                <span className="font-bold text-white bg-blue-500/10 border border-blue-500/30 px-3.5 py-1.5 rounded-lg">
                  {product.flavor}
                </span>
              </div>

              {/* Certifications List */}
              <div className="space-y-2 pt-1">
                <div className="text-xs font-mono text-white/50 uppercase tracking-wider font-bold">
                  Quality Certifications & Compliance Seals:
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.certifications.map((cert) => (
                    <div
                      key={cert}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white/90 font-semibold"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order CTA Button */}
              <div className="pt-2">
                <button className="w-full py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-sm font-mono uppercase tracking-wider rounded-2xl transition-all shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer">
                  <ShoppingBag className="w-4 h-4" />
                  <span>Order Now • Free Express Shipping</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Nutritional Information & Typical Amino Acid Profile */}
      <section className="py-16 px-4 sm:px-6 bg-[#050714] border-t border-white/10">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Section Title */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
              <Table2 className="w-4 h-4" /> Verified Nutrition Facts & Amino Acid Spectrum
            </div>
            <h2 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight">
              SUPPLEMENT <span className="text-blue-400">NUTRITION FACTS & INGREDIENTS</span>
            </h2>
            <p className="text-xs sm:text-sm font-mono text-white/60 max-w-2xl mx-auto mt-2">
              Values extracted directly from certified container packaging. Formulated for maximum muscle recovery, caloric density, and nitrogen retention.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Table 1: Macro Nutritional Information */}
            <div className="lg:col-span-6 bg-[#0B0E23] border border-blue-900/40 rounded-3xl p-6 sm:p-8 space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-lg font-black uppercase text-white font-mono flex items-center gap-2">
                    <Scale className="w-4 h-4 text-blue-400" /> Nutritional Information
                  </h3>
                  <span className="text-xs font-mono text-white/40">
                    Serving Size: {product.nutritionTable.servingSize} • {product.nutritionTable.servingsPerContainer}
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[11px] font-mono font-bold">
                  Per 100g
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-white/70">Energy (kcal)</span>
                  <span className="font-bold text-white text-sm">{product.nutritionTable.energyKcal}</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                  <span className="text-emerald-300 font-bold">Protein Delivery</span>
                  <span className="font-bold text-emerald-400 text-sm">{product.nutritionTable.protein}</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-white/70">Total Carbohydrate Matrix</span>
                  <span className="font-bold text-white text-sm">{product.nutritionTable.carbs}</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-white/70">Total Added Sugar</span>
                  <span className="font-bold text-white text-sm">{product.nutritionTable.sugar}</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-white/70">Total Fat</span>
                  <span className="font-bold text-white text-sm">{product.nutritionTable.fat}</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-white/70">Sodium</span>
                  <span className="font-bold text-white text-sm">{product.nutritionTable.sodium}</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-white/70">Calcium</span>
                  <span className="font-bold text-white text-sm">{product.nutritionTable.calcium}</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-white/70">Essential Micronutrients</span>
                  <span className="font-bold text-white text-sm">{product.nutritionTable.ironOrCopper}</span>
                </div>
              </div>
            </div>

            {/* Table 2: Typical Amino Acid Profile */}
            <div className="lg:col-span-6 bg-[#0B0E23] border border-blue-900/40 rounded-3xl p-6 sm:p-8 space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-lg font-black uppercase text-white font-mono flex items-center gap-2">
                    <Dumbbell className="w-4 h-4 text-indigo-400" /> Typical Amino Acid Profile
                  </h3>
                  <span className="text-xs font-mono text-white/40">
                    Values in Milligrams Amino Acid per Serving
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-[11px] font-mono font-bold">
                  17 Amino Acids
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5 font-mono text-xs">
                {Object.entries(product.aminoAcidProfile).map(([amino, value]) => {
                  const isBcaa = value.includes("BCAA")
                  return (
                    <div
                      key={amino}
                      className={`flex items-center justify-between p-2.5 rounded-xl border ${
                        isBcaa
                          ? "bg-blue-500/15 border-blue-500/40 text-blue-300 font-bold"
                          : "bg-white/5 border border-white/5 text-white/80"
                      }`}
                    >
                      <span className="capitalize">{amino}</span>
                      <span className={isBcaa ? "text-blue-300 font-bold" : "text-white/90"}>{value}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Full Ingredients & Formulation Section */}
          <div className="bg-[#0B0E23] border border-blue-900/40 rounded-3xl p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-black uppercase text-white font-mono flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-400" /> Full Ingredients & Performance Actives
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {product.ingredients.map((ing, idx) => (
                <div
                  key={ing + idx}
                  className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white/90 flex items-center gap-2"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>{ing}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Manufacturer & FSSAI Compliance Section */}
          <div className="bg-gradient-to-b from-[#090C1F] to-[#070918] border border-white/10 rounded-3xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            <div className="space-y-2">
              <div className="text-white/40 uppercase font-bold flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-blue-400" /> Marketed By & Brand
              </div>
              <div className="text-white font-bold text-sm">Muscle Care</div>
              <div className="text-white/60">{product.customerCare.website}</div>
              <div className="text-blue-400 font-bold">FSSAI Lic. No. {product.fssaiLic}</div>
            </div>

            <div className="space-y-2">
              <div className="text-white/40 uppercase font-bold flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-indigo-400" /> Manufactured By
              </div>
              <div className="text-white font-bold text-sm">US Health Industries</div>
              <div className="text-white/60">Sector-4 Bawana DSIIDC, Delhi-110039</div>
              <div className="text-indigo-400 font-bold">Lic. No. 13325998000027</div>
            </div>

            <div className="space-y-2">
              <div className="text-white/40 uppercase font-bold flex items-center gap-1.5">
                <PhoneCall className="w-4 h-4 text-emerald-400" /> Customer Support
              </div>
              <div className="text-white font-bold flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400" /> {product.customerCare.phone}
              </div>
              <div className="text-white/70 flex items-center gap-2 truncate">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> {product.customerCare.email}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lab Report & Quality Assays Section */}
      <section className="py-16 px-4 sm:px-6 bg-[#070A1B] border-t border-white/10">
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
