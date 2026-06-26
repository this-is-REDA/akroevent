import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import type { DevisInsert } from "@/types/devis";

export async function POST(request: Request) {
  try {
    const body: DevisInsert = await request.json();

    if (!body.name?.trim() || !body.email?.trim() || !body.service?.trim()) {
      return NextResponse.json(
        { error: "Nom, email et service sont requis." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: "Email invalide." }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { error } = await supabase.from("devis").insert({
      name: body.name.trim(),
      company: body.company?.trim() || null,
      email: body.email.trim(),
      phone: body.phone?.trim() || null,
      service: body.service,
      message: body.message?.trim() || null,
      status: "nouveau",
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Erreur lors de l'envoi. Réessayez plus tard." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }
}
