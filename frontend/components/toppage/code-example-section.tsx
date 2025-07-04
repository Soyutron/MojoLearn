"use client"
import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { cn } from "@/components/toppage/utils"

const mojoCode = `from time import now

@value
struct MyPair:
  var first: Int
  var second: Int

fn main():
  let start = now()
  var my_pair = MyPair(1, 2)
  my_pair.first += 3
  print(my_pair.first)
  let end = now()
  print("elapsed:", end - start, "ns")
`

export function CodeExampleSection() {
  const [copied, setCopied] = useState(false)
  const [hoveredLine, setHoveredLine] = useState<number | null>(null)

  const handleCopy = () => {
    navigator.clipboard.writeText(mojoCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="py-24 sm:py-32 bg-[#fbfbfb]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Elegant Syntax. Powerful Features.
          </h2>
          <p className="mt-4 text-lg text-gray-600">Pythonのシンプルさとシステムの力を、一つの言語で。</p>
        </div>

        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-green-300 to-blue-300 rounded-xl blur-lg opacity-20 group-hover:opacity-40 transition duration-500"></div>
          <div className="relative bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-lg overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200/50">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                <span className="w-3 h-3 rounded-full bg-green-400"></span>
              </div>
              <button
                onClick={handleCopy}
                className="text-gray-500 hover:text-gray-800 transition-colors p-1.5 rounded-md hover:bg-gray-100"
              >
                {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
            <pre className="p-6 text-sm font-mono" onMouseLeave={() => setHoveredLine(null)}>
              {/* {mojoCode.split("\n").map((line, index) => (
                <div
                  key={index}
                  className={cn("flex transition-colors duration-200", hoveredLine === index ? "bg-primary/10" : "")}
                  onMouseEnter={() => setHoveredLine(index)}
                >
                  <span className="w-8 text-right pr-4 text-gray-400 select-none">{index + 1}</span>
                  <code dangerouslySetInnerHTML={{ __html: syntaxHighlight(line) }} />
                </div>
              ))} */}
              {mojoCode.split("\n").map((line, index) => (
                <div
                  key={index}
                  className={cn("flex transition-colors duration-200", hoveredLine === index ? "bg-primary/10" : "")}
                  onMouseEnter={() => setHoveredLine(index)}
                >
                  <span className="w-8 text-right pr-4 text-gray-400 select-none">{index + 1}</span>
                  {line.split(" ").map((word, i) => {
                    let className = "";
                    if (["from", "import", "@value", "struct", "var", "let", "fn", "print"].includes(word)) {
                      className = "text-purple-500";
                    } else if (["Int", "now"].includes(word)) {
                      className = "text-yellow-500";
                    } else if (/^\d+$/.test(word)) {
                      className = "text-blue-500";
                    } else if (/^".*"$/.test(word)) {
                      className = "text-green-600";
                    } else if (/^#/.test(word)) {
                      className = "text-gray-400";
                    }

                    return (
                      <code key={i} className={className + " mr-1"}>
                        {word}
                      </code>
                    );
                  })}
                </div>
              ))}
            </pre>
          </div>
        </div>
      </div>
    </section>
  )
}

// function syntaxHighlight(line: string) {
//   return line
//     .replace(/\b(from|import|@value|struct|var|let|fn|print)\b/g, '<span class="text-purple-500">$&</span>')
//     .replace(/\b(Int|now)\b/g, '<span class="text-yellow-500">$&</span>')
//     .replace(/(\d+)/g, '<span class="text-blue-500">$&</span>')
//     .replace(/(".*?")/g, '<span class="text-green-600">$&</span>')
//     .replace(/(#.*)/g, '<span class="text-gray-400">$&</span>')
// }
