"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { BlogPost } from "@/types/content";

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function BlogAdmin({ initialPosts }: { initialPosts: BlogPost[] }) {
  const router = useRouter();
  const [posts, setPosts] = useState(initialPosts);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [cover, setCover] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const addPost = async () => {
    if (!title.trim() || !content.trim()) {
      setError("Titre et contenu requis.");
      return;
    }
    setLoading(true);
    setError("");
    const slug = slugify(title);
    const supabase = createClient();
    const { data, error: err } = await supabase
      .from("blog_posts")
      .insert({
        title: title.trim(),
        slug,
        excerpt: excerpt.trim(),
        content: content.trim(),
        cover_image_url: cover.trim(),
        is_published: false,
      })
      .select("*")
      .single();
    setLoading(false);
    if (err || !data) {
      setError("Échec. Vérifiez le SQL admin_modules.sql (slug unique).");
      return;
    }
    setPosts((prev) => [data as BlogPost, ...prev]);
    setTitle("");
    setExcerpt("");
    setContent("");
    setCover("");
    router.refresh();
  };

  const togglePublish = async (post: BlogPost) => {
    const next = !post.is_published;
    const supabase = createClient();
    const { error: err } = await supabase
      .from("blog_posts")
      .update({
        is_published: next,
        published_at: next ? new Date().toISOString() : post.published_at,
        updated_at: new Date().toISOString(),
      })
      .eq("id", post.id);
    if (err) {
      setError("Publication impossible.");
      return;
    }
    setPosts((prev) =>
      prev.map((row) =>
        row.id === post.id ? { ...row, is_published: next } : row
      )
    );
    router.refresh();
  };

  const removePost = async (id: string) => {
    if (!confirm("Supprimer cet article ?")) return;
    const supabase = createClient();
    const { error: err } = await supabase.from("blog_posts").delete().eq("id", id);
    if (err) {
      setError("Suppression impossible.");
      return;
    }
    setPosts((prev) => prev.filter((row) => row.id !== id));
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
          Nouvel article
        </h2>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titre"
          className="admin-input w-full"
        />
        <input
          value={cover}
          onChange={(e) => setCover(e.target.value)}
          placeholder="URL image de couverture (ex: /images/…)"
          className="admin-input w-full"
        />
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Extrait"
          rows={2}
          className="admin-input w-full"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Contenu (texte)"
          rows={8}
          className="admin-input w-full"
        />
        <button
          type="button"
          onClick={addPost}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded bg-brand-red px-4 py-2.5 text-sm font-medium text-white disabled:opacity-60"
        >
          {loading ? <Loader2 className="animate-spin" size={16} /> : <Plus size={16} />}
          Créer (brouillon)
        </button>
      </div>

      <ul className="space-y-3">
        {posts.map((post) => (
          <li key={post.id} className="brand-card flex flex-col gap-3 p-5 sm:flex-row">
            <div className="flex-1">
              <p className="font-medium text-white">{post.title}</p>
              <p className="mt-1 text-xs text-luxury-muted">/{post.slug}</p>
              {post.excerpt && (
                <p className="mt-2 text-sm text-white/70">{post.excerpt}</p>
              )}
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => togglePublish(post)}
                className={`rounded px-3 py-1.5 text-xs uppercase tracking-wide ${
                  post.is_published
                    ? "bg-emerald-500/15 text-emerald-300"
                    : "bg-white/10 text-white/50"
                }`}
              >
                {post.is_published ? "Publié" : "Brouillon"}
              </button>
              <button
                type="button"
                onClick={() => removePost(post.id)}
                className="rounded p-2 text-white/50 hover:text-red-400"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </li>
        ))}
        {posts.length === 0 && (
          <p className="text-sm text-luxury-muted">Aucun article pour le moment.</p>
        )}
      </ul>
    </div>
  );
}
