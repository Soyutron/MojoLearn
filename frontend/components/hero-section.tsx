import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="glow-effect" />
      <div className="relative z-10 text-center px-4 animate-fade-in-up">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900">
          Mojo — AI時代をリードする言語
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Simple. Blazing Fast. Built for the Future.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-4">
          <Button size="lg" className="bg-gray-900 hover:bg-gray-700 text-white shadow-lg">
            Get Started for Free
          </Button>
          <Button size="lg" variant="outline" className="bg-white/50 backdrop-blur-sm">
            Discover Mojo
          </Button>
        </div>
      </div>
    </section>
  )
}
