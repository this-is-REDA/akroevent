import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim() || null;
    const subject = String(body.subject ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Nom, email et message sont requis." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email invalide." }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { error } = await supabase.from("contact_messages").insert({
      name,
      email,
      phone,
      subject: subject || "Message site",
      message,
      status: "nouveau",
      source: "contact",
    });

    if (error) {
      console.error("contact insert:", error);
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
