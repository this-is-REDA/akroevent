"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";
import SectionDivider from "./SectionDivider";

const numbers = [
  {
    value: 850,
    prefix: "+",
    label: "Projets Réalisés",
    description:
      "Projets, événements et activités de team building menés avec succès.",
  },
  {
    value: 98,
    suffix: "%",
    label: "Satisfaction Client",
    description:
      "Des prestations réalisées ont reçu un retour client favorable.",
  },
  {
    value: 150,
    prefix: "+",
    label: "Collaborateurs",
    description:
      "Répartis équitablement entre femmes et hommes, aux profils variés.",
  },
  {
    value: 5,
    prefix: "+",
    label: "Ans Gestion Déléguée",
    description:
      "Gestion déléguée de clubs sportifs pour OCP à El Jadida, Safi & Laayoune.",
  },
  {
    value: 15,
    prefix: "+",
    label: "Ans d'Expérience",
    description:
      "Plus de 15 ans d'expertise au service de l'événementiel marocain.",
  },
];

export default function KeyNumbers() {
  return (
    <>
      <SectionDivider />
      <section className="section-surface section-padding overflow-hidden">
        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-20 text-center"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-brand-gold">Performance</span>
            <h2 className="mt-6 font-display text-5xl uppercase tracking-wide text-white sm:text-6xl">
              Akro Event en Chiffres
            </h2>
            <div className="mx-auto mt-8 h-px w-24 bg-white/10" />
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {numbers.map((num, i) => (
              <motion.div
                key={num.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative border border-white/[0.06] px-6 py-10 text-center lg:border-0"
              >
                <p className="font-display text-5xl leading-none text-white sm:text-6xl lg:text-7xl xl:text-8xl">
                  <AnimatedCounter
                    value={num.value}
                    prefix={num.prefix}
                    suffix={num.suffix}
                    goldPrefix
                  />
                </p>
                <div className="mx-auto my-5 h-px w-8 bg-brand-red" />
                <p className="font-display text-sm uppercase tracking-[0.15em] text-white">
                  {num.label}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-luxury-muted">
                  {num.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
