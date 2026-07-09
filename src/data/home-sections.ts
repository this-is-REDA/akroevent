import {
  Building2,
  CalendarDays,
  Clock,
  Layout,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";

export const eventServices = [
  {
    icon: Users,
    title: "Team Building",
    description:
      "Programmes sur mesure pour renforcer la cohésion, la communication et l'esprit d'équipe.",
  },
  {
    icon: CalendarDays,
    title: "Événements Corporate",
    description:
      "Séminaires, galas, inaugurations et conventions clés en main, de A à Z.",
  },
  {
    icon: Layout,
    title: "Stands Personnalisés",
    description:
      "Conception 3D, fabrication et installation de stands impactants pour vos salons.",
  },
  {
    icon: Building2,
    title: "Gestion Déléguée",
    description:
      "Externalisation opérationnelle de complexes sportifs et touristiques.",
  },
] as const;

export const eventBenefits = [
  {
    icon: Sparkles,
    title: "Expériences mémorables",
    text: "Des concepts créatifs qui marquent les esprits et valorisent votre marque.",
  },
  {
    icon: Shield,
    title: "Expertise 360°",
    text: "Un interlocuteur unique pour la conception, la production et le suivi.",
  },
  {
    icon: Clock,
    title: "Réactivité garantie",
    text: "Devis personnalisé sous 24h et accompagnement dédié à chaque étape.",
  },
] as const;
