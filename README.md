# Alpha Tech Nutrition

High-performance gym and sports supplements landing page with built-in **Anti-Counterfeit QR Verification Portal** and **Factory Packaging Asset Suite**.

![Alpha Tech Nutrition](/public/images/image.png)

---

## Key Features

### 🏋️ Supplement Showcase & High-Performance UI
- **Interactive Product Showcase**: High-resolution showcases for:
  - **Prime Whey** (100% Ultra-Filtered Whey Protein Concentrate • 24G Protein • 6.8G BCAA)
  - **Anabolic Lean Muscle Builder** (Strength & Hypertrophy Matrix • 18G Protein • 3G Creatine)
  - **Alpha Super Mass Gainer** (Clean Caloric Density Matrix • 18G Protein • 4.3G BCAA)
- **Lenis Smooth Scrolling**: Ultra-fluid momentum scrolling.
- **Framer Motion Micro-Interactions**: Spring-based parallax, staggered reveals, and magnetic hover effects.
- **Interactive Click Sparks**: Custom particle bursts on user interactions.
- **Bento Grid & Nutrition Science**: Highlighting certified formulas, third-party lab clearance, and quality standards.

### 🛡️ Product Authenticity Verification Portal (`/verify`)
- **Instant Scan & Verify**: Scanning a product QR sticker automatically routes to `/verify?code=ATN-XXXX-XXXX` and verifies product integrity.
- **Digital Certificate of Authenticity**:
  - 100% Certified Genuine badge with electric lime neon glow.
  - Verified batch number, manufacturing date, and expiry date.
  - Certified Third-Party Lab Reports (Protein Purity %, Heavy Metals Clear, WADA Doping Negative, Pathogen Free).
- **Anti-Counterfeit Protection**:
  - **1st Scan**: Confirms first-time authentic unboxing (*"Scan #1 (Original)"*).
  - **Repeated Scan Alert**: Warns customers if a genuine code was already authenticated before, displaying the first-scan timestamp to detect refilled or cloned counterfeit tubs.
  - **Invalid / Counterfeit Warning**: Immediate alert if an unknown code is scanned, with direct vendor report link.

### 🖨️ Packaging QR Suite & Asset Kit (`/qr-generator`)
- **Restricted Access**: Password-protected gate for authorized factory staff and brand administrators (Default passcode: `alphatech2026`).
- **One Locked Permanent QR per Product**:
  - Prime Whey: `ATN-PW-2026-0001`
  - Anabolic Lean Muscle Builder: `ATN-ALMB-2026-0002`
  - Alpha Super Mass Gainer: `ATN-ASMG-2026-0003`
- **All-in-One Asset Kit in Single ZIP**:
  - `01_Transparent_QR.png`: Transparent background for pouch & tub overlay design.
  - `02_Transparent_NeonLime_QR.png`: Electric lime transparent PNG for dark packaging.
  - `03_Packaging_Sticker_Card.png`: White rounded card with product name stamped at the bottom.
  - `04_Print_Ready_Monochrome.png`: High-contrast 100% black on white for thermal label printers.
  - `05_Vector_Packaging_Master.svg`: Scalable vector master for prepress / Adobe Illustrator.
  - `06_Authentication_Credentials.txt`: Complete specification and lab clearance text sheet.

---

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **Language**: TypeScript (Strict type safety, 0 errors)
- **Styling**: Tailwind CSS v4 & Lucide Icons
- **Animations**: Framer Motion & Lenis Scroll
- **QR Engine**: Custom Aesthetic Vector Engine (`lib/aesthetic-qr.ts`)
- **Asset Packaging**: JSZip

---

## Getting Started

### Prerequisites
- Node.js 18+ or 20+
- npm, pnpm, or yarn

### Installation
```bash
git clone https://github.com/MonsterFlick/alpha-tech-nutrition.git
cd alpha-tech-nutrition
npm install
```

### Running Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Key Routes
- **Storefront**: `http://localhost:3000/`
- **Verification Portal**: `http://localhost:3000/verify`
- **Sample Verification Check**: `http://localhost:3000/verify?code=ATN-PW-2026-0001`
- **Packaging QR Suite**: `http://localhost:3000/qr-generator` (Passcode: `alphatech2026`)

### Production Build & Type-Check
```bash
# Verify TypeScript types
npm run type-check

# Build for production
npm run build

# Start production server
npm run start
```

---

## SEO & Security Architecture

- **Robots.txt** (`/robots.txt`): Allows public storefront and `/verify`, explicitly disallows crawlers from `/qr-generator`.
- **Sitemap** (`/sitemap.xml`): Automatically generated dynamic sitemap for search engines.
- **JSON-LD Schema**: Embedded Organization and WebSite structured data for rich Google search results.

---

## License
Private and Proprietary — Alpha Tech Nutrition.
