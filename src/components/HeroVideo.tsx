"use client";

import { motion } from "framer-motion";

interface HeroVideoProps {
  videoSrc?: string;
  bleed?: boolean;
}

export default function HeroVideo({ videoSrc = "/hero-vr.mp4", bleed = false }: HeroVideoProps) {
  if (bleed) {
    return (
      <div className="relative h-full w-full overflow-hidden bg-brand-secondary">
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
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[28%] min-w-[6rem] max-w-[12rem]"
          style={{
            background:
              "linear-gradient(to right, #FAF9F6 0%, #FAF9F6 35%, rgba(250, 249, 246, 0.85) 55%, transparent 100%)",
          }}
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-brand-secondary">
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
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
    </div>
  );
}
