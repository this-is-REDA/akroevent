"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import AmbientOrbs from "@/components/AmbientOrbs";
import SectionDivider from "@/components/SectionDivider";
import { landingShowcase } from "@/data/landing-images";

export default function EventShowcase() {
  return (
    <>
      <SectionDivider />
      <section className="section-padding relative overflow-hidden bg-brand-dark">
        <AmbientOrbs />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <span className="section-label">Nos univers</span>
            <h2 className="heading-display-3d mt-5 font-display text-4xl uppercase tracking-wide text-white sm:text-5xl lg:text-6xl">
              Des expériences
              <br />
              qui marquent
            </h2>
            <div className="section-divider mt-6 max-w-xs" />
            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/55">
              Team building, séminaires, stands sur mesure et gestion
              opérationnelle — découvrez l&apos;univers Akro Event à travers nos
              domaines d&apos;expertise.
            </p>
          </motion.div>

          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {landingShowcase.map((item, i) => (
              <motion.figure
                key={item.src}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="group relative aspect-[4/3] overflow-hidden border border-white/[0.08]"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <span className="font-display text-sm uppercase tracking-[0.2em] text-white sm:text-base">
                    {item.caption}
                  </span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
