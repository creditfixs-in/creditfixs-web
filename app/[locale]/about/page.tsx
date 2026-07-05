import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary } from "@/lib/i18n";
import { isLocale, type Locale } from "@/lib/i18n/locales";
import { buildMetadata } from "@/lib/seo";

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
    path: "/about",
    title: dict.meta.about.title,
    description: dict.meta.about.description,
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const base = `/${locale}`;

  return (
    <>
      <section className="bg-navy-950 text-white">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            {dict.about.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            {dict.about.subtitle}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="space-y-6">
          {dict.about.paragraphs.map((p, i) => (
            <p key={i} className="text-base leading-relaxed text-slate-700 sm:text-lg">
              {p}
            </p>
          ))}
        </div>

        <h2 className="mt-14 text-center text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          {dict.about.valuesTitle}
        </h2>
        <ul className="mt-8 grid gap-5 sm:grid-cols-3">
          {dict.about.values.map((v) => (
            <li key={v.title} className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
              <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                  <path d="M12 21c-4.5-2.5-8-5.5-8-10a8 8 0 0 1 16 0c0 4.5-3.5 7.5-8 10z" />
                  <path d="M9.5 11l2 2 3.5-3.5" />
                </svg>
              </span>
              <h3 className="mt-4 text-base font-bold text-slate-900">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{v.desc}</p>
            </li>
          ))}
        </ul>

        <div className="mt-14 text-center">
          <Link
            href={`${base}/contact`}
            className="inline-block rounded-full bg-emerald-600 px-8 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-emerald-700"
          >
            {dict.common.freeConsultation}
          </Link>
        </div>
      </section>
    </>
  );
}
