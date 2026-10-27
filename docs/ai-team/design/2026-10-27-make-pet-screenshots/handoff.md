# 「製作專屬桌寵」截圖更新 v1.0

日期：2026-10-27。正式頁：`make-your-pet.html`。

## 範圍與確認

使用者將任務限縮為「僅『製作專屬桌寵』畫面的畫面截圖請更新」，並在檢視預覽後確認「採用並更新截圖」。本次更新四步驟的繁中、簡中、英文截圖，共 12 張；只同步圖片 URL、實際尺寸及同一張首步截圖的社群預覽 URL。正文、alt、圖說、版型、CSS、JS、首頁及其他頁面保持原樣。

正式網站根目錄 `G:\Desktop idea\DesktopPetStudioApp-site-publish`，分支 `main`，origin 已核對為指定 GitHub 網址。桌寵來源根目錄 `G:\Desktop idea`，分支 `local-qt-main`、無 remote，僅執行隔離畫面擷取。未操作安全副本或舊 official-site 路徑。素材更新階段遵循 AGENTS.md 保留未提交變更；2026-10-27 使用者後續明確要求上傳 GitHub，因此本次可提交並推送這組已確認的網站更新。

## PM／角色決策與追溯

分類：web / low / bounded media maintenance / quick。沿用 `../../2026-08-25-make-your-pet-current-qt-user-stories.md`、`../../2026-08-25-make-your-pet-current-qt-functional-requirements.md` 及 UI/UX 規格；這是既有圖文的素材維護，不新增功能或實質產品規劃，因此不另建 CEO 市場報告。

PM 負責範圍、Frontend 負責圖片引用、UI/UX 負責原版面中的圖片呈現、獨立 QA 負責逐張讀圖。未選 Backend／Release 操作，因無服務或發布變更。

角色工具選擇：PM 使用 project-work-governance；工程選 ponytail；設計階段候選依序 html-mockup-sketcher、ui-component-demo、taste-skill、impeccable、frontend-design，實際使用前四者的局部預覽／既有模式／讀圖審查能力，無需新視覺方向；QA 使用 Playwright 與 verification-before-completion。speak-human-tw 僅作範圍及紀錄保真，未改公開文案。全域模型設定已查為 gpt-6-astra / xhigh；獨立審查角色使用同設定。

| 條件／需求 | 結果與設計映射 | 驗證 |
| --- | --- | --- |
| 閱讀任一語系的四步教學 | 各顯示對應語系最新 Qt 截圖；`.make-pet-flow [data-lang-content]` 的四個 figure | 12 圖獨立讀圖、實際三語切換 |
| 閱讀步驟 1 | 參考素材與「開始製作素材」完整入鏡 | `step-1-qt-ai-helper-entry-*`，1280×900 |
| 閱讀步驟 2 | 模板、輸出語言、網站與複製提示詞按鈕入鏡 | `step-2-qt-prompt-output-*`，1000×1180 |
| 閱讀步驟 3 | 去背檢查、宮格裁切與開啟目標姿勢入鏡 | `step-3-qt-inspect-crop-*`，900×860 |
| 閱讀步驟 4 | 原地休息姿勢、動畫影格清單與加入素材按鈕入鏡 | `step-4-qt-pose-assets-*`，900×950 |
| 桌機或手機閱讀 | 沿用既有雙欄／單欄、圖說、object-fit: contain；沒有水平溢位 | Chrome 1440×1000、390×844 |
| 更新範圍受限 | 只有本頁圖片引用、自然尺寸與社群圖片對應值改變 | 正規化差異檢查、Git 差異審查 |

原有頁面已提供可見四步流程圖；本次沿用「入口 → 準備 → Prompt → 檢查／裁切 → 匯入 → 工作坊或回首頁」路徑，不新增畫面或互動。PM 已核對預覽四步、語系及既有文字覆蓋，結果 passed；使用者確認後套用同一 candidate。版本雜湊及確認狀態見 `revision.json`。

## 素材與設計交接

