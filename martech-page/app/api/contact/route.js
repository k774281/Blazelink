/*
 * Takes the contact form and hands it to Contact Form 7 on blazelink.co, so an
 * enquiry from this site lands exactly where one from the WordPress form does:
 * the same notification mail, the same SMTP, the same stored record.
 *
 * CF7 guards that form with reCAPTCHA v3, which cannot be satisfied from a
 * server — the token only exists in a browser. WordPress therefore carries a
 * snippet that skips CF7's spam checks for requests bearing CONTACT_WP_TOKEN.
 * That makes this route the only gate in front of the form, which is why the
 * guards below are here rather than left to CF7.
 *
 * Needs, on the deployment:
 *   CONTACT_WP_ENDPOINT  https://blazelink.co/wp-json/contact-form-7/v1/contact-forms/<id>/feedback
 *   CONTACT_WP_TOKEN     the same secret the WordPress snippet compares against
 *
 * An unconfigured production deployment answers 503 rather than OK: answering
 * OK would drop real enquiries on the floor with nobody noticing.
 */

import { form } from "@/app/_data/contact";

// The same list the form offers, which in turn mirrors CF7's own options.
const TOPICS = form.topics;

// Our field names on the left, form 644's on the right.
const FIELDS = {
  name: "your-name",
  company: "your-company",
  website: "your-url",
  email: "your-email",
  topic: "your-topic",
  message: "your-message",
};

const str = (v) => (typeof v === "string" ? v.trim() : "");

function problems(body) {
  const found = [];

  if (!str(body.name)) found.push("name");
  if (!str(body.company)) found.push("company");
  if (!str(body.message)) found.push("message");
  if (!TOPICS.includes(str(body.topic))) found.push("topic");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str(body.email))) found.push("email");

  const site = str(body.website);
  if (site && !/^https?:\/\/\S+\.\S+/.test(site)) found.push("website");

  return found;
}

/*
 * Best-effort throttle. Serverless instances do not share memory, so this
 * blunts a burst against one instance rather than stopping a distributed
 * flood — it is here to make casual abuse unrewarding. If spam actually starts
 * arriving, the answer is a challenge in front of the form (Turnstile), not a
 * bigger number here.
 */
const recent = new Map();
const WINDOW = 60_000;
const BURST = 5;

function tooMany(ip) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((at) => now - at < WINDOW);
  hits.push(now);
  recent.set(ip, hits);

  if (recent.size > 500) {
    for (const [key, times] of recent) {
      if (!times.some((at) => now - at < WINDOW)) recent.delete(key);
    }
  }

  return hits.length > BURST;
}

async function deliver(body) {
  const endpoint = process.env.CONTACT_WP_ENDPOINT;
  const id = endpoint.match(/contact-forms\/(\d+)\/feedback/)?.[1] ?? "";

  const payload = new FormData();
  payload.set("_wpcf7", id);
  payload.set("_wpcf7_locale", "zh_TW");
  payload.set("_wpcf7_unit_tag", `wpcf7-f${id}-o1`);
  for (const [ours, theirs] of Object.entries(FIELDS)) {
    payload.set(theirs, str(body[ours]));
  }

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "X-Blazelink-Token": process.env.CONTACT_WP_TOKEN ?? "",
      // CF7 treats a missing or stub User-Agent as spam on its own.
      "User-Agent": "blazelink-martech/1.0 (+https://blazelink.co)",
    },
    body: payload,
    cache: "no-store",
  });

  // CF7 answers 200 even when it refuses the submission, so the body decides.
  // Anything other than mail_sent means the enquiry did not go anywhere.
  const result = await res.json().catch(() => null);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  if (result?.status !== "mail_sent") {
    throw new Error(result?.status ?? "no status in reply");
  }
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid json" }, { status: 400 });
  }

  // Nothing fills this but a script reading the markup. Answer as though it
  // worked, so whatever sent it has no reason to come back and try harder.
  if (str(body.fax)) {
    return Response.json({ ok: true, delivered: false });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (tooMany(ip)) {
    return Response.json({ error: "too many" }, { status: 429 });
  }

  // The client checks the same rules, so anything arriving broken here either
  // skipped the form or is a bot; either way it does not need a friendly reply.
  const invalid = problems(body);
  if (invalid.length) {
    return Response.json({ error: "invalid", fields: invalid }, { status: 422 });
  }

  if (!process.env.CONTACT_WP_ENDPOINT || !process.env.CONTACT_WP_TOKEN) {
    if (process.env.NODE_ENV === "production") {
      console.error(
        "contact: CONTACT_WP_ENDPOINT/CONTACT_WP_TOKEN are not set — refusing the enquiry rather than losing it",
      );
      return Response.json({ error: "not configured" }, { status: 503 });
    }
    console.warn("contact: WordPress is not configured; accepted without delivering");
    return Response.json({ ok: true, delivered: false });
  }

  try {
    await deliver(body);
  } catch (err) {
    console.error(`contact: Contact Form 7 did not take it — ${err.message}`);
    return Response.json({ error: "delivery failed" }, { status: 502 });
  }

  return Response.json({ ok: true, delivered: true });
}
