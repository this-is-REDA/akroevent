"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import AmbientOrbs from "@/components/AmbientOrbs";
import { eventServices } from "@/data/home-sections";
import { landingServiceImages } from "@/data/landing-images";

interface EventServicesGridProps {
  id?: string;
}

export default function EventServicesGrid({ id }: EventServicesGridProps = {}) {
  return (
    <section
      id={id}
      className="section-padding relative overflow-hidden bg-brand-dark"
    >
      <AmbientOrbs />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <span className="section-label">Nos expertises</span>
          <h2 className="heading-display-3d mt-5 font-display text-4xl uppercase tracking-wide text-white sm:text-5xl lg:text-6xl">
            Une offre complète
            <br />
            pour vos projets
          </h2>
          <div className="section-divider mt-6 max-w-xs" />
        </motion.div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {eventServices.map((service, i) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="brand-card group overflow-hidden p-0"
            >
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={
                    landingServiceImages[
                      service.title as keyof typeof landingServiceImages
                    ]
                  }
                  alt={service.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent" />
                <div className="absolute bottom-4 left-4 inline-flex h-11 w-11 items-center justify-center border border-brand-red/30 bg-brand-red/10 text-brand-red backdrop-blur-sm transition-colors group-hover:bg-brand-red group-hover:text-white">
                  <service.icon size={20} />
                </div>
              </div>
              <div className="p-6 sm:p-7">
                <h3 className="font-display text-xl uppercase tracking-wide text-white">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/50">
                  {service.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
