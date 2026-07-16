import { createClient } from "@/lib/supabase/server";
import { universItems, type UniversItem } from "@/data/univers";
import type { UniversRow } from "@/types/content";

function rowToItem(row: UniversRow): UniversItem {
  return {
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle,
    caption: row.caption || row.title,
    src: row.image_url,
    alt: row.image_alt || row.title,
    description: row.description,
    details: Array.isArray(row.details) ? row.details : [],
    categories: Array.isArray(row.categories) ? row.categories : [],
  };
}

export async function getUniversItems(): Promise<UniversItem[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("univers")
      .select("*")
      .eq("is_published", true)
      .order("sort_order", { ascending: true });

    if (!error && data && data.length > 0) {
      return (data as UniversRow[]).map(rowToItem);
    }
  } catch {
    /* fallback */
  }
  return universItems;
}

export async function getUniversBySlugDb(slug: string): Promise<UniversItem | undefined> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("univers")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();

    if (!error && data) return rowToItem(data as UniversRow);
  } catch {
    /* fallback */
  }
  return universItems.find((item) => item.slug === slug);
}

export async function getAdminUnivers(): Promise<UniversRow[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("univers")
      .select("*")
      .order("sort_order", { ascending: true });

    if (!error && data) {
      return (data as UniversRow[]).map((row) => ({
        ...row,
        details: Array.isArray(row.details) ? row.details : [],
        categories: Array.isArray(row.categories) ? row.categories : [],
      }));
    }
  } catch {
    /* empty */
  }
  return [];
}
