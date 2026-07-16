"use client";

import { useState } from "react";
import { Mail, Phone, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { ContactMessage } from "@/types/content";

const statuses: ContactMessage["status"][] = [
  "nouveau",
  "en_cours",
  "traite",
  "archive",
];

export default function MessagesAdmin({
  initialMessages,
}: {
  initialMessages: ContactMessage[];
}) {
  const [messages, setMessages] = useState(initialMessages);
  const [filter, setFilter] = useState<ContactMessage["status"] | "tous">("tous");

  const visible =
    filter === "tous" ? messages : messages.filter((m) => m.status === filter);

  const setStatus = async (id: string, status: ContactMessage["status"]) => {
    const supabase = createClient();
    await supabase
      .from("contact_messages")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id);
    setMessages((prev) =>
      prev.map((row) => (row.id === id ? { ...row, status } : row))
    );
  };

  const remove = async (id: string) => {
    if (!confirm("Supprimer ce message ?")) return;
    const supabase = createClient();
    await supabase.from("contact_messages").delete().eq("id", id);
    setMessages((prev) => prev.filter((row) => row.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {(["tous", ...statuses] as const).map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setFilter(status)}
            className={`rounded px-3 py-1.5 text-xs uppercase tracking-wide ${
              filter === status
                ? "bg-brand-red text-white"
                : "bg-white/5 text-white/60"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <ul className="space-y-3">
        {visible.map((msg) => (
          <li key={msg.id} className="brand-card space-y-3 p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-medium text-white">{msg.name}</p>
                <p className="text-sm text-white/60">{msg.subject || "Sans objet"}</p>
              </div>
              <select
                value={msg.status}
                onChange={(e) =>
                  setStatus(msg.id, e.target.value as ContactMessage["status"])
                }
                className="admin-input w-auto text-sm"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-sm text-white/80 whitespace-pre-wrap">{msg.message}</p>
            <div className="flex flex-wrap items-center gap-3 text-sm text-white/60">
              <a href={`mailto:${msg.email}`} className="inline-flex items-center gap-1 hover:text-white">
                <Mail size={14} /> {msg.email}
              </a>
              {msg.phone && (
                <a href={`tel:${msg.phone}`} className="inline-flex items-center gap-1 hover:text-white">
                  <Phone size={14} /> {msg.phone}
                </a>
              )}
              <span>{new Date(msg.created_at).toLocaleString("fr-FR")}</span>
              <button
                type="button"
                onClick={() => remove(msg.id)}
                className="ml-auto text-white/40 hover:text-red-400"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </li>
        ))}
        {visible.length === 0 && (
          <p className="text-sm text-luxury-muted">Aucun message.</p>
        )}
      </ul>
    </div>
  );
}
