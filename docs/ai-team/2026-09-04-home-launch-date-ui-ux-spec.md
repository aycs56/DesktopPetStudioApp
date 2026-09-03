# Homepage launch date — UI/UX specification

## User path

1. A visitor opens the homepage.
2. Before 2026-09-08 01:00 (+08:00), the existing launch strip announces the
   planned release date in the selected language.
3. The visitor may follow the existing Steam link; no new interaction is
   introduced.

## Component decision: Homepage launch strip

- **User result:** Understand the product's planned release date and, if
  desired, navigate to its Steam page.
- **Selected component:** Persistent notification banner containing a link.
- **Why:** The strip communicates a cross-page product condition rather than a
  field-level error, a transient success message, or a new command. The link
  remains a navigation destination, not an in-place action.
- **Rejected near-matches:** Alert is for an immediate task problem; Toast is
  transient; Callout is durable contextual guidance rather than release status.
- **Data and behavior:** The source of truth is the client-side launch
  timestamp. The date is displayed immediately on load; no visitor input,
  saving, loading, or error-retry behavior applies.
- **Screen rules:** Keep the date/status copy visible in the banner beside its
  existing Steam destination. The localized date remains text, not color-only
  status. The existing responsive layout and link hit area are preserved.
- **Necessary states:** Planned (localized release date and usable Steam link);
  offer countdown (existing future behavior); ended (existing Steam download
  label). No loading, empty, error, disabled, or recovery state applies to
  this static schedule.
- **Responsive and accessible behavior:** The existing semantic anchor remains
  keyboard-focusable and touch-accessible; text is visible at narrow widths and
  no essential information depends on hover.
- **Platform adaptation:** Static web banner and native anchor behavior in the
  browser; keyboard, pointer, touch, and screen-reader link semantics are
  supplied by the existing anchor.
- **Shared library reference:** `feedback-and-recovery`, banner state; the
  local pattern preserves a visible persistent message and optional navigation.
- **Atlas reference:** `notification-banner` —
  https://huangchiyu.com/Vibe-UI-Atlas/components/notification-banner/;
  checked 2026-09-04. The canonical page was reachable through the Atlas site
  search; no visual redesign is made.
