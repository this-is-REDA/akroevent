"use client";

import { motion } from "framer-motion";
import HeroVideo from "./HeroVideo";

interface HeroProps {
  heroVideoSrc?: string;
  email?: string;
}

export default function Hero({
  heroVideoSrc = "/hero-vr.mp4",
  email = "contact@akroevent.ma",
}: HeroProps) {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="accueil" className="relative min-h-screen overflow-hidden bg-brand-dark">
      <div
        className="pointer-events-none absolute inset-0 lg:w-[55%]"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 20% 50%, rgba(201,168,76,0.05) 0%, transparent 65%)",
        }}
      />

      <div className="relative flex min-h-screen flex-col lg:flex-row">
        <div className="relative z-20 flex w-full flex-col justify-center px-5 pb-14 pt-28 sm:px-8 lg:w-[48%] lg:max-w-[38rem] lg:shrink-0 lg:pb-20 lg:pt-36 xl:ml-[max(0px,calc((100vw-80rem)/2))] xl:pl-14">
          <div className="relative pl-0 sm:pl-1">
            <span
              className="pointer-events-none absolute -left-5 top-2 hidden h-24 w-px bg-gradient-to-b from-brand-gold/50 via-brand-gold/20 to-transparent lg:block"
              aria-hidden="true"
            />

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="hero-eyebrow"
            >
              <span className="section-label">Agence événementielle marocaine</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="hero-title mt-9 sm:mt-10"
            >
              <span className="block">Unleash the <em>fun,</em></span>
              <span className="mt-1 block">boost the <em>team!</em></span>
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mt-9 h-px w-16 origin-left bg-black/10"
              aria-hidden="true"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="hero-lead mt-8"
            >
              Team building corporate, séminaires, stands sur mesure et gestion déléguée.
              Idéal pour entreprises, institutions et espaces professionnels.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="hero-meta mt-7"
            >
              <a href={`mailto:${email}`}>{email}</a>
              <span className="hero-meta-dot" aria-hidden="true">
                ·
              </span>
              Interventions partout au Maroc
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-11 flex flex-wrap gap-3 sm:gap-4"
            >
              <button type="button" onClick={() => scrollTo("#services")} className="btn-hero-primary">
                Découvrir nos services
                <span aria-hidden="true">→</span>
              </button>
              <button type="button" onClick={() => scrollTo("#contact")} className="btn-hero-outline">
                Demander un devis
              </button>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.15 }}
          className="relative hidden min-h-screen flex-1 lg:block"
        >
          <div className="absolute inset-0">
            <HeroVideo videoSrc={heroVideoSrc} bleed />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="relative aspect-[5/4] w-full sm:aspect-[16/10] lg:hidden"
        >
          <HeroVideo videoSrc={heroVideoSrc} />
        </motion.div>
      </div>
    </section>
  );
}
