import Link from "next/link";
import { site } from "@/lib/site";
import { serviceSlugs } from "@/lib/services";
import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/locales";

export default function Footer({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const base = `/${locale}`;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-50 text-slate-600">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 text-white">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                  <path d="M4 17l5-5 4 3 7-8" />
                  <path d="M15 7h5v5" />
                </svg>
              </span>
              <span className="text-lg font-extrabold tracking-tight text-slate-900">
                Credit<span className="text-orange-600">Fixs</span>
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-500">{dict.footer.tagline}</p>
            <div className="mt-5 space-y-2 text-sm">
              <a href={`mailto:${site.email}`} className="block text-slate-600 transition hover:text-orange-600">
                {site.email}
              </a>
              <a href={`tel:${site.phone}`} className="block text-slate-600 transition hover:text-orange-600">
                {site.phoneDisplay}
              </a>
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label={dict.footer.quickLinks}>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
              {dict.footer.quickLinks}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href={base} className="transition hover:text-orange-600">{dict.nav.home}</Link></li>
              <li><Link href={`${base}/services`} className="transition hover:text-orange-600">{dict.nav.services}</Link></li>
              <li><Link href={`${base}/resources`} className="transition hover:text-orange-600">{dict.nav.resources}</Link></li>
              <li><Link href={`${base}/faq`} className="transition hover:text-orange-600">{dict.nav.faq}</Link></li>
              <li><Link href={`${base}/about`} className="transition hover:text-orange-600">{dict.nav.about}</Link></li>
              <li><Link href={`${base}/contact`} className="transition hover:text-orange-600">{dict.nav.contact}</Link></li>
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label={dict.footer.ourServices}>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
              {dict.footer.ourServices}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {serviceSlugs.map((slug) => (
                <li key={slug}>
                  <Link href={`${base}/services/${slug}`} className="transition hover:text-orange-600">
                    {dict.services.items[slug].title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal */}
          <nav aria-label={dict.footer.legal}>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
              {dict.footer.legal}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href={`${base}/privacy-policy`} className="transition hover:text-orange-600">{dict.footer.privacy}</Link></li>
              <li><Link href={`${base}/terms`} className="transition hover:text-orange-600">{dict.footer.terms}</Link></li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 border-t border-slate-200 pt-6">
          <p className="text-xs leading-relaxed text-slate-500">
            <strong className="text-slate-700">{dict.footer.disclaimer}: </strong>
            {dict.footer.disclaimerText}
          </p>
          <p className="mt-4 text-xs text-slate-500">
            © {year} {site.name} · {site.domain} · {dict.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
