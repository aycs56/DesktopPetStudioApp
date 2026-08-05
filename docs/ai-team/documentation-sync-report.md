# 文件同步與 QA 報告

## GitHub Pages 部署紀錄

- 儲存庫：`aycs56/DesktopPetStudioApp`
- 發佈提交：`b7f03f5 Publish Desktop Pet Studio official website`
- 官方網址：`https://www.desktoppetstudio.com/`
- GitHub Actions：`Validate and deploy GitHub Pages` 已於 2026-08-03 成功完成驗證、Pages 設定、成品上傳與部署。
- 發佈範圍：僅官方靜態網站、素材、文件與 Pages workflow；不含 Windows 桌寵 App、打包輸出、OAuth client 檔、權杖或其他私密設定。

## 交付範圍

- 建立獨立靜態網站專案，不影響既有 Windows 桌寵專案。
- 提供產品介紹、創作者 JSON 指南、隱私權政策、使用條款、支援頁及 404 頁。
- 每頁支援繁體中文、簡體中文、英文；語言偏好保存在瀏覽器本機。
- 使用新生成的像素貓工作桌視覺，以及主程式既有的 2D 像素貓產品與六幀走動動畫素材。
- 首頁新增自訂角色與工作坊相容內容流程，並以 JSON 指南頁提供姿勢包、完整桌寵包、移動與 AI 素材提示的創作者參考。
- SEO 已加入 canonical URL、Open Graph、SoftwareApplication 結構化資料、robots 與 sitemap。
- 建立 GitHub Pages 的驗證與手動發佈工作流。

## 已執行驗證

| 項目 | 結果 | 證據 |
| --- | --- | --- |
| 靜態網站驗證 | 通過 | `python scripts/validate_site.py` |
| Python 驗證器語法 | 通過 | `python -m py_compile scripts/validate_site.py` |
| 公開網站機密掃描 | 通過 | 未發現 OAuth secret marker |
| 本機 HTTP 與 Playwright 視覺檢查 | 通過 | 桌機與手機首頁、工作坊流程與創作者指南已檢視；六幀 Banner 影格已確認循環變化 |
| GitHub Pages 發佈設定護欄 | 通過 | `--require-publish-config` 使用正式網域與 GitHub Issues 支援入口通過 |
| Google OAuth 設定護欄 | 通過 | `--require-oauth-config` 正確要求支援信箱與自訂網域 |

## 未執行與原因

- Google Search Console 網域驗證與 OAuth 送審尚未完成：仍需要公開支援信箱及 Google Cloud 專案權限。

## GitHub Pages 發布狀態

1. GitHub Pages 已綁定 `https://www.desktoppetstudio.com/`；根網域會導向這個 canonical 網址。
2. 公開支援目前導向 GitHub Issues；不含任何 OAuth 私密資訊。
3. Google OAuth 驗證仍需要公開支援信箱與 Google Search Console 網域驗證；不能只依賴 GitHub Pages 預設網址。

## 下一位執行者的最短路徑

1. 推送 `main` 後確認 Actions 將本次官方網站內容部署到 `https://www.desktoppetstudio.com/`。
2. 在 Google Search Console 完成根網域驗證。
3. 填入支援信箱，確認正式首頁、隱私權、條款和支援頁 URL。
4. 依 `google-oauth-verification-checklist.md` 設定 OAuth consent screen、錄製流程影片並送審。
