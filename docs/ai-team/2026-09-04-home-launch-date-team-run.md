# Team run: Homepage launch date

- **Profile / risk / depth:** Web / low / standard.
- **Goal:** Reschedule the homepage planned release to 8 September 2026 without
  showing the launch-offer countdown beforehand.
- **Affected surface:** `index.html` fallback labels and `assets/js/site.js`
  launch state.
- **Assumption and decision owner:** Interpret 9/8 as 2026-09-08 at the
  existing 01:00 Taipei time; the user is the decision owner and supplied the
  new date.
- **Out of scope:** CSS, Steam configuration, offer duration, deployment,
  commit, and push.
- **Definition of Ready:** User story, functional requirements, UI/UX decision,
  exact workspace, and validation commands are recorded.
- **Definition of Done:** A regression test proves the planned state before
  the new start time; the static fallback shows 09 / 08; site and test suites
  pass; no publishing action occurs.

## Team route

- **Roles:** PM, UI/UX Designer, Frontend Engineer, QA.
- **Skills:** `project-work-governance`, `pm-expert`, `requirements-format`,
  `brainstorming`, `writing-plans`, `ui-component-demo`, `ui-ux-pro-max`,
  `test-driven-development`, and `verification-before-completion`.
- **Why this route:** A bounded user-visible static-web status change needs
  traceable copy/state requirements, a preserved banner pattern, a minimal
  frontend change, and regression plus page validation.
- **Skipped:** Backend Engineer (no API or persistence); CEO (no change to
  product direction, pricing, publishing policy, or market positioning);
  Release Engineer and Technical Writer (no deployment or public-document
  change is requested).

## Work breakdown

1. PM/UI-UX: record the rescheduled date, banner responsibility, and scope.
2. Frontend: add a failing behavior regression test, then change the schedule
   and fallback labels minimally.
3. QA: run the focused regression, full Python test discovery, site validator,
   and a local-browser narrow/wide banner check.

## Validation evidence

- **Pass:** The new regression failed first against the 9/4 schedule, then
  passed after the 9/8 schedule and fallback update.
- **Pass:** `py -3 -m unittest discover -s tests -v` completed 12 tests with
  no failures.
- **Pass:** `py -3 scripts/validate_site.py` reported `Site validation
  passed.`
- **Pass:** Local Chromium verification at 1440px and 390px displayed
  `Steam 預計發行日期：09 / 08`, no countdown text, no banner overflow, and
  the existing Steam destination.
- **Pass:** Targeted web-interface review confirmed that the changed banner
  remains a semantic link with visible `:focus-visible` feedback; the runtime
  date is formatted with `Intl.DateTimeFormat`.
- **Skipped:** Publishing and smoke-testing the public deployment were not
  authorized or requested.
