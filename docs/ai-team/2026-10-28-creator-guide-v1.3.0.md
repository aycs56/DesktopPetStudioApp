# 自訂與工作坊文案同步 v1.3.0

- 日期：2026-10-28；類型：web／低風險／既有文件與範例同步。
- 使用者要求：更新先前稽核發現過時的官網頁面與三語下載指南。
- 工作區：`G:\Desktop idea\DesktopPetStudioApp-site-publish`，`main`，既定官網 origin；開始時工作樹乾淨。
- 來源：唯讀核對 `G:\Desktop idea\desktop_pet_studio\__init__.py`（1.3.0）、`ai_prompt_spec.py`、`models.py`、`workshop.py`、三語創作者指南、Qt 特效匯出與 2026-10-27 v1.3.0 公告。
- 分工：PM 界定同步範圍；工程／文件維護者核對資料契約；QA 檢查 JSON、三語與下載流程。技能沿用 orchestrator、project-work-governance、ponytail、speak-human-tw、playwright、verification-before-completion。這是既有功能的文件校正，沒有新產品規劃、市場或商業決策。

## 使用者故事與驗收

作為創作者，我需要網頁範例與下載指南對應 v1.3.0，才能依同一份說明準備素材、設定封面並分享作品。

| 編號 | 條件與行為 | 交付位置／驗證 |
| --- | --- | --- |
| C1 | 當閱讀或下載任一語系指南時，顯示適用 v1.3.0 與更新日期；不把程式版本寫成 JSON schema 版本。 | creator-json.html、三語 Markdown；版本與 JSON 解析檢查 |
| C2 | 當使用姿勢 Prompt 時，輸出單張 3×2 六宮格 PNG，每格 256×256、5px 間距與 #0CB8EC 直角裁切輔助線，再裁切為獨立影格。 | 靜態／互動範例、Markdown、make-your-pet.html |
| C3 | 當設定直播姿勢時，分清 Bits、一般訂閱與贈送訂閱欄位，保留個別 Twitch 授權邊界。 | creator-json.html、assets/js/site.js、Markdown |
| C4 | 當製作完整桌寵包時，說明 title、pet_name、cover_path 與收藏／預覽／確認使用；不保證 Cloud 已同步。 | 頁面與 Markdown |
| C5 | 當分享 PetFX 特效時，說明獨立 petfx.json 格式、1:1 封面與匯出後檢查再上傳流程；不將它混入 pose/pet/care schema。 | 頁面與 Markdown |
| C6 | 當切換三語或下載指南時，文字與檔案一致、下載可完成，桌機與手機可閱讀。 | 真實本機瀏覽器流程及既有網站檢查 |

## 實作與設計邊界

- 沿用 `creator-json.html` 的三種 JSON 包、八主題、原生 details、code-panel、下載區與既有圖片；新增內容放入既有技術參考文章。對應設計來源為 `2026-08-07-creator-capability-overview-design.md`。
- 只校正文件、範例與相關教學文字，不改控制項職責、互動、CSS、圖片或版型，無新增視覺設計。
- Markdown 是含 JSON 範例的指南，不冒稱可直接匯入的 .json 套件。下載連結加入版本查詢參數；共用 JS 文案更新時同步所有公開頁面的 JS 快取鍵。
- 不改桌寵來源／備份 repo；不沿用任何舊官方網站路徑。2026-10-28 使用者已明確要求「請提交推送Git Hub」，授權本批官網更新提交至 main 並推送既定 origin，沿用 Pages 工作流部署。

## 驗證紀錄

- `python -B scripts/validate_site.py --require-publish-config`：通過。
- `python -B -m unittest discover -s tests`：14 項通過。
- `node --check assets/js/site.js`、`git diff --check`：通過。
- 靜態頁與三份指南的 45 個 JSON 範例／欄位片段均可解析；完整 manifest 保持 schema 1。片段加外層物件後解析，不冒稱它們能單獨匯入。
- Chromium 實際操作：1440×1000 與 390×844、繁中／簡中／英文，共 6 組語言切換與下載。每組檢查只有對應語系可見、12 個可見 JSON 範例可解析、版本／訂閱／封面／PetFX／裁切色碼齊全、無頁面水平溢出或破圖，無 JavaScript 頁面錯誤。
- 6 份瀏覽器下載內容均逐 byte 等於對應 v1.3.0 正式指南；另檢查兩尺寸三語的相鄰教學頁內容與閱讀寬度。
- 實際開啟桌機／手機截圖覆核新增文字、程式碼區塊及下載區；沿用原有程式碼水平捲動，未調整 CSS 或素材。證據：`output/playwright/creator-v130/` 的截圖、`verify.cjs`、`browser-run.log` 與 `download-checks.json`。
- 驗證腳本初次誤把簡中 HTML lang 預期成 zh-Hans；核對既有程式為 zh-CN 後修正檢查條件。另收斂過廣的舊文案搜尋，保留合法的「裁切後匯入獨立影格」敘述。兩者皆為檢查條件修正，沒有改產品行為。
- 差異核對：共用 JS 的功能程式碼不變；六個其他公開頁面僅更新 JS 快取鍵，CSS 不變。只在官網工作區修改內容，桌寵來源與備份未修改。
- C1–C6 本機驗收通過。未執行 Edge／Safari 實機驗證、Steam 真實發布或雙機 Cloud 測試；文件不保證同步完成。
- 發布階段：本機驗收完成後取得使用者明確提交／推送授權；發布前重跑必要檢查，只加入本批檔案。推送後核對遠端 main SHA、同一 SHA 的 Pages 工作流及公開三語指南內容；最終 commit／部署證據記錄於本次交付回覆與本機 output/playwright/creator-v130/。
- 暫存更新腳本已刪除；僅保留驗證證據。任務瀏覽器與本機 HTTP 預覽服務於交付前關閉。
