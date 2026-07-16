import { AdminPage } from "@/lib/admin-page";
import TestimonialsAdmin from "@/components/admin/TestimonialsAdmin";
import { getAdminTestimonials } from "@/lib/testimonials";

export default async function AdminTestimonialsPage() {
  const items = await getAdminTestimonials();
  return (
    <AdminPage
      title="Témoignages"
      description="Citations clients affichées sur la page d’accueil."
    >
      <TestimonialsAdmin initialItems={items} />
    </AdminPage>
  );
}
