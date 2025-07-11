"use client"

import { Bell, LogOut } from "lucide-react"
import { signOut } from "@/lib/auth"
import { useAuth } from "@/hooks/use-auth"
import { useTheme } from "@/contexts/theme-context"

interface TopNavProps {
  userName?: string
  userEmail?: string
}

export function TopNav({ userName, userEmail }: TopNavProps) {
  const { user } = useAuth()
  const { theme, toggleTheme } = useTheme()

  const displayName = userName || user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User"
  const displayEmail = userEmail || user?.email || "user@example.com"

  const handleSignOut = async () => {
    try {
      await signOut()
      window.location.href = "/"
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <div className="h-16 bg-white/50 dark:bg-white/5 backdrop-blur-xl border-b border-gray-200 dark:border-white/10 px-6 flex items-center justify-between">
      {/* Welcome Message */}
      <div className="flex-1 lg:ml-0 ml-16">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Welcome back, <span className="text-blue-600 dark:text-cyan-400">{displayName}</span>
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">Ready to learn something new today?</p>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-all duration-300"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-xl bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/20 hover:bg-gray-200 dark:hover:bg-white/20 transition-all duration-300">
          <Bell className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile */}
        <div className="flex items-center space-x-3">
          <div className="hidden sm:block text-right">
            <div className="text-sm font-medium text-gray-900 dark:text-white">{displayName}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">{displayEmail}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 dark:from-cyan-500 dark:to-purple-500 flex items-center justify-center font-bold text-white">
            {displayName.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Sign Out */}
        <button
          onClick={handleSignOut}
          className="p-2 rounded-xl bg-red-100 dark:bg-red-900/20 hover:bg-red-200 dark:hover:bg-red-900/40 transition-all duration-300 text-red-600 dark:text-red-400"
          title="Sign Out"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
