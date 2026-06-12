import { getAllPosts } from "@/lib/posts";
import BlogList from "@/components/BlogList";
import BlogPagination from "@/components/BlogPagination";

export const metadata = {
  title: "Blog | Firas Ahmed",
  description: "Articles on Java, backend development, and software engineering.",
};

const POSTS_PER_PAGE = 9;

export default async function BlogPage(props: PageProps<"/blog">) {
  const searchParams = await props.searchParams;
  const pageParam = Array.isArray(searchParams.page) ? searchParams.page[0] : searchParams.page;

  const posts = getAllPosts();
  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));

  const requestedPage = Number(pageParam);
  const currentPage =
    Number.isInteger(requestedPage) && requestedPage >= 1 && requestedPage <= totalPages
      ? requestedPage
      : 1;

  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = posts.slice(start, start + POSTS_PER_PAGE);
  const tags = [...new Set(paginatedPosts.flatMap((p) => p.tags))].sort();

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-2">Blog</h1>
      <p className="text-slate-500 dark:text-slate-400 mb-10">
        Thoughts on Java, backend engineering, and software development.
      </p>
      <BlogList posts={paginatedPosts} tags={tags} />
      <BlogPagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
