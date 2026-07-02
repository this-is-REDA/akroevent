"use client";

import { motion } from "framer-motion";
import SectionDivider from "./SectionDivider";
import Logo from "./Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <SectionDivider />
      <footer className="border-t border-black/10 bg-white py-10">
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
          <p className="max-w-md text-center text-xs leading-relaxed text-luxury-muted">
            &copy; {currentYear} Akro Event. Tous droits réservés. L&apos;expertise au
            service d&apos;expériences à valeur durable.
          </p>
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
