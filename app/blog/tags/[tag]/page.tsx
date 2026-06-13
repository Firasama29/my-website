import { getAllPosts, getAllTags } from "@/lib/posts";
import { slugifyTag, getTagColorClasses } from "@/lib/tags";
import BlogCard from "@/components/BlogCard";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag: slugifyTag(tag) }));
}

export async function generateMetadata(props: PageProps<"/blog/tags/[tag]">) {
  const { tag } = await props.params;
  const matchedTag = getAllTags().find((t) => slugifyTag(t) === tag);
  if (!matchedTag) return {};

  return {
    title: `${matchedTag} | Blog | Firas Ahmed`,
    description: `Articles tagged "${matchedTag}" — Java, backend development, and software engineering.`,
  };
}

export default async function BlogTagPage(props: PageProps<"/blog/tags/[tag]">) {
  const { tag } = await props.params;
  const matchedTag = getAllTags().find((t) => slugifyTag(t) === tag);

  if (!matchedTag) notFound();

  const posts = getAllPosts().filter((p) => p.tags.includes(matchedTag));

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <Link href="/blog" className="text-sm text-blue-600 hover:underline mb-8 inline-block">
        ← Back to blog
      </Link>
      <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-2 flex items-center gap-3">
        Tag:
        <Badge className={cn(getTagColorClasses(matchedTag), "text-base px-3 py-1")}>
          {matchedTag}
        </Badge>
      </h1>
      <p className="text-slate-500 dark:text-slate-400 mb-10">
        {posts.length} {posts.length === 1 ? "post" : "posts"} tagged &ldquo;{matchedTag}&rdquo;
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard key={post.slug} {...post} />
        ))}
      </div>
    </div>
  );
}
