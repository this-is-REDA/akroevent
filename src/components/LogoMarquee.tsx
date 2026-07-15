"use client";

import Image from "next/image";
import { clients } from "@/data/clients";
import type { ClientLogoPublic } from "@/types/client-logos";
import { normalizeLogoSrc } from "@/lib/logo-src";

const defaultLogos: ClientLogoPublic[] = clients.map((client) => ({
  id: client.id,
  name: client.name,
  src: normalizeLogoSrc(client.logo),
}));

/** Certains logos SVG/wordmarks paraissent plus petits — on les agrandit légèrement. */
const LOGO_SCALE: Record<string, string> = {
  nestle: "scale-[3.2]",
  renault: "scale-[1.25]",
};

interface LogoMarqueeProps {
  logos?: ClientLogoPublic[];
}

export default function LogoMarquee({ logos }: LogoMarqueeProps) {
  const list = (logos && logos.length > 0 ? logos : defaultLogos).map((logo) => ({
    ...logo,
    src: normalizeLogoSrc(logo.src),
  }));
  const track = [...list, ...list];

  return (
    <div className="relative overflow-hidden py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-brand-dark to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-brand-dark to-transparent sm:w-32" />

      <div className="animate-marquee-clients flex w-max gap-12">
        {track.map((logo, i) => {
          const scale = LOGO_SCALE[logo.id] ?? LOGO_SCALE[logo.name.toLowerCase()] ?? "";
          const isSvg = logo.src.endsWith(".svg");

          return (
            <div
              key={`${logo.id}-${i}`}
              className="flex h-20 w-44 shrink-0 items-center justify-center border border-white/25 bg-white px-3 backdrop-blur-sm sm:h-24 sm:w-52 sm:px-4"
              title={logo.name}
            >
              <div
                className={`relative h-12 w-full max-w-[150px] sm:h-14 sm:max-w-[170px] ${scale}`}
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  fill
                  sizes="170px"
                  className="object-contain"
                  unoptimized={isSvg}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
