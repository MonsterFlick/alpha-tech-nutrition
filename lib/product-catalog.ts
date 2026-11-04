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
    instagram: string
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
    tagline: "100% Ultra-Filtered Whey Protein Concentrate • Build Muscle & Rapid Recovery",
    sku: "ATN-PW-2000",
    category: "Protein",
    image: "/images/prime-whey.png",
    gallery: [
      "/images/prime-whey.png",
      "/images/labels/prime-whey-front.png",
      "/images/labels/prime-whey-nutrition.png",
      "/images/labels/prime-whey-back.png",
      "/images/labels/prime-whey-full-label.png",
    ],
    weight: "2 kg (4.4 lbs)",
    servings: "60 Servings",
    flavor: "Belgian Chocolate",
    proteinPerServing: "24g per serving",
    bcaaPerServing: "5.4g per serving",
    mrp: "₹4,460",
    fssaiLic: "21524018000384",
    manufacturer: "US Health Industries / Marketed by Muscle Care",
    customerCare: {
      email: "alphatechnutrition.in@gmail.com",
      phone: "8380889935",
      website: "www.alphatech-nutrition.in",
      instagram: "alphatech_nutrition",
    },
    certifications: [
      "FSSAI Certified (Lic. 21524018000384)",
      "GMP Quality Guaranteed",
      "ISO 22000 Certified",
      "100% Ultra-Filtered Whey",
      "Zero Added Sugar",
      "WADA Banned Substance Tested",
    ],
    nutritionTable: {
      servingSize: "1 Scoop (33g)",
      servingsPerContainer: "60 Servings",
      energyKcal: "133.5 kcal (4.87% RDA)",
      protein: "24 g (44.40% RDA)",
      carbs: "6 g (4.61% RDA)",
      sugar: "0 g Added Sugar",
      fat: "1.5 g (1.00% RDA)",
      sodium: "122 mg (6.10% RDA)",
      calcium: "177 mg (17.70% RDA)",
      ironOrCopper: "0.8 mg Iron (3.10% RDA)",
    },
    aminoAcidProfile: {
      alanine: "1140 mg",
      arginine: "640 mg",
      aspartate: "2460 mg",
      cystine: "490 mg",
      glycine: "411 mg",
      histidine: "395 mg",
      isoleucine: "1390 mg (BCAA)",
      leucine: "2420 mg (BCAA)",
      lysine: "2120 mg",
      methionine: "475 mg",
      phenylalanine: "745 mg",
      proline: "1440 mg",
      serine: "1020 mg",
      threonine: "1650 mg",
      tryptophan: "405 mg",
      tyrosine: "710 mg",
      valine: "1300 mg (BCAA)",
    },
    ingredients: [
      "Whey Protein Concentrate",
      "Whey Protein Isolate",
      "Maltodextrin",
      "Cocoa Powder",
      "Thickener (INS 415)",
      "Emulsifier (INS 322)",
      "Sweetener (INS 955, INS 950)",
      "Contains Added Nature-Identical Belgian Chocolate Flavouring Substance",
    ],
    labReport: {
      proteinPurity: "100% Verified Ultra-Filtered Whey",
      heavyMetals: "Below strict Indian & FSSAI detection limits",
      dopingSubstances: "Zero WADA Banned Substances detected",
      microbiologicalQuality: "Negative for E. coli, Salmonella, and Pathogens",
    },
  },
  {
    id: "alpha-super-mass-gainer",
    name: "Alpha Super Mass Gainer",
    tagline: "Bulk Like a Beast • Advanced Complex Carbohydrate & High Protein Matrix",
    sku: "ATN-ASMG-3000",
    category: "Mass Gainer",
    image: "/images/alpha-super-mass-gainer.png",
    gallery: [
      "/images/alpha-super-mass-gainer.png",
      "/images/labels/alpha-super-mass-gainer-front.png",
      "/images/labels/alpha-super-mass-gainer-nutrition.png",
      "/images/labels/alpha-super-mass-gainer-back.png",
      "/images/labels/alpha-super-mass-gainer-full-label.png",
    ],
    weight: "3 kg (6.6 lbs)",
    servings: "37 Servings",
    flavor: "Belgian Chocolate",
    proteinPerServing: "31.5g per 100g",
    bcaaPerServing: "7.1g per 100g",
    mrp: "₹3,520",
    fssaiLic: "21524018000384",
    manufacturer: "US Health Industries / Marketed by Muscle Care",
    customerCare: {
      email: "alphatechnutrition.in@gmail.com",
      phone: "8380889935",
      website: "www.alphatech-nutrition.in",
      instagram: "alphatech_nutrition",
    },
    certifications: [
      "FSSAI Certified (Lic. 21524018000384)",
      "GMP Quality Certified",
      "ISO 22000 Food Safety",
      "Ayurvedic Herbal Strength Matrix",
      "Fast Caloric Delivery & Absorption",
    ],
    nutritionTable: {
      servingSize: "1 Scoop (80g)",
      servingsPerContainer: "37 Servings",
      energyKcal: "414 kcal (15.16% RDA)",
      protein: "31.5 g (58.33% RDA)",
      carbs: "58.5 g (45.00% RDA)",
      sugar: "3 g",
      fat: "6 g (20.00% RDA)",
      sodium: "54 mg (2.70% RDA)",
      calcium: "92 mg (9.20% RDA)",
      ironOrCopper: "0.7 mg Copper (41.17% RDA)",
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
      valine: "1827 mg (BCAA)",
    },
    ingredients: [
      "Soya Protein & Whey Protein Concentrate",
      "Maltodextrin & Complex Corn Starch",
      "Corn Oil Powder & Skimmed Milk Powder",
      "Withania Somnifera (Ashwagandha)",
      "Chlorophytum Borivilianum (Safed Musli)",
      "Asparagus Racemosus (Shatavari)",
      "Black Asphaltum (Purified Shilajit)",
      "Tricalcium Phosphate & Premium Cocoa Powder",
      "Sucralose (INS 955) & Xanthan Gum (INS 415)",
      "Natural and Artificial Belgian Chocolate Flavour",
    ],
    labReport: {
      proteinPurity: "High Bioavailability & Complex Carb Balance Verified",
      heavyMetals: "Safe for Daily Sports Consumption",
      dopingSubstances: "100% Free of Adulterants & Banned Substances",
      microbiologicalQuality: "Fully Certified Lot Clearance",
    },
  },
  {
    id: "anabolic-lean-muscle-builder",
    name: "Anabolic Lean Muscle Builder",
    tagline: "High-Carb Supplement For Lean Muscle Growth • Fast-Absorbing Recovery",
    sku: "ATN-ALMB-3000",
    category: "Muscle Builder",
    image: "/images/anabolic-lean-muscle-builder.png",
    gallery: [
      "/images/anabolic-lean-muscle-builder.png",
      "/images/labels/anabolic-lean-muscle-builder-front.png",
      "/images/labels/anabolic-lean-muscle-builder-nutrition.png",
      "/images/labels/anabolic-lean-muscle-builder-back.png",
      "/images/labels/anabolic-lean-muscle-builder-full-label.png",
    ],
    weight: "3 kg (6.6 lbs)",
    servings: "37 Servings",
    flavor: "Belgian Chocolate",
    proteinPerServing: "46g per 100g",
    bcaaPerServing: "10.3g per 100g",
    mrp: "₹4,460",
    fssaiLic: "21524018000384",
    manufacturer: "US Health Industries / Marketed by Muscle Care",
    customerCare: {
      email: "alphatechnutrition.in@gmail.com",
      phone: "8380889935",
      website: "www.alphatech-nutrition.in",
      instagram: "alphatech_nutrition",
    },
    certifications: [
      "FSSAI Certified (Lic. 21524018000384)",
      "GMP Quality Certified",
      "ISO 22000 Certified",
      "High Protein 46g per 100g",
      "Fast Absorbing Energy Complex",
      "WADA Banned Substance Tested",
    ],
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
      ironOrCopper: "1.2 mg Iron (6.31% RDA)",
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
      valine: "2668 mg (BCAA)",
    },
    ingredients: [
      "Whey Protein Concentrate",
      "Maltodextrin & Complex Corn Starch",
      "Corn Oil Powder & Skimmed Milk Powder",
      "Xanthan Gum (INS 415)",
      "Tricalcium Phosphate",
      "Cocoa Powder",
      "Natural and Artificial Belgian Chocolate Flavour",
    ],
    labReport: {
      proteinPurity: "High Protein 46g Matrix Delivery (Verified)",
      heavyMetals: "All parameters conform to strict safety limits",
      dopingSubstances: "Non-Hormonal, Zero Prohibited Anabolics",
      microbiologicalQuality: "Strict Microbial Standards Passed",
    },
  },
]

export function getProductById(id: string): ProductItem | undefined {
  return PRODUCTS_CATALOG.find((p) => p.id === id || p.sku === id)
}
