import type { Metadata } from "next";
import { site } from "./site";
import { locales, localeTags, defaultLocale, type Locale } from "./i18n/locales";

/**
 * Build metadata with canonical + hreflang alternates for a localized path.
 * `path` is the locale-less path, e.g. "" (home), "/services", "/contact".
 */
export function buildMetadata(opts: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  ogType?: "website" | "article";
}): Metadata {
  const { locale, path, title, description, ogType = "website" } = opts;
  const url = `${site.url}/${locale}${path}`;

  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[localeTags[l]] = `${site.url}/${l}${path}`;
  }
  languages["x-default"] = `${site.url}/${defaultLocale}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: localeTags[locale].replace("-", "_"),
      type: ogType,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/* ------------------------------ JSON-LD builders ------------------------- */

export function organizationJsonLd() {
  const sameAs = Object.values(site.social).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "@id": `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    logo: `${site.url}/icon.svg`,
    email: site.email,
    telephone: site.phone,
    description:
      "Credit score repair, dispute resolution and credit education consultancy for India, covering CIBIL, Experian, Equifax and CRIF High Mark.",
    address: {
      "@type": "PostalAddress",
      addressLocality: site.addressLocality,
      addressRegion: site.addressRegion,
      addressCountry: site.addressCountry,
    },
    areaServed: "IN",
    priceRange: "₹₹",
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: site.url,
    inLanguage: locales.map((l) => localeTags[l]),
    publisher: { "@id": `${site.url}/#organization` },
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function serviceJsonLd(opts: {
  locale: Locale;
  slug: string;
  name: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: `${site.url}/${opts.locale}/services/${opts.slug}`,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: "IN",
    serviceType: "Credit repair and consultation",
  };
}

export function articleJsonLd(opts: {
  locale: Locale;
  slug: string;
  title: string;
  description: string;
  datePublished: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    datePublished: opts.datePublished,
    inLanguage: "en-IN",
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@id": `${site.url}/#organization` },
    mainEntityOfPage: `${site.url}/${opts.locale}/resources/${opts.slug}`,
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
