import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import ScoreGauge from "@/components/ScoreGauge";
import ServiceIcon from "@/components/ServiceIcon";
import { getDictionary } from "@/lib/i18n";
import { isLocale, type Locale } from "@/lib/i18n/locales";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import { serviceSlugs } from "@/lib/services";
import { site, BUREAUS } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = (isLocale(locale) ? locale : "en") as Locale;
  const dict = getDictionary(l);
  return {
    ...buildMetadata({
      locale: l,
      path: "",
      title: dict.meta.home.title,
      description: dict.meta.home.description,
    }),
    // Home page keeps its full branded title (no template suffix)
    title: { absolute: dict.meta.home.title },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const base = `/${locale}`;

  return (
    <>
      <JsonLd data={faqJsonLd(dict.faq.items)} />

      {/* ============================= HERO ============================= */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-orange-50 via-white to-white text-slate-900">
        {/* decorative glow */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-orange-300/40 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 sm:pt-20 lg:px-8 lg:pb-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="animate-rise inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-orange-700 sm:text-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                {dict.hero.badge}
              </p>
              <h1 className="animate-rise-delay-1 mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
                {dict.hero.title1}{" "}
                <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                  {dict.hero.titleHighlight}
                </span>{" "}
                {dict.hero.title2}
              </h1>
              <p className="animate-rise-delay-2 mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
                {dict.hero.subtitle}
              </p>
              <div className="animate-rise-delay-2 mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`${base}/contact`}
                  className="rounded-full bg-orange-600 px-7 py-3.5 text-center text-base font-semibold text-white shadow-lg shadow-orange-600/25 transition hover:bg-orange-500"
                >
                  {dict.hero.cta1}
                </Link>
                <Link
                  href={`${base}/services`}
                  className="rounded-full border border-slate-300 px-7 py-3.5 text-center text-base font-semibold text-slate-800 transition hover:border-orange-400 hover:text-orange-600"
                >
                  {dict.hero.cta2}
                </Link>
              </div>
            </div>

            <div className="mx-auto w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-orange-100 sm:p-10">
              <ScoreGauge label={dict.hero.gaugeLabel} />
            </div>
          </div>

          {/* Stats */}
          <dl className="mt-14 grid grid-cols-2 gap-6 border-t border-slate-200 pt-10 sm:grid-cols-4">
            {dict.hero.stats.map((s) => (
              <div key={s.label} className="text-center sm:text-left">
                <dt className="order-2 text-xs font-medium uppercase tracking-wide text-slate-500 sm:text-sm">
                  {s.label}
                </dt>
                <dd className="order-1 text-3xl font-extrabold text-orange-600 sm:text-4xl">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ========================= BUREAUS STRIP ======================== */}
      <section aria-label={dict.bureaus.title} className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium text-slate-500">{dict.bureaus.title}</p>
          <ul className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {BUREAUS.map((b) => (
              <li
                key={b}
                className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold tracking-wide text-navy-800 shadow-sm sm:text-base"
              >
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* =========================== PROBLEMS =========================== */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {dict.problems.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            {dict.problems.subtitle}
          </p>
        </div>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {dict.problems.items.map((item) => (
            <li
              key={item.title}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-md"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5" aria-hidden="true">
                  <path d="M12 8v5M12 16.5v.5" />
                  <path d="M10.3 3.9L2.6 17.1A2 2 0 0 0 4.3 20h15.4a2 2 0 0 0 1.7-2.9L13.7 3.9a2 2 0 0 0-3.4 0z" />
                </svg>
              </span>
              <h3 className="mt-4 text-lg font-bold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* =========================== SERVICES =========================== */}
      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              {dict.services.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              {dict.services.subtitle}
            </p>
          </div>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {serviceSlugs.map((slug) => {
              const svc = dict.services.items[slug];
              return (
                <li key={slug}>
                  <Link
                    href={`${base}/services/${slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-md"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600 transition group-hover:bg-orange-600 group-hover:text-white">
                      <ServiceIcon slug={slug} />
                    </span>
                    <h3 className="mt-5 text-lg font-bold text-slate-900">{svc.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{svc.short}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-orange-600">
                      {dict.services.learnMore}
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ============================ PROCESS ============================ */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {dict.process.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            {dict.process.subtitle}
          </p>
        </div>
        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {dict.process.steps.map((step, i) => (
            <li key={step.title} className="relative">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-600 text-lg font-extrabold text-white">
                  {i + 1}
                </span>
                {i < dict.process.steps.length - 1 && (
                  <span aria-hidden="true" className="hidden h-px flex-1 bg-slate-200 lg:block" />
                )}
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ============================ WHY US ============================= */}
      <section className="border-y border-slate-200 bg-slate-50 py-16 text-slate-900 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{dict.why.title}</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              {dict.why.subtitle}
            </p>
          </div>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2">
            {dict.why.items.map((item) => (
              <li key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                    <path d="M4 12l5 5L20 7" />
                  </svg>
                </span>
                <h3 className="mt-4 text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============================== FAQ ============================== */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {dict.faq.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            {dict.faq.subtitle}
          </p>
        </div>
        <div className="mt-10 space-y-3">
          {dict.faq.items.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-slate-200 bg-white shadow-sm open:border-orange-300"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-slate-900 sm:px-6 sm:text-lg [&::-webkit-details-marker]:hidden">
                {item.q}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="faq-chevron h-5 w-5 shrink-0 text-orange-600 transition-transform" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </summary>
              <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600 sm:px-6 sm:text-base">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ============================== CTA ============================== */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-600 to-amber-700 px-6 py-14 text-center text-white sm:px-12 sm:py-16">
          <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">
            {dict.cta.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-orange-50 sm:text-lg">
            {dict.cta.subtitle}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={`${base}/contact`}
              className="w-full rounded-full bg-white px-8 py-3.5 text-base font-bold text-orange-700 shadow-lg transition hover:bg-orange-50 sm:w-auto"
            >
              {dict.cta.button}
            </Link>
            <a
              href={`tel:${site.phone}`}
              className="w-full rounded-full border border-white/40 px-8 py-3.5 text-base font-semibold text-white transition hover:bg-white/10 sm:w-auto"
            >
              {dict.cta.call}: {site.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
