import type { Metadata } from "next";
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
  return {
    ...buildMetadata({
      locale: l,
      path: "/privacy-policy",
      title: dict.footer.privacy,
      description: `Privacy policy for ${site.name} (${site.domain}) — how we collect, use and protect your personal information.`,
    }),
    robots: { index: true, follow: true },
  };
}

const sections: { h: string; body: string[] }[] = [
  {
    h: "Information we collect",
    body: [
      "When you submit our contact form, we collect the details you provide: your name, email address, phone number, the type of credit issue you describe, the credit bureau involved, and your message. We also store the language you used on the site so we can respond in the same language.",
    ],
  },
  {
    h: "How we use your information",
    body: [
      "Your details are used solely to respond to your enquiry, provide a consultation, and — if you engage our services — to deliver those services. We do not sell, rent or share your personal information with third parties for marketing.",
      "We may retain enquiry records for internal follow-up and legal compliance. You may request deletion of your data at any time by emailing us.",
    ],
  },
  {
    h: "Sensitive financial information",
    body: [
      "If you later share credit reports or loan documents with us as part of a consultation, they are used only to analyse and pursue your case, are shared only with the bureaus/lenders involved in your disputes, and are deleted on request when the engagement ends.",
    ],
  },
  {
    h: "Data storage and security",
    body: [
      "Contact submissions are stored securely in our database (hosted on Supabase) over encrypted connections. Access is restricted to authorised team members.",
    ],
  },
  {
    h: "Cookies and analytics",
    body: [
      "This website does not use advertising cookies. If analytics are enabled in future, they will be privacy-respecting and this policy will be updated.",
    ],
  },
  {
    h: "Your rights",
    body: [
      "You may request a copy, correction or deletion of your personal data at any time. Contact us at the email below and we will respond within 30 days.",
    ],
  },
  {
    h: "Contact",
    body: [`For any privacy questions or requests, email us at ${site.email}.`],
  },
];

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return (
    <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8" lang="en">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        {dict.footer.privacy}
      </h1>
      <p className="mt-3 text-sm text-slate-500">
        {site.name} · {site.domain} · Last updated: July 2026
      </p>
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
