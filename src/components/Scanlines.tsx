export default function Scanlines() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[5] opacity-[0.04]"
      aria-hidden="true"
      style={{
        background:
          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.15) 2px, rgba(255,255,255,0.15) 4px)",
      }}
    />
  );
}
