import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MobileNav from "@/components/MobileNav";

describe("MobileNav", () => {
  test("renders the menu trigger, with links hidden until opened", () => {
    render(<MobileNav />);
    expect(screen.getByRole("button", { name: /open menu/i })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Blog" })).not.toBeInTheDocument();
  });

  test("opens the menu on click and shows all nav links", async () => {
    render(<MobileNav />);
    await userEvent.click(screen.getByRole("button", { name: /open menu/i }));

    const nav = await screen.findByRole("navigation", { name: /mobile navigation/i });
    expect(nav).toBeInTheDocument();
    for (const label of ["About", "My Stack", "Projects", "Blog", "Contact"]) {
      expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
    }
  });

  test("clicking a link closes the menu", async () => {
    render(<MobileNav />);
    await userEvent.click(screen.getByRole("button", { name: /open menu/i }));
    await screen.findByRole("link", { name: "Blog" });

    await userEvent.click(screen.getByRole("link", { name: "Blog" }));

    expect(screen.queryByRole("link", { name: "Blog" })).not.toBeInTheDocument();
  });
});
