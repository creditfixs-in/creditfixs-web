/**
 * Service slugs are stable across locales; all display copy lives in the
 * per-locale dictionaries under services.items[slug].
 */
export const serviceSlugs = [
  "credit-score-repair",
  "dispute-resolution",
  "loan-rejection",
  "loan-app-cleanup",
  "score-monitoring",
  "credit-education",
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

/** Inline SVG icon paths (24x24, stroke-based) keyed by service slug */
export const serviceIcons: Record<ServiceSlug, string> = {
  // wrench / gauge
  "credit-score-repair":
    "M3 12a9 9 0 1 1 18 0M12 12l4-4M12 21v-2M4.5 16.5l1.5-1M19.5 16.5l-1.5-1",
  // scales
  "dispute-resolution":
    "M12 3v18M5 7l7-2 7 2M5 7l-2 6a3.5 3.5 0 0 0 7 0L7 7M19 7l-2 6a3.5 3.5 0 0 0 7 0l-3-6M8 21h8",
  // shield-check
  "loan-rejection":
    "M12 3l8 3v6c0 4.5-3.4 7.8-8 9-4.6-1.2-8-4.5-8-9V6l8-3zM9 12l2 2 4-4",
  // broom / sparkle
  "loan-app-cleanup":
    "M4 20l6-6M14 4l6 6M13 5l6 6-8 8-6-6 8-8zM5 13l6 6",
  // eye / pulse
  "score-monitoring":
    "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  // book open
  "credit-education":
    "M12 6c-2-1.5-5-2-8-2v14c3 0 6 .5 8 2 2-1.5 5-2 8-2V4c-3 0-6 .5-8 2zM12 6v14",
};
