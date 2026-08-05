import { describe, test, expect } from "vitest";
import fs from "fs";
import path from "path";
import {
  getAllPosts,
  getAllSlugs,
  getPostBySlug,
  getRelatedPosts,
  getAdjacentPosts,
} from "@/lib/posts";

// These tests read the real content/posts directory checked into the repo
// rather than mocking fs — the markdown fixtures are stable content, and this
// exercises the actual parsing/sorting/rendering logic end to end.
const postsDir = path.join(process.cwd(), "content/posts");
const fileCount = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md")).length;

describe("getAllPosts", () => {
  test("returns one entry per markdown file in content/posts", () => {
    expect(getAllPosts()).toHaveLength(fileCount);
  });

  test("sorts posts by date, newest first", () => {
    const posts = getAllPosts();
    for (let i = 0; i < posts.length - 1; i++) {
      expect(posts[i].date >= posts[i + 1].date).toBe(true);
    }
  });

  test("breaks ties between same-date posts deterministically by slug", () => {
    const byDate = new Map<string, string[]>();
    for (const post of getAllPosts()) {
      byDate.set(post.date, [...(byDate.get(post.date) ?? []), post.slug]);
    }
    for (const slugs of byDate.values()) {
      if (slugs.length > 1) {
        expect(slugs).toEqual([...slugs].sort((a, b) => a.localeCompare(b)));
      }
    }
  });

  test("computes a positive integer reading time for every post", () => {
    for (const post of getAllPosts()) {
      expect(Number.isInteger(post.readingTime)).toBe(true);
      expect(post.readingTime).toBeGreaterThan(0);
    }
  });

  test("derives the slug from the filename", () => {
    const post = getAllPosts().find((p) => p.slug === "guide-to-npe");
    expect(post).toBeDefined();
    expect(post?.title).toBe("Guide to NullPointerException in Java And How to Avoid it");
    expect(post?.tags).toEqual(["Java"]);
  });
});

describe("getAllSlugs", () => {
  test("returns exactly the slugs produced by getAllPosts (order-insensitive)", () => {
    const fromSlugs = [...getAllSlugs()].sort();
    const fromPosts = getAllPosts()
      .map((p) => p.slug)
      .sort();
    expect(fromSlugs).toEqual(fromPosts);
  });
});

describe("getPostBySlug", () => {
  test("returns null for a slug that doesn't exist", async () => {
    expect(await getPostBySlug("does-not-exist")).toBeNull();
  });

  test("renders markdown to HTML and assigns ids to headings", async () => {
    const post = await getPostBySlug("guide-to-npe");
    expect(post).not.toBeNull();
    expect(post?.contentHtml).toContain("<h2");
    expect(post?.headings.length).toBeGreaterThan(0);
    expect(post?.headings[0]).toMatchObject({ level: 2 });
    // every heading id must actually appear in the rendered HTML
    for (const heading of post?.headings ?? []) {
      expect(post?.contentHtml).toContain(`id="${heading.id}"`);
    }
  });
});

describe("getRelatedPosts", () => {
  test("only returns posts that share at least one tag, excludes itself, and caps at 3", () => {
    const related = getRelatedPosts("java-part-1-type-casting", ["Java"]);
    expect(related.length).toBeLessThanOrEqual(3);
    expect(related.length).toBeGreaterThan(0);
    for (const post of related) {
      expect(post.slug).not.toBe("java-part-1-type-casting");
      expect(post.tags).toContain("Java");
    }
  });

  test("returns an empty array when no other post shares a tag", () => {
    expect(getRelatedPosts("java-part-1-type-casting", ["ZZZ-nonexistent-tag"])).toEqual([]);
  });
});

describe("getAdjacentPosts", () => {
  test("returns null/null for a slug that doesn't exist", () => {
    expect(getAdjacentPosts("does-not-exist")).toEqual({ previous: null, next: null });
  });

  test("previous/next line up with position in the date-sorted list", () => {
    const posts = getAllPosts();
    const midIndex = Math.floor(posts.length / 2);
    const slug = posts[midIndex].slug;

    const { previous, next } = getAdjacentPosts(slug);

    expect(previous?.slug).toBe(posts[midIndex + 1]?.slug ?? null);
    expect(next?.slug).toBe(posts[midIndex - 1]?.slug ?? null);
  });

  test("the newest post has no next, and the oldest post has no previous", () => {
    const posts = getAllPosts();
    const newest = getAdjacentPosts(posts[0].slug);
    const oldest = getAdjacentPosts(posts[posts.length - 1].slug);

    expect(newest.next).toBeNull();
    expect(oldest.previous).toBeNull();
  });
});
