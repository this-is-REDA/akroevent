import { NextRequest, NextResponse } from "next/server";
import { unlink } from "fs/promises";
import path from "path";
import { createClient } from "@/lib/supabase/server";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { data: asset } = await supabase
    .from("media_assets")
    .select("id, src")
    .eq("id", params.id)
    .maybeSingle();

  if (!asset) {
    return NextResponse.json({ error: "Introuvable" }, { status: 404 });
  }

  const { error } = await supabase.from("media_assets").delete().eq("id", params.id);
  if (error) {
    return NextResponse.json({ error: "Suppression impossible" }, { status: 500 });
  }

  if (typeof asset.src === "string" && asset.src.startsWith("/images/media/")) {
    try {
      await unlink(path.join(process.cwd(), "public", asset.src));
    } catch {
      /* ignore missing file */
    }
  }

  return NextResponse.json({ success: true });
}
