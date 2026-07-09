import type { ArticleMeta } from "./types";

/**
 * Locale-neutral article metadata. Slugs are stable across all languages;
 * the translatable copy for each slug lives in ./content/<locale>.ts.
 * Order here defines display order on the resources listing.
 */
export const articleMeta: ArticleMeta[] = [
  { slug: "how-to-fix-cibil-score", datePublished: "2026-05-10", readMinutes: 7 },
  { slug: "pc-financial-cashbean-entry-on-credit-report", datePublished: "2026-05-24", readMinutes: 6 },
  { slug: "sunidhi-capital-loan-entry-dispute", datePublished: "2026-06-02", readMinutes: 5 },
  { slug: "home-loan-rejected-low-cibil", datePublished: "2026-06-12", readMinutes: 7 },
  { slug: "cibil-vs-experian-vs-equifax-vs-crif", datePublished: "2026-06-18", readMinutes: 5 },
  { slug: "settled-vs-closed-loan-status", datePublished: "2026-06-25", readMinutes: 4 },
];

export const articleSlugs = articleMeta.map((m) => m.slug);
