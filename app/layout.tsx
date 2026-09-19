import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { LenisProvider } from "@/components/lenis-provider"
import ClickSpark from "@/components/click-spark"
import "./globals.css"

const _inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const _jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Alpha Tech Nutrition | Premium Gym & Sports Supplements",
  description: "Fuel your gains with Alpha Tech Nutrition. Premium gym supplements including Prime Whey, Anabolic Lean Muscle Builder, and Alpha Super Mass Gainer.",
  keywords: ["Alpha Tech Nutrition", "prime whey", "anabolic lean muscle builder", "alpha super mass gainer", "gym supplements", "protein powder", "muscle recovery"],
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#AFFF00",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <ClickSpark
          sparkColor="#AFFF00"
          sparkSize={12}
          sparkRadius={20}
          sparkCount={8}
          duration={400}
          easing="ease-out"
        >
          <LenisProvider>{children}</LenisProvider>
        </ClickSpark>
        <Analytics />
      </body>
    </html>
  )
}
