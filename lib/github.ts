export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  html_url: string;
}

export interface GitHubDay {
  date: string;
  contributionCount: number;
}

export interface GitHubCalendar {
  totalContributions: number;
  weeks: GitHubDay[][];
}

export async function getRecentRepos(): Promise<GitHubRepo[]> {
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "portfolio-site",
    };
    const token = process.env.GITHUB_TOKEN;
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(
      "https://api.github.com/users/firasama29/repos?sort=pushed&per_page=6&type=public",
      { headers, next: { revalidate: 3600 } }
    );

    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? (data as GitHubRepo[]) : [];
  } catch {
    return [];
  }
}

export async function getContributionCalendar(): Promise<GitHubCalendar | null> {
  try {
    const token = process.env.GITHUB_TOKEN;
    if (!token) return null;

    const query = `{
      user(login: "firasama29") {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }`;

    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "portfolio-site",
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;

    const json = await res.json();
    const cal =
      json?.data?.user?.contributionsCollection?.contributionCalendar;
    if (!cal) return null;

    return {
      totalContributions: cal.totalContributions as number,
      weeks: (
        cal.weeks as { contributionDays: { contributionCount: number; date: string }[] }[]
      ).map((w) =>
        w.contributionDays.map((d) => ({
          date: d.date,
          contributionCount: d.contributionCount,
        }))
      ),
    };
  } catch {
    return null;
  }
}
