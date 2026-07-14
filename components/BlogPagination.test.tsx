import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import BlogPagination from "@/components/BlogPagination";

// BlogPagination has no "use client" directive, but it also uses no hooks,
// no server-only APIs (fs/async data fetching), and no next/navigation
// context — it is a plain function that maps props to <Link>s. That makes it
// safe to render directly in jsdom, and the pagination math (prev/next
// disabled state, active page, query string construction) lives inline in
// this component rather than in an extracted pure function, so rendering it
// is the only way to exercise that logic.
describe("BlogPagination", () => {
  test("renders nothing when there is only one page", () => {
    const { container } = render(<BlogPagination currentPage={1} totalPages={1} />);
    expect(container).toBeEmptyDOMElement();
  });

  test("disables Previous on the first page and Next on the last page", () => {
    render(<BlogPagination currentPage={1} totalPages={3} />);
    expect(screen.getByText("Previous")).toHaveAttribute("aria-disabled", "true");
    expect(screen.getByRole("link", { name: "Next" })).toBeInTheDocument();
  });

  test("enables both Previous and Next on a middle page, and marks the current page", () => {
    render(<BlogPagination currentPage={2} totalPages={3} />);
    expect(screen.getByRole("link", { name: "Previous" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Next" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "2" })).toHaveAttribute("aria-current", "page");
  });

  test("disables Next on the last page", () => {
    render(<BlogPagination currentPage={3} totalPages={3} />);
    expect(screen.getByRole("link", { name: "Previous" })).toBeInTheDocument();
    expect(screen.getByText("Next")).toHaveAttribute("aria-disabled", "true");
  });

  test("builds page links with page number and preserves the active tag in the query string", () => {
    render(<BlogPagination currentPage={2} totalPages={3} activeTag="java" />);
    expect(screen.getByRole("link", { name: "1" })).toHaveAttribute("href", "/blog?tag=java");
    expect(screen.getByRole("link", { name: "3" })).toHaveAttribute("href", "/blog?tag=java&page=3");
    expect(screen.getByRole("link", { name: "Previous" })).toHaveAttribute("href", "/blog?tag=java");
  });

  test("omits page=1 from the query string but keeps it for later pages", () => {
    render(<BlogPagination currentPage={1} totalPages={2} />);
    expect(screen.getByRole("link", { name: "Next" })).toHaveAttribute("href", "/blog?page=2");
  });
});
