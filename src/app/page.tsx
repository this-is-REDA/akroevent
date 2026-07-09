import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import WhyChooseUs from "@/components/WhyChooseUs";
import Services from "@/components/Services";
import EventShowcase from "@/components/EventShowcase";
import EventBenefits from "@/components/EventBenefits";
import KeyNumbers from "@/components/KeyNumbers";
import Clients from "@/components/Clients";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SeoJsonLd from "@/components/SeoJsonLd";
import CtaBanner from "@/components/CtaBanner";
import MarqueeBand from "@/components/MarqueeBand";
import { getSiteSettings } from "@/lib/settings";
import { getHeroVideoSrc } from "@/lib/hero-video";
import { homeMetadata } from "@/lib/seo";

export const metadata: Metadata = homeMetadata;

export default async function Home() {
  const settings = await getSiteSettings();

  return (
    <>
      <SeoJsonLd settings={settings} />
      <Header />
      <main>
        <Hero heroVideoSrc={getHeroVideoSrc(settings)} />
        <MarqueeBand />
        <About />
        <EventShowcase />
        <WhyChooseUs />
        <Services />
        <EventBenefits />
        <KeyNumbers />
        <Clients />
        <CtaBanner />
        <Contact settings={settings} />
      </main>
      <Footer />
      <WhatsAppButton whatsappPhone={settings.whatsapp_phone} />
    </>
  );
}
