import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPublishedPosts } from "@/lib/blog";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: `Blog | ${SITE_NAME}`,
  description: "Actualités et conseils événementiels par Akro Event.",
  alternates: { canonical: `${SITE_URL}/blog` },
};

export default async function BlogIndexPage() {
  const posts = await getPublishedPosts();

  return (
    <>
      <Header />
      <main className="section-surface section-padding min-h-[70vh]">
        <div className="mx-auto max-w-4xl">
          <h1 className="font-display text-5xl uppercase tracking-wide text-white">
            Blog
          </h1>
          <p className="mt-4 text-white/70">
            Actualités, idées et retours d&apos;expérience Akro Event.
          </p>

          <ul className="mt-12 space-y-6">
            {posts.map((post) => (
              <li key={post.id} className="border-b border-white/10 pb-6">
                <Link href={`/blog/${post.slug}`} className="group block">
                  <h2 className="font-display text-2xl uppercase tracking-wide text-white group-hover:text-brand-red">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="mt-2 text-sm text-white/70">{post.excerpt}</p>
                  )}
                  {post.published_at && (
                    <p className="mt-2 text-xs text-luxury-muted">
                      {new Date(post.published_at).toLocaleDateString("fr-FR")}
                    </p>
                  )}
                </Link>
              </li>
            ))}
            {posts.length === 0 && (
              <p className="text-sm text-luxury-muted">
                Aucun article publié pour le moment.
              </p>
            )}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
