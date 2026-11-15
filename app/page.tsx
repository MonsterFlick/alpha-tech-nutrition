import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { FlavorCarousel } from "@/components/flavor-carousel"
import { BentoGrid } from "@/components/bento-grid"
import { ActivationsSection } from "@/components/activations-section"
import { BlogPreviewSection } from "@/components/blog-preview-section"
import { SocialSection } from "@/components/social-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden w-full">
      <Navigation />
      <HeroSection />
      <FlavorCarousel />
      <BentoGrid />
      <div className="content-auto">
        <ActivationsSection />
      </div>
      <div className="content-auto">
        <BlogPreviewSection />
      </div>
      <div className="content-auto">
        <SocialSection />
      </div>
      <Footer />
    </main>
  )
}
