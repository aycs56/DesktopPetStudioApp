# Make Your Pet Current Qt Media Traceability

## Scope

Only `make-your-pet.html` and four static PNG files in
`assets/images/make-pet/` are product-facing changes. The website home page,
navigation, shared CSS, deployment configuration, and the Qt application are
out of scope.

## Requirement Mapping

| Requirement | Implemented evidence | Verification |
| --- | --- | --- |
| US-MYP-QT-01: show the current Qt entry and four-step AI material path | `step-1-qt-ai-helper-entry.png`, `step-2-qt-prompt-output.png`, `step-3-qt-inspect-crop.png`, `step-4-qt-pose-assets.png` | Each PNG was captured from the restored local Qt widgets and visually inspected for readable text and visible target controls. |
| US-MYP-QT-02: explain the operation in all existing website languages | the `zh-Hant`, `zh-Hans`, and `en` flow articles in `make-your-pet.html` | The Chinese Step 1 copy now names the Qt first-card label; all three language sections retain the Prompt, inspection/crop, and pose-editor guidance. |
| US-MYP-QT-03: preserve the existing responsive page structure | unchanged `make-pet-step`, `make-pet-screenshot`, and `make-pet-screenshot-portrait` classes | Static inspection confirms `img { width: 100%; height: auto; }` and the existing single-column media rule remain in place. |
| Existing-pose safety | Step 4 copy in all three language sections | Copy continues to state that editing does not automatically overwrite an existing pose or its assets. |

## Validation Evidence

* `python -m unittest tests.test_make_your_pet_current_qt_media -v` passed.
* `python scripts/validate_site.py` passed.
* The four output files were opened and reviewed at their captured sizes:
  1280x900, 820x860, 820x860, and 760x760.
* No obsolete `step-*-reference/prompt-output/asset-check/import-pose` filename
  remains in `make-your-pet.html`.

## Visual-QA Limitation

The local static server was reachable, but this machine's headless Chrome
terminated before rasterization because its GPU child process was unavailable;
the embedded browser surface was also unavailable. No CSS or layout code was
changed, the replacement figures keep their prior HTML classes and dimensions,
and responsive CSS was checked statically. A normal-browser desktop and 390px
smoke check remains a recommended post-merge release check.

## Delivery Boundary

No Git commit, push, website publish, Steam action, or change under
`G:\Desktop idea`'s Qt application working tree was performed.
