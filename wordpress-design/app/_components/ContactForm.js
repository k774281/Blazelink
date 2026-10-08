"use client";

import Link from "next/link";
import Script from "next/script";
import { useId, useRef, useState } from "react";
import { cf7, form, success } from "../_data/contact";

/*
 * The contact form card (Figma 318:427) and its states (318:470): fields at
 * rest, focused and in error; the submit button sending; a failure notice; and
 * the success panel that takes the card's place once CF7 has the enquiry.
 */

const EMPTY = { name: "", company: "", website: "", email: "", topic: form.defaultTopic, message: "" };

function validate(values) {
  const errors = {};
  const { required, email, url } = form.errors;

  if (!values.name.trim()) errors.name = required;
  if (!values.company.trim()) errors.company = required;
  if (!values.message.trim()) errors.message = required;

  if (!values.email.trim()) errors.email = required;
  // Deliberately loose: the server and the mail itself are the real check.
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = email;

  const site = values.website.trim();
  if (site && !/^https?:\/\/\S+\.\S+/.test(site)) errors.website = url;

  return errors;
}

/** A reCAPTCHA v3 token for CF7, once Google's script has loaded. */
function recaptchaToken() {
  return new Promise((resolve, reject) => {
    const g = window.grecaptcha;
    if (!g) return reject(new Error("reCAPTCHA not loaded"));
    g.ready(() => g.execute(cf7.recaptchaKey, { action: "contactform" }).then(resolve, reject));
  });
}

/**
 * Posts the enquiry to CF7. It answers 200 even when it refuses one, so only a
 * body reading mail_sent counts as delivered.
 */
async function deliver(values) {
  const body = new FormData();
  body.set("_wpcf7", cf7.formId);
  body.set("_wpcf7_locale", "zh_TW");
  body.set("_wpcf7_unit_tag", cf7.unitTag);
  body.set("_wpcf7_recaptcha_response", await recaptchaToken());
  for (const [ours, theirs] of Object.entries(cf7.fields)) body.set(theirs, values[ours].trim());

  const res = await fetch(cf7.endpoint, { method: "POST", body });
  const result = await res.json().catch(() => null);
  if (!res.ok || result?.status !== "mail_sent") throw new Error(result?.status ?? `HTTP ${res.status}`);
}

