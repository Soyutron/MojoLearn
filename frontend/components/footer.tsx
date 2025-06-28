import { Flame, Github, Twitter, MessageSquare } from "lucide-react"
import Link from "next/link"

export function Footer() {
  const sections = [
    {
      title: "Product",
      links: ["Why Mojo?", "Docs", "Blog", "Get Started"],
    },
    {
      title: "Community",
      links: ["Discord", "GitHub", "Discussions", "Events"],
    },
    {
      title: "Company",
      links: ["About Us", "Careers", "Contact", "Media Kit"],
    },
    {
      title: "Legal",
      links: ["Privacy Policy", "Terms of Service", "Trademark Policy"],
    },
  ]

  return (
    <footer className="bg-white border-t border-gray-200/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold">
              <Flame className="w-6 h-6 text-primary" style={{ color: "#98F576" }} />
              <span className="text-gray-900">Mojo</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600">The language for next-generation AI developers.</p>
          </div>
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-gray-900">{section.title}</h3>
              <ul className="mt-4 space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 pt-8 border-t border-gray-200/80 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Modular, Inc. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <Link href="#" className="text-gray-500 hover:text-gray-800">
              <Twitter className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-800">
              <Github className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-800">
              <MessageSquare className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
