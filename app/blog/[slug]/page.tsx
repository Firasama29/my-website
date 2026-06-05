import { getPostBySlug, getAllSlugs, getRelatedPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import RelatedPosts from "@/components/RelatedPosts";
import { Badge } from "@/components/ui/badge";

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
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100 leading-tight mb-3">
          {post.title}
        </h1>
        <time className="text-sm text-slate-400 dark:text-slate-500">{formatted}</time>
      </header>
      <article
        className="prose prose-slate prose-lg max-w-none prose-headings:font-semibold prose-a:text-blue-600 prose-code:text-blue-700 dark:prose-code:text-blue-400 prose-code:bg-slate-100 dark:prose-code:bg-slate-800 prose-code:px-1 prose-code:rounded dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
      <RelatedPosts posts={related} />
    </div>
  );
}
