"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Redirect } from "@/types/content";

export default function RedirectsAdmin({
  initialItems,
}: {
  initialItems: Redirect[];
}) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [fromPath, setFromPath] = useState("");
  const [toPath, setToPath] = useState("");
  const [code, setCode] = useState("301");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const add = async () => {
    const from = fromPath.trim().startsWith("/")
      ? fromPath.trim()
      : `/${fromPath.trim()}`;
    const to = toPath.trim();
    if (!from || !to) {
      setError("Chemins requis.");
      return;
    }
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { data, error: err } = await supabase
      .from("redirects")
      .insert({
        from_path: from,
        to_path: to,
        status_code: Number(code),
        is_active: true,
      })
      .select("*")
      .single();
    setLoading(false);
    if (err || !data) {
      setError("Échec. Vérifiez le SQL / chemin unique.");
      return;
    }
    setItems((prev) => [data as Redirect, ...prev]);
    setFromPath("");
    setToPath("");
    router.refresh();
  };

  const toggle = async (item: Redirect) => {
    const supabase = createClient();
    await supabase
      .from("redirects")
      .update({ is_active: !item.is_active })
      .eq("id", item.id);
    setItems((prev) =>
      prev.map((row) =>
        row.id === item.id ? { ...row, is_active: !row.is_active } : row
      )
    );
  };

  const remove = async (id: string) => {
    if (!confirm("Supprimer cette redirection ?")) return;
    const supabase = createClient();
    await supabase.from("redirects").delete().eq("id", id);
    setItems((prev) => prev.filter((row) => row.id !== id));
    router.refresh();
  };

  return (
    <div className="space-y-8">
      {error && (
        <p className="rounded border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}
      <div className="brand-card grid gap-3 p-6 sm:grid-cols-2">
        <input
          value={fromPath}
          onChange={(e) => setFromPath(e.target.value)}
          placeholder="Depuis (/ancienne-page)"
          className="admin-input"
        />
        <input
          value={toPath}
          onChange={(e) => setToPath(e.target.value)}
          placeholder="Vers (/nouvelle-page ou URL)"
          className="admin-input"
        />
        <select value={code} onChange={(e) => setCode(e.target.value)} className="admin-input">
          <option value="301">301 permanent</option>
          <option value="302">302 temporaire</option>
          <option value="307">307</option>
          <option value="308">308</option>
        </select>
        <button
          type="button"
          onClick={add}
          disabled={loading}
          className="inline-flex w-fit items-center gap-2 rounded bg-brand-red px-4 py-2.5 text-sm text-white"
        >
          {loading ? <Loader2 className="animate-spin" size={16} /> : <Plus size={16} />}
          Ajouter
        </button>
      </div>

      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id} className="brand-card flex items-center gap-3 p-4 text-sm">
            <code className="text-brand-red">{item.from_path}</code>
            <span className="text-white/40">→</span>
            <code className="text-white/80">{item.to_path}</code>
            <span className="text-white/40">{item.status_code}</span>
            <button
              type="button"
              onClick={() => toggle(item)}
              className={`ml-auto rounded px-2 py-1 text-xs ${
                item.is_active ? "bg-emerald-500/15 text-emerald-300" : "bg-white/10 text-white/40"
              }`}
            >
              {item.is_active ? "Active" : "Off"}
            </button>
            <button type="button" onClick={() => remove(item.id)} className="text-white/40">
              <Trash2 size={14} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
