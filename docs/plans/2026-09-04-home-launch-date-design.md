# Homepage launch-date adjustment design

## Context

The homepage launch banner currently enters the launch-offer countdown from
`2026-09-04T01:00:00+08:00`. The planned Steam release is now 8 September
2026, so visitors must see the planned-release state until that new start
time.

## Options considered

1. Move the existing launch start timestamp to 8 September and update the
   no-JavaScript fallback date. This keeps the existing state machine,
   localized copy, banner link, and 14-day offer duration intact.
2. Add a temporary manual switch that overrides the countdown. This adds a
   second source of truth and an extra step when the launch schedule changes.
3. Remove the launch-offer countdown permanently. This changes the approved
   post-launch behavior and is outside the requested scope.

## Decision

Use option 1. Interpret the requested date as the existing launch hour on
2026-09-08 in Taipei time (`+08:00`), because no different release hour was
provided. Before that timestamp, the banner displays the localized planned
release date; the offer countdown remains dormant. The current 14-day offer
period starts only at the rescheduled release time.

## Scope and non-goals

- Change only the homepage launch schedule and its static fallback labels.
- Preserve the existing banner visual design, Steam destination, localization,
  and countdown duration.
- Do not publish the site or change Steam-side configuration.
