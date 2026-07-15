"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  CheckCircle,
  ImageIcon,
  Loader2,
  Trash2,
  Upload,
} from "lucide-react";
import type { GalleryPhoto } from "@/types/gallery";

interface GalleryAdminProps {
  initialPhotos: GalleryPhoto[];
}

export default function GalleryAdmin({ initialPhotos }: GalleryAdminProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [photos, setPhotos] = useState(initialPhotos);
  const [caption, setCaption] = useState("");
  const [alt, setAlt] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const resetForm = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setFileName("");
    setCaption("");
    setAlt("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSuccess("");
    setError("");

    if (!file) {
      resetForm();
      return;
    }

    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) {
      setError("Format accepté : JPG, PNG ou WebP uniquement.");
      resetForm();
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("L'image ne doit pas dépasser 5 Mo.");
      resetForm();
      return;
    }

    setFileName(file.name);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    const file = inputRef.current?.files?.[0];
    if (!file) {
      setError("Sélectionnez une image.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("caption", caption);
    formData.append("alt", alt || caption);

    try {
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        body: formData,
      });

      const data = (await res.json()) as {
        error?: string;
        photo?: GalleryPhoto;
      };

      if (!res.ok) {
        setError(data.error ?? "Erreur lors du téléversement.");
        setLoading(false);
        return;
      }

      if (data.photo) {
        setPhotos((prev) => [...prev, data.photo!]);
      }

      resetForm();
      setSuccess("Photo ajoutée à la galerie.");
      router.refresh();
    } catch {
      setError("Erreur réseau. Réessayez.");
    }

    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cette photo de la galerie ?")) return;

    setDeletingId(id);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        setError(data.error ?? "Impossible de supprimer la photo.");
        setDeletingId(null);
        return;
      }

      setPhotos((prev) => prev.filter((p) => p.id !== id));
      setSuccess("Photo supprimée.");
      router.refresh();
    } catch {
      setError("Erreur réseau. Réessayez.");
    }

    setDeletingId(null);
  };

  return (
    <>
      <section className="border border-white/10 bg-[#111111] p-6 lg:p-8">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-brand-red/30 bg-brand-red/10">
            <Upload size={18} className="text-brand-red" />
          </div>
          <div>
            <h2 className="font-display text-lg uppercase tracking-wide text-white">
              Ajouter une photo
            </h2>
            <p className="mt-1 text-sm text-luxury-muted">
              Les photos apparaissent dans la section Galerie du site (page d&apos;accueil).
            </p>
          </div>
        </div>

        {success && (
          <div className="mt-6 flex items-center gap-3 border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-400">
            <CheckCircle size={18} />
            {success}
          </div>
        )}

        {error && (
          <div className="mt-6 flex items-center gap-3 border border-brand-red/30 bg-brand-red/10 p-4 text-sm text-brand-red">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <label
            htmlFor="gallery-upload"
            className="flex min-h-[220px] cursor-pointer flex-col items-center justify-center border border-dashed border-white/15 bg-white/[0.02] px-6 py-10 transition-colors hover:border-brand-red/40 hover:bg-brand-red/5"
          >
            <Upload size={28} className="text-luxury-muted" strokeWidth={1.25} />
            <span className="mt-4 text-center text-sm text-white">
              Cliquez pour choisir une image
            </span>
            <span className="mt-1 text-center text-xs text-luxury-muted">
              JPG, PNG ou WebP — maximum 5 Mo
            </span>
            {fileName && (
              <span className="mt-3 text-center text-xs text-brand-gold">{fileName}</span>
            )}
            <input
              ref={inputRef}
              id="gallery-upload"
              type="file"
              accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
              className="sr-only"
              onChange={handleFileChange}
            />
          </label>

          <div className="flex flex-col gap-4">
            {preview && (
              <div className="relative aspect-[4/3] overflow-hidden border border-white/10">
                <Image src={preview} alt="Aperçu" fill className="object-cover" unoptimized />
              </div>
            )}

            <div>
              <label
                htmlFor="gallery-caption"
                className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-luxury-muted"
              >
                Légende affichée
              </label>
              <input
                id="gallery-caption"
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Ex. Team building corporate"
                className="admin-input mt-2 w-full"
              />
            </div>

            <div>
              <label
                htmlFor="gallery-alt"
                className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-luxury-muted"
              >
                Texte alternatif (accessibilité)
              </label>
              <input
                id="gallery-alt"
                type="text"
                value={alt}
                onChange={(e) => setAlt(e.target.value)}
                placeholder="Optionnel — décrit l'image pour les lecteurs d'écran"
                className="admin-input mt-2 w-full"
              />
            </div>

            <button
              type="button"
              onClick={handleUpload}
              disabled={loading || !fileName}
              className="admin-btn-primary mt-auto w-full"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Téléversement...
                </>
              ) : (
                <>
                  <Upload size={16} />
                  Ajouter à la galerie
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      <section className="mt-8 border border-white/10 bg-[#111111] p-6 lg:p-8">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/10 bg-white/5">
            <ImageIcon size={18} className="text-luxury-muted" />
          </div>
          <div>
            <h2 className="font-display text-lg uppercase tracking-wide text-white">
              Photos actuelles
            </h2>
            <p className="mt-1 text-sm text-luxury-muted">
              {photos.length === 0
                ? "Aucune photo en base — le site affiche les images par défaut."
                : `${photos.length} photo${photos.length > 1 ? "s" : ""} dans la galerie.`}
            </p>
          </div>
        </div>

        {photos.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="group relative overflow-hidden border border-white/10 bg-brand-dark"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <p className="font-display text-xs uppercase tracking-[0.15em] text-white">
                    {photo.caption || "Sans légende"}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleDelete(photo.id)}
                    disabled={deletingId === photo.id}
                    className="admin-btn-logout mt-3 w-full justify-center"
                  >
                    {deletingId === photo.id ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <Trash2 size={14} />
                    )}
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-6 text-sm text-luxury-muted">
            Ajoutez votre première photo ci-dessus pour remplacer la galerie par défaut.
          </p>
        )}
      </section>
    </>
  );
}
