"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Lock, ArrowLeft, AlertCircle } from "lucide-react";
import Image from "next/image";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseKey) {
        setError("Configuration Supabase manquante (.env.local).");
        return;
      }

      const supabase = createClient();
      const loginPromise = supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      const timeoutPromise = new Promise<{ error: { message: string } }>((resolve) => {
        setTimeout(
          () =>
            resolve({
              error: {
                message:
                  "Délai dépassé. Vérifiez votre connexion et les clés Supabase dans .env.local.",
              },
            }),
          12000
        );
      });

      const { error: authError } = await Promise.race([loginPromise, timeoutPromise]);

      if (authError) {
        const msg = authError.message.toLowerCase();
        if (msg.includes("invalid") || msg.includes("credentials")) {
          setError("Email ou mot de passe incorrect.");
        } else if (msg.includes("délai") || msg.includes("timeout") || msg.includes("failed to fetch")) {
          setError(authError.message);
        } else {
          setError(authError.message || "Connexion impossible. Réessayez.");
        }
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError(
        "Impossible de joindre Supabase. Vérifiez NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-8 sm:py-12">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-[#0A0A0A]" />
      <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-brand-red/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 h-80 w-80 rounded-full bg-brand-gold/5 blur-[100px]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative w-full max-w-md">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] text-luxury-muted transition-colors hover:text-brand-gold"
        >
          <ArrowLeft size={14} />
          Retour au site
        </Link>

        <div className="relative overflow-hidden border border-white/10 bg-[#111111]/90 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.6)] backdrop-blur-md sm:p-8 lg:p-10">
          <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-brand-red/60 to-transparent" />
          <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />

          <div className="mb-8 flex flex-col items-center">
            <Image
              src="/Fichier 2 (1).png"
              alt="Akro Event"
              width={160}
              height={48}
              className="h-11 w-auto object-contain"
            />
            <div className="mt-6 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-sm border border-brand-red/30 bg-brand-red/10">
                <Lock size={14} className="text-brand-red" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold">
                Administration
              </span>
            </div>
            <h1 className="mt-4 font-display text-2xl uppercase tracking-wide text-white sm:text-3xl">
              Espace Admin
            </h1>
            <p className="mt-2 text-center text-sm text-luxury-muted">
              Connectez-vous pour gérer les devis, la galerie et les paramètres du site
            </p>
          </div>

          {error && (
            <div className="mb-6 flex items-center gap-3 border border-brand-red/30 bg-brand-red/10 px-4 py-3 text-sm text-brand-red">
              <AlertCircle size={16} className="shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-luxury-muted"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="admin-input"
                placeholder="admin@akroevent.com"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-luxury-muted"
              >
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="admin-input"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="admin-btn-primary mt-2 w-full"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Connexion...
                </>
              ) : (
                "Se connecter"
              )}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-[10px] uppercase tracking-[0.2em] text-white/20">
          Accès réservé · Akro Event
        </p>
      </div>
    </div>
  );
}
