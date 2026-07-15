import { NextRequest, NextResponse } from "next/server";
import { mkdir, unlink, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { createClient } from "@/lib/supabase/server";

const MAX_SIZE = 2 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
]);

function extensionFor(type: string): string {
  if (type === "image/png") return "png";
  if (type === "image/webp") return "webp";
  if (type === "image/svg+xml") return "svg";
  return "jpg";
}

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

  const { data: logo, error: fetchError } = await supabase
    .from("client_logos")
    .select("src")
    .eq("id", params.id)
    .single();

  if (fetchError || !logo) {
    return NextResponse.json({ error: "Logo introuvable." }, { status: 404 });
  }

  const { error: deleteError } = await supabase
    .from("client_logos")
    .delete()
    .eq("id", params.id);

  if (deleteError) {
    return NextResponse.json(
      { error: "Impossible de supprimer le logo." },
      { status: 500 }
    );
  }

  if (logo.src.startsWith("/images/clients/")) {
    try {
      const filePath = path.join(process.cwd(), "public", logo.src.replace(/^\//, ""));
      await unlink(filePath);
    } catch {
      /* fichier déjà absent */
    }
  }

  return NextResponse.json({ success: true });
}

/** Remplace le fichier image d'un logo existant (conserve le nom). */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { data: existing, error: fetchError } = await supabase
    .from("client_logos")
    .select("id, name, src")
    .eq("id", params.id)
    .single();

  if (fetchError || !existing) {
    return NextResponse.json({ error: "Logo introuvable." }, { status: 404 });
  }

  const formData = await request.formData();
  const file = formData.get("image");
  const name = String(formData.get("name") ?? existing.name).trim() || existing.name;

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "Aucun fichier sélectionné." }, { status: 400 });
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: "Format accepté : JPG, PNG, WebP ou SVG uniquement." },
      { status: 400 }
    );
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: "Logo trop volumineux (maximum 2 Mo)." },
      { status: 400 }
    );
  }

  const filename = `${randomUUID()}.${extensionFor(file.type)}`;
  const publicSrc = `/images/clients/${filename}`;

  try {
    const clientsDir = path.join(process.cwd(), "public", "images", "clients");
    await mkdir(clientsDir, { recursive: true });
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(clientsDir, filename), buffer);

    const { data, error } = await supabase
      .from("client_logos")
      .update({ src: publicSrc, name })
      .eq("id", params.id)
      .select("id, name, src, sort_order, is_published, created_at")
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: "Impossible de mettre à jour le logo." },
        { status: 500 }
      );
    }

    if (existing.src.startsWith("/images/clients/")) {
      try {
        const oldPath = path.join(
          process.cwd(),
          "public",
          existing.src.replace(/^\//, "")
        );
        await unlink(oldPath);
      } catch {
        /* ignore */
      }
    }

    return NextResponse.json({ success: true, logo: data });
  } catch {
    return NextResponse.json(
      { error: "Impossible d'enregistrer le nouveau logo." },
      { status: 500 }
    );
  }
}
