"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import SectionDivider from "./SectionDivider";
import AmbientOrbs from "./AmbientOrbs";

const services = [
  {
    id: "team-building",
    title: "Team Building Corporate",
    subtitle: "Renforcer la cohésion d'équipe",
    description:
      "Le team building est au cœur de notre expertise. Nous concevons des programmes personnalisés visant à renforcer la cohésion, la communication et l'esprit d'équipe.",
    categories: [
      { label: "Ludique & Créatif", items: ["Squid Game", "MakeYourMovie", "Fresque Géante", "Formula 1 en carton"] },
      { label: "Escape Game", items: ["Challenges immersifs", "Parcours énigmes", "Expériences thématiques"] },
      { label: "Sport & Aventure", items: ["Olympiades", "Survivor Challenge", "Pont de cohésion", "Outdoor & Indoor"] },
      { label: "Cuisine", items: ["Master Chef", "Ateliers culinaires", "Team cooking"] },
      { label: "Au Vert & Solidaire", items: ["Team building vert", "Plantation", "Actions solidaires", "Impact écologique"] },
    ],
  },
  {
    id: "evenements",
    title: "Événements Corporate",
    subtitle: "De la conception à la production",
    description:
      "Akro Event assure la gestion complète d'événements professionnels, de la phase de conception à la production, en maîtrisant l'ensemble des volets logistiques, techniques et humains.",
    categories: [
      { label: "Séminaires", items: ["Conférences", "Conventions", "Formations & coaching", "Séminaires de direction"] },
      { label: "Soirées de Gala", items: ["Cocktails", "Dîners de gala", "Soirées thématiques"] },
      { label: "Inaugurations", items: ["Lancements de produits", "Cérémonies", "Journées portes ouvertes"] },
      { label: "Family Days", items: ["Célébrations d'entreprise", "Safety Days", "Événements familiaux"] },
    ],
  },
  {
    id: "stands",
    title: "Stands Personnalisés",
    subtitle: "Des outils de communication impactants",
    description:
      "Nous concevons et fabriquons des stands d'exposition clés en main, adaptés à tous types de salons, foires ou événements institutionnels.",
    categories: [
      { label: "Conception 3D", items: ["Design sur-mesure", "Identité visuelle cohérente", "Rendus 3D"] },
      { label: "Fabrication", items: ["Transport", "Montage / démontage", "Logistique complète"] },
      { label: "Équipements Intégrés", items: ["Mobilier", "Éclairage", "Signalétique", "Supports de présentation"] },
    ],
  },
  {
    id: "gestion",
    title: "Gestion Déléguée",
    subtitle: "Externalisation & performance durable",
    description:
      "Akro Event propose des prestations de gestion externalisée, permettant à ses clients de se concentrer sur leur cœur de métier tout en maintenant un haut niveau de qualité opérationnelle.",
    categories: [
      { label: "Complexes Sportifs", items: ["Gestion OCP (El Jadida, Safi, Laayoune)", "Animation encadrée", "Conformité normes"] },
      { label: "Complexes Touristiques", items: ["Exploitation optimisée", "Gestion technique & commerciale", "Expérience visiteurs"] },
      { label: "Outsourcing Événementiel", items: ["Personnel qualifié", "Animateurs & techniciens", "Coordination complète"] },
    ],
  },
];

export default function Services() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <>
      <SectionDivider />
      <section id="services" className="section-dark section-padding overflow-hidden">
        <AmbientOrbs />
        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-10 max-w-2xl"
          >
            <span className="section-label">
              Domaines d&apos;Activité
            </span>
            <h2 className="heading-display-3d mt-4 font-display text-4xl uppercase tracking-wide sm:text-5xl">
              Nos Services
            </h2>
            <div className="section-divider mt-5 w-full max-w-xs" />
            <p className="mt-4 text-sm leading-relaxed text-white/80 sm:text-base">
              Une offre globale dans le domaine de l&apos;événementiel à travers
              quatre pôles de compétence majeurs.
            </p>
          </motion.div>

          <div className="border border-white/[0.08]">
            {services.map((service, i) => {
              const isOpen = activeIndex === i;
              const num = String(i + 1).padStart(2, "0");

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className={`group relative border-t border-white/[0.08] transition-all duration-500 first:border-t-0 ${
                    isOpen
                      ? "bg-brand-card shadow-glow-red-sm"
                      : "bg-brand-card/40 hover:bg-brand-card/70"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setActiveIndex(isOpen ? null : i)}
                    className="relative flex w-full items-center gap-3 py-4 text-left transition-all duration-300 sm:gap-5 sm:py-5 md:gap-8 md:py-6"
                  >
                    <span
                      className={`pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 select-none font-display text-[4rem] leading-none transition-colors duration-300 sm:block sm:text-[5.5rem] lg:text-[7rem] ${
                        isOpen
                          ? "text-brand-red/[0.18]"
                          : "text-brand-red/[0.1] group-hover:text-brand-red/[0.14]"
                      }`}
                      aria-hidden="true"
                    >
                      {num}
                    </span>

                    <span
                      className={`relative z-10 font-display text-2xl tabular-nums transition-colors duration-300 sm:text-3xl ${
                        isOpen ? "text-white" : "text-white/80 group-hover:text-white"
                      }`}
                    >
                      {num}
                    </span>

                    <div className="relative z-10 flex-1">
                      <h3
                        className={`font-display text-lg uppercase tracking-wide transition-colors duration-300 sm:text-xl md:text-2xl ${
                          isOpen ? "heading-display-3d text-white" : "text-white/90 group-hover:text-white"
                        }`}
                      >
                        {service.title}
                      </h3>
                      <p
                        className={`mt-0.5 text-xs font-light italic transition-colors duration-300 ${
                          isOpen ? "text-brand-gold/90" : "text-white/55 group-hover:text-white/75"
                        }`}
                      >
                        {service.subtitle}
                      </p>
                      {!isOpen && (
                        <p className="mt-2 hidden max-w-xl text-sm leading-relaxed text-white/75 sm:block">
                          {service.description}
                        </p>
                      )}
                    </div>

                    <div className="relative z-10 flex items-center gap-3">
                      <ArrowUpRight
                        size={20}
                        className={`hidden transition-all duration-300 sm:block ${
                          isOpen
                            ? "rotate-90 text-brand-red"
                            : "text-brand-red/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-red"
                        }`}
                      />
                      <ChevronDown
                        size={16}
                        className={`transition-all duration-300 ${
                          isOpen ? "rotate-180 text-white/80" : "text-white/40 group-hover:text-white/60"
                        }`}
                      />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="relative mb-4 border border-white/[0.08] border-t-brand-red/50 bg-brand-secondary p-4 sm:mb-5 sm:p-6">
                          <p className="mb-5 max-w-2xl text-sm leading-relaxed text-white/75">
                            {service.description}
                          </p>
                          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {service.categories.map((cat) => (
                              <div key={cat.label} className="border-l border-brand-gold/35 pl-4">
                                <h4 className="font-display text-sm uppercase tracking-[0.15em] text-white">
                                  {cat.label}
                                </h4>
                                <ul className="mt-2 space-y-1.5">
                                  {cat.items.map((item) => (
                                    <li key={item} className="flex items-start gap-2 text-sm text-white/80">
                                      <span className="mt-2 h-px w-3 shrink-0 bg-brand-red/50" />
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
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
