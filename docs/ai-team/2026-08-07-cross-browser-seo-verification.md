# 官方網站跨瀏覽器與 SEO 驗證紀錄

日期：2026-08-07

## 本次驗證範圍

- 創作者 JSON 指南的展開卡片：右側動畫、右上角展開與收合按鈕、JSON 範例入口。
- 支援資訊的常見問題寬度與行動版 Top 按鈕避讓頁腳。
- 行動版創作者 JSON 範例區塊的捲動呈現。
- 首頁、創作者指南、隱私權政策、使用條款與支援資訊的 SEO 基礎資料。

## 驗證結果

| 環境 | 結果 |
| --- | --- |
| Google Chrome（實機） | 創作者卡片、支援頁手機版與 Console 均通過。 |
| Microsoft Edge（實機） | 展開卡片、JSON 範例、支援頁手機版與 Console 均通過。 |
| WebKit（Safari 相容性引擎） | 桌機與手機版卡片、JSON 範例、頁腳避讓與 Console 均通過。 |
| 靜態檢查 | `python scripts/validate_site.py`、`node --check assets/js/site.js`、`git diff --check` 均通過。 |

## 已確認的細節

- 展開卡片的動畫縮圖位於內容右側，桌機為 88px、手機為 68px。
- 收合按鈕與未展開時的加號維持相同右側邊距與尺寸。
- 手機版 Top 按鈕在接近頁腳時會上移，且不覆蓋頁腳內容。
- 常見問題列表與「需要協助時，請附上足夠的背景」區塊使用同一內容寬度。
- JSON 範例區塊不再參與延遲顯示動畫，直接捲動至該區域時不會出現空白段。
- 公開頁面具有 description、robots、canonical、Open Graph、Twitter Card 與 sitemap 設定。

## 注意事項

WebKit 驗證涵蓋 Safari 的核心排版與 JavaScript 相容性；正式對外發布前，仍建議在 macOS 實機 Safari 做一次最終人工檢視。
