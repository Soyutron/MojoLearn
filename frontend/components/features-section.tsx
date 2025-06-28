import { Zap, Cpu, Scale } from "lucide-react"

const features = [
  {
    icon: <Zap className="w-8 h-8 text-primary" style={{ color: "#98F576" }} />,
    title: "Unmatched Performance",
    description:
      "Pythonの使いやすさとCのパフォーマンスを両立。Mojoは既存のPythonエコシステムを活用しつつ、最大68,000倍の高速化を実現します。",
  },
  {
    icon: <Cpu className="w-8 h-8 text-primary" style={{ color: "#98F576" }} />,
    title: "AI Hardware Programmability",
    description:
      "MojoはMLIRをベースに構築されており、CPU、GPU、AIアクセラレータなど、多様なハードウェアで最高のパフォーマンスを引き出します。",
  },
  {
    icon: <Scale className="w-8 h-8 text-primary" style={{ color: "#98F576" }} />,
    title: "Scalable Systems",
    description:
      "静的型付けとコンパイル時メタプログラミングにより、大規模で信頼性の高いシステムを構築できます。Pythonの動的な柔軟性も維持します。",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            The next generation of programming.
          </h2>
          <p className="mt-4 text-lg text-gray-600">Mojoは、AI開発の新たなスタンダードを築くために設計されました。</p>
        </div>
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10">
                {feature.icon}
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-base text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
