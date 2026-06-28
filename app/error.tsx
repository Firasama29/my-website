"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="max-w-2xl mx-auto px-6 py-24 text-center">
      <p className="font-mono text-sm text-red-500 dark:text-red-400 mb-4 tracking-widest uppercase">
        error
      </p>
      <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4">
        Something went wrong
      </h1>
      <p className="text-slate-500 dark:text-slate-400 mb-10">
        An unexpected error occurred. You can try again or go back home.
      </p>
      <div className="flex gap-4 justify-center flex-wrap">
        <button
          onClick={reset}
          className="inline-flex items-center px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex items-center px-5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-medium hover:border-blue-400 hover:text-blue-600 transition-colors"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
