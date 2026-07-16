"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle, AlertCircle, Search, Globe2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { SiteSettingsPublic } from "@/types/settings";

interface SeoSettingsFormProps {
  settings: SiteSettingsPublic;
}

export default function SeoSettingsForm({ settings: initial }: SeoSettingsFormProps) {
  const router = useRouter();
  const [form, setForm] = useState({
    seo_title: initial.seo_title ?? "",
    seo_description: initial.seo_description ?? "",
    seo_keywords: initial.seo_keywords ?? "",
    og_image_url: initial.og_image_url ?? "",
    geo_summary: initial.geo_summary ?? "",
    geo_service_area: initial.geo_service_area ?? "",
    geo_llms_txt: initial.geo_llms_txt ?? "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const supabase = createClient();
    const { error: updateError } = await supabase
      .from("site_settings")
      .update({
        seo_title: form.seo_title.trim(),
        seo_description: form.seo_description.trim(),
        seo_keywords: form.seo_keywords.trim(),
        og_image_url: form.og_image_url.trim(),
        geo_summary: form.geo_summary.trim(),
        geo_service_area: form.geo_service_area.trim(),
        geo_llms_txt: form.geo_llms_txt.trim(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", 1);

    if (updateError) {
      setError(
        "Erreur lors de la sauvegarde. Vérifiez que le SQL SEO/GEO a bien été exécuté dans Supabase."
      );
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {success && (
        <div className="flex items-center gap-3 border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-400">
          <CheckCircle size={18} />
          SEO &amp; GEO enregistrés avec succès.
        </div>
      )}

      {error && (
        <div className="flex items-center gap-3 border border-brand-red/30 bg-brand-red/10 p-4 text-sm text-brand-red">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      <section className="border border-white/10 bg-[#111111] p-6 lg:p-8">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-brand-red/30 bg-brand-red/10">
            <Search size={18} className="text-brand-red" />
          </div>
          <div>
            <h2 className="font-display text-lg uppercase tracking-wide text-white">
              SEO classique
            </h2>
            <p className="mt-1 text-sm text-luxury-muted">
              Titre, description et mots-clés pour Google et les réseaux sociaux.
              Laisser vide pour conserver les valeurs par défaut du site.
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="seo_title"
              className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-luxury-muted"
            >
              Titre SEO (balise title / Open Graph)
            </label>
            <input
              id="seo_title"
              type="text"
              value={form.seo_title}
              onChange={(e) => handleChange("seo_title", e.target.value)}
              placeholder="Akro Event | Agence Événementielle & Team Building au Maroc"
              className="admin-input mt-2 w-full"
              maxLength={70}
            />
            <p className="mt-1 text-[10px] text-luxury-muted">
              {form.seo_title.length}/70 caractères recommandés
            </p>
          </div>

          <div>
            <label
              htmlFor="seo_description"
              className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-luxury-muted"
            >
              Meta description
            </label>
            <textarea
              id="seo_description"
              value={form.seo_description}
              onChange={(e) => handleChange("seo_description", e.target.value)}
              placeholder="Akro Event, agence événementielle marocaine 360°…"
              className="admin-input mt-2 min-h-[100px] w-full resize-y"
              maxLength={180}
            />
            <p className="mt-1 text-[10px] text-luxury-muted">
              {form.seo_description.length}/160–180 caractères recommandés
            </p>
          </div>

          <div>
            <label
              htmlFor="seo_keywords"
              className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-luxury-muted"
            >
              Mots-clés (séparés par des virgules)
            </label>
            <textarea
              id="seo_keywords"
              value={form.seo_keywords}
              onChange={(e) => handleChange("seo_keywords", e.target.value)}
              placeholder="agence événementielle maroc, team building maroc, séminaire entreprise…"
              className="admin-input mt-2 min-h-[80px] w-full resize-y"
            />
          </div>

          <div>
            <label
              htmlFor="og_image_url"
              className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-luxury-muted"
            >
              Image Open Graph (URL ou chemin)
            </label>
            <input
              id="og_image_url"
              type="text"
              value={form.og_image_url}
              onChange={(e) => handleChange("og_image_url", e.target.value)}
              placeholder="/Fichier 2 (1).png ou https://..."
              className="admin-input mt-2 w-full"
            />
          </div>
        </div>
      </section>

      <section className="border border-white/10 bg-[#111111] p-6 lg:p-8">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-brand-gold/30 bg-brand-gold/10">
            <Globe2 size={18} className="text-brand-gold" />
          </div>
          <div>
            <h2 className="font-display text-lg uppercase tracking-wide text-white">
              GEO — Optimisation pour l&apos;IA
            </h2>
            <p className="mt-1 text-sm text-luxury-muted">
              Contenu clair pour ChatGPT, Perplexity, Gemini et autres moteurs
              génératifs (JSON-LD + fichier /llms.txt).
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="geo_summary"
              className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-luxury-muted"
            >
              Résumé entreprise (pour l&apos;IA)
            </label>
            <textarea
              id="geo_summary"
              value={form.geo_summary}
              onChange={(e) => handleChange("geo_summary", e.target.value)}
              placeholder="Qui est Akro Event, ce que vous faites, pour qui, avec quelle expertise…"
              className="admin-input mt-2 min-h-[120px] w-full resize-y"
            />
          </div>

          <div>
            <label
              htmlFor="geo_service_area"
              className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-luxury-muted"
            >
              Zone géographique servie
            </label>
            <input
              id="geo_service_area"
              type="text"
              value={form.geo_service_area}
              onChange={(e) => handleChange("geo_service_area", e.target.value)}
              placeholder="Maroc — Casablanca, Rabat, Marrakech, Tanger, Agadir…"
              className="admin-input mt-2 w-full"
            />
          </div>

          <div>
            <label
              htmlFor="geo_llms_txt"
              className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-luxury-muted"
            >
              Contenu llms.txt (Markdown)
            </label>
            <textarea
              id="geo_llms_txt"
              value={form.geo_llms_txt}
              onChange={(e) => handleChange("geo_llms_txt", e.target.value)}
              placeholder="# Akro Event&#10;&#10;> Agence événementielle…&#10;&#10;## Services&#10;- …"
              className="admin-input mt-2 min-h-[220px] w-full resize-y font-mono text-xs leading-relaxed"
            />
            <p className="mt-2 text-[10px] text-luxury-muted">
              Publié sur{" "}
              <a
                href="/llms.txt"
                target="_blank"
                rel="noreferrer"
                className="text-brand-gold hover:underline"
              >
                /llms.txt
              </a>{" "}
              — laisser vide pour générer un texte par défaut.
            </p>
          </div>
        </div>
      </section>

      <button type="submit" disabled={loading} className="admin-btn-primary w-full sm:w-auto">
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Enregistrement…
          </>
        ) : (
          "Enregistrer SEO & GEO"
        )}
      </button>
    </form>
  );
}
