"use client";

import { useState } from "react";
import { BUREAUS } from "@/lib/site";
import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/locales";

type Status = "idle" | "submitting" | "success" | "error";

const inputCls =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20";

export default function ContactForm({
  locale,
  form,
}: {
  locale: Locale;
  form: Dictionary["contact"]["form"];
}) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const el = e.currentTarget;
    const data = new FormData(el);
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          issue_type: data.get("issue_type"),
          bureau: data.get("bureau"),
          message: data.get("message"),
          locale,
          website: data.get("website"), // honeypot
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
      el.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-orange-200 bg-orange-50 px-6 py-14 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-600 text-white">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" aria-hidden="true">
            <path d="M4 12l5 5L20 7" />
          </svg>
        </span>
        <h3 className="mt-5 text-xl font-bold text-slate-900">{form.successTitle}</h3>
        <p className="mt-2 max-w-md text-slate-600">{form.successDesc}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate={false}>
      {/* Honeypot — hidden from humans, bots fill it */}
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="mb-1.5 block text-sm font-semibold text-slate-700">
            {form.name} <span className="text-red-500">*</span>
          </label>
          <input id="cf-name" name="name" type="text" required maxLength={120} autoComplete="name" className={inputCls} />
        </div>
        <div>
          <label htmlFor="cf-phone" className="mb-1.5 block text-sm font-semibold text-slate-700">
            {form.phone} <span className="text-red-500">*</span>
          </label>
          <input id="cf-phone" name="phone" type="tel" required maxLength={20} autoComplete="tel" inputMode="tel" className={inputCls} />
        </div>
      </div>

      <div>
        <label htmlFor="cf-email" className="mb-1.5 block text-sm font-semibold text-slate-700">
          {form.email} <span className="text-red-500">*</span>
        </label>
        <input id="cf-email" name="email" type="email" required maxLength={160} autoComplete="email" className={inputCls} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-issue" className="mb-1.5 block text-sm font-semibold text-slate-700">
            {form.issueType} <span className="text-red-500">*</span>
          </label>
          <select id="cf-issue" name="issue_type" required className={inputCls} defaultValue="">
            <option value="" disabled hidden />
            {form.issueOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="cf-bureau" className="mb-1.5 block text-sm font-semibold text-slate-700">
            {form.bureau}
          </label>
          <select id="cf-bureau" name="bureau" className={inputCls} defaultValue={form.bureauAny}>
            <option value={form.bureauAny}>{form.bureauAny}</option>
            {BUREAUS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="cf-message" className="mb-1.5 block text-sm font-semibold text-slate-700">
          {form.message} <span className="text-red-500">*</span>
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={5}
          maxLength={4000}
          placeholder={form.messagePlaceholder}
          className={inputCls}
        />
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {form.error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-xl bg-orange-600 px-6 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? form.submitting : form.submit}
      </button>

      <p className="text-xs leading-relaxed text-slate-500">{form.privacyNote}</p>
    </form>
  );
}
