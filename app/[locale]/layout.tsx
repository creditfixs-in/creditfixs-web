import type { Metadata, Viewport } from "next";
import {
  Inter,
  Noto_Sans_Devanagari,
  Noto_Sans_Telugu,
  Noto_Sans_Tamil,
  Noto_Sans_Kannada,
  Noto_Sans_Bengali,
  Noto_Sans_Gujarati,
  Noto_Sans_Gurmukhi,
} from "next/font/google";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { getDictionary } from "@/lib/i18n";
import { locales, localeTags, isLocale, type Locale } from "@/lib/i18n/locales";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import "../globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
});

// Indian-script fonts. Inter has no glyphs for these scripts, so non-Latin
// locales would otherwise fall back to an inconsistent system font. Each writes
// the shared --font-noto variable; only the active locale's font is applied to
// <html>, so exactly one script font loads per page. preload:false avoids
// preloading every script font on every page (the CSS pulls the right one).
// NOTE: next/font requires plain object literals here — no spread/variables.
const notoDevanagari = Noto_Sans_Devanagari({ subsets: ["devanagari"], display: "swap", variable: "--font-noto", preload: false });
const notoTelugu = Noto_Sans_Telugu({ subsets: ["telugu"], display: "swap", variable: "--font-noto", preload: false });
const notoTamil = Noto_Sans_Tamil({ subsets: ["tamil"], display: "swap", variable: "--font-noto", preload: false });
const notoKannada = Noto_Sans_Kannada({ subsets: ["kannada"], display: "swap", variable: "--font-noto", preload: false });
const notoBengali = Noto_Sans_Bengali({ subsets: ["bengali"], display: "swap", variable: "--font-noto", preload: false });
const notoGujarati = Noto_Sans_Gujarati({ subsets: ["gujarati"], display: "swap", variable: "--font-noto", preload: false });
const notoGurmukhi = Noto_Sans_Gurmukhi({ subsets: ["gurmukhi"], display: "swap", variable: "--font-noto", preload: false });

const scriptFontByLocale: Partial<Record<Locale, { variable: string }>> = {
  hi: notoDevanagari,
  mr: notoDevanagari,
  te: notoTelugu,
  ta: notoTamil,
  kn: notoKannada,
  bn: notoBengali,
  gu: notoGujarati,
  pa: notoGurmukhi,
};

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary((isLocale(locale) ? locale : "en") as Locale);
  return {
    metadataBase: new URL(site.url),
    title: {
      default: dict.meta.home.title,
      template: `%s | ${site.name}`,
    },
    description: dict.meta.home.description,
    applicationName: site.name,
    robots: { index: true, follow: true },
    icons: { icon: "/icon.svg" },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ea580c",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  const scriptFont = scriptFontByLocale[locale];
  const fontClass = scriptFont
    ? `${inter.variable} ${scriptFont.variable}`
    : inter.variable;

  return (
    <html lang={localeTags[locale]} className={fontClass}>
      <body className="flex min-h-screen flex-col font-sans">
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <Header locale={locale} nav={dict.nav} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} dict={dict} />
      </body>
    </html>
  );
}
