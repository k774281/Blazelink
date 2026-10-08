/*
 * Sends an enquiry straight to Contact Form 7 on blazelink.co from the
 * browser. The site is static and served from blazelink.co itself, so there is
 * no server of our own in between; CF7 checks the reCAPTCHA v3 token just as it
 * does for the WordPress contact page. The site key is public by design.
 */

export const RECAPTCHA_KEY = "6LdJFacoAAAAAKhX4fV6RSQtwWWsnCuveu47V1pH";

const ENDPOINT = "https://blazelink.co/wp-json/contact-form-7/v1/contact-forms/644/feedback";
const FORM_ID = "644";

// Our field names on the left, the CF7 form's on the right.
const FIELDS = {
  name: "your-name",
  company: "your-company",
  website: "your-url",
  email: "your-email",
  topic: "your-topic",
  message: "your-message",
};

function recaptchaToken() {
  return new Promise((resolve, reject) => {
    const g = window.grecaptcha;
    if (!g) return reject(new Error("reCAPTCHA not loaded"));
    g.ready(() => g.execute(RECAPTCHA_KEY, { action: "contactform" }).then(resolve, reject));
  });
}

/** CF7 answers 200 even when it refuses an enquiry, so only mail_sent counts. */
export async function sendEnquiry(values) {
  const body = new FormData();
  body.set("_wpcf7", FORM_ID);
  body.set("_wpcf7_locale", "zh_TW");
  body.set("_wpcf7_unit_tag", `wpcf7-f${FORM_ID}-o1`);
  body.set("_wpcf7_recaptcha_response", await recaptchaToken());
  for (const [ours, theirs] of Object.entries(FIELDS)) body.set(theirs, (values[ours] ?? "").trim());

  const res = await fetch(ENDPOINT, { method: "POST", body });
  const result = await res.json().catch(() => null);
  if (!res.ok || result?.status !== "mail_sent") throw new Error(result?.status ?? `HTTP ${res.status}`);
}