export default function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [state, setState] = useState("editing"); // editing | sending | sent | failed
  const card = useRef(null);

  const set = (field) => (value) => {
    setValues((v) => ({ ...v, [field]: value }));
    // Clear a field's complaint as soon as it is being dealt with.
    setErrors((e) => (e[field] ? { ...e, [field]: undefined } : e));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      card.current?.querySelector("[aria-invalid='true']")?.focus();
      return;
    }

    setState("sending");
    try {
      await deliver(values);
      setState("sent");
      card.current?.scrollIntoView({ block: "start", behavior: "smooth" });
    } catch {
      setState("failed");
    }
  };

  const shell = "flex min-w-0 flex-1 flex-col gap-7 rounded-[4px] border border-line bg-surface p-6 sm:p-10 lg:p-14";

  if (state === "sent") {
    return (
      <div ref={card} role="status" className={`${shell} scroll-mt-12 items-start gap-5 py-14 lg:py-[72px]`}>
        <span aria-hidden className="flex size-16 items-center justify-center rounded-full bg-lavender/16 text-[28px] font-bold text-lavender">
          ✓
        </span>
        <p className="font-display text-sm font-semibold tracking-[0.2em] text-teal">{success.eyebrow}</p>
        <h2 className="font-mono text-[28px] font-medium text-ink lg:text-[36px]">{success.title}</h2>
        <p className="text-[17px] leading-[1.9] text-muted">{success.body}</p>
        <div className="flex flex-wrap gap-3 pt-3">
          <Link href={success.primary.href} className="whitespace-pre rounded-full bg-lavender px-7 py-4 text-base font-medium text-canvas transition-opacity hover:opacity-90">
            {`${success.primary.label}  →`}
          </Link>
          <Link href={success.secondary.href} className="rounded-full border border-line px-7 py-4 text-base font-medium text-ink transition-colors hover:border-muted">
            {success.secondary.label}
          </Link>
        </div>
      </div>
    );
  }

  const sending = state === "sending";

  return (
    <form ref={card} noValidate onSubmit={onSubmit} className={`relative ${shell}`}>
      <div className="flex flex-col gap-2 pb-2">
        <h2 className="font-mono text-[26px] font-medium text-ink">{form.title}</h2>
        <p className="text-sm text-muted">{form.note}</p>
      </div>

      <div className="flex flex-col gap-7 sm:flex-row sm:gap-5">
        <Field label="姓名" name="name" autoComplete="name" placeholder="例：王小明" required value={values.name} onChange={set("name")} error={errors.name} />
        <Field label="公司名稱" name="company" autoComplete="organization" placeholder="例：鏈客策略行銷" required value={values.company} onChange={set("company")} error={errors.company} />
      </div>
      <div className="flex flex-col gap-7 sm:flex-row sm:gap-5">
        <Field label="現有網站網址（選填）" name="website" type="url" autoComplete="url" placeholder="https://" value={values.website} onChange={set("website")} error={errors.website} />
        <Field label="電子郵件" name="email" type="email" autoComplete="email" placeholder="you@company.com" required value={values.email} onChange={set("email")} error={errors.email} />
      </div>

      <fieldset className="flex flex-col gap-3">
        <legend className="mb-3 text-sm font-medium text-ink">
          詢問主題 <span className="text-lavender">*</span>
        </legend>
        <div className="flex flex-wrap gap-2.5">
          {form.topics.map((topic) => (
            <label key={topic} className="cursor-pointer">
              <input type="radio" name="topic" value={topic} checked={values.topic === topic} onChange={() => set("topic")(topic)} className="peer sr-only" />
              <span className="block rounded-full border border-line px-[22px] py-[11px] text-[15px] font-medium text-ink transition-colors hover:border-muted peer-checked:border-lavender peer-checked:bg-lavender/16 peer-checked:text-lavender peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-lavender">
                {topic}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <Field label="詢問內容" name="message" rows={6} placeholder="例如：想把現有網站改版成形象網站，希望手機版也好看……" required value={values.message} onChange={set("message")} error={errors.message} />

      <div className="flex flex-col items-start gap-4 pt-2">
        <button
          type="submit"
          disabled={sending}
          className="group/send flex items-center gap-3 rounded-full bg-lavender py-1 pl-1 pr-7 text-[17px] font-medium text-canvas transition-colors hover:bg-ink disabled:cursor-wait disabled:opacity-60 disabled:hover:bg-lavender"
        >
          <span aria-hidden className="flex size-12 items-center justify-center rounded-full bg-canvas/12 font-display text-xl font-semibold transition-transform group-hover/send:translate-x-0.5">
            →
          </span>
          {sending ? form.submitting : form.submit}
        </button>

        {state === "failed" && (
          <p role="alert" className="rounded-[4px] border border-error/40 bg-error/10 px-[18px] py-3.5 text-sm text-error">
            {form.failure}
          </p>
        )}

        <Script src={`https://www.google.com/recaptcha/api.js?render=${cf7.recaptchaKey}`} strategy="afterInteractive" />

        <p className="text-[13px] leading-[1.7] text-muted">
          {form.privacy.before}
          <a href={form.privacy.href} className="text-lavender hover:underline">
            {form.privacy.link}
          </a>
          {form.privacy.after}
        </p>
      </div>
    </form>
  );
}

/** A labelled input, or a textarea when `rows` is given. */
function Field({ label, name, type = "text", rows, placeholder, required = false, autoComplete, value, onChange, error }) {
  const id = useId();
  const errorId = `${id}-error`;
  const Tag = rows ? "textarea" : "input";

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-2.5">
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
        {required && <span className="text-lavender"> *</span>}
      </label>
      <Tag
        id={id}
        name={name}
        type={rows ? undefined : type}
        rows={rows}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`w-full rounded-[4px] border bg-surface-2 px-5 text-[15px] text-ink outline-none transition-[border-color,box-shadow] placeholder:text-faint ${
          rows ? "h-[168px] resize-none py-[18px] leading-[1.8]" : "h-14"
        } ${error ? "border-error shadow-[0_0_0_0.5px_var(--color-error)]" : "border-line focus:border-lavender focus:shadow-[0_0_0_0.5px_var(--color-lavender)]"}`}
      />
      {error && (
        <p id={errorId} className="text-[13px] text-error">
          {error}
        </p>
      )}
    </div>
  );
}
