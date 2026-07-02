"use client";

import { motion } from "framer-motion";
import { Users, Lightbulb, Trophy } from "lucide-react";
import SectionDivider from "./SectionDivider";

const pillars = [
  {
    icon: Users,
    title: "Le Travail d'Équipe",
    subtitle: "est notre moteur",
    description:
      "Une équipe soudée et passionnée, unie par la conviction que la collaboration est la clé de toute réussite.",
  },
  {
    icon: Lightbulb,
    title: "L'Innovation",
    subtitle: "est notre carburant",
    description:
      "Nous repoussons les limites de l'événementiel en intégrant tendances émergentes et technologies de pointe.",
  },
  {
    icon: Trophy,
    title: "La Réussite Collective",
    subtitle: "est notre destination",
    description:
      "Chaque projet est une victoire partagée — celle de nos clients, de nos équipes et de nos partenaires.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function About() {
  return (
    <>
      <SectionDivider />
      <section id="apropos" className="section-dark section-padding overflow-hidden">
        {/* Decorative background number */}
        <div
          className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none font-display text-[12rem] leading-none text-black/[0.03] sm:text-[20rem] lg:text-[30rem]"
          aria-hidden="true"
        >
          15
        </div>

        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid items-start gap-16 lg:grid-cols-2 lg:gap-24"
          >
            <motion.div custom={0} variants={fadeUp}>
              <span className="section-label">Qui Sommes-Nous ?</span>
              <h2 className="heading-display-3d mt-6 font-display text-5xl uppercase leading-none tracking-wide sm:text-6xl lg:text-7xl">
                Une Agence
                <br />
                Marocaine{" "}
                <span className="heading-display-3d-accent">360°</span>
              </h2>
              <div className="section-divider my-8 w-full max-w-sm" />
              <p className="text-base leading-relaxed text-luxury-muted">
                Akro Event est une agence marocaine 360°, spécialisée dans
                l&apos;événementiel, la communication, la conception de stands, le
                team building et la gestion déléguée de projets.
              </p>
              <p className="mt-5 text-base leading-relaxed text-luxury-muted">
                Forte de{" "}
                <strong className="font-medium text-brand-ink">15 années d&apos;expertise</strong>,
                notre agence met son savoir-faire au service de ses clients pour
                concevoir et déployer des solutions clés en main, parfaitement
                alignées avec leurs objectifs et leurs exigences.
              </p>
              <p className="mt-5 text-base leading-relaxed text-luxury-muted">
                Guidés par des valeurs solides d&apos;excellence, d&apos;engagement et
                de professionnalisme, nous œuvrons chaque jour pour offrir des
                prestations de haute qualité, en plaçant la satisfaction client au
                cœur de chacune de nos actions.
              </p>
            </motion.div>

            <motion.div custom={1} variants={fadeUp} className="relative">
              <div className="glass-card relative p-6 sm:p-10 lg:p-14">
                <div className="absolute left-0 top-0 h-full w-1 bg-brand-red" />
                <span className="font-display text-[5rem] leading-none text-brand-red/20 sm:text-[8rem] lg:text-[10rem]">
                  15
                </span>
                <p className="heading-display-3d mt-4 font-display text-3xl uppercase tracking-wide">
                  Ans d&apos;Expérience
                </p>
                <div className="my-6 h-px w-12 bg-brand-gold" />
                <p className="text-sm uppercase tracking-[0.2em] text-luxury-muted">
                  Au service de l&apos;événementiel marocain
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Value pillars */}
          <div className="mt-24 grid gap-6 md:grid-cols-3">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                custom={i}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className="glass-card group relative overflow-hidden p-8 transition-all duration-300 hover:border-brand-red/20"
              >
                <div className="absolute left-0 top-0 h-full w-1 bg-brand-red/0 transition-colors duration-300 group-hover:bg-brand-red" />
                <pillar.icon size={22} strokeWidth={1} className="text-brand-red" />
                <h3 className="mt-6 font-display text-2xl uppercase tracking-wide text-brand-ink">
                  {pillar.title}
                </h3>
                <p className="mt-1 text-xs font-light italic text-brand-gold">
                  {pillar.subtitle}
                </p>
                <div className="section-divider my-4 w-8" />
                <p className="text-sm leading-relaxed text-luxury-muted">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
