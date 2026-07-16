export interface SiteSettings {
  id: number;
  whatsapp_phone: string;
  phone_display: string;
  email: string;
  facebook_url: string;
  instagram_url: string;
  linkedin_url: string;
  hero_video_version: string;
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
  og_image_url: string;
  geo_summary: string;
  geo_service_area: string;
  geo_llms_txt: string;
  ga_measurement_id: string;
  gtm_id: string;
  notify_email: string;
  notify_on_devis: boolean;
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
  seo_title: "",
  seo_description: "",
  seo_keywords: "",
  og_image_url: "",
  geo_summary: "",
  geo_service_area: "",
  geo_llms_txt: "",
  ga_measurement_id: "",
  gtm_id: "",
  notify_email: "",
  notify_on_devis: true,
};

export const SITE_SETTINGS_SELECT =
  "whatsapp_phone, phone_display, email, facebook_url, instagram_url, linkedin_url, hero_video_version, seo_title, seo_description, seo_keywords, og_image_url, geo_summary, geo_service_area, geo_llms_txt, ga_measurement_id, gtm_id, notify_email, notify_on_devis";
