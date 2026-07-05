import type { Dictionary } from "./types";
import type { Locale } from "./locales";
import en from "./dictionaries/en";
import hi from "./dictionaries/hi";
import te from "./dictionaries/te";
import ta from "./dictionaries/ta";
import kn from "./dictionaries/kn";
import mr from "./dictionaries/mr";
import bn from "./dictionaries/bn";
import gu from "./dictionaries/gu";
import pa from "./dictionaries/pa";

const dictionaries: Record<Locale, Dictionary> = {
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

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en;
}

export type { Dictionary };
