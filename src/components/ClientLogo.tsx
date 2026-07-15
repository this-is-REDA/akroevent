import type { Client } from "@/data/clients";
import { clientBrandLogos } from "./client-brand-logos";

interface ClientLogoProps {
  client: Client;
  className?: string;
}

export default function ClientLogo({
  client,
  className = "h-8 w-full max-w-[120px]",
}: ClientLogoProps) {
  const Logo = clientBrandLogos[client.id];

  if (!Logo) {
    return (
      <span className="text-center text-[10px] font-medium uppercase tracking-wider text-luxury-muted">
        {client.name}
      </span>
    );
  }

  return <Logo className={className} />;
}
