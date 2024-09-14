import { supabase } from "@/lib/supabase";
import { getUserRole as getUserRoleFromDB } from "@/app/lib/user-management";
import { getSupabaseUserId } from "./user-management";

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
  const supabaseUserId = await getSupabaseUserId(newCheatSheet.added_by);

  if (!supabaseUserId) {
    throw new Error("Failed to get Supabase user ID");
  }

  const { data, error } = await supabase
    .from("cheat_sheets")
    .insert([{ ...newCheatSheet, added_by: supabaseUserId, is_deleted: false }])
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

// Export this function
export async function getCheatSheetUserRole(userId: string): Promise<string> {
  const role = await getUserRoleFromDB(userId);
  return role || "user";
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
