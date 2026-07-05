import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { locales, localeTags, defaultLocale } from "@/lib/i18n/locales";
import { serviceSlugs } from "@/lib/services";
import { articles } from "@/lib/resources";

/** Locale-less paths with their sitemap priority/change frequency */
const routes: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}[] = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  ...serviceSlugs.map((slug) => ({
    path: `/services/${slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  })),
  { path: "/resources", priority: 0.7, changeFrequency: "weekly" },
  ...articles.map((a) => ({
    path: `/resources/${a.slug}`,
    priority: 0.6,
    changeFrequency: "monthly" as const,
  })),
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about", priority: 0.6, changeFrequency: "yearly" },
  { path: "/contact", priority: 0.9, changeFrequency: "yearly" },
  { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.flatMap((route) => {
    // hreflang alternates shared by every locale variant of this route
    const languages: Record<string, string> = {};
    for (const l of locales) {
      languages[localeTags[l]] = `${site.url}/${l}${route.path}`;
    }
    languages["x-default"] = `${site.url}/${defaultLocale}${route.path}`;

    return locales.map((locale) => ({
      url: `${site.url}/${locale}${route.path}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: locale === defaultLocale ? route.priority : route.priority * 0.9,
      alternates: { languages },
    }));
  });
}
