import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { DEFAULT_SETTINGS } from "@/types/settings";

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data } = await supabase
    .from("site_settings")
    .select("whatsapp_phone, phone_display, email, facebook_url, instagram_url, linkedin_url")
    .eq("id", 1)
    .single();

  return NextResponse.json(data ?? DEFAULT_SETTINGS);
}
