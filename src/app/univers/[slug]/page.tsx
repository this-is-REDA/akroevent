import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import UniversDetail from "@/components/UniversDetail";
import { getUniversSlugs } from "@/data/univers";
import { getUniversBySlugDb, getUniversItems } from "@/lib/univers-db";
import { getSiteSettings } from "@/lib/settings";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

type PageProps = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const items = await getUniversItems();
  const slugs = items.length ? items.map((i) => i.slug) : getUniversSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const item = await getUniversBySlugDb(params.slug);
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
  const item = await getUniversBySlugDb(params.slug);
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
