# September website proposal

Prepared 9 September 2026. Branch: `nikhil/september-website-updates`, based on main at `7b7feac`. Not merged or deployed.

## Review the proposal

- Home: http://127.0.0.1:4190/#maia-by-the-numbers-title
- Research: http://127.0.0.1:4190/initiatives/#research
- Events: http://127.0.0.1:4190/events/
- About / mobile spacing: http://127.0.0.1:4190/about/

### Research

Six highlights, retaining the three approved papers and adding International AI Safety Report, Weight-sparse transformers have interpretable circuits, and How Transparent is DiffusionGemma? The sixth is a proposed choice: recent technical work coauthored by Josh Engels.

Ten additional 2026 publications bring the unique list to 43, sorted newest first. Titles, dates and MAIA coauthors are recorded in `src/lib/researchUpdates.ts`; its arXiv links are the primary sources. Dates use original arXiv submission dates, not the most recent revision. The Singapore Consensus arXiv identifier begins 2608 but its record gives a July 9 initial submission.

The PDF-rendering workflow produced real first-page assets for the three new highlights, preserving their original proportions. No generated or redrawn paper covers.

Citation counts are dated OpenAlex record counts, not Google Scholar totals or an exhaustive measure of impact. Exact records are linked on the cards and stored in `researchHighlights.ts`. Several records return zero. Their incomplete coverage is disclosed on the page; consider whether these counts are useful before approving them.

### Numbers — approval gate

- 300+ active members: existing approved copy, unchanged.
- 1,300+ people in Slack: proposed from Jurgis's September 7 message; Felix's completed additions have NOT been independently confirmed. Confirm before merge, otherwise retain the previous figure.
- 43 research papers: computed from the actual website list; includes members and alumni. This is a count of this curated list, not an exhaustive organizational output.
- 400+ AISF completers: deliberately not published; no verified cross-cohort total.

### Events

Restores navigation while retaining Orientation links. The same public Google calendar remains the only external calendar source. No private calendar, attendance or participant data is used.

The archive contains all available calendar occurrences, plus four sourced historical program/event records. It groups the past by year, puts upcoming events first, and expands details on demand. Existing 50% past-event muting is preserved, with full opacity on hover or keyboard focus.

The RFC 5545 parser handles recurring sessions, moved exceptions, exclusions, cancellations, daylight saving, and exclusive all-day end dates. Unbounded recurrence is limited to two years ahead, not used to invent past occurrences. Start and end times are Eastern (EST/EDT); all-day entries are labelled separately.

Calendar edits are fetched when building/deploying, NOT continuously from Athena. Already-loaded events move from upcoming to past as time passes in the browser. A failed calendar fetch stops the build rather than quietly removing the archive.

The public feed is not a complete historical record. More dates for older AISF cohorts, ARENA sessions, and other initiatives can be added to `src/lib/programHistory.ts`. Unknown session dates were not fabricated.

Source ledger for the four additions (internal review links; not exposed in the public site):

- Summer AISF, month-level June–July: [week 1](https://mitaialignment.slack.com/archives/C0B8APQU82G/p1780913002792249), [week 8](https://mitaialignment.slack.com/archives/C0B8APQU82G/p1785131583156079). Month bounds are sorting metadata, not asserted individual cohort dates.
- [May 9 AISF Capstone Hackathon](https://mitaialignment.slack.com/archives/C0AK4G10B0C/p1777854380713089), 10 AM–6:30 PM, CIC.
- [February 19 ARENA kickoff](https://mitaialignment.slack.com/archives/C04FTJZB43A/p1771446657232169), 6:30–9 PM. The announcement describes a planned ten-week program; subsequent sessions are not assumed.
- [March 1, 2025 ARENA kickoff](https://mitaialignment.slack.com/archives/C04FTJZB43A/p1740756725692529), 10 AM–3 PM.

### People and mobile

Ionut is included among homepage contacts using his existing public-site email, igstan@mit.edu. No unverified Calendly link was invented.

Reviewed Neha's `neha/mobile-performance` commits through `edb3152`. Selectively adapted lazy/async image loading, passive scrolling, reduced-motion support, smaller phone spacing, solid mobile menu surfaces and larger touch targets. Fixed the mobile Home link and delayed desktop navigation until it fits. Preserved main's measured header height, people changes, numbers, and recent content rather than applying an older homepage wholesale.

Neha's branch is not merged by this proposal. Broader component rewrites, older spacing values, and homepage copy changes were deliberately not copied.

### Hosting recommendation

Keep Athena for this PR. The design and archive do not require a migration. If live calendar edits must appear without redeployment, a small cached server endpoint would solve that specific requirement.

My recommendation for a later migration is Vercel with the SvelteKit adapter if the need remains a mostly static site plus a small calendar endpoint and previews. [Vercel's SvelteKit support](https://vercel.com/docs/frameworks/full-stack/sveltekit) and [scheduled jobs](https://vercel.com/docs/cron-jobs) cover that direction. Railway is more compelling if MAIA needs a persistent backend or workers; [its service model](https://docs.railway.com/services) supports that.

Either option needs an approved MAIA-owned account, billing/plan review, DNS ownership, cache/failure behavior, and a deployment/rollback plan. No provider account, DNS, cron job, credential, or production infrastructure was changed.

## Checks

- Production static build passes, including Events.
- Five calendar regression tests pass: exclusions/cancellation, moved recurrence, Eastern/DST times, all-day boundaries and ongoing events, malformed input.
- Desktop and 390px mobile Events navigation inspected; 53 event/program entries, no horizontal document overflow at 390px.
- Real PDF cover assets inspected.
- Full Svelte type check still reports four errors in unchanged `vite.config.ts` and `StrategicDeception.svelte`; not a clean type-check. No errors reported in the new calendar/research code.
- npm's existing `package-lock.json` is the tested installation source; `ical.js@2.2.1` is the only added dependency. The pre-existing old pnpm lockfile was not migrated as part of this change.

## Before merge

- [ ] Nikhil approves rendered proposal and sixth highlighted paper.
- [ ] Confirm 1,300+ Slack count or restore the previously approved number.
- [ ] Decide whether the incomplete OpenAlex counts are useful enough to show.
- [ ] Confirm no overlapping Ionut/mobile PR appeared since this review.
- [ ] Rebase/check against latest main, create/review PR; merge only after explicit approval.
- [ ] Deploy separately; verify the actual MIT website afterward.

## Deployment — only after approval and merge

The safer handoff is `bash scripts/deploy-reviewed-main.sh APPROVED_MERGE_COMMIT` after the merge SHA is known. It creates a fresh main checkout, verifies that the approved commit is present, installs the locked dependencies, stops on build failure, and checks the expected output pages before authentication/upload. Its syntax and help path were tested; production upload was not run.

Do not run this against the unmerged preview branch. From a clean main checkout containing the approved merge:

```sh
git switch main
git pull --ff-only origin main
npm ci
npm run build
kinit nvemuri@ATHENA.MIT.EDU
rsync -avz build/ nvemuri@athena.dialup.mit.edu:/mit/aialignment/www/
```

If Node/npm are unavailable in this Mac's terminal, prepend the bundled Node directory to PATH and use the known npm launcher:

```sh
export PATH="/Users/nikhil/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH"
/Users/nikhil/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback/pnpm --package=npm dlx npm ci
node node_modules/vite/bin/vite.js build
```

Only continue to authentication/upload after the build succeeds. Enter the password/MFA yourself. Upload only `build/`, not the repository or these internal review notes. Successful transfer is not final verification: reload Home, Research, Events, and a mobile menu on https://aialignment.mit.edu/.
