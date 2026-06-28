import Link from "next/link";

export const metadata = {
  title: "404 — Page Not Found | Firas Ahmed",
};

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-24 text-center">
      <p className="font-mono text-sm text-blue-600 dark:text-blue-400 mb-4 tracking-widest uppercase">
        404
      </p>
      <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4">
        Page not found
      </h1>
      <p className="text-slate-500 dark:text-slate-400 mb-10">
        This page doesn&apos;t exist or may have moved.
      </p>
      <div className="flex gap-4 justify-center flex-wrap">
        <Link
          href="/"
          className="inline-flex items-center px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Go home
        </Link>
        <Link
          href="/blog"
          className="inline-flex items-center px-5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-medium hover:border-blue-400 hover:text-blue-600 transition-colors"
        >
          Browse blog
        </Link>
      </div>
    </div>
  );
}
