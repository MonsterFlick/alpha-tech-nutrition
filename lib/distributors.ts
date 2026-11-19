export interface Distributor {
  id: string
  shopName: string
  ownerName: string
  phone: string
  displayPhone: string
  whatsappPhone: string
  city: string
  district: string
  taluka: string
  pincode: string
  address: string
  landmark: string
  logo: string
  tagline: string
  badge: string
  operatingHours?: string
  googleMapsQuery?: string
}

export const AUTHORIZED_DISTRIBUTORS: Distributor[] = [
  {
    id: "dfn-bhiwandi",
    shopName: "DYNAMIC FITNESS NUTRITION (DFN)",
    ownerName: "ROSHAN GAURU THAKARE",
    phone: "+91 88882 71583",
    displayPhone: "+91 88882 71583",
    whatsappPhone: "918888271583",
    city: "Bhiwandi",
    taluka: "Bhiwandi",
    district: "Thane",
    pincode: "421302",
    address: "Dynamic Fitness Nutrition, Santkrupa Complex, Ambadi Naka, Tal - Bhiwandi, Dist - Thane, Pincode - 421302",
    landmark: "Santkrupa Complex, Ambadi Naka",
    logo: "/images/distributors/dynamic-fitness-nutrition-bhiwandi.jpg",
    tagline: "Fuel Your Strength, Define Your Power",
    badge: "Official Regional Retailer Bhiwandi",
    operatingHours: "10:00 AM - 10:00 PM (Mon - Sun)",
    googleMapsQuery: "Dynamic Fitness Nutrition Santkrupa Complex Ambadi Naka Bhiwandi 421302",
  },
  {
    id: "bajrangi-supplements-sinnar",
    shopName: "Bajrangi Supplements - The Perfect Nutrition Store",
    ownerName: "Ankit Kumavat",
    phone: "+91 74999 74503",
    displayPhone: "+91 74999 74503",
    whatsappPhone: "917499974503",
    city: "Sinnar",
    taluka: "Sinnar",
    district: "Nashik",
    pincode: "422103",
    address: "Back side of cafe 11.11, devi road, Ganesh society, Sinnar, Nashik - 422103",
    landmark: "Back side of cafe 11.11, Devi Road, Ganesh Society",
    logo: "/images/distributors/bajrangi-supplements-sinnar-nashik.png",
    tagline: "The Perfect Nutrition Store",
    badge: "Official Regional Retailer Sinnar, Nashik",
    operatingHours: "All day 10:00 AM to 8:30 PM",
    googleMapsQuery: "Bajrangi Supplements Devi Road Ganesh Society Sinnar Nashik 422103",
  },
]

/**
 * Builds direct WhatsApp order link for a specific distributor and product
 */
export function getDistributorWhatsAppUrl(
  distributor: Distributor,
  product?: { name: string; flavor?: string; weight?: string; mrp?: string; quantity?: number }
): string {
  let message = `Hello ${distributor.ownerName} / ${distributor.shopName} (${distributor.city}),\nI saw your shop listed on the official Alpha Tech Nutrition website.`

  if (product) {
    message += `\n\nI want to purchase:\n- Product: *${product.name}*`
    if (product.flavor) message += `\n- Flavor: ${product.flavor}`
    if (product.weight) message += `\n- Size: ${product.weight}`
    if (product.quantity && product.quantity > 1) message += `\n- Quantity: ${product.quantity}`
    if (product.mrp) message += `\n- Price: ${product.mrp}`
    message += `\n\nPlease confirm stock availability at your ${distributor.city} store or local delivery!`
  } else {
    message += `\n\nI would like to inquire about Alpha Tech Nutrition supplements available at your ${distributor.city} store.`
  }

  return `https://wa.me/${distributor.whatsappPhone}?text=${encodeURIComponent(message)}`
}
