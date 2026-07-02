export default function SectionDivider() {
  return (
    <div className="relative h-px w-full bg-white/[0.04]" aria-hidden="true">
      <div className="absolute left-1/2 top-0 h-px w-32 -translate-x-1/2 bg-gradient-to-r from-transparent via-brand-red to-transparent animate-shimmer" />
      <div className="absolute left-1/2 top-0 h-4 w-32 -translate-x-1/2 -translate-y-1/2 bg-brand-red/20 blur-md" />
    </div>
  );
}
