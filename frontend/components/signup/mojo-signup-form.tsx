"use client"

import type React from "react"

import { useState, useMemo, useEffect } from "react"
import { Button } from "@/components/signup/ui/button"
import { Input } from "@/components/signup/ui/input"
import { Eye, EyeOff, CheckCircle2, XCircle, Github, Mail, Lock } from "lucide-react"
import { cn } from "@/lib/utils"

// Google Icon SVG as a component for clean usage
const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px" {...props}>
    <path
      fill="#FFC107"
      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
    />
    <path
      fill="#FF3D00"
      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
    />
    <path
      fill="#4CAF50"
      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
    />
    <path
      fill="#1976D2"
      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C41.38,34.42,44,29.561,44,24C44,22.659,43.862,21.35,43.611,20.083z"
    />
  </svg>
)

export default function MojoSignupForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const passwordValidation = useMemo(() => {
    return {
      length: password.length >= 8,
      match: password !== "" && password === confirmPassword,
    }
  }, [password, confirmPassword])

  const isFormValid = useMemo(() => {
    return email.includes("@") && passwordValidation.length && passwordValidation.match
  }, [email, passwordValidation])

  return (
    <div
      className={cn(
        "w-full max-w-md p-8 space-y-8 rounded-2xl transition-all duration-1000",
        "bg-white/80 backdrop-blur-xl border border-gray-200/50 shadow-2xl shadow-gray-900/5",
        isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
      )}
    >
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Create your account</h1>
        <p className="mt-2 text-sm text-gray-600">The first step into the Mojo Learning Platform.</p>
      </div>

      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="email"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 pl-10 bg-gray-50/50 border-gray-300/70 focus:border-blue-400/50 text-gray-800 placeholder:text-gray-400 rounded-lg focus-visible:ring-offset-0 focus-visible:ring-2 focus-visible:ring-blue-400/30 transition-colors"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-12 pl-10 pr-10 bg-gray-50/50 border-gray-300/70 focus:border-blue-400/50 text-gray-800 placeholder:text-gray-400 rounded-lg focus-visible:ring-offset-0 focus-visible:ring-2 focus-visible:ring-blue-400/30 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="h-12 pl-10 pr-10 bg-gray-50/50 border-gray-300/70 focus:border-blue-400/50 text-gray-800 placeholder:text-gray-400 rounded-lg focus-visible:ring-offset-0 focus-visible:ring-2 focus-visible:ring-blue-400/30 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {(password || confirmPassword) && (
          <div className="space-y-2 text-xs pt-2">
            <div
              className={cn(
                "flex items-center transition-colors",
                passwordValidation.length ? "text-emerald-600" : "text-red-500",
              )}
            >
              {passwordValidation.length ? (
                <CheckCircle2 className="h-4 w-4 mr-2 flex-shrink-0" />
              ) : (
                <XCircle className="h-4 w-4 mr-2 flex-shrink-0" />
              )}
              At least 8 characters
            </div>
            {confirmPassword && (
              <div
                className={cn(
                  "flex items-center transition-colors",
                  passwordValidation.match ? "text-emerald-600" : "text-red-500",
                )}
              >
                {passwordValidation.match ? (
                  <CheckCircle2 className="h-4 w-4 mr-2 flex-shrink-0" />
                ) : (
                  <XCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                )}
                Passwords match
              </div>
            )}
          </div>
        )}

        <Button
          type="submit"
          className="w-full h-12 text-base font-semibold transition-all duration-300 bg-gray-900 text-white hover:bg-gray-800 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed"
          disabled={!isFormValid}
        >
          Create Account
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white/80 px-2 text-gray-500 backdrop-blur-sm">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Button
          variant="outline"
          className="h-12 bg-white/50 border-gray-300/70 hover:bg-gray-100/50 text-gray-700 transition-colors"
        >
          <GoogleIcon className="mr-2 h-5 w-5" />
          Google
        </Button>
        <Button
          variant="outline"
          className="h-12 bg-white/50 border-gray-300/70 hover:bg-gray-100/50 text-gray-700 transition-colors"
        >
          <Github className="mr-2 h-5 w-5" />
          GitHub
        </Button>
      </div>

      <div className="text-center text-sm text-gray-500">
        Already have an account?{" "}
        <a
          href="#"
          className="font-medium text-blue-600 hover:text-blue-500 underline-offset-4 hover:underline transition-colors"
        >
          Log in
        </a>
      </div>
    </div>
  )
}
