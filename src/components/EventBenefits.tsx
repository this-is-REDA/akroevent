"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionDivider from "@/components/SectionDivider";
import { eventBenefits } from "@/data/home-sections";
import { landingBenefitsCollage } from "@/data/landing-images";

export default function EventBenefits() {
  return (
    <>
      <SectionDivider />
      <section className="section-padding relative overflow-hidden bg-brand-secondary">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative col-span-2 aspect-[16/10] overflow-hidden border border-white/[0.08]"
              >
                <Image
                  src={landingBenefitsCollage[0].src}
                  alt={landingBenefitsCollage[0].alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-secondary/80 to-transparent" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="relative aspect-[4/5] overflow-hidden border border-white/[0.08]"
              >
                <Image
                  src={landingBenefitsCollage[1].src}
                  alt={landingBenefitsCollage[1].alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="relative aspect-[4/5] overflow-hidden border border-white/[0.08]"
              >
                <Image
                  src={landingBenefitsCollage[2].src}
                  alt={landingBenefitsCollage[2].alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </motion.div>
            </div>

            <div>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="section-label">Pourquoi Akro Event</span>
                <h2 className="heading-display-3d mt-5 font-display text-4xl uppercase tracking-wide text-white sm:text-5xl">
                  L&apos;expertise au service
                  <br />
                  de votre réussite
                </h2>
              </motion.div>

              <div className="mt-14 space-y-6">
                {eventBenefits.map((benefit, i) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card flex gap-5 p-6 sm:p-7"
                  >
                    <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-brand-gold/30 text-brand-gold">
                      <benefit.icon size={22} />
                    </div>
                    <div>
                      <h3 className="font-display text-xl uppercase tracking-wide text-white">
                        {benefit.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/50">
                        {benefit.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
