import { describe, test, expect } from "vitest";
import { cn, formatDate } from "@/lib/utils";

describe("cn", () => {
  test("merges class names, keeping the later Tailwind class when they conflict", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });

  test("drops falsy values", () => {
    expect(cn("a", false, null, undefined, "b")).toBe("a b");
  });

  test("supports conditional object syntax via clsx", () => {
    expect(cn("base", { active: true, hidden: false })).toBe("base active");
  });
});

describe("formatDate", () => {
  test("formats an ISO date string with a long month by default", () => {
    expect(formatDate("2024-03-18")).toBe("March 18, 2024");
  });

  test("formats with a short month when requested", () => {
    expect(formatDate("2024-03-18", "short")).toBe("Mar 18, 2024");
  });

  test("accepts a Date object", () => {
    expect(formatDate(new Date("2025-01-01"))).toBe("January 1, 2025");
  });
});
