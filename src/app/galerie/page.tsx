import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import GalleryPageContent from "@/components/GalleryPageContent";
import { getGalleryPhotos } from "@/lib/gallery";
import { getSiteSettings } from "@/lib/settings";
import { SITE_NAME, SITE_URL, OG_IMAGE_PATH } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Galerie — Nos réalisations événementielles",
  description:
    "Découvrez la galerie photo d'Akro Event : team building, séminaires, stands personnalisés et événements corporate au Maroc.",
  alternates: {
    canonical: `${SITE_URL}/galerie`,
  },
  openGraph: {
    title: `Galerie | ${SITE_NAME}`,
    description:
      "Photos de nos événements corporate, team building et stands sur mesure au Maroc.",
    url: `${SITE_URL}/galerie`,
    images: [{ url: OG_IMAGE_PATH }],
  },
};

export default async function GaleriePage() {
  const [settings, photos] = await Promise.all([
    getSiteSettings(),
    getGalleryPhotos(),
  ]);

  return (
    <>
      <Header />
      <main>
        <GalleryPageContent photos={photos} />
      </main>
      <Footer />
      <WhatsAppButton whatsappPhone={settings.whatsapp_phone} />
    </>
  );
}
