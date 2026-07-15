import { NextRequest, NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { createClient } from "@/lib/supabase/server";

const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function POST(request: NextRequest) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("image");
  const caption = String(formData.get("caption") ?? "").trim();
  const alt = String(formData.get("alt") ?? caption).trim() || "Photo Akro Event";

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "Aucune image sélectionnée." }, { status: 400 });
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: "Format accepté : JPG, PNG ou WebP uniquement." },
      { status: 400 }
    );
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: "Image trop volumineuse (maximum 5 Mo)." },
      { status: 400 }
    );
  }

  const ext =
    file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
  const id = randomUUID();
  const filename = `${id}.${ext}`;
  const publicSrc = `/images/gallery/${filename}`;

  try {
    const galleryDir = path.join(process.cwd(), "public", "images", "gallery");
    await mkdir(galleryDir, { recursive: true });

    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(galleryDir, filename), buffer);

    const { data: lastPhoto } = await supabase
      .from("gallery_photos")
      .select("sort_order")
      .order("sort_order", { ascending: false })
      .limit(1)
      .maybeSingle();

    const sortOrder = (lastPhoto?.sort_order ?? -1) + 1;

    const { data, error } = await supabase
      .from("gallery_photos")
      .insert({
        id,
        src: publicSrc,
        alt,
        caption: caption || "Akro Event",
        sort_order: sortOrder,
        is_published: true,
      })
      .select("id, src, alt, caption, sort_order, is_published, created_at")
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Impossible d'enregistrer la photo en base de données." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, photo: data });
  } catch {
    return NextResponse.json(
      { error: "Impossible d'enregistrer l'image. Réessayez." },
      { status: 500 }
    );
  }
}
