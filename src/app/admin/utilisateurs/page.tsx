import { AdminPage } from "@/lib/admin-page";
import UsersAdmin from "@/components/admin/UsersAdmin";
import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/types/content";

export default async function AdminUsersPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profiles: Profile[] = [];
  try {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: true });
    profiles = (data as Profile[]) ?? [];
  } catch {
    profiles = [];
  }

  return (
    <AdminPage
      title="Utilisateurs"
      description="Rôles admin / editor pour les comptes connectés."
    >
      <UsersAdmin
        initialProfiles={profiles}
        currentUserId={user?.id ?? ""}
      />
    </AdminPage>
  );
}
