# 首頁換成 landing page

`https://blazelink.co/` 原本是 WordPress 的首頁（頁面 ID 68）。換成 landing page 的做法跟 `/martech/`、`/web-design/` 一樣：靜態檔案放在主機上，**WordPress 本身不用改設定**。

- landing page 打包成 `deploy/landing.zip`（`scripts/package-static.sh`），解壓縮到 WordPress 根目錄的 `/landing/`。
- WordPress 的 Code Snippets 加一段程式（`wp-snippets/landing-home.php`）：有人打開 `/`，就回傳 `/landing/index.html`；`/en/`、`/ja/` 回傳英文、日文版（`/landing/en/`、`/landing/ja/`）。網址列不變。
- WordPress 的首頁頁面不刪，只是 `/` 不再顯示它。要退回，把這段 snippet 停用即可，立刻恢復。

## 為什麼用 snippet，不用 .htaccess

這台主機不讀 `.htaccess`（2026-10-12 實測：規則貼進根目錄的 `.htaccess` 完全沒有作用；WordPress 的網址規則寫在伺服器設定檔裡，像 AWS Lightsail 的 Bitnami 架構）。伺服器設定檔要 SSH 才能改，所以改在 WordPress 最早能執行程式的地方攔下 `/`，在佈景主題和外掛輸出任何東西之前回傳 landing page。

snippet 只攔「沒有參數、或只有廣告追蹤參數的 GET `/`」。WooCommerce 結帳時會呼叫 `/?wc-ajax=…`，WordPress 的搜尋、預覽也都走 `/?…`，這些仍然交給 WordPress。也不能直接在根目錄放 `index.html`：同樣會把這些請求攔走。

## landing page 從 WordPress 首頁接手的東西

| WordPress 首頁（Yoast、Polylang、GTM4WP） | landing page |
|---|---|
| canonical `https://blazelink.co/` | 同 |
| hreflang：中文 `/`、英文 `/en/`、日文 `/ja/` | 同；頁尾的語言切換也連到這三個 |
| meta description、OG 分享圖 | 沿用 Yoast 的描述與同一張分享圖 |
| 結構化資料（Organization、WebSite） | 同 |
| `<html lang="zh-TW">` | 同 |
| GTM `GTM-598HPVWD` | 同一個容器，資料層 `siteSection: "landing"` |
| Meta Pixel（Meta for WooCommerce 外掛，`887803126336815`） | 程式內建 Pixel `1097994839542212`，見 `tracking-and-seo.md` |
| 英文、日文瀏覽器自動轉到 `/en/`、`/ja/` | snippet 把這些訪客交給 WordPress，照舊轉址 |

**Meta Pixel**：外掛只作用在 WordPress 頁面；landing page 與兩站改在程式裡載入使用者提供的 Pixel，說明見 `tracking-and-seo.md`。

## 上線步驟

1. 執行 `scripts/package-static.sh`，上傳 `deploy/landing.zip` 到 WordPress 根目錄並解壓縮，會得到 `/landing/` 資料夾。
2. 先打開 `https://blazelink.co/landing/`，確認畫面與圖片正常。
3. Code Snippets 新增「Landing page at /」，貼上 `wp-snippets/landing-home.php`，執行位置選「Run snippet everywhere」，儲存並啟用。
4. 打開 `https://blazelink.co/`，應該看到 landing page。
5. 確認 WordPress 的功能沒有受影響：結帳、`/en/`、`/ja/`、`/wp-admin/`。

`/landing/` 本身仍然打得開（主機直接提供檔案，snippet 管不到），它的 canonical 指向 `/`，搜尋引擎會以 `/` 為準。

## 退回

到 Snippets 把「Landing page at /」停用，首頁立刻變回 WordPress。
