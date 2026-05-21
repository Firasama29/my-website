import BlogCard from "@/components/BlogCard";
import type { PostMeta } from "@/lib/posts";

interface RelatedPostsProps {
  posts: PostMeta[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-slate-100">
      <h2 className="text-2xl font-bold text-slate-800 mb-8">
        You might also like
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard key={post.slug} {...post} />
        ))}
      </div>
    </section>
  );
}
