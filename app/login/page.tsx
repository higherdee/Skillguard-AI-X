"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Shield, Chrome } from "lucide-react"
import { signInWithGoogle } from "@/lib/auth"
import { useAuth } from "@/hooks/use-auth"
import { useTheme } from "@/contexts/theme-context"

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { user } = useAuth()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    if (user) {
      router.push("/dashboard")
    }
  }, [user, router])

  const handleGoogleLogin = async () => {
    setLoading(true)
    setError("")

    try {
      await signInWithGoogle()
    } catch (error: any) {
      console.error("Login error:", error)
      setError("Failed to sign in with Google. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Theme Toggle */}
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>

        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-3 p-4 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10">
            <Shield className="w-8 h-8 text-blue-600 dark:text-cyan-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400 bg-clip-text text-transparent">
              SkillGuard AI X
            </span>
          </div>
        </div>

        {/* Login Form */}
        <div className="relative p-8 rounded-3xl bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 dark:from-cyan-500/10 dark:to-purple-500/10 rounded-3xl"></div>

          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-center mb-8">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400 bg-clip-text text-transparent">
                Welcome Back
              </span>
            </h1>

            <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
              Sign in with your Google account to continue your learning journey
            </p>

            {error && (
              <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-500/30 rounded-lg text-red-700 dark:text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Google Login */}
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center space-x-3 py-4 mb-6 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-xl hover:bg-gray-50 dark:hover:bg-white/20 transition-all duration-300 disabled:opacity-50 shadow-lg"
            >
              <Chrome className="w-5 h-5 text-gray-700 dark:text-white" />
              <span className="text-gray-700 dark:text-white font-medium">
                {loading ? "Signing in..." : "Continue with Google"}
              </span>
            </button>

            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              By signing in, you agree to our{" "}
              <Link href="/terms" className="text-blue-600 dark:text-cyan-400 hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-blue-600 dark:text-cyan-400 hover:underline">
                Privacy Policy
              </Link>
            </div>

            {/* Back to Home */}
            <div className="text-center mt-8">
              <Link
                href="/"
                className="text-blue-600 dark:text-cyan-400 hover:text-blue-700 dark:hover:text-cyan-300 font-medium transition-colors"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
