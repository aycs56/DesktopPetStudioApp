# 文件同步與 QA 報告

## 交付範圍

- 建立獨立 `official-site` 靜態網站專案，不影響既有 Windows 桌寵專案。
- 提供產品介紹、隱私權政策、使用條款、支援頁及 404 頁。
- 每頁支援繁體中文、簡體中文、英文；語言偏好保存在瀏覽器本機。
- 使用新生成的像素貓工作桌視覺，以及專案既有的 2D 像素貓產品素材。
- 建立 GitHub Pages 的驗證與手動發佈工作流。

## 已執行驗證

| 項目 | 結果 | 證據 |
| --- | --- | --- |
| 靜態網站驗證 | 通過 | `python scripts/validate_site.py` |
| Python 驗證器語法 | 通過 | `python -m py_compile scripts/validate_site.py` |
| 公開網站機密掃描 | 通過 | 未發現 OAuth secret marker |
| 本機 HTTP 冒煙檢查 | 通過 | `index.html`、`privacy.html`、`terms.html`、`support.html`、`404.html` 全部回應 HTTP 200，皆含三語內容 |
| GitHub Pages 發佈設定護欄 | 通過 | `--require-publish-config` 使用公開 Pages URL 與 GitHub Issues 支援入口通過 |
| Google OAuth 設定護欄 | 通過 | `--require-oauth-config` 正確要求支援信箱與自訂網域 |

## 未執行與原因

- Playwright 桌機 / 手機視覺自動化未執行：環境沒有 `npx`，依既定工具規範不自動安裝 Node.js。發佈者應在填入正式資料後，使用現代桌機與手機瀏覽器依 `release-checklist.md` 進行最後視覺與鍵盤操作驗收。
- GitHub Pages 實際部署、Google Search Console 網域驗證與 OAuth 送審尚未執行：需要發佈者的 GitHub 儲存庫、自訂網域、公開支援信箱及 Google Cloud 專案權限。

## GitHub Pages 發布狀態

1. GitHub Pages 可使用 `https://aycs56.github.io/DesktopPetStudioApp/` 發布官方網站。
2. 公開支援目前導向 GitHub Issues；不含任何 OAuth 私密資訊。
3. Google OAuth 驗證仍需要發佈者擁有且已驗證的自訂網域與支援信箱，不能只依賴預設 GitHub Pages 位址。

## 下一位執行者的最短路徑

1. 將 `official-site` 作為 GitHub 儲存庫根目錄，推送 `main` 後確認 Actions 自動部署。
2. 之後連接發佈者自訂網域、啟用 HTTPS，並在 Google Search Console 完成驗證。
3. 填入支援信箱，確認正式首頁、隱私權、條款和支援頁 URL。
4. 依 `google-oauth-verification-checklist.md` 設定 OAuth consent screen、錄製流程影片並送審。
