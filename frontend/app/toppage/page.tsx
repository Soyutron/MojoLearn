import { Header } from "@/components/toppage/header"
import { HeroSection } from "@/components/toppage/hero-section"
import { CodeExampleSection } from "@/components/toppage/code-example-section"
import { FeaturesSection } from "@/components/toppage/features-section"
import { Footer } from "@/components/toppage/footer"

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
