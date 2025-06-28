import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { CodeExampleSection } from "@/components/code-example-section"
import { FeaturesSection } from "@/components/features-section"
import { Footer } from "@/components/footer"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fbfbfb] overflow-x-hidden">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <CodeExampleSection />
      </main>
      <Footer />
    </div>
  )
}
