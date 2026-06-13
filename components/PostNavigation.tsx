import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

interface PostNavigationProps {
  previous: PostMeta | null;
  next: PostMeta | null;
}

export default function PostNavigation({ previous, next }: PostNavigationProps) {
  if (!previous && !next) return null;

  return (
    <nav className="mt-16 pt-8 border-t border-slate-100 dark:border-slate-700 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {previous ? (
        <Link
          href={`/blog/${previous.slug}`}
          className="group flex flex-col rounded-xl border border-slate-100 dark:border-slate-700 p-4 hover:border-blue-100 dark:hover:border-blue-900/50 hover:shadow-md transition-all"
        >
          <span className="text-sm text-slate-400 dark:text-slate-500 mb-1">← Previous</span>
          <span className="font-semibold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
            {previous.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/blog/${next.slug}`}
          className="group flex flex-col rounded-xl border border-slate-100 dark:border-slate-700 p-4 text-right hover:border-blue-100 dark:hover:border-blue-900/50 hover:shadow-md transition-all sm:col-start-2"
        >
          <span className="text-sm text-slate-400 dark:text-slate-500 mb-1">Next →</span>
          <span className="font-semibold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
            {next.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
