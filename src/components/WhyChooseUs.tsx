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
            <h2 className="mt-6 font-display text-5xl uppercase tracking-wide text-white sm:text-6xl">
              Pourquoi Nous
              <br />
              Choisir ?
            </h2>
            <div className="mt-8 h-px w-full max-w-xs bg-white/10" />
          </motion.div>

          <div className="mt-20 grid gap-px bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ backgroundColor: "rgba(255,255,255,0.04)" }}
                className="group relative bg-brand-secondary p-6 transition-all duration-300 sm:p-8"
              >
                <span className="font-display text-5xl text-white/[0.04]">
                  0{i + 1}
                </span>
                <card.icon
                  size={20}
                  strokeWidth={1}
                  className="mt-4 text-brand-red transition-transform duration-300 group-hover:scale-110"
                />
                <h3 className="mt-6 font-display text-2xl uppercase tracking-wide text-white">
                  {card.title}
                </h3>
                <div className="my-4 h-px w-8 bg-brand-red/50 transition-all duration-300 group-hover:w-16" />
                <p className="text-sm leading-relaxed text-luxury-muted">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