來源：當日 v1.3.0 Qt 原始碼 UI，以 Windows Qt 的 QWidget.grab 擷取實際 widget。未重畫、拼接、裁切或美化圖片；不是封裝 EXE 或 Steam 上線證據。使用隔離示範設定，擷取前後 profile bytes 一致；不啟動桌寵、Steam、Twitch、OBS、排程或帳號服務。

原始擷取與 metadata 保留於 `G:\Desktop idea\output\2026-10-27-site-make-pet`。只有明確選定的 12 張 PNG 逐 byte 複製進網站 `assets/images/make-pet/v1.3.0/`，來源、語系、尺寸與 SHA-256 見 `asset-manifest.json`。未複製程式碼、設定檔、日誌、套件或憑證進網站資產。

圖片、正文與 CSS 皆使用現有網站設計來源；沒有新圖片裁切規則或新元件。沿用既有 Image / data-and-media 決策，來源 `https://huangchiyu.com/Vibe-UI-Atlas/components/image/`；2026-10-27 嘗試開啟仍不可達，故不宣稱與來源 Demo 視覺等同。本機 shared component-pattern-library.html 的 data-and-media 已讀取，未複製或擴建元件庫。

畫面仍沿用 site.css 的文字、背景、間距、字體、陰影及 breakpoint。圖片自然比例更新；顯示最大高度仍為 520 CSS px，object-fit 仍為 contain。設計候選一份，沒有新增樣式修訂，美術調整 0/3。

## 驗證紀錄

- `python -m unittest discover -s tests`：14 PASS。更新既有媒體測試，使四步皆驗證三語圖片路徑。
- `python scripts/validate_site.py --require-publish-config`：PASS。
- 正式頁真實操作：語言選單 → 從第一步開始 → 逐步捲動閱讀。三語 × 兩尺寸 × 四圖，共 24 組載入、語系、自然尺寸、alt、完整呈現及無水平溢位檢查 PASS；無 pageerror。
- 獨立審查逐張檢視 12 張原始圖，確認必要控制項、語系、idle 及無私人資料；原圖與網站副本 hashes 全數一致。
- 預覽及正式頁畫面證據保留於 `output/playwright/make-pet-20261027/` 與其 `product/`。已檢視桌機四步與手機全頁；既有文字和圖片均未發生溢位或拉伸。
- 獨立完成覆核：桌機／手機三語全頁與繁中四步均通過；14 張比對圖中 10 張 byte 相同，其餘差異經逐圖檢查僅微量像素差，沒有內容或布局變更。正式 HTML 與批准預覽內容一致。
- 最終以 Git HEAD 的原頁逐字核對，只正規化圖片 URL 與 img 自然尺寸後完全相同；`git diff --check` 通過。證據 `output/playwright/make-pet-20261027/scope-check.json`。
- 來源圖中的產品按鈕文字反映最新 Qt；既有網站圖說仍使用舊稱「複製 Prompt／加入影格」等，依使用者指定只換圖保留，未擴大修改文案。

已診斷的工具事件：首次套用的 guard 比較了原檔 CRLF bytes 與預覽 LF text hash，未寫入正式頁；確認 Git 無該頁差異及 normalized hash 相同後，以相同 normalized hash 驗證並保留原 CRLF。首次正式頁瀏覽驗證停留在同 URL 的舊 DOM，明確檢出舊圖片 URL；以新載入 query 重新進入正式頁後 24 組全部通過。兩者皆沒有改產品程式或樣式。

GitHub 交付：使用者已追加上傳授權，沿根目錄工作規範的已確認流程提交並推送 main；既有 Pages 工作流會自動部署，推送與公開頁面結果由本次交付訊息記錄。推送前重跑 14 項測試及發布設定檢查通過，批准 HTML 與 12 張 PNG 的 hashes 均一致；fetch 後本機與遠端原始基準同為 `595d8e2`，沒有其他待推送 commit。

預覽服務僅綁定 127.0.0.1:8784，保留供使用者檢閱；沒有 worktree。擷取原圖、capture harness 與瀏覽器證據保留作來源追溯，正式頁不依賴 output 或設計暫存路徑。
