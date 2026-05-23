import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BlogCardProps {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  readingTime: number;
}

export default function BlogCard({
  slug,
  title,
  date,
  excerpt,
  tags,
  readingTime,
}: BlogCardProps) {
  const formatted = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card className="p-6 hover:shadow-md hover:border-blue-100 transition-all flex flex-col gap-3">
      <div className="flex items-center gap-2 flex-wrap">
        {tags.slice(0, 3).map((tag) => (
          <Badge key={tag}>{tag}</Badge>
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
        <time className="text-xs text-slate-400">
          {formatted} · {readingTime} min read
        </time>
        <Link
          href={`/blog/${slug}`}
          className="text-sm text-blue-600 font-medium hover:underline"
        >
          Read more →
        </Link>
      </div>
    </Card>
  );
}
