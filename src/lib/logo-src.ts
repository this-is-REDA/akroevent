/** Corrige d'anciens chemins PNG trop petits ou incorrects. */
const LOGO_SRC_FIX: Record<string, string> = {
  "/logos/clients/nestle.png": "/logos/clients/nestle.svg",
  "/logos/clients/renault.png": "/logos/clients/renault.svg",
};

export function normalizeLogoSrc(src: string): string {
  return LOGO_SRC_FIX[src] ?? src;
}

/** Force an asset for known hard-to-display brand files. */
export function resolveLogoSrc(id: string, name: string, src: string): string {
  const key = `${id} ${name}`.toLowerCase();
  if (key.includes("nestle") || key.includes("nestlé")) {
    return "/logos/clients/nestle.svg";
  }
  return normalizeLogoSrc(src);
}
