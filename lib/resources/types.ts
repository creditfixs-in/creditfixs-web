export interface ArticleSection {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
}

/** Localized, per-language article copy. */
export interface ArticleContent {
  title: string;
  description: string;
  sections: ArticleSection[];
}

/** Locale-neutral article metadata (shared across all languages). */
export interface ArticleMeta {
  slug: string;
  datePublished: string; // ISO date
  readMinutes: number;
}

/** A fully-resolved article: metadata + the copy for one locale. */
export interface Article extends ArticleMeta, ArticleContent {}
