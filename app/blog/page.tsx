import { getAllPosts } from "@/lib/posts";
import BlogCard from "@/components/BlogCard";

export const metadata = {
  title: "Blog | Firas Ahmed",
  description: "Articles on Java, backend development, and software engineering.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-slate-800 mb-2">Blog</h1>
      <p className="text-slate-500 mb-10">
        Thoughts on Java, backend engineering, and software development.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard key={post.slug} {...post} />
        ))}
      </div>
    </div>
  );
}
