"use client";

import { usePathname, useRouter } from "next/navigation";
import { locales, localeNames, isLocale, type Locale } from "@/lib/i18n/locales";

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? `/${locale}`;
  const router = useRouter();

  function switchTo(next: string) {
    if (!isLocale(next)) return;
    const segments = pathname.split("/");
    // pathname is like /en/services/... — segment 1 is the locale
    if (isLocale(segments[1] ?? "")) {
      segments[1] = next;
    } else {
      segments.splice(1, 0, next);
    }
    router.push(segments.join("/") || `/${next}`);
  }

  return (
    <label className="relative inline-flex items-center">
      <span className="sr-only">Language</span>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="pointer-events-none absolute left-2.5 h-4 w-4 text-slate-500"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3z" />
      </svg>
      <select
        value={locale}
        onChange={(e) => switchTo(e.target.value)}
        className="cursor-pointer appearance-none rounded-full border border-slate-300 bg-white py-1.5 pl-8 pr-7 text-sm font-medium text-slate-700 transition hover:border-orange-500 focus:border-orange-500"
      >
        {locales.map((l) => (
          <option key={l} value={l}>
            {localeNames[l]}
          </option>
        ))}
      </select>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="pointer-events-none absolute right-2 h-3.5 w-3.5 text-slate-500"
        aria-hidden="true"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </label>
  );
}
