import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import WhyChooseUs from "@/components/WhyChooseUs";
import Services from "@/components/Services";
import EventShowcase from "@/components/EventShowcase";
import EventBenefits from "@/components/EventBenefits";
import KeyNumbers from "@/components/KeyNumbers";
import Faq from "@/components/Faq";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SeoJsonLd from "@/components/SeoJsonLd";
import CtaBanner from "@/components/CtaBanner";
import { getSiteSettings } from "@/lib/settings";
import { getHeroVideoSrc } from "@/lib/hero-video";
import { getClientLogos } from "@/lib/client-logos";
import { getFaqs } from "@/lib/faqs";
import { getPublishedTestimonials } from "@/lib/testimonials";
import { buildHomeMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return buildHomeMetadata(settings);
}

export default async function Home() {
  const [settings, clientLogos, faqItems, testimonials] = await Promise.all([
    getSiteSettings(),
    getClientLogos(),
    getFaqs(),
    getPublishedTestimonials(),
  ]);

  return (
    <>
      <SeoJsonLd settings={settings} />
      <Header />
      <main>
        <Hero heroVideoSrc={getHeroVideoSrc(settings)} />
        <About logos={clientLogos} />
        <EventShowcase />
        <WhyChooseUs />
        <Services />
        <EventBenefits />
        <KeyNumbers />
        <Testimonials items={testimonials} />
        <Faq items={faqItems} />
        <CtaBanner />
        <Contact settings={settings} />
      </main>
      <Footer />
      <WhatsAppButton whatsappPhone={settings.whatsapp_phone} />
    </>
  );
}
