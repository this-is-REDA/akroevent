"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { SiteSettingsPublic } from "@/types/settings";

interface SettingsFormProps {
  settings: SiteSettingsPublic;
}

export default function SettingsForm({ settings: initial }: SettingsFormProps) {
  const router = useRouter();
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field: keyof SiteSettingsPublic, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const whatsapp = form.whatsapp_phone.replace(/\D/g, "");
    if (!whatsapp) {
      setError("Le numéro WhatsApp est invalide.");
      setLoading(false);
      return;
    }

    const supabase = createClient();
    const { error: updateError } = await supabase
      .from("site_settings")
      .update({
        whatsapp_phone: whatsapp,
        phone_display: form.phone_display.trim(),
        email: form.email.trim(),
        facebook_url: form.facebook_url.trim(),
        instagram_url: form.instagram_url.trim(),
        linkedin_url: form.linkedin_url.trim(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", 1);

    if (updateError) {
      setError("Erreur lors de la sauvegarde. Réessayez.");
      setLoading(false);
      return;
    }

    setForm((prev) => ({ ...prev, whatsapp_phone: whatsapp }));
    setSuccess(true);
    setLoading(false);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="border border-white/10 bg-[#111111] p-6 lg:p-8">
      {success && (
        <div className="mb-6 flex items-center gap-3 border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-400">
          <CheckCircle size={18} />
          Paramètres enregistrés avec succès.
        </div>
      )}

      {error && (
        <div className="mb-6 flex items-center gap-3 border border-brand-red/30 bg-brand-red/10 p-4 text-sm text-brand-red">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      <div className="space-y-8">
        <section>
          <h2 className="font-display text-lg uppercase tracking-wide text-white">
            Contact
          </h2>
          <p className="mt-1 text-sm text-luxury-muted">
            Numéros et email affichés sur le site.
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="whatsapp_phone" className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-luxury-muted">
                WhatsApp (chiffres uniquement)
              </label>
              <input
                id="whatsapp_phone"
                type="text"
                required
                value={form.whatsapp_phone}
                onChange={(e) => handleChange("whatsapp_phone", e.target.value)}
                placeholder="212663218522"
                className="input-underline"
              />
              <p className="mt-2 text-xs text-luxury-muted">
                Utilisé pour le bouton WhatsApp flottant.
              </p>
            </div>
            <div>
              <label htmlFor="phone_display" className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-luxury-muted">
                Téléphone affiché
              </label>
              <input
                id="phone_display"
                type="text"
                required
                value={form.phone_display}
                onChange={(e) => handleChange("phone_display", e.target.value)}
                placeholder="+212 (0)6 63 21 85 22"
                className="input-underline"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="email" className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-luxury-muted">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="Contact@akroevent.com"
                className="input-underline"
              />
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 pt-8">
          <h2 className="font-display text-lg uppercase tracking-wide text-white">
            Réseaux sociaux
          </h2>
          <p className="mt-1 text-sm text-luxury-muted">
            Liens affichés dans la section contact.
          </p>
          <div className="mt-6 space-y-6">
            <div>
              <label htmlFor="facebook_url" className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-luxury-muted">
                Facebook
              </label>
              <input
                id="facebook_url"
                type="url"
                required
                value={form.facebook_url}
                onChange={(e) => handleChange("facebook_url", e.target.value)}
                className="input-underline"
              />
            </div>
            <div>
              <label htmlFor="instagram_url" className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-luxury-muted">
                Instagram
              </label>
              <input
                id="instagram_url"
                type="url"
                required
                value={form.instagram_url}
                onChange={(e) => handleChange("instagram_url", e.target.value)}
                className="input-underline"
              />
            </div>
            <div>
              <label htmlFor="linkedin_url" className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-luxury-muted">
                LinkedIn
              </label>
              <input
                id="linkedin_url"
                type="url"
                required
                value={form.linkedin_url}
                onChange={(e) => handleChange("linkedin_url", e.target.value)}
                className="input-underline"
              />
            </div>
          </div>
        </section>

        <button
          type="submit"
          disabled={loading}
          className="admin-btn-primary w-full sm:w-auto"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Enregistrement...
            </>
          ) : (
            "Enregistrer"
          )}
        </button>
      </div>
    </form>
  );
}
