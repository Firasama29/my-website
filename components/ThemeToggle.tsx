"use client";
import { useState, useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

export default function ThemeToggle() {
  // True only once the client has hydrated, so the first client render
  // matches the server-rendered placeholder and avoids a hydration mismatch.
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  const [darkOverride, setDarkOverride] = useState<boolean | null>(null);

  // Render a placeholder until mounted (avoids hydration mismatch)
  if (!mounted) {
    return <span className="w-8 h-8 inline-block" aria-hidden="true" />;
  }

  const dark = darkOverride ?? document.documentElement.classList.contains("dark");

  function toggle() {
    const next = !dark;
    setDarkOverride(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
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
