import { PRODUCTS_CATALOG, getProductById, type ProductItem } from "./product-catalog"

export interface VerificationRecord {
  code: string
  productId: string
  batchNumber: string
  mfgDate: string
  expDate: string
  createdAt: string
  scanCount: number
  firstScannedAt?: string
  lastScannedAt?: string
  notes?: string
}

export interface VerificationResult {
  isValid: boolean
  status: "genuine_first_scan" | "genuine_repeated_scan" | "invalid"
  product?: ProductItem
  record?: VerificationRecord
  message: string
  scanCount: number
  firstScannedAt?: string
  lastScannedAt?: string
}

// Built-in demo codes that are guaranteed to work out of the box
export const DEFAULT_VERIFICATION_RECORDS: VerificationRecord[] = [
  {
    code: "ATN-PW-2026-9842",
    productId: "prime-whey",
    batchNumber: "ATN-PW-B26-01",
    mfgDate: "01/2026",
    expDate: "12/2027",
    createdAt: "2026-01-15T09:00:00Z",
    scanCount: 0,
  },
  {
    code: "ATN-ALMB-2026-4410",
    productId: "anabolic-lean-muscle-builder",
    batchNumber: "ATN-ALMB-B26-02",
    mfgDate: "02/2026",
    expDate: "01/2028",
    createdAt: "2026-02-10T11:30:00Z",
    scanCount: 0,
  },
  {
    code: "ATN-ASMG-2026-7731",
    productId: "alpha-super-mass-gainer",
    batchNumber: "ATN-ASMG-B26-03",
    mfgDate: "01/2026",
    expDate: "12/2027",
    createdAt: "2026-01-20T14:15:00Z",
    scanCount: 0,
  },
]

const STORAGE_KEY = "alpha_tech_verification_records"

export function getAllVerificationRecords(): VerificationRecord[] {
  if (typeof window === "undefined") {
    return DEFAULT_VERIFICATION_RECORDS
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_VERIFICATION_RECORDS))
      return DEFAULT_VERIFICATION_RECORDS
    }
    const parsed: VerificationRecord[] = JSON.parse(raw)
    return parsed
  } catch {
    return DEFAULT_VERIFICATION_RECORDS
  }
}

export function saveVerificationRecords(records: VerificationRecord[]): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
  } catch (err) {
    console.error("Failed to save verification records to localStorage", err)
  }
}

export function generateRandomSerial(prefix = "ATN", productCode = "GEN"): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789" // avoid ambiguous 0/O and 1/I
  let randomPart = ""
  for (let i = 0; i < 4; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  const year = "2026"
  return `${prefix}-${productCode}-${year}-${randomPart}`
}

export function registerNewRecord(newRecord: Omit<VerificationRecord, "scanCount" | "createdAt">): VerificationRecord {
  const fullRecord: VerificationRecord = {
    ...newRecord,
    scanCount: 0,
    createdAt: new Date().toISOString(),
  }

  const all = getAllVerificationRecords()
  const filtered = all.filter((r) => r.code.toUpperCase() !== fullRecord.code.toUpperCase())
  filtered.unshift(fullRecord)
  saveVerificationRecords(filtered)

  return fullRecord
}

export function verifyCode(inputCode: string): VerificationResult {
  const cleanCode = (inputCode || "").trim().toUpperCase()

  if (!cleanCode) {
    return {
      isValid: false,
      status: "invalid",
      message: "Please enter a valid security or verification code.",
      scanCount: 0,
    }
  }

  const records = getAllVerificationRecords()
  const foundIndex = records.findIndex((r) => r.code.toUpperCase() === cleanCode)

  if (foundIndex === -1) {
    return {
      isValid: false,
      status: "invalid",
      message:
        "Product Verification Failed: This security code is NOT registered in our official authenticity database. Beware of counterfeit products.",
      scanCount: 0,
    }
  }

  const currentRecord = records[foundIndex]
  const product = getProductById(currentRecord.productId)

  const newScanCount = (currentRecord.scanCount || 0) + 1
  const now = new Date().toISOString()
  const firstScannedAt = currentRecord.firstScannedAt || now

  const updatedRecord: VerificationRecord = {
    ...currentRecord,
    scanCount: newScanCount,
    firstScannedAt,
    lastScannedAt: now,
  }

  records[foundIndex] = updatedRecord
  saveVerificationRecords(records)

  if (newScanCount === 1) {
    return {
      isValid: true,
      status: "genuine_first_scan",
      product,
      record: updatedRecord,
      message: "100% Genuine Alpha Tech Nutrition Certified Product. First-time authentication confirmed.",
      scanCount: newScanCount,
      firstScannedAt,
      lastScannedAt: now,
    }
  }

  return {
    isValid: true,
    status: "genuine_repeated_scan",
    product,
    record: updatedRecord,
    message: `Warning: This authentic security code has been scanned ${newScanCount} times. First scanned on ${new Date(
      firstScannedAt
    ).toLocaleDateString()} at ${new Date(firstScannedAt).toLocaleTimeString()}. If you did not scan this yourself, please contact Alpha Tech support.`,
    scanCount: newScanCount,
    firstScannedAt,
    lastScannedAt: now,
  }
}
