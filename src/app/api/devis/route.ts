import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import type { DevisInsert } from "@/types/devis";
import { getSiteSettings } from "@/lib/settings";
import { notifyNewDevis } from "@/lib/notify";

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

    const payload = {
      name: body.name.trim(),
      company: body.company?.trim() || null,
      email: body.email.trim(),
      phone: body.phone?.trim() || null,
      service: body.service,
      message: body.message?.trim() || null,
      status: "nouveau" as const,
    };

    const { error } = await supabase.from("devis").insert(payload);

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Erreur lors de l'envoi. Réessayez plus tard." },
        { status: 500 }
      );
    }

    // Mirror into Messages inbox (best-effort)
    await supabase.from("contact_messages").insert({
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      subject: `Devis — ${payload.service}`,
      message: [
        payload.company ? `Société: ${payload.company}` : null,
        `Service: ${payload.service}`,
        payload.message || "",
      ]
        .filter(Boolean)
        .join("\n"),
      status: "nouveau",
      source: "devis",
    });

    try {
      const settings = await getSiteSettings();
      await notifyNewDevis(settings, payload);
    } catch (notifyError) {
      console.error("notify error:", notifyError);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }
}
