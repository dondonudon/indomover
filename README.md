# Indo Mover — React SPA

A static, single-page React rebuild of [indo-mover.com](https://indo-mover.com/) — a Semarang-based moving services portfolio. The original site is WordPress; this version is a Vite + React SPA designed to deploy free on Vercel.

This document is the single source of truth for what's been built and why. Update it when decisions change.

---

## Stack

- **Vite 6 + React 18 + TypeScript** — single static bundle, ~310 KB JS / 100 KB gzipped.
- **Tailwind CSS v4** via `@tailwindcss/vite`.
- **Framer Motion** for section reveals and the service modal transition.
- **lucide-react** for icons.
- **No router** — single page with anchor scrolling. `react-router-dom` was deliberately not added.
- **Hand-rolled i18n** (`LanguageContext` + two JSON dicts). No `react-i18next`.
- **Static prerender** — `postbuild` SSR-renders the React tree once and injects ~66 KB of HTML into `dist/index.html` so crawlers see fully-rendered content without waiting for hydration.

---

## Locked decisions

| # | Decision | Choice | Notes |
|---|---|---|---|
| 1 | Design fidelity | Modernize freely | Same sections + copy as the WP site, redesigned visuals. |
| 2 | Routing | Single page, anchor scroll | No per-service routes. "Pelajari Lebih Lanjut" opens a modal. |
| 3 | Languages | Indonesian + English | Default is **always Indonesian**. EN is opt-in via the toggle and persisted in `localStorage`. |
| 4 | Contact | WhatsApp deep links only | All CTAs build `wa.me/<number>?text=...` links. No backend form. |
| 5 | Hosting | Vercel free tier (Hobby) | Static SPA + 1 edge function for cron. |
| 6 | Reviews | **Build-time bake** from Google Places API (New) | Fetched during `prebuild`, written to `src/data/reviews.json`, imported into the bundle. **No API key in the client.** Refreshed daily by Vercel Cron. |
| 7 | SEO | Keyword-rich copy + JSON-LD + static prerender | Targets "jasa pindah", "jasa pindah rumah", "jasa pindah Semarang", "jasa pindah kantor" + EN equivalents. JSON-LD MovingCompany / FAQPage / WebSite schemas use real address, phone, geo, and aggregateRating from the Places API. |

---

## Architecture

### Sections (in render order)

`src/App.tsx` composes the page top-to-bottom:

1. `Navbar` — sticky, translucent on scroll, scroll-spy active link, ID/EN toggle, WhatsApp CTA.
2. `Hero` — full-viewport, 2 CTAs (WhatsApp + scroll-to-services).
3. `About` — 2-column copy + image, 4 highlight bullets, "500+" stat card.
4. `Services` — 4 cards in a responsive grid, each opens `ServiceModal`.
5. `WhyUs` — 3 feature blocks.
6. `Testimonials` — 5 real Google reviews when present, fallback to placeholder testimonials in i18n JSON when not.
7. `FAQ` — 6 keyword-rich Q&A entries using native `<details>`/`<summary>` (indexed by Google even when collapsed).
8. `CTA` — full-width band, single WhatsApp button.
9. `Footer` — copyright, repeated nav, location.

Plus, mounted at the root and rendering `null` to the DOM:
- `SeoHead` — useEffect updates `<title>`, `<meta description>`, OG locale, canonical, and hreflang on language change.
- `JsonLd` — emits three `<script type="application/ld+json">` tags (`MovingCompany`, `FAQPage`, `WebSite`) inside the React tree so they end up in the SSR'd HTML.

Floating: `WhatsAppButton` (bottom-right FAB) + `ScrollToTop` (appears after 400px scroll).

### i18n

- `src/i18n/LanguageContext.tsx` — provider + `useLanguage()` hook returning `{ lang, setLang, t }`.
- `src/i18n/id.json` (default) and `src/i18n/en.json` (opt-in) — keyed identically.
- Initial language: localStorage → `id` (browser detection was deliberately removed; English needs an explicit user choice).
- Side effects: `<html lang>` and `localStorage["indomover.lang"]` stay in sync.

### Scroll spy

`src/lib/useScrollSpy.ts` — IntersectionObserver hook. Navbar passes the section IDs (`beranda`, `tentang`, `layanan`, `mengapa`, `testimoni`, `kontak`); the active link gets a brand-tinted color.

### WhatsApp links

`src/lib/whatsapp.ts` derives `WA_NUMBER` from `data.phone` in `src/data/reviews.json` (the Places API returns the listed phone, which the helper normalizes — strips non-digits, converts a leading `0` to `62`). **No phone is hardcoded anywhere.** If reviews.json has no phone (empty placeholder), `WA_NUMBER` is the empty string; `wa.me/` links still open WhatsApp but without a specific recipient. Each section builds its link via `buildWaLink(message)` with a context-specific Indonesian or English message.

### Service modal

`src/components/ServiceModal.tsx` — driven by the `services.items[].slug`, `image`, `bullets` fields in the i18n JSON. ESC closes, click-outside closes, body scroll locked while open. Each modal has its own WhatsApp CTA whose message names the specific service.

### Reviews pipeline

```
                       prebuild (npm run build)
                                │
                                ▼
                   scripts/fetch-reviews.mjs
                                │
       ┌─ env vars set? ────────┴──────── env vars missing ─┐
       ▼                                                    ▼
  Places API (New) GET ×2                       keep existing reviews.json
   ?languageCode=en + ?languageCode=id          (or write empty placeholder)
   (merged, deduped by review path)
       │
       ▼
  src/data/reviews.json  ←─ build artifact (see "reviews.json convention")
       │
       ▼
  Testimonials.tsx
   - filter rating ≥ 5 AND text length ≥ 60
   - sort by length descending
   - take top 3 → 3-col grid
   - falls back to i18n testimonials when items is empty
```

**Why two API calls?** The Places API caps `reviews` at 5 per response. Calling once with `languageCode=en` and once with `languageCode=id` typically returns overlapping-but-not-identical sets, doubling the effective pool to 6–10 unique reviews. The fetcher dedupes by the API's review resource path (`r.name`).

**Translations.** Each review carries both `textEn` and `textId`. From the EN call we get the English version (translated if needed) plus `originalText` (source language). From the ID call we get the Indonesian version. Whichever we have, the component picks based on the current UI language.

**Quality filter.** Of the merged pool, `Testimonials.tsx` keeps only reviews with `rating === 5` and at least 60 chars of text, sorts by length descending, and renders the top 3. This guarantees a balanced 3-col grid and prevents one-word reviews ("Good 👍") from taking a slot.

**reviews.json convention.** The committed `src/data/reviews.json` is an empty placeholder (all fields null, items: []) — **the public repo carries no phone, address, or geo data**. The prebuild step overwrites it with real data on every build, but you should never commit those changes.

| Situation | What's in reviews.json |
|---|---|
| Fresh clone, no env vars set | Empty placeholder (committed) — site renders with i18n fallback testimonials, WhatsApp links go to `wa.me/` (no recipient) |
| Local with `npm run fetch:reviews` after setting env vars | Populated with real data — full preview of production behavior |
| Vercel build (env vars set) | Populated on the build runner each deploy — populated copy is what ships, but it never re-enters the repo |

If you accidentally stage a populated `reviews.json`, run `git checkout -- src/data/reviews.json` to revert.

### SEO pipeline

```
                 prebuild                    build                postbuild
                    │                          │                      │
                    ▼                          ▼                      ▼
          fetch-reviews.mjs            tsc -b && vite build      prerender.mjs
          → src/data/reviews.json      → dist/{index.html,        ↳ vite build --ssr
            (rating, phone,              assets/*}                ↳ render() → HTML
             address, items)                                      ↳ inject into
                                                                    dist/index.html
```

After the postbuild step, `dist/index.html` is ~66 KB and contains:
- All section copy as visible HTML (Google indexes without JS render).
- An H1 + H2s carrying primary keywords ("Jasa Pindah Rumah & Kantor di Semarang", etc.).
- Three JSON-LD `<script>` blocks: `MovingCompany` (with aggregateRating, geo, structured `PostalAddress`, telephone, opening hours — all data-driven from `reviews.json`, so empty fields are simply omitted instead of shipping fake values), `FAQPage` (six Q&As), `WebSite`.
- Per-language `<title>` and meta tags applied via `SeoHead` after hydration; the static defaults in `index.html` already match the Indonesian-default render.
- Canonical + hreflang (id / en / x-default).

When the user toggles language, `SeoHead` updates `document.title`, `<meta name="description">`, `og:locale`, and `<link rel="canonical">` to the EN variants.

### Cron refresh

```
Vercel Cron (daily, 03:00 UTC)
     │
     ▼  (Authorization: Bearer ${CRON_SECRET})
api/cron-rebuild.ts (edge function)
     │
     ▼  POST
VERCEL_DEPLOY_HOOK_URL
     │
     ▼
Fresh production build → prebuild fetches reviews → deploys
```

`vercel.json` has the cron entry. The rewrite excludes `/api/` so the function is reachable.

---

## Environment variables

There are **four** env vars in play. Copy `.env.example` to `.env` for local dev. The same `.env.example` also documents which ones go into Vercel and where.

| # | Var | Used by | Set where | Required? |
|---|---|---|---|---|
| 1 | `GOOGLE_PLACE_ID` | `scripts/fetch-reviews.mjs` (build-time) | Local `.env` + Vercel "Environment Variables" → Production + Preview | Yes — value is `ChIJ9U5j8FPzcC4RGfoJsjexJvY` |
| 2 | `GOOGLE_PLACES_KEY` | `scripts/fetch-reviews.mjs` (build-time) | Local `.env` + Vercel "Environment Variables" → Production + Preview | Yes — your Places API (New) key |
| 3 | `VERCEL_DEPLOY_HOOK_URL` | `api/cron-rebuild.ts` (runtime, edge) | Vercel "Environment Variables" → Production only. **Never put in local `.env`.** | Yes (only needed once cron is wired) |
| 4 | `CRON_SECRET` | `api/cron-rebuild.ts` (runtime, edge) | **Auto-set by Vercel** when cron runs — do not set manually | n/a |

None of these reach the browser bundle. `GOOGLE_*` vars run only on the build server. `VERCEL_DEPLOY_HOOK_URL` and `CRON_SECRET` run only inside the edge function during cron.

---

## Local development

```bash
cp .env.example .env             # then fill in GOOGLE_PLACES_KEY in .env
npm install
npm run fetch:reviews            # one-time: populate src/data/reviews.json
npm run dev                      # http://localhost:5173
npm run build                    # prebuild (fetch) → vite build → postbuild (prerender)
npm run preview                  # serve the production bundle locally
npm run typecheck                # tsc -b --noEmit
```

If you skip the `fetch:reviews` step, the dev site still renders — just with the empty placeholder (fallback testimonials, no WhatsApp recipient). After running it once, the testimonials section, JSON-LD aggregateRating, and WhatsApp deep links will mirror what production sees.

**Don't commit the populated `src/data/reviews.json`.** The fetcher overwrites it on every build; only the empty-placeholder version belongs in git. If you accidentally stage a populated copy, `git checkout -- src/data/reviews.json` reverts it.

---

## Deployment to Vercel

The project deploys in three phases. Phase A gets the site live with reviews. Phase B turns on the daily review refresh. Phase C cuts over your domain.

### Phase A — first deploy with reviews

**A1.** Push to GitHub (any repo name will do).

**A2.** Go to [vercel.com](https://vercel.com) → **New Project** → import the repo. Vercel auto-detects Vite; leave all defaults.

**A3.** Before clicking Deploy, open **Project Settings → Environment Variables** and add these two:

| Variable | Value | Environments |
|---|---|---|
| `GOOGLE_PLACE_ID` | `ChIJ9U5j8FPzcC4RGfoJsjexJvY` | ☑ Production ☑ Preview |
| `GOOGLE_PLACES_KEY` | *your Google Places API (New) key* | ☑ Production ☑ Preview |

**A4.** Click **Deploy**. When the build runs, the log should include:

```
[reviews] Wrote 5 review(s), rating 4.9, 132 total.
[prerender] Rendered 63606 bytes of HTML.
[prerender] Injected SSR HTML into /vercel/path0/dist/index.html
```

If you see `[reviews] GOOGLE_PLACE_ID or GOOGLE_PLACES_KEY not set — skipping fetch.`, the env vars didn't apply — redeploy after fixing.

**A5.** Open the preview URL. Reviews section should show real Google reviews with the "4.9★ based on 132 Google reviews" header.

### Phase B — daily review refresh (Vercel Cron)

Without this phase the site still works; reviews just won't auto-update. Set this up if you want fresh reviews every day.

**B1.** **Project Settings → Git → Deploy Hooks** → **Create Hook**.
   - Hook name: `Daily reviews refresh`
   - Branch: `main`
   - Click **Create Hook**, then copy the generated URL (`https://api.vercel.com/v1/integrations/deploy/...`).

**B2.** **Project Settings → Environment Variables** → add a third variable:

| Variable | Value | Environments |
|---|---|---|
| `VERCEL_DEPLOY_HOOK_URL` | *the URL from B1* | ☑ Production *(only)* |

**B3.** Trigger a redeploy (Deployments tab → ⋯ → Redeploy on the latest) so the new env var is picked up by the edge function.

**B4.** Verify the cron is active: **Project → Cron Jobs tab** should show `/api/cron-rebuild` on schedule `0 3 * * *`. Click **Run** once. The function should return `{"triggered":true, ...}` and a new deployment should kick off within ~60 seconds.

You don't need to set `CRON_SECRET` — Vercel auto-injects it on every cron invocation, and the edge function verifies it.

### Phase C — domain + SEO

**C1.** Run the live URL through:
- Google [Rich Results Test](https://search.google.com/test/rich-results) → expect ✓ on `MovingCompany` and `FAQPage`.
- [Schema.org Validator](https://validator.schema.org/) → expect 0 errors.

**C2.** Point `indo-mover.com` DNS at Vercel (Project Settings → Domains).

**C3.** [Google Search Console](https://search.google.com/search-console) → add the domain → submit `https://indo-mover.com/sitemap.xml`.

### Cron schedule

`0 3 * * *` = daily at 03:00 UTC = **10:00 WIB**. Vercel Hobby tier allows daily cron only; this is the maximum cadence on the free plan.

### API key safety

- The Places API key runs only on Vercel's build runner. It never lands in the client bundle, never in git, never in a public route.
- Restrict the key in GCP Console → APIs & Services → Credentials:
  - **API restriction:** "Places API (New)" only.
  - **Application restriction:** "None" is fine since the key is server-side. Don't add HTTP-referrer or IP restrictions — Vercel build IPs rotate.

---

## File map

```
indomover/
├── README.md                    ← this file
├── index.html                   ← static head, OG, hreflang
├── package.json                 ← prebuild + fetch:reviews scripts
├── vite.config.ts
├── tsconfig.{json,app.json,node.json}
├── vercel.json                  ← SPA rewrite (excl /api) + crons
├── .env.example
├── .gitignore
├── api/
│   └── cron-rebuild.ts          ← edge function called by Vercel Cron
├── scripts/
│   ├── fetch-reviews.mjs        ← prebuild: pulls Google Places data
│   └── prerender.mjs            ← postbuild: SSR → injects HTML into dist/
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   └── images/                  ← downloaded from indo-mover.com
└── src/
    ├── main.tsx                 ← hydrateRoot when SSR'd, createRoot otherwise
    ├── entry-server.tsx         ← SSR entry exporting render()
    ├── App.tsx
    ├── index.css                ← Tailwind v4 + @theme tokens
    ├── data/
    │   └── reviews.json         ← committed; overwritten by prebuild
    ├── i18n/
    │   ├── LanguageContext.tsx
    │   ├── id.json              ← keyword-rich Indonesian copy + SEO/FAQ
    │   └── en.json              ← English mirror
    ├── lib/
    │   ├── whatsapp.ts          ← WA_NUMBER derived from reviews.json#phone
    │   ├── reviewsData.ts       ← typed view over reviews.json (handles null fields)
    │   └── useScrollSpy.ts
    └── components/
        ├── Navbar.tsx
        ├── Hero.tsx
        ├── About.tsx
        ├── Services.tsx
        ├── ServiceModal.tsx
        ├── WhyUs.tsx
        ├── Testimonials.tsx
        ├── FAQ.tsx              ← native <details>/<summary>, FAQPage schema
        ├── CTA.tsx
        ├── Footer.tsx
        ├── WhatsAppButton.tsx
        ├── ScrollToTop.tsx
        ├── SeoHead.tsx          ← per-language title/meta swap
        └── JsonLd.tsx           ← MovingCompany + FAQPage + WebSite schemas
```

---

## Open TODOs

- [ ] Confirm hero / about / service photos look good at production resolution; some downloaded WP images are sub-1000px.
- [ ] Add a real `og-image.jpg` to `public/` (referenced by `index.html`).
- [ ] Optional hardening: add a pre-commit hook (e.g. lint-staged) that resets `src/data/reviews.json` to the empty placeholder on commit, so a populated copy can never sneak in.
- [ ] After first deploy: submit `https://indo-mover.com/sitemap.xml` to Google Search Console.
- [ ] After first deploy: validate JSON-LD with [Schema.org Validator](https://validator.schema.org/) and Google's [Rich Results Test](https://search.google.com/test/rich-results).
- [ ] After first deploy: point `indo-mover.com` DNS to Vercel.
- [ ] Add Vercel Analytics (optional, one-line add).

## Out of scope

- Per-service detail pages (locked: single page).
- Backend contact form (locked: WhatsApp-only).
- CMS — content lives in the i18n JSON dicts; edit in the repo.
- Blog or content marketing.
- Booking / quote calculator.
