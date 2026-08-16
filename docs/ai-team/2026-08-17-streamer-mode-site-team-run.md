# 實況模式官方網站介紹 - Team Run

## 團隊設定

- Profile：Web
- Risk：Low
- Depth：Standard
- 決策者：產品需求已由使用者指定；PM 依已完成的 Twitch 與 OBS 功能落實網站介紹。

## Definition of Ready

- 已確認官方網站專案為 `DesktopPetStudioApp-site-publish`，現有頁面採繁中、簡中、英文三語切換。
- 已確認主程式已支援 Twitch Bits、姿勢金額區間、播放持續時間、觀眾氣泡參數、本機測試、觸發後回復原動作與 OBS 專用視窗擷取。
- 已確認 Twitch 授權僅存於使用者 Windows 本機，工作坊內容不得包含授權資料。
- 已確認首頁已有 Twitch 摘要區與 Google Calendar 提醒區可延伸。
- 不包含 Twitch 後端、OAuth 行為、OBS 實作、Steam 發布或 GitHub Pages 發布。

## 角色檢視

- PM：讓玩家先理解「Bits 事件會讓桌寵做什麼」，再依順序完成連線、規則、測試與 OBS 擷取。
- UI/UX：新頁必須用可掃讀的步驟與視覺示意取代密集文字；首頁入口要能一眼辨識為實況主功能。
- Lead Developer：沿用既有三語切換、導航、像素動畫與無外部依賴的 CSS 視覺元件。
- QA：驗證所有聲稱都對應現有主程式、三語切換、內部連結、手機與桌機布局、動態偏好與靜態網站檢查。
- Technical Writer：清楚區分 Twitch Bits 與 OBS 視窗擷取，並明示本機授權、提醒優先權及不會建立的資料流。

## Definition of Done

- 全站導覽與網站地圖能前往新的 `streamer-mode.html`。
- 新頁完整描述已實作的 Twitch Bits 與 OBS 擷取流程，且三語內容一致。
- 首頁 Twitch 區改為導向新頁的摘要；行程提醒區改為帶有活動、工作、會議、紀念日標籤的動態情境圖。
- 靜態驗證、內部連結檢查、桌機與手機瀏覽器檢查、Console 檢查完成。
