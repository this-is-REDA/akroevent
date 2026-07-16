import { AdminPage } from "@/lib/admin-page";
import RedirectsAdmin from "@/components/admin/RedirectsAdmin";
import { createClient } from "@/lib/supabase/server";
import type { Redirect } from "@/types/content";

export default async function AdminRedirectsPage() {
  let items: Redirect[] = [];
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("redirects")
      .select("*")
      .order("created_at", { ascending: false });
    items = (data as Redirect[]) ?? [];
  } catch {
    items = [];
  }

  return (
    <AdminPage
      title="Redirections"
      description="Gérez les redirections 301/302 et anciennes URLs."
    >
      <RedirectsAdmin initialItems={items} />
    </AdminPage>
  );
}
