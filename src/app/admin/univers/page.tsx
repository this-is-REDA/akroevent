import { AdminPage } from "@/lib/admin-page";
import UniversAdmin from "@/components/admin/UniversAdmin";
import { getAdminUnivers } from "@/lib/univers-db";

export default async function AdminUniversPage() {
  const items = await getAdminUnivers();
  return (
    <AdminPage
      title="Univers"
      description="Éditez les pages expériences /univers."
    >
      <UniversAdmin initialItems={items} />
    </AdminPage>
  );
}
