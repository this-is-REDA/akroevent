export type UniversCategory = {
  label: string;
  items: string[];
};

export type UniversItem = {
  slug: string;
  title: string;
  subtitle: string;
  caption: string;
  src: string;
  alt: string;
  description: string;
  details: string[];
  categories: UniversCategory[];
};

export const universItems: UniversItem[] = [
  {
    slug: "team-building",
    title: "Team Building",
    subtitle: "Renforcer la cohésion d'équipe",
    caption: "Team Building",
    src: "/images/landing/team-building.jpg",
    alt: "Équipe en activité de team building corporate",
    description:
      "Le team building est au cœur de notre expertise. Nous concevons des programmes personnalisés visant à renforcer la cohésion, la communication et l'esprit d'équipe, dans un cadre ludique, créatif ou sportif.",
    details: [
      "Des formats indoor et outdoor adaptés à la taille de votre groupe.",
      "Un brief créatif aligné sur vos objectifs RH et votre culture d'entreprise.",
      "Animation, logistique et production prises en charge de A à Z.",
    ],
    categories: [
      {
        label: "Ludique & Créatif",
        items: ["Squid Game", "MakeYourMovie", "Fresque Géante", "Formula 1 en carton"],
      },
      {
        label: "Escape Game",
        items: ["Challenges immersifs", "Parcours énigmes", "Expériences thématiques"],
      },
      {
        label: "Sport & Aventure",
        items: ["Olympiades", "Survivor Challenge", "Pont de cohésion", "Outdoor & Indoor"],
      },
      {
        label: "Cuisine",
        items: ["Master Chef", "Ateliers culinaires", "Team cooking"],
      },
      {
        label: "Au Vert & Solidaire",
        items: ["Team building vert", "Plantation", "Actions solidaires", "Impact écologique"],
      },
    ],
  },
  {
    slug: "evenements-corporate",
    title: "Événements Corporate",
    subtitle: "De la conception à la production",
    caption: "Événements Corporate",
    src: "/images/landing/corporate-event.jpg",
    alt: "Conférence et événement corporate",
    description:
      "Akro Event assure la gestion complète d'événements professionnels, de la phase de conception à la production, en maîtrisant l'ensemble des volets logistiques, techniques et humains.",
    details: [
      "Direction artistique et scénographie au service de votre message.",
      "Coordination technique : son, lumière, vidéo et régie.",
      "Accueil, protocole et suivi opérationnel le jour J.",
    ],
    categories: [
      {
        label: "Séminaires",
        items: ["Conférences", "Conventions", "Formations & coaching", "Séminaires de direction"],
      },
      {
        label: "Soirées de Gala",
        items: ["Cocktails", "Dîners de gala", "Soirées thématiques"],
      },
      {
        label: "Inaugurations",
        items: ["Lancements de produits", "Cérémonies", "Journées portes ouvertes"],
      },
      {
        label: "Family Days",
        items: ["Célébrations d'entreprise", "Safety Days", "Événements familiaux"],
      },
    ],
  },
  {
    slug: "stands-personnalises",
    title: "Stands Personnalisés",
    subtitle: "Des outils de communication impactants",
    caption: "Stands Personnalisés",
    src: "/images/landing/exhibition-stand.jpg",
    alt: "Stand d'exposition personnalisé sur salon professionnel",
    description:
      "Nous concevons et fabriquons des stands d'exposition clés en main, adaptés à tous types de salons, foires ou événements institutionnels, avec une identité visuelle forte et une expérience visiteurs mémorable.",
    details: [
      "Design 3D sur mesure, cohérent avec votre charte graphique.",
      "Fabrication, transport, montage et démontage inclus.",
      "Mobilier, éclairage et signalétique intégrés.",
    ],
    categories: [
      {
        label: "Conception 3D",
        items: ["Design sur-mesure", "Identité visuelle cohérente", "Rendus 3D"],
      },
      {
        label: "Fabrication",
        items: ["Transport", "Montage / démontage", "Logistique complète"],
      },
      {
        label: "Équipements Intégrés",
        items: ["Mobilier", "Éclairage", "Signalétique", "Supports de présentation"],
      },
    ],
  },
  {
    slug: "gestion-deleguee",
    title: "Gestion Déléguée",
    subtitle: "Externalisation & performance durable",
    caption: "Gestion Déléguée",
    src: "/images/landing/gestion-deleguee.jpg",
    alt: "Complexe sportif et gestion déléguée",
    description:
      "Akro Event propose des prestations de gestion externalisée, permettant à ses clients de se concentrer sur leur cœur de métier tout en maintenant un haut niveau de qualité opérationnelle.",
    details: [
      "Pilotage quotidien des sites sportifs et touristiques.",
      "Équipes qualifiées, animation et conformité aux normes.",
      "Reporting et optimisation continue de la performance.",
    ],
    categories: [
      {
        label: "Complexes Sportifs",
        items: [
          "Gestion OCP (El Jadida, Safi, Laayoune)",
          "Animation encadrée",
          "Conformité normes",
        ],
      },
      {
        label: "Complexes Touristiques",
        items: [
          "Exploitation optimisée",
          "Gestion technique & commerciale",
          "Expérience visiteurs",
        ],
      },
      {
        label: "Outsourcing Événementiel",
        items: ["Personnel qualifié", "Animateurs & techniciens", "Coordination complète"],
      },
    ],
  },
];

export function getUniversBySlug(slug: string): UniversItem | undefined {
  return universItems.find((item) => item.slug === slug);
}

export function getUniversSlugs(): string[] {
  return universItems.map((item) => item.slug);
}
