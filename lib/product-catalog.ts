export interface ProductItem {
  id: string
  name: string
  tagline: string
  sku: string
  category: string
  image: string
  weight: string
  servings: string
  flavor: string
  proteinPerServing: string
  bcaaPerServing: string
  certifications: string[]
  labReport: {
    proteinPurity: string
    heavyMetals: string
    dopingSubstances: string
    microbiologicalQuality: string
  }
}

export const PRODUCTS_CATALOG: ProductItem[] = [
  {
    id: "prime-whey",
    name: "Prime Whey",
    tagline: "100% Ultra-Filtered Whey Protein Concentrate",
    sku: "ATN-PW-2000",
    category: "Protein",
    image: "/images/prime-whey.png",
    weight: "2 kg (4.4 lbs)",
    servings: "66 Servings",
    flavor: "Chocolate Shots",
    proteinPerServing: "24g",
    bcaaPerServing: "6.8g",
    certifications: ["FSSAI Certified", "GMP Quality", "ISO 22000", "100% Dope Free", "Heavy Metals Tested"],
    labReport: {
      proteinPurity: "99.8% Claim Adherence (Verified)",
      heavyMetals: "Lead, Cadmium, Arsenic: Below Detection Limits",
      dopingSubstances: "Zero WADA Banned Substances Detected",
      microbiologicalQuality: "Pathogen Free (E. coli, Salmonella: Negative)",
    },
  },
  {
    id: "anabolic-lean-muscle-builder",
    name: "Anabolic Lean Muscle Builder",
    tagline: "Strength & Hypertrophy Engineered Performance Matrix",
    sku: "ATN-ALMB-3000",
    category: "Muscle Builder",
    image: "/images/anabolic-lean-muscle-builder.png",
    weight: "3 kg (6.6 lbs)",
    servings: "50 Servings",
    flavor: "Chocolate Shots",
    proteinPerServing: "18g",
    bcaaPerServing: "4.3g",
    certifications: ["FSSAI Certified", "GMP Quality", "ISO 22000", "Creatine Micronized 3g", "3rd Party Tested"],
    labReport: {
      proteinPurity: "100.1% Matrix Delivery (Verified)",
      heavyMetals: "All parameters conform to safety limits",
      dopingSubstances: "Non-Hormonal, Zero Prohibited Anabolics",
      microbiologicalQuality: "Strict Microbial Standards Passed",
    },
  },
  {
    id: "alpha-super-mass-gainer",
    name: "Alpha Super Mass Gainer",
    tagline: "Explosive Caloric Density & Lean Mass Builder",
    sku: "ATN-ASMG-3000",
    category: "Mass Gainer",
    image: "/images/alpha-super-mass-gainer.png",
    weight: "3 kg (6.6 lbs)",
    servings: "50 Servings",
    flavor: "Chocolate Shots",
    proteinPerServing: "18g",
    bcaaPerServing: "4.3g",
    certifications: ["FSSAI Certified", "GMP Quality", "ISO 22000", "Clean Carb Matrix", "Fast Absorption"],
    labReport: {
      proteinPurity: "High Bioavailability Verified",
      heavyMetals: "Safe for Daily Sports Consumption",
      dopingSubstances: "100% Free of Adulterants",
      microbiologicalQuality: "Fully Certified Lot Clearance",
    },
  },
]

export function getProductById(id: string): ProductItem | undefined {
  return PRODUCTS_CATALOG.find((p) => p.id === id || p.sku === id)
}
