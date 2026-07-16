import { NextRequest, NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { createClient } from "@/lib/supabase/server";

const MAX_SIZE = 8 * 1024 * 1024;
const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
]);

export async function POST(request: NextRequest) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const label = String(formData.get("label") ?? "").trim();
  const alt = String(formData.get("alt") ?? label).trim();

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "Aucun fichier." }, { status: 400 });
  }
  if (!ALLOWED.has(file.type)) {
    return NextResponse.json(
      { error: "Formats: JPG, PNG, WebP, SVG." },
      { status: 400 }
    );
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "Fichier trop volumineux (8 Mo max)." }, { status: 400 });
  }

  const ext =
    file.type === "image/png"
      ? "png"
      : file.type === "image/webp"
        ? "webp"
        : file.type === "image/svg+xml"
          ? "svg"
          : "jpg";
  const id = randomUUID();
  const filename = `${id}.${ext}`;
  const publicSrc = `/images/media/${filename}`;

  try {
    const dir = path.join(process.cwd(), "public", "images", "media");
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, filename), Buffer.from(await file.arrayBuffer()));

    const { data, error } = await supabase
      .from("media_assets")
      .insert({
        id,
        src: publicSrc,
        alt: alt || "Akro Event",
        label: label || filename,
        mime_type: file.type,
        file_size: file.size,
      })
      .select("*")
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Impossible d'enregistrer en base." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, asset: data });
  } catch {
    return NextResponse.json({ error: "Échec upload." }, { status: 500 });
  }
}
