import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import WhyChooseUs from "@/components/WhyChooseUs";
import Services from "@/components/Services";
import KeyNumbers from "@/components/KeyNumbers";
import Clients from "@/components/Clients";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SeoJsonLd from "@/components/SeoJsonLd";
import { getSiteSettings } from "@/lib/settings";
import { homeMetadata } from "@/lib/seo";

export const metadata: Metadata = homeMetadata;

export default async function Home() {
  const settings = await getSiteSettings();

  return (
    <>
      <SeoJsonLd settings={settings} />
      <Header />
      <main>
        <Hero />
        <About />
        <WhyChooseUs />
        <Services />
        <KeyNumbers />
        <Clients />
        <Contact settings={settings} />
      </main>
      <Footer />
      <WhatsAppButton whatsappPhone={settings.whatsapp_phone} />
    </>
  );
}
