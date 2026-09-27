---
layout: none
talk: first-commit
---

<CmSteps
  section="METHOD"
  :index="7"
  title="The contributor loop"
  prompt="while (!confident) loop()"
  :steps="[
    { title: 'Read', body: 'README, CONTRIBUTING, then the code around the issue.' },
    { title: 'Run', body: 'Build it locally. Run the tests before touching anything.' },
    { title: 'Break', body: 'Reproduce the bug. Change one thing and watch what fails.' },
    { title: 'Fix', body: 'The smallest change that solves the problem.' },
    { title: 'Explain', body: 'Say what changed and why, in your own words.' },
  ]"
/>
