# Homepage Launch Date Implementation Plan

> **For agentic workers:** Execute each checked task in order. Use the
> red-green-refactor cycle and retain the project workspace boundary.

**Goal:** Move the homepage launch schedule to 8 September 2026 so the banner
remains in planned-release state before then.

**Architecture:** The existing `launchSchedule.startsAt` timestamp is the
single runtime source of truth for the banner's planned/countdown/ended state.
`index.html` contains the corresponding no-JavaScript fallback labels. Change
those two sources together; do not add a manual override or a second state
machine.

**Tech Stack:** Dependency-free HTML, browser JavaScript, Python `unittest`,
Node.js for a controlled browser-script behavior test.

**Spec:** `docs/plans/2026-09-04-home-launch-date-design.md`

## Global Constraints

- Work only in `G:\Desktop idea\DesktopPetStudioApp-site-publish` on `main`.
- Do not deploy or alter the 14-day offer duration.
- Preserve the existing Steam link, banner styling, and three-language copy.
- Use 2026-09-08 01:00 at `+08:00` as the launch timestamp.

---

### Task 1: Prove the prelaunch banner state

**Files:**

- Modify: `tests/test_launch_local_time.py`
- Reads: `assets/js/site.js`, `index.html`

**Produces:** An executable regression test that evaluates the real homepage
script at 2026-09-04 12:00 `+08:00` and expects planned-release, rather than
offer-countdown, copy plus 09 / 08 fallback labels.

- [x] **Step 1: Write the failing test**

Add a test that runs the actual script in a minimal controlled DOM, freezes
`Date.now()` at `2026-09-04T12:00:00+08:00`, and asserts the three
`[data-launch-state]` elements contain planned-release text with `09 / 08`.
Assert that the three `index.html` fallback labels include `09 / 08`.

- [x] **Step 2: Run the focused test and verify it fails**

Run: `py -3 -m unittest tests.test_launch_local_time`

Expected: a failure because the current schedule begins on 2026-09-04 and its
fallback text is 09 / 04.

- [x] **Step 3: Change the single schedule source and static fallbacks**

Set `launchSchedule.startsAt` to
`Date.parse("2026-09-08T01:00:00+08:00")`. Replace the three static 09 / 04
fallback labels in `index.html` with 09 / 08. Do not change
`launchSchedule.durationMs`, links, classes, or CSS.

- [x] **Step 4: Run the focused test and verify it passes**

Run: `py -3 -m unittest tests.test_launch_local_time`

Expected: PASS.

### Task 2: Validate the site release gate without publishing

**Files:**

- Reads: `index.html`, `assets/js/site.js`, `scripts/validate_site.py`

- [x] **Step 1: Run all local tests**

Run: `py -3 -m unittest discover -s tests -v`

Expected: all tests pass.

- [x] **Step 2: Run static-site validation**

Run: `py -3 scripts/validate_site.py`

Expected: `Site validation passed.`

- [x] **Step 3: Check the homepage in a local browser**

Run a local HTTP server, open the homepage at desktop and mobile widths, and
verify that the selected language displays the planned-release date without
offer-countdown copy before 2026-09-08. Do not publish. Verified at 1440px
and 390px: the visible Traditional Chinese banner was 800px × 125px and
366px × 124px respectively, with no content overflow.
