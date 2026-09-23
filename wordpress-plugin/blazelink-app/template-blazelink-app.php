<?php
/**
 * Bare shell for the Blazelink React app. Deliberately does not call
 * get_header() / wp_head() / get_footer() / wp_footer() — that's what keeps
 * Astra and Elementor's CSS/JS from loading on this page.
 *
 * app.js / app.css / the images referenced with root-absolute paths (e.g.
 * /bg 2.png) all need to live at the WordPress site's document root — the
 * same level as wp-config.php — for this to render correctly.
 */
if (!defined('ABSPATH')) exit;
?><!doctype html>
<html lang="zh-Hant">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Blazelink 鏈客行銷 — 自動化獲客的成長引擎</title>
  <meta name="description" content="為 B2B 企業、知識服務、跨國品牌打造，自動化獲客的成長引擎，讓品牌擁有可持續的正向循環。" />
  <link href="https://font.emtech.cc/css/LXGWFasmartGothic/400" rel="stylesheet" />
  <link href="https://font.emtech.cc/css/GlowSansJP/500" rel="stylesheet" />
  <link href="https://font.emtech.cc/css/GlowSansJP/700" rel="stylesheet" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@600;700&family=Covered+By+Your+Grace&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/app.css" />
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/app.js"></script>
</body>
</html>
