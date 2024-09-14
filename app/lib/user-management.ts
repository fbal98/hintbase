import { supabase } from "@/lib/supabase";

// Define types
export interface User {
  id: number;
  clerk_user_id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  profile_image_url: string | null;
  oauth_provider: string | null;
  oauth_provider_id: string | null;
  role: "user" | "admin";
  created_at: string;
  updated_at: string;
}

// Update the ClerkUser interface
export interface ClerkUser {
  id: string;
  emailAddresses: { emailAddress: string }[];
  firstName: string | null;
  lastName: string | null;
  imageUrl: string | null;
  externalAccounts: {
    provider: string;
    externalId: string;
  }[];
}

export async function storeOrUpdateUser(
  clerkUser: ClerkUser
): Promise<User | null> {
  const { data: existingUser, error: fetchError } = await supabase
    .from("users")
    .select("*")
    .eq("clerk_user_id", clerkUser.id)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") {
    console.error("Error fetching user:", fetchError);
    return null;
  }

  const userData = {
    clerk_user_id: clerkUser.id,
    email: clerkUser.emailAddresses[0]?.emailAddress,
    first_name: clerkUser.firstName,
    last_name: clerkUser.lastName,
    profile_image_url: clerkUser.imageUrl,
    oauth_provider: clerkUser.externalAccounts[0]?.provider,
    oauth_provider_id: clerkUser.externalAccounts[0]?.externalId,
  };

  if (existingUser) {
    // Update existing user
    const { data: updatedUser, error: updateError } = await supabase
      .from("users")
      .update(userData)
      .eq("clerk_user_id", clerkUser.id)
      .select()
      .single();

    if (updateError) {
      console.error("Error updating user:", updateError);
      return null;
    }

    return updatedUser;
  } else {
    // Insert new user
    const { data: newUser, error: insertError } = await supabase
      .from("users")
      .insert({ ...userData, role: "user" })
      .select()
      .single();

    if (insertError) {
      console.error("Error inserting user:", insertError);
      return null;
    }

    return newUser;
  }
}

export async function getUserRole(
  clerkUserId: string
): Promise<"user" | "admin" | null> {
  const { data, error } = await supabase
    .from("users")
    .select("role")
    .eq("clerk_user_id", clerkUserId)
    .single();

  if (error) {
    console.error("Error fetching user role:", error);
    return null;
  }

  return data.role;
}

// Add this function to the existing file
export async function getSupabaseUserId(
  clerkUserId: string
): Promise<string | null> {
  const { data, error } = await supabase
    .from("users")
    .select("id")
    .eq("clerk_user_id", clerkUserId)
    .single();

  if (error) {
    console.error("Error fetching Supabase user ID:", error);
    return null;
  }

  return data?.id || null;
}
