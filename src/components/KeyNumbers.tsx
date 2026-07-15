"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";
import SectionDivider from "./SectionDivider";
import AmbientOrbs from "./AmbientOrbs";

const numbers = [
  { value: 850, prefix: "+", label: "Projets Réalisés" },
  { value: 98, suffix: "%", label: "Satisfaction Client" },
  { value: 150, prefix: "+", label: "Collaborateurs" },
  { value: 5, prefix: "+", label: "Ans Gestion Déléguée" },
  { value: 15, prefix: "+", label: "Ans d'Expérience" },
];

export default function KeyNumbers() {
  return (
    <>
      <SectionDivider />
      <section className="section-dark relative overflow-hidden py-20 sm:py-24">
        <AmbientOrbs />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-red/15 via-transparent to-brand-gold/10" aria-hidden="true" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-14 text-center"
          >
            <span className="section-label">Performance</span>
            <h2 className="heading-display-3d mt-6 font-display text-5xl uppercase tracking-wide sm:text-6xl">
              Akro Event en Chiffres
            </h2>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {numbers.map((num, i) => (
              <motion.div
                key={num.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group brand-card relative overflow-hidden p-8 text-center"
              >
                <div className="pointer-events-none absolute -right-4 -top-4 font-display text-7xl text-brand-red/[0.06] transition-colors group-hover:text-brand-red/10">
                  0{i + 1}
                </div>
                <div className="stat-3d-stage mx-auto mb-4 w-fit">
                  <div className="stat-3d-float relative">
                    <div className="stat-3d-glow" aria-hidden="true" />
                    <p className="relative z-10 font-display text-5xl leading-none sm:text-6xl">
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
                <div className="section-divider mx-auto my-4 w-10" />
                <p className="font-display text-xs uppercase tracking-[0.2em] text-white sm:text-sm">
                  {num.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
