import { supabase, authClient } from "@/lib/supabase";

export interface Command {
  name: string;
  command: string;
  description: string;
  tag: string;
}

export interface Section {
  title: string;
  commands: Command[];
}

export interface CheatSheet {
  id: string;
  title: string;
  name: string;
  icon: string;
  description: string;
  sections: Section[];
  added_by: string;
  is_deleted: boolean; // Add this line
}

export async function getAllCheatSheets(): Promise<CheatSheet[]> {
  const { data, error } = await supabase
    .from("cheat_sheets")
    .select("*")
    .eq("is_deleted", false); // Only fetch non-deleted cheat sheets

  if (error) {
    console.error("Error fetching cheat sheets:", error);
    throw new Error("Failed to fetch cheat sheets");
  }

  return data || [];
}

export async function addCheatSheet(
  newCheatSheet: Omit<CheatSheet, "id" | "is_deleted">
): Promise<CheatSheet | null> {
  // First, check if the user exists in the next_auth.users table
  const { data: userData, error: userError } = await authClient
    .from("users")
    .select("id")
    .eq("id", newCheatSheet.added_by)
    .single();

  if (userError || !userData) {
    console.error("Error verifying user:", userError);
    throw new Error("User not found or unauthorized");
  }

  // If the user exists, proceed with adding the cheat sheet
  const { data, error } = await supabase
    .from("cheat_sheets")
    .insert([{ ...newCheatSheet, is_deleted: false }])
    .select();

  if (error) {
    console.error("Error adding cheat sheet:", error);
    throw new Error("Failed to add cheat sheet: " + error.message);
  }

  return data?.[0] || null;
}

export async function updateCheatSheet(
  id: string,
  updatedCheatSheet: Partial<CheatSheet>
): Promise<CheatSheet | null> {
  const { data, error } = await supabase
    .from("cheat_sheets")
    .update(updatedCheatSheet)
    .eq("id", id)
    .select();

  if (error) {
    console.error("Error updating cheat sheet:", error);
    throw new Error("Failed to update cheat sheet");
  }

  return data?.[0] || null;
}

export async function deleteCheatSheet(id: string): Promise<void> {
  const { error } = await supabase
    .from("cheat_sheets")
    .update({ is_deleted: true })
    .eq("id", id);

  if (error) {
    console.error("Error deleting cheat sheet:", error);
    throw new Error("Failed to delete cheat sheet");
  }
}

export async function getUserRole(userId: string): Promise<string> {
  const { data, error } = await authClient
    .from("users")
    .select("user_role")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching user role:", error);
    return "user";
  }

  return data?.user_role || "user";
}

export async function getUserIdFromNextAuth(
  email: string
): Promise<string | null> {
  const { data, error } = await authClient
    .from("users")
    .select("id")
    .eq("email", email)
    .single();

  if (error) {
    console.error("Error fetching user ID:", error);
    return null;
  }

  return data?.id || null;
}

export async function getCheatSheetById(
  id: string
): Promise<CheatSheet | null> {
  const { data, error } = await supabase
    .from("cheat_sheets")
    .select("*")
    .eq("id", id)
    .eq("is_deleted", false)
    .single();

  if (error) {
    console.error("Error fetching cheat sheet:", error);
    return null;
  }

  return data;
}
