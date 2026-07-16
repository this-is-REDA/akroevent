"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Copy, Loader2, Trash2, Upload } from "lucide-react";
import type { MediaAsset } from "@/types/content";

export default function MediaAdmin({ initialItems }: { initialItems: MediaAsset[] }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState(initialItems);
  const [label, setLabel] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");

  const upload = async () => {
    const file = inputRef.current?.files?.[0];
    if (!file) {
      setError("Sélectionnez un fichier.");
      return;
    }
    setLoading(true);
    setError("");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("label", label);
    formData.append("alt", label || file.name);
    const res = await fetch("/api/admin/media", { method: "POST", body: formData });
    const data = (await res.json()) as { error?: string; asset?: MediaAsset };
    setLoading(false);
    if (!res.ok || !data.asset) {
      setError(data.error ?? "Upload impossible.");
      return;
    }
    setItems((prev) => [data.asset!, ...prev]);
    setLabel("");
    if (inputRef.current) inputRef.current.value = "";
    router.refresh();
  };

  const copySrc = async (src: string) => {
    await navigator.clipboard.writeText(src);
    setCopied(src);
    setTimeout(() => setCopied(""), 1500);
  };

  const remove = async (id: string) => {
    if (!confirm("Supprimer ce média ?")) return;
    const res = await fetch(`/api/admin/media/${id}`, { method: "DELETE" });
    if (!res.ok) {
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
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Libellé"
          className="admin-input w-full"
        />
        <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp,image/svg+xml" />
        <button
          type="button"
          onClick={upload}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded bg-brand-red px-4 py-2.5 text-sm text-white"
        >
          {loading ? <Loader2 className="animate-spin" size={16} /> : <Upload size={16} />}
          Téléverser
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item.id} className="brand-card overflow-hidden">
            <div className="relative aspect-video bg-black/40">
              <Image src={item.src} alt={item.alt || item.label} fill className="object-contain p-2" />
            </div>
            <div className="space-y-2 p-4">
              <p className="truncate text-sm text-white">{item.label || item.src}</p>
              <p className="truncate text-xs text-luxury-muted">{item.src}</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => copySrc(item.src)}
                  className="inline-flex items-center gap-1 rounded bg-white/10 px-2 py-1 text-xs text-white"
                >
                  <Copy size={12} />
                  {copied === item.src ? "Copié" : "Copier URL"}
                </button>
                <button
                  type="button"
                  onClick={() => remove(item.id)}
                  className="rounded p-1 text-white/50 hover:text-red-400"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
