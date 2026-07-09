"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          company: data.get("company"),
          email: data.get("email"),
          phone: data.get("phone"),
          service: data.get("service"),
          message: data.get("message"),
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error || "Une erreur est survenue.");
        return;
      }

      setSuccess(true);
      form.reset();
    } catch {
      setError("Impossible d'envoyer la demande. Vérifiez votre connexion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-8 lg:p-10">
      <h3 className="font-display text-2xl uppercase tracking-wide text-white">
        Demande de Devis
      </h3>
      <p className="mt-2 text-sm text-luxury-muted">
        Remplissez le formulaire et nous vous recontacterons rapidement.
      </p>

      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 flex items-center gap-3 border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-400"
        >
          <CheckCircle size={18} />
          Demande envoyée avec succès ! Nous vous recontacterons bientôt.
        </motion.div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 flex items-center gap-3 border border-brand-red/30 bg-brand-red/10 p-4 text-sm text-brand-red"
        >
          <AlertCircle size={18} />
          {error}
        </motion.div>
      )}

      <div className="mt-10 space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-luxury-muted">
              Nom complet *
            </label>
            <input id="name" name="name" type="text" required placeholder="Votre nom" className="input-underline" />
          </div>
          <div>
            <label htmlFor="company" className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-luxury-muted">
              Entreprise
            </label>
            <input id="company" name="company" type="text" placeholder="Votre entreprise" className="input-underline" />
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="email" className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-luxury-muted">
              Email *
            </label>
            <input id="email" name="email" type="email" required placeholder="votre@email.com" className="input-underline" />
          </div>
          <div>
            <label htmlFor="phone" className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-luxury-muted">
              Téléphone
            </label>
            <input id="phone" name="phone" type="tel" placeholder="+212 6 XX XX XX XX" className="input-underline" />
          </div>
        </div>
        <div>
          <label htmlFor="service" className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-luxury-muted">
            Service souhaité *
          </label>
          <select id="service" name="service" required className="input-underline cursor-pointer" defaultValue="">
            <option value="" disabled className="bg-brand-card">Sélectionnez un service</option>
            <option value="team-building" className="bg-brand-card">Team Building Corporate</option>
            <option value="evenements" className="bg-brand-card">Événements Corporate</option>
            <option value="stands" className="bg-brand-card">Stands Personnalisés</option>
            <option value="gestion" className="bg-brand-card">Gestion Déléguée</option>
          </select>
        </div>
        <div>
          <label htmlFor="message" className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-luxury-muted">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Décrivez votre projet..."
            className="input-underline resize-none"
          />
        </div>
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
          className="btn-primary flex w-full items-center justify-center gap-2 disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Envoi en cours...
            </>
          ) : (
            "Envoyer la Demande"
          )}
        </motion.button>
      </div>
    </form>
  );
}
