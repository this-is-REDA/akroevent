import { AdminPage } from "@/lib/admin-page";
import MediaAdmin from "@/components/admin/MediaAdmin";
import { createClient } from "@/lib/supabase/server";
import type { MediaAsset } from "@/types/content";

export default async function AdminMediasPage() {
  let items: MediaAsset[] = [];
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("media_assets")
      .select("*")
      .order("created_at", { ascending: false });
    items = (data as MediaAsset[]) ?? [];
  } catch {
    items = [];
  }

  return (
    <AdminPage
      title="Médias"
      description="Bibliothèque d’images réutilisables (copiez l’URL)."
    >
      <MediaAdmin initialItems={items} />
    </AdminPage>
  );
}
