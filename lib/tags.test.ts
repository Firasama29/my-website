import { describe, test, expect } from "vitest";
import { slugifyTag, getTagColorClasses, getAllTags, findTagBySlug } from "@/lib/tags";

describe("slugifyTag", () => {
  test("lowercases and replaces whitespace runs with a hyphen", () => {
    expect(slugifyTag("Design Patterns")).toBe("design-patterns");
  });

  test("collapses multiple spaces into a single hyphen", () => {
    expect(slugifyTag("Self   Improvement")).toBe("self-improvement");
  });

  test("leaves single-word tags lowercased with no hyphen", () => {
    expect(slugifyTag("Java")).toBe("java");
  });
});

describe("getTagColorClasses", () => {
  test("returns the java category classes for a known java tag", () => {
    expect(getTagColorClasses("Java")).toContain("text-blue-600");
  });

  test("returns the ai category classes for a known ai tag", () => {
    expect(getTagColorClasses("Claude")).toContain("text-violet-600");
  });

  test("falls back to the default classes for an unrecognized tag", () => {
    expect(getTagColorClasses("SomeUnknownTag")).toBe(
      "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
    );
  });
});

// getAllTags/findTagBySlug read real markdown files from content/posts via
// lib/posts.ts. That directory is checked into the repo, so these run against
// real fixtures rather than mocks.
describe("getAllTags", () => {
  test("returns a sorted, de-duplicated list of tags used across all posts", () => {
    const tags = getAllTags();
    expect(tags.length).toBeGreaterThan(0);
    expect(new Set(tags).size).toBe(tags.length);
    expect([...tags].sort()).toEqual(tags);
    expect(tags).toContain("Java");
  });
});

describe("findTagBySlug", () => {
  test("finds the original-cased tag for a known slug", () => {
    expect(findTagBySlug("java")).toBe("Java");
  });

  test("returns undefined for a slug with no matching tag", () => {
    expect(findTagBySlug("not-a-real-tag")).toBeUndefined();
  });
});
