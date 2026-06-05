import Link from "next/link";
import MobileNav from "@/components/MobileNav";
import { ReactNode } from "react";

export default function Navbar({ themeToggle }: { themeToggle?: ReactNode }) {
  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-700 shadow-sm">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-lg font-semibold text-slate-800 dark:text-slate-100 hover:text-blue-600 transition-colors"
        >
          Firas Ahmed
        </Link>
        <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <Link href="/#about" className="hover:text-blue-600 transition-colors">
            About
          </Link>
          <Link href="/#skills" className="hover:text-blue-600 transition-colors">
            Skills
          </Link>
          <Link href="/blog" className="hover:text-blue-600 transition-colors">
            Blog
          </Link>
          <Link href="/#contact" className="hover:text-blue-600 transition-colors">
            Contact
          </Link>
          {themeToggle}
        </div>
        <div className="flex sm:hidden items-center gap-2">
          {themeToggle}
          <MobileNav />
        </div>
      </div>
    </nav>
  );
}
