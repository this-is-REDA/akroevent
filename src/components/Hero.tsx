"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import ParticleBackground from "./ParticleBackground";
import AmbientOrbs from "./AmbientOrbs";
import SplitText from "./SplitText";
import GlitchText from "./GlitchText";
import MagneticButton from "./MagneticButton";
import MarqueeBand from "./MarqueeBand";

interface HeroProps {
  heroVideoSrc?: string;
}

export default function Hero({ heroVideoSrc = "/hero-vr.mp4" }: HeroProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const videoX = useTransform(springX, [-0.5, 0.5], ["-3%", "3%"]);
  const videoY = useTransform(springY, [-0.5, 0.5], ["-3%", "3%"]);
  const videoScale = useTransform(springY, [-0.5, 0.5], [1.08, 1.12]);
  const contentX = useTransform(springX, [-0.5, 0.5], ["2%", "-2%"]);
  const contentY = useTransform(springY, [-0.5, 0.5], ["2%", "-2%"]);
  const watermarkX = useTransform(springX, [-0.5, 0.5], ["-3%", "3%"]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="accueil"
      className="relative flex h-[100svh] max-h-[100svh] min-h-[560px] flex-col overflow-hidden bg-brand-dark"
    >
      <motion.div
        className="absolute inset-0"
        style={{ x: videoX, y: videoY, scale: videoScale }}
      >
        <video
          key={heroVideoSrc}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
          aria-hidden="true"
        >
          <source src={heroVideoSrc} type="video/mp4" />
        </video>
      </motion.div>

      <div className="cinematic-overlay absolute inset-0 z-[1]" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-brand-dark via-brand-dark/92 to-brand-dark/25" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-brand-dark via-brand-dark/40 to-brand-dark/70" />
      <div className="absolute inset-x-0 top-0 z-[2] h-16 bg-brand-dark/80 sm:h-20" />
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_20%_50%,rgba(255,23,68,0.42)_0%,transparent_60%)]" />
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_80%_80%,rgba(255,213,79,0.12)_0%,transparent_50%)]" />

      <motion.div
        className="pointer-events-none absolute inset-0 z-[3] flex items-center justify-end overflow-hidden pr-0 lg:pr-8"
        style={{ x: watermarkX }}
        aria-hidden="true"
      >
        <p className="select-none font-display text-[12vw] uppercase leading-[0.8] tracking-tight text-white/[0.03] lg:text-[9vw]">
          AKRO
          <br />
          EVENT
        </p>
      </motion.div>

      <AmbientOrbs variant="hero" />
      <div
        className="grid-premium pointer-events-none absolute inset-0 z-[4] opacity-30"
        aria-hidden="true"
      />
      <ParticleBackground />

      <motion.div
        className="relative z-10 flex min-h-0 flex-1 flex-col justify-center px-5 pb-4 pt-16 sm:px-8 sm:pt-[4.5rem] lg:px-12"
        style={{ x: contentX, y: contentY }}
      >
        <div className="mx-auto w-full max-w-7xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-4 flex flex-wrap items-center gap-2 sm:mb-5 sm:gap-3"
          >
            <span className="live-badge animate-glow-pulse">
              <span className="live-dot" aria-hidden="true" />
              Live Experience
            </span>
            <span className="section-label">Agence Événementielle · Maroc</span>
          </motion.div>

          <h1 className="hero-title-font mb-4 flex max-w-4xl flex-col gap-3 font-brittany normal-case leading-[1.2] tracking-normal sm:mb-5 sm:gap-4 text-[clamp(1.85rem,5.2vw,3.75rem)]">
            <span className="block">
              <SplitText
                text="Unleash the "
                className="font-brittany text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
                delay={0.05}
              />
              <GlitchText
                text="fun,"
                className="font-brittany text-gradient-fire"
                delay={0.2}
              />
            </span>
            <span className="block">
              <SplitText
                text="boost the "
                className="font-brittany text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
                delay={0.3}
              />
              <GlitchText
                text="team!"
                className="font-brittany text-gradient-fire"
                delay={0.45}
              />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="max-w-lg border-l-2 border-brand-red pl-3 text-sm font-light italic leading-relaxed text-white/85 sm:pl-4 sm:text-base"
          >
            Team building corporate, séminaires, stands sur mesure et gestion
            déléguée — partout au Maroc.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.6 }}
            className="mt-4 flex flex-wrap gap-3 sm:mt-5"
          >
            <MagneticButton
              onClick={() => scrollTo("#services")}
              className="btn-primary btn-shine !px-5 !py-2.5 sm:!px-6 sm:!py-3"
            >
              Découvrir nos services →
            </MagneticButton>
            <MagneticButton
              onClick={() => scrollTo("#contact")}
              className="btn-outline !px-5 !py-2.5 sm:!px-6 sm:!py-3"
            >
              <span>Demander un devis</span>
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>

      <div className="relative z-20 shrink-0">
        <MarqueeBand compact />
      </div>
    </section>
  );
}
