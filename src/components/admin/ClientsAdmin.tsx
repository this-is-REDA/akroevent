"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  Building2,
  CheckCircle,
  Loader2,
  RefreshCw,
  Trash2,
  Upload,
} from "lucide-react";
import type { ClientLogo } from "@/types/client-logos";

interface ClientsAdminProps {
  initialLogos: ClientLogo[];
  seeded?: boolean;
  tableMissing?: boolean;
}

export default function ClientsAdmin({
  initialLogos,
  seeded = false,
  tableMissing = false,
}: ClientsAdminProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const replaceInputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const [logos, setLogos] = useState(initialLogos);

  useEffect(() => {
    setLogos(initialLogos);
  }, [initialLogos]);
  const [name, setName] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [replacingId, setReplacingId] = useState<string | null>(null);
  const [success, setSuccess] = useState(
    seeded
      ? "Les logos actuellement sur le site ont été chargés — vous pouvez les modifier."
      : ""
  );
  const [error, setError] = useState(
    tableMissing
      ? "Table client_logos introuvable. Exécutez supabase/client_logos.sql dans Supabase, puis rechargez."
      : ""
  );

  // UUID check: seeded DB rows vs fallback static ids like "ocp"
  const isDbId = (id: string) =>
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      id
    );

  const resetForm = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setFileName("");
    setName("");
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

    const allowed = ["image/jpeg", "image/png", "image/webp", "image/svg+xml"];
    if (!allowed.includes(file.type)) {
      setError("Format accepté : JPG, PNG, WebP ou SVG uniquement.");
      resetForm();
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("Le logo ne doit pas dépasser 2 Mo.");
      resetForm();
      return;
    }

    setFileName(file.name);
    setPreview(URL.createObjectURL(file));
    if (!name) {
      const base = file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ");
      setName(base);
    }
  };

  const handleUpload = async () => {
    const file = inputRef.current?.files?.[0];
    if (!file) {
      setError("Sélectionnez un logo.");
      return;
    }
    if (!name.trim()) {
      setError("Indiquez le nom du client.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", name.trim());

    try {
      const res = await fetch("/api/admin/clients", {
        method: "POST",
        body: formData,
      });

      const data = (await res.json()) as {
        error?: string;
        logo?: ClientLogo;
      };

      if (!res.ok) {
        setError(data.error ?? "Erreur lors du téléversement.");
        setLoading(false);
        return;
      }

      if (data.logo) {
        setLogos((prev) => [...prev, data.logo!]);
      }

      resetForm();
      setSuccess("Logo ajouté aux références.");
      router.refresh();
    } catch {
      setError("Erreur réseau. Réessayez.");
    }

    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!isDbId(id)) {
      setError("Exécutez d'abord le SQL client_logos.sql pour gérer ces logos.");
      return;
    }
    if (!confirm("Supprimer ce logo des références ?")) return;

    setDeletingId(id);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`/api/admin/clients/${id}`, { method: "DELETE" });
      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        setError(data.error ?? "Impossible de supprimer le logo.");
        setDeletingId(null);
        return;
      }

      setLogos((prev) => prev.filter((logo) => logo.id !== id));
      setSuccess("Logo supprimé.");
      router.refresh();
    } catch {
      setError("Erreur réseau. Réessayez.");
    }

    setDeletingId(null);
  };

  const handleReplaceClick = (id: string) => {
    if (!isDbId(id)) {
      setError("Exécutez d'abord le SQL client_logos.sql pour gérer ces logos.");
      return;
    }
    replaceInputRefs.current[id]?.click();
  };

  const handleReplaceFile = async (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    const allowed = ["image/jpeg", "image/png", "image/webp", "image/svg+xml"];
    if (!allowed.includes(file.type)) {
      setError("Format accepté : JPG, PNG, WebP ou SVG uniquement.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError("Le logo ne doit pas dépasser 2 Mo.");
      return;
    }

    const logo = logos.find((l) => l.id === id);
    setReplacingId(id);
    setError("");
    setSuccess("");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", logo?.name ?? "");

    try {
      const res = await fetch(`/api/admin/clients/${id}`, {
        method: "PATCH",
        body: formData,
      });
      const data = (await res.json()) as { error?: string; logo?: ClientLogo };

      if (!res.ok) {
        setError(data.error ?? "Impossible de remplacer le logo.");
        setReplacingId(null);
        return;
      }

      if (data.logo) {
        setLogos((prev) =>
          prev.map((item) => (item.id === id ? data.logo! : item))
        );
      }
      setSuccess(`Logo « ${data.logo?.name ?? ""} » mis à jour.`);
      router.refresh();
    } catch {
      setError("Erreur réseau. Réessayez.");
    }

    setReplacingId(null);
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
              Ajouter un logo
            </h2>
            <p className="mt-1 text-sm text-luxury-muted">
              Nouveau logo pour la section « Nos Références ».
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
            htmlFor="client-logo-upload"
            className="relative flex min-h-[220px] cursor-pointer flex-col items-center justify-center border border-dashed border-white/15 bg-white/[0.02] px-6 py-10 transition-colors hover:border-brand-red/40 hover:bg-brand-red/5"
          >
            <Upload size={28} className="pointer-events-none text-luxury-muted" strokeWidth={1.25} />
            <span className="pointer-events-none mt-4 text-center text-sm text-white">
              Cliquez pour choisir un logo
            </span>
            <span className="pointer-events-none mt-1 text-center text-xs text-luxury-muted">
              JPG, PNG, WebP ou SVG — maximum 2 Mo
            </span>
            {fileName && (
              <span className="pointer-events-none mt-3 text-center text-xs text-brand-gold">
                {fileName}
              </span>
            )}
            <input
              ref={inputRef}
              id="client-logo-upload"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/svg+xml,.jpg,.jpeg,.png,.webp,.svg"
              className="absolute inset-0 z-10 cursor-pointer opacity-0"
              onChange={handleFileChange}
            />
          </label>

          <div className="flex flex-col gap-4">
            {preview && (
              <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden border border-white/10 bg-white/[0.03] p-6">
                <Image
                  src={preview}
                  alt="Aperçu"
                  fill
                  className="object-contain p-4"
                  unoptimized
                />
              </div>
            )}

            <div>
              <label
                htmlFor="client-logo-name"
                className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-luxury-muted"
              >
                Nom du client
              </label>
              <input
                id="client-logo-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex. AXA, TotalEnergies…"
                className="admin-input mt-2 w-full"
              />
            </div>

            <button
              type="button"
              onClick={handleUpload}
              disabled={loading || !fileName || tableMissing}
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
                  Ajouter aux références
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      <section className="mt-8 border border-white/10 bg-[#111111] p-6 lg:p-8">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/10 bg-white/5">
            <Building2 size={18} className="text-luxury-muted" />
          </div>
          <div>
            <h2 className="font-display text-lg uppercase tracking-wide text-white">
              Logos sur le site
            </h2>
            <p className="mt-1 text-sm text-luxury-muted">
              {logos.length} logo{logos.length > 1 ? "s" : ""} actuellement
              affiché{logos.length > 1 ? "s" : ""} dans « Nos Références ». Cliquez
              sur <strong className="font-medium text-white">Remplacer</strong> pour
              changer une image.
            </p>
          </div>
        </div>

        {logos.length > 0 ? (
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {logos.map((logo) => (
              <div
                key={logo.id}
                className="group relative overflow-hidden border border-white/10 bg-brand-dark"
              >
                <div className="relative flex aspect-[4/3] items-center justify-center bg-white/[0.03] p-4">
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-contain p-4"
                    unoptimized={logo.src.endsWith(".svg")}
                  />
                </div>
                <div className="p-4">
                  <p className="font-display text-xs uppercase tracking-[0.15em] text-white">
                    {logo.name}
                  </p>
                  <input
                    ref={(el) => {
                      replaceInputRefs.current[logo.id] = el;
                    }}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/svg+xml,.jpg,.jpeg,.png,.webp,.svg"
                    className="fixed left-[-9999px] top-0 h-px w-px opacity-0"
                    onChange={(e) => handleReplaceFile(logo.id, e)}
                    tabIndex={-1}
                  />
                  <div className="mt-3 flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => handleReplaceClick(logo.id)}
                      disabled={replacingId === logo.id || tableMissing}
                      className="admin-btn-filter admin-btn-filter-inactive w-full justify-center"
                    >
                      {replacingId === logo.id ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <RefreshCw size={14} />
                      )}
                      Remplacer
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(logo.id)}
                      disabled={deletingId === logo.id || tableMissing}
                      className="admin-btn-logout w-full justify-center"
                    >
                      {deletingId === logo.id ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <Trash2 size={14} />
                      )}
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-6 text-sm text-luxury-muted">
            Aucun logo pour le moment. Ajoutez-en un ci-dessus.
          </p>
        )}
      </section>
    </>
  );
}
