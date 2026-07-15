"use client";

import { motion } from "framer-motion";

interface HeroVideoProps {
  videoSrc?: string;
}

export default function HeroVideo({ videoSrc = "/hero-vr.mp4" }: HeroVideoProps) {
  return (
    <div className="relative h-full w-full overflow-hidden border border-white/[0.08] bg-brand-card">
      {/* Red accent corners */}
      <span className="absolute left-0 top-0 z-10 h-5 w-5 border-l-2 border-t-2 border-brand-red" aria-hidden="true" />
      <span className="absolute right-0 top-0 z-10 h-5 w-5 border-r-2 border-t-2 border-brand-red" aria-hidden="true" />
      <span className="absolute bottom-0 left-0 z-10 h-5 w-5 border-b-2 border-l-2 border-brand-red" aria-hidden="true" />
      <span className="absolute bottom-0 right-0 z-10 h-5 w-5 border-b-2 border-r-2 border-brand-red" aria-hidden="true" />

      <video
        key={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        className="h-full w-full object-cover"
        aria-label="Expérience immersive Akro Event"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Cinematic overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-brand-dark/30" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-brand-dark/40 via-transparent to-brand-dark/40" />
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(255,34,56,0.4) 100%)",
        }}
      />

      {/* Live badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-5 left-5 flex items-center gap-2 border border-white/10 bg-brand-dark/80 px-3 py-1.5 backdrop-blur-md"
        style={{ boxShadow: "0 0 20px rgba(232, 25, 44, 0.2)" }}
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-red opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-red" />
        </span>
        <span className="text-[9px] uppercase tracking-[0.2em] text-white/70">
          Expérience immersive
        </span>
      </motion.div>
    </div>
  );
}
