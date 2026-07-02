"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, CheckCircle, Film, Loader2, Upload } from "lucide-react";
import { getHeroVideoSrc } from "@/lib/hero-video";

interface HeroVideoAdminProps {
  heroVideoVersion: string;
}

export default function HeroVideoAdmin({ heroVideoVersion }: HeroVideoAdminProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [currentSrc, setCurrentSrc] = useState(getHeroVideoSrc({ hero_video_version: heroVideoVersion }));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSuccess(false);
    setError("");

    if (!file) {
      setPreview(null);
      setFileName("");
      return;
    }

    if (!file.name.toLowerCase().endsWith(".mp4") && file.type !== "video/mp4") {
      setError("Veuillez sélectionner un fichier MP4.");
      setPreview(null);
      setFileName("");
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setError("La vidéo ne doit pas dépasser 50 Mo.");
      setPreview(null);
      setFileName("");
      return;
    }

    setFileName(file.name);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    const file = inputRef.current?.files?.[0];
    if (!file) {
      setError("Sélectionnez une vidéo MP4.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    const formData = new FormData();
    formData.append("video", file);

    try {
      const res = await fetch("/api/admin/hero-video", {
        method: "POST",
        body: formData,
      });

      const data = (await res.json()) as { error?: string; src?: string };

      if (!res.ok) {
        setError(data.error ?? "Erreur lors du téléversement.");
        setLoading(false);
        return;
      }

      if (data.src) {
        setCurrentSrc(data.src);
      }

      if (preview) {
        URL.revokeObjectURL(preview);
      }

      setPreview(null);
      setFileName("");
      if (inputRef.current) {
        inputRef.current.value = "";
      }

      setSuccess(true);
      router.refresh();
    } catch {
      setError("Erreur réseau. Réessayez.");
    }

    setLoading(false);
  };

  return (
    <section className="mt-8 border border-white/10 bg-[#111111] p-6 lg:p-8">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-brand-red/30 bg-brand-red/10">
          <Film size={18} className="text-brand-red" />
        </div>
        <div>
          <h2 className="font-display text-lg uppercase tracking-wide text-white">
            Vidéo Hero
          </h2>
          <p className="mt-1 text-sm text-luxury-muted">
            Remplace la vidéo affichée en haut de la page d&apos;accueil (section principale).
          </p>
        </div>
      </div>

      {success && (
        <div className="mt-6 flex items-center gap-3 border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-400">
          <CheckCircle size={18} />
          Vidéo mise à jour avec succès.
        </div>
      )}

      {error && (
        <div className="mt-6 flex items-center gap-3 border border-brand-red/30 bg-brand-red/10 p-4 text-sm text-brand-red">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div>
          <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-luxury-muted">
            Vidéo actuelle
          </p>
          <div className="aspect-[4/5] overflow-hidden border border-white/10 bg-brand-dark">
            <video
              key={currentSrc}
              src={currentSrc}
              className="h-full w-full object-cover"
              muted
              loop
              playsInline
              autoPlay
              controls
            />
          </div>
        </div>

        <div className="flex flex-col">
          <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-luxury-muted">
            Nouvelle vidéo
          </p>

          <label
            htmlFor="hero-video-upload"
            className="flex flex-1 cursor-pointer flex-col items-center justify-center border border-dashed border-white/15 bg-white/[0.02] px-6 py-10 transition-colors hover:border-brand-red/40 hover:bg-brand-red/5"
          >
            <Upload size={28} className="text-luxury-muted" strokeWidth={1.25} />
            <span className="mt-4 text-center text-sm text-white">
              Cliquez pour choisir un fichier MP4
            </span>
            <span className="mt-1 text-center text-xs text-luxury-muted">
              Maximum 50 Mo — format .mp4
            </span>
            {fileName && (
              <span className="mt-3 text-center text-xs text-brand-gold">{fileName}</span>
            )}
            <input
              ref={inputRef}
              id="hero-video-upload"
              type="file"
              accept="video/mp4,.mp4"
              className="sr-only"
              onChange={handleFileChange}
            />
          </label>

          {preview && (
            <div className="mt-4 aspect-video overflow-hidden border border-white/10">
              <video src={preview} className="h-full w-full object-cover" muted controls />
            </div>
          )}

          <button
            type="button"
            onClick={handleUpload}
            disabled={loading || !fileName}
            className="admin-btn-primary mt-4 w-full"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Téléversement...
              </>
            ) : (
              <>
                <Upload size={16} />
                Mettre à jour la vidéo
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
