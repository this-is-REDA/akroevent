import { createClient } from "@/lib/supabase/server";
import type { BlogPost } from "@/types/content";

export async function getPublishedPosts(): Promise<BlogPost[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("is_published", true)
      .order("published_at", { ascending: false });

    if (!error && data) return data as BlogPost[];
  } catch {
    /* empty */
  }
  return [];
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();

    if (!error && data) return data as BlogPost;
  } catch {
    /* empty */
  }
  return null;
}

export async function getAdminPosts(): Promise<BlogPost[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) return data as BlogPost[];
  } catch {
    /* empty */
  }
  return [];
}
