# Homepage launch date — functional requirements

## 1. Launch schedule

- **Condition:** The homepage script determines the launch-banner state before
  `2026-09-08T01:00:00+08:00`.
  - **Behavior:** It displays the existing localized planned-release copy with
    the viewer-local formatted release date and does not display offer-countdown
    copy.
- **Condition:** The page loads without JavaScript.
  - **Behavior:** Each localized fallback label identifies the planned release
    as 09 / 08.
- **Condition:** The rescheduled start time arrives.
  - **Behavior:** The existing 14-day launch-offer countdown begins; this
    change does not alter its duration or post-offer Steam download state.

## 2. Constraints and non-goals

- **Condition:** The homepage banner is displayed at any viewport width or in
  any supported language.
  - **Behavior:** Its existing visual presentation, link target, keyboard
    navigation, and localization selection remain unchanged.
- **Condition:** The update is complete.
  - **Behavior:** No Steam configuration or deployment is performed as part of
    this task.
