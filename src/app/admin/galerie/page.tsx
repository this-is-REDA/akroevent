import AdminShell from "@/components/admin/AdminShell";
import GalleryAdmin from "@/components/admin/GalleryAdmin";
import { createClient } from "@/lib/supabase/server";
import type { GalleryPhoto } from "@/types/gallery";

export default async function AdminGaleriePage() {
  const supabase = createClient();
  const { data } = await supabase
    .from("gallery_photos")
    .select("id, src, alt, caption, sort_order, is_published, created_at")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  return (
    <AdminShell>
      <main className="mx-auto w-full max-w-5xl px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
        <div className="mb-8 sm:mb-10">
          <h1 className="font-display text-2xl uppercase tracking-wide text-white sm:text-3xl lg:text-4xl">
            Galerie
          </h1>
          <p className="mt-2 text-sm text-luxury-muted">
            Ajoutez, visualisez et supprimez les photos affichées dans la section Galerie du site.
          </p>
        </div>
        <GalleryAdmin initialPhotos={(data as GalleryPhoto[]) ?? []} />
      </main>
    </AdminShell>
  );
}
