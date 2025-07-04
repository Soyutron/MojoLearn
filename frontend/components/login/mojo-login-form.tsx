"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/login/ui/button"
import { Input } from "@/components/login/ui/input"
import { Label } from "@/components/login/ui/label"
import { Eye, EyeOff, CheckCircle2, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { GoogleIcon, GitHubIcon } from "@/components/login/icons"

export function MojoLoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const isPasswordValid = useMemo(() => password.length >= 8, [password])
  // A simple email validation for demonstration
  const isEmailValid = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), [email])

  const isFormSubmittable = isPasswordValid && isEmailValid

  return (
    <div className="w-full max-w-md animate-in fade-in-50 slide-in-from-bottom-10 rounded-2xl border border-white/30 bg-white/20 p-8 shadow-2xl backdrop-blur-xl duration-700 sm:p-10">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Welcome back</h1>
        <p className="text-sm text-gray-600">Sign in to your Mojo account to continue.</p>
      </div>

      <div className="mt-10 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email" className="sr-only">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 border-x-0 border-t-0 border-b-gray-300/50 bg-transparent text-base ring-offset-transparent transition-colors duration-300 placeholder:text-gray-500 focus:border-b-blue-400 focus-visible:ring-0 focus-visible:ring-offset-0"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="sr-only">
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={cn(
                "h-12 border-x-0 border-t-0 border-b-gray-300/50 bg-transparent pr-12 text-base ring-offset-transparent transition-colors duration-300 placeholder:text-gray-500 focus:border-b-blue-400 focus-visible:ring-0 focus-visible:ring-offset-0",
                password.length > 0 && !isPasswordValid && "border-b-red-400/70 focus:border-b-red-500",
                isPasswordValid && "border-b-green-400/70 focus:border-b-green-500",
              )}
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 h-9 w-9 -translate-y-1/2 text-gray-500 hover:bg-gray-500/10"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </Button>
          </div>
          <div className="min-h-[24px] flex items-center text-xs">
          {password.length > 0 && (
            <div className={cn("mt-2 flex items-center text-xs", isPasswordValid ? "text-green-600" : "text-red-500")}>
              {isPasswordValid ? <CheckCircle2 className="mr-1.5 h-4 w-4" /> : <XCircle className="mr-1.5 h-4 w-4" />}
              <span>パスワードは8文字以上です</span>
            </div>
          )}
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-12 text-base font-semibold bg-gray-900 text-white transition-all duration-300 hover:bg-gray-800 hover:shadow-lg hover:shadow-blue-500/20 disabled:bg-gray-300 disabled:text-gray-500 disabled:shadow-none"
          disabled={!isFormSubmittable}
        >
          Sign In
        </Button>
      </div>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-300/50" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-gray-50/50 px-2 text-gray-500 backdrop-blur-sm">または</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Button
          variant="outline"
          className="h-12 border-gray-300/50 bg-white/50 text-gray-700 transition-all duration-300 hover:border-gray-400/80 hover:bg-white/70 hover:shadow-md hover:shadow-black/5"
        >
          <GoogleIcon className="mr-2 h-5 w-5" />
          Googleでログイン
        </Button>
        <Button
          variant="outline"
          className="h-12 border-gray-300/50 bg-white/50 text-gray-700 transition-all duration-300 hover:border-gray-400/80 hover:bg-white/70 hover:shadow-md hover:shadow-black/5"
        >
          <GitHubIcon className="mr-2 h-5 w-5" />
          GitHubでログイン
        </Button>
      </div>

      <div className="mt-8 text-center text-sm">
        <Link href="#" className="text-gray-600 transition-colors hover:text-gray-900 hover:underline">
          パスワードを忘れた場合
        </Link>
      </div>
    </div>
  )
}
