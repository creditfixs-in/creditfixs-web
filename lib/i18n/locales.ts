export const locales = [
  "en",
  "hi",
  "te",
  "ta",
  "kn",
  "mr",
  "bn",
  "gu",
  "pa",
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Native display names for the language switcher */
export const localeNames: Record<Locale, string> = {
  en: "English",
  hi: "हिन्दी",
  te: "తెలుగు",
  ta: "தமிழ்",
  kn: "ಕನ್ನಡ",
  mr: "मराठी",
  bn: "বাংলা",
  gu: "ગુજરાતી",
  pa: "ਪੰਜਾਬੀ",
};

/** BCP-47 tags used for <html lang>, hreflang and OpenGraph */
export const localeTags: Record<Locale, string> = {
  en: "en-IN",
  hi: "hi-IN",
  te: "te-IN",
  ta: "ta-IN",
  kn: "kn-IN",
  mr: "mr-IN",
  bn: "bn-IN",
  gu: "gu-IN",
  pa: "pa-IN",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
