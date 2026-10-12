/*
 * Code Snippets: "Checkout in the new site's look"
 * Run snippet everywhere. Paste without an opening <?php tag.
 *
 * Cart, checkout and order-received are WooCommerce pages rendered by the old
 * Flatsome theme, so they would carry its header, menu and footer back to the
 * old site. On those pages this swaps them for a slim bar in the new site's
 * look (logo home, back to the shop), steps, and a minimal footer. The
 * WooCommerce form, ECPay gateways and order flow are untouched: this changes
 * only markup around them and styles.
 *
 * Switching the snippet off restores the old look at once.
 */

function blz_shop_url() {
	return home_url( '/web-design/shop/' );
}

/*
 * "Buy now" goes straight to checkout, where "added to your cart" is noise.
 * Emptying the message isn't enough (Flatsome still draws its tick), so the
 * success notice is dropped; errors, such as out of stock, still show.
 */
add_action( 'template_redirect', function () {
	if ( empty( $_GET['buy-now'] ) || ! function_exists( 'wc_get_notices' ) ) {
		return;
	}
	$notices = wc_get_notices();
	unset( $notices['success'] );
	wc_set_notices( $notices );
} );

/* An empty cart's "return to shop" leads to the new shop, not the old /mall/. */
add_filter( 'woocommerce_return_to_shop_redirect', function () {
	return blz_shop_url();
} );

add_action( 'wp', function () {
	if ( ! function_exists( 'is_checkout' ) || ! ( is_checkout() || is_cart() ) ) {
		return;
	}

	if ( is_wc_endpoint_url( 'order-received' ) ) {
		$page = array( 'eyebrow' => 'ORDER RECEIVED', 'title' => '訂單完成', 'step' => 3 );
	} elseif ( is_wc_endpoint_url( 'order-pay' ) ) {
		$page = array( 'eyebrow' => 'PAYMENT', 'title' => '付款', 'step' => 2 );
	} elseif ( is_cart() ) {
		$page = array( 'eyebrow' => 'CART', 'title' => '購物車', 'step' => 1 );
	} else {
		$page = array( 'eyebrow' => 'CHECKOUT', 'title' => '結帳', 'step' => 1 );
	}

	add_filter( 'body_class', function ( $classes ) {
		$classes[] = 'blz-checkout';
		return $classes;
	} );

	add_action( 'wp_enqueue_scripts', function () {
		wp_enqueue_style( 'blz-checkout-fonts', 'https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Montserrat:wght@600&family=Noto+Sans+TC:wght@400;500;700&display=swap', array(), null );
		wp_register_style( 'blz-checkout', false, array(), '1' );
		wp_enqueue_style( 'blz-checkout' );
		wp_add_inline_style( 'blz-checkout', blz_checkout_css() );
	}, 100 );

	/* Section titles in the new site's words. */
	add_filter( 'gettext_woocommerce', function ( $translation, $text ) {
		$ours = array(
			'Billing details'        => '聯絡資料',
			'Additional information' => '訂單備註（選填）',
			'Your order'             => '訂單摘要',
		);
		return $ours[ $text ] ?? $translation;
	}, 10, 2 );

	add_action( 'wp_body_open', function () use ( $page ) {
		$steps = array( 1 => '填寫資料', 2 => '綠界付款', 3 => '完成訂單' );
		?>
		<header class="blz-bar">
			<a href="<?php echo esc_url( home_url( '/' ) ); ?>"><img src="<?php echo esc_url( home_url( '/web-design/home/logo.png' ) ); ?>" alt="BLAZELINK 鏈客" width="188" height="63"></a>
			<a class="blz-back" href="<?php echo esc_url( blz_shop_url() ); ?>">←&nbsp;&nbsp;回商城</a>
		</header>
		<div class="blz-wrap blz-head">
			<div>
				<p class="blz-eyebrow"><?php echo esc_html( $page['eyebrow'] ); ?></p>
				<h1><?php echo esc_html( $page['title'] ); ?></h1>
			</div>
			<ol class="blz-steps">
				<?php foreach ( $steps as $n => $label ) : ?>
					<li class="<?php echo $n === $page['step'] ? 'is-current' : ( $n < $page['step'] ? 'is-done' : '' ); ?>"<?php echo $n === $page['step'] ? ' aria-current="step"' : ''; ?>><b>0<?php echo (int) $n; ?></b><?php echo esc_html( $label ); ?></li>
				<?php endforeach; ?>
			</ol>
		</div>
		<?php
	} );

	add_action( 'wp_footer', function () {
		?>
		<footer class="blz-foot-line">
			<div class="blz-wrap blz-foot">
				<p>Copyright <?php echo esc_html( gmdate( 'Y' ) ); ?> © 鏈客策略行銷股份有限公司</p>
				<nav aria-label="政策">
					<a href="<?php echo esc_url( home_url( '/web-design/terms/' ) ); ?>">服務條款</a>
					<a href="<?php echo esc_url( home_url( '/web-design/privacy-policy/' ) ); ?>">隱私權政策</a>
				</nav>
			</div>
		</footer>
		<?php
	}, 1 );

	/* What happens after paying, and the way back, on the order-received page. */
	add_action( 'woocommerce_thankyou', function () {
		?>
		<section class="blz-next">
			<p class="blz-eyebrow">NEXT STEPS</p>
			<ol>
				<li><strong>12 小時內寄出授權</strong><span>款項入帳後，Flatsome 寄送授權金鑰；Astra Pro 會寄信請你回覆要啟用的網站網址，完成綁定後再通知你。</span></li>
				<li><strong>收到電子發票</strong><span>發票會寄到你填寫的 Email，不用另外申請。</span></li>
				<li><strong>有問題直接回信</strong><span>回覆訂單確認信，或來信 service@blazelink.co。</span></li>
			</ol>
			<div class="blz-actions">
				<a href="<?php echo esc_url( blz_shop_url() ); ?>">回商城&nbsp;&nbsp;→</a>
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>">回首頁</a>
			</div>
		</section>
		<?php
	}, 20 );
} );

