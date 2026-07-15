"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionDivider from "./SectionDivider";
import AmbientOrbs from "./AmbientOrbs";
import LogoMarquee from "./LogoMarquee";
import type { ClientLogoPublic } from "@/types/client-logos";

const ABOUT_EXPERIENCE_IMAGE = "/images/landing/corporate-event.jpg";


const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

interface AboutProps {
  logos?: ClientLogoPublic[];
}

export default function About({ logos }: AboutProps) {
  return (
    <>
      <SectionDivider />
      <section id="apropos" className="section-dark section-padding overflow-hidden">
        <AmbientOrbs />
        <div className="grid-premium pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
        <div
          className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none font-display text-[12rem] leading-none text-white/[0.02] sm:text-[20rem] lg:text-[30rem]"
          aria-hidden="true"
        >
          15
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="relative lg:min-h-0">
            {/* Texte — définit la hauteur */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              custom={0}
              variants={fadeUp}
              className="lg:w-[calc(50%-2rem)] xl:w-[calc(50%-2.5rem)]"
            >
              <span className="section-label">Qui Sommes-Nous ?</span>
              <h2 className="heading-display-3d mt-5 font-display text-5xl uppercase leading-none tracking-wide sm:text-6xl lg:text-7xl">
                Une Agence
                <br />
                Marocaine{" "}
                <span className="heading-display-3d-accent">360°</span>
              </h2>
              <div className="section-divider my-7 w-full max-w-sm" />
              <div className="space-y-5">
                <p className="text-base font-light leading-relaxed text-white/70">
                  Akro Event est une agence marocaine 360°, spécialisée dans
                  l&apos;événementiel, la communication, la conception de stands, le
                  team building et la gestion déléguée de projets.
                </p>
                <p className="text-base font-light leading-relaxed text-white/70">
                  Forte de{" "}
                  <strong className="font-medium text-white">15 années d&apos;expertise</strong>,
                  notre agence met son savoir-faire au service de ses clients pour
                  concevoir et déployer des solutions clés en main, parfaitement
                  alignées avec leurs objectifs et leurs exigences.
                </p>
                <p className="text-base font-light leading-relaxed text-white/70">
                  Guidés par des valeurs solides d&apos;excellence, d&apos;engagement et
                  de professionnalisme, nous œuvrons chaque jour pour offrir des
                  prestations de haute qualité, en plaçant la satisfaction client au
                  cœur de chacune de nos actions.
                </p>
              </div>
            </motion.div>

            {/* Photo — même hauteur exacte que le texte (desktop) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              custom={1}
              variants={fadeUp}
              className="relative mt-10 min-h-[300px] overflow-hidden sm:min-h-[340px] lg:absolute lg:inset-y-0 lg:left-[calc(50%+2rem)] lg:right-0 lg:mt-0 lg:min-h-0 xl:left-[calc(50%+2.5rem)]"
            >
              <div className="glass-card absolute inset-0 overflow-hidden">
                <Image
                  src={ABOUT_EXPERIENCE_IMAGE}
                  alt="Événement corporate organisé par Akro Event"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-brand-dark/45" />
                <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/70 via-brand-dark/35 to-brand-red/15" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-brand-dark/30" />
                <div className="absolute left-0 top-0 z-10 h-full w-1 bg-brand-red" />
                <div className="absolute inset-x-0 top-0 z-10 h-1 bg-brand-red" />

                <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 sm:p-8 lg:p-10">
                  <span className="font-display text-[4.5rem] leading-none text-brand-red/25 sm:text-[7rem] lg:text-[8rem]">
                    15
                  </span>
                  <div>
                    <p className="heading-display-3d font-display text-2xl uppercase tracking-wide text-white sm:text-3xl">
                      Ans d&apos;Expérience
                    </p>
                    <div className="section-divider my-4 w-12" />
                    <p className="text-sm uppercase tracking-[0.2em] text-luxury-muted">
                      Au service de l&apos;événementiel marocain
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div id="references" className="mt-24 scroll-mt-28">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-12 text-center"
            >
              <span className="section-label">Ils Nous Font Confiance</span>
              <h2 className="heading-display-3d mt-6 font-display text-5xl uppercase tracking-wide sm:text-6xl lg:text-7xl">
                Nos Références
              </h2>
              <div className="section-divider mx-auto mt-8 w-32" />
              <p className="mx-auto mt-6 max-w-2xl text-base font-light text-white/70">
                Des partenaires publics et privés de premier plan, témoins de la
                confiance accordée à notre expertise.
              </p>
            </motion.div>

            <LogoMarquee logos={logos} />
          </div>
        </div>
      </section>
    </>
  );
}
