"use client"

import Link from "next/link"
import { Shield, Brain, Award, Users, ArrowRight, Zap, Lock, Globe } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"

export default function HomePage() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="relative z-20 px-6 py-4">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-blue-600 dark:text-cyan-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400 bg-clip-text text-transparent">
              SkillGuard AI X
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
            <Link
              href="/login"
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-cyan-500 dark:to-purple-500 text-white rounded-lg hover:scale-105 transition-all duration-300"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-8">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400 bg-clip-text text-transparent">
              Master Skills
            </span>
            <br />
            <span className="text-gray-900 dark:text-white">with AI Power</span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Transform your learning journey with AI-powered mentorship, blockchain-verified certificates, and
            enterprise-grade cybersecurity protection.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-cyan-500 dark:to-purple-500 text-white rounded-xl font-bold text-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Start Learning</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 border-2 border-gray-300 dark:border-white/20 text-gray-900 dark:text-white rounded-xl font-bold text-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
            Why Choose SkillGuard AI X?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "AI-Powered Learning",
                description:
                  "Personalized learning paths with intelligent AI mentors that adapt to your pace and style.",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: Award,
                title: "Blockchain Certificates",
                description: "Earn verifiable certificates stored on Algorand blockchain for lifetime credibility.",
                color: "from-purple-500 to-pink-500",
              },
              {
                icon: Lock,
                title: "Enterprise Security",
                description: "Military-grade cybersecurity protection with VPN and threat monitoring.",
                color: "from-green-500 to-emerald-500",
              },
              {
                icon: Users,
                title: "Expert Community",
                description: "Connect with industry experts and peers in our exclusive learning community.",
                color: "from-orange-500 to-red-500",
              },
              {
                icon: Zap,
                title: "Real-time Mentoring",
                description: "Get instant help with voice and video calls from AI tutors and human experts.",
                color: "from-yellow-500 to-orange-500",
              },
              {
                icon: Globe,
                title: "Global Recognition",
                description: "Certificates recognized by top companies and institutions worldwide.",
                color: "from-indigo-500 to-purple-500",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 hover:bg-white/70 dark:hover:bg-white/10 transition-all duration-300"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 rounded-3xl bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-cyan-500/10 dark:to-purple-500/10 border border-blue-200 dark:border-white/10">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Ready to Transform Your Future?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Join thousands of learners who are already mastering new skills with AI guidance.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-cyan-500 dark:to-purple-500 text-white rounded-xl font-bold text-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
            >
              <span>Start Your Journey</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 border-t border-gray-200 dark:border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Shield className="w-6 h-6 text-blue-600 dark:text-cyan-400" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">SkillGuard AI X</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            © 2024 SkillGuard AI X. All rights reserved. Empowering learners worldwide.
          </p>
        </div>
      </footer>
    </div>
  )
}
