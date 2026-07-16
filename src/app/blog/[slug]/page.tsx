import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPostBySlug, getPublishedPosts } from "@/lib/blog";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

type PageProps = { params: { slug: string } };

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: "Article introuvable" };
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    title: post.seo_title || `${post.title} | ${SITE_NAME}`,
    description: post.seo_description || post.excerpt,
    alternates: { canonical: url },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <>
      <Header />
      <main className="section-surface section-padding min-h-[70vh]">
        <article className="mx-auto max-w-3xl">
          <h1 className="font-display text-4xl uppercase tracking-wide text-white sm:text-5xl">
            {post.title}
          </h1>
          {post.published_at && (
            <p className="mt-4 text-sm text-luxury-muted">
              {new Date(post.published_at).toLocaleDateString("fr-FR")}
            </p>
          )}
          <div className="mt-10 whitespace-pre-wrap text-base leading-relaxed text-white/85">
            {post.content}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
