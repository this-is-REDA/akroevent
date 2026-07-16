"use client";

import { motion } from "framer-motion";

export default function CtaBanner() {
  return (
    <section className="relative overflow-hidden py-8 sm:py-10">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#FF1744_0%,#D50032_50%,#FF1744_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.18)_0%,transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.2)_100%)]" />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(0,0,0,0.3) 20px, rgba(0,0,0,0.3) 40px)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[10px] uppercase tracking-[0.4em] text-white/70"
        >
          Prêt à lancer votre projet ?
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-3 font-display text-2xl uppercase leading-[0.95] tracking-wide text-white sm:text-3xl lg:text-4xl"
        >
          Créons ensemble votre événement
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-3 max-w-lg text-xs italic text-white/80 sm:text-sm"
        >
          Team building, séminaires, stands ou gestion déléguée — devis
          personnalisé en 24h.
        </motion.p>
      </div>
    </section>
  );
}