function blz_checkout_css() {
	return <<<'CSS'
body.blz-checkout {
	--blz-canvas: #0a0a0f;
	--blz-surface: #14141b;
	--blz-surface-2: #1c1c25;
	--blz-line: #2a2a35;
	--blz-ink: #f2f1f5;
	--blz-muted: #8e8c99;
	--blz-faint: #5e5c6b;
	--blz-teal: #8fd1d2;
	--blz-lavender: #baaaee;
	--blz-lavender-hover: #d3c6ff;
	--blz-error: #ff8a80;
	--blz-sans: "Noto Sans TC", "PingFang TC", sans-serif;
	--blz-mono: "DM Mono", "Noto Sans TC", monospace;
	background: var(--blz-canvas);
	color: var(--blz-ink);
	font-family: var(--blz-sans);
}
body.blz-checkout :is(h1, h2, h3, h4, p, label, td, th, li, input, textarea, select, button, a) {
	font-family: var(--blz-sans);
}
body.blz-checkout #wrapper,
body.blz-checkout #main {
	background: transparent;
}

/* Flatsome's header, footer and step bar give way to ours. */
body.blz-checkout #header,
body.blz-checkout #footer,
body.blz-checkout .checkout-page-title,
body.blz-checkout .woocommerce-form-login-toggle,
body.blz-checkout form.woocommerce-form-login,
body.blz-checkout .woocommerce-account-fields {
	display: none !important;
}

.blz-bar {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 40px 64px;
	border-bottom: 1px solid var(--blz-line);
}
.blz-bar img {
	display: block;
	width: 188px;
	height: auto;
}
.blz-back {
	color: var(--blz-lavender) !important;
	font-size: 17px;
	font-weight: 500;
}

