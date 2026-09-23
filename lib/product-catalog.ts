export interface ProductItem {
  id: string
  name: string
  tagline: string
  sku: string
  category: string
  image: string
  gallery: string[]
  weight: string
  servings: string
  flavor: string
  proteinPerServing: string
  bcaaPerServing: string
  mrp: string
  fssaiLic: string
  manufacturer: string
  customerCare: {
    email: string
    phone: string
    website: string
  }
  certifications: string[]
  nutritionTable: {
    servingSize: string
    servingsPerContainer: string
    energyKcal: string
    protein: string
    carbs: string
    sugar: string
    fat: string
    sodium: string
    calcium: string
    ironOrCopper: string
  }
  aminoAcidProfile: {
    alanine: string
    arginine: string
    aspartate: string
    cystine: string
    glycine: string
    histidine: string
    isoleucine: string
    leucine: string
    lysine: string
    methionine: string
    phenylalanine: string
    proline: string
    serine: string
    threonine: string
    tryptophan: string
    tyrosine: string
    valine: string
  }
  ingredients: string[]
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
    tagline: "100% Ultra-Filtered Whey Protein Concentrate & Isolate",
    sku: "ATN-PW-2000",
    category: "Protein",
    image: "/images/prime-whey.png",
    gallery: [
      "/images/prime-whey.png",
      "/images/prime-whey-nutrition-label.png"
    ],
    weight: "2 kg (4.4 lbs)",
    servings: "37 Servings",
    flavor: "Chocolate Shots",
    proteinPerServing: "46g per 100g",
    bcaaPerServing: "10.4g per 100g",
    mrp: "₹4,460",
    fssaiLic: "13325998000027",
    manufacturer: "US Health Industries / Marketed by Muscle Care",
    customerCare: {
      email: "alphatechnutrition.in@gmail.com",
      phone: "83808 89935",
      website: "www.alphatech-nutrition.in"
    },
    certifications: ["FSSAI Certified", "GMP Quality", "ISO 22000", "100% Whey Formula", "Heavy Metals Tested"],
    nutritionTable: {
      servingSize: "1 Scoop (80g)",
      servingsPerContainer: "37 Servings",
      energyKcal: "403 kcal (14.76% RDA)",
      protein: "46 g (85.18% RDA)",
      carbs: "48 g (36.92% RDA)",
      sugar: "2 g",
      fat: "3 g (10.00% RDA)",
      sodium: "60.5 mg (3.02% RDA)",
      calcium: "115 mg (11.50% RDA)",
      ironOrCopper: "1.2 mg Iron (6.31% RDA)"
    },
    aminoAcidProfile: {
      alanine: "2268 mg",
      arginine: "1035 mg",
      aspartate: "4782 mg",
      cystine: "966 mg",
      glycine: "788 mg",
      histidine: "782 mg",
      isoleucine: "2898 mg (BCAA)",
      leucine: "4830 mg (BCAA)",
      lysine: "4278 mg",
      methionine: "986 mg",
      phenylalanine: "1429 mg",
      proline: "2710 mg",
      serine: "1823 mg",
      threonine: "3174 mg",
      tryptophan: "828 mg",
      tyrosine: "1472 mg",
      valine: "2668 mg (BCAA)"
    },
    ingredients: [
      "100% Whey Protein Concentrate & Isolate",
      "Maltodextrin & Complex Corn Starch",
      "Corn Oil Powder & Skimmed Milk Powder",
      "Tricalcium Phosphate & Premium Cocoa Powder",
      "Xanthum Gum (INS 415) & Sucralose (INS 955)",
      "Natural and Artificial Chocolate Flavors"
    ],
    labReport: {
      proteinPurity: "99.8% Claim Adherence (Verified)",
      heavyMetals: "Lead, Cadmium, Arsenic: Below Detection Limits",
      dopingSubstances: "Zero WADA Banned Substances Detected",
      microbiologicalQuality: "Pathogen Free (E. coli, Salmonella: Negative)"
    }
  },
  {
    id: "anabolic-lean-muscle-builder",
    name: "Anabolic Lean Muscle Builder",
    tagline: "Strength & Hypertrophy Engineered Performance Matrix",
    sku: "ATN-ALMB-3000",
    category: "Muscle Builder",
    image: "/images/anabolic-lean-muscle-builder.png",
    gallery: [
      "/images/anabolic-lean-muscle-builder.png",
      "/images/prime-whey-nutrition-label.png"
    ],
    weight: "3 kg (6.6 lbs)",
    servings: "50 Servings",
    flavor: "Chocolate Shots",
    proteinPerServing: "18g per serving",
    bcaaPerServing: "4.3g per serving",
    mrp: "₹3,990",
    fssaiLic: "21524018000384",
    manufacturer: "US Health Industries / Marketed by Muscle Care",
    customerCare: {
      email: "alphatechnutrition.in@gmail.com",
      phone: "83808 89935",
      website: "www.alphatech-nutrition.in"
    },
    certifications: ["FSSAI Certified", "GMP Quality", "ISO 22000", "Creatine Micronized 3g", "3rd Party Tested"],
    nutritionTable: {
      servingSize: "1 Scoop (60g)",
      servingsPerContainer: "50 Servings",
      energyKcal: "410 kcal",
      protein: "18 g",
      carbs: "38 g",
      sugar: "2 g",
      fat: "2.5 g",
      sodium: "58 mg",
      calcium: "100 mg",
      ironOrCopper: "1.0 mg Iron"
    },
    aminoAcidProfile: {
      alanine: "1850 mg",
      arginine: "850 mg",
      aspartate: "3600 mg",
      cystine: "720 mg",
      glycine: "600 mg",
      histidine: "590 mg",
      isoleucine: "2100 mg (BCAA)",
      leucine: "3600 mg (BCAA)",
      lysine: "3200 mg",
      methionine: "750 mg",
      phenylalanine: "1100 mg",
      proline: "2100 mg",
      serine: "1400 mg",
      threonine: "2400 mg",
      tryptophan: "650 mg",
      tyrosine: "1150 mg",
      valine: "2050 mg (BCAA)"
    },
    ingredients: [
      "Whey Protein Concentrate & Hydrolysate",
      "Micronized Creatine Monohydrate (3g)",
      "Complex Carbohydrate Matrix",
      "Branched Chain Amino Acids (BCAA)",
      "Natural & Artificial Flavors"
    ],
    labReport: {
      proteinPurity: "100.1% Matrix Delivery (Verified)",
      heavyMetals: "All parameters conform to safety limits",
      dopingSubstances: "Non-Hormonal, Zero Prohibited Anabolics",
      microbiologicalQuality: "Strict Microbial Standards Passed"
    }
  },
  {
    id: "alpha-super-mass-gainer",
    name: "Alpha Super Mass Gainer",
    tagline: "Bulk Like a Beast • Advanced Complex Carbohydrate & High Protein Matrix",
    sku: "ATN-ASMG-3000",
    category: "Mass Gainer",
    image: "/images/alpha-super-mass-gainer-front.png",
    gallery: [
      "/images/alpha-super-mass-gainer-front.png",
      "/images/alpha-super-mass-gainer-back-desc.png",
      "/images/alpha-super-mass-gainer-nutrition.png"
    ],
    weight: "3 kg (6.6 lbs)",
    servings: "37 Servings",
    flavor: "Chocolate Shots",
    proteinPerServing: "31.5g per 100g",
    bcaaPerServing: "7.1g per 100g",
    mrp: "₹3,520",
    fssaiLic: "21524018000384",
    manufacturer: "US Health Industries / Marketed by Muscle Care",
    customerCare: {
      email: "alphatechnutrition.in@gmail.com",
      phone: "83808 89935",
      website: "www.alphatech-nutrition.in"
    },
    certifications: ["FSSAI Certified", "GMP Quality", "ISO 22000", "Ayurvedic Performance Matrix", "Fast Absorption"],
    nutritionTable: {
      servingSize: "1 Scoop (80g)",
      servingsPerContainer: "31 - 37 Servings",
      energyKcal: "414 kcal (15.16% RDA)",
      protein: "31.5 g (58.33% RDA)",
      carbs: "58.5 g (45.00% RDA)",
      sugar: "3 g",
      fat: "6 g (20.00% RDA)",
      sodium: "54 mg (2.70% RDA)",
      calcium: "92 mg (9.20% RDA)",
      ironOrCopper: "0.7 mg Copper (41.17% RDA)"
    },
    aminoAcidProfile: {
      alanine: "1553 mg",
      arginine: "709 mg",
      aspartate: "3274 mg",
      cystine: "661 mg",
      glycine: "540 mg",
      histidine: "535 mg",
      isoleucine: "1984 mg (BCAA)",
      leucine: "3307 mg (BCAA)",
      lysine: "2929 mg",
      methionine: "675 mg",
      phenylalanine: "979 mg",
      proline: "1855 mg",
      serine: "1246 mg",
      threonine: "2173 mg",
      tryptophan: "587 mg",
      tyrosine: "1008 mg",
      valine: "1827 mg (BCAA)"
    },
    ingredients: [
      "Soya Protein & Whey Protein Concentrate",
      "Maltodextrin & Complex Corn Starch",
      "Corn Oil Powder & Skimmed Milk Powder",
      "Withania Somnifera (Ashwagandha)",
      "Chlorophytum Borivilianum (Safed Musli)",
      "Asparagus Racemosus (Shatavari)",
      "Black Asphaltum (Purified Shilajit)",
      "Tricalcium Phosphate & Cocoa Powder",
      "Sucralose (INS 955) & Xanthum Gum (INS 415)",
      "Natural and Artificial Chocolate Flavor"
    ],
    labReport: {
      proteinPurity: "High Bioavailability Verified",
      heavyMetals: "Safe for Daily Sports Consumption",
      dopingSubstances: "100% Free of Adulterants",
      microbiologicalQuality: "Fully Certified Lot Clearance"
    }
  }
]

export function getProductById(id: string): ProductItem | undefined {
  return PRODUCTS_CATALOG.find((p) => p.id === id || p.sku === id)
}
