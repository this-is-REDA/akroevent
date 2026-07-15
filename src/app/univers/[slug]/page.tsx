import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import UniversDetail from "@/components/UniversDetail";
import { getUniversBySlug, getUniversSlugs } from "@/data/univers";
import { getSiteSettings } from "@/lib/settings";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getUniversSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const item = getUniversBySlug(params.slug);
  if (!item) {
    return { title: "Univers introuvable" };
  }

  const url = `${SITE_URL}/univers/${item.slug}`;

  return {
    title: `${item.title} — Akro Event`,
    description: item.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${item.title} | ${SITE_NAME}`,
      description: item.description,
      url,
      images: [{ url: `${SITE_URL}${item.src}` }],
    },
  };
}

export default async function UniversPage({ params }: PageProps) {
  const item = getUniversBySlug(params.slug);
  if (!item) notFound();

  const settings = await getSiteSettings();

  return (
    <>
      <Header />
      <main>
        <UniversDetail item={item} />
      </main>
      <Footer />
      <WhatsAppButton whatsappPhone={settings.whatsapp_phone} />
    </>
  );
}
