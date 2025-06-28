"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Flame } from "lucide-react"
import { cn } from "@/lib/utils"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/80 backdrop-blur-lg border-b border-gray-200/50" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <Flame className="w-6 h-6 text-primary-dark" style={{ color: "#98F576" }} />
            <span className="text-gray-900">Mojo</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Docs
            </Link>
            <Link href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Why Mojo
            </Link>
            <Link href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Community
            </Link>
            <Link href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Blog
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="hidden md:inline-flex">
              Sign In
            </Button>
            <Button size="sm" className="hidden md:inline-flex bg-gray-800 hover:bg-gray-900 text-white">
              Get Started
            </Button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg pb-4">
          <nav className="flex flex-col items-center gap-4 pt-4">
            <Link href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Docs
            </Link>
            <Link href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Why Mojo
            </Link>
            <Link href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Community
            </Link>
            <Link href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Blog
            </Link>
            <div className="flex flex-col gap-2 w-full px-4 pt-2">
              <Button variant="outline" className="w-full bg-transparent">
                Sign In
              </Button>
              <Button className="w-full bg-gray-800 hover:bg-gray-900 text-white">Get Started</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
