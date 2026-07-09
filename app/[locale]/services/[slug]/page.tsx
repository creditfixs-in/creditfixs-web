import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import ServiceIcon from "@/components/ServiceIcon";
import { getDictionary } from "@/lib/i18n";
import { isLocale, locales, type Locale } from "@/lib/i18n/locales";
import { breadcrumbJsonLd, buildMetadata, serviceJsonLd } from "@/lib/seo";
import { serviceSlugs, type ServiceSlug } from "@/lib/services";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    serviceSlugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const l = (isLocale(locale) ? locale : "en") as Locale;
  const dict = getDictionary(l);
  const svc = dict.services.items[slug];
  return buildMetadata({
    locale: l,
    path: `/services/${slug}`,
    title: svc.title,
    description: svc.short,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: ServiceSlug }>;
}) {
  const { locale, slug } = await params;
  const dict = getDictionary(locale);
  const svc = dict.services.items[slug];
  const base = `/${locale}`;

  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({ locale, slug, name: svc.title, description: svc.short }),
          breadcrumbJsonLd([
            { name: dict.common.breadcrumbHome, url: `${site.url}${base}` },
            { name: dict.nav.services, url: `${site.url}${base}/services` },
            { name: svc.title, url: `${site.url}${base}/services/${slug}` },
          ]),
        ]}
      />

      <section className="border-b border-slate-200 bg-gradient-to-b from-orange-50 to-white text-slate-900">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href={base} className="transition hover:text-orange-600">
                  {dict.common.breadcrumbHome}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href={`${base}/services`} className="transition hover:text-orange-600">
                  {dict.nav.services}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-slate-700">{svc.title}</li>
            </ol>
          </nav>
          <div className="mt-8 flex items-start gap-5">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
              <ServiceIcon slug={slug} className="h-7 w-7" />
            </span>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                {svc.title}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                {svc.short}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <p className="text-base leading-relaxed text-slate-700 sm:text-lg">{svc.description}</p>

        <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-slate-900">
          {dict.services.whatWeDo}
        </h2>
        <ul className="mt-6 space-y-4">
          {svc.points.map((point) => (
            <li key={point} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-700">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5" aria-hidden="true">
                  <path d="M4 12l5 5L20 7" />
                </svg>
              </span>
              <span className="text-base leading-relaxed text-slate-700">{point}</span>
            </li>
          ))}
        </ul>

        <div className="mt-12 rounded-3xl bg-gradient-to-br from-orange-600 to-amber-700 px-6 py-10 text-center text-white sm:px-10">
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{dict.cta.title}</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-orange-50 sm:text-base">
            {dict.cta.subtitle}
          </p>
          <Link
            href={`${base}/contact`}
            className="mt-6 inline-block rounded-full bg-white px-8 py-3 text-base font-bold text-orange-700 shadow-lg transition hover:bg-orange-50"
          >
            {dict.cta.button}
          </Link>
        </div>

        <p className="mt-8">
          <Link
            href={`${base}/services`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-600 transition hover:text-orange-700"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
              <path d="M19 12H5M11 18l-6-6 6-6" />
            </svg>
            {dict.services.viewAll}
          </Link>
        </p>
      </section>
    </>
  );
}
