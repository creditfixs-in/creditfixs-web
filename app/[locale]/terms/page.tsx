import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { isLocale, localeTags, type Locale } from "@/lib/i18n/locales";
import { buildMetadata } from "@/lib/seo";
import { getLegal } from "@/lib/legal";
import { site } from "@/lib/site";

// Fixed "last updated" date for the legal docs, formatted per locale.
const LEGAL_UPDATED = "2026-07-01";

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
    path: "/terms",
    title: dict.footer.terms,
    description: `Terms of service for ${site.name} (${site.domain}) — the conditions under which our credit consultation services are provided.`,
  });
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const { sections, translated } = getLegal("terms", locale);
  const updated = new Date(LEGAL_UPDATED).toLocaleDateString(localeTags[locale], {
    year: "numeric",
    month: "long",
  });

  return (
    <section
      className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8"
      lang={translated ? localeTags[locale] : "en"}
    >
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        {dict.footer.terms}
      </h1>
      <p className="mt-3 text-sm text-slate-500">
        {site.name} · {site.domain} · {dict.common.lastUpdated}: {updated}
      </p>
      {locale !== "en" && !translated && (
        <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {dict.resources.englishNote}
        </p>
      )}
      <div className="mt-10 space-y-8">
        {sections.map((s) => (
          <div key={s.h}>
            <h2 className="text-xl font-bold text-slate-900">{s.h}</h2>
            {s.body.map((p, i) => (
              <p key={i} className="mt-3 text-base leading-relaxed text-slate-700">
                {p}
              </p>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
