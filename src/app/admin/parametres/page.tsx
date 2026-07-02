import { getSiteSettings } from "@/lib/settings";
import AdminShell from "@/components/admin/AdminShell";
import SettingsForm from "@/components/admin/SettingsForm";
import HeroVideoAdmin from "@/components/admin/HeroVideoAdmin";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <AdminShell>
      <main className="mx-auto w-full max-w-4xl px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
        <div className="mb-8 sm:mb-10">
          <h1 className="font-display text-2xl uppercase tracking-wide text-white sm:text-3xl lg:text-4xl">
            Paramètres du Site
          </h1>
          <p className="mt-2 text-sm text-luxury-muted">
            Modifiez la vidéo d&apos;accueil, le numéro WhatsApp, l&apos;email et les réseaux sociaux.
          </p>
        </div>
        <HeroVideoAdmin heroVideoVersion={settings.hero_video_version ?? ""} />
        <SettingsForm settings={settings} />
      </main>
    </AdminShell>
  );
}