.blz-wrap,
body.blz-checkout .page-checkout.container {
	max-width: 1360px;
	margin: 0 auto;
	padding-left: 40px;
	padding-right: 40px;
}
.blz-head {
	display: flex;
	flex-wrap: wrap;
	align-items: flex-end;
	justify-content: space-between;
	gap: 24px;
	padding-top: 72px;
	padding-bottom: 48px;
}
.blz-eyebrow {
	margin: 0 0 16px;
	color: var(--blz-teal);
	font: 600 14px/1 Montserrat, sans-serif !important;
	letter-spacing: 0.2em;
}
.blz-head h1 {
	margin: 0;
	color: var(--blz-ink);
	font-size: 48px;
	font-weight: 700;
	line-height: 1.2;
}
.blz-steps {
	display: flex;
	align-items: center;
	gap: 56px;
	margin: 0;
	padding: 0;
	list-style: none;
}
.blz-steps li {
	position: relative;
	display: flex;
	align-items: center;
	gap: 8px;
	margin: 0;
	padding: 8px 16px;
	border: 1px solid var(--blz-line);
	border-radius: 999px;
	color: var(--blz-muted);
	font-size: 14px;
	font-weight: 500;
}
.blz-steps li + li::before {
	content: "";
	position: absolute;
	top: 50%;
	left: -44px;
	width: 32px;
	height: 1px;
	background: var(--blz-line);
}
.blz-steps b {
	color: var(--blz-faint);
	font: 500 13px var(--blz-mono);
}
.blz-steps .is-current {
	border-color: var(--blz-lavender);
	background: rgba(186, 170, 238, 0.16);
	color: var(--blz-lavender);
}
.blz-steps .is-current b,
.blz-steps .is-done b {
	color: var(--blz-lavender);
}

/* Columns and cards */
body.blz-checkout .page-checkout {
	padding-bottom: 120px;
}
/* Margins, not gap: Flatsome's clearfix pseudo-elements count as flex items. */
body.blz-checkout form.checkout > .row {
	width: auto;
	max-width: none;
	margin: 0;
	flex-wrap: nowrap;
}
body.blz-checkout form.checkout > .row > .col {
	padding: 0;
	flex: 1 1 auto;
	max-width: none;
}
body.blz-checkout form.checkout > .row > .large-7 {
	flex: 1 1 0;
	width: auto;
}
body.blz-checkout form.checkout > .row > .large-5 {
	flex: 0 0 480px;
	margin-left: 64px;
}
body.blz-checkout #customer_details,
body.blz-checkout .col-inner.has-border {
	padding: 56px;
	border: 1px solid var(--blz-line) !important;
	border-radius: 4px;
	background: var(--blz-surface);
}
body.blz-checkout .col-inner.has-border {
	padding: 40px;
}
body.blz-checkout :is(.woocommerce-billing-fields, .woocommerce-additional-fields, .woocommerce-shipping-fields) {
	padding-top: 0;
	border-top: 0;
}
body.blz-checkout #customer_details .clear + .clear {
	margin-top: 48px;
}
body.blz-checkout :is(#customer_details h3, #order_review_heading) {
	display: flex;
	align-items: center;
	gap: 14px;
	margin: 0 0 24px;
	padding: 0;
	border: 0;
	color: var(--blz-ink);
	font-size: 22px;
	font-weight: 700;
	text-transform: none;
	letter-spacing: 0;
}
body.blz-checkout .woocommerce-billing-fields h3::before,
body.blz-checkout .woocommerce-additional-fields h3::before {
	content: "01";
	color: var(--blz-teal);
	font: 500 14px var(--blz-mono);
}
body.blz-checkout .woocommerce-additional-fields h3::before {
	content: "02";
}
body.blz-checkout .woocommerce-billing-fields__field-wrapper {
	display: grid;
	grid-template-columns: 1fr 1fr;
	column-gap: 20px;
}
body.blz-checkout .woocommerce-billing-fields__field-wrapper > .form-row {
	grid-column: 1 / -1;
	float: none;
	width: auto;
	margin-right: 0;
}
body.blz-checkout .woocommerce-billing-fields__field-wrapper > :is(.form-row-first, .form-row-last) {
	grid-column: auto;
}
body.blz-checkout .woocommerce-billing-fields__field-wrapper::before {
	content: "訂單確認信和授權資料都會寄到這個 Email。";
	grid-column: 1 / -1;
	display: block;
	margin: -12px 0 24px;
	color: var(--blz-muted);
	font-size: 14px;
	line-height: 1.7;
}

