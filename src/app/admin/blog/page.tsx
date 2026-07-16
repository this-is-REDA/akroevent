import { AdminPage } from "@/lib/admin-page";
import BlogAdmin from "@/components/admin/BlogAdmin";
import { getAdminPosts } from "@/lib/blog";

export default async function AdminBlogPage() {
  const posts = await getAdminPosts();
  return (
    <AdminPage
      title="Blog"
      description="Rédigez et publiez des articles pour le SEO."
    >
      <BlogAdmin initialPosts={posts} />
    </AdminPage>
  );
}
