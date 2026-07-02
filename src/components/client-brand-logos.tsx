import type { ComponentType, SVGProps } from "react";
import Image from "next/image";
import { siRenault } from "simple-icons";

type LogoProps = SVGProps<SVGSVGElement>;

function SimpleIconLogo({
  icon,
  className,
  ...props
}: LogoProps & { icon: { path: string; hex: string; title: string } }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      aria-label={icon.title}
      className={className}
      {...props}
    >
      <path d={icon.path} fill={`#${icon.hex}`} />
    </svg>
  );
}

export function OcpLogo() {
  return (
    <Image
      src="/logos/clients/ocp.png"
      alt=""
      width={72}
      height={72}
      className="h-12 w-auto max-w-[70px] object-contain"
    />
  );
}

export function NestleLogo() {
  return (
    <Image
      src="/logos/clients/nestle.svg"
      alt=""
      width={100}
      height={28}
      className="h-7 w-auto max-w-[110px] object-contain"
    />
  );
}

export function RenaultLogo(props: LogoProps) {
  return <SimpleIconLogo icon={siRenault} {...props} />;
}

export function OrangeLogo() {
  return (
    <Image
      src="/logos/clients/orange.svg"
      alt=""
      width={40}
      height={40}
      className="h-9 w-9 object-contain"
    />
  );
}

export function InwiLogo(props: LogoProps) {
  return (
    <svg viewBox="0 0 120 40" aria-hidden="true" {...props}>
      <text x="0" y="30" fill="#6B2C91" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="700" fontStyle="italic">
        inwi
      </text>
    </svg>
  );
}

export function BmciLogo({ className }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className ?? ""}`}>
      <Image
        src="/logos/clients/bnpparibas.png"
        alt=""
        width={34}
        height={34}
        className="h-8 w-8 shrink-0 object-contain"
      />
      <span className="font-sans text-xl font-bold tracking-wide text-[#00915A]">BMCI</span>
    </div>
  );
}

export function BnpParibasLogo() {
  return (
    <Image
      src="/logos/clients/bnpparibas.png"
      alt=""
      width={48}
      height={48}
      className="h-10 w-10 object-contain"
    />
  );
}

export function BanquePopulaireLogo() {
  return (
    <Image
      src="/logos/clients/banque-populaire.png"
      alt=""
      width={96}
      height={90}
      className="h-11 w-auto max-w-[95px] object-contain"
    />
  );
}

export function DecathlonLogo() {
  return (
    <Image
      src="/logos/clients/decathlon.png"
      alt=""
      width={48}
      height={48}
      className="h-10 w-10 object-contain"
    />
  );
}

export function TotalEnergiesLogo() {
  return (
    <Image
      src="/logos/clients/totalenergies.png"
      alt=""
      width={80}
      height={72}
      className="h-12 w-auto max-w-[75px] object-contain"
    />
  );
}

export function AxaLogo() {
  return (
    <Image
      src="/logos/clients/axa.svg"
      alt=""
      width={80}
      height={32}
      className="h-8 w-auto max-w-[100px] object-contain"
    />
  );
}

export function AttijariwafaLogo() {
  return (
    <Image
      src="/logos/clients/attijari.png"
      alt=""
      width={80}
      height={80}
      className="h-12 w-12 object-contain"
    />
  );
}

export function MazaganLogo() {
  return (
    <Image
      src="/logos/clients/mazagan.png"
      alt=""
      width={90}
      height={72}
      className="h-12 w-auto max-w-[85px] object-contain"
    />
  );
}

export function PullmanLogo() {
  return (
    <Image
      src="/logos/clients/pullman.png"
      alt=""
      width={130}
      height={40}
      className="h-9 w-auto max-w-[125px] object-contain"
    />
  );
}

export function Um6pLogo() {
  return (
    <Image
      src="/logos/clients/um6p.png"
      alt=""
      width={130}
      height={56}
      className="h-11 w-auto max-w-[125px] object-contain"
    />
  );
}

export function IntelciaLogo() {
  return (
    <Image
      src="/logos/clients/intelcia.png"
      alt=""
      width={160}
      height={40}
      className="h-9 w-auto max-w-[130px] object-contain"
    />
  );
}

export function AtlasCopcoLogo() {
  return (
    <Image
      src="/logos/clients/atlascopco.png"
      alt=""
      width={100}
      height={32}
      className="h-8 w-auto max-w-[110px] object-contain"
    />
  );
}

export function EngieLogo() {
  return (
    <Image
      src="/logos/clients/engie.png"
      alt=""
      width={56}
      height={40}
      className="h-8 w-auto object-contain"
    />
  );
}

export function SonasidLogo() {
  return (
    <Image
      src="/logos/clients/sonasid.png"
      alt=""
      width={140}
      height={48}
      className="h-10 w-auto max-w-[130px] object-contain"
    />
  );
}

export function MarjaneLogo() {
  return (
    <Image
      src="/logos/clients/marjane.svg"
      alt=""
      width={130}
      height={34}
      className="h-8 w-auto max-w-[125px] object-contain"
    />
  );
}

export function TaqaLogo() {
  return (
    <Image
      src="/logos/clients/taqa.png"
      alt=""
      width={100}
      height={32}
      className="h-8 w-auto max-w-[95px] object-contain"
    />
  );
}

export function NarsaLogo() {
  return (
    <Image
      src="/logos/clients/narsa.png"
      alt=""
      width={140}
      height={48}
      className="h-10 w-auto max-w-[130px] object-contain"
    />
  );
}

export function CtmLogo() {
  return (
    <Image
      src="/logos/clients/ctm.png"
      alt=""
      width={110}
      height={48}
      className="h-10 w-auto max-w-[105px] object-contain"
    />
  );
}

export function SntcLogo(props: LogoProps) {
  return (
    <svg viewBox="0 0 120 40" aria-hidden="true" {...props}>
      <text x="0" y="18" fill="#C41E3A" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="700">
        SNTC
      </text>
      <text x="0" y="32" fill="#009E4F" fontFamily="Arial, sans-serif" fontSize="7" fontWeight="600">
        SOCIÉTÉ NATIONALE DE TOURISME
      </text>
    </svg>
  );
}

export const clientBrandLogos: Record<string, ComponentType<LogoProps>> = {
  ocp: OcpLogo,
  nestle: NestleLogo,
  renault: RenaultLogo,
  orange: OrangeLogo,
  inwi: InwiLogo,
  bmci: BmciLogo,
  bnpparibas: BnpParibasLogo,
  "banque-populaire": BanquePopulaireLogo,
  decathlon: DecathlonLogo,
  totalenergies: TotalEnergiesLogo,
  axa: AxaLogo,
  attijariwafa: AttijariwafaLogo,
  mazagan: MazaganLogo,
  pullman: PullmanLogo,
  um6p: Um6pLogo,
  intelcia: IntelciaLogo,
  atlascopco: AtlasCopcoLogo,
  engie: EngieLogo,
  sonasid: SonasidLogo,
  marjane: MarjaneLogo,
  taqa: TaqaLogo,
  narsa: NarsaLogo,
  ctm: CtmLogo,
  sntc: SntcLogo,
};
