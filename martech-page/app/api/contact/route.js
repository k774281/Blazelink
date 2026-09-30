/*
 * Takes the contact form.
 *
 * There is no destination wired up yet. Rather than answer OK and drop the
 * enquiry on the floor — which would lose real leads without anyone noticing —
 * an unconfigured production deployment answers 503, and the form shows its
 * failure state, which tells the visitor to email service@blazelink.co instead.
 * In development it answers OK so the success state can be reviewed.
 *
 * To wire it up, set CONTACT_WEBHOOK_URL to something that accepts a JSON POST
 * — a mail service, a CRM endpoint, a Zapier/Make hook.
 */

const TOPICS = ["行銷合作詢問", "講座報名", "其他"];

function problems(body) {
  const found = [];
  const str = (v) => (typeof v === "string" ? v.trim() : "");

  if (!str(body.name)) found.push("name");
  if (!str(body.company)) found.push("company");
  if (!str(body.message)) found.push("message");
  if (!TOPICS.includes(str(body.topic))) found.push("topic");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str(body.email))) found.push("email");

  const site = str(body.website);
  if (site && !/^https?:\/\/\S+\.\S+/.test(site)) found.push("website");

  return found;
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid json" }, { status: 400 });
  }

  // The client checks the same rules, so anything arriving broken here either
  // skipped the form or is a bot; either way it does not need a friendly reply.
  const invalid = problems(body);
  if (invalid.length) {
    return Response.json({ error: "invalid", fields: invalid }, { status: 422 });
  }

  const destination = process.env.CONTACT_WEBHOOK_URL;

  if (!destination) {
    if (process.env.NODE_ENV === "production") {
      console.error(
        "contact: CONTACT_WEBHOOK_URL is not set — refusing the enquiry rather than losing it",
      );
      return Response.json({ error: "not configured" }, { status: 503 });
    }
    console.warn("contact: no CONTACT_WEBHOOK_URL; accepted without delivering");
    return Response.json({ ok: true, delivered: false });
  }

  try {
    const res = await fetch(destination, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, receivedAt: new Date().toISOString() }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
  } catch (err) {
    console.error(`contact: could not deliver — ${err.message}`);
    return Response.json({ error: "delivery failed" }, { status: 502 });
  }

  return Response.json({ ok: true, delivered: true });
}
