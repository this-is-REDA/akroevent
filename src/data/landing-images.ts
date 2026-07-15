import { universItems } from "@/data/univers";

export const landingShowcase = universItems.map((item) => ({
  slug: item.slug,
  src: item.src,
  alt: item.alt,
  caption: item.caption,
}));

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
