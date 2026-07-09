"use client";

import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";

export default function CtaBanner() {
  const scrollTo = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 bg-brand-red" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.4)_100%)]" />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(0,0,0,0.3) 20px, rgba(0,0,0,0.3) 40px)",
        }}
        aria-hidden="true"
      />

      <div className="pointer-events-none absolute -left-20 top-1/2 -translate-y-1/2 select-none font-display text-[12rem] uppercase leading-none text-black/10 sm:text-[20rem]">
        GO
      </div>
      <div className="pointer-events-none absolute -right-10 top-1/2 -translate-y-1/2 select-none font-display text-[12rem] uppercase leading-none text-black/10 sm:text-[20rem]">
        !
      </div>

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
          className="mt-6 font-display text-5xl uppercase leading-[0.95] tracking-wide text-white sm:text-7xl lg:text-8xl"
        >
          Créons ensemble
          <br />
          votre événement
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-6 max-w-lg text-sm italic text-white/80 sm:text-base"
        >
          Team building, séminaires, stands ou gestion déléguée — obtenez un devis personnalisé en 24h.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10"
        >
          <MagneticButton
            onClick={scrollTo}
            className="inline-block border-2 border-white bg-white px-10 py-4 font-display text-sm uppercase tracking-[0.25em] text-brand-red shadow-[0_8px_40px_rgba(0,0,0,0.3)] transition-colors hover:bg-brand-dark hover:text-white"
          >
            Demander un devis →
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
