/*
 * Code Snippets: "Landing page at /"
 * Run snippet everywhere. Paste without an opening <?php tag.
 *
 * Answers / with the static landing page uploaded to /landing/, and /en/ and
 * /ja/ with its English and Japanese builds in /landing/en/ and /landing/ja/
 * (see docs/web-build/landing-cutover.md). This host ignores .htaccess, so the
 * switch happens here, as early as WordPress runs a snippet and before any
 * theme or plugin output.
 *
 * WordPress keeps / only for what it still has to answer: anything but GET
 * or HEAD, and any query string other than ad tracking (WooCommerce's
 * ?wc-ajax=, ?add-to-cart=, searches, previews). Visitors are never handed to
 * WordPress's old home page, in any language.
 *
 * Someone arriving at / from outside the site whose browser prefers English or
 * Japanese is sent to /en/ or /ja/, as Polylang did. Anyone coming from a page
 * of this site (the language switch, a logo) stays on the Chinese page they
 * asked for. Search engines are never redirected; hreflang points them at
 * each language.
 *
 * Switching the snippet off puts the WordPress home page back at once.
 */
( function () {
	if ( is_admin() || wp_doing_ajax() || wp_doing_cron() || ( defined( 'REST_REQUEST' ) && REST_REQUEST ) ) {
		return;
	}

	$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
	if ( 'GET' !== $method && 'HEAD' !== $method ) {
		return;
	}

	$homes = array(
		'/'    => 'landing/index.html',
		'/en/' => 'landing/en/index.html',
		'/ja/' => 'landing/ja/index.html',
	);
	$path = wp_parse_url( $_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH );
	if ( ! isset( $homes[ $path ] ) ) {
		return;
	}

	$query = $_SERVER['QUERY_STRING'] ?? '';
	if ( '' !== $query && ! preg_match( '/^((utm_[a-z]+|gclid|gbraid|wbraid|fbclid|msclkid|gad_source|gad_campaignid|_gl)=[^&]*&?)*$/i', $query ) ) {
		return;
	}

	if ( '/' === $path ) {
		header( 'Vary: Accept-Language, Referer' ); // The answer at / depends on both.
		$referer  = wp_parse_url( $_SERVER['HTTP_REFERER'] ?? '', PHP_URL_HOST );
		$internal = $referer && $referer === wp_parse_url( home_url(), PHP_URL_HOST );
		$bot      = preg_match( '/bot|crawl|spider|slurp|facebookexternalhit|preview/i', $_SERVER['HTTP_USER_AGENT'] ?? '' );
		if ( ! $internal && ! $bot && preg_match( '/^(en|ja)/i', $_SERVER['HTTP_ACCEPT_LANGUAGE'] ?? '', $lang ) ) {
			$target = '/' . strtolower( $lang[1] ) . '/';
			if ( is_readable( ABSPATH . $homes[ $target ] ) ) {
				wp_redirect( home_url( $target ) . ( '' !== $query ? '?' . $query : '' ), 302 );
				exit;
			}
		}
	}

	$page = ABSPATH . $homes[ $path ];
	if ( ! is_readable( $page ) ) {
		return; // Not uploaded: WordPress's home page rather than an empty one.
	}

	status_header( 200 );
	header( 'Content-Type: text/html; charset=UTF-8' );
	header( 'Cache-Control: no-cache' );
	if ( 'HEAD' !== $method ) {
		readfile( $page );
	}
	exit;
} )();
