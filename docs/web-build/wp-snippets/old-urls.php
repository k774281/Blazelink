/*
 * Code Snippets: "Old addresses to the new sites"
 * Run snippet everywhere. Paste without an opening <?php tag.
 *
 * The Chinese site has moved to the new pages: the home page, /martech/ and
 * /web-design/. Typing or following an old WordPress address now lands on its
 * new page with a 301, so search engines move its ranking there too. The new
 * pages name themselves as canonical.
 *
 * The English and Japanese pages (Polylang, /en/ and /ja/) go to the new
 * sites' English and Japanese builds. Left alone: WooCommerce's cart, checkout
 * and account pages, previews, and anything not listed here.
 *
 * Switching the snippet off brings every old page back at once.
 */

add_action( 'template_redirect', function () {
	if ( is_admin() || is_preview() || wp_doing_ajax() ) {
		return;
	}

	$to = blz_new_address();
	if ( $to ) {
		wp_redirect( home_url( $to ), 301, 'Blazelink' );
		exit;
	}
}, 1 );

/** The new page for the address being asked for, or null to leave it be. */
function blz_new_address() {
	// Pages that moved, by their old path.
	$moved = array(
		'about'               => '/martech/about/',
		'contact'             => '/martech/contact/',
		'global-seo'          => '/martech/seo/',
		'academy'             => '/martech/academy/',
		'cases'               => '/web-design/cases/',
		'mall'                => '/web-design/shop/',
		'privacy-policy'      => '/martech/privacy-policy/',
		'term-of-use'         => '/martech/terms/',
		'category/martech'    => '/martech/column/#martech',
		'category/start-up'   => '/martech/column/#start-up',
		'category/web-design' => '/web-design/column/',
		// English
		'en/about-3'          => '/martech/en/about/',
		'en/service-2'        => '/martech/en/',
		'en/seo-marketing'    => '/martech/en/seo/',
		'en/insights'         => '/martech/en/column/',
		'en/contact-3'        => '/martech/en/contact/',
		'en/cases-3'          => '/web-design/en/cases/',
		'en/category/content-mkt' => '/martech/en/column/',
		// Japanese
		'ja/about-2'          => '/martech/ja/about/',
		'ja/service'          => '/martech/ja/',
		'ja/blog-2'           => '/martech/ja/column/',
		'ja/contact-2'        => '/martech/ja/contact/',
		'ja/cases-2'          => '/web-design/ja/cases/',
		'ja/private-policy'   => '/martech/ja/privacy-policy/',
		'ja/category/martech-jp'    => '/martech/ja/column/',
		'ja/category/leadership-jp' => '/martech/ja/column/',
	);
	$path = trim( (string) wp_parse_url( $_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH ), '/' );
	if ( isset( $moved[ $path ] ) ) {
		return $moved[ $path ];
	}

	if ( ! is_singular( array( 'post', 'product' ) ) ) {
		return null;
	}

	$post = get_queried_object();
	if ( ! $post instanceof WP_Post || 'publish' !== $post->post_status ) {
		return null;
	}

	// Products carry no language, so they count as Chinese.
	$lang = function_exists( 'pll_get_post_language' ) ? pll_get_post_language( $post->ID ) : false;
	$slug = $post->post_name;

	// English and Japanese posts: the marketing site's column in that language.
	if ( 'post' === $post->post_type && in_array( $lang, array( 'en', 'ja' ), true ) ) {
		if ( has_category( array( 'content-mkt', 'martech-jp', 'leadership-jp' ), $post ) ) {
			return blz_built_or_reader( "martech/{$lang}/column", $slug, "martech/{$lang}/column/read" );
		}
		return null;
	}
	if ( $lang && 'zh' !== $lang ) {
		return null;
	}

	if ( 'post' === $post->post_type ) {
		if ( has_category( 'web-design', $post ) ) {
			return blz_built_or_reader( 'web-design/column', $slug, null );
		}
		if ( has_category( array( 'martech', 'start-up' ), $post ) ) {
			return blz_built_or_reader( 'martech/column', $slug, 'martech/column/read' );
		}
		return null;
	}

	// Products: the two theme licences are in the shop, lectures in the academy.
	if ( in_array( $slug, array( 'astra-pro', 'flatsome' ), true ) ) {
		return "/web-design/shop/{$slug}/";
	}
	if ( has_term( 'courses', 'product_cat', $post ) ) {
		return blz_built_or_reader( 'martech/academy', $slug, 'martech/academy/read' );
	}
	return null;
}

/*
 * The page built for this slug, when it has been uploaded; one newer than the
 * last upload opens in the reader page, which loads it from WordPress, if the
 * section has one. Folders are named with the decoded slug.
 */
function blz_built_or_reader( $section, $slug, $reader ) {
	if ( is_readable( ABSPATH . $section . '/' . rawurldecode( $slug ) . '/index.html' ) ) {
		return "/{$section}/{$slug}/";
	}
	return $reader ? "/{$reader}/?slug=" . rawurlencode( rawurldecode( $slug ) ) : null;
}

/*
 * Yoast SEO's sitemaps leave out what now redirects; the new sites list those
 * pages in /martech/sitemap.xml and /web-design/sitemap.xml instead.
 */
add_filter( 'wpseo_exclude_from_sitemap_by_post_ids', function ( $ids ) {
	$posts = get_posts( array(
		'post_type'      => 'post',
		'posts_per_page' => -1,
		'fields'         => 'ids',
		'lang'           => '',
		'category_name'  => 'martech,start-up,web-design,content-mkt,martech-jp,leadership-jp',
	) );
	$products = get_posts( array(
		'post_type'      => 'product',
		'posts_per_page' => -1,
		'fields'         => 'ids',
		'tax_query'      => array( array( 'taxonomy' => 'product_cat', 'field' => 'slug', 'terms' => array( 'courses' ) ) ),
	) );
	foreach ( array( 'astra-pro', 'flatsome' ) as $slug ) {
		$licence = get_page_by_path( $slug, OBJECT, 'product' );
		if ( $licence ) {
			$products[] = $licence->ID;
		}
	}
	$pages = array();
	foreach ( array( 'about', 'contact', 'global-seo', 'academy', 'cases', 'mall', 'privacy-policy', 'term-of-use', 'about-3', 'service-2', 'seo-marketing', 'insights', 'contact-3', 'cases-3', 'about-2', 'service', 'blog-2', 'contact-2', 'cases-2', 'private-policy' ) as $slug ) {
		$page = get_page_by_path( $slug );
		if ( $page ) {
			$pages[] = $page->ID;
		}
	}
	if ( function_exists( 'wc_get_page_id' ) ) {
		$pages[] = wc_get_page_id( 'shop' );
	}
	return array_merge( (array) $ids, $posts, $products, $pages );
} );

/*
 * Yoast SEO's sitemap index also lists the new sites' own sitemaps, one per
 * language build. (This replaces the earlier "sitemap index" snippet from
 * tracking-and-seo.md; switch that one off.)
 */
add_filter( 'wpseo_sitemap_index', function ( $index ) {
	$sections = array( 'martech', 'martech/en', 'martech/ja', 'web-design', 'web-design/en', 'web-design/ja' );
	foreach ( $sections as $section ) {
		$index .= '<sitemap><loc>' . esc_url( home_url( "/{$section}/sitemap.xml" ) ) . '</loc>'
			. '<lastmod>' . esc_html( gmdate( 'c' ) ) . '</lastmod></sitemap>';
	}
	return $index;
} );
