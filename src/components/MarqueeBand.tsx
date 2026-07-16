const items = [
  "15+ ans d'expérience",
  "Team Building",
  "Événements Corporate",
  "Stands Sur Mesure",
  "Gestion Déléguée",
  "850+ Projets",
  "98% Satisfaction",
  "Maroc",
];

export default function MarqueeBand({ compact = false }: { compact?: boolean }) {
  const track = [...items, ...items, ...items];

  return (
    <div
      className={`relative overflow-hidden border-y border-brand-red/50 bg-brand-secondary ${
        compact ? "py-2.5 sm:py-3" : "py-5"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,23,68,0.25)_0%,transparent_70%)]" />
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-brand-secondary to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-brand-secondary to-transparent sm:w-32" />

      <div className="animate-marquee-fast flex w-max gap-12 whitespace-nowrap sm:gap-16">
        {track.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className={`flex items-center gap-12 font-display uppercase tracking-[0.3em] text-white/70 sm:gap-16 ${
              compact ? "text-xs sm:text-sm" : "text-base sm:text-lg"
            }`}
          >
            <span className="text-gradient-fire">{item}</span>
            <span className="text-brand-red text-lg" aria-hidden="true">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
