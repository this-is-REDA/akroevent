export type DevisStatus = "nouveau" | "en_cours" | "traite" | "archive";

export interface Devis {
  id: string;
  name: string;
  company: string | null;
  email: string;
  phone: string | null;
  service: string;
  message: string | null;
  status: DevisStatus;
  created_at: string;
}

export interface DevisInsert {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  service: string;
  message?: string;
}

export const SERVICE_LABELS: Record<string, string> = {
  "team-building": "Team Building Corporate",
  evenements: "Événements Corporate",
  stands: "Stands Personnalisés",
  gestion: "Gestion Déléguée",
};

export const STATUS_LABELS: Record<DevisStatus, string> = {
  nouveau: "Nouveau",
  en_cours: "En cours",
  traite: "Traité",
  archive: "Archivé",
};

export const STATUS_COLORS: Record<DevisStatus, string> = {
  nouveau: "bg-brand-red/20 text-brand-red border-brand-red/30",
  en_cours: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  traite: "bg-green-500/20 text-green-400 border-green-500/30",
  archive: "bg-white/10 text-luxury-muted border-white/10",
};
