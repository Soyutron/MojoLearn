import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Mojo — The language for AI developers",
  description: "Simple. Blazing Fast. Built for the Future.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className="scroll-smooth">
      <body className={cn(GeistSans.variable, GeistMono.variable, "font-sans bg-white text-gray-800 antialiased")}>
        {children}
      </body>
    </html>
  )
}
