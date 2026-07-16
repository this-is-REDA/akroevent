"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { UniversRow } from "@/types/content";
import { universItems } from "@/data/univers";

function toSeedRows(): Omit<UniversRow, "id" | "created_at" | "updated_at">[] {
  return universItems.map((item, i) => ({
    slug: item.slug,
    title: item.title,
    subtitle: item.subtitle,
    caption: item.caption,
    image_url: item.src,
    image_alt: item.alt,
    description: item.description,
    details: item.details,
    categories: item.categories,
    sort_order: i,
    is_published: true,
  }));
}

export default function UniversAdmin({ initialItems }: { initialItems: UniversRow[] }) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [activeId, setActiveId] = useState(initialItems[0]?.id ?? "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const active = items.find((item) => item.id === activeId) ?? items[0];

  const seedFromStatic = async () => {
    setLoading(true);
    setError("");
    setMessage("");
    const supabase = createClient();
    const { data, error: err } = await supabase
      .from("univers")
      .insert(toSeedRows())
      .select("*");
    setLoading(false);
    if (err || !data) {
      setError("Échec import. Exécutez admin_modules.sql (table vide requise).");
      return;
    }
    setItems(data as UniversRow[]);
    setActiveId((data[0] as UniversRow).id);
    setMessage("Univers importés depuis le site.");
    router.refresh();
  };

  const updateField = <K extends keyof UniversRow>(key: K, value: UniversRow[K]) => {
    if (!active) return;
    setItems((prev) =>
      prev.map((row) => (row.id === active.id ? { ...row, [key]: value } : row))
    );
  };

  const save = async () => {
    if (!active) return;
    setLoading(true);
    setError("");
    setMessage("");
    const supabase = createClient();
    const { error: err } = await supabase
      .from("univers")
      .update({
        title: active.title,
        subtitle: active.subtitle,
        caption: active.caption,
        image_url: active.image_url,
        image_alt: active.image_alt,
        description: active.description,
        details: active.details,
        is_published: active.is_published,
        updated_at: new Date().toISOString(),
      })
      .eq("id", active.id);
    setLoading(false);
    if (err) {
      setError("Sauvegarde impossible.");
      return;
    }
    setMessage("Enregistré.");
    router.refresh();
  };

  if (items.length === 0) {
    return (
      <div className="brand-card space-y-4 p-6">
        <p className="text-sm text-white/70">
          Aucun univers en base. Importez les 4 univers du site pour les éditer ici.
        </p>
        {error && <p className="text-sm text-red-300">{error}</p>}
        <button
          type="button"
          onClick={seedFromStatic}
          disabled={loading}
          className="rounded bg-brand-red px-4 py-2.5 text-sm text-white"
        >
          {loading ? "Import…" : "Importer les univers"}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveId(item.id)}
            className={`rounded px-3 py-2 text-sm ${
              item.id === active?.id
                ? "bg-brand-red text-white"
                : "bg-white/5 text-white/70"
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>

      {active && (
        <div className="brand-card space-y-4 p-6">
          <input
            value={active.title}
            onChange={(e) => updateField("title", e.target.value)}
            className="admin-input w-full"
            placeholder="Titre"
          />
          <input
            value={active.subtitle}
            onChange={(e) => updateField("subtitle", e.target.value)}
            className="admin-input w-full"
            placeholder="Sous-titre"
          />
          <input
            value={active.image_url}
            onChange={(e) => updateField("image_url", e.target.value)}
            className="admin-input w-full"
            placeholder="URL image"
          />
          <textarea
            value={active.description}
            onChange={(e) => updateField("description", e.target.value)}
            rows={4}
            className="admin-input w-full"
            placeholder="Description"
          />
          <textarea
            value={(active.details || []).join("\n")}
            onChange={(e) =>
              updateField(
                "details",
                e.target.value.split("\n").map((line) => line.trim()).filter(Boolean)
              )
            }
            rows={4}
            className="admin-input w-full"
            placeholder="Points clés (une ligne = un point)"
          />
          <label className="flex items-center gap-2 text-sm text-white/70">
            <input
              type="checkbox"
              checked={active.is_published}
              onChange={(e) => updateField("is_published", e.target.checked)}
            />
            Publié
          </label>
          {error && <p className="text-sm text-red-300">{error}</p>}
          {message && <p className="text-sm text-emerald-300">{message}</p>}
          <button
            type="button"
            onClick={save}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded bg-brand-red px-4 py-2.5 text-sm text-white"
          >
            {loading ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
            Enregistrer
          </button>
        </div>
      )}
    </div>
  );
}
