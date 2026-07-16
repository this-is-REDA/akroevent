"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/types/content";

export default function UsersAdmin({
  initialProfiles,
  currentUserId,
}: {
  initialProfiles: Profile[];
  currentUserId: string;
}) {
  const [profiles, setProfiles] = useState(initialProfiles);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const ensureSelf = async () => {
    setError("");
    setMessage("");
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    const { data, error: err } = await supabase
      .from("profiles")
      .upsert({
        id: user.id,
        email: user.email ?? "",
        role: "admin",
        updated_at: new Date().toISOString(),
      })
      .select("*")
      .single();
    if (err || !data) {
      setError("Impossible de créer le profil. Exécutez admin_modules.sql.");
      return;
    }
    setProfiles((prev) => {
      const others = prev.filter((p) => p.id !== data.id);
      return [...others, data as Profile];
    });
    setMessage("Profil admin synchronisé.");
  };

  const setRole = async (id: string, role: Profile["role"]) => {
    const supabase = createClient();
    const { error: err } = await supabase
      .from("profiles")
      .update({ role, updated_at: new Date().toISOString() })
      .eq("id", id);
    if (err) {
      setError("Mise à jour du rôle impossible.");
      return;
    }
    setProfiles((prev) =>
      prev.map((row) => (row.id === id ? { ...row, role } : row))
    );
  };

  return (
    <div className="space-y-6">
      <div className="brand-card space-y-3 p-6">
        <p className="text-sm text-white/70">
          Les rôles <strong className="text-white">admin</strong> et{" "}
          <strong className="text-white">editor</strong> permettent de distinguer
          les accès. Synchronisez d&apos;abord votre compte.
        </p>
        <button
          type="button"
          onClick={ensureSelf}
          className="rounded bg-brand-red px-4 py-2.5 text-sm text-white"
        >
          Synchroniser mon profil (admin)
        </button>
        {error && <p className="text-sm text-red-300">{error}</p>}
        {message && <p className="text-sm text-emerald-300">{message}</p>}
      </div>

      <ul className="space-y-2">
        {profiles.map((profile) => (
          <li key={profile.id} className="brand-card flex items-center gap-3 p-4">
            <div className="flex-1">
              <p className="text-white">{profile.email || profile.id}</p>
              {profile.id === currentUserId && (
                <p className="text-xs text-luxury-muted">Vous</p>
              )}
            </div>
            <select
              value={profile.role}
              onChange={(e) => setRole(profile.id, e.target.value as Profile["role"])}
              className="admin-input w-auto"
            >
              <option value="admin">admin</option>
              <option value="editor">editor</option>
            </select>
          </li>
        ))}
        {profiles.length === 0 && (
          <p className="text-sm text-luxury-muted">Aucun profil enregistré.</p>
        )}
      </ul>
    </div>
  );
}
