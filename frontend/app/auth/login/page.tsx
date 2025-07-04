import { MojoLoginForm } from "@/components/login/mojo-login-form"

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gray-50 p-4">
      {/* Background Glow Effects */}
      <div className="absolute top-[-20%] left-[-20%] h-[400px] w-[400px] animate-pulse rounded-full bg-blue-400/10 blur-[120px] duration-[5000ms]" />
      <div className="absolute bottom-[-20%] right-[-20%] h-[400px] w-[400px] animate-pulse rounded-full bg-green-400/10 blur-[120px] duration-[7000ms]" />

      <MojoLoginForm />
    </main>
  )
}
