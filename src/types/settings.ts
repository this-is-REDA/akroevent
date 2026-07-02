export interface SiteSettings {
  id: number;
  whatsapp_phone: string;
  phone_display: string;
  email: string;
  facebook_url: string;
  instagram_url: string;
  linkedin_url: string;
  hero_video_version: string;
  updated_at: string;
}

export type SiteSettingsPublic = Omit<SiteSettings, "id" | "updated_at">;

export const DEFAULT_SETTINGS: SiteSettingsPublic = {
  whatsapp_phone: "212663218522",
  phone_display: "+212 (0)6 63 21 85 22",
  email: "Contact@akroevent.com",
  facebook_url: "https://www.facebook.com/share/1E4yBi7wyu/",
  instagram_url: "https://www.instagram.com/akro_event/",
  linkedin_url: "https://www.linkedin.com/company/111628813/",
  hero_video_version: "",
};
