"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Logo from "@/components/Logo";
import ContactForm from "@/components/ContactForm";
import MagneticButton from "@/components/MagneticButton";
import AnimatedCounter from "@/components/AnimatedCounter";
import AmbientOrbs from "@/components/AmbientOrbs";
import WhatsAppButton from "@/components/WhatsAppButton";
import LogoMarquee from "@/components/LogoMarquee";
import type { ClientLogoPublic } from "@/types/client-logos";
import EventShowcase from "@/components/EventShowcase";
import EventServicesGrid from "@/components/EventServicesGrid";
import EventBenefits from "@/components/EventBenefits";
import { landingCtaBackground } from "@/data/landing-images";
import type { SiteSettingsPublic } from "@/types/settings";

const stats = [
  { value: 850, prefix: "+", label: "projets réalisés" },
  { value: 98, suffix: "%", label: "clients satisfaits" },
  { value: 150, prefix: "+", label: "collaborateurs" },
  { value: 15, prefix: "+", label: "ans d'expérience" },
];

const highlights = [
  "Agence événementielle marocaine",
  "Team building & corporate",
  "Production clé en main",
  "Présence nationale",
];

interface LandingPageContentProps {
  settings: SiteSettingsPublic;
  heroVideoSrc: string;
  logos?: ClientLogoPublic[];
}

