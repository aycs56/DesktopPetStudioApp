# 官方網站 AI 團隊執行紀錄

## 任務

為 Desktop Pet Studio 建立可部署至 GitHub Pages 的官方網站，提供產品介紹、隱私權政策、使用條款與支援資訊，並作為 Google OAuth 驗證的公開資訊基礎。

## 專案輪廓與風險

- 類型：公開靜態產品網站
- 風險等級：高。網站內容將用於 Google OAuth 驗證，隱私與條款文字必須與實際桌面程式行為一致。
- 主要使用者：Desktop Pet Studio 的玩家、支援人員，以及審查 Google OAuth 同意畫面的 Google 審核人員。
- 不在本次範圍：實際註冊網域、設定 GitHub 儲存庫、部署 GitHub Pages、提交 Google OAuth 驗證、建立客服信箱。

## 團隊角色與產出

| 角色 | 已完成工作 | 交付物 |
| --- | --- | --- |
| PM / BA | 產品與驗證流程梳理、使用者故事 | `user-stories.md`、`functional-requirements.md` |
| UX 設計 | 資訊架構、多語系與行動版互動規格 | `ui-ux-spec.md` |
| Web 開發 | 靜態網站、語系切換、無障礙與 GitHub Pages 工作流 | 網站原始碼與 `.github/workflows/pages.yml` |
| 隱私 / 法務 | 隱私資料流、條款與 Google 要件盤點 | `google-oauth-verification-checklist.md` |
| QA / Release | 靜態驗證、發佈前檢查與文件同步 | `release-checklist.md`、`documentation-sync-report.md` |

## 完成定義

- 四個公開頁面皆可在桌機與手機閱讀，並支援繁體中文、簡體中文、英文。
- 網站明確描述桌面程式的 Google Calendar 唯讀同步目的、資料處理與退出方式。
- GitHub Pages 工作流在發佈前強制檢查公開發佈設定，避免帶著佔位聯絡資訊上線。
- 所有驗證需求、已知限制、需要產品擁有者完成的項目均有文件可追蹤。

## 未決發布資料

下列資料不可臆造，完成前不得提交 Google OAuth 驗證或將網站作為正式官方網站宣傳：

1. 發佈者的法定或品牌名稱。
2. 公開支援電子郵件地址與支援回覆流程。
3. GitHub 儲存庫擁有者 / 名稱。
4. 已由發佈者持有並可在 Google Search Console 驗證的自訂網域。
5. 條款生效日與最終法務審閱結果。
