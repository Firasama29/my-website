"use client";

import { useState } from "react";
import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import type { PostMeta } from "@/lib/posts";

interface BlogListProps {
  posts: PostMeta[];
  tags: string[];
}

export default function BlogList({ posts, tags }: BlogListProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const tagCounts = Object.fromEntries(
    tags.map((tag) => [tag, posts.filter((p) => p.tags.includes(tag)).length])
  );

  const filtered = selectedTag
    ? posts.filter((p) => p.tags.includes(selectedTag))
    : posts;

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-10">
        <Button
          onClick={() => setSelectedTag(null)}
          variant={selectedTag === null ? "default" : "secondary"}
          size="sm"
          className="rounded-full"
        >
          All
        </Button>
        {tags.map((tag) => (
          <Button
            key={tag}
            onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
            variant={selectedTag === tag ? "default" : "secondary"}
            size="sm"
            className="rounded-full"
          >
            {tag} ({tagCounts[tag]})
          </Button>
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
