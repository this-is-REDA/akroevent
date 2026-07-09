import type { SiteSettingsPublic } from "@/types/settings";

export function getHeroVideoSrc(settings?: Pick<SiteSettingsPublic, "hero_video_version">): string {
  const base = "/hero-vr.mp4";
  if (settings?.hero_video_version) {
    return `${base}?v=${settings.hero_video_version}`;
  }
  return base;
}
