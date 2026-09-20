import { PRODUCTS_CATALOG, getProductById, type ProductItem } from "./product-catalog"

export interface VerificationRecord {
  code: string // UUID v4
  productId: string
}

export interface VerificationResult {
  isValid: boolean
  status: "genuine" | "invalid"
  product?: ProductItem
  record?: VerificationRecord
  message: string
}

// Exactly 3 official products - each has exactly 1 permanent UUID v4
export const OFFICIAL_PRODUCT_RECORDS: VerificationRecord[] = [
  {
    code: "e4f9b8c2-3a5d-4e17-b6c8-9d2f1a0e5b7c",
    productId: "prime-whey",
  },
  {
    code: "b7c3d1e5-8f2a-4c96-a1d4-6e8b0f3a2c5e",
    productId: "anabolic-lean-muscle-builder",
  },
  {
    code: "f2a8c4e0-5d1b-4f73-9e6a-8b1c3d5e7f9a",
    productId: "alpha-super-mass-gainer",
  },
]

export const DEFAULT_VERIFICATION_RECORDS = OFFICIAL_PRODUCT_RECORDS

export function getAllVerificationRecords(): VerificationRecord[] {
  return OFFICIAL_PRODUCT_RECORDS
}

export function saveVerificationRecords(_records: VerificationRecord[]): void {
  // Static architecture: no mutation needed
}

export function registerNewRecord(newRecord: VerificationRecord): VerificationRecord {
  return newRecord
}

/**
 * Verify code against the 3 official product UUIDs v4.
 * Each product has exactly 1 UUID.
 */
export function verifyCode(inputCode: string): VerificationResult {
  const clean = (inputCode || "").trim().toLowerCase()

  if (!clean) {
    return {
      isValid: false,
      status: "invalid",
      message: "Please enter a valid product verification UUID.",
    }
  }

  const matchedRecord = OFFICIAL_PRODUCT_RECORDS.find((r) => r.code.toLowerCase() === clean)

  if (!matchedRecord) {
    return {
      isValid: false,
      status: "invalid",
      message: "Product Verification Failed: This UUID is not recognized in the official Alpha Tech database.",
    }
  }

  const product = getProductById(matchedRecord.productId)

  return {
    isValid: true,
    status: "genuine",
    product,
    record: matchedRecord,
    message: "100% Genuine Alpha Tech Product. Official authenticity verified.",
  }
}
