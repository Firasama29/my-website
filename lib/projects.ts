export interface Project {
  name: string;
  description: string;
  tags: string[];
  demo: string;
  repo?: string;
}

export const projects: Project[] = [
  {
    name: "Menu Visualizer",
    description:
      "Enter any dish name and instantly see it — the app searches Google Images for a real photo or falls back to generating one with DALL-E 3 when no result is found.",
    tags: ["JavaScript", "Google Custom Search", "DALL-E 3", "OpenAI"],
    demo: "https://menu-vis.netlify.app",
    repo: "https://github.com/Firasama29/menu-visualizer",
  },
  {
    name: "Tech Blog (Jekyll)",
    description:
      "A technical blog built with Jekyll and hosted on GitHub Pages, covering Java, Python, and backend development topics.",
    tags: ["Jekyll", "GitHub Pages", "Chirpy Theme"],
    demo: "https://firasama29.github.io/",
  },
];
