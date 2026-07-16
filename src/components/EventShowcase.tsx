"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import AmbientOrbs from "@/components/AmbientOrbs";
import SectionDivider from "@/components/SectionDivider";
import { landingShowcase } from "@/data/landing-images";

export default function EventShowcase() {
  return (
    <>
      <SectionDivider />
      <section
        id="experiences"
        className="section-padding relative overflow-hidden bg-brand-dark"
      >
        <AmbientOrbs />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="section-label">Nos univers</span>
            <h2 className="heading-display-3d mt-4 font-display text-4xl uppercase tracking-wide text-white sm:text-5xl">
              Des expériences
              <br />
              qui marquent
            </h2>
            <div className="section-divider mx-auto mt-5 max-w-xs" />
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/70 sm:text-base">
              Team building, événements corporate, stands sur mesure et gestion
              opérationnelle — découvrez l&apos;univers Akro Event à travers nos
              domaines d&apos;expertise.
            </p>
          </motion.div>

          <div className="mx-auto mt-8 flex max-w-5xl flex-col gap-4">
            {landingShowcase.map((item, i) => {
              const reverse = i % 2 === 1;
              return (
                <motion.div
                  key={item.slug}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.6 }}
                >
                  <Link
                    href={`/univers/${item.slug}`}
                    className={`group grid overflow-hidden border border-white/[0.08] transition-colors hover:border-brand-red/40 md:grid-cols-2 ${
                      reverse ? "md:[direction:rtl]" : ""
                    }`}
                  >
                    <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[260px] md:[direction:ltr]">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/50 via-transparent to-transparent md:hidden" />
                    </div>

                    <div className="relative flex flex-col justify-end bg-brand-secondary/80 p-6 sm:p-8 md:justify-center md:p-10 md:[direction:ltr]">
                      <div
                        className={`absolute top-0 hidden h-full w-1 bg-brand-red md:block ${
                          reverse ? "right-0" : "left-0"
                        }`}
                        aria-hidden="true"
                      />
                      <span className="text-[10px] uppercase tracking-[0.35em] text-brand-gold">
                        0{i + 1}
                      </span>
                      <h3 className="heading-display-3d mt-3 font-display text-2xl uppercase tracking-wide text-white sm:text-3xl lg:text-4xl">
                        {item.caption}
                      </h3>
                      <div className="section-divider mt-5 w-16" />
                      <span className="mt-6 inline-flex items-center gap-2 font-display text-xs uppercase tracking-[0.22em] text-white/55 transition-colors group-hover:text-brand-red">
                        Découvrir
                        <ArrowUpRight
                          size={14}
                          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
