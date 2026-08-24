# Make Your Pet Current Qt Media Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace only the four `make-your-pet.html` flow illustrations and matching localized copy with screenshots of the current Qt AI Asset Helper and pose editor.

**Architecture:** The static site stays in this checkout. The root `G:\Desktop idea` Qt application is used only to create four flat PNG files, which are copied into this site's `assets/images/make-pet/` directory. The existing `figure > img > figcaption` structure remains unchanged.

**Tech Stack:** Static HTML, Python `unittest`, PySide6 local capture, existing PowerShell site validator.

**Spec:** `docs/ai-team/2026-08-25-make-your-pet-current-qt-functional-requirements.md`, `docs/ai-team/2026-08-25-make-your-pet-current-qt-ui-ux-spec.md`

## Global Constraints

- Modify only `make-your-pet.html`, four new files under `assets/images/make-pet/`, the contract test, and this change's documentation.
- Preserve all existing figure classes, image dimensions, CSS layout, Hero, navigation, page order, and other routes.
- Do not copy or stage Qt source, environments, build outputs, or Git metadata from `G:\Desktop idea`.
- Do not push or publish.

---

### Task 1: Write the failing page-media contract

**Files:**
- Create: `tests/test_make_your_pet_current_qt_media.py`

- [ ] Write a `unittest` that requires `step-1-qt-ai-helper-entry.png`, `step-2-qt-prompt-output.png`, `step-3-qt-inspect-crop.png`, and `step-4-qt-pose-assets.png` to exist and be referenced by `make-your-pet.html`; it must also require the visible Qt terms `步驟 1：準備角色參考素材`, `複製 Prompt`, `檢查素材去背`, and `動畫素材`.
- [x] Run `python -m unittest tests.test_make_your_pet_current_qt_media -v` and record the expected failure before implementation.

### Task 2: Capture only current Qt UI surfaces

**Files:**
- Create: `assets/images/make-pet/step-1-qt-ai-helper-entry.png`
- Create: `assets/images/make-pet/step-2-qt-prompt-output.png`
- Create: `assets/images/make-pet/step-3-qt-inspect-crop.png`
- Create: `assets/images/make-pet/step-4-qt-pose-assets.png`

- [x] Use the root Qt application in Traditional Chinese with a local configuration and no visible desktop-pet window.
- [x] Capture, respectively: AI Asset Helper entry; Prompt/output dialog; inspect/crop controls; pose editor Animation assets section.
- [x] Inspect the four PNGs for readable fonts, unclipped control text, and the named action visible in each frame.

### Task 3: Replace only page media and adjacent wording

**Files:**
- Modify: `make-your-pet.html`

- [x] Change the four flow image sources and Step 1 social-preview image references to the new PNGs while preserving all classes and dimensions.
- [x] In Traditional Chinese, Simplified Chinese, and English, align each step's explanation, finished note, `alt`, and `figcaption` to the current Qt control visible in its screenshot.
- [x] Retain the Step 4 statement that editing does not automatically overwrite existing poses or assets.

### Task 4: Verify and trace

**Files:**
- Modify: `docs/ai-team/2026-08-25-make-your-pet-current-qt-team-run.md`
- Create: `docs/ai-team/2026-08-25-make-your-pet-current-qt-traceability.md`

- [x] Run `python -m unittest tests.test_make_your_pet_current_qt_media -v` and verify it passes.
- [x] Run `python scripts/validate_site.py` and verify `Site validation passed.`
- [x] Start a local static server; document the unavailable desktop and 390px browser rasterization as a limitation after inspecting responsive CSS and the four PNGs.
- [x] Map US-MYP-QT-01 through US-MYP-QT-03 to the assets, HTML, test, static validator, and visual evidence; record unavailable Atlas or browser tooling as limitations.

## Self-Review

- The plan makes no homepage, navigation, CSS, Qt-functionality, Git push, or release change.
- Every requirement maps to a named task and validation command.
