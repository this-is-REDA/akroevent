"use client";

import Image from "next/image";
import { clients } from "@/data/clients";
import type { ClientLogoPublic } from "@/types/client-logos";
import { resolveLogoSrc } from "@/lib/logo-src";

const defaultLogos: ClientLogoPublic[] = clients.map((client) => ({
  id: client.id,
  name: client.name,
  src: resolveLogoSrc(client.id, client.name, client.logo),
}));

const LOGO_SCALE_RULES: { test: RegExp; scale: string }[] = [
  { test: /attijari|tijari|wafa/i, scale: "scale-[1.55]" },
  { test: /\bocp\b/i, scale: "scale-[1.15]" },
  { test: /mazagan/i, scale: "scale-[1.7]" },
  { test: /renault/i, scale: "scale-[1.25]" },
];

function getLogoScale(id: string, name: string): string {
  const haystack = `${id} ${name}`;
  return LOGO_SCALE_RULES.find((rule) => rule.test.test(haystack))?.scale ?? "";
}

function isNestleLogo(id: string, name: string): boolean {
  return /nestle|nestlé/i.test(`${id} ${name}`);
}

interface LogoMarqueeProps {
  logos?: ClientLogoPublic[];
}

export default function LogoMarquee({ logos }: LogoMarqueeProps) {
  const list = (logos && logos.length > 0 ? logos : defaultLogos).map((logo) => ({
    ...logo,
    src: resolveLogoSrc(logo.id, logo.name, logo.src),
  }));
  const track = [...list, ...list];

  return (
    <div className="relative overflow-hidden py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-brand-dark to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-brand-dark to-transparent sm:w-32" />

      <div className="animate-marquee-clients flex w-max gap-12">
        {track.map((logo, i) => {
          const nestle = isNestleLogo(logo.id, logo.name);
          const scale = nestle ? "" : getLogoScale(logo.id, logo.name);
          const isSvg = logo.src.endsWith(".svg");

          return (
            <div
              key={`${logo.id}-${i}`}
              className={
                nestle
                  ? "relative flex h-20 w-44 shrink-0 items-center justify-center border border-white/25 bg-white px-1.5 sm:h-24 sm:w-52 sm:px-2"
                  : "flex h-20 w-44 shrink-0 items-center justify-center overflow-hidden border border-white/25 bg-white px-3 sm:h-24 sm:w-52 sm:px-4"
              }
              title={logo.name}
            >
              <div
                className={
                  nestle
                    ? "relative h-[92%] w-[98%]"
                    : `relative h-14 w-full max-w-[170px] sm:h-16 sm:max-w-[190px] ${scale}`
                }
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  fill
                  sizes={nestle ? "320px" : "190px"}
                  className="object-contain object-center"
                  unoptimized={isSvg}
                  priority={nestle}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
