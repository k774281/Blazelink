# 商城「立即購買」

`/web-design/shop/` 的「立即購買」連到 WooCommerce 結帳頁，商品直接放進購物車：

| 商品 | WooCommerce ID | 連結 |
|---|---|---|
| Flatsome | 1293 | `/checkout/?add-to-cart=1293&buy-now=1` |
| Astra Pro | 1285 | `/checkout/?add-to-cart=1285&buy-now=1` |

WooCommerce 本身在任何頁面都接受 `add-to-cart`，所以不用改設定。但它會**累加**：同一個連結點兩次，Astra Pro 就變成 2 件（Flatsome 設了「限購一件」，會出現錯誤訊息）。`buy-now=1` 交給下面的 snippet 先清空購物車，訂單只會有這一件。

## Code Snippets：Buy now empties the cart

執行位置選「Only run on site front-end」：

```php
add_filter( 'woocommerce_add_to_cart_validation', function ( $passed ) {
	if ( ! empty( $_GET['buy-now'] ) && WC()->cart ) {
		WC()->cart->empty_cart();
	}
	return $passed;
} );
```

## 改價格或新增商品時

WooCommerce 的價格才是實際收費；`wordpress-design/app/_data/shop.js` 的 `price`、`listPrice` 只是顯示用，兩邊要一起改。新增商品要在那裡填上它的 `wcId`。
