import AdminShell from "@/components/admin/AdminShell";
import SeoSettingsForm from "@/components/admin/SeoSettingsForm";
import { getSiteSettings } from "@/lib/settings";

export default async function AdminSeoPage() {
  const settings = await getSiteSettings();

  return (
    <AdminShell>
      <main className="mx-auto w-full max-w-4xl px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
        <div className="mb-8 sm:mb-10">
          <h1 className="font-display text-2xl uppercase tracking-wide text-white sm:text-3xl lg:text-4xl">
            SEO &amp; GEO
          </h1>
          <p className="mt-2 text-sm text-luxury-muted">
            Gérez le référencement Google (SEO) et la visibilité auprès des
            moteurs d&apos;IA (GEO) : titres, descriptions, zone d&apos;intervention et
            fichier llms.txt.
          </p>
        </div>
        <SeoSettingsForm settings={settings} />
      </main>
    </AdminShell>
  );
}
