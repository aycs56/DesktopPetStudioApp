# 首頁提醒場景與全站 SEO 檢查

日期：2026-08-17
Profile：Web　Risk：Low　Depth：Standard

## 目標與範圍

- 修正首頁「讓桌寵提醒你的重要行程」動態場景中，文字標籤被桌寵圖像遮擋的問題。
- 檢查並補齊首頁、製作專屬桌寵、實況模式、自訂與工作坊、隱私權政策、使用條款與支援資訊的搜尋與分享中繼資料。
- 不變更產品功能、網址、網站發布設定或公開內容的可見語意。

## 需求對應

| 使用者需求 | 實作與驗證 |
| --- | --- |
| 提醒場景標籤不可被圖像遮住 | 將標籤層級置於桌寵圖像之上，並將底部兩個標籤改放在角色左右外側；以桌面與 390px 手機寬度截圖檢查。 |
| 全站 SEO 優化 | 每個可索引頁具有唯一 title、description、canonical、Open Graph、Twitter Card、圖片替代文字、JSON-LD 與 sitemap 項目。 |
| 後續頁面不可漏檢 | `scripts/validate_site.py` 納入 `streamer-mode.html`，並驗證唯一 title/description/canonical 及 JSON-LD 可解析。 |

## 角色檢視

- PM：搜尋入口依玩家任務區分為產品、製作、實況、創作、隱私、條款與支援。
- UI/UX：四個提醒標籤保持在角色周圍且不遮擋角色或氣泡內容。
- Lead Developer：保留既有單一網址、多語內容切換與 canonical 策略，不宣告不存在的語言獨立網址。
- QA：驗證桌面與手機提醒場景、所有公開頁中繼資料、JSON-LD 與 sitemap。
- Technical Writer：頁面標題與說明以使用者可理解的功能語言描述，不加入未完成承諾。

## Definition of Done

- 四個提醒標籤在桌面與手機畫面均可辨識且不被角色圖像遮住。
- 所有公開頁通過靜態 SEO、資源與 JSON-LD 檢查。
- 網站未發布、未提交 Git；發布時再向 Google Search Console 提交 sitemap 並檢查 canonical URL。
