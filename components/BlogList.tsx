import Link from "next/link";
import BlogCard from "@/components/BlogCard";
import { slugifyTag, getTagColorClasses } from "@/lib/tags";
import { cn } from "@/lib/utils";
import type { PostMeta } from "@/lib/posts";

interface BlogListProps {
  posts: PostMeta[];
  tags: string[];
  tagCounts: Record<string, number>;
}

export default function BlogList({ posts, tags, tagCounts }: BlogListProps) {
  return (
    <>
      <div className="flex flex-wrap gap-2 mb-10">
        {tags.map((tag) => (
          <Link
            key={tag}
            href={`/blog/tags/${slugifyTag(tag)}`}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition hover:brightness-95 dark:hover:brightness-110",
              getTagColorClasses(tag)
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
