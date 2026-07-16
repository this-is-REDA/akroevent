"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Testimonial } from "@/types/content";

export default function TestimonialsAdmin({
  initialItems,
}: {
  initialItems: Testimonial[];
}) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [author, setAuthor] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [quote, setQuote] = useState("");
  const [rating, setRating] = useState("5");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const addItem = async () => {
    if (!author.trim() || !quote.trim()) {
      setError("Nom et citation requis.");
      return;
    }
    setLoading(true);
    setError("");
    const supabase = createClient();
    const sortOrder = items.length ? Math.max(...items.map((i) => i.sort_order)) + 1 : 0;
    const { data, error: err } = await supabase
      .from("testimonials")
      .insert({
        author_name: author.trim(),
        company_name: company.trim(),
        role_title: role.trim(),
        quote: quote.trim(),
        rating: Number(rating) || null,
        sort_order: sortOrder,
        is_published: true,
      })
      .select("*")
      .single();
    setLoading(false);
    if (err || !data) {
      setError("Échec. Exécutez admin_modules.sql.");
      return;
    }
    setItems((prev) => [...prev, data as Testimonial]);
    setAuthor("");
    setCompany("");
    setRole("");
    setQuote("");
    router.refresh();
  };

  const toggle = async (item: Testimonial) => {
    const supabase = createClient();
    await supabase
      .from("testimonials")
      .update({ is_published: !item.is_published })
      .eq("id", item.id);
    setItems((prev) =>
      prev.map((row) =>
        row.id === item.id ? { ...row, is_published: !row.is_published } : row
      )
    );
  };

  const remove = async (id: string) => {
    if (!confirm("Supprimer ce témoignage ?")) return;
    const supabase = createClient();
    await supabase.from("testimonials").delete().eq("id", id);
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
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Nom"
          className="admin-input"
        />
        <input
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Entreprise"
          className="admin-input"
        />
        <input
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Fonction"
          className="admin-input"
        />
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="admin-input"
        >
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>
              {n} étoiles
            </option>
          ))}
        </select>
        <textarea
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          placeholder="Citation"
          rows={3}
          className="admin-input sm:col-span-2"
        />
        <button
          type="button"
          onClick={addItem}
          disabled={loading}
          className="inline-flex w-fit items-center gap-2 rounded bg-brand-red px-4 py-2.5 text-sm text-white"
        >
          {loading ? <Loader2 className="animate-spin" size={16} /> : <Plus size={16} />}
          Ajouter
        </button>
      </div>

      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.id} className="brand-card flex gap-4 p-5">
            <div className="flex-1">
              <p className="text-white">&ldquo;{item.quote}&rdquo;</p>
              <p className="mt-2 text-sm text-white/70">
                {item.author_name}
                {item.company_name ? ` — ${item.company_name}` : ""}
              </p>
            </div>
            <div className="flex items-start gap-2">
              <button
                type="button"
                onClick={() => toggle(item)}
                className={`rounded px-3 py-1.5 text-xs ${
                  item.is_published
                    ? "bg-emerald-500/15 text-emerald-300"
                    : "bg-white/10 text-white/50"
                }`}
              >
                {item.is_published ? "Publié" : "Masqué"}
              </button>
              <button type="button" onClick={() => remove(item.id)} className="p-2 text-white/50">
                <Trash2 size={16} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