/* Fields */
body.blz-checkout .form-row {
	margin-bottom: 24px;
	padding: 0;
}
body.blz-checkout .form-row label:not(.checkbox) {
	margin-bottom: 10px;
	color: var(--blz-ink);
	font-size: 14px;
	font-weight: 500;
}
body.blz-checkout .required,
body.blz-checkout abbr.required {
	color: var(--blz-lavender);
	text-decoration: none;
}
body.blz-checkout .optional {
	color: var(--blz-muted);
}
body.blz-checkout :is(input.input-text, textarea, select, .select2-selection) {
	height: 56px;
	padding: 0 20px;
	border: 1px solid var(--blz-line) !important;
	border-radius: 4px;
	background: var(--blz-surface-2) !important;
	box-shadow: none !important;
	color: var(--blz-ink) !important;
	font-size: 15px;
	margin-bottom: 0;
}
body.blz-checkout #order_comments_field > label {
	display: none;
}
body.blz-checkout textarea {
	height: 120px;
	min-height: 120px;
	padding: 18px 20px;
	line-height: 1.8;
}
body.blz-checkout :is(input.input-text, textarea)::placeholder {
	color: var(--blz-faint);
}
body.blz-checkout :is(input.input-text, textarea):focus {
	border-color: var(--blz-lavender) !important;
	box-shadow: 0 0 0 0.5px var(--blz-lavender) !important;
}
body.blz-checkout .woocommerce-invalid :is(input.input-text, textarea) {
	border-color: var(--blz-error) !important;
}

/* Order summary */
body.blz-checkout .checkout-sidebar {
	margin: 0;
}
body.blz-checkout .shop_table {
	margin-bottom: 28px;
	border: 0;
}
body.blz-checkout .shop_table :is(th, td) {
	padding: 16px 0;
	border-color: var(--blz-line) !important;
	color: var(--blz-muted);
	font-size: 15px;
	font-weight: 400;
	text-transform: none;
	letter-spacing: 0;
}
body.blz-checkout .shop_table thead {
	display: none;
}
body.blz-checkout .shop_table .cart_item td {
	padding-top: 0;
	color: var(--blz-ink);
	font-size: 15px;
	line-height: 1.6;
}
body.blz-checkout .shop_table .product-quantity {
	color: var(--blz-muted);
	font: 400 14px var(--blz-mono);
}
body.blz-checkout .shop_table .amount {
	color: var(--blz-ink);
	font-family: var(--blz-mono);
	font-weight: 400;
}
body.blz-checkout .shop_table .order-total th {
	color: var(--blz-ink);
	font-size: 18px;
	font-weight: 500;
	vertical-align: bottom;
}
body.blz-checkout .shop_table .order-total .amount {
	font-size: 32px;
}
body.blz-checkout .shop_table tfoot tr:last-child :is(th, td) {
	border-bottom: 0;
}

/* Payment methods. The site's custom CSS hides this list, leaving the first
   gateway (ATM) as the way to pay; that is kept as is. These styles only
   apply if the list is shown again. */
