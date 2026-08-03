# Google OAuth 驗證與上線檢查表

> 本頁依據 2026-08-03 查閱的 Google 官方要求整理。提交前請再次對照官方最新規範。

## 已由網站與程式設計支援

- [x] 官網首頁能說明 DesktopPetStudio 的功能與 Google Calendar 同步用途。
- [x] 官網與 OAuth 同意畫面使用相同的產品名稱：`DesktopPetStudio`。
- [x] 首頁已明確說明 DesktopPetStudio 是 Windows 桌面寵物創作與提醒應用程式。
- [x] 多語內容區塊使用 `data-lang-content` 與強制隱藏規則，不會同時顯示三種語言。
- [x] 發佈驗證會檢查所有 HTML 與 CSS 素材引用，阻擋遺失圖片。
- [x] 網站有獨立隱私權政策、使用條款與支援頁。
- [x] 隱私權政策描述 Google Calendar 的唯讀事件權限、外部瀏覽器登入、資料保存位置與中斷方式。
- [x] 桌面程式的同步流程使用系統預設瀏覽器與 loopback 回呼，而非嵌入式瀏覽器。
- [x] 程式目前只使用 `https://www.googleapis.com/auth/calendar.events.readonly`。
- [x] GitHub Pages 部署工作流提供發佈前設定檢查。

## 發佈者必須完成

- [ ] 註冊並持有自訂網域。GitHub Pages 的 `github.io` 網域通常無法證明由應用程式發佈者持有；OAuth 正式驗證應使用可由發佈者驗證的自訂網域。
- [ ] 在 Google Search Console 驗證該網域，並由 Google Cloud 專案 Owner 或 Editor 完成授權網域設定。
- [x] GitHub Pages 預設網址與 GitHub Issues 公開支援入口已設定，可先行發布官方網站。
- [ ] 在 `site.config.js` 填入可回覆的支援信箱與發佈者擁有的自訂網域，並通過 `python scripts/validate_site.py --require-oauth-config`。
- [ ] 在 GitHub Pages 設定自訂網域與 HTTPS，然後以手動工作流部署。
- [ ] 將正式首頁、隱私權、條款 URL 填進 OAuth consent screen，支援信箱填入可回覆地址。
- [ ] 將使用的網域與 OAuth redirect / authorized domains 填入 Google Cloud Console。
- [ ] 錄製 Google 要求的英文端對端 demo：程式發起同步、系統瀏覽器登入、同意唯讀權限、回到程式並成功建立本機提醒。
- [ ] 使用正式 OAuth 客戶端在乾淨 Windows 帳戶測試登入、登出、換帳號、同步範圍、啟動同步與午夜同步。
- [ ] 送交 OAuth verification，並依審查回覆補充資訊。

## 官方依據

- [Google Cloud: Verification requirements](https://support.google.com/cloud/answer/13464321?hl=en)
- [Google Cloud: App homepage requirements](https://support.google.com/cloud/answer/13807376?hl=en)
- [Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy)
- [OAuth 2.0 policies](https://developers.google.com/identity/protocols/oauth2/policies)
- [Google OAuth verification submission guide](https://support.google.com/cloud/answer/13461325?hl=en-GB)
