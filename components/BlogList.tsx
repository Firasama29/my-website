"use client";

import { useState } from "react";
import BlogCard from "@/components/BlogCard";
import type { PostMeta } from "@/lib/posts";

interface BlogListProps {
  posts: PostMeta[];
  tags: string[];
}

export default function BlogList({ posts, tags }: BlogListProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filtered = selectedTag
    ? posts.filter((p) => p.tags.includes(selectedTag))
    : posts;

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setSelectedTag(null)}
          className={`text-sm px-4 py-1.5 rounded-full font-medium transition-colors ${
            selectedTag === null
              ? "bg-blue-600 text-white"
              : "bg-white border border-slate-200 text-slate-600 hover:border-blue-400 hover:text-blue-600"
          }`}
        >
          All
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
            className={`text-sm px-4 py-1.5 rounded-full font-medium transition-colors ${
              selectedTag === tag
                ? "bg-blue-600 text-white"
                : "bg-white border border-slate-200 text-slate-600 hover:border-blue-400 hover:text-blue-600"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((post) => (
          <BlogCard key={post.slug} {...post} />
        ))}
      </div>
    </>
  );
}
