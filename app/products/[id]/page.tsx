import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ProductOrderBox } from "@/components/product-order-box"
import { PRODUCTS_CATALOG, getProductById } from "@/lib/product-catalog"
import { ProductGallery } from "@/components/product-gallery"
import {
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Zap,
  Building2,
  PhoneCall,
  Scale,
  Table2,
  Instagram,
} from "lucide-react"
import { WHATSAPP_DISPLAY_PHONE, INSTAGRAM_HANDLE, INSTAGRAM_URL, FSSAI_LICENSE } from "@/lib/whatsapp"

export async function generateStaticParams() {
  return PRODUCTS_CATALOG.map((product) => ({
    id: product.id,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const product = getProductById(id)
  if (!product) {
    return {
      title: "Product Not Found",
    }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://alphatech-nutrition.in"
  const url = `${siteUrl}/products/${product.id}`
  const imageUrl = `${siteUrl}${product.image}`

  return {
    title: `${product.name} (${product.weight}) - Belgian Chocolate`,
    description: `${product.tagline}. High-performance formula with ${product.proteinPerServing}, ${product.bcaaPerServing}, ${product.servings}. FSSAI Lic. ${product.fssaiLic}. 1-click WhatsApp order.`,
    alternates: {
      canonical: `/products/${product.id}`,
    },
    openGraph: {
      title: `${product.name} | Alpha Tech Nutrition`,
      description: `${product.tagline}. 100% lab certified, zero banned substances. WhatsApp order desk at ${WHATSAPP_DISPLAY_PHONE}.`,
      url,
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Alpha Tech Nutrition`,
      description: `${product.tagline}. FSSAI Lic. ${product.fssaiLic}.`,
      images: [imageUrl],
    },
  }
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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://alphatech-nutrition.in"
  const numericPrice = product.mrp.replace(/[^0-9]/g, "")

  const productJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${siteUrl}/products/${product.id}#product`,
        name: product.name,
        description: product.tagline,
        image: `${siteUrl}${product.image}`,
        sku: product.sku,
        category: product.category,
        brand: {
          "@type": "Brand",
          name: "Alpha Tech Nutrition",
        },
        manufacturer: {
          "@type": "Organization",
          name: "US Health Industries",
        },
        offers: {
          "@type": "Offer",
          url: `${siteUrl}/products/${product.id}`,
          priceCurrency: "INR",
          price: numericPrice,
          priceValidUntil: "2027-12-31",
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/NewCondition",
          seller: {
            "@type": "Organization",
            name: "Alpha Tech Nutrition",
            telephone: "+91-83808-89935",
          },
        },
        nutrition: {
          "@type": "NutritionInformation",
          servingSize: product.nutritionTable.servingSize,
          calories: `${product.nutritionTable.energyKcal} calories`,
          proteinContent: product.nutritionTable.protein,
          carbohydrateContent: product.nutritionTable.carbs,
          fatContent: product.nutritionTable.fat,
          sodiumContent: product.nutritionTable.sodium,
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "84",
          bestRating: "5",
          worstRating: "1",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}/products/${product.id}#breadcrumbs`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Products",
            item: `${siteUrl}/products`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: product.name,
            item: `${siteUrl}/products/${product.id}`,
          },
        ],
      },
    ],
  }

  const otherProducts = PRODUCTS_CATALOG.filter((p) => p.id !== product.id)

  return (
    <main className="min-h-screen bg-[#070A1B] text-white selection:bg-blue-600 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
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
            {/* Left Column: Interactive Product Gallery (Main 3D Render + Cropped Label Views) */}
            <div className="lg:col-span-6">
              <ProductGallery
                gallery={product.gallery}
                name={product.name}
                category={product.category}
              />
              <div className="mt-3 text-center">
                <span className="text-[11px] font-mono text-white/50">
                  Tip: Click thumbnails above to inspect Front, Nutrition Facts (Price & Date Hidden), and Directions panels.
                </span>
              </div>
            </div>

            {/* Right Column: Specifications, Pricing & WhatsApp Order System */}
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
                  <div className="text-white/40 text-[10px] uppercase">Protein Delivery</div>
                  <div className="font-bold text-emerald-400 mt-1 text-sm">{product.proteinPerServing}</div>
                </div>
                <div>
                  <div className="text-white/40 text-[10px] uppercase">BCAA Ratio</div>
                  <div className="font-bold text-blue-400 mt-1 text-sm">{product.bcaaPerServing}</div>
                </div>
              </div>

              {/* Flavor Profile */}
              <div className="p-4 bg-[#0E132D]/70 rounded-2xl border border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-white/60 uppercase">Official Packaging Flavor:</span>
                <span className="font-bold text-white bg-blue-500/10 border border-blue-500/30 px-3.5 py-1.5 rounded-lg">
                  {product.flavor}
                </span>
              </div>

              {/* Interactive WhatsApp Order Box with Quantity Selector */}
              <ProductOrderBox product={product} />

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
                  Amount Per Serving
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
                  <span className="text-white/70">Mineral Trace (Iron / Copper)</span>
                  <span className="font-bold text-white text-sm">{product.nutritionTable.ironOrCopper}</span>
                </div>
              </div>
            </div>

            {/* Table 2: Typical Amino Acid Profile */}
            <div className="lg:col-span-6 bg-[#0B0E23] border border-blue-900/40 rounded-3xl p-6 sm:p-8 space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-lg font-black uppercase text-white font-mono flex items-center gap-2">
                    <Zap className="w-4 h-4 text-emerald-400" /> Typical Amino Acid Profile
                  </h3>
                  <span className="text-xs font-mono text-white/40">
                    Comprehensive Essential & Non-Essential Amino Spectrum
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono font-bold">
                  Milligrams (mg)
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 font-mono text-xs max-h-[380px] overflow-y-auto pr-2 scrollbar-thin">
                {Object.entries(product.aminoAcidProfile).map(([amino, value]) => {
                  const isBCAA = value.includes("BCAA")
                  return (
                    <div
                      key={amino}
                      className={`flex items-center justify-between p-2.5 rounded-xl border capitalize ${
                        isBCAA
                          ? "bg-blue-600/15 border-blue-500/40 text-blue-200 font-bold"
                          : "bg-white/5 border-white/5 text-white/80"
                      }`}
                    >
                      <span>{amino}</span>
                      <span className={isBCAA ? "text-blue-300 font-black" : "text-white font-bold"}>
                        {value}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Full Ingredients Matrix */}
          <div className="bg-[#0B0E23] border border-blue-900/40 rounded-3xl p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-black uppercase text-white font-mono">
              Official Ingredients Declaration
            </h3>
            <p className="text-xs font-mono text-white/60">
              Manufactured using pharmaceutical grade ultra-filtered raw materials:
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {product.ingredients.map((ing, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white/80"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Manufacturing, FSSAI & Customer Support */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0B0E23] border border-blue-900/40 rounded-2xl p-5">
              <div className="flex items-center gap-2 text-white font-mono text-xs font-bold uppercase mb-2">
                <Building2 className="w-4 h-4 text-blue-400" /> Manufacturing Compliance
              </div>
              <p className="text-xs font-mono text-white/80">{product.manufacturer}</p>
              <p className="text-[11px] font-mono text-white/50 mt-1">
                Central FSSAI Lic. No. <strong>{product.fssaiLic}</strong>
              </p>
            </div>

            <div className="bg-[#0B0E23] border border-blue-900/40 rounded-2xl p-5">
              <div className="flex items-center gap-2 text-white font-mono text-xs font-bold uppercase mb-2">
                <PhoneCall className="w-4 h-4 text-emerald-400" /> WhatsApp & Customer Care
              </div>
              <p className="text-xs font-mono text-white/80">Phone / WhatsApp: {WHATSAPP_DISPLAY_PHONE}</p>
              <p className="text-[11px] font-mono text-white/50 mt-1">
                Email: {product.customerCare.email}
              </p>
            </div>

            <div className="bg-[#0B0E23] border border-blue-900/40 rounded-2xl p-5">
              <div className="flex items-center gap-2 text-white font-mono text-xs font-bold uppercase mb-2">
                <Instagram className="w-4 h-4 text-purple-400" /> Instagram Community
              </div>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-blue-400 hover:text-blue-300 font-bold block"
              >
                @{INSTAGRAM_HANDLE}
              </a>
              <p className="text-[11px] font-mono text-white/50 mt-1">
                Tag us in your workout transformations!
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
