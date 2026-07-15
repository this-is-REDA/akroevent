"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SectionDivider from "./SectionDivider";
import AmbientOrbs from "./AmbientOrbs";
import { faqItems } from "@/data/faq";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      <SectionDivider />
      <section id="faq" className="section-surface section-padding overflow-hidden">
        <AmbientOrbs />
        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mx-auto mb-14 max-w-2xl text-center"
          >
            <span className="section-label">FAQ</span>
            <h2 className="heading-display-3d mt-6 font-display text-5xl uppercase tracking-wide sm:text-6xl">
              Questions
              <br />
              Fréquentes
            </h2>
            <div className="section-divider mx-auto mt-8 w-32" />
            <p className="mx-auto mt-6 max-w-lg text-base font-light leading-relaxed text-white/70">
              Les réponses aux questions les plus posées sur Akro Event, nos
              services et l&apos;organisation d&apos;événements au Maroc.
            </p>
          </motion.div>

          <div className="mx-auto max-w-4xl border border-white/[0.08]">
            {faqItems.map((item, i) => {
              const isOpen = openIndex === i;
              const num = String(i + 1).padStart(2, "0");

              return (
                <motion.div
                  key={item.question}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: Math.min(i * 0.04, 0.3) }}
                  className="border-b border-white/[0.08] last:border-b-0"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-start gap-4 px-5 py-6 text-left transition-colors hover:bg-white/[0.02] sm:gap-6 sm:px-8 sm:py-7"
                  >
                    <span
                      className={`shrink-0 font-display text-2xl tabular-nums transition-colors sm:text-3xl ${
                        isOpen ? "text-brand-red" : "text-brand-red/35 group-hover:text-brand-red/60"
                      }`}
                    >
                      {num}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className={`block font-display text-base uppercase tracking-[0.12em] transition-colors sm:text-lg ${
                          isOpen ? "text-white" : "text-white/85 group-hover:text-white"
                        }`}
                      >
                        {item.question}
                      </span>
                    </span>
                    <ChevronDown
                      size={18}
                      strokeWidth={1.5}
                      className={`mt-1 shrink-0 text-brand-gold transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-white/[0.06] px-5 pb-7 pl-[3.75rem] sm:px-8 sm:pl-[4.75rem]">
                          <div className="section-divider mb-5 w-10" />
                          <p className="max-w-2xl text-sm font-light leading-relaxed text-white/75 sm:text-base">
                            {item.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
