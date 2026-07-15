"use client";

import { motion } from "framer-motion";
import { Sparkles, Shuffle, Award, Ear } from "lucide-react";
import SectionDivider from "./SectionDivider";
import AmbientOrbs from "./AmbientOrbs";

const cards = [
  {
    icon: Sparkles,
    title: "Créativité",
    description:
      "Une approche innovante combinant tendances émergentes et technologies récentes. Akro Event conçoit des projets uniques, reconnus par des partenaires publics et privés.",
  },
  {
    icon: Shuffle,
    title: "Flexibilité",
    description:
      "Notre approche flexible nous permet de concevoir des solutions sur mesure, adaptées aux contraintes et aux objectifs de chaque client.",
  },
  {
    icon: Award,
    title: "Expertise",
    description:
      "Grâce à notre expertise, nous avons accompagné de nombreux acteurs institutionnels et organismes étatiques, en répondant à des exigences élevées en qualité et performance.",
  },
  {
    icon: Ear,
    title: "Écoute Active",
    description:
      "Toujours à l'écoute de nos clients, nos équipes anticipent leurs enjeux afin de proposer des solutions innovantes, pertinentes et à fort impact.",
  },
];

export default function WhyChooseUs() {
  return (
    <>
      <SectionDivider />
      <section className="section-surface section-padding overflow-hidden">
        <AmbientOrbs />
        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <span className="section-label">Nos Atouts</span>
            <h2 className="heading-display-3d mt-6 font-display text-5xl uppercase tracking-wide sm:text-6xl">
              Pourquoi Nous
              <br />
              Choisir ?
            </h2>
            <div className="section-divider mt-8 w-full max-w-xs" />
          </motion.div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2">
            {cards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="group brand-card relative min-h-[300px] overflow-hidden px-6 py-10 sm:px-10 sm:py-12"
              >
                <span
                  className="pointer-events-none absolute left-6 top-8 font-display text-6xl leading-none tabular-nums text-brand-red/45 transition-colors duration-300 group-hover:text-brand-red/65 sm:left-10 sm:top-10 sm:text-7xl lg:text-8xl"
                  aria-hidden="true"
                >
                  0{i + 1}
                </span>

                <div className="relative z-10 pt-16 sm:pt-20">
                  <div className="icon-glow flex h-12 w-12 items-center justify-center">
                    <card.icon
                      size={18}
                      strokeWidth={1.25}
                      className="text-brand-red transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <h3 className="mt-6 font-display text-base uppercase tracking-[0.2em] text-white sm:text-lg">
                    {card.title}
                  </h3>

                  <div className="my-5 h-px w-10 bg-brand-red/60 transition-all duration-300 group-hover:w-14 group-hover:bg-brand-red" />

                  <p className="max-w-md text-sm leading-relaxed text-white/90 sm:text-base">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