body.blz-checkout #payment {
	background: transparent;
}
body.blz-checkout #payment .payment_methods {
	flex-direction: column;
	gap: 12px;
	margin: 0 0 28px;
	padding: 0;
	border: 0;
	list-style: none;
}
body.blz-checkout #payment .payment_methods li {
	position: relative;
	margin: 0;
	padding: 18px 20px 18px 52px;
	border: 1px solid var(--blz-line);
	border-radius: 4px;
	cursor: pointer;
}
body.blz-checkout #payment .payment_methods li:has(input:checked) {
	border-color: var(--blz-lavender);
	background: rgba(186, 170, 238, 0.1);
}
body.blz-checkout #payment .payment_methods input.input-radio {
	appearance: none;
	-webkit-appearance: none;
	position: absolute;
	top: 22px;
	left: 20px;
	width: 18px;
	height: 18px;
	margin: 0;
	border: 1.5px solid var(--blz-faint);
	border-radius: 50%;
	background: transparent;
	box-shadow: none;
}
body.blz-checkout #payment .payment_methods input.input-radio:checked {
	border: 6px solid var(--blz-lavender);
}
body.blz-checkout #payment .payment_methods label {
	display: block;
	margin: 0;
	color: var(--blz-ink);
	font-size: 16px;
	font-weight: 500;
	cursor: pointer;
}
body.blz-checkout #payment .payment_methods label img {
	display: none;
}
body.blz-checkout #payment .payment_box {
	margin: 4px 0 0;
	padding: 0;
	background: transparent;
	color: var(--blz-muted);
	font-size: 14px;
}
body.blz-checkout #payment .payment_box::before {
	display: none;
}
body.blz-checkout #payment .payment_box p {
	margin: 0;
}
body.blz-checkout #payment .place-order {
	padding: 0;
}
body.blz-checkout .woocommerce-terms-and-conditions-wrapper label {
	color: var(--blz-ink);
	font-size: 14px;
}
/* appearance: none turns the box into an inline element, so it needs a block size. */
body.blz-checkout input[type="checkbox"].input-checkbox {
	appearance: none;
	-webkit-appearance: none;
	position: relative;
	display: inline-block;
	flex-shrink: 0;
	width: 20px;
	min-width: 20px;
	height: 20px;
	margin: 0 10px 0 0;
	padding: 0;
	vertical-align: -5px;
	border: 1.5px solid var(--blz-muted);
	border-radius: 4px;
	background: var(--blz-surface-2);
	box-shadow: none;
	cursor: pointer;
}
body.blz-checkout input[type="checkbox"].input-checkbox:checked {
	border-color: var(--blz-lavender);
	background: var(--blz-lavender);
}
body.blz-checkout input[type="checkbox"].input-checkbox:checked::after {
	content: "";
	position: absolute;
	left: 6px;
	top: 2px;
	width: 5px;
	height: 10px;
	border: solid var(--blz-canvas);
	border-width: 0 2px 2px 0;
	transform: rotate(45deg);
}
body.blz-checkout .woocommerce-invalid input[type="checkbox"].input-checkbox {
	border-color: var(--blz-error);
}
body.blz-checkout input[type="checkbox"].input-checkbox:focus-visible {
	outline: 2px solid var(--blz-lavender);
	outline-offset: 2px;
}
body.blz-checkout .woocommerce-terms-and-conditions-wrapper a {
	color: var(--blz-lavender);
}
body.blz-checkout .woocommerce-terms-and-conditions {
	margin-bottom: 16px;
	padding: 16px;
	border: 1px solid var(--blz-line);
	background: var(--blz-surface-2);
	color: var(--blz-muted);
	font-size: 13px;
}
body.blz-checkout #place_order {
	width: 100%;
	margin: 20px 0 0;
	padding: 20px !important;
	border: 0;
	border-radius: 999px;
	background: var(--blz-lavender);
	color: var(--blz-canvas);
	font-size: 18px !important;
	font-weight: 500;
	letter-spacing: 0;
	text-transform: none;
}
body.blz-checkout #place_order:hover {
	opacity: 0.9;
	box-shadow: none;
}
body.blz-checkout .woocommerce-privacy-policy-text,
body.blz-checkout .woocommerce-privacy-policy-text p {
	margin-top: 16px;
	color: var(--blz-muted);
	font-size: 13px;
	line-height: 1.7;
}
body.blz-checkout .woocommerce-privacy-policy-text a {
	color: var(--blz-lavender);
}

