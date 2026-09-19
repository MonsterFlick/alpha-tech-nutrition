import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Packaging Security Suite (Authorized Access Only)",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
}

export default function QRGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
