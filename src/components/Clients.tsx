"use client";

import { motion } from "framer-motion";
import SectionDivider from "./SectionDivider";
import AmbientOrbs from "./AmbientOrbs";
import LogoMarquee from "./LogoMarquee";

export default function Clients() {
  return (
    <>
      <SectionDivider />
      <section id="references" className="section-dark section-padding overflow-hidden">
        <AmbientOrbs />
        <div className="grid-premium pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

        <div className="relative mx-auto max-w-7xl">
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
            <p className="mx-auto mt-6 max-w-2xl text-base text-luxury-muted">
              Des partenaires publics et privés de premier plan, témoins de la
              confiance accordée à notre expertise.
            </p>
          </motion.div>

          <LogoMarquee />
        </div>
      </section>
    </>
  );
}
