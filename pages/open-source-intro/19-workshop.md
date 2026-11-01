---
layout: none
transition: fade
talk: open-source-intro
index: 19
clicks: 4
---

<OsFrame kicker="14 · Workshop leaderboard" :index="19">
  <div class="flex h-full gap-8">
    <div class="w-[220px] shrink-0 flex flex-col justify-center gap-6">
      <div>
        <h2 class="os-title !text-[32px]">We built<br><em>it live.</em></h2>
        <p class="os-label !text-white/40 mt-2 mb-0 !normal-case !tracking-normal">github.com/OsGuild-HQ/<br>Mind-Reader-Arena</p>
      </div>
      <WorkshopStats />
    </div>
    <div class="flex-1 min-w-0">
      <Podium :step="$clicks" />
    </div>
  </div>
</OsFrame>

<!--
This is from our OSGuild workshop — Mind Reader Arena, a rock-paper-scissors
bot arena we built together on GitHub. Real repo, real PRs, real merges.

16 forks, 8 pull requests, 7 merged. 3 issues still open — come pick one up.

[click] Third place: @Kiswaga-Angela-John — first PR, merged.
[click] Second: @Dhruv-VKG — wrote a whole new bot, "The Pattern Breaker".
[click] And first: @dotping-me — two merged PRs: the Grudge Holder bot, then
Spectator Mode, which closed a feature issue. +216 lines.

[click] And everyone else who shipped: @Kitkat2145, @shaahaelahee20-cmyk, and
@Nkhilesh who opened a PR. Every one of those is now in a public git log.

Ranking: merged PRs, then lines changed. Data pulled from the GitHub API on
1 Nov 2026 — numbers live in components/os-intro/leaderboard.ts.
-->
