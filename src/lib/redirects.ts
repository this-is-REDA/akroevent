import { createClient } from "@/lib/supabase/server";
import type { Redirect } from "@/types/content";

export async function getActiveRedirects(): Promise<Redirect[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("redirects")
      .select("*")
      .eq("is_active", true);

    if (!error && data) return data as Redirect[];
  } catch {
    /* empty */
  }
  return [];
}
