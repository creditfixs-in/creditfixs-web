import type { Locale } from "@/lib/i18n/locales";
import type { Article, ArticleContent } from "./types";
import { articleMeta } from "./meta";
import { en } from "./content/en";
import { hi } from "./content/hi";
import { te } from "./content/te";
import { ta } from "./content/ta";
import { kn } from "./content/kn";
import { mr } from "./content/mr";
import { bn } from "./content/bn";
import { gu } from "./content/gu";
import { pa } from "./content/pa";

export type { Article, ArticleContent, ArticleMeta, ArticleSection } from "./types";
export { articleMeta, articleSlugs } from "./meta";

/** Per-locale article copy. Missing slugs fall back to English. */
const content: Record<Locale, Record<string, ArticleContent>> = {
  en,
  hi,
  te,
  ta,
  kn,
  mr,
  bn,
  gu,
  pa,
};

/** True when `locale` has its own translation for `slug` (English is never a "translation"). */
export function hasTranslation(slug: string, locale: Locale): boolean {
  return locale !== "en" && Boolean(content[locale]?.[slug]);
}

/** Resolve one article's metadata + copy for a locale, falling back to English copy. */
export function getArticle(slug: string, locale: Locale = "en"): Article | undefined {
  const meta = articleMeta.find((m) => m.slug === slug);
  if (!meta) return undefined;
  const copy = content[locale]?.[slug] ?? en[slug];
  return { ...meta, ...copy };
}

/** All articles for a locale, in display order, each with English fallback. */
export function getArticles(locale: Locale = "en"): Article[] {
  return articleMeta.map((meta) => ({
    ...meta,
    ...(content[locale]?.[meta.slug] ?? en[meta.slug]),
  }));
}

/** English article list — used for locale-neutral needs like the sitemap. */
export const articles: Article[] = getArticles("en");
