"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";
import SectionDivider from "./SectionDivider";
import AmbientOrbs from "./AmbientOrbs";
import ContactForm from "./ContactForm";
import { phoneToTelHref } from "@/lib/settings-utils";
import type { SiteSettingsPublic } from "@/types/settings";

interface ContactProps {
  settings: SiteSettingsPublic;
}

export default function Contact({ settings }: ContactProps) {
  const contactInfo = [
    {
      icon: Phone,
      label: "Téléphone",
      value: settings.phone_display,
      href: phoneToTelHref(settings.phone_display),
    },
    {
      icon: Mail,
      label: "Email",
      value: settings.email,
      href: `mailto:${settings.email}`,
    },
  ];

  const socialLinks = [
    { icon: Facebook, label: "Facebook", href: settings.facebook_url },
    { icon: Instagram, label: "Instagram", href: settings.instagram_url },
    { icon: Linkedin, label: "LinkedIn", href: settings.linkedin_url },
  ];

  return (
    <>
      <SectionDivider />
      <section id="contact" className="section-surface section-padding overflow-hidden">
        <AmbientOrbs variant="contact" />
        <div className="relative mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 max-w-2xl"
          >
            <span className="section-label">Parlons de Votre Projet</span>
            <h2 className="heading-display-3d mt-4 font-display text-4xl uppercase leading-none tracking-wide sm:text-5xl">
              Demander un devis
            </h2>
            <div className="section-divider my-5 w-full max-w-sm" />
            <p className="max-w-xl text-sm font-light italic leading-relaxed text-luxury-muted sm:text-base">
              Remplissez le formulaire ou contactez-nous directement — nous vous
              répondons rapidement avec une proposition personnalisée.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glow-border overflow-hidden"
          >
            <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
              <div className="border-b border-white/[0.08] bg-brand-secondary/60 p-5 sm:p-6 lg:border-b-0 lg:border-r lg:border-white/[0.08]">
                <p className="text-[10px] uppercase tracking-[0.2em] text-luxury-muted">
                  Coordonnées
                </p>
                <div className="mt-4 space-y-4">
                  {contactInfo.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="group flex items-start gap-3 transition-colors"
                    >
                      <item.icon
                        size={16}
                        strokeWidth={1.25}
                        className="mt-0.5 shrink-0 text-brand-red"
                      />
                      <div className="min-w-0">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-luxury-muted">
                          {item.label}
                        </p>
                        <p className="mt-0.5 break-words text-sm text-white transition-colors group-hover:text-brand-red sm:text-base">
                          {item.value}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>

                <div className="mt-6 border-t border-white/[0.08] pt-5">
                  <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-luxury-muted">
                    Suivez-nous
                  </p>
                  <div className="flex gap-2">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="flex h-9 w-9 items-center justify-center border border-white/[0.08] text-luxury-muted transition-all duration-300 hover:border-brand-red hover:text-brand-red"
                      >
                        <social.icon size={16} strokeWidth={1.5} />
                      </a>
                    ))}
                  </div>
                </div>

                <a
                  href="https://maps.app.goo.gl/SKia674D4HQcW3DbA?g_st=ic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex items-start gap-3 border-t border-white/[0.08] pt-5 transition-colors hover:text-brand-red"
                >
                  <MapPin
                    size={16}
                    strokeWidth={1.25}
                    className="mt-0.5 shrink-0 text-brand-red"
                  />
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-luxury-muted">
                      Zone d&apos;intervention
                    </p>
                    <p className="mt-0.5 text-sm text-white">Maroc — tout le Royaume</p>
                  </div>
                </a>
              </div>

              <div className="p-0">
                <ContactForm compact />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
