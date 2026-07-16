import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { DEFAULT_SETTINGS, SITE_SETTINGS_SELECT } from "@/types/settings";

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data } = await supabase
    .from("site_settings")
    .select(SITE_SETTINGS_SELECT)
    .eq("id", 1)
    .single();

  return NextResponse.json(data ? { ...DEFAULT_SETTINGS, ...data } : DEFAULT_SETTINGS);
}
