"use client";

import { useState } from "react";
import Link from "next/link";

import Header from "../_components/Header";
import SiteFooter from "../_components/SiteFooter";
import CtaPill from "../_components/CtaPill";
import Eyebrow from "../_components/Eyebrow";
import { SelectField, TextField } from "../_components/FormField";
import { intro, form, success } from "@/app/_data/contact";

/*
 * 聯繫我們. The page is its own closing panel, so the footer gets no panel above
 * it and no ON THIS PAGE column — there are no sections here to list.
 */

const EMPTY = { name: "", company: "", website: "", email: "", topic: null, message: "" };

function validate(values) {
  const errors = {};
  const { required, email, url } = form.errors;

  if (!values.name.trim()) errors.name = required;
  if (!values.company.trim()) errors.company = required;
  if (!values.topic) errors.topic = required;
  if (!values.message.trim()) errors.message = required;

  if (!values.email.trim()) errors.email = required;
  // Deliberately loose: the server and the mail itself are the real check, and
  // a strict pattern here only ever turns away addresses that work.
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = email;

  const site = values.website.trim();
  if (site && !/^https?:\/\/\S+\.\S+/.test(site)) errors.website = url;

  return errors;
}

function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [state, setState] = useState("editing"); // editing | sending | sent | failed

  const set = (field) => (value) => {
    setValues((v) => ({ ...v, [field]: value }));
    // Clear a field's complaint as soon as it is being dealt with, rather than
    // leaving it shouting until the next submit.
    setErrors((e) => (e[field] ? { ...e, [field]: undefined } : e));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      document.querySelector("[aria-invalid='true']")?.focus();
      return;
    }

    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setState("sent");
    } catch {
      setState("failed");
    }
  };

  if (state === "sent") {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-[16px] rounded-[50px] bg-white px-6 py-[56px] shadow-card md:px-[48px] lg:w-[620px]">
        <span className="flex size-[60px] items-center justify-center rounded-[50px] bg-brand-tint">
          <img src="/figma/icon-check.svg" alt="" width={26} height={26} />
        </span>
        <h2 className="text-[26px] font-bold tracking-[-0.52px] text-ink">
          {success.title}
        </h2>
        <p className="max-w-[380px] text-center text-[15px] leading-[1.85] text-muted">
          {success.body}
        </p>
        <Link
          href="/"
          className="group underline-grow inline-flex items-center gap-[10px] border-b border-solid border-brand pb-[8px] text-[16px] font-medium text-brand"
        >
          {success.cta}
          <span className="relative size-[25px] shrink-0 overflow-hidden rounded-[50px] bg-brand-tint">
            <img
              src="/figma/arrow-purple.svg"
              alt=""
              width={17}
              height={17}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 ease-in-out group-hover:translate-x-[220%]"
            />
            <img
              src="/figma/arrow-purple.svg"
              alt=""
              width={17}
              height={17}
              className="absolute top-1/2 left-1/2 -translate-x-[280%] -translate-y-1/2 transition-transform duration-500 ease-in-out group-hover:-translate-x-1/2"
            />
          </span>
        </Link>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="flex w-full flex-col items-start gap-[24px] rounded-[50px] bg-white px-6 py-[36px] shadow-card md:p-[48px] lg:w-[620px]"
    >
      <div className="flex flex-col items-start gap-[6px]">
        <h2 className="text-[24px] font-bold tracking-[-0.48px] text-ink">
          {form.title}
        </h2>
        <p className="text-[13px] text-muted">{form.note}</p>
      </div>

      <div className="flex w-full flex-col gap-[20px] sm:flex-row">
        <TextField
          label="姓名"
          name="name"
          placeholder="例：王小明"
          required
          value={values.name}
          onChange={set("name")}
          error={errors.name}
        />
        <TextField
          label="公司名稱"
          name="company"
          placeholder="例：鏈客策略行銷"
          required
          value={values.company}
          onChange={set("company")}
          error={errors.company}
        />
      </div>

      <div className="flex w-full flex-col gap-[20px] sm:flex-row">
        <TextField
          label="公司網址（選填）"
          name="website"
          type="url"
          placeholder="https://"
          value={values.website}
          onChange={set("website")}
          error={errors.website}
        />
        <TextField
          label="電子郵件"
          name="email"
          type="email"
          placeholder="you@company.com"
          required
          value={values.email}
          onChange={set("email")}
          error={errors.email}
        />
      </div>

      <SelectField
        label="詢問主題"
        name="topic"
        placeholder="請選擇詢問主題"
        options={form.topics}
        required
        value={values.topic}
        onChange={set("topic")}
        error={errors.topic}
      />

      <TextField
        label="諮詢內容"
        name="message"
        rows={5}
        placeholder="例如：想拓展歐美市場，但網站流量一直沒有轉成名單……"
        required
        value={values.message}
        onChange={set("message")}
        error={errors.message}
      />

      <div className="flex w-full flex-col items-start gap-[16px] pt-[8px]">
        <CtaPill as="button" type="submit" disabled={state === "sending"}>
          {state === "sending" ? form.submitting : form.submit}
        </CtaPill>

        {state === "failed" ? (
          <p role="alert" className="flex items-center gap-[7px] text-[13px] text-error">
            <img src="/figma/icon-error.svg" alt="" width={14} height={14} className="shrink-0" />
            {form.failure}
          </p>
        ) : null}

        <p className="text-[12px] leading-[1.7] text-faint">
          {form.privacy.before}
          <Link href={form.privacy.href} className="text-brand">
            {form.privacy.link}
          </Link>
          {form.privacy.after}
        </p>
      </div>
    </form>
  );
}

