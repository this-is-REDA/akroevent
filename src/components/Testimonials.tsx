"use client";

import { motion } from "framer-motion";
import SectionDivider from "./SectionDivider";
import AmbientOrbs from "./AmbientOrbs";
import type { Testimonial } from "@/types/content";

export default function Testimonials({ items }: { items: Testimonial[] }) {
  if (!items.length) return null;

  return (
    <>
      <SectionDivider />
      <section id="temoignages" className="section-surface section-padding overflow-hidden">
        <AmbientOrbs />
        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <span className="section-label">Témoignages</span>
            <h2 className="heading-display-3d mt-6 font-display text-5xl uppercase tracking-wide sm:text-6xl">
              Ils nous font
              <br />
              confiance
            </h2>
            <div className="section-divider mt-8 w-full max-w-xs" />
          </motion.div>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {items.map((item, i) => (
              <motion.blockquote
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="brand-card p-6 sm:p-8"
              >
                <p className="text-base leading-relaxed text-white/85">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <footer className="mt-5">
                  <cite className="not-italic font-display text-sm uppercase tracking-[0.16em] text-white">
                    {item.author_name}
                  </cite>
                  {(item.role_title || item.company_name) && (
                    <p className="mt-1 text-sm text-white/55">
                      {[item.role_title, item.company_name].filter(Boolean).join(" — ")}
                    </p>
                  )}
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
