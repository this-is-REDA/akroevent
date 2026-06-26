"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import SectionDivider from "./SectionDivider";

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
      <section id="services" className="section-dark section-padding">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-20 max-w-2xl"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-brand-gold">
              Domaines d&apos;Activité
            </span>
            <h2 className="mt-6 font-display text-5xl uppercase tracking-wide text-white sm:text-6xl">
              Nos Services
            </h2>
            <div className="mt-8 h-px w-full max-w-xs bg-white/10" />
            <p className="mt-6 text-base leading-relaxed text-luxury-muted">
              Une offre globale dans le domaine de l&apos;événementiel à travers
              quatre pôles de compétence majeurs.
            </p>
          </motion.div>

          <div className="space-y-0">
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
                  className="group relative border-t border-white/[0.06]"
                >
                  <button
                    type="button"
                    onClick={() => setActiveIndex(isOpen ? null : i)}
                    className="relative flex w-full items-center gap-4 py-8 text-left transition-all duration-300 sm:gap-6 sm:py-10 md:gap-10 md:py-12"
                  >
                    {/* Giant background number */}
                    <span
                      className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 select-none font-display text-[6rem] leading-none text-white/[0.03] transition-colors duration-300 group-hover:text-brand-red/[0.06] sm:block sm:text-[8rem] lg:text-[12rem]"
                      aria-hidden="true"
                    >
                      {num}
                    </span>

                    <span className="relative z-10 font-display text-4xl text-brand-red/60 sm:text-5xl">
                      {num}
                    </span>

                    <div className="relative z-10 flex-1">
                      <h3 className="font-display text-xl uppercase tracking-wide text-white sm:text-2xl md:text-4xl">
                        {service.title}
                      </h3>
                      <p className="mt-1 text-xs font-light italic text-luxury-muted">
                        {service.subtitle}
                      </p>
                      {!isOpen && (
                        <p className="mt-3 hidden max-w-xl text-sm text-luxury-muted sm:block">
                          {service.description}
                        </p>
                      )}
                    </div>

                    <div className="relative z-10 flex items-center gap-3">
                      <ArrowUpRight
                        size={20}
                        className={`hidden text-brand-red transition-transform duration-300 sm:block ${isOpen ? "rotate-90" : "group-hover:translate-x-1 group-hover:-translate-y-1"}`}
                      />
                      <ChevronDown
                        size={16}
                        className={`text-luxury-muted transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
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
                        <div className="relative border border-white/[0.06] border-t-brand-red/30 bg-brand-card/50 p-6 sm:p-10 mb-8">
                          <p className="mb-8 max-w-2xl text-sm leading-relaxed text-luxury-muted">
                            {service.description}
                          </p>
                          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {service.categories.map((cat) => (
                              <div key={cat.label} className="border-l border-brand-red/40 pl-5">
                                <h4 className="font-display text-sm uppercase tracking-wider text-white">
                                  {cat.label}
                                </h4>
                                <ul className="mt-3 space-y-2">
                                  {cat.items.map((item) => (
                                    <li key={item} className="flex items-start gap-2 text-sm text-luxury-muted">
                                      <span className="mt-2 h-px w-3 shrink-0 bg-brand-red/60" />
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
            <div className="border-t border-white/[0.06]" />
          </div>
        </div>
      </section>
    </>
  );
}
