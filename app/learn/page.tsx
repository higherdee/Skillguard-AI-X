"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { TopNav } from "@/components/top-nav"
import {
  Brain,
  Code,
  Palette,
  TrendingUp,
  Users,
  Clock,
  Star,
  Play,
  BookOpen,
  Video,
  Mic,
  Phone,
  MessageSquare,
  X,
} from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

export default function LearnPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showVideoCall, setShowVideoCall] = useState(false)
  const [currentLesson, setCurrentLesson] = useState<any>(null)

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
          <p className="text-gray-600 dark:text-gray-400">Loading learning content...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  const categories = [
    {
      id: "all",
      name: "All Skills",
      icon: Brain,
      color: "from-blue-600 to-purple-600 dark:from-cyan-500 dark:to-purple-500",
    },
    {
      id: "coding",
      name: "Programming",
      icon: Code,
      color: "from-green-600 to-emerald-600 dark:from-green-500 dark:to-emerald-500",
    },
    {
      id: "design",
      name: "Design",
      icon: Palette,
      color: "from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500",
    },
    {
      id: "business",
      name: "Business",
      icon: TrendingUp,
      color: "from-orange-600 to-red-600 dark:from-orange-500 dark:to-red-500",
    },
    { id: "ai", name: "AI & ML", icon: Brain, color: "from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400" },
  ]

  const skills = [
    {
      id: 1,
      title: "React Development Fundamentals",
      description: "Learn modern React with hooks, context, and best practices",
      category: "coding",
      level: "Beginner",
      duration: "8 hours",
      students: 1250,
      rating: 4.9,
      progress: 0,
      lessons: 24,
      image: "🚀",
      color: "from-blue-600 to-cyan-600 dark:from-blue-500 dark:to-cyan-500",
    },
    {
      id: 2,
      title: "UI/UX Design Principles",
      description: "Master the fundamentals of user interface and experience design",
      category: "design",
      level: "Beginner",
      duration: "6 hours",
      students: 890,
      rating: 4.8,
      progress: 0,
      lessons: 18,
      image: "🎨",
      color: "from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500",
    },
    {
      id: 3,
      title: "Machine Learning Basics",
      description: "Introduction to ML algorithms and practical applications",
      category: "ai",
      level: "Intermediate",
      duration: "12 hours",
      students: 2100,
      rating: 4.9,
      progress: 0,
      lessons: 32,
      image: "🤖",
      color: "from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400",
    },
    {
      id: 4,
      title: "Digital Marketing Strategy",
      description: "Build effective marketing campaigns for the digital age",
      category: "business",
      level: "Beginner",
      duration: "5 hours",
      students: 750,
      rating: 4.7,
      progress: 0,
      lessons: 15,
      image: "📈",
      color: "from-orange-600 to-red-600 dark:from-orange-500 dark:to-red-500",
    },
    {
      id: 5,
      title: "Python for Data Science",
      description: "Learn Python programming for data analysis and visualization",
      category: "coding",
      level: "Beginner",
      duration: "10 hours",
      students: 1800,
      rating: 4.8,
      progress: 0,
      lessons: 28,
      image: "🐍",
      color: "from-green-600 to-emerald-600 dark:from-green-500 dark:to-emerald-500",
    },
    {
      id: 6,
      title: "Cybersecurity Fundamentals",
      description: "Essential security concepts and practices for digital safety",
      category: "coding",
      level: "Beginner",
      duration: "7 hours",
      students: 950,
      rating: 4.9,
      progress: 0,
      lessons: 20,
      image: "🛡️",
      color: "from-red-600 to-pink-600 dark:from-red-500 dark:to-pink-500",
    },
  ]

  const filteredSkills =
    selectedCategory === "all" ? skills : skills.filter((skill) => skill.category === selectedCategory)

  const startLesson = (skill: any) => {
    setCurrentLesson(skill)
    setShowVideoCall(true)
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
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">🎓 Learn New Skills</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Discover AI-powered courses tailored to your learning style
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="px-4 py-2 bg-gradient-to-r from-green-600/10 to-emerald-600/10 dark:from-green-500/10 dark:to-emerald-500/10 border border-green-200 dark:border-green-500/30 rounded-xl">
                <span className="text-sm font-medium text-green-700 dark:text-green-400">🤖 AI Mentor Available</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                    : "bg-white/50 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-white/70 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10"
                }`}
              >
                <category.icon className="w-4 h-4" />
                <span>{category.name}</span>
              </button>
            ))}
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map((skill) => (
              <div
                key={skill.id}
                className="group p-6 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 hover:bg-white/70 dark:hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                {/* Skill Header */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${skill.color} flex items-center justify-center text-2xl`}
                  >
                    {skill.image}
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.rating}</span>
                  </div>
                </div>

                {/* Skill Info */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{skill.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{skill.description}</p>

                {/* Skill Meta */}
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{skill.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BookOpen className="w-3 h-3" />
                      <span>{skill.lessons} lessons</span>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      skill.level === "Beginner"
                        ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                        : "bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400"
                    }`}
                  >
                    {skill.level}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                    <span>Progress</span>
                    <span>{skill.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-white/10 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r ${skill.color}`}
                      style={{ width: `${skill.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => startLesson(skill)}
                    className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 bg-gradient-to-r ${skill.color} text-white rounded-xl font-medium hover:scale-105 transition-all duration-300`}
                  >
                    <Play className="w-4 h-4" />
                    <span>Start Learning</span>
                  </button>
                  <button className="p-2 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 rounded-xl transition-colors">
                    <BookOpen className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>

                {/* Students Count */}
                <div className="flex items-center justify-center space-x-1 mt-3 text-xs text-gray-500 dark:text-gray-400">
                  <Users className="w-3 h-3" />
                  <span>{skill.students.toLocaleString()} students enrolled</span>
                </div>
              </div>
            ))}
          </div>

          {/* AI Recommendations */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-cyan-500/10 dark:to-purple-500/10 border border-blue-200 dark:border-white/10">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🤖 AI Recommendations for You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white/30 dark:bg-white/5 rounded-xl">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Based on Your Profile</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  As a new learner, we recommend starting with React Development Fundamentals to build a strong
                  foundation in modern web development.
                </p>
                <button
                  onClick={() => startLesson(skills[0])}
                  className="text-sm text-blue-600 dark:text-cyan-400 font-medium hover:underline"
                >
                  Start Recommended Course →
                </button>
              </div>
              <div className="p-4 bg-white/30 dark:bg-white/5 rounded-xl">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Trending This Week</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Machine Learning Basics is trending among learners like you. Join 2,100+ students already enrolled.
                </p>
                <button
                  onClick={() => startLesson(skills[2])}
                  className="text-sm text-purple-600 dark:text-purple-400 font-medium hover:underline"
                >
                  Explore Trending Course →
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Video Call Modal */}
      {showVideoCall && currentLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-4xl mx-4 bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
            {/* Video Call Header */}
            <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-r ${currentLesson.color} flex items-center justify-center text-lg`}
                >
                  {currentLesson.image}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{currentLesson.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">AI Mentor Session</p>
                </div>
              </div>
              <button
                onClick={() => setShowVideoCall(false)}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* Video Area */}
            <div className="relative aspect-video bg-gradient-to-br from-blue-600 to-purple-600 dark:from-cyan-500 dark:to-purple-500 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-12 h-12" />
                </div>
                <h3 className="text-xl font-bold mb-2">AI Mentor Ready</h3>
                <p className="text-white/80">Your personalized learning session is about to begin</p>
              </div>

              {/* Video Controls */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
                <button className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors">
                  <Mic className="w-5 h-5 text-white" />
                </button>
                <button className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors">
                  <Video className="w-5 h-5 text-white" />
                </button>
                <button className="p-3 bg-red-500 hover:bg-red-600 rounded-full transition-colors">
                  <Phone className="w-5 h-5 text-white" />
                </button>
                <button className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors">
                  <MessageSquare className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800">
              <div className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-700 rounded-lg">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-cyan-500 dark:to-purple-500 rounded-full flex items-center justify-center">
                  🤖
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">
                    Hi! I'm your AI mentor for {currentLesson.title}. Ready to start your personalized learning journey?
                    I'll guide you through each concept step by step.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
