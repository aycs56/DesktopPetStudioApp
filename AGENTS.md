# 官方網站 Git 工作區規則

此目錄是唯一的官方網站 Git 工作區：`G:\Desktop idea\DesktopPetStudioApp-site-publish`。

## 身分驗證

- 預期分支為 `main`。
- 唯一可用的 `origin` 為 `https://github.com/aycs56/DesktopPetStudioApp.git`。
- 每次執行 fetch、pull、push、發布、reset 或 clean 前，先執行：
  1. `git rev-parse --show-toplevel`，必須輸出 `G:/Desktop idea/DesktopPetStudioApp-site-publish`。
  2. `git branch --show-current`，必須輸出 `main`。
  3. `git remote get-url origin`，必須完全等於上述 GitHub 網址。
- 任一項不符時停止，不得自行改 remote、切換分支、重設歷史或推送。

## 與桌寵程式的隔離

- Qt 桌寵應用程式唯一工作區是 `G:\Desktop idea`，使用本機 `local-qt-main` 分支，且不應設定 remote。
- `G:\Desktop idea\DesktopPetStudio-local` 是桌寵的獨立本機安全副本，使用 `local-main` 分支，且不應設定 remote。
- 絕不可在本網站 repo 初始化、加入、刪除、搬移、合併或推送上述任一桌寵工作區；也不可將桌寵原始碼、`.git`、虛擬環境、建置結果或本機設定加入網站提交。
- 只有經過選定的桌寵截圖可以複製成網站 `assets` 下的發布資產；不得以整個資料夾複製方式共用兩個專案。

## 舊路徑與刪除防護

- `G:\Desktop idea\official-site` 是已清除的錯誤舊路徑，永遠不是官方網站 repo。不可重新建立、clone、初始化或從那裡發布。
- 不得從本目錄對父目錄或兄弟目錄使用遞迴刪除、搬移、`git clean`、`git reset --hard`、`git restore` 或萬用字元操作。
- 若任務涉及刪除或還原，必須先確認目標的絕對路徑仍位於本網站 Git 根目錄內，再依使用者明確授權執行。

## 操作範圍

- `git status`、`git add`、commit、push 與部署僅能作用於此網站 checkout。
- 變更本規則不代表可自動提交、推送或發布；必須有使用者明確指示。
