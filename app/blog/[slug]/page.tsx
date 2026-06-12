import { getPostBySlug, getAllSlugs, getRelatedPosts, getAdjacentPosts } from "@/lib/posts";
import { slugifyTag } from "@/lib/tags";
import { notFound } from "next/navigation";
import Link from "next/link";
import RelatedPosts from "@/components/RelatedPosts";
import TableOfContents from "@/components/TableOfContents";
import CodeBlock from "@/components/CodeBlock";
import PostNavigation from "@/components/PostNavigation";
import { Badge } from "@/components/ui/badge";

const MIN_HEADINGS_FOR_TOC = 3;

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
  const { previous, next } = getAdjacentPosts(slug);
  const showToc = post.headings.length >= MIN_HEADINGS_FOR_TOC;

  const formatted = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <Link
        href="/blog"
        className="text-sm text-blue-600 hover:underline mb-8 inline-block"
      >
        ← Back to blog
      </Link>
      <div className="lg:grid lg:grid-cols-[1fr_240px] lg:gap-12 lg:items-start">
        <div className="max-w-3xl">
          <header className="mb-10">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <Link key={tag} href={`/blog/tags/${slugifyTag(tag)}`}>
                  <Badge className="hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>
            <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100 leading-tight mb-3">
              {post.title}
            </h1>
            <time className="text-sm text-slate-400 dark:text-slate-500">{formatted}</time>
          </header>
          {showToc && (
            <details className="lg:hidden mb-8 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
              <summary className="cursor-pointer font-semibold text-sm text-slate-800 dark:text-slate-100">
                Table of Contents
              </summary>
              <div className="mt-3">
                <TableOfContents headings={post.headings} />
              </div>
            </details>
          )}
          <CodeBlock
            html={post.contentHtml}
            className="prose prose-slate prose-lg max-w-none prose-headings:font-semibold prose-headings:scroll-mt-24 prose-a:text-blue-600 prose-code:text-blue-700 dark:prose-code:text-blue-400 prose-code:bg-slate-100 dark:prose-code:bg-slate-800 prose-code:px-1 prose-code:rounded dark:prose-invert"
          />
          <PostNavigation previous={previous} next={next} />
          <RelatedPosts posts={related} />
        </div>
        {showToc && (
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="font-semibold text-sm uppercase tracking-wide text-slate-800 dark:text-slate-100 mb-3">
                On this page
              </p>
              <TableOfContents headings={post.headings} />
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
