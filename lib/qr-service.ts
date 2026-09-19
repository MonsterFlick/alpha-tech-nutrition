import QRCode from "qrcode"

export interface QROptions {
  width?: number
  margin?: number
  darkColor?: string
  lightColor?: string
}

export async function generateQRCodeDataUrl(
  text: string,
  options: QROptions = {}
): Promise<string> {
  const {
    width = 512,
    margin = 2,
    darkColor = "#000000",
    lightColor = "#ffffff",
  } = options

  return QRCode.toDataURL(text, {
    width,
    margin,
    color: {
      dark: darkColor,
      light: lightColor,
    },
    errorCorrectionLevel: "H", // High error correction allows center logos/durability
  })
}

export async function generateQRCodeSvg(
  text: string,
  options: QROptions = {}
): Promise<string> {
  const {
    width = 512,
    margin = 2,
    darkColor = "#000000",
    lightColor = "#ffffff",
  } = options

  return QRCode.toString(text, {
    type: "svg",
    width,
    margin,
    color: {
      dark: darkColor,
      light: lightColor,
    },
    errorCorrectionLevel: "H",
  })
}

export function getVerificationUrl(code: string, origin?: string): string {
  const base = origin || (typeof window !== "undefined" ? window.location.origin : "https://alphatechnutrition.com")
  return `${base}/verify?code=${encodeURIComponent(code)}`
}