/* Coupon and notices */
body.blz-checkout .woocommerce-form-coupon-toggle .woocommerce-info {
	margin-bottom: 24px;
	padding: 0;
	border: 0;
	background: transparent;
	color: var(--blz-muted);
	font-size: 15px;
}
body.blz-checkout .woocommerce-form-coupon-toggle .message-container {
	max-width: none;
	margin: 0;
	padding: 0;
	text-align: left;
}
body.blz-checkout .woocommerce-form-coupon-toggle a {
	color: var(--blz-lavender);
}
body.blz-checkout .checkout_coupon {
	margin-bottom: 32px;
	padding: 24px;
	border: 1px dashed var(--blz-line);
	border-radius: 4px;
	background: var(--blz-surface);
}
body.blz-checkout .checkout_coupon .button {
	height: 56px;
	border-radius: 999px;
	background: transparent;
	border: 1px solid var(--blz-line);
	color: var(--blz-ink);
}
body.blz-checkout :is(.woocommerce-error, .woocommerce-message, .woocommerce-info):not(.woocommerce-form-coupon-toggle *) {
	margin-bottom: 24px;
	padding: 0;
	border: 0;
	background: transparent;
	box-shadow: none;
	color: var(--blz-ink);
	font-size: 14px;
	line-height: 1.9;
}
/* Flatsome centres notices on small screens; they sit with the form instead. */
body.blz-checkout :is(.woocommerce-error, .woocommerce-message, .woocommerce-info) .message-container {
	max-width: none;
	margin: 0;
	padding: 0;
	text-align: left !important;
}
body.blz-checkout .woocommerce-error,
body.blz-checkout .woocommerce-error li {
	color: var(--blz-error);
}
body.blz-checkout .woocommerce-error li {
	margin: 0;
	padding: 0;
	list-style: none;
}
body.blz-checkout .checkout-inline-error-message {
	margin: 8px 0 0;
	color: var(--blz-error);
	font-size: 13px;
}

/* Order received */
body.blz-checkout .woocommerce-order {
	color: var(--blz-ink);
}
body.blz-checkout .woocommerce-order :is(p, li, h2, h3, address) {
	color: var(--blz-ink);
}
body.blz-checkout .woocommerce-order :is(.amount, .amount bdi, .woocommerce-Price-currencySymbol) {
	color: var(--blz-ink);
}
body.blz-checkout .woocommerce-order :is(h2, h3) {
	margin-bottom: 20px;
	font-size: 22px;
	font-weight: 700;
}

/* Thin dark rules in place of Flatsome's heavy light ones. */
body.blz-checkout .woocommerce-order :is(table, thead, tbody, tfoot, tr) {
	border: 0 !important;
}
body.blz-checkout .woocommerce-order :is(th, td) {
	border-top: 0 !important;
	border-right: 0 !important;
	border-left: 0 !important;
	border-bottom: 1px solid var(--blz-line) !important;
	color: var(--blz-ink);
}
body.blz-checkout .woocommerce-order th {
	color: var(--blz-muted);
	font-weight: 400;
}
body.blz-checkout .woocommerce-order tr:last-child > :is(th, td) {
	border-bottom: 0 !important;
}

body.blz-checkout .woocommerce-order address {
	padding: 0;
	border: 0;
	font-style: normal;
	line-height: 1.8;
}

/* The summary beside the order reads as a card. */
body.blz-checkout .woocommerce-order :is(.is-well, .large-5 > .col-inner) {
	padding: 40px;
	border: 1px solid var(--blz-line);
	border-radius: 4px;
	background: var(--blz-surface);
	box-shadow: none;
}
body.blz-checkout .woocommerce-order-overview {
	margin: 0;
	padding: 0;
	list-style: none;
}
body.blz-checkout .woocommerce-order-overview li {
	margin: 0;
	padding: 14px 0;
	border-bottom: 1px solid var(--blz-line);
	color: var(--blz-muted);
	font-size: 15px;
	list-style: none;
}
body.blz-checkout .woocommerce-order-overview li:last-child {
	border-bottom: 0;
}
body.blz-checkout .woocommerce-order-overview strong {
	color: var(--blz-ink);
	font-weight: 500;
}

