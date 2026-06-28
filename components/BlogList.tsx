import Link from "next/link";
import BlogCard from "@/components/BlogCard";
import { slugifyTag, getTagColorClasses } from "@/lib/tags";
import { cn } from "@/lib/utils";
import type { PostMeta } from "@/lib/posts";

interface BlogListProps {
  posts: PostMeta[];
  tags: string[];
  tagCounts: Record<string, number>;
  activeTag?: string;
}

const tagBtnBase =
  "rounded-full px-4 py-1.5 text-sm font-medium transition hover:brightness-95 dark:hover:brightness-110";
const tagBtnActive = "ring-2 ring-current ring-offset-1";

export default function BlogList({ posts, tags, tagCounts, activeTag }: BlogListProps) {
  return (
    <>
      <div className="flex flex-wrap gap-2 mb-10">
        <Link
          href="/blog"
          className={cn(
            tagBtnBase,
            "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300",
            !activeTag && tagBtnActive
          )}
        >
          All
        </Link>
        {tags.map((tag) => (
          <Link
            key={tag}
            href={`/blog?tag=${slugifyTag(tag)}`}
            className={cn(
              tagBtnBase,
              getTagColorClasses(tag),
              activeTag === slugifyTag(tag) && tagBtnActive
            )}
          >
            {tag} ({tagCounts[tag]})
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard key={post.slug} {...post} />
        ))}
      </div>
    </>
  );
}
