import { createClient } from "@/lib/supabase/server";
import {
  DEFAULT_SETTINGS,
  SITE_SETTINGS_SELECT,
  type SiteSettingsPublic,
} from "@/types/settings";

export async function getSiteSettings(): Promise<SiteSettingsPublic> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select(SITE_SETTINGS_SELECT)
      .eq("id", 1)
      .single();

    if (!error && data) {
      return { ...DEFAULT_SETTINGS, ...data };
    }
  } catch {
    /* fallback */
  }

  return DEFAULT_SETTINGS;
}
