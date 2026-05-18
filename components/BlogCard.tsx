import Link from "next/link";

interface BlogCardProps {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
}

export default function BlogCard({
  slug,
  title,
  date,
  excerpt,
  tags,
}: BlogCardProps) {
  const formatted = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm hover:shadow-md hover:border-blue-100 transition-all flex flex-col gap-3">
      <div className="flex items-center gap-2 flex-wrap">
        {tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
      <Link href={`/blog/${slug}`}>
        <h2 className="text-lg font-semibold text-slate-800 hover:text-blue-600 transition-colors leading-snug">
          {title}
        </h2>
      </Link>
      <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
        {excerpt}
      </p>
      <div className="flex items-center justify-between mt-auto pt-2">
        <time className="text-xs text-slate-400">{formatted}</time>
        <Link
          href={`/blog/${slug}`}
          className="text-sm text-blue-600 font-medium hover:underline"
        >
          Read more →
        </Link>
      </div>
    </article>
  );
}
