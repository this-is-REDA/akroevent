"use client";

import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";

export default function CtaBanner() {
  const scrollTo = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden py-14 sm:py-16">
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

      <div className="pointer-events-none absolute -left-20 top-1/2 -translate-y-1/2 select-none font-display text-[8rem] uppercase leading-none text-black/10 sm:text-[14rem]">
        GO
      </div>
      <div className="pointer-events-none absolute -right-10 top-1/2 -translate-y-1/2 select-none font-display text-[8rem] uppercase leading-none text-black/10 sm:text-[14rem]">
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
          className="mt-4 font-display text-3xl uppercase leading-[0.95] tracking-wide text-white sm:text-4xl lg:text-5xl"
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
          className="mx-auto mt-4 max-w-lg text-xs italic text-white/80 sm:text-sm"
        >
          Team building, séminaires, stands ou gestion déléguée — obtenez un devis personnalisé en 24h.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-7"
        >
          <MagneticButton
            onClick={scrollTo}
            className="inline-block border-2 border-white bg-white px-8 py-3 font-display text-xs uppercase tracking-[0.25em] text-brand-red shadow-[0_8px_40px_rgba(0,0,0,0.3)] transition-colors hover:bg-brand-dark hover:text-white sm:text-sm"
          >
            Demander un devis →
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
