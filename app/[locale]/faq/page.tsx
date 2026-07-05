import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { getDictionary } from "@/lib/i18n";
import { isLocale, type Locale } from "@/lib/i18n/locales";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = (isLocale(locale) ? locale : "en") as Locale;
  const dict = getDictionary(l);
  return buildMetadata({
    locale: l,
    path: "/faq",
    title: dict.meta.faq.title,
    description: dict.meta.faq.description,
  });
}

export default async function FaqPage({
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

      <section className="bg-navy-950 text-white">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{dict.faq.title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            {dict.faq.subtitle}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="space-y-3">
          {dict.faq.items.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-slate-200 bg-white shadow-sm open:border-emerald-300"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-slate-900 sm:px-6 sm:text-lg [&::-webkit-details-marker]:hidden">
                {item.q}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="faq-chevron h-5 w-5 shrink-0 text-emerald-600 transition-transform" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </summary>
              <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600 sm:px-6 sm:text-base">
                {item.a}
              </p>
            </details>
          ))}
        </div>

        <div className="mt-12 rounded-3xl bg-slate-50 px-6 py-10 text-center">
          <h2 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
            {dict.services.ctaTitle}
          </h2>
          <Link
            href={`${base}/contact`}
            className="mt-6 inline-block rounded-full bg-emerald-600 px-8 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-emerald-700"
          >
            {dict.common.freeConsultation}
          </Link>
        </div>
      </section>
    </>
  );
}
