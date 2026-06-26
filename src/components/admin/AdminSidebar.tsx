"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { FileText, Settings, LogOut, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const links = [
  { href: "/admin", label: "Devis", icon: FileText },
  { href: "/admin/parametres", label: "Paramètres", icon: Settings },
];

interface AdminSidebarProps {
  email: string;
  open?: boolean;
  onClose?: () => void;
}

export default function AdminSidebar({ email, open = false, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  const handleNavClick = () => {
    onClose?.();
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-white/10 bg-[#111111] transition-transform duration-200 lg:static lg:translate-x-0 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
        <div>
          <Image
            src="/Fichier 2 (1).png"
            alt="Akro Event"
            width={120}
            height={36}
            className="h-8 w-auto object-contain"
          />
          <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-luxury-muted">
            Administration
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex h-9 w-9 items-center justify-center text-luxury-muted lg:hidden"
          aria-label="Fermer le menu"
        >
          <X size={20} strokeWidth={1.5} />
        </button>
      </div>

      <nav className="flex-1 px-3 py-6">
        <ul className="space-y-1">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={handleNavClick}
                  className={
                    active ? "admin-nav-link-active" : "admin-nav-link-inactive"
                  }
                >
                  <link.icon size={16} strokeWidth={1.5} />
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-white/10 px-5 py-5">
        <p className="mb-4 break-all text-xs text-luxury-muted">{email}</p>
        <button onClick={handleLogout} className="admin-btn-logout">
          <LogOut size={14} />
          Déconnexion
        </button>
      </div>
    </aside>
  );
}
