import AdminShell from "@/components/admin/AdminShell";
import ClientsAdmin from "@/components/admin/ClientsAdmin";
import { getAdminClientLogos } from "@/lib/client-logos";

export default async function AdminReferencesPage() {
  const { logos, seeded, tableMissing } = await getAdminClientLogos();

  return (
    <AdminShell>
      <main className="mx-auto w-full max-w-5xl px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
        <div className="mb-8 sm:mb-10">
          <h1 className="font-display text-2xl uppercase tracking-wide text-white sm:text-3xl lg:text-4xl">
            Références
          </h1>
          <p className="mt-2 text-sm text-luxury-muted">
            Voici les logos affichés sur le site. Remplacez-en un, ajoutez-en ou
            supprimez ceux que vous ne voulez plus.
          </p>
        </div>
        <ClientsAdmin
          initialLogos={logos}
          seeded={seeded}
          tableMissing={tableMissing}
        />
      </main>
    </AdminShell>
  );
}
