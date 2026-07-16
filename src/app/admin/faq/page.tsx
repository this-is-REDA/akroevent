import { AdminPage } from "@/lib/admin-page";
import FaqAdmin from "@/components/admin/FaqAdmin";
import { getAdminFaqs } from "@/lib/faqs";

export default async function AdminFaqPage() {
  const items = await getAdminFaqs();
  return (
    <AdminPage
      title="FAQ"
      description="Gérez les questions/réponses affichées sur le site."
    >
      <FaqAdmin initialItems={items} />
    </AdminPage>
  );
}
