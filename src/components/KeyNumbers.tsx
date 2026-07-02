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
      <section className="section-surface section-padding">
        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-20 text-center"
          >
            <span className="section-label">Performance</span>
            <h2 className="heading-display-3d mt-6 font-display text-5xl uppercase tracking-wide sm:text-6xl">
              Akro Event en Chiffres
            </h2>
            <div className="section-divider mx-auto mt-8 w-24" />
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {numbers.map((num, i) => (
              <motion.div
                key={num.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group relative bg-brand-card px-6 py-10 text-center shadow-card transition-all duration-300 hover:shadow-card-hover sm:px-8 sm:py-12"
              >
                <div className="stat-3d-stage mx-auto mb-5 w-fit">
                  <div className="stat-3d-float relative px-2 py-1">
                    <div className="stat-3d-glow" aria-hidden="true" />
                    <div className="stat-3d-plate" aria-hidden="true" />
                    <p className="relative z-10 font-display text-5xl leading-none tracking-tight tabular-nums sm:text-6xl lg:text-7xl">
                      <AnimatedCounter
                        value={num.value}
                        prefix={num.prefix}
                        suffix={num.suffix}
                        goldPrefix
                        innovative3d
                      />
                    </p>
                  </div>
                </div>
                <div className="mx-auto my-5 h-px w-10 bg-brand-red/50 transition-all duration-300 group-hover:w-12 group-hover:bg-brand-red" />
                <p className="font-display text-xs uppercase tracking-[0.2em] text-brand-ink sm:text-sm">
                  {num.label}
                </p>
                <p className="mx-auto mt-3 max-w-[14rem] text-xs leading-relaxed text-luxury-muted sm:text-sm">
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
