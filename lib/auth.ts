import { supabase } from "./supabase"

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/dashboard`,
    },
  })

  if (error) {
    console.error("Error signing in with Google:", error)
    throw error
  }

  return data
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error("Error signing out:", error)
    throw error
  }
}

export const getCurrentUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error) {
    console.error("Error getting current user:", error)
    return null
  }
  return user
}

export const sendWelcomeEmail = async (userEmail: string, userName: string) => {
  // This would typically be handled by a server function or edge function
  // For now, we'll simulate sending an email
  console.log(`Welcome email sent to ${userEmail} for ${userName}`)

  // In a real implementation, you would call your email service here
  // Example: SendGrid, Resend, or Supabase Edge Functions
  return true
}
