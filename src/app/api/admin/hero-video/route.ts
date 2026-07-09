import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { createClient } from "@/lib/supabase/server";

const MAX_SIZE = 50 * 1024 * 1024;

export async function POST(request: NextRequest) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("video");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "Aucun fichier sélectionné." }, { status: 400 });
  }

  const isMp4 =
    file.type === "video/mp4" ||
    file.type === "video/quicktime" ||
    file.name.toLowerCase().endsWith(".mp4");

  if (!isMp4) {
    return NextResponse.json({ error: "Format accepté : MP4 uniquement." }, { status: 400 });
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: "Fichier trop volumineux (maximum 50 Mo)." },
      { status: 400 }
    );
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const filePath = path.join(process.cwd(), "public", "hero-vr.mp4");
    await writeFile(filePath, buffer);

    const version = Date.now().toString();

    await supabase
      .from("site_settings")
      .update({
        hero_video_version: version,
        updated_at: new Date().toISOString(),
      })
      .eq("id", 1);

    return NextResponse.json({
      success: true,
      version,
      src: `/hero-vr.mp4?v=${version}`,
    });
  } catch {
    return NextResponse.json(
      { error: "Impossible d'enregistrer la vidéo. Réessayez." },
      { status: 500 }
    );
  }
}
