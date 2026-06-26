import type { Metadata } from "next";
import type { SiteSettingsPublic } from "@/types/settings";
import { DEFAULT_SETTINGS } from "@/types/settings";

export const SITE_NAME = "Akro Event";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://www.akroevent.com";

export const SITE_DESCRIPTION =
  "Akro Event, agence événementielle marocaine 360° : team building corporate, séminaires, stands personnalisés et gestion déléguée. Plus de 15 ans d'expérience au Maroc.";

export const SEO_KEYWORDS = [
  "agence événementielle maroc",
  "agence événementielle marocaine",
  "team building maroc",
  "team building corporate maroc",
  "événementiel corporate maroc",
  "organisateur événements entreprise maroc",
  "séminaire entreprise maroc",
  "stand salon maroc",
  "stands personnalisés maroc",
  "gestion déléguée maroc",
  "animation team building casablanca",
  "agence team building rabat",
  "événementiel 360 maroc",
  "Akro Event",
  "akro event maroc",
];

export const OG_IMAGE_PATH = "/Fichier 2 (1).png";

export function absoluteUrl(path = ""): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Agence Événementielle & Team Building au Maroc`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: SEO_KEYWORDS,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_MA",
    alternateLocale: ["fr_FR", "fr"],
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Agence Événementielle & Team Building au Maroc`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE_PATH,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Agence événementielle marocaine`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Team Building & Événementiel au Maroc`,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE_PATH],
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "fr-MA": SITE_URL,
      fr: SITE_URL,
    },
  },
  category: "business",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export const homeMetadata: Metadata = {
  title: "Agence Événementielle & Team Building au Maroc",
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Agence Événementielle & Team Building au Maroc | Akro Event",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  },
};

const SERVICES = [
  {
    name: "Team Building Corporate",
    description:
      "Programmes de team building sur mesure pour renforcer la cohésion et l'esprit d'équipe.",
  },
  {
    name: "Événements Corporate",
    description:
      "Séminaires, galas, inaugurations et conventions clés en main au Maroc.",
  },
  {
    name: "Stands Personnalisés",
    description:
      "Conception, fabrication et installation de stands pour salons et foires.",
  },
  {
    name: "Gestion Déléguée",
    description:
      "Externalisation et gestion opérationnelle de complexes sportifs et touristiques.",
  },
];

export function buildOrganizationJsonLd(settings: SiteSettingsPublic = DEFAULT_SETTINGS) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService", "EventPlanner"],
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        alternateName: "Akro Event Maroc",
        url: SITE_URL,
        logo: absoluteUrl(OG_IMAGE_PATH),
        image: absoluteUrl(OG_IMAGE_PATH),
        description: SITE_DESCRIPTION,
        email: settings.email,
        telephone: settings.phone_display,
        address: {
          "@type": "PostalAddress",
          addressCountry: "MA",
        },
        areaServed: {
          "@type": "Country",
          name: "Morocco",
        },
        sameAs: [
          settings.facebook_url,
          settings.instagram_url,
          settings.linkedin_url,
        ].filter(Boolean),
        knowsAbout: [
          "Team building",
          "Événementiel corporate",
          "Stands d'exposition",
          "Gestion déléguée",
          "Séminaires d'entreprise",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Services événementiels Akro Event",
          itemListElement: SERVICES.map((service, index) => ({
            "@type": "Offer",
            position: index + 1,
            itemOffered: {
              "@type": "Service",
              name: service.name,
              description: service.description,
              provider: { "@id": `${SITE_URL}/#organization` },
              areaServed: "MA",
            },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: "fr-MA",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: "Agence Événementielle & Team Building au Maroc | Akro Event",
        description: SITE_DESCRIPTION,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "fr-MA",
      },
    ],
  };
}
