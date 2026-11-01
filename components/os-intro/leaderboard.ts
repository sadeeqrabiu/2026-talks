/*
  OSGuild workshop — github.com/OsGuild-HQ/Mind-Reader-Arena
  Snapshot pulled from the GitHub API on 1 Nov 2026. The maintainer's own
  setup PR (#1) and task issues are counted in the repo totals, not the ranking.

  Ranking rule: merged PRs, then lines changed (+/−).
  To re-rank, reorder `podium` (index 0 = 1st place).
*/

export interface Contributor {
  login: string
  prs: number
  merged: number
  issuesClosed: number
  add: number
  del: number
  work: string
}

export const repo = {
  name: 'Mind Reader Arena',
  url: 'github.com/OsGuild-HQ/Mind-Reader-Arena',
  forks: 16,
  openIssues: 3,
  closedIssues: 2,
  prs: 8,
  merged: 7,
}

export const podium: Contributor[] = [
  { login: 'dotping-me', prs: 2, merged: 2, issuesClosed: 1, add: 216, del: 33, work: 'Spectator mode + a new bot' },
  { login: 'Dhruv-VKG', prs: 1, merged: 1, issuesClosed: 0, add: 25, del: 0, work: 'The Pattern Breaker bot' },
  { login: 'Kiswaga-Angela-John', prs: 1, merged: 1, issuesClosed: 0, add: 9, del: 5, work: 'thumbs-down emoji' },
]

export const others: Contributor[] = [
  { login: 'Kitkat2145', prs: 1, merged: 1, issuesClosed: 0, add: 6, del: 6, work: 'more win/lose taunts' },
  { login: 'shaahaelahee20-cmyk', prs: 1, merged: 1, issuesClosed: 0, add: 1, del: 1, work: 'better mix-up message' },
  { login: 'Nkhilesh', prs: 1, merged: 0, issuesClosed: 0, add: 2, del: 0, work: 'game description' },
]

export const avatar = (login: string) => `/leaderboard/${login}.png`
