interface AmbientOrbsProps {
  variant?: "hero" | "section" | "contact";
}

export default function AmbientOrbs({ variant = "section" }: AmbientOrbsProps) {
  if (variant === "hero") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="ambient-orb ambient-orb-red absolute -right-[10%] top-[10%] h-[32rem] w-[32rem] opacity-100" />
        <div className="ambient-orb ambient-orb-gold absolute -left-[15%] bottom-[5%] h-[28rem] w-[28rem] opacity-80" />
        <div className="ambient-orb ambient-orb-red absolute right-[30%] top-[60%] h-64 w-64 opacity-60" />
      </div>
    );
  }

  if (variant === "contact") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="ambient-orb ambient-orb-red absolute -right-32 top-0 h-96 w-96 opacity-55" />
        <div className="ambient-orb ambient-orb-gold absolute -left-24 bottom-0 h-80 w-80 opacity-45" />
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="ambient-orb ambient-orb-red absolute -right-32 top-1/4 h-80 w-80 opacity-50" />
      <div className="ambient-orb ambient-orb-gold absolute -left-24 bottom-1/4 h-72 w-72 opacity-38" />
    </div>
  );
}
