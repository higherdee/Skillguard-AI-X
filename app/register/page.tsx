"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Shield, Chrome, CheckCircle } from "lucide-react"
import { signInWithGoogle, sendWelcomeEmail } from "@/lib/auth"
import { useAuth } from "@/hooks/use-auth"
import { useTheme } from "@/contexts/theme-context"

export default function RegisterPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  const router = useRouter()
  const { user } = useAuth()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    if (user && !showSuccess) {
      // Send welcome email when user registers
      const sendWelcome = async () => {
        try {
          await sendWelcomeEmail(user.email!, user.user_metadata?.full_name || user.email!)
          setShowSuccess(true)

          // Redirect to dashboard after showing success message
          setTimeout(() => {
            router.push("/dashboard")
          }, 3000)
        } catch (error) {
          console.error("Error sending welcome email:", error)
          router.push("/dashboard")
        }
      }

      sendWelcome()
    }
  }, [user, router, showSuccess])

  const handleGoogleRegister = async () => {
    setLoading(true)
    setError("")

    try {
      await signInWithGoogle()
    } catch (error: any) {
      console.error("Registration error:", error)
      setError("Failed to register with Google. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="relative p-8 rounded-3xl bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 dark:from-green-500/10 dark:to-emerald-500/10 rounded-3xl"></div>

            <div className="relative z-10 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>

              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Welcome to SkillGuard AI X!</h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Your account has been created successfully. A welcome email has been sent to your Gmail account with
                getting started information.
              </p>

              <div className="text-sm text-gray-500 dark:text-gray-400">
                Redirecting to your dashboard in a few seconds...
              </div>
            </div>
          </div>
        </div>
      </div>
    )
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

        {/* Register Form */}
        <div className="relative p-8 rounded-3xl bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 dark:from-purple-500/10 dark:to-pink-500/10 rounded-3xl"></div>

          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-center mb-8">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                Join SkillGuard AI X
              </span>
            </h1>

            <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
              Create your account with Google and start your AI-powered learning journey
            </p>

            {error && (
              <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-500/30 rounded-lg text-red-700 dark:text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Google Register */}
            <button
              onClick={handleGoogleRegister}
              disabled={loading}
              className="w-full flex items-center justify-center space-x-3 py-4 mb-6 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-xl hover:bg-gray-50 dark:hover:bg-white/20 transition-all duration-300 disabled:opacity-50 shadow-lg"
            >
              <Chrome className="w-5 h-5 text-gray-700 dark:text-white" />
              <span className="text-gray-700 dark:text-white font-medium">
                {loading ? "Creating account..." : "Continue with Google"}
              </span>
            </button>

            <div className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">
              By creating an account, you agree to our{" "}
              <Link href="/terms" className="text-purple-600 dark:text-purple-400 hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-purple-600 dark:text-purple-400 hover:underline">
                Privacy Policy
              </Link>
            </div>

            {/* Benefits */}
            <div className="space-y-3 mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white">What you'll get:</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>AI-powered personalized learning paths</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Blockchain-verified certificates</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>24/7 AI mentor support</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Enterprise-grade security</span>
                </li>
              </ul>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <span className="text-gray-600 dark:text-gray-400">Already have an account? </span>
              <Link
                href="/login"
                className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors"
              >
                Sign in
              </Link>
            </div>

            {/* Back to Home */}
            <div className="text-center mt-6">
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
