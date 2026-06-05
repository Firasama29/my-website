"use client";
import { useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(() => {
    if (typeof document === "undefined") return null;
    return document.documentElement.classList.contains("dark");
  });

  function toggle() {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }

  // Render nothing until we know the theme (avoids hydration mismatch)
  if (dark === null) {
    return <span className="w-8 h-8 inline-block" aria-hidden="true" />;
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
    >
      {dark ? "☀" : "☾"}
    </button>
  );
}
