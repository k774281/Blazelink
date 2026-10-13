/*
 * Tracking, kept the same as on the WordPress pages so one Google Tag Manager
 * container serves the whole domain.
 *
 * This page replaces the WordPress home page, where the GTM4WP plugin loads
 * container GTM-598HPVWD. No plugin runs here, so the container is loaded by
 * the code below with the same dataLayer seeding, and a trigger set up once in
 * GTM fires on both. New tools go in as tags in that container rather than
 * into this file.
 *
 * Meta Pixel is the exception: the plugin's pixel only covers WordPress pages,
 * so this one is loaded here with the code Meta gave for the static sites —
 * the same id as martech-page and wordpress-design use.
 */

export const GTM_ID = "GTM-598HPVWD";
export const PIXEL_ID = "1097994839542212";
