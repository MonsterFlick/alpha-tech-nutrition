"use client"

import { useState } from "react"
import Image from "next/image"
import { CheckCircle2 } from "lucide-react"

interface ProductGalleryProps {
  gallery: string[]
  name: string
  category: string
}

export function ProductGallery({ gallery, name, category }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const currentSrc = gallery[selectedImage] || gallery[0]

  return (
    <div className="space-y-4">
      {/* Main Showcase Image Container */}
      <div className="bg-[#0D122B] border-2 border-blue-950/80 rounded-3xl p-6 sm:p-8 relative flex items-center justify-center shadow-2xl overflow-hidden min-h-[380px] sm:min-h-[440px]">
        {/* Floating Badges */}
        <div className="absolute top-4 left-4 z-20 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
          {category}
        </div>

        <div className="absolute top-4 right-4 z-20 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5" /> 100% Verified Label
        </div>

        {/* Ambient Glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-transparent to-indigo-600/10 pointer-events-none" />

        {/* Main Display Image */}
        <div className="my-2 relative w-full aspect-square max-w-md flex items-center justify-center">
          <Image
            key={currentSrc}
            src={currentSrc}
            alt={`${name} View ${selectedImage + 1}`}
            width={460}
            height={460}
            priority
            className="object-contain max-h-[380px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] transition-all duration-300"
          />
        </div>
      </div>

      {/* Gallery Thumbnails List */}
      {gallery.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {gallery.map((imgSrc, idx) => (
            <button
              key={imgSrc + idx}
              type="button"
              onClick={() => setSelectedImage(idx)}
              className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl p-2 bg-[#0D122B] border-2 transition-all cursor-pointer shrink-0 ${
                selectedImage === idx
                  ? "border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] scale-105"
                  : "border-white/10 opacity-70 hover:opacity-100 hover:border-white/30"
              }`}
            >
              <Image
                src={imgSrc}
                alt={`${name} Thumbnail ${idx + 1}`}
                fill
                className="object-contain p-1"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
