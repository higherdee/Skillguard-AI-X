"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function updateProfile(formData: FormData) {
  const cookieStore = cookies();
  // Import your Supabase URL and anon key from environment or config
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      error: "User not found",
    };
  }

  const { data, error } = await supabase
    .from("profiles")
    .update({
      full_name: formData.get("fullName") as string,
      website: formData.get("website") as string,
    })
    .eq("id", user.id);

  if (error) {
    return {
      error: error.message,
    };
  }

  revalidatePath("/settings");

  return {
    data,
  };
}
