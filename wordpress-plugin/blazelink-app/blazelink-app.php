<?php
/**
 * Plugin Name: Blazelink App Template
 * Description: Adds a page template that serves the Blazelink React app as a bare HTML shell, skipping the active theme (Astra) and Elementor entirely.
 * Version: 1.0.0
 */

if (!defined('ABSPATH')) exit;

define('BLAZELINK_APP_TEMPLATE', 'blazelink-app-template.php');

// Makes the template selectable from Page Attributes → Template in wp-admin.
add_filter('theme_page_templates', function ($templates) {
    $templates[BLAZELINK_APP_TEMPLATE] = 'Blazelink App（無主題外殼）';
    return $templates;
});

// When that template is selected, serve our own file instead of anything
// the active theme would normally render — no get_header()/wp_head()/
// get_footer()/wp_footer(), so Astra and Elementor never load.
add_filter('template_include', function ($template) {
    if (is_page() && get_page_template_slug() === BLAZELINK_APP_TEMPLATE) {
        return plugin_dir_path(__FILE__) . 'template-blazelink-app.php';
    }
    return $template;
});
