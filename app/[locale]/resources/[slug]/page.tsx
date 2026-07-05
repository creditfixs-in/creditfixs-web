import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { getDictionary } from "@/lib/i18n";
import { isLocale, locales, type Locale } from "@/lib/i18n/locales";
import { articleJsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { articles, getArticle } from "@/lib/resources";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    articles.map((a) => ({ locale, slug: a.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const l = (isLocale(locale) ? locale : "en") as Locale;
  const article = getArticle(slug);
  if (!article) return {};
  return buildMetadata({
    locale: l,
    path: `/resources/${slug}`,
    title: article.title,
    description: article.description,
    ogType: "article",
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const dict = getDictionary(locale);
  const base = `/${locale}`;

  return (
    <>
      <JsonLd
        data={[
          articleJsonLd({
            locale,
            slug: article.slug,
            title: article.title,
            description: article.description,
            datePublished: article.datePublished,
          }),
          breadcrumbJsonLd([
            { name: dict.common.breadcrumbHome, url: `${site.url}${base}` },
            { name: dict.nav.resources, url: `${site.url}${base}/resources` },
            { name: article.title, url: `${site.url}${base}/resources/${article.slug}` },
          ]),
        ]}
      />

      <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8" lang="en">
        <header>
          <Link
            href={`${base}/resources`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
              <path d="M19 12H5M11 18l-6-6 6-6" />
            </svg>
            {dict.resources.backToResources}
          </Link>
          <h1 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {article.title}
          </h1>
          <p className="mt-4 text-sm font-medium text-slate-500">
            {dict.resources.publishedOn}{" "}
            <time dateTime={article.datePublished}>
              {new Date(article.datePublished).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>{" "}
            · {article.readMinutes} min
          </p>
          {locale !== "en" && (
            <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              {dict.resources.englishNote}
            </p>
          )}
        </header>

        <div className="mt-10 space-y-8">
          {article.sections.map((section, i) => (
            <section key={i}>
              {section.heading && (
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
                  {section.heading}
                </h2>
              )}
              {section.paragraphs?.map((p, j) => (
                <p key={j} className="mt-4 text-base leading-relaxed text-slate-700 sm:text-lg">
                  {p}
                </p>
              ))}
              {section.list && (
                <ul className="mt-4 space-y-3">
                  {section.list.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                      <span className="text-base leading-relaxed text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <div className="mt-14 rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 px-6 py-10 text-center text-white sm:px-10">
          <h2 className="text-2xl font-extrabold tracking-tight">{dict.cta.title}</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-emerald-50 sm:text-base">
            {dict.cta.subtitle}
          </p>
          <Link
            href={`${base}/contact`}
            className="mt-6 inline-block rounded-full bg-white px-8 py-3 text-base font-bold text-emerald-700 shadow-lg transition hover:bg-emerald-50"
          >
            {dict.cta.button}
          </Link>
        </div>
      </article>
    </>
  );
}
