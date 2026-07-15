import type { Metadata } from "next";
import LandingPageContent from "@/components/landing/LandingPageContent";
import { getSiteSettings } from "@/lib/settings";
import { getHeroVideoSrc } from "@/lib/hero-video";
import { getClientLogos } from "@/lib/client-logos";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION, OG_IMAGE_PATH } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Landing Page — Agence Événementielle & Team Building",
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/lindingpage`,
  },
  openGraph: {
    title: `Landing Page | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    url: `${SITE_URL}/lindingpage`,
    images: [{ url: OG_IMAGE_PATH }],
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default async function LindingPage() {
  const [settings, logos] = await Promise.all([
    getSiteSettings(),
    getClientLogos(),
  ]);

  return (
    <LandingPageContent
      settings={settings}
      heroVideoSrc={getHeroVideoSrc(settings)}
      logos={logos}
    />
  );
}
