import { createClient } from "@/lib/supabase/server";
import AdminShell from "@/components/admin/AdminShell";
import DevisTable from "@/components/admin/DevisTable";
import type { Devis } from "@/types/devis";

export default async function AdminDashboardPage() {
  const supabase = createClient();

  const { data: devis, error } = await supabase
    .from("devis")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erreur chargement devis:", error);
  }

  const nouveauCount =
    devis?.filter((d: Devis) => d.status === "nouveau").length ?? 0;

  return (
    <AdminShell>
      <main className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
        <div className="mb-8 sm:mb-10">
          <h1 className="font-display text-2xl uppercase tracking-wide text-white sm:text-3xl lg:text-4xl">
            Demandes de Devis
          </h1>
          <p className="mt-2 text-sm text-luxury-muted">
            {devis?.length ?? 0} demande{(devis?.length ?? 0) !== 1 ? "s" : ""}{" "}
            au total
            {nouveauCount > 0 && (
              <span className="ml-2 text-brand-red">
                · {nouveauCount} nouvelle{nouveauCount > 1 ? "s" : ""}
              </span>
            )}
          </p>
        </div>
        <DevisTable devis={(devis as Devis[]) ?? []} />
      </main>
    </AdminShell>
  );
}
