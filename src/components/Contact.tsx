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
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="section-label">Parlons de Votre Projet</span>
              <h2 className="heading-display-3d mt-6 font-display text-5xl uppercase leading-none tracking-wide sm:text-6xl lg:text-7xl">
                Contactez
                <br />
                Nous
              </h2>
              <div className="section-divider my-8 w-full max-w-sm" />
              <p className="max-w-md text-base font-light italic leading-relaxed text-luxury-muted">
                Votre événement sera une réussite assurée, pas qu&apos;une simple
                prestation ! Contactez notre équipe pour discuter de vos besoins
                et obtenir un devis personnalisé.
              </p>

              <div className="mt-12 space-y-8">
                {contactInfo.map((item, i) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group flex items-start gap-5 border-b border-white/[0.06] pb-8 transition-colors"
                  >
                    <item.icon size={18} strokeWidth={1} className="mt-1 shrink-0 text-brand-red" />
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-luxury-muted">
                        {item.label}
                      </p>
                      <p className="mt-1 break-words font-display text-lg uppercase tracking-wide text-white transition-colors group-hover:text-brand-red sm:text-xl">
                        {item.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>

              <div className="mt-10">
                <p className="mb-5 text-[10px] uppercase tracking-[0.2em] text-luxury-muted">
                  Suivez-nous
                </p>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex h-11 w-11 items-center justify-center border border-white/[0.08] text-luxury-muted transition-all duration-300 hover:border-brand-red hover:text-brand-red"
                    >
                      <social.icon size={18} strokeWidth={1.5} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="glow-border"
            >
              <ContactForm />
            </motion.div>
          </div>

          <motion.a
            href="https://maps.app.goo.gl/SKia674D4HQcW3DbA?g_st=ic"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group mt-20 flex items-center justify-center border border-white/[0.06] py-14 transition-colors hover:border-brand-red/30"
          >
            <div className="text-center">
              <MapPin className="mx-auto text-brand-red" size={24} strokeWidth={1} />
              <p className="mt-4 font-display text-2xl uppercase tracking-wide text-white transition-colors group-hover:text-brand-red">
                Maroc
              </p>
              <p className="mt-2 text-sm text-luxury-muted">
                Interventions sur l&apos;ensemble du territoire marocain
              </p>
            </div>
          </motion.a>
        </div>
      </section>
    </>
  );
}
