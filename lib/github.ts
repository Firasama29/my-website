export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  html_url: string;
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
    return await res.json();
  } catch {
    return [];
  }
}
