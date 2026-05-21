import { getPostBySlug, getAllSlugs, getRelatedPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import RelatedPosts from "@/components/RelatedPosts";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Firas Ahmed`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const related = getRelatedPosts(slug, post.tags);

  const formatted = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <Link
        href="/blog"
        className="text-sm text-blue-600 hover:underline mb-8 inline-block"
      >
        ← Back to blog
      </Link>
      <header className="mb-10">
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-4xl font-bold text-slate-800 leading-tight mb-3">
          {post.title}
        </h1>
        <time className="text-sm text-slate-400">{formatted}</time>
      </header>
      <article
        className="prose prose-slate prose-lg max-w-none prose-headings:font-semibold prose-a:text-blue-600 prose-code:text-blue-700 prose-code:bg-slate-100 prose-code:px-1 prose-code:rounded"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
      <RelatedPosts posts={related} />
    </div>
  );
}
