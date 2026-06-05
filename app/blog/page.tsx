import { getAllPosts } from "@/lib/posts";
import BlogList from "@/components/BlogList";

export const metadata = {
  title: "Blog | Firas Ahmed",
  description: "Articles on Java, backend development, and software engineering.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = [...new Set(posts.flatMap((p) => p.tags))].sort();

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-2">Blog</h1>
      <p className="text-slate-500 dark:text-slate-400 mb-10">
        Thoughts on Java, backend engineering, and software development.
      </p>
      <BlogList posts={posts} tags={tags} />
    </div>
  );
}
