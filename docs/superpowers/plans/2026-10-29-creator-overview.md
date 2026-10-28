# Creator Overview v1.4 Implementation Plan

**Goal:** 將使用者確認的三語介紹 v1.4 套用到正式網站檔案。

**Architecture:** 沿用靜態 HTML／CSS／JavaScript。將已確認的首頁工作坊區、功能摘要、創作者首屏與介紹區整合至原頁，保留原導覽、analytics、技術區及下載檔；樣式直接沿用確認版，不重新設計。

**Tech Stack:** HTML、CSS、現有 JavaScript；Python 標準驗證腳本與 Playwright 瀏覽器檢查。

**Spec:** `docs/ai-team/design/2026-10-28-creator-overview/design-review.md`。2026-10-29 使用者回覆「採用此方案」，確認 v1.4；確認時的檔案雜湊見同目錄 `review-manifest.json`。

**Design and asset baseline:** 同目錄 `creator-json.html`、`index.html`、`overview.css` 與 `evidence/hero-v1.4-*`、`overview-v1.4-*`。圖片沿用 `assets/images/` 已有的貓、兔子、照顧圖及 app icon；CSS px 直接對應，保留字級、710px 主標上限、四卡布局、桌機按鈕上下 52px 與手機單欄。

**Acceptance and closeout:** 原有 14 項測試、發布檢查、實際語系切換／導覽／下載、桌機與手機畫面對照。依 AGENTS，本次僅授權方案整合，不自動提交或推送；這優先於技能的預設 stage commit。沿用網站 main checkout，無隔離工作樹或跨 repo 操作。

## Steps

- [x] 1. 核對確認版雜湊、正式來源基準與工作區；記錄確認及交接。
- [x] 2. 更新 `creator-json.html` 的首屏／介紹區／SEO，`index.html` 的工作坊區／三語功能摘要；沿用確認版內容，恢復根目錄相對路徑。
- [x] 3. 將確認版 CSS 加入 `assets/css/site.css`，八個公開 HTML 統一更新 CSS 快取鍵 `20261029-01`；JS 不變。
- [x] 4. 將既有作品卡檢查改為辨認四個 article，而非計算 CSS class 子字串；同步更新既有快取鍵測試常數。14 項測試與發布檢查通過。
- [x] 5. 正式頁面 18 組瀏覽器檢查、實際三語下載、導覽與鍵盤展開通過；5 張正式頁面 PNG 與已確認預覽完全相同。
- [x] 6. 依 requesting-code-review 完成唯讀審查，無待修問題；更新交接與驗證結果，保留 canonical 設計素材。

## Result

2026-10-29 本機正式整合完成。報告：`docs/ai-team/2026-10-29-creator-overview-integration.md`。使用者後續要求「幫我推到Git Hub」，已授權本批提交與推送，沿 `工作規範.md` 的已確認流程發布並核對遠端及公開內容。
