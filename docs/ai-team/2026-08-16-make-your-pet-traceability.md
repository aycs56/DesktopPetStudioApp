# 製作專屬桌寵頁面 - 需求可追溯與 QA 紀錄

## 交付範圍

更新官方網站的「製作專屬桌寵」公開頁面，並在首頁「把角色帶進桌面」區塊提供直達入口。教學依桌面程式目前的 AI 素材助手流程，提供四步的可理解導覽與對應實機截圖。

網站僅說明主程式功能；不會上傳玩家素材、不會替玩家呼叫外部 AI，也不會保存素材。

## 需求與實作對照

| 需求 | 實作位置 | 驗收方式 | 結果 |
| --- | --- | --- | --- |
| 首頁提供「製作專屬桌寵教學」入口 | `index.html`、`assets/js/site.js` | 點擊繁中首頁玩家區塊按鈕 | 通過，開啟 `make-your-pet.html` |
| 教學完整呈現四步流程 | `make-your-pet.html` 概覽與詳細流程區塊 | 對照主程式流程與網頁標題 | 通過，步驟 1 至 4 完整呈現 |
| 第 2 步說明 Prompt、語言與推薦網站 | `make-your-pet.html`、`assets/images/make-pet/step-2-prompt-output.png` | 檢視頁面與截圖 | 通過 |
| 第 3 步說明去背檢查與宮格圖片裁切 | `make-your-pet.html`、`assets/images/make-pet/step-3-asset-check.png` | 檢視頁面與截圖 | 通過 |
| 第 4 步帶往姿勢編輯並保護既有設定 | `make-your-pet.html`、`assets/images/make-pet/step-4-import-pose.png` | 檢視文案與截圖 | 通過，明確說明需手動加入、確認與儲存，不會自動覆寫 |
| 繁中、簡中、英文皆有完整內容 | `make-your-pet.html` 的三個 `data-lang-content` 區塊 | 瀏覽器切換三種語言 | 通過，皆能找到第 4 步內容 |
| SEO 與快取版本更新 | `make-your-pet.html`、`index.html`、`sitemap.xml` | 檢視 canonical、metadata、靜態檢查 | 通過 |
| 網頁不應有前端錯誤 | `assets/js/site.js`、`assets/css/site.css` | Playwright console error 檢查 | 通過，0 errors / 0 warnings |

## QA 證據

| 項目 | 證據 |
| --- | --- |
| 靜態站點檢查 | `python scripts/validate_site.py`：通過 |
| JavaScript 語法 | `node --check assets/js/site.js`：通過 |
| 桌面版流程頁 | 1440 x 1080：首頁入口、四步概覽、四張主程式截圖與收尾 CTA 均正常顯示 |
| 手機版流程頁 | 390 x 844：單欄流程、卡片、圖片比例與按鈕均正常顯示，無水平捲動 |
| 繁體中文 | 預設內容、首頁教學按鈕與四步流程正確 |
| 簡體中文 | 切換後顯示「步骤 4：把素材导入指定姿势」與完整說明 |
| 英文 | 切換後顯示「Step 4: Import the assets into the target pose」與完整說明 |
| 跨頁導覽 | 首頁「製作專屬桌寵教學」按鈕可前往 `make-your-pet.html` |

## 發布邊界

- 本次未執行 Git push、GitHub Pages 部署或任何 Steam 發布。
- 後續網站發布時，GitHub Pages workflow 應先執行 `python scripts/validate_site.py`。
