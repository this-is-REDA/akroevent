"use client";

import { motion } from "framer-motion";
import { clients } from "@/data/clients";
import ClientLogo from "./ClientLogo";
import SectionDivider from "./SectionDivider";

export default function Clients() {
  return (
    <>
      <SectionDivider />
      <section id="references" className="section-dark section-padding overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 bg-grid bg-grid opacity-50"
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
            <span className="text-xs uppercase tracking-[0.3em] text-brand-gold">
              Ils Nous Font Confiance
            </span>
            <h2 className="mt-6 font-display text-5xl uppercase tracking-wide text-white sm:text-6xl">
              Nos Références
            </h2>
            <div className="mx-auto mt-8 h-px w-24 bg-white/10" />
            <p className="mx-auto mt-6 max-w-2xl text-base text-luxury-muted">
              Des partenaires publics et privés de premier plan, témoins de la
              confiance accordée à notre expertise.
            </p>
          </motion.div>

          {/* Logo grid — all 24 clients */}
          <div className="grid grid-cols-2 gap-px bg-white/[0.06] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {clients.map((client, i) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
                className="group flex h-20 items-center justify-center bg-brand-dark px-4 transition-all duration-300 hover:bg-brand-card sm:h-24"
                title={client.name}
              >
                <div className="opacity-50 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100">
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
