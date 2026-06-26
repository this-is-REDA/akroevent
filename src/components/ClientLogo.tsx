import type { Client } from "@/data/clients";
import Image from "next/image";

export default function ClientLogo({ client }: { client: Client }) {
  return (
    <Image
      src={client.logo}
      alt={client.name}
      width={120}
      height={40}
      className="h-9 w-auto max-w-[120px] object-contain"
      loading="lazy"
    />
  );
}