export default function LandingPageContent({
  settings,
  heroVideoSrc,
  logos,
}: LandingPageContentProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToContact = () => {
    document.querySelector("#devis")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-white transition-all duration-300 ${
          scrolled ? "py-3 shadow-sm backdrop-blur-md" : "py-4"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
          <Link href="/" aria-label="Akro Event — Accueil">
            <Logo height={34} priority />
          </Link>
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/"
              className="hidden text-[10px] uppercase tracking-[0.25em] text-black/50 transition-colors hover:text-brand-red sm:inline"
            >
              Site principal
            </Link>
            <MagneticButton
              onClick={scrollToContact}
              className="btn-primary px-5 py-2.5 text-xs sm:px-6"
            >
              Demander un devis
            </MagneticButton>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative min-h-screen overflow-hidden bg-brand-dark">
          <div className="absolute inset-0">
            <video
              key={heroVideoSrc}
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
              aria-hidden="true"
            >
              <source src={heroVideoSrc} type="video/mp4" />
            </video>
          </div>
          <div className="cinematic-overlay absolute inset-0 z-[1]" />
          <div className="absolute inset-0 z-[2] bg-gradient-to-r from-brand-dark via-brand-dark/90 to-brand-dark/40" />
          <div className="absolute inset-0 z-[2] bg-gradient-to-t from-brand-dark via-brand-dark/50 to-brand-dark/80" />
          <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_20%_50%,rgba(255,34,56,0.26)_0%,transparent_55%)]" />

          <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-5 pb-20 pt-28 sm:px-8 lg:px-12">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="section-label"
            >
              Agence événementielle 360° au Maroc
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="hero-title-font mt-6 flex max-w-3xl flex-col gap-4 font-brittany normal-case leading-[1.3] tracking-normal text-[clamp(1.75rem,5vw,3.75rem)] sm:gap-6"
            >
              <span className="block font-brittany text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
                Transformez vos{" "}
                <span className="font-brittany text-gradient-fire">événements</span>
              </span>
              <span className="block font-brittany text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
                en expériences
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 max-w-lg border-l-2 border-brand-red pl-4 text-sm font-light italic leading-relaxed text-white/85 sm:pl-5 sm:text-base lg:text-lg"
            >
              Team building, séminaires, stands et gestion déléguée — Akro Event
              conçoit et produit des événements corporate à fort impact, partout
              au Maroc.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <MagneticButton
                onClick={scrollToContact}
                className="btn-primary inline-flex items-center gap-2"
              >
                Obtenir mon devis gratuit
                <ArrowRight size={16} />
              </MagneticButton>
              <a
                href="#services"
                className="inline-flex items-center gap-2 border border-white/20 px-6 py-3 font-display text-sm uppercase tracking-[0.2em] text-white/80 transition-colors hover:border-white/40 hover:text-white"
              >
                Découvrir nos services
              </a>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-12 flex flex-wrap gap-x-6 gap-y-3"
            >
              {highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-white/50"
                >
                  <CheckCircle2 size={14} className="text-brand-red" />
                  {item}
                </li>
              ))}
            </motion.ul>
          </div>
        </section>

        {/* Stats */}
        <section className="relative border-y border-white/[0.06] bg-brand-secondary py-14">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 sm:px-8 lg:grid-cols-4 lg:px-12">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center"
              >
                <p className="font-display text-4xl text-white sm:text-5xl">
                  <AnimatedCounter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    display3d
                  />
                </p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-white/45">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <EventShowcase />
        <EventServicesGrid id="services" />
        <EventBenefits />

        {/* Références clients */}
        <section className="section-padding relative overflow-hidden bg-brand-dark">
          <AmbientOrbs />
          <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <span className="section-label">Ils nous font confiance</span>
              <h2 className="mt-5 font-display text-4xl uppercase tracking-wide text-white sm:text-5xl">
                Nos références
              </h2>
              <div className="section-divider mx-auto mt-6 max-w-xs" />
            </motion.div>
            <LogoMarquee logos={logos} />
          </div>
        </section>

        {/* CTA band */}
        <section className="relative overflow-hidden py-20 sm:py-24">
          <Image
            src={landingCtaBackground}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-brand-red/90" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.35)_100%)]" />
          <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-4xl uppercase leading-tight tracking-wide text-white sm:text-6xl"
            >
              Prêt à lancer
              <br />
              votre prochain événement ?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mx-auto mt-5 max-w-lg text-sm text-white/85 sm:text-base"
            >
              Parlez-nous de votre projet — réponse sous 24h avec une proposition
              adaptée à vos objectifs.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-8"
            >
              <MagneticButton
                onClick={scrollToContact}
                className="inline-block border-2 border-white bg-white px-10 py-4 font-display text-sm uppercase tracking-[0.25em] text-brand-red transition-colors hover:bg-brand-dark hover:text-white"
              >
                Demander un devis →
              </MagneticButton>
            </motion.div>
          </div>
        </section>

        {/* Contact / Devis */}
        <section
          id="devis"
          className="section-padding relative overflow-hidden bg-brand-dark"
        >
          <AmbientOrbs />
          <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="section-label">Contact</span>
              <h2 className="mt-5 font-display text-4xl uppercase tracking-wide text-white sm:text-5xl">
                Obtenez votre
                <br />
                devis gratuit
              </h2>
              <div className="section-divider mt-6 max-w-xs" />
              <p className="mt-6 max-w-md text-base leading-relaxed text-white/55">
                Décrivez votre besoin en quelques minutes. Notre équipe vous
                recontacte rapidement pour construire une expérience sur mesure.
              </p>

              <ul className="mt-8 space-y-4">
                {[
                  "Réponse sous 24 heures",
                  "Proposition personnalisée",
                  "Accompagnement de A à Z",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm text-white/70"
                  >
                    <CheckCircle2 size={18} className="shrink-0 text-brand-red" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-10 space-y-2 text-sm text-white/45">
                <p>
                  <span className="text-white/70">Tél.</span>{" "}
                  <a
                    href={`tel:${settings.whatsapp_phone}`}
                    className="transition-colors hover:text-white"
                  >
                    {settings.phone_display}
                  </a>
                </p>
                <p>
                  <span className="text-white/70">Email</span>{" "}
                  <a
                    href={`mailto:${settings.email}`}
                    className="transition-colors hover:text-white"
                  >
                    {settings.email}
                  </a>
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="relative border-t border-black/10 bg-white py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 sm:flex-row sm:px-8 lg:px-12">
          <Link href="/">
            <Logo height={28} />
          </Link>
          <div className="text-center">
            <p className="text-xs text-luxury-muted">
              &copy; {new Date().getFullYear()} Akro Event. Tous droits réservés.
            </p>
            <p className="mt-2 text-[10px] tracking-[0.12em] text-luxury-muted/75">
              Designed by{" "}
              <a
                href="https://www.vsnstudios.ma"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-brand-red"
              >
                VSN Studios
              </a>
            </p>
          </div>
          <Link
            href="/"
            className="text-[10px] uppercase tracking-[0.2em] text-brand-ink/70 transition-colors hover:text-brand-red"
          >
            Voir le site complet
          </Link>
        </div>
      </footer>

      <WhatsAppButton whatsappPhone={settings.whatsapp_phone} />
    </>
  );
}
