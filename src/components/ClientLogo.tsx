import type { Client } from "@/data/clients";
import { clientBrandLogos } from "./client-brand-logos";

export default function ClientLogo({ client }: { client: Client }) {
  const Logo = clientBrandLogos[client.id];

  if (!Logo) {
    return (
      <span className="text-center text-[10px] font-medium uppercase tracking-wider text-luxury-muted">
        {client.name}
      </span>
    );
  }

  return <Logo className="h-8 w-full max-w-[120px]" />;
}
