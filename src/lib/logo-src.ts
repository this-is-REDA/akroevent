/** Corrige d'anciens chemins PNG trop petits ou incorrects. */
const LOGO_SRC_FIX: Record<string, string> = {
  "/logos/clients/nestle.png": "/logos/clients/nestle.svg",
  "/logos/clients/renault.png": "/logos/clients/renault.svg",
};

export function normalizeLogoSrc(src: string): string {
  return LOGO_SRC_FIX[src] ?? src;
}
