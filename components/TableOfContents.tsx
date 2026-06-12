import type { Heading } from "@/lib/posts";

interface TableOfContentsProps {
  headings: Heading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  return (
    <ul className="space-y-2 text-sm">
      {headings.map((heading) => (
        <li key={heading.id} className={heading.level === 3 ? "pl-4" : ""}>
          <a
            href={`#${heading.id}`}
            className="text-slate-500 dark:text-slate-400 hover:text-blue-600 transition-colors"
          >
            {heading.text}
          </a>
        </li>
      ))}
    </ul>
  );
}
