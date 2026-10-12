/*
 * Tracking, kept the same as on the WordPress pages so one Google Tag Manager
 * container serves the whole domain.
 *
 * On blazelink.co the GTM4WP plugin loads container GTM-598HPVWD and pushes
 * its own events to `dataLayer`. These pages are not rendered by WordPress, so
 * no plugin runs here; TagManager loads the same container and the helpers
 * below push the same event names GTM4WP does, so a trigger set up once in GTM
 * fires on both.
 *
 * New tools — Hotjar, Meta Pixel and the like — go in as tags in that GTM
 * container rather than into this code: they then reach these pages and the
 * WordPress pages alike, and can listen to the events pushed here.
 */

export const GTM_ID = "GTM-598HPVWD";

export function pushDataLayer(entry) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(entry);
}

// GTM4WP's names for Contact Form 7's outcomes (its contact-form-7 tracker).
const CF7_EVENTS = {
  submit: "gtm4wp.contactForm7Submitted",
  sent: "gtm4wp.contactForm7MailSent",
  failed: "gtm4wp.contactForm7MailFailed",
  invalid: "gtm4wp.contactForm7InvalidInput",
  spam: "gtm4wp.contactForm7SpamDetected",
};

/**
 * Reports a CF7 outcome the way GTM4WP does on the WordPress contact page:
 * { event, formid, inputs } with inputs as CF7's [{ name, value }] list.
 */
export function trackCf7(outcome, formId, inputs = {}) {
  pushDataLayer({
    event: CF7_EVENTS[outcome],
    formid: formId,
    inputs: Object.entries(inputs).map(([name, value]) => ({ name, value })),
  });
}
