"use client";

import { motion } from "framer-motion";
import SectionDivider from "./SectionDivider";
import Logo from "./Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <SectionDivider />
      <footer className="relative border-t border-black/10 bg-white py-10">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-red/40 to-transparent"
          aria-hidden="true"
        />
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 sm:px-8 md:flex-row lg:px-12">
          <a
            href="#accueil"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#accueil")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <Logo height={32} />
          </a>
          <div className="max-w-md text-center">
            <p className="text-xs leading-relaxed text-black/55">
              &copy; {currentYear} Akro Event. Tous droits réservés. L&apos;expertise au
              service d&apos;expériences à valeur durable.
            </p>
            <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-black/40">
              Designed by{" "}
              <span className="font-medium tracking-[0.12em] text-black/60">
                vsnstudios
              </span>
            </p>
          </div>
          <motion.a
            href="#accueil"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#accueil")?.scrollIntoView({ behavior: "smooth" });
            }}
            whileHover={{ y: -2 }}
            className="text-[10px] uppercase tracking-[0.2em] text-brand-ink/70 transition-colors hover:text-brand-red"
          >
            Retour en haut
          </motion.a>
        </div>
      </footer>
    </>
  );
}
