import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-lg font-semibold text-slate-800 hover:text-blue-600 transition-colors"
        >
          Firas Ahmed
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium text-slate-600">
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
        </div>
      </div>
    </nav>
  );
}
