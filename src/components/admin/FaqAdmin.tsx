"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { FaqRow } from "@/types/content";

export default function FaqAdmin({ initialItems }: { initialItems: FaqRow[] }) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const addItem = async () => {
    if (!question.trim() || !answer.trim()) {
      setError("Question et réponse requises.");
      return;
    }
    setLoading(true);
    setError("");
    const supabase = createClient();
    const sortOrder = items.length ? Math.max(...items.map((i) => i.sort_order)) + 1 : 0;
    const { data, error: err } = await supabase
      .from("faqs")
      .insert({
        question: question.trim(),
        answer: answer.trim(),
        sort_order: sortOrder,
        is_published: true,
      })
      .select("*")
      .single();
    setLoading(false);
    if (err || !data) {
      setError("Échec. Exécutez supabase/admin_modules.sql puis réessayez.");
      return;
    }
    setItems((prev) => [...prev, data as FaqRow]);
    setQuestion("");
    setAnswer("");
    router.refresh();
  };

  const togglePublished = async (item: FaqRow) => {
    const supabase = createClient();
    const { error: err } = await supabase
      .from("faqs")
      .update({ is_published: !item.is_published, updated_at: new Date().toISOString() })
      .eq("id", item.id);
    if (err) {
      setError("Impossible de mettre à jour.");
      return;
    }
    setItems((prev) =>
      prev.map((row) =>
        row.id === item.id ? { ...row, is_published: !row.is_published } : row
      )
    );
  };

  const removeItem = async (id: string) => {
    if (!confirm("Supprimer cette FAQ ?")) return;
    const supabase = createClient();
    const { error: err } = await supabase.from("faqs").delete().eq("id", id);
    if (err) {
      setError("Suppression impossible.");
      return;
    }
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

      <div className="brand-card space-y-4 p-6">
        <h2 className="font-display text-lg uppercase tracking-wide text-white">
          Ajouter une question
        </h2>
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Question"
          className="admin-input w-full"
        />
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Réponse"
          rows={4}
          className="admin-input w-full"
        />
        <button
          type="button"
          onClick={addItem}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded bg-brand-red px-4 py-2.5 text-sm font-medium text-white disabled:opacity-60"
        >
          {loading ? <Loader2 className="animate-spin" size={16} /> : <Plus size={16} />}
          Ajouter
        </button>
      </div>

      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.id} className="brand-card flex flex-col gap-3 p-5 sm:flex-row sm:items-start">
            <div className="flex-1">
              <p className="font-medium text-white">{item.question}</p>
              <p className="mt-2 text-sm text-white/70">{item.answer}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => togglePublished(item)}
                className={`rounded px-3 py-1.5 text-xs uppercase tracking-wide ${
                  item.is_published
                    ? "bg-emerald-500/15 text-emerald-300"
                    : "bg-white/10 text-white/50"
                }`}
              >
                {item.is_published ? "Publié" : "Masqué"}
              </button>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="rounded p-2 text-white/50 hover:text-red-400"
                aria-label="Supprimer"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </li>
        ))}
        {items.length === 0 && (
          <p className="text-sm text-luxury-muted">
            Aucune FAQ en base — le site utilise le contenu par défaut. Ajoutez des
            questions ici après avoir exécuté le SQL.
          </p>
        )}
      </ul>
    </div>
  );
}
