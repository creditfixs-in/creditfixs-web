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
  return buildMetadata({
    locale: l,
    path: "/terms",
    title: dict.footer.terms,
    description: `Terms of service for ${site.name} (${site.domain}) — the conditions under which our credit consultation services are provided.`,
  });
}

const sections: { h: string; body: string[] }[] = [
  {
    h: "Who we are",
    body: [
      `${site.name} is an independent credit consultation service operating in India. We are not a bank, NBFC, credit bureau, or lender, and we are not affiliated with TransUnion CIBIL, Experian, Equifax, CRIF High Mark or the Reserve Bank of India.`,
    ],
  },
  {
    h: "Nature of our services",
    body: [
      "We provide analysis of credit reports, guidance on and assistance with raising disputes for inaccurate, outdated or unverifiable information, loan-readiness consultation, monitoring and credit education.",
      "We work strictly within the legal dispute framework available to every borrower in India. We do not and cannot remove genuine, accurate records from a credit report, and we never create or submit false documents.",
    ],
  },
  {
    h: "No guaranteed outcomes",
    body: [
      "Dispute outcomes depend on bureaus, lenders and the facts of each case. Any timelines we mention (for example, typical 30–90 day dispute cycles) are indicative, not promises. We do not guarantee a specific score increase or loan approval.",
    ],
  },
  {
    h: "Fees",
    body: [
      "The first consultation is free. Any subsequent fees are quoted in writing before work begins. Fees paid are for professional effort (analysis, documentation, filing, follow-up) and are not contingent on a specific outcome unless expressly agreed in writing.",
    ],
  },
  {
    h: "Your responsibilities",
    body: [
      "You agree to provide accurate information and genuine documents. We may refuse or terminate service if asked to pursue false disputes or submit fabricated evidence.",
    ],
  },
  {
    h: "Limitation of liability",
    body: [
      "To the maximum extent permitted by law, our liability for any claim arising out of our services is limited to the fees you paid us for those services.",
    ],
  },
  {
    h: "Contact",
    body: [`Questions about these terms: ${site.email}.`],
  },
];

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return (
    <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8" lang="en">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        {dict.footer.terms}
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
