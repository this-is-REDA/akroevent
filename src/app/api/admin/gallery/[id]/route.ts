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

  const { data: photo, error: fetchError } = await supabase
    .from("gallery_photos")
    .select("src")
    .eq("id", params.id)
    .single();

  if (fetchError || !photo) {
    return NextResponse.json({ error: "Photo introuvable." }, { status: 404 });
  }

  const { error: deleteError } = await supabase
    .from("gallery_photos")
    .delete()
    .eq("id", params.id);

  if (deleteError) {
    return NextResponse.json(
      { error: "Impossible de supprimer la photo." },
      { status: 500 }
    );
  }

  if (photo.src.startsWith("/images/gallery/")) {
    try {
      const filePath = path.join(process.cwd(), "public", photo.src.replace(/^\//, ""));
      await unlink(filePath);
    } catch {
      /* fichier déjà absent */
    }
  }

  return NextResponse.json({ success: true });
}
