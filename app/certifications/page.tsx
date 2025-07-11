"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { TopNav } from "@/components/top-nav"
import { Award, Shield, CheckCircle, Clock, Star, Globe } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

export default function CertificationsPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [selectedCert, setSelectedCert] = useState<any>(null)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 dark:border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading certificates...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  // Mock certificates - new users start with none
  const certificates = [
    // Empty array for new users - they need to earn certificates first
  ]

  const availableCertifications = [
    {
      id: 1,
      title: "React Development Fundamentals",
      description: "Complete the React course and pass the final assessment",
      requirements: ["Complete 24 lessons", "Pass final quiz (80%+)", "Build capstone project"],
      estimatedTime: "8-10 hours",
      difficulty: "Beginner",
      reward: "50 ALGO tokens",
      icon: "⚛️",
      color: "from-blue-600 to-cyan-600 dark:from-blue-500 dark:to-cyan-500",
      progress: 0,
      locked: false,
    },
    {
      id: 2,
      title: "UI/UX Design Principles",
      description: "Master design fundamentals and create portfolio projects",
      requirements: ["Complete 18 lessons", "Submit 3 design projects", "Peer review participation"],
      estimatedTime: "6-8 hours",
      difficulty: "Beginner",
      reward: "40 ALGO tokens",
      icon: "🎨",
      color: "from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500",
      progress: 0,
      locked: false,
    },
    {
      id: 3,
      title: "Machine Learning Specialist",
      description: "Advanced ML concepts and practical implementation",
      requirements: ["Complete 32 lessons", "Build ML model", "Research paper summary"],
      estimatedTime: "12-15 hours",
      difficulty: "Intermediate",
      reward: "100 ALGO tokens",
      icon: "🤖",
      color: "from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400",
      progress: 0,
      locked: true,
    },
    {
      id: 4,
      title: "Cybersecurity Expert",
      description: "Comprehensive security practices and threat analysis",
      requirements: ["Complete 20 lessons", "Security audit project", "Vulnerability assessment"],
      estimatedTime: "7-9 hours",
      difficulty: "Intermediate",
      reward: "75 ALGO tokens",
      icon: "🛡️",
      color: "from-red-600 to-pink-600 dark:from-red-500 dark:to-pink-500",
      progress: 0,
      locked: true,
    },
  ]

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 lg:ml-0">
        <TopNav />

        <main className="p-6 space-y-8 overflow-y-auto h-[calc(100vh-4rem)]">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">🏆 Your Certificates</h1>
              <p className="text-gray-600 dark:text-gray-400">Blockchain-verified credentials powered by Algorand</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="px-4 py-2 bg-gradient-to-r from-green-600/10 to-emerald-600/10 dark:from-green-500/10 dark:to-emerald-500/10 border border-green-200 dark:border-green-500/30 rounded-xl">
                <span className="text-sm font-medium text-green-700 dark:text-green-400">
                  💎 {certificates.length} Certificates Earned
                </span>
              </div>
            </div>
          </div>

          {/* Empty State for New Users */}
          {certificates.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-cyan-500/10 dark:to-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-12 h-12 text-blue-600 dark:text-cyan-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Start Earning Certificates!</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                Complete courses and assessments to earn blockchain-verified certificates that prove your skills to
                employers worldwide.
              </p>
              <button
                onClick={() => router.push("/learn")}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-cyan-500 dark:to-purple-500 text-white rounded-xl font-bold hover:scale-105 transition-all duration-300"
              >
                🚀 Start Learning
              </button>
            </div>
          )}

          {/* Available Certifications */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">📋 Available Certifications</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {availableCertifications.map((cert) => (
                <div
                  key={cert.id}
                  className={`p-6 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 hover:bg-white/70 dark:hover:bg-white/10 transition-all duration-300 ${
                    cert.locked ? "opacity-60" : "hover:scale-105"
                  }`}
                >
                  {/* Certificate Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${cert.color} flex items-center justify-center text-2xl`}
                    >
                      {cert.icon}
                    </div>
                    <div className="text-right">
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          cert.difficulty === "Beginner"
                            ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                            : "bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400"
                        }`}
                      >
                        {cert.difficulty}
                      </div>
                      {cert.locked && (
                        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">🔒 Complete prerequisites</div>
                      )}
                    </div>
                  </div>

                  {/* Certificate Info */}
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{cert.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{cert.description}</p>

                  {/* Requirements */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Requirements:</h4>
                    <ul className="space-y-1">
                      {cert.requirements.map((req, index) => (
                        <li
                          key={index}
                          className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400"
                        >
                          <CheckCircle className="w-3 h-3 text-gray-400" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                      <span>Progress</span>
                      <span>{cert.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-white/10 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full bg-gradient-to-r ${cert.color}`}
                        style={{ width: `${cert.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{cert.estimatedTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-500" />
                      <span>{cert.reward}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => (cert.locked ? null : router.push("/learn"))}
                    disabled={cert.locked}
                    className={`w-full py-3 rounded-xl font-medium transition-all duration-300 ${
                      cert.locked
                        ? "bg-gray-200 dark:bg-white/10 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                        : `bg-gradient-to-r ${cert.color} text-white hover:scale-105`
                    }`}
                  >
                    {cert.locked ? "🔒 Locked" : cert.progress > 0 ? "Continue Progress" : "Start Certification"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Blockchain Info */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-600/10 to-pink-600/10 dark:from-purple-500/10 dark:to-pink-500/10 border border-purple-200 dark:border-purple-500/30">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🔗 Blockchain Verification</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Why Blockchain Certificates?</h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span>Tamper-proof and permanent</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Globe className="w-4 h-4 text-blue-500" />
                    <span>Globally verifiable</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-purple-500" />
                    <span>Industry recognized</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>Earn ALGO token rewards</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Powered by Algorand</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  All certificates are stored on the Algorand blockchain, ensuring they remain verifiable and authentic
                  forever.
                </p>
                <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Algorand Network: Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Getting Started Guide */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-600/10 to-cyan-600/10 dark:from-cyan-500/10 dark:to-blue-500/10 border border-blue-200 dark:border-cyan-500/30">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              🎯 How to Earn Your First Certificate
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-cyan-500 dark:to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
                  1
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Choose a Course</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Start with React Development Fundamentals - perfect for beginners
                </p>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
                  2
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Complete Learning</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Work through lessons with AI mentor guidance and hands-on projects
                </p>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-500 dark:to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
                  3
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Earn Certificate</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Pass assessments and receive your blockchain-verified certificate
                </p>
              </div>
            </div>
            <div className="text-center mt-6">
              <button
                onClick={() => router.push("/learn")}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-cyan-500 dark:to-purple-500 text-white rounded-xl font-bold hover:scale-105 transition-all duration-300"
              >
                🚀 Start Your First Course
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
