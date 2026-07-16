"use client";

import { motion } from "framer-motion";
import { Sparkles, Shuffle, Award, Ear } from "lucide-react";
import SectionDivider from "./SectionDivider";
import AmbientOrbs from "./AmbientOrbs";

const cards = [
  {
    icon: Sparkles,
    title: "Créativité",
    lines: [
      "Une approche innovante alliant",
      "tendances et technologies récentes.",
      "Des projets uniques, reconnus",
      "par nos partenaires publics et privés.",
    ],
  },
  {
    icon: Shuffle,
    title: "Flexibilité",
    lines: [
      "Des solutions sur mesure,",
      "adaptées à vos contraintes",
      "et aux objectifs de chaque client.",
    ],
  },
  {
    icon: Award,
    title: "Expertise",
    lines: [
      "Nous accompagnons acteurs privés",
      "et institutionnels avec exigence,",
      "en qualité, organisation et résultats.",
    ],
  },
  {
    icon: Ear,
    title: "Écoute Active",
    lines: [
      "À l’écoute de vos enjeux,",
      "nous anticipons vos besoins",
      "pour des solutions claires et impactantes.",
    ],
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
                className="group brand-card relative overflow-hidden px-6 py-8 sm:px-8 sm:py-10"
              >
                <div className="relative z-10 flex items-start gap-4 sm:gap-6">
                  {/* Numéro + titre */}
                  <div className="w-[42%] shrink-0 sm:w-[38%]">
                    <div className="flex items-center gap-3">
                      <span
                        className="font-display text-4xl leading-none tabular-nums text-brand-red/50 transition-colors duration-300 group-hover:text-brand-red/70 sm:text-5xl"
                        aria-hidden="true"
                      >
                        0{i + 1}
                      </span>
                      <h3 className="font-display text-sm uppercase tracking-[0.18em] text-white sm:text-base">
                        {card.title}
                      </h3>
                    </div>

                    <div className="mt-4 icon-glow flex h-10 w-10 items-center justify-center">
                      <card.icon
                        size={16}
                        strokeWidth={1.25}
                        className="text-brand-red transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    <div className="mt-4 h-px w-10 bg-brand-red/60 transition-all duration-300 group-hover:w-14 group-hover:bg-brand-red" />
                  </div>

                  {/* Texte en face, lignes équilibrées */}
                  <p className="flex-1 border-l border-white/10 pl-4 text-sm leading-relaxed text-white/85 sm:pl-6 sm:text-base">
                    {card.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
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
