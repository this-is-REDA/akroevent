"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

type NavLink =
  | { href: string; label: string; type: "section" }
  | { href: string; label: string; type: "page" };

const navLinks: NavLink[] = [
  { href: "#accueil", label: "Accueil", type: "section" },
  { href: "#apropos", label: "À Propos", type: "section" },
  { href: "#services", label: "Services", type: "section" },
  { href: "/galerie", label: "Galerie", type: "page" },
  { href: "#references", label: "Références", type: "section" },
  { href: "#faq", label: "FAQ", type: "section" },
  { href: "#contact", label: "Contact", type: "section" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 60);

      if (currentScrollY <= 80) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY.current + 8) {
        setVisible(false);
      } else if (currentScrollY < lastScrollY.current - 8) {
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (pathname === "/") {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/${href}`);
    }
  };

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          visible ? "translate-y-0" : "-translate-y-full pointer-events-none"
        } ${
          scrolled
            ? "header-glass-light py-0"
            : "border-b border-black/5 bg-white backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 sm:py-5 md:grid md:grid-cols-[1fr_auto_1fr] md:justify-normal lg:px-12">
          <a
            href="#accueil"
            onClick={(e) => { e.preventDefault(); handleNavClick("#accueil"); }}
            className="group shrink-0 md:justify-self-start"
          >
            <Logo height={scrolled ? 42 : 48} priority />
          </a>

          <nav className="hidden items-center gap-5 md:flex md:gap-6 lg:gap-8">
            {navLinks.map((link) =>
              link.type === "page" ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link-light ${pathname === link.href ? "text-brand-red" : ""}`}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="nav-link-light"
                >
                  {link.label}
                </a>
              )
            )}
          </nav>

          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
            className={`hidden justify-self-end px-10 py-4 font-display text-lg uppercase tracking-[0.16em] transition-all duration-300 sm:px-12 sm:py-5 sm:text-xl md:inline-block ${
              scrolled
                ? "border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white hover:shadow-glow-red-sm"
                : "btn-primary !px-10 !py-4 sm:!px-12 sm:!py-5 !text-lg sm:!text-xl"
            }`}
          >
            Contact
          </a>

          <button
            type="button"
            className="-mr-1 flex h-9 w-9 shrink-0 items-center justify-center text-brand-dark md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] flex flex-col bg-brand-dark md:hidden"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <Logo height={32} />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Fermer le menu"
                className="flex h-10 w-10 items-center justify-center"
              >
                <X size={24} strokeWidth={1.5} className="text-white" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center overflow-y-auto px-6">
              {navLinks.map((link, i) =>
                link.type === "page" ? (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`block border-b border-white/[0.06] py-5 font-display text-3xl uppercase tracking-wide text-white transition-colors hover:text-brand-red sm:py-6 sm:text-4xl ${
                        pathname === link.href ? "text-brand-red" : ""
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ) : (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="border-b border-white/[0.06] py-5 font-display text-3xl uppercase tracking-wide text-white transition-colors hover:text-brand-red sm:py-6 sm:text-4xl"
                  >
                    {link.label}
                  </motion.a>
                )
              )}
            </nav>

            <div className="px-6 pb-10 pt-2 sm:px-8 sm:pb-12">
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
                className="btn-primary block py-4 text-center"
              >
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
