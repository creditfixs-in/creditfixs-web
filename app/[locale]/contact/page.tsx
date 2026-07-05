import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { getDictionary } from "@/lib/i18n";
import { isLocale, type Locale } from "@/lib/i18n/locales";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

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
    path: "/contact",
    title: dict.meta.contact.title,
    description: dict.meta.contact.description,
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const info = dict.contact.info;

  return (
    <>
      <section className="bg-navy-950 text-white">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            {dict.contact.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            {dict.contact.subtitle}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
            <ContactForm locale={locale} form={dict.contact.form} />
          </div>

          <aside className="space-y-5">
            <div className="rounded-3xl bg-slate-50 p-7">
              <h2 className="text-lg font-bold text-slate-900">{info.title}</h2>
              <dl className="mt-5 space-y-4 text-sm">
                <div>
                  <dt className="font-semibold text-slate-500">{info.emailLabel}</dt>
                  <dd>
                    <a href={`mailto:${site.email}`} className="text-base font-medium text-emerald-700 transition hover:text-emerald-800">
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-500">{info.phoneLabel}</dt>
                  <dd>
                    <a href={`tel:${site.phone}`} className="text-base font-medium text-emerald-700 transition hover:text-emerald-800">
                      {site.phoneDisplay}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-500">{info.whatsappLabel}</dt>
                  <dd>
                    <a
                      href={`https://wa.me/${site.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-medium text-emerald-700 transition hover:text-emerald-800"
                    >
                      {site.phoneDisplay}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-500">{info.hoursLabel}</dt>
                  <dd className="text-base font-medium text-slate-800">{info.hours}</dd>
                </div>
              </dl>
            </div>
            <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-7">
              <p className="text-sm font-medium leading-relaxed text-emerald-900">
                {info.responseNote}
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
