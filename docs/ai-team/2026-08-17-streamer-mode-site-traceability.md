# 實況模式官方網站追溯矩陣

日期：2026-08-17
範圍：官方網站的實況模式介紹、首頁入口與行事曆提醒視覺

| 需求 | 實作位置 | 驗證方式 | 結果 |
| --- | --- | --- | --- |
| 新增「實況模式」選單頁面 | `streamer-mode.html`、全站導覽列與頁尾 | Playwright 桌機與手機導覽快照 | 通過 |
| 說明 Twitch 連接、Bits 規則、氣泡參數與本機測試 | `streamer-mode.html#streamer-setup` | Playwright 可及性快照、繁中／簡中／英文切換 | 通過 |
| 說明觸發持續時間、規則重疊及提醒優先級 | `streamer-mode.html` 的規則段落 | 與 `docs/twitch-live-mode.md` 交叉核對 | 通過 |
| 說明 OBS 專用擷取、完整顯示器舞台與視窗擷取方式 | `streamer-mode.html#obs-capture` | Playwright 桌機／手機視覺檢查 | 通過 |
| 說明帳號授權與工作坊 JSON 的本機資料界線 | `streamer-mode.html` 的帳號控制段落 | 與 `docs/twitch-live-mode.md` 交叉核對 | 通過 |
| 首頁實況主模式增加完整摘要與教學入口 | `index.html` 的 Twitch 區段 | Playwright 首頁快照與連結檢查 | 通過 |
| 行事曆提醒以活動、工作、會議、紀念日呈現的動態情境圖 | `index.html`、`assets/css/site.css` 的 `reminder-scene` | Playwright 桌機／手機截圖 | 通過 |
| 搜尋引擎可發現新頁面 | `sitemap.xml`、`streamer-mode.html` 的 canonical／社群 metadata | 靜態驗證與內容檢查 | 通過 |

## 本次驗證

- `python scripts\\validate_site.py`
- `node --check assets\\js\\site.js`
- `git diff --check`
- Playwright：`streamer-mode.html` 桌機 1440 x 1050、手機 390 x 844；繁中、簡中、英文切換；手機導覽展開；首頁桌機與手機行事曆及實況區截圖。
- Playwright 主控台：首頁與實況模式頁皆為 0 errors、0 warnings。

## 未執行項目

- 未提交、推送或發布網站；本次僅完成工作區內容與本機驗證。
