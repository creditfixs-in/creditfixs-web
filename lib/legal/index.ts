import type { Locale } from "@/lib/i18n/locales";
import { site } from "@/lib/site";
import type { LegalContent, LegalDocKey, LegalSection } from "./types";
import { en } from "./content/en";
import { hi } from "./content/hi";
import { te } from "./content/te";
import { ta } from "./content/ta";
import { kn } from "./content/kn";
import { mr } from "./content/mr";
import { bn } from "./content/bn";
import { gu } from "./content/gu";
import { pa } from "./content/pa";

export type { LegalSection, LegalDocKey } from "./types";

/** Per-locale legal copy. Missing docs fall back to English. */
const content: Record<Locale, Partial<LegalContent>> = {
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

function fill(s: string): string {
  return s
    .replaceAll("{name}", site.name)
    .replaceAll("{domain}", site.domain)
    .replaceAll("{email}", site.email);
}

/** Resolve a legal doc for a locale (English fallback) with placeholders filled. */
export function getLegal(
  doc: LegalDocKey,
  locale: Locale,
): { sections: LegalSection[]; translated: boolean } {
  const localized = content[locale]?.[doc];
  const translated = locale !== "en" && Boolean(localized);
  const sections = (localized ?? en[doc]).map((s) => ({
    h: s.h,
    body: s.body.map(fill),
  }));
  return { sections, translated };
}
