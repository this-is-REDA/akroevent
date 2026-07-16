import { createClient } from "@/lib/supabase/server";
import type { Testimonial } from "@/types/content";

export async function getPublishedTestimonials(): Promise<Testimonial[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("is_published", true)
      .order("sort_order", { ascending: true });

    if (!error && data) return data as Testimonial[];
  } catch {
    /* empty */
  }
  return [];
}

export async function getAdminTestimonials(): Promise<Testimonial[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("sort_order", { ascending: true });

    if (!error && data) return data as Testimonial[];
  } catch {
    /* empty */
  }
  return [];
}
