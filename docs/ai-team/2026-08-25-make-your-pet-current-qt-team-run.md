# 製作專屬桌寵：現行 Qt 示意與文案 Team Run

## DoR

* **Profile / risk / depth：** web / low / standard。
* **目標：** 以四張現行 Qt 實機截圖與相符文案取代 `make-your-pet.html` 的舊示意。
* **限制：** 只改四步流程媒體與文案；不修改首頁、導覽、Hero、部署或桌寵程式功能。
* **來源隔離：** 截圖從 `G:\Desktop idea` 的本機 Qt 應用程式擷取，只把 PNG 副本放入本網站。

## Role Council

* **PM：** 讓四張圖各映射一個可辨識的 Qt 操作，並維持三語一致。
* **UI/UX：** 使用既有 Image / `data-and-media` 模式；不變更流程或版面責任。
* **Frontend：** 替換媒體檔、`img` 屬性、圖說及三語段落中的 Qt 控制項名稱。
* **QA：** 驗證新檔存在、舊截圖不再被流程頁引用、三語對照完整，以及桌面／手機視覺不破版。
* **Skipped：** Backend、Release、CEO；沒有 API、部署、策略、法律或商業模式變更。

## WBS

1. 建立 HTML/媒體契約測試並確認其先失敗。
2. 擷取四張本機 Qt 畫面並匯出為網站 PNG 資產。
3. 只更新 `make-your-pet.html` 的四步圖片、替代文字、圖說與同段三語文案。
4. 執行測試、網站驗證與桌面／手機視覺檢查，完成追溯紀錄。

## Execution Outcome

* Four real Qt surfaces were captured without starting a visible desktop pet
  or persisting configuration, then copied as flat PNG assets into this site.
* The content-page flow, social-preview image, alt text, and adjacent Step 1
  and Step 4 wording now describe the visible current Qt controls.
* The contract test and static-site validator passed. See
  `2026-08-25-make-your-pet-current-qt-traceability.md` for evidence and the
  local browser-rasterization limitation.
* No Git push, site publish, or desktop-application modification was made.

## DoD

* 四張流程圖皆與可見 Qt 控制項相符，且僅以靜態 PNG 進入本網站。
* 三語圖文對照符合功能需求，並保留既有 `figure` 響應式路徑。
* 測試、靜態網站驗證、桌面與手機檢查具有實際證據；不執行推送或發布。
