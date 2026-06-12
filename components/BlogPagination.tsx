import Link from "next/link";

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
}

const linkClasses =
  "px-4 py-1.5 text-sm rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-blue-400 hover:text-blue-600 transition-colors";
const activeClasses = "px-4 py-1.5 text-sm rounded-lg bg-blue-600 text-white";
const disabledClasses =
  "px-4 py-1.5 text-sm rounded-lg border border-slate-100 dark:border-slate-800 text-slate-300 dark:text-slate-600 cursor-not-allowed";

export default function BlogPagination({ currentPage, totalPages }: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  const pageHref = (page: number) => (page === 1 ? "/blog" : `/blog?page=${page}`);
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
