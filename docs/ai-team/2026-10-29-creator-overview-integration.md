# 自訂與工作坊 v1.4 正式頁面整合

2026-10-29，使用者以「採用此方案」確認三語介紹 v1.4，已套用到本機正式網站檔案。唯一工作區為 `G:\Desktop idea\DesktopPetStudioApp-site-publish`，`main`，origin 已核對為指定 GitHub URL。

## 變更

- `creator-json.html`：四種作品、收藏名稱與封面、DIY 特效、玩家／創作者流程、三語直接文案及 SEO；主標與內文等寬，桌機按鈕置中且上下各留 52px。
- `index.html`：三語首頁工作坊介紹、操作步驟與功能摘要同步。
- `assets/css/site.css`：整合已確認樣式，所有八個公開 HTML 的 CSS 快取鍵更新為 `20261029-01`。未改 JavaScript。
- 原有 JSON 技術區、三語 Markdown 指南、analytics、robots、頁首頁尾保留。測試更新四張作品卡的判定與當前 CSS 快取鍵。

## 驗證

- `python -X utf8 -B -m unittest discover -s tests`：14 項通過。
- `python -B scripts/validate_site.py --require-publish-config`：通過。
- `node --check assets/js/site.js`、`git diff --check`：通過。
- 正式介紹頁 1440／768／390／320px × 三語，首頁 1440／390px × 三語，共 18 組 Chromium 情境通過，沒有頁面例外、水平溢出或缺漏錨點。
- 鍵盤展開、JSON 範例錨點、DIY 特效錨點、桌寵教學連結、首頁到介紹頁與語言保留皆通過。
- 三語指南實際下載，與 `docs/` 來源 bytes 完全相同；網頁技術區的 JSON 範例可解析。
- 正式首頁工作坊區、創作者首屏與介紹區，經相對路徑正規化後，HTML 與已確認來源完全一致。
- 5 張正式頁面截圖與已確認 v1.4 預覽 PNG 完全相同：繁中桌機／手機首屏、英文桌機首屏、繁中介紹區、簡中首頁。
- 依 requesting-code-review 執行獨立唯讀審查，未發現待修問題；沒有新增視覺修訂。

整合初次測試偵測到既有快取鍵測試仍指定舊版，已更新到本批正式快取鍵並重跑通過。整合輔助腳本的標準庫名稱衝突發生在寫入正式檔案前，已修正後完成；未造成正式檔案的部分寫入。PNG 比對直接使用檔案 bytes，無新增影像處理依賴。

詳細瀏覽器數據與正式頁面截圖保存在忽略的 `output/creator-overview/production/verification.json` 與同目錄 `evidence/`。確認版設計及原始畫面保存在 `docs/ai-team/design/2026-10-28-creator-overview/`。本次沒有實機驗證 Safari／Edge，也沒有操作桌寵程式內的 Steam 上傳；驗收限網站內容與導覽。

## 交付狀態

本機正式整合完成。2026-10-29 使用者另外明確要求「幫我推到Git Hub」，本批已取得提交、推送及沿既有 Pages 流程部署的授權。發布前再次執行既有測試與發布檢查，僅提交網站程式、確認版設計及必要驗證紀錄；不包含忽略的本機工具輸出或其他桌寵工作區。

發布後應核對遠端 SHA、同 SHA 的 Pages 工作流，以及公開首頁、介紹頁、CSS 和三語指南。部署與公開內容的實際結果另保存在 `output/creator-overview/release-verification.json`，避免將尚未執行的結果寫成已完成。
