import Image from "next/image";

interface LogoProps {
  className?: string;
  height?: number;
  priority?: boolean;
}

const LOGO_SRC = "/Fichier 2 (1).png";
const LOGO_WIDTH = 233;
const LOGO_HEIGHT = 85;

export default function Logo({ className = "", height = 40, priority = false }: LogoProps) {
  const width = Math.round((LOGO_WIDTH / LOGO_HEIGHT) * height);

  return (
    <Image
      src={LOGO_SRC}
      alt="Akro Event — Agence événementielle et team building au Maroc"
      width={width}
      height={height}
      priority={priority}
      className={`w-auto object-contain object-left ${className}`}
      style={{ height, width: "auto" }}
    />
  );
}
