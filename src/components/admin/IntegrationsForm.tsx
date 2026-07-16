"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { SiteSettingsPublic } from "@/types/settings";

export default function IntegrationsForm({
  settings,
}: {
  settings: SiteSettingsPublic;
}) {
  const [form, setForm] = useState({
    ga_measurement_id: settings.ga_measurement_id ?? "",
    gtm_id: settings.gtm_id ?? "",
    notify_email: settings.notify_email || settings.email || "",
    notify_on_devis: settings.notify_on_devis ?? true,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const save = async () => {
    setLoading(true);
    setSuccess(false);
    setError("");
    const supabase = createClient();
    const { error: err } = await supabase
      .from("site_settings")
      .update({
        ga_measurement_id: form.ga_measurement_id.trim(),
        gtm_id: form.gtm_id.trim(),
        notify_email: form.notify_email.trim(),
        notify_on_devis: form.notify_on_devis,
        updated_at: new Date().toISOString(),
      })
      .eq("id", 1);
    setLoading(false);
    if (err) {
      setError("Échec. Exécutez admin_modules.sql (colonnes analytics/notify).");
      return;
    }
    setSuccess(true);
  };

  return (
    <div className="brand-card space-y-6 p-6">
      <div>
        <h2 className="font-display text-lg uppercase tracking-wide text-white">
          Analytics
        </h2>
        <p className="mt-1 text-sm text-luxury-muted">
          Google Analytics 4 et/ou Google Tag Manager.
        </p>
      </div>
      <input
        value={form.ga_measurement_id}
        onChange={(e) => setForm((f) => ({ ...f, ga_measurement_id: e.target.value }))}
        placeholder="GA4 Measurement ID (G-XXXXXXXX)"
        className="admin-input w-full"
      />
      <input
        value={form.gtm_id}
        onChange={(e) => setForm((f) => ({ ...f, gtm_id: e.target.value }))}
        placeholder="GTM ID (GTM-XXXXXXX)"
        className="admin-input w-full"
      />

      <div className="border-t border-white/10 pt-6">
        <h2 className="font-display text-lg uppercase tracking-wide text-white">
          Notifications devis
        </h2>
        <p className="mt-1 text-sm text-luxury-muted">
          Email de notification (nécessite aussi RESEND_API_KEY côté serveur pour
          l&apos;envoi automatique).
        </p>
      </div>
      <input
        value={form.notify_email}
        onChange={(e) => setForm((f) => ({ ...f, notify_email: e.target.value }))}
        placeholder="Email notification"
        className="admin-input w-full"
      />
      <label className="flex items-center gap-2 text-sm text-white/70">
        <input
          type="checkbox"
          checked={form.notify_on_devis}
          onChange={(e) =>
            setForm((f) => ({ ...f, notify_on_devis: e.target.checked }))
          }
        />
        Notifier à chaque nouveau devis
      </label>

      {error && <p className="text-sm text-red-300">{error}</p>}
      {success && <p className="text-sm text-emerald-300">Enregistré.</p>}
      <button
        type="button"
        onClick={save}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded bg-brand-red px-4 py-2.5 text-sm text-white"
      >
        {loading && <Loader2 className="animate-spin" size={16} />}
        Enregistrer
      </button>
    </div>
  );
}
