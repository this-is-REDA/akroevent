import { createClient } from "@/lib/supabase/server";
import { landingShowcase } from "@/data/landing-images";
import type { GalleryPhotoPublic } from "@/types/gallery";

const defaultPhotos: GalleryPhotoPublic[] = landingShowcase.map((item, i) => ({
  id: `default-${i}`,
  src: item.src,
  alt: item.alt,
  caption: item.caption,
}));

export async function getGalleryPhotos(): Promise<GalleryPhotoPublic[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("gallery_photos")
      .select("id, src, alt, caption")
      .eq("is_published", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (!error && data && data.length > 0) {
      return data;
    }
  } catch {
    /* fallback */
  }

  return defaultPhotos;
}
