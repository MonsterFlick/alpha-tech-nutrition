export const WHATSAPP_PHONE = "8380889935"
export const WHATSAPP_COUNTRY_CODE = "91"
export const WHATSAPP_DISPLAY_PHONE = "+91 83808 89935"
export const INSTAGRAM_HANDLE = "alphatech_nutrition"
export const INSTAGRAM_URL = "https://www.instagram.com/alphatech_nutrition"
export const FSSAI_LICENSE = "21524018000384"

interface OrderDetails {
  name: string
  sku?: string
  flavor?: string
  weight?: string
  mrp?: string
  quantity?: number
}

/**
 * Builds the direct WhatsApp Click-to-Chat URL with custom pre-filled message
 */
export function getWhatsAppOrderUrl({
  name,
  sku,
  flavor = "Belgian Chocolate",
  weight,
  mrp,
  quantity = 1,
}: OrderDetails): string {
  const lines = [
    `🔥 *ORDER INQUIRY - ALPHA TECH NUTRITION* 🔥`,
    ``,
    `Hello! I want to order the following product:`,
    `• *Product:* ${name}`,
    sku ? `• *SKU:* ${sku}` : null,
    `• *Flavor:* ${flavor}`,
    weight ? `• *Size / Net Wt:* ${weight}` : null,
    `• *Quantity:* ${quantity}`,
    mrp ? `• *Price (MRP):* ${mrp}` : null,
    ``,
    `Please share payment options (UPI/Card/COD) and estimated express delivery timeline.`,
    ``,
    `*My Details:*`,
    `Name: `,
    `Delivery Address: `,
    `City & Pincode: `,
  ]
    .filter((line) => line !== null)
    .join("\n")

  const encoded = encodeURIComponent(lines)
  return `https://wa.me/${WHATSAPP_COUNTRY_CODE}${WHATSAPP_PHONE}?text=${encoded}`
}

/**
 * WhatsApp URL for consultation or custom supplement guidance
 */
export function getWhatsAppConsultationUrl(context = "general"): string {
  let message = `Hello Alpha Tech Nutrition! I'd like to get expert guidance on choosing the right supplement for my fitness goals.`
  if (context === "authenticity") {
    message = `Hello Alpha Tech Nutrition! I have a question regarding product authenticity verification (FSSAI Lic. ${FSSAI_LICENSE}).`
  } else if (context === "bulk") {
    message = `Hello Alpha Tech Nutrition! I am interested in wholesale / gym distribution / partnership opportunities.`
  }

  return `https://wa.me/${WHATSAPP_COUNTRY_CODE}${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`
}
