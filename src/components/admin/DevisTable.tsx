"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Mail,
  Phone,
  Building2,
  ChevronDown,
  Trash2,
  X,
  Loader2,
} from "lucide-react";
import type { Devis, DevisStatus } from "@/types/devis";
import {
  SERVICE_LABELS,
  STATUS_LABELS,
  STATUS_COLORS,
} from "@/types/devis";
import { createClient } from "@/lib/supabase/client";
import { whatsappContactHref } from "@/lib/settings-utils";

interface DevisTableProps {
  devis: Devis[];
}

function buildWhatsAppMessage(d: Devis): string {
  const service = SERVICE_LABELS[d.service] || d.service;
  return `Bonjour ${d.name}, nous vous contactons concernant votre demande de devis pour "${service}" chez Akro Event.`;
}

function hasPhone(d: Devis): boolean {
  return Boolean(d.phone?.replace(/\D/g, ""));
}

export default function DevisTable({ devis: initialDevis }: DevisTableProps) {
  const router = useRouter();
  const [devis, setDevis] = useState(initialDevis);
  const [filter, setFilter] = useState<DevisStatus | "all">("all");
  const [selected, setSelected] = useState<Devis | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  const filtered =
    filter === "all" ? devis : devis.filter((d) => d.status === filter);

  const counts = {
    all: devis.length,
    nouveau: devis.filter((d) => d.status === "nouveau").length,
    en_cours: devis.filter((d) => d.status === "en_cours").length,
    traite: devis.filter((d) => d.status === "traite").length,
    archive: devis.filter((d) => d.status === "archive").length,
  };

  const updateStatus = async (id: string, status: DevisStatus) => {
    setUpdating(id);
    const supabase = createClient();
    const { error } = await supabase
      .from("devis")
      .update({ status })
      .eq("id", id);

    if (!error) {
      setDevis((prev) =>
        prev.map((d) => (d.id === id ? { ...d, status } : d))
      );
      if (selected?.id === id) setSelected({ ...selected, status });
      router.refresh();
    }
    setUpdating(null);
  };

  const deleteDevis = async (id: string) => {
    if (!confirm("Supprimer ce devis définitivement ?")) return;
    setUpdating(id);
    const supabase = createClient();
    const { error } = await supabase.from("devis").delete().eq("id", id);

    if (!error) {
      setDevis((prev) => prev.filter((d) => d.id !== id));
      if (selected?.id === id) setSelected(null);
      router.refresh();
    }
    setUpdating(null);
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const filters: { key: DevisStatus | "all"; label: string }[] = [
    { key: "all", label: "Tous" },
    { key: "nouveau", label: "Nouveaux" },
    { key: "en_cours", label: "En cours" },
    { key: "traite", label: "Traités" },
    { key: "archive", label: "Archivés" },
  ];

  return (
    <>
      <div className="mb-8 -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 md:flex-wrap md:overflow-visible">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={
              filter === f.key
                ? "admin-btn-filter-active"
                : "admin-btn-filter-inactive"
            }
          >
            {f.label}
            <span className="opacity-60">({counts[f.key]})</span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="border border-white/10 bg-[#111111] p-12 text-center">
          <p className="text-luxury-muted">Aucun devis pour ce filtre.</p>
        </div>
      ) : (
        <>
          {/* Mobile / tablet cards */}
          <div className="space-y-3 md:hidden">
            {filtered.map((d) => (
              <div
                key={d.id}
                className="border border-white/10 bg-[#111111] p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <button
                      onClick={() => setSelected(d)}
                      className="text-left font-medium text-white hover:text-brand-red"
                    >
                      {d.name}
                    </button>
                    <p className="mt-1 truncate text-xs text-luxury-muted">{d.email}</p>
                    <p className="mt-2 text-[10px] uppercase tracking-wider text-luxury-muted">
                      {formatDate(d.created_at)}
                    </p>
                  </div>
                  <div className="relative shrink-0">
                    <select
                      value={d.status}
                      disabled={updating === d.id}
                      onChange={(e) =>
                        updateStatus(d.id, e.target.value as DevisStatus)
                      }
                      className={`admin-status-select ${STATUS_COLORS[d.status]} bg-transparent`}
                    >
                      {(Object.keys(STATUS_LABELS) as DevisStatus[]).map((s) => (
                        <option key={s} value={s} className="bg-[#111]">
                          {STATUS_LABELS[s]}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={12}
                      className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 opacity-60"
                    />
                  </div>
                </div>

                {(d.company || d.phone) && (
                  <div className="mt-3 space-y-1 text-xs text-luxury-muted">
                    {d.company && <p>{d.company}</p>}
                    {d.phone && <p>{d.phone}</p>}
                  </div>
                )}

                <p className="mt-3 text-sm text-luxury-muted">
                  {SERVICE_LABELS[d.service] || d.service}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button onClick={() => setSelected(d)} className="admin-btn-view">
                    Voir
                  </button>
                  {hasPhone(d) ? (
                    <a
                      href={whatsappContactHref(d.phone!, buildWhatsAppMessage(d))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="admin-btn-whatsapp"
                    >
                      <WhatsAppIcon />
                      Contacter
                    </a>
                  ) : (
                    <span className="admin-btn cursor-default border-white/5 bg-transparent text-white/20">
                      Pas de numéro
                    </span>
                  )}
                  <button
                    onClick={() => deleteDevis(d.id)}
                    disabled={updating === d.id}
                    className="admin-btn-danger"
                  >
                    {updating === d.id ? (
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

          {/* Desktop table */}
          <div className="hidden overflow-x-auto border border-white/10 md:block">
            <table className="w-full min-w-[720px] text-left text-sm lg:min-w-[800px]">
            <thead className="border-b border-white/10 bg-[#111111] text-[10px] uppercase tracking-[0.2em] text-luxury-muted">
              <tr>
                <th className="px-4 py-4 font-normal">Date</th>
                <th className="px-4 py-4 font-normal">Nom</th>
                <th className="hidden px-4 py-4 font-normal lg:table-cell">Entreprise</th>
                <th className="px-4 py-4 font-normal">Service</th>
                <th className="px-4 py-4 font-normal">Statut</th>
                <th className="px-4 py-4 font-normal">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((d) => (
                <tr
                  key={d.id}
                  className="bg-[#0A0A0A] transition-colors hover:bg-[#111111]"
                >
                  <td className="whitespace-nowrap px-4 py-4 text-luxury-muted">
                    {formatDate(d.created_at)}
                  </td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => setSelected(d)}
                      className="font-medium text-white hover:text-brand-red"
                    >
                      {d.name}
                    </button>
                    <p className="text-xs text-luxury-muted">{d.email}</p>
                    {d.phone && (
                      <p className="text-xs text-luxury-muted">{d.phone}</p>
                    )}
                  </td>
                  <td className="hidden px-4 py-4 text-luxury-muted lg:table-cell">
                    {d.company || "—"}
                  </td>
                  <td className="px-4 py-4 text-luxury-muted">
                    {SERVICE_LABELS[d.service] || d.service}
                  </td>
                  <td className="px-4 py-4">
                    <div className="relative inline-block">
                      <select
                        value={d.status}
                        disabled={updating === d.id}
                        onChange={(e) =>
                          updateStatus(d.id, e.target.value as DevisStatus)
                        }
                        className={`admin-status-select ${STATUS_COLORS[d.status]} bg-transparent`}
                      >
                        {(
                          Object.keys(STATUS_LABELS) as DevisStatus[]
                        ).map((s) => (
                          <option key={s} value={s} className="bg-[#111]">
                            {STATUS_LABELS[s]}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={12}
                        className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 opacity-60"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => setSelected(d)}
                        className="admin-btn-view"
                      >
                        Voir
                      </button>
                      {hasPhone(d) ? (
                        <a
                          href={whatsappContactHref(d.phone!, buildWhatsAppMessage(d))}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="admin-btn-whatsapp"
                        >
                          <WhatsAppIcon />
                          Contacter
                        </a>
                      ) : (
                        <span className="admin-btn cursor-default border-white/5 bg-transparent text-white/20">
                          Pas de numéro
                        </span>
                      )}
                      <button
                        onClick={() => deleteDevis(d.id)}
                        disabled={updating === d.id}
                        className="admin-btn-danger"
                      >
                        {updating === d.id ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <Trash2 size={14} />
                        )}
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </>
      )}

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 sm:items-center sm:p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto overscroll-contain rounded-t-lg border border-white/10 bg-[#111111] p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:rounded-none sm:p-6 lg:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-display text-xl uppercase tracking-wide text-white">
                  {selected.name}
                </h2>
                <p className="mt-1 text-sm text-luxury-muted">
                  {formatDate(selected.created_at)}
                </p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="admin-btn-close"
                aria-label="Fermer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail size={16} className="shrink-0 text-brand-red" />
                <a
                  href={`mailto:${selected.email}`}
                  className="text-white hover:text-brand-red"
                >
                  {selected.email}
                </a>
              </div>
              {selected.phone && (
                <div className="flex items-center gap-3 text-sm">
                  <Phone size={16} className="shrink-0 text-brand-red" />
                  <a
                    href={`tel:${selected.phone}`}
                    className="text-white hover:text-brand-red"
                  >
                    {selected.phone}
                  </a>
                </div>
              )}

              <div className="flex flex-col gap-3 border-b border-white/10 pb-5 sm:flex-row sm:flex-wrap">
                {hasPhone(selected) ? (
                  <a
                    href={whatsappContactHref(selected.phone!, buildWhatsAppMessage(selected))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="admin-btn-modal-whatsapp"
                  >
                    <WhatsAppIcon />
                    Contacter sur WhatsApp
                  </a>
                ) : (
                  <p className="w-full rounded-sm border border-white/5 bg-white/[0.02] px-4 py-3 text-center text-xs text-luxury-muted">
                    Aucun numéro WhatsApp renseigné par le client.
                  </p>
                )}
                <a
                  href={`mailto:${selected.email}?subject=${encodeURIComponent(`Devis Akro Event - ${SERVICE_LABELS[selected.service] || selected.service}`)}`}
                  className="admin-btn-modal-email"
                >
                  <Mail size={14} />
                  Envoyer un email
                </a>
              </div>

              {selected.company && (
                <div className="flex items-center gap-3 text-sm">
                  <Building2 size={16} className="shrink-0 text-brand-red" />
                  <span className="text-luxury-muted">{selected.company}</span>
                </div>
              )}
              <div className="border-t border-white/10 pt-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-luxury-muted">
                  Service
                </p>
                <p className="mt-1 text-white">
                  {SERVICE_LABELS[selected.service] || selected.service}
                </p>
              </div>
              {selected.message && (
                <div className="border-t border-white/10 pt-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-luxury-muted">
                    Message
                  </p>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-luxury-muted">
                    {selected.message}
                  </p>
                </div>
              )}
              <div className="border-t border-white/10 pt-4">
                <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-luxury-muted">
                  Statut
                </p>
                <select
                  value={selected.status}
                  onChange={(e) =>
                    updateStatus(selected.id, e.target.value as DevisStatus)
                  }
                  className={`admin-status-select ${STATUS_COLORS[selected.status]} bg-transparent`}
                >
                  {(Object.keys(STATUS_LABELS) as DevisStatus[]).map((s) => (
                    <option key={s} value={s} className="bg-[#111]">
                      {STATUS_LABELS[s]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.884 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