export default function Contact() {
  return (
    <>
      <Header />
      {/* Opaque and above the footer, so scrolling the last screen uncovers it. */}
      <main className="relative z-10 bg-white">
        <section className="-mt-[var(--header-h)] bg-white p-4 pt-[var(--header-h)] md:p-[24px] md:pt-[var(--header-h)]">
          <div
            className="flex flex-col gap-[48px] rounded-[20px] px-6 pt-[72px] pb-[64px] md:px-10 lg:flex-row lg:gap-[72px] xl:px-[120px] xl:pt-[136px] xl:pb-[96px]"
            style={{
              backgroundImage:
                "linear-gradient(-8.76deg, rgb(255,255,255) 7.84%, rgb(241,242,246) 56.75%, rgb(233,235,241) 92.16%)",
            }}
          >
            <div className="flex flex-col items-start lg:flex-1">
              <Eyebrow zh="聯繫我們" en="CONTACT" />

              <h1 className="pt-[20px] text-[34px] leading-[1.3] font-bold tracking-[-1.44px] text-ink md:text-[48px] lg:w-[460px]">
                {intro.title.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h1>

              <p className="pt-[22px] text-[17px] leading-[1.95] font-light text-body lg:w-[460px]">
                {intro.lead}
              </p>

              <div className="mt-[40px] flex w-full flex-col items-start gap-[20px] border-t border-solid border-[#dfe1e8] pt-[32px]">
                <Eyebrow zh="接下來會怎麼進行" en="NEXT STEPS" />

                {intro.steps.map((step) => (
                  <div key={step.no} className="flex items-start gap-[16px]">
                    <span className="font-mono-brand flex size-[36px] shrink-0 items-center justify-center rounded-[50px] bg-brand-tint text-[13px] font-bold tracking-[0.78px] text-brand">
                      {step.no}
                    </span>
                    <div className="flex flex-col items-start gap-[4px] pt-[6px]">
                      <p className="text-[17px] font-bold text-ink">{step.title}</p>
                      <p className="max-w-[408px] text-[14px] leading-[1.8] text-muted">
                        {step.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <dl className="mt-[40px] flex w-full flex-col items-start gap-[12px] rounded-[34px] border border-solid border-line bg-white/70 px-[28px] py-[24px]">
                {intro.details.map((row) => (
                  <div key={row.label} className="flex items-center gap-[16px]">
                    <dt className="w-[64px] shrink-0 text-[13px] font-medium text-faint">
                      {row.label}
                    </dt>
                    <dd className="text-[15px] text-ink">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <ContactForm />
          </div>
        </section>
      </main>
      <SiteFooter onThisPage={null} />
    </>
  );
}
