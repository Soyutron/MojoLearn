import MojoSignupForm from "@/components/signup/mojo-signup-form"

export default function Home() {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-gray-50 p-4">
      {/* Background decorative elements */}
      <div className="absolute -top-1/2 left-0 -z-10 h-[1200px] w-full">
        <div className="absolute inset-x-0 top-0 h-[500px] w-full rounded-full bg-[radial-gradient(circle_farthest-side_at_50%_0,rgba(0,128,255,0.05),rgba(255,255,255,0))]"></div>
      </div>
      <div className="absolute -bottom-1/2 right-0 -z-10 h-[1200px] w-full">
        <div className="absolute inset-x-0 bottom-0 h-[500px] w-full rounded-full bg-[radial-gradient(circle_farthest-side_at_50%_100%,rgba(50,205,50,0.06),rgba(255,255,255,0))]"></div>
      </div>

      <MojoSignupForm />
    </main>
  )
}
