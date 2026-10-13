# 開發與上線流程

## 分支

| 分支 | 放什麼 |
|---|---|
| `master` | 正式版。只放已經上線、或確定可以上線的內容。 |
| `dev` | 平常開發的地方。改動先進這裡，確認後才合回 `master`。 |
| `feat/…`、`fix/…` | 較大的單項改動（例如新頁面、改版），從 `dev` 開出，完成後合回 `dev`。 |

## 平常開發

1. 切到 `dev`：`git switch dev`
2. 修改、commit、push。
3. 在本機預覽確認（見下方）。

## 上線

1. 本機預覽確認沒問題。
2. 合回正式版：
   ```bash
   git switch master
   git merge dev
   git push
   ```
3. 打包：`sh scripts/package-static.sh`，產出 `deploy/landing.zip`、`deploy/martech.zip`、`deploy/web-design.zip`。
4. 用 WP File Manager 上傳 zip 檔，解壓縮時選覆蓋。
5. 標記這次上線的版本：
   ```bash
   git tag deploy-YYYY-MM-DD
   git push --tags
   ```
6. 切回 `dev` 繼續開發：`git switch dev`，再 `git merge master` 讓兩邊一致。

只發新文章或新講座時不用重新上線，網站開頁面時會即時抓 WordPress 的內容。

## 本機預覽

打包後把三個 zip 解壓縮到同一個資料夾，用一個依正式站規則回應 `/`、`/en/`、`/ja/` 的本機伺服器打開
（`/` → `landing/index.html`，`/en/` → `landing/en/index.html`，`/ja/` → `landing/ja/index.html`，其餘照檔案路徑）。
各頁、各語言點過一遍，特別看英文與日文版的手機畫面。

## 退回

- **網站**：找出上一個 `deploy-…` 標記，`git switch --detach deploy-YYYY-MM-DD` 後重新打包上傳，再 `git switch dev` 回來。
- **Snippet**：每段 snippet 的目前內容都在 `docs/web-build/wp-snippets/`。修改 WordPress 上的 snippet 前，先更新這裡的檔案並 commit，出錯時把 Git 裡的上一版貼回去。
- **WordPress 的大改動**（結帳流程、外掛更新、主題）：先在 AWS Lightsail 對主機拍快照，出問題可以整台還原。
