"use client";

import { clients } from "@/data/clients";
import ClientLogo from "./ClientLogo";

export default function LogoMarquee() {
  const row = [...clients, ...clients];

  return (
    <div className="relative space-y-6 overflow-hidden py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-brand-dark to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-brand-dark to-transparent sm:w-32" />

      <div className="animate-marquee-fast flex w-max gap-10">
        {row.map((client, i) => (
          <div
            key={`a-${client.id}-${i}`}
            className="flex h-16 w-36 shrink-0 items-center justify-center glass-card px-4"
            title={client.name}
          >
            <div className="opacity-60 transition-opacity hover:opacity-100">
              <ClientLogo client={client} />
            </div>
          </div>
        ))}
      </div>

      <div className="animate-marquee-reverse flex w-max gap-10">
        {[...row].reverse().map((client, i) => (
          <div
            key={`b-${client.id}-${i}`}
            className="flex h-16 w-36 shrink-0 items-center justify-center glass-card px-4"
            title={client.name}
          >
            <div className="opacity-60 transition-opacity hover:opacity-100">
              <ClientLogo client={client} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
