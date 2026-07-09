export const landingShowcase = [
  {
    src: "/images/landing/team-building.jpg",
    alt: "Équipe en activité de team building corporate",
    caption: "Team Building",
  },
  {
    src: "/images/landing/corporate-event.jpg",
    alt: "Conférence et événement corporate",
    caption: "Événements Corporate",
  },
  {
    src: "/images/landing/exhibition-stand.jpg",
    alt: "Stand d'exposition personnalisé sur salon professionnel",
    caption: "Stands Personnalisés",
  },
  {
    src: "/images/landing/gestion-deleguee.jpg",
    alt: "Complexe sportif et gestion déléguée",
    caption: "Gestion Déléguée",
  },
  {
    src: "/images/landing/seminar-workshop.jpg",
    alt: "Séminaire et atelier en entreprise",
    caption: "Séminaires",
  },
  {
    src: "/images/landing/gala-evenement.jpg",
    alt: "Soirée de gala et événement festif",
    caption: "Galas & Soirées",
  },
] as const;

export const landingBenefitsCollage = [
  {
    src: "/images/landing/benefits-hero.jpg",
    alt: "Soirée de gala et réception corporate Akro Event",
  },
  landingShowcase[0],
  {
    src: "/images/landing/benefits-right.jpg",
    alt: "Équipe Akro Event en planification d'événement",
  },
] as const;

export const landingServiceImages = {
  "Team Building": "/images/landing/team-activity.jpg",
  "Événements Corporate": "/images/landing/corporate-event.jpg",
  "Stands Personnalisés": "/images/landing/exhibition-stand.jpg",
  "Gestion Déléguée": "/images/landing/gestion-deleguee.jpg",
} as const;

export const landingCtaBackground = "/images/landing/event-production.jpg";
