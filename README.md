# CreditFixs.in — Credit Repair Website

Multilingual, SEO-first Next.js website for **creditfixs.in** — credit score repair,
dispute resolution and credit education for India (CIBIL, Experian, Equifax, CRIF High Mark).

## What's inside

| Feature | Details |
| --- | --- |
| Languages | English, Hindi, Telugu, Tamil, Kannada, Marathi, Bengali, Gujarati, Punjabi (`/en`, `/hi`, `/te`, `/ta`, `/kn`, `/mr`, `/bn`, `/gu`, `/pa`) |
| SEO | Per-page titles/descriptions, canonical URLs, hreflang alternates (+ `x-default`), `sitemap.xml`, `robots.txt`, OpenGraph + Twitter cards, dynamic OG image |
| Structured data | `FinancialService`, `WebSite`, `FAQPage`, `Service`, `Article`, `BreadcrumbList` JSON-LD |
| Pages | Home, Services (6 detail pages), Resources (5 SEO guides), FAQ, About, Contact, Privacy, Terms — all statically pre-rendered (~150 pages) |
| Contact form | Posts to `/api/contact`, inserts into Supabase `contact_submissions` with honeypot spam protection |
| UI | Tailwind CSS 4, fully responsive (mobile nav, fluid grids), accessible (focus rings, aria labels, reduced-motion support) |

## 1. Local development

```bash
npm install
cp .env.example .env.local   # fill in Supabase values
npm run dev                  # http://localhost:3000 → redirects to /en
```

## 2. Supabase setup (contact form)

1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL Editor** and run [`supabase/schema.sql`](supabase/schema.sql).
3. Copy from **Settings → API**:
   - `SUPABASE_URL` — the Project URL
   - `SUPABASE_SERVICE_ROLE_KEY` — the `service_role` secret (server-only, never expose)
4. Set both as environment variables locally (`.env.local`) and on your host.

RLS is enabled with **no** anon policies — the table is only writable through the
server API route using the service-role key.

## 3. Deploy

### Option A — Render (simplest)

1. Push this repo to GitHub.
2. In Render: **New → Blueprint**, pick the repo ([`render.yaml`](render.yaml) is auto-detected).
3. Set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in the service's Environment tab.
4. Point the `creditfixs.in` DNS at Render (they issue TLS automatically).

### Option B — Cloudflare Workers (OpenNext)

```bash
npm i -D @opennextjs/cloudflare wrangler   # one-time
npx wrangler login
npx wrangler secret put SUPABASE_URL
npx wrangler secret put SUPABASE_SERVICE_ROLE_KEY
npm run cf:deploy
```

Then add `creditfixs.in` as a custom domain to the Worker in the Cloudflare dashboard.

## 4. Before going live — edit these

- [`lib/site.ts`](lib/site.ts) — **phone/WhatsApp number is a placeholder**; also email, city, social links.
- `lib/i18n/dictionaries/*.ts` — all site copy, one file per language.
- `lib/resources.ts` — articles; add more objects to grow the blog.
- After launch: submit `https://creditfixs.in/sitemap.xml` in Google Search Console
  and Bing Webmaster Tools.

## Project structure

```
app/
  [locale]/            # all pages, one URL tree per language
    layout.tsx         # html/lang, header/footer, Organization JSON-LD
    page.tsx           # home
    services/          # listing + [slug] detail pages
    resources/         # listing + [slug] article pages
    faq/ about/ contact/ privacy-policy/ terms/
    opengraph-image.tsx
  api/contact/route.ts # Supabase insert (service-role, server-only)
  sitemap.ts robots.ts icon.svg
components/            # Header, Footer, ContactForm, LanguageSwitcher, ...
lib/
  i18n/                # locales, Dictionary type, 9 dictionaries
  site.ts seo.ts services.ts resources.ts
supabase/schema.sql
render.yaml wrangler.jsonc open-next.config.ts
```

## Adding a language

1. Add the code to `locales`, `localeNames`, `localeTags` in `lib/i18n/locales.ts`.
2. Copy `lib/i18n/dictionaries/en.ts` to `<code>.ts` and translate.
3. Register it in `lib/i18n/index.ts`. Sitemap, hreflang and the switcher update automatically.
