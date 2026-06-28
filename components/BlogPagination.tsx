import Link from "next/link";

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  activeTag?: string;
}

const linkClasses =
  "px-4 py-1.5 text-sm rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-blue-400 hover:text-blue-600 transition-colors";
const activeClasses = "px-4 py-1.5 text-sm rounded-lg bg-blue-600 text-white";
const disabledClasses =
  "px-4 py-1.5 text-sm rounded-lg border border-slate-100 dark:border-slate-800 text-slate-300 dark:text-slate-600 cursor-not-allowed";

export default function BlogPagination({ currentPage, totalPages, activeTag }: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  const pageHref = (page: number) => {
    const params = new URLSearchParams();
    if (activeTag) params.set("tag", activeTag);
    if (page > 1) params.set("page", String(page));
    const qs = params.toString();
    return qs ? `/blog?${qs}` : "/blog";
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Blog pagination" className="flex items-center justify-center gap-2 mt-12">
      {currentPage > 1 ? (
        <Link href={pageHref(currentPage - 1)} className={linkClasses}>
          Previous
        </Link>
      ) : (
        <span aria-disabled="true" className={disabledClasses}>
          Previous
        </span>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          href={pageHref(page)}
          aria-current={page === currentPage ? "page" : undefined}
          className={page === currentPage ? activeClasses : linkClasses}
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages ? (
        <Link href={pageHref(currentPage + 1)} className={linkClasses}>
          Next
        </Link>
      ) : (
        <span aria-disabled="true" className={disabledClasses}>
          Next
        </span>
      )}
    </nav>
  );
}
