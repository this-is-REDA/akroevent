import { AdminPage } from "@/lib/admin-page";
import IntegrationsForm from "@/components/admin/IntegrationsForm";
import { getSiteSettings } from "@/lib/settings";

export default async function AdminIntegrationsPage() {
  const settings = await getSiteSettings();
  return (
    <AdminPage
      title="Intégrations"
      description="Analytics Google et notifications email des devis."
    >
      <IntegrationsForm settings={settings} />
    </AdminPage>
  );
}
