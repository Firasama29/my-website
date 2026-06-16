import { getRecentRepos, getContributionCalendar, GitHubDay } from "@/lib/github";

const GITHUB_USERNAME = "firasama29";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

function getCellClass(level: number): string {
  const colors = [
    "bg-[#f0fdf4] dark:bg-[#161b22]",
    "bg-[#bbf7d0] dark:bg-[#0e4429]",
    "bg-[#4ade80] dark:bg-[#006d32]",
    "bg-[#16a34a] dark:bg-[#26a641]",
    "bg-[#14532d] dark:bg-[#39d353] dark:shadow-[0_0_6px_rgba(57,211,83,0.4)]",
  ];
  return colors[level] ?? colors[0];
}

function getLevel(count: number, max: number): number {
  if (count === 0 || max <= 0) return 0;
  const ratio = count / max;
  if (ratio < 0.25) return 1;
  if (ratio < 0.5) return 2;
  if (ratio < 0.75) return 3;
  return 4;
}

function buildMonthLabels(weeks: GitHubDay[][]): Map<number, string> {
  const labels = new Map<number, string>();
  let lastMonth = -1;
  weeks.forEach((week, wi) => {
    const firstDay = week[0];
    if (!firstDay) return;
    const month = new Date(firstDay.date + "T00:00:00").getMonth();
    if (month !== lastMonth) {
      labels.set(wi, MONTHS[month]);
      lastMonth = month;
    }
  });
  return labels;
}

export default async function GitHubActivity() {
  const [repos, calendar] = await Promise.all([
    getRecentRepos(),
    getContributionCalendar(),
  ]);

  if (repos.length === 0 && !calendar) return null;

  const max = calendar
    ? Math.max(...calendar.weeks.flatMap((w) => w.map((d) => d.contributionCount)))
    : 0;
  const monthLabels = calendar ? buildMonthLabels(calendar.weeks) : new Map<number, string>();

  return (
    <section id="github-activity" className="bg-white dark:bg-slate-900 py-20">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
          GitHub Activity
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-10">
          Recent contributions and active repositories
        </p>

        {calendar && (
          <div className="relative mb-12 rounded-xl border border-[#bbf7d0] dark:border-[#21262d] bg-[#f6fef9] dark:bg-[#0d1117] p-3 sm:p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-semibold text-green-800 dark:text-slate-200">
                {calendar.totalContributions.toLocaleString()} contributions in the last year
              </span>
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-green-700 dark:text-[#39d353] hover:underline"
              >
                {GITHUB_USERNAME} →
              </a>
            </div>

            <div className="relative">
              <div className="overflow-x-auto">
                <div className="flex gap-1 items-start">
                  {/* Day labels - hidden on mobile */}
                  <div className="hidden sm:flex flex-col gap-[3px] pt-[18px] mr-1 shrink-0">
                    {DAY_LABELS.map((label, i) => (
                      <div
                        key={i}
                        className="h-[10px] w-6 text-[9px] text-slate-400 dark:text-[#484f58] leading-[10px]"
                      >
                        {label}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col">
                    {/* Month labels */}
                    <div className="flex gap-[3px] mb-1 h-[14px]">
                      {calendar.weeks.map((_, wi) => (
                        <div
                          key={wi}
                          className="w-[10px] shrink-0 text-[9px] text-slate-400 dark:text-[#484f58] leading-[14px] overflow-visible whitespace-nowrap"
                        >
                          {monthLabels.get(wi) ?? ""}
                        </div>
                      ))}
                    </div>

                    {/* Tile grid */}
                    <div className="flex gap-[3px]">
                      {calendar.weeks.map((week, wi) => (
                        <div key={wi} className="flex flex-col gap-[3px]">
                          {week.map((day) => (
                            <div
                              key={day.date}
                              title={`${day.date}: ${day.contributionCount} contribution${day.contributionCount !== 1 ? "s" : ""}`}
                              className={`w-[10px] h-[10px] rounded-[2px] ${getCellClass(getLevel(day.contributionCount, max))}`}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Scroll-fade affordance - mobile only */}
              <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-[#f6fef9] dark:from-[#0d1117] to-transparent pointer-events-none sm:hidden" />
            </div>

            {/* Legend */}
            <div className="flex items-center gap-1 mt-2 justify-end text-[10px] text-slate-400 dark:text-[#484f58]">
              <span>Less</span>
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`w-[10px] h-[10px] rounded-[2px] ${getCellClass(level)}`}
                />
              ))}
              <span>More</span>
            </div>
          </div>
        )}

        {/* Repo cards */}
        {repos.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {repos.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-sm p-5 flex flex-col hover:shadow-md hover:border-green-100 dark:hover:border-green-800 transition-all"
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
                      <span className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded-full">
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
                className="text-green-700 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 text-sm font-medium"
              >
                View full GitHub profile →
              </a>
            </div>
          </>
        )}
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
