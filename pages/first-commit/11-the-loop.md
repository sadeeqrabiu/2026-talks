---
layout: none
talk: first-commit
---

<CmLoop
  section="METHOD"
  :index="11"
  title="The contributor loop"
  prompt="while (!confident) loop()"
  center="while (!confident)"
  :nodes="[
    { title: 'Read', body: 'CONTRIBUTING, then the code around the issue' },
    { title: 'Run', body: 'Build locally, run the tests first' },
    { title: 'Break', body: 'Reproduce it before you fix it' },
    { title: 'Fix', body: 'The smallest change at the root cause' },
    { title: 'Explain', body: 'In your own words' },
  ]"
/>

<!--
This is the whole method, and it's a loop, not a ladder. You'll go round it dozens
of times and it never stops being the process.

"Break" is the step everyone skips. It means reproduce the problem. Don't jump
straight to fixing something you don't understand — make the problem observable
first, then fix it, and you'll know the fix worked.

Fix means the smallest change that addresses the root cause. Not the biggest change
you can justify.
-->
