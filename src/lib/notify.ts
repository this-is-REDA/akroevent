import type { SiteSettingsPublic } from "@/types/settings";

type DevisNotifyPayload = {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  service: string;
  message?: string | null;
};

/** Best-effort notification (Resend if configured, otherwise no-op). */
export async function notifyNewDevis(
  settings: SiteSettingsPublic,
  payload: DevisNotifyPayload
) {
  if (!settings.notify_on_devis) return;

  const to = (settings.notify_email || settings.email || "").trim();
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL || "Akro Event <onboarding@resend.dev>";

  if (!to || !apiKey) {
    console.info("[notify] Devis reçu (email non configuré):", payload.email, payload.service);
    return;
  }

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `Nouveau devis — ${payload.service}`,
        text: [
          `Nouveau devis reçu sur akroevent.com`,
          ``,
          `Nom: ${payload.name}`,
          `Email: ${payload.email}`,
          `Téléphone: ${payload.phone || "—"}`,
          `Société: ${payload.company || "—"}`,
          `Service: ${payload.service}`,
          ``,
          payload.message || "",
        ].join("\n"),
      }),
    });
  } catch (error) {
    console.error("[notify] Échec envoi email:", error);
  }
}
