import { createClient } from "@/lib/supabase/server";
import { clients } from "@/data/clients";
import type { ClientLogo, ClientLogoPublic } from "@/types/client-logos";
import { normalizeLogoSrc } from "@/lib/logo-src";


export const defaultClientLogos: ClientLogoPublic[] = clients.map((client) => ({
  id: client.id,
  name: client.name,
  src: normalizeLogoSrc(client.logo),
}));

export async function getClientLogos(): Promise<ClientLogoPublic[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("client_logos")
      .select("id, name, src")
      .eq("is_published", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (!error && data && data.length > 0) {
      return data.map((logo) => ({ ...logo, src: normalizeLogoSrc(logo.src) }));
    }
  } catch {
    /* fallback */
  }

  return defaultClientLogos;
}

/** Charge les logos admin ; si la table est vide, y importe les logos du site. */
export async function getAdminClientLogos(): Promise<{
  logos: ClientLogo[];
  seeded: boolean;
  tableMissing: boolean;
}> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("client_logos")
    .select("id, name, src, sort_order, is_published, created_at")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    return {
      logos: defaultClientLogos.map((logo, i) => ({
        ...logo,
        sort_order: i,
        is_published: true,
      })),
      seeded: false,
      tableMissing: true,
    };
  }

  if (data && data.length > 0) {
    return {
      logos: (data as ClientLogo[]).map((logo) => ({
        ...logo,
        src: normalizeLogoSrc(logo.src),
      })),
      seeded: false,
      tableMissing: false,
    };
  }

  const rows = clients.map((client, i) => ({
    name: client.name,
    src: client.logo,
    sort_order: i,
    is_published: true,
  }));

  const { data: inserted, error: insertError } = await supabase
    .from("client_logos")
    .insert(rows)
    .select("id, name, src, sort_order, is_published, created_at");

  if (insertError || !inserted) {
    return {
      logos: defaultClientLogos.map((logo, i) => ({
        ...logo,
        sort_order: i,
        is_published: true,
      })),
      seeded: false,
      tableMissing: false,
    };
  }

  return {
    logos: inserted as ClientLogo[],
    seeded: true,
    tableMissing: false,
  };
}
