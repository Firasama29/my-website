"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#stack", label: "My Stack" },
  { href: "/#projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
];

export default function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger className="sm:hidden p-2 text-slate-600 hover:text-blue-600 transition-colors rounded-md">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Open menu</span>
      </SheetTrigger>
      <SheetContent>
        <SheetTitle className="sr-only">Navigation menu</SheetTitle>
        <SheetDescription className="sr-only">
          Links to sections of the site: About, My Stack, Projects, Blog, and Contact.
        </SheetDescription>
        <nav aria-label="Mobile navigation" className="flex flex-col gap-1 px-6 pt-14">
          {navLinks.map(({ href, label }) => (
            <SheetClose key={href} asChild>
              <Link
                href={href}
                className="text-base font-medium text-slate-700 hover:text-blue-600 py-3 border-b border-slate-100 last:border-0 transition-colors"
              >
                {label}
              </Link>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
