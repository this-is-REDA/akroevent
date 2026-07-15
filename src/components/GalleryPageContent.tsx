"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, X } from "lucide-react";
import AmbientOrbs from "@/components/AmbientOrbs";
import type { GalleryPhotoPublic } from "@/types/gallery";

interface GalleryPageContentProps {
  photos: GalleryPhotoPublic[];
}

export default function GalleryPageContent({ photos }: GalleryPageContentProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setActiveIndex(null), []);

  const showPrev = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));
  }, [photos.length]);

  const showNext = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i + 1) % photos.length));
  }, [photos.length]);

  useEffect(() => {
    if (activeIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [activeIndex, closeLightbox, showNext, showPrev]);

  const activePhoto = activeIndex !== null ? photos[activeIndex] : null;

  return (
    <>
      <section className="relative overflow-hidden bg-brand-dark pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-24 lg:pt-36">
        <AmbientOrbs />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-white/50 transition-colors hover:text-brand-red"
          >
            <ArrowLeft size={14} />
            Retour à l&apos;accueil
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <span className="section-label">Galerie</span>
            <h1 className="heading-display-3d mt-5 font-display text-4xl uppercase tracking-wide text-white sm:text-5xl lg:text-6xl">
              Nos réalisations
              <br />
              en images
            </h1>
            <div className="section-divider mt-6 max-w-xs" />
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/55">
              Team building, séminaires, stands sur mesure et événements corporate —
              parcourez les moments forts créés par Akro Event.
            </p>
          </motion.div>

          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((item, i) => (
              <motion.button
                key={item.id}
                type="button"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => setActiveIndex(i)}
                className="group relative aspect-[4/3] overflow-hidden border border-white/[0.08] text-left"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-4 font-display text-sm uppercase tracking-[0.2em] text-white sm:p-5 sm:text-base">
                  {item.caption}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activePhoto && activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/95 p-4 sm:p-8"
            onClick={closeLightbox}
          >
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center text-white/70 transition-colors hover:text-white sm:right-8 sm:top-8"
              aria-label="Fermer"
            >
              <X size={28} strokeWidth={1.5} />
            </button>

            {photos.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    showPrev();
                  }}
                  className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-white/70 transition-colors hover:text-white sm:left-6"
                  aria-label="Photo précédente"
                >
                  <ChevronLeft size={32} strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    showNext();
                  }}
                  className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-white/70 transition-colors hover:text-white sm:right-6"
                  aria-label="Photo suivante"
                >
                  <ChevronRight size={32} strokeWidth={1.5} />
                </button>
              </>
            )}

            <motion.figure
              key={activePhoto.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative max-h-[85vh] w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={activePhoto.src}
                  alt={activePhoto.alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>
              {activePhoto.caption && (
                <figcaption className="mt-4 text-center font-display text-sm uppercase tracking-[0.2em] text-white/80">
                  {activePhoto.caption}
                </figcaption>
              )}
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
