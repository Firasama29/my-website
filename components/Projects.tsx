interface Project {
  name: string;
  description: string;
  tags: string[];
  demo: string;
  repo?: string;
}

const projects: Project[] = [
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

export default function Projects() {
  return (
    <section id="projects" className="py-20">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">Projects</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-10">Things I&apos;ve built</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.name}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-xl shadow-sm p-6 flex flex-col hover:shadow-md hover:border-blue-100 transition-all"
            >
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
                {project.name}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4 flex-1">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs px-3 py-1 rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-3 text-sm font-medium">
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Live demo
                </a>
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
