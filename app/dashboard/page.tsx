"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { TopNav } from "@/components/top-nav"
import { TrendingUp, Award, Shield, Brain, Clock, MessageSquare } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function DashboardPage() {
  const supabase = createClientComponentClient()
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    const sendWelcome = async () => {
      const {
        data: { user: supaUser },
      } = await supabase.auth.getUser()

      if (supaUser) {
        await fetch('/api/send-welcome', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: supaUser.email,
            name: supaUser.user_metadata.full_name || 'New User',
          }),
        })
      }
    }



    // MY HEAD WANT TO BURST😭😭😭 AS U OPEN THIS MY GIT RESPOSITORY LIKE THAT, JUST HELP ME CONTINUE TILL YA TIRED 
    // -AYADI OLAKUNLE 
    // thank u

    sendWelcome()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 dark:border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  // continue with rest of your component here...
  const new_users = [
    {

    }
  ]


  // New user default stats (everything starts at 0)
  const stats = [
    {
      icon: Brain,
      label: "Skills Learned",
      value: "0",
      change: "Start your first course!",
      color: "text-blue-600 dark:text-cyan-400",
    },
    {
      icon: Award,
      label: "Certificates",
      value: "0",
      change: "Earn your first certificate",
      color: "text-purple-600 dark:text-purple-400",
    },
    {
      icon: Shield,
      label: "Security Score",
      value: "85%",
      change: "Good baseline security",
      color: "text-green-600 dark:text-green-400",
    },
    {
      icon: Clock,
      label: "Study Hours",
      value: "0",
      change: "Begin your learning journey",
      color: "text-pink-600 dark:text-pink-400",
    },
  ]

  const quickActions = [
    {
      icon: Brain,
      label: "Start Learning",
      color: "from-blue-600 to-purple-600 dark:from-cyan-500 dark:to-purple-500",
      href: "/learn",
    },
    {
      icon: Award,
      label: "View Certificates",
      color: "from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500",
      href: "/certifications",
    },
    {
      icon: MessageSquare,
      label: "AI Chat",
      color: "from-green-600 to-emerald-600 dark:from-green-500 dark:to-emerald-500",
      href: "/chat",
    },
    {
      icon: Shield,
      label: "Security Check",
      color: "from-yellow-600 to-orange-600 dark:from-yellow-500 dark:to-orange-500",
      href: "/vpn",
    },
  ]

  const aiAssistants = [
    {
      name: "Learning Assistant",
      status: "online",
      lastMessage: "Hi! I'm ready to help you start learning. What would you like to explore first?",
      avatar: "🤖",
      color: "from-blue-600 to-purple-600 dark:from-cyan-500 dark:to-blue-500",
    },
    {
      name: "Security Advisor",
      status: "online",
      lastMessage: "Welcome! Let me help you set up your security preferences.",
      avatar: "🛡️",
      color: "from-green-600 to-emerald-600 dark:from-green-500 dark:to-emerald-500",
    },
    {
      name: "Career Mentor",
      status: "online",
      lastMessage: "Ready to discuss your career goals and create a learning path?",
      avatar: "💼",
      color: "from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500",
    },
  ]

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 lg:ml-0">
        <TopNav />

        <main className="p-6 space-y-8 overflow-y-auto h-[calc(100vh-4rem)]">
          {/* Welcome Section for New Users */}
          <div className="text-center p-8 rounded-2xl bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-cyan-500/10 dark:to-purple-500/10 border border-blue-200 dark:border-white/10">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Welcome to your <span className="text-blue-600 dark:text-cyan-400">AI-Powered</span> Learning Hub!
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              🎉 Congratulations on joining SkillGuard AI X! Your personalized learning journey starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push("/learn")}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-cyan-500 dark:to-purple-500 text-white rounded-xl font-bold hover:scale-105 transition-all duration-300"
              >
                🚀 Start Your First Course
              </button>
              <button
                onClick={() => router.push("/chat")}
                className="px-6 py-3 border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white rounded-xl font-bold hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-300"
              >
                💬 Chat with AI Mentor
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 hover:bg-white/70 dark:hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  {stat.value !== "0" && <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />}
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{stat.label}</div>
                <div className="text-xs text-blue-600 dark:text-cyan-400">{stat.change}</div>
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Getting Started Guide */}
            <div className="lg:col-span-2 p-6 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">🎯 Getting Started Guide</h2>
              <div className="space-y-4">
                {[
                  {
                    step: "1",
                    title: "Complete Your Profile",
                    description: "Set up your learning preferences and goals",
                    action: "Go to Settings",
                    href: "/settings",
                    completed: false,
                    color: "from-blue-600 to-purple-600 dark:from-cyan-500 dark:to-blue-500",
                  },
                  {
                    step: "2",
                    title: "Choose Your First Skill",
                    description: "Browse our AI-curated learning paths",
                    action: "Explore Skills",
                    href: "/learn",
                    completed: false,
                    color: "from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500",
                  },
                  {
                    step: "3",
                    title: "Meet Your AI Mentor",
                    description: "Get personalized guidance and support",
                    action: "Start Chat",
                    href: "/chat",
                    completed: false,
                    color: "from-green-600 to-emerald-600 dark:from-green-500 dark:to-emerald-500",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-4 rounded-xl bg-white/30 dark:bg-white/5 hover:bg-white/50 dark:hover:bg-white/10 transition-all duration-300"
                  >
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center text-white font-bold`}
                    >
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-900 dark:text-white font-medium">{item.title}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{item.description}</div>
                    </div>
                    <button
                      onClick={() => router.push(item.href)}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-cyan-500 dark:to-purple-500 text-white rounded-lg text-sm font-medium hover:scale-105 transition-all duration-300"
                    >
                      {item.action}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Assistants */}
            <div className="p-6 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">🤖 Your AI Team</h2>
              <div className="space-y-4">
                {aiAssistants.map((assistant, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-white/30 dark:bg-white/5 hover:bg-white/50 dark:hover:bg-white/10 transition-all cursor-pointer"
                    onClick={() => router.push("/chat")}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-r ${assistant.color} flex items-center justify-center text-lg`}
                      >
                        {assistant.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-900 dark:text-white font-medium">{assistant.name}</span>
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{assistant.lastMessage}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-6 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">⚡ Quick Actions</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => router.push(action.href)}
                  className={`flex flex-col items-center space-y-2 p-6 rounded-xl bg-gradient-to-r ${action.color} text-white hover:scale-105 transition-all duration-300 shadow-lg`}
                >
                  <action.icon className="w-8 h-8" />
                  <span className="font-medium text-center">{action.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Welcome Tips */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-green-600/10 to-emerald-600/10 dark:from-green-500/10 dark:to-emerald-500/10 border border-green-200 dark:border-green-500/30">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">💡 Pro Tips for New Learners</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Set Learning Goals</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Define what you want to achieve to get personalized recommendations
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Use AI Mentors</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Chat with our AI assistants anytime for instant help and guidance
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Earn Certificates</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Complete courses to earn blockchain-verified certificates
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">4</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Stay Secure</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Enable VPN protection and follow our security recommendations
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
