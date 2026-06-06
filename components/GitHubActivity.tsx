import { getRecentRepos } from "@/lib/github";

const GITHUB_USERNAME = "firasama29";

export default async function GitHubActivity() {
  const repos = await getRecentRepos();
  if (repos.length === 0) return null;

  return (
    <section id="github-activity" className="bg-white dark:bg-slate-900 py-20">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
          GitHub Activity
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-10">
          Recent contributions and active repositories
        </p>

        {/* Contribution heatmap */}
        <div className="mb-12 overflow-x-auto rounded-xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://ghchart.rshah.org/${GITHUB_USERNAME}`}
            alt={`${GITHUB_USERNAME} GitHub contributions over the last year`}
            className="w-full"
          />
        </div>

        {/* Recently active repos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {repos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-sm p-5 flex flex-col hover:shadow-md hover:border-blue-100 transition-all"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-sm truncate">
                  {repo.name}
                </h3>
                {repo.stargazers_count > 0 && (
                  <span className="text-xs text-slate-400 shrink-0">
                    ★ {repo.stargazers_count}
                  </span>
                )}
              </div>

              {repo.description && (
                <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed mb-3 line-clamp-2">
                  {repo.description}
                </p>
              )}

              <div className="flex items-center justify-between text-xs text-slate-400 mt-auto pt-3 border-t border-slate-50 dark:border-slate-700">
                {repo.language ? (
                  <span className="bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-0.5 rounded-full">
                    {repo.language}
                  </span>
                ) : (
                  <span />
                )}
                <span>{formatDate(repo.pushed_at)}</span>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center">
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
          >
            View full GitHub profile →
          </a>
        </div>
      </div>
    </section>
  );
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
