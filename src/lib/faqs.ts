import { createClient } from "@/lib/supabase/server";
import { faqItems, type FaqItem } from "@/data/faq";
import type { FaqRow } from "@/types/content";

export async function getFaqs(): Promise<FaqItem[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("faqs")
      .select("question, answer")
      .eq("is_published", true)
      .order("sort_order", { ascending: true });

    if (!error && data && data.length > 0) {
      return data.map((row) => ({
        question: row.question,
        answer: row.answer,
      }));
    }
  } catch {
    /* fallback */
  }

  return faqItems;
}

export async function getAdminFaqs(): Promise<FaqRow[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("faqs")
      .select("*")
      .order("sort_order", { ascending: true });

    if (!error && data) return data as FaqRow[];
  } catch {
    /* empty */
  }
  return [];
}
