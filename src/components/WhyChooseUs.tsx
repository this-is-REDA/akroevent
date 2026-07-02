"use client";

import { motion } from "framer-motion";
import { Sparkles, Shuffle, Award, Ear } from "lucide-react";
import SectionDivider from "./SectionDivider";

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
      <section className="section-surface section-padding">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-brand-gold">Nos Atouts</span>
            <h2 className="heading-display-3d mt-6 font-display text-5xl uppercase tracking-wide sm:text-6xl">
              Pourquoi Nous
              <br />
              Choisir ?
            </h2>
            <div className="mt-8 h-px w-full max-w-xs bg-white/10" />
          </motion.div>

          <div className="mt-20 grid gap-px bg-white/[0.06] sm:grid-cols-2">
            {cards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group relative min-h-[320px] bg-brand-secondary px-6 py-10 transition-colors duration-300 hover:bg-white/[0.03] sm:px-10 sm:py-12 lg:min-h-[340px] lg:px-12 lg:py-14"
              >
                <span
                  className="pointer-events-none absolute left-6 top-8 font-display text-6xl leading-none tabular-nums text-white/35 transition-colors duration-300 group-hover:text-white/55 sm:left-10 sm:top-10 sm:text-7xl lg:left-12 lg:text-8xl"
                  aria-hidden="true"
                >
                  0{i + 1}
                </span>

                <div className="relative z-10 pt-16 sm:pt-20">
                  <div className="flex h-10 w-10 items-center justify-center border border-brand-red/25 transition-colors duration-300 group-hover:border-brand-red/50 group-hover:bg-brand-red/5">
                    <card.icon
                      size={18}
                      strokeWidth={1.25}
                      className="text-brand-red transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <h3 className="mt-6 font-display text-sm uppercase tracking-[0.2em] text-white sm:text-base">
                    {card.title}
                  </h3>

                  <div className="my-5 h-px w-10 bg-brand-red/60 transition-all duration-300 group-hover:w-14 group-hover:bg-brand-red" />

                  <p className="max-w-md text-sm leading-relaxed text-white/65">
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
