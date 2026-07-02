import { createClient } from "@/lib/supabase/server";
import { DEFAULT_SETTINGS, type SiteSettingsPublic } from "@/types/settings";

export async function getSiteSettings(): Promise<SiteSettingsPublic> {
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("site_settings")
      .select("whatsapp_phone, phone_display, email, facebook_url, instagram_url, linkedin_url, hero_video_version")
      .eq("id", 1)
      .single();

    if (data) return data;
  } catch {
    /* fallback */
  }

  return DEFAULT_SETTINGS;
}
