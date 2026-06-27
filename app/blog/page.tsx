import { getAllPosts } from "@/lib/posts";
import { getAllTags, findTagBySlug } from "@/lib/tags";
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
  const tagParam  = Array.isArray(searchParams.tag)  ? searchParams.tag[0]  : searchParams.tag;

  const allPosts = getAllPosts();
  const matchedTag = tagParam ? findTagBySlug(tagParam) : undefined;
  const filteredPosts = matchedTag
    ? allPosts.filter((p) => p.tags.includes(matchedTag))
    : allPosts;

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));

  const requestedPage = Number(pageParam);
  const currentPage =
    Number.isInteger(requestedPage) && requestedPage >= 1 && requestedPage <= totalPages
      ? requestedPage
      : 1;

  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(start, start + POSTS_PER_PAGE);

  const tags = getAllTags();
  const tagCounts = Object.fromEntries(
    tags.map((tag) => [tag, allPosts.filter((p) => p.tags.includes(tag)).length])
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-2">Blog</h1>
      <p className="text-slate-500 dark:text-slate-400 mb-10">
        Thoughts on Java, backend engineering, and software development.
      </p>
      <BlogList posts={paginatedPosts} tags={tags} tagCounts={tagCounts} activeTag={tagParam} />
      <BlogPagination currentPage={currentPage} totalPages={totalPages} activeTag={tagParam} />
    </div>
  );
}
