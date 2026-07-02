"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";
import ParticleBackground from "./ParticleBackground";
import AmbientOrbs from "./AmbientOrbs";
import SplitText from "./SplitText";
import Scanlines from "./Scanlines";
import FloatingShapes from "./FloatingShapes";
import GlitchText from "./GlitchText";
import MagneticButton from "./MagneticButton";

const stats = [
  { value: 850, prefix: "+", label: "projets" },
  { value: 98, suffix: "%", label: "satisfaction" },
  { value: 150, prefix: "+", label: "collaborateurs" },
  { value: 15, prefix: "+", label: "ans d'expérience" },
];

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
    <section id="accueil" className="relative min-h-screen overflow-hidden bg-brand-dark">
      <motion.div className="absolute inset-0" style={{ x: videoX, y: videoY, scale: videoScale }}>
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
      </motion.div>

      <div className="cinematic-overlay absolute inset-0 z-[1]" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-brand-dark via-brand-dark/92 to-brand-dark/25" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-brand-dark via-brand-dark/40 to-brand-dark" />
      <div className="absolute inset-x-0 top-0 z-[2] h-24 bg-brand-dark sm:h-28" />
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_25%_50%,rgba(232,25,44,0.18)_0%,transparent_50%)]" />

      {/* Giant watermark */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[3] flex items-center justify-end overflow-hidden pr-0 lg:pr-8"
        style={{ x: watermarkX }}
        aria-hidden="true"
      >
        <p className="select-none font-display text-[14vw] uppercase leading-[0.8] tracking-tight text-white/[0.03] lg:text-[11vw]">
          AKRO
          <br />
          EVENT
        </p>
      </motion.div>

      <AmbientOrbs variant="hero" />
      <FloatingShapes />
      <div className="grid-premium pointer-events-none absolute inset-0 z-[4] opacity-50" aria-hidden="true" />
      <ParticleBackground />
      <Scanlines />

      <motion.div
        className="relative z-10 flex min-h-screen flex-col justify-center px-5 pt-[3.625rem] pb-8 sm:px-8 sm:pt-[3.75rem] lg:px-12 [@media(min-height:741px)]:pb-36"
        style={{ x: contentX, y: contentY }}
      >
        <div className="mx-auto w-full max-w-7xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex flex-wrap items-center gap-3 sm:mb-10 sm:gap-4"
          >
            <span className="live-badge animate-glow-pulse">
              <span className="live-dot" aria-hidden="true" />
              Live Experience
            </span>
            <span className="section-label">Agence Événementielle · Maroc</span>
          </motion.div>

          <h1 className="hero-title-font mb-8 flex max-w-3xl flex-col gap-6 font-brittany normal-case leading-[1.3] tracking-normal sm:mb-10 sm:gap-8 text-[clamp(1.75rem,5vw,3.75rem)]">
            <span className="block">
              <SplitText text="Unleash the " className="font-brittany text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]" delay={0.2} />
              <GlitchText text="fun," className="font-brittany text-gradient-fire" delay={0.55} />
            </span>
            <span className="block">
              <SplitText text="boost the " className="font-brittany text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]" delay={0.75} />
              <GlitchText text="team!" className="font-brittany text-gradient-fire" delay={1.05} />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="max-w-lg border-l-2 border-brand-red pl-4 text-sm font-light italic leading-relaxed text-white/85 sm:pl-5 sm:text-base lg:text-lg"
          >
            Team building corporate, séminaires, stands sur mesure et gestion déléguée —
            partout au Maroc.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="mt-4 flex flex-wrap gap-3 sm:mt-5 sm:gap-4"
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

      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-4 left-4 right-4 z-20 sm:bottom-6 sm:left-8 sm:right-8 lg:left-12 lg:right-12 [@media(max-height:740px)]:hidden"
      >
        <div className="glass-card stats-strip mx-auto grid max-w-7xl grid-cols-2 sm:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 + i * 0.12 }}
              whileHover={{ scale: 1.03 }}
              className="group relative px-3 py-4 text-center sm:px-5 sm:py-5"
            >
              <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-brand-red to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <p className="font-display text-3xl text-white sm:text-4xl">
                <AnimatedCounter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  goldPrefix
                  innovative3d
                />
              </p>
              <p className="mt-2 text-[9px] uppercase tracking-[0.3em] text-luxury-muted sm:text-[10px]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-4 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex [@media(max-height:740px)]:!hidden"
      >
        <span className="text-[9px] uppercase tracking-[0.4em] text-white/40">Scroll</span>
        <div className="h-10 w-px bg-gradient-to-b from-brand-red to-transparent" />
      </motion.div>
    </section>
  );
}
