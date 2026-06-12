"use client";

import { useEffect, useRef } from "react";

interface CodeBlockProps {
  html: string;
  className: string;
}

const COPY_FEEDBACK_MS = 2000;

export default function CodeBlock({ html, className }: CodeBlockProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const cleanups: (() => void)[] = [];

    container.querySelectorAll("pre").forEach((pre) => {
      const wrapper = document.createElement("div");
      wrapper.className = "relative";
      pre.parentNode?.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);

      const button = document.createElement("button");
      button.type = "button";
      button.textContent = "Copy";
      button.setAttribute("aria-label", "Copy code to clipboard");
      button.className =
        "absolute top-2 right-2 text-xs font-medium px-2 py-1 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 transition-colors";

      const handleClick = () => {
        navigator.clipboard?.writeText(pre.textContent ?? "");
        button.textContent = "Copied!";
        const timeout = setTimeout(() => {
          button.textContent = "Copy";
        }, COPY_FEEDBACK_MS);
        timeouts.push(timeout);
      };

      button.addEventListener("click", handleClick);
      wrapper.appendChild(button);

      cleanups.push(() => button.removeEventListener("click", handleClick));
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [html]);

  return (
    <article ref={containerRef} className={className} dangerouslySetInnerHTML={{ __html: html }} />
  );
}
