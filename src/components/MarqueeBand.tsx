const items = [
  "Team Building",
  "Événements Corporate",
  "Stands Sur Mesure",
  "Gestion Déléguée",
  "Maroc",
  "15 Ans d'Expertise",
  "850+ Projets",
  "98% Satisfaction",
];

export default function MarqueeBand() {
  const track = [...items, ...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-brand-red/20 bg-brand-secondary py-5">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,25,44,0.08)_0%,transparent_70%)]" />
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-brand-secondary to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-brand-secondary to-transparent" />

      <div className="animate-marquee-fast flex w-max gap-16 whitespace-nowrap">
        {track.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-16 font-display text-base uppercase tracking-[0.3em] text-white/40 sm:text-lg"
          >
            <span className="text-gradient-fire">{item}</span>
            <span className="text-brand-red text-xl" aria-hidden="true">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
