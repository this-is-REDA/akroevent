"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";
import ParticleBackground from "./ParticleBackground";
import HeroVideo from "./HeroVideo";

const stats = [
  { value: 850, prefix: "+", label: "projets" },
  { value: 98, suffix: "%", label: "satisfaction" },
  { value: 150, prefix: "+", label: "collaborateurs" },
  { value: 15, prefix: "+", label: "ans d'expérience" },
];

export default function Hero({ heroVideoSrc = "/hero-vr.mp4" }: { heroVideoSrc?: string }) {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="accueil"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-brand-dark"
    >
      <ParticleBackground />

      {/* Subtle mesh gradient */}
      <div
        className="absolute inset-0 opacity-40"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 40%, rgba(232,25,44,0.12) 0%, transparent 60%), radial-gradient(ellipse 50% 50% at 20% 80%, rgba(201,168,76,0.05) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-5 pt-28 pb-20 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:pt-36">
        {/* Left — text */}
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-display uppercase leading-[0.95] tracking-wide"
          >
            <span className="mb-6 flex items-center gap-4">
              <span className="h-px w-12 bg-brand-red" aria-hidden="true" />
              <span className="text-[10px] tracking-[0.2em] text-luxury-muted sm:text-xs sm:tracking-[0.3em]">
                Agence Événementielle Marocaine — Team Building & Événements Corporate
              </span>
            </span>

            <span className="text-[clamp(3rem,8vw,6.5rem)]">
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="heading-display-3d block"
              >
                Unleash the{" "}
                <span className="heading-display-3d-accent">fun,</span>
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="heading-display-3d block"
              >
                boost the{" "}
                <span className="heading-display-3d-accent">team!</span>
              </motion.span>
            </span>
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="my-8 h-px w-full max-w-md origin-left bg-white/10"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="max-w-md text-sm font-normal italic leading-relaxed text-white/85 sm:text-base"
          >
            Team building corporate, séminaires, stands sur mesure et gestion déléguée au Maroc.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <button type="button" onClick={() => scrollTo("#services")} className="btn-outline">
              <span>Nos Services</span>
            </button>
            <button type="button" onClick={() => scrollTo("#contact")} className="btn-outline">
              <span>Contactez-nous</span>
            </button>
          </motion.div>
        </div>

        {/* Right — VR video */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative hidden aspect-[4/5] overflow-hidden lg:block"
        >
          <HeroVideo videoSrc={heroVideoSrc} />
        </motion.div>
      </div>

      {/* Mobile stats row */}
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-2 gap-3 px-5 pb-20 pt-4 sm:grid-cols-4 lg:hidden">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + i * 0.1 }}
            className="glass-card px-4 py-3"
          >
            <p className="font-display text-xl text-white">
              <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} goldPrefix />
            </p>
            <p className="text-[10px] uppercase tracking-wider text-luxury-muted">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Scroll line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-luxury-muted">Scroll</span>
        <motion.div
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="h-12 w-px bg-brand-red"
        />
      </motion.div>
    </section>
  );
}
