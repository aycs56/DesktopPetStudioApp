# 功能追溯矩陣

| 需求 | 設計 / 實作 | 驗證方式 | 狀態 |
| --- | --- | --- | --- |
| 產品介紹 | `index.html` 的 Hero、功能與同步區段 | 靜態檢查與本機 HTTP 冒煙檢查 | 已完成 |
| 繁中 / 簡中 / 英文 | `assets/js/site.js` 與頁面多語內容 | 三語內容標記檢查；發佈前人工切換 | 已完成 |
| 隱私權政策 | `privacy.html` | 內容審閱、OAuth 檢查表 | 已完成 |
| 使用條款 | `terms.html` | 內容審閱 | 已完成 |
| 支援資訊 | `support.html` | FAQ 與聯絡設定檢查 | 已完成 |
| GitHub Pages | `.github/workflows/pages.yml` | workflow 靜態驗證、發佈設定阻擋測試 | 已完成 |
| OAuth 驗證準備 | `google-oauth-verification-checklist.md` | 發佈者逐項勾選 | 交接待辦 |
