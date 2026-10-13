# 追蹤與 SEO：兩個靜態站如何跟 WordPress 外掛共存

blazelink.co 的 `/martech/` 與 `/web-design/` 是 Next.js 輸出的靜態檔案，直接放在 WordPress 主機上，**不經過 WordPress 渲染**。所以 WordPress 外掛不會影響、也不會自動作用在這兩個站上；兩站各自補上同樣效果的設定，讓整個網域的追蹤與 SEO 一致。

## Google Tag Manager（GTM4WP）

| | WordPress 頁面 | `/martech/`、`/web-design/` |
|---|---|---|
| 載入容器 | GTM4WP 外掛插入 `GTM-598HPVWD` | `app/_components/TagManager.js` 插入同一個容器 |
| 頁面資料 | `pagePostType`、`pageCategory`… | `siteSection: "martech"` 或 `"web-design"` |
| CF7 表單事件 | `gtm4wp.contactForm7Submitted`、`…MailSent` 等 | **同名事件**（`app/_lib/tracking.js`），內容同為 `{ event, formid, inputs }` |
| 換頁 | 每頁重新載入 | 站內換頁不重新載入；GA4「強化型評估」預設會依網址變化記錄瀏覽，請確認 GA4 資料串流中「網頁瀏覽 → 依瀏覽器記錄事件判斷網頁變更」是開啟的 |

在 GTM 裡用 `gtm4wp.contactForm7MailSent` 建的觸發條件，會同時在 WordPress 聯繫頁與兩站的表單觸發。要區分來源，可用 `siteSection` 變數（資料層變數）或網址路徑。

注意：`inputs` 包含姓名與 Email，跟 GTM4WP 一樣只放在資料層；不要把它傳進 GA4 或廣告平台。

## 新增追蹤碼（Hotjar、Meta Pixel…）

**一律加在 GTM 容器裡，不要改程式。** 加一次，WordPress 頁面與兩站都會生效：

- **Hotjar**：GTM → 新增代碼 → 「Hotjar Tracking Code」範本 → 觸發條件「All Pages」。
- **Meta Pixel**：例外，直接寫在程式裡（2026-10-12，使用者提供的基本程式碼，Pixel `1097994839542212`）。三個站都有：首頁 landing（`pages/_app.jsx`）、`/martech/` 與 `/web-design/`（`app/_components/MetaPixel.js`）。每頁記錄 `PageView`（站內換頁也算），聯繫表單送出成功記錄 `Lead`。**不要再在 GTM 加 Pixel**，否則會重複計算。WordPress 頁面另由 Meta for WooCommerce 外掛載入 Pixel `887803126336815`，兩個 ID 不同。

只有在需要新的資料層事件時（例如某顆按鈕的點擊）才需要改程式：在元件裡呼叫 `pushDataLayer({ event: "名稱", ... })`。

## Yoast SEO

兩站自己輸出 Yoast 會輸出的東西：

- `<title>`、description、Open Graph（`zh_TW`、站名「BlazeLink鏈客行銷」）、Twitter card。
- **canonical**：每頁指向自己在 blazelink.co 的網址。**專欄文章例外**：同一篇在 WordPress 也有，canonical 指向 WordPress 原文（例如 `https://blazelink.co/website-material-checklist/`），排名不會被兩個網址分散。
- **sitemap**：`/martech/sitemap.xml`、`/web-design/sitemap.xml`。專欄裡在 WordPress 也有的文章不列入（Yoast 已經列了）。

### 把兩站的 sitemap 加進 Yoast 的 sitemap index（需要做一次）

在 WordPress 的 **Code Snippets** 新增一段，執行位置選「Run snippet everywhere」：

```php
add_filter( 'wpseo_sitemap_index', function ( $index ) {
	foreach ( array( 'martech', 'web-design' ) as $section ) {
		$index .= '<sitemap><loc>' . esc_url( home_url( "/{$section}/sitemap.xml" ) ) . '</loc>'
			. '<lastmod>' . esc_html( gmdate( 'c' ) ) . '</lastmod></sitemap>';
	}
	return $index;
} );
```

存好後打開 `https://blazelink.co/sitemap_index.xml`，最後應該多出這兩筆。Search Console 已提交 `sitemap_index.xml` 的話不用再提交。

`robots.txt` 由 Yoast 管理，不擋 `/martech/`、`/web-design/`，不用改。

## Polylang

- 兩站目前只有中文，`<html lang="zh-TW">` 與 Polylang 對中文頁的宣告一致。
- `/martech/`、`/web-design/` 不在 Polylang 的語言前綴（`/en/`、`/ja/`）底下，不會互相干擾。Polylang 的「依瀏覽器語言轉址」只作用在首頁。
- 之後要做英文、日文版時，建議放在各站自己的路徑下（例如 `/martech/en/`），並在兩站加上 `hreflang` 互相指向；屆時再改 `alternates.languages`。

## 上線後檢查清單

1. GTM 預覽模式（Tag Assistant）連到 `https://blazelink.co/web-design/contact/`，確認容器載入、送出表單後出現 `gtm4wp.contactForm7MailSent`。
2. GA4 即時報表：在兩站換幾頁，確認有網頁瀏覽。
3. `https://blazelink.co/sitemap_index.xml` 有兩站的 sitemap。
4. 任一專欄文章頁的原始碼，`<link rel="canonical">` 指向 WordPress 原文。