/* Links stay lavender, and brighten rather than grey out on hover. */
body.blz-checkout .woocommerce a {
	color: var(--blz-lavender);
	transition: color 0.15s;
}
body.blz-checkout .woocommerce a:not(.blz-actions a):is(:hover, :focus-visible),
body.blz-checkout .blz-back:is(:hover, :focus-visible) {
	color: var(--blz-lavender-hover) !important;
	opacity: 1;
}
body.blz-checkout .blz-foot a:is(:hover, :focus-visible) {
	color: var(--blz-lavender) !important;
}
body.blz-checkout .blz-next {
	margin: 40px 0;
	padding: 40px;
	border: 1px solid var(--blz-line);
	border-radius: 4px;
	background: var(--blz-surface);
}
body.blz-checkout .blz-next ol {
	display: grid;
	gap: 20px;
	margin: 20px 0 32px;
	padding: 0;
	list-style: none;
	counter-reset: blz;
}
body.blz-checkout .blz-next li {
	display: grid;
	grid-template-columns: 36px 1fr;
	gap: 4px 16px;
	margin: 0;
	counter-increment: blz;
}
body.blz-checkout .blz-next li::before {
	content: "0" counter(blz);
	grid-row: span 2;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 36px;
	height: 36px;
	border: 1px solid var(--blz-line);
	border-radius: 999px;
	background: var(--blz-surface-2);
	color: var(--blz-lavender);
	font: 500 13px var(--blz-mono);
}
body.blz-checkout .blz-next strong {
	color: var(--blz-ink);
	font-size: 16px;
	font-weight: 500;
}
body.blz-checkout .blz-next span {
	color: var(--blz-muted);
	font-size: 14px;
	line-height: 1.7;
}
.blz-actions {
	display: flex;
	flex-wrap: wrap;
	gap: 12px;
}
.blz-actions a {
	padding: 16px 28px;
	border: 1px solid var(--blz-line);
	border-radius: 999px;
	color: var(--blz-ink) !important;
	font-size: 16px;
	font-weight: 500;
}
.blz-actions a:first-child {
	border-color: var(--blz-lavender);
	background: var(--blz-lavender);
	color: var(--blz-canvas) !important;
}
.blz-actions a:first-child:is(:hover, :focus-visible) {
	border-color: var(--blz-lavender-hover);
	background: var(--blz-lavender-hover);
}
.blz-actions a:not(:first-child):is(:hover, :focus-visible) {
	border-color: var(--blz-lavender);
	color: var(--blz-lavender-hover) !important;
}

/* Footer */
.blz-foot {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-between;
	gap: 16px;
	padding-top: 32px;
	padding-bottom: 32px;
}
.blz-foot-line {
	border-top: 1px solid var(--blz-line);
}
.blz-foot p {
	margin: 0;
	color: var(--blz-muted);
	font: 400 13px var(--blz-mono);
}
.blz-foot nav {
	display: flex;
	gap: 32px;
}
.blz-foot a {
	color: var(--blz-muted) !important;
	font-size: 13px;
}

@media (max-width: 849px) {
	.blz-bar {
		padding: 20px 24px;
	}
	.blz-bar img {
		width: 140px;
	}
	.blz-wrap,
	body.blz-checkout .page-checkout.container {
		padding-left: 24px;
		padding-right: 24px;
	}
	.blz-head {
		padding-top: 40px;
		padding-bottom: 32px;
	}
	.blz-head h1 {
		font-size: 36px;
	}
	.blz-steps li {
		padding: 6px 12px;
		font-size: 13px;
	}
	.blz-steps {
		gap: 8px;
	}
	.blz-steps li + li::before {
		display: none;
	}
	body.blz-checkout form.checkout > .row {
		flex-wrap: wrap;
	}
	body.blz-checkout form.checkout > .row > .col,
	body.blz-checkout form.checkout > .row > .large-5 {
		flex: 1 1 100%;
		margin-left: 0;
	}
	body.blz-checkout form.checkout > .row > .large-5 {
		margin-top: 24px;
	}
	body.blz-checkout #customer_details,
	body.blz-checkout .col-inner.has-border {
		padding: 28px 24px;
	}
	body.blz-checkout .woocommerce-billing-fields__field-wrapper {
		grid-template-columns: 1fr;
	}
	body.blz-checkout .woocommerce-billing-fields__field-wrapper > :is(.form-row-first, .form-row-last) {
		grid-column: 1 / -1;
	}
	.blz-foot {
		flex-direction: column;
		align-items: flex-start;
	}
}
CSS;
}
