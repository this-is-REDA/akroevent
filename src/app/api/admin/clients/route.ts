import { NextRequest, NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
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
  const name = String(formData.get("name") ?? "").trim();

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "Aucun logo sélectionné." }, { status: 400 });
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

  if (!name) {
    return NextResponse.json(
      { error: "Indiquez le nom du client / de la marque." },
      { status: 400 }
    );
  }

  const id = randomUUID();
  const filename = `${id}.${extensionFor(file.type)}`;
  const publicSrc = `/images/clients/${filename}`;

  try {
    const clientsDir = path.join(process.cwd(), "public", "images", "clients");
    await mkdir(clientsDir, { recursive: true });

    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(clientsDir, filename), buffer);

    const { data: lastLogo } = await supabase
      .from("client_logos")
      .select("sort_order")
      .order("sort_order", { ascending: false })
      .limit(1)
      .maybeSingle();

    const sortOrder = (lastLogo?.sort_order ?? -1) + 1;

    const { data, error } = await supabase
      .from("client_logos")
      .insert({
        id,
        name,
        src: publicSrc,
        sort_order: sortOrder,
        is_published: true,
      })
      .select("id, name, src, sort_order, is_published, created_at")
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Impossible d'enregistrer le logo en base de données." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, logo: data });
  } catch {
    return NextResponse.json(
      { error: "Impossible d'enregistrer le logo. Réessayez." },
      { status: 500 }
    );
  }
}
