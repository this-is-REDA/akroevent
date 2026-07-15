"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import AmbientOrbs from "@/components/AmbientOrbs";
import type { UniversItem } from "@/data/univers";
import { universItems } from "@/data/univers";

type Props = {
  item: UniversItem;
};

export default function UniversDetail({ item }: Props) {
  const others = universItems.filter((u) => u.slug !== item.slug);

  return (
    <section className="relative overflow-hidden bg-brand-dark pb-20 pt-28 sm:pb-24 sm:pt-32 lg:pb-28 lg:pt-36">
      <AmbientOrbs />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <Link
          href="/#experiences"
          className="mb-8 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-white/50 transition-colors hover:text-brand-red"
        >
          <ArrowLeft size={14} />
          Retour aux expériences
        </Link>

        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-[4/3] overflow-hidden border border-white/[0.08] lg:sticky lg:top-28 lg:aspect-auto lg:min-h-[520px]"
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-transparent to-brand-dark/20" />
            <div className="absolute left-0 top-0 h-full w-1 bg-brand-red" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
          >
            <span className="section-label">{item.subtitle}</span>
            <h1 className="heading-display-3d mt-5 font-display text-4xl uppercase tracking-wide text-white sm:text-5xl lg:text-6xl">
              {item.title}
            </h1>
            <div className="section-divider mt-6 max-w-xs" />
            <p className="mt-6 text-base font-light leading-relaxed text-white/70">
              {item.description}
            </p>

            <ul className="mt-8 space-y-3">
              {item.details.map((detail) => (
                <li
                  key={detail}
                  className="flex gap-3 text-sm leading-relaxed text-white/65"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-brand-red" />
                  {detail}
                </li>
              ))}
            </ul>

            <div className="mt-12 space-y-8">
              {item.categories.map((category) => (
                <div key={category.label}>
                  <h2 className="font-display text-lg uppercase tracking-[0.18em] text-white">
                    {category.label}
                  </h2>
                  <div className="section-divider my-3 w-10" />
                  <ul className="flex flex-wrap gap-2">
                    {category.items.map((entry) => (
                      <li
                        key={entry}
                        className="border border-white/[0.1] bg-white/[0.03] px-3 py-1.5 text-xs text-white/70"
                      >
                        {entry}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-wrap gap-4">
              <Link href="/#contact" className="btn-primary">
                Demander un devis
              </Link>
              <Link
                href="/galerie"
                className="inline-flex items-center gap-2 border border-white/20 px-6 py-3 font-display text-sm uppercase tracking-[0.2em] text-white/80 transition-colors hover:border-white/40 hover:text-white"
              >
                Voir la galerie
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="mt-20 border-t border-white/[0.08] pt-12">
          <p className="mb-6 text-[10px] uppercase tracking-[0.3em] text-brand-gold">
            Autres univers
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {others.map((other) => (
              <Link
                key={other.slug}
                href={`/univers/${other.slug}`}
                className="group relative aspect-[16/10] overflow-hidden border border-white/[0.08]"
              >
                <Image
                  src={other.src}
                  alt={other.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/30 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-4 font-display text-sm uppercase tracking-[0.18em] text-white">
                  {other.caption}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
