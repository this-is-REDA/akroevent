export default function SectionDivider() {
  return (
    <div className="relative h-px w-full bg-black/[0.06]" aria-hidden="true">
      <div className="absolute left-1/2 top-0 h-px w-24 -translate-x-1/2 bg-brand-red" />
    </div>
  );
}
