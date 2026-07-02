"use client";

import { motion } from "framer-motion";
import { clients } from "@/data/clients";
import ClientLogo from "./ClientLogo";
import SectionDivider from "./SectionDivider";

export default function Clients() {
  return (
    <>
      <SectionDivider />
      <section id="references" className="section-surface section-padding overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 bg-grid opacity-40"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16 text-center"
          >
            <span className="section-label">Ils Nous Font Confiance</span>
            <h2 className="heading-display-3d mt-6 font-display text-5xl uppercase tracking-wide sm:text-6xl">
              Nos Références
            </h2>
            <div className="section-divider mx-auto mt-8 w-24" />
            <p className="mx-auto mt-6 max-w-2xl text-base text-luxury-muted">
              Des partenaires publics et privés de premier plan, témoins de la
              confiance accordée à notre expertise.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-px bg-black/[0.06] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {clients.map((client, i) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
                className="group flex h-20 items-center justify-center bg-brand-card px-4 transition-all duration-300 hover:bg-brand-dark hover:shadow-card sm:h-24"
                title={client.name}
              >
                <div className="opacity-60 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100">
                  <ClientLogo client={client} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
