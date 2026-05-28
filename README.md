# Indo Mover — React SPA

A React rebuild of [indo-mover.com](https://indo-mover.com/) — a Semarang-based moving services portfolio. Originally WordPress; this version is Vite + React + SSR prerendering deployed on Vercel free tier.

This document is the single source of truth for what's been built and why. Update it when decisions change.

---

## Stack

- **Vite 6 + React 18 + TypeScript** — ~310 KB JS / 100 KB gzipped.
- **Tailwind CSS v4** via `@tailwindcss/vite`.
- **react-router-dom v7** — `BrowserRouter` client-side, `StaticRouter` (from `react-router`) for SSR.
- **Framer Motion** for section reveals.
- **lucide-react** for icons.
- **Hand-rolled i18n** (`LanguageContext` + two JSON dicts). No `react-i18next`.
- **SSR prerender** — `postbuild` renders all 7 routes to separate `dist/<slug>/index.html` files; crawlers get fully-rendered HTML with per-route `<title>`, meta, og tags, and canonical.
- **`@vercel/analytics`** — `<Analytics />` at App root; no-ops in local dev.

---

## Locked decisions

| # | Decision | Choice | Notes |
|---|---|---|---|
| 1 | Design fidelity | Modernize freely | Same sections + copy as the WP site, redesigned visuals. |
| 2 | Routing | react-router-dom v7, multi-page | Home `/` + 6 landing pages (see below). In-page section links use anchor scroll. |
| 3 | Languages | Indonesian + English | Default is **always Indonesian**. EN is opt-in via the toggle and persisted in `localStorage`. |
| 4 | Contact | WhatsApp deep links only | All CTAs build `wa.me/<number>?text=...` links. No backend form. |
| 5 | Hosting | Vercel free tier (Hobby) | Static SPA + 1 edge function for cron. |
| 6 | Reviews | **Build-time bake** from Google Places API (New) | Fetched during `prebuild`, written to `src/data/reviews.json`, imported into the bundle. **No API key in the client.** Refreshed monthly by Vercel Cron. |
| 7 | SEO | Multi-page SSR + JSON-LD + keyword copy | Targets "jasa pindah semarang" and long-tail variants. See `SEO_PLAN.md` for full details. |

---

## Pages

| Route | Target keyword | Pre-rendered HTML |
|---|---|---|
| `/` | jasa pindah semarang | ~79 KB |
| `/jasa-pindah-rumah-semarang/` | jasa pindah rumah semarang | ~60 KB |
| `/jasa-pindah-kantor-semarang/` | jasa pindah kantor semarang | ~58 KB |
| `/jasa-pindah-kost-semarang/` | jasa pindah kost semarang | ~56 KB |
| `/jasa-pindah-murah-semarang/` | jasa pindah murah semarang | ~57 KB |
| `/jasa-pindah-antar-kota/` | jasa pindah antar kota semarang | ~57 KB |
| `/jasa-pindah-apartemen-semarang/` | jasa pindah apartemen semarang | ~57 KB |

All landing pages share the same component template (`LandingPage.tsx`) and get unique page-specific content from `src/data/landingPages.ts`.

---

## Architecture

### Home page sections (render order)

`src/pages/HomePage.tsx`:

1. `Navbar` — sticky, translucent on scroll, scroll-spy active link, ID/EN toggle, WhatsApp CTA.
2. `Hero` — full-viewport, 2 CTAs (WhatsApp + scroll-to-services).
3. `About` — 2-column copy + image, 6 highlight bullets including district coverage.
4. `Services` — 4 cards in a responsive grid, each opens `ServiceModal`.
5. `ServicePageLinks` — 6-item grid linking to each landing page (body-level internal links).
6. `Fleet` — responsive table: Pick-Up / CDE / CDD / Fuso with capacity and best-for columns.
7. `WhyUs` — 3 feature blocks.
8. `HowItWorks` — 4-step numbered process with connector lines on desktop.
9. `Testimonials` — real Google reviews (min rating 5, min 60 chars), falls back to i18n placeholders.
10. `FAQ` — 10 Q&A items (pricing range, fleet types, districts, inter-city) with `FAQPage` JSON-LD.
11. `CTA` — full-width band with WhatsApp button + Google Maps iframe.
12. `ServiceArea` — tag-pill grid of 16 Semarang districts, 5 nearby cities, 8 inter-city routes.
13. `Footer` — links to all 6 landing pages + section anchors (uses `useLocation()` for cross-page anchors).

Mounted at root (render null): `SeoHead`, `JsonLd`, `Analytics`, `WhatsAppButton`, `ScrollToTop`.

### Landing page sections (render order)

`src/pages/LandingPage.tsx`:

`LandingHero` → `LandingIntro` → `Services` → `Fleet` → `WhyUs` → `HowItWorks` → `FAQ` (page-specific items) → `RelatedServices` (5 sibling page links) → `CTA` → `ServiceArea`

Each landing page emits 3 JSON-LD schemas: `FAQPage`, `Service`, `BreadcrumbList`.

### i18n

- `src/i18n/LanguageContext.tsx` — provider + `useLanguage()` hook returning `{ lang, setLang, t }`.
- `src/i18n/id.json` (default) and `src/i18n/en.json` (opt-in) — must be structurally identical; TypeScript infers the `Dict` type from `id.json`.
- Initial language: localStorage → `id`. English requires explicit user choice.
- Side effects: `<html lang>` and `localStorage["indomover.lang"]` stay in sync.

### Scroll spy

`src/lib/useScrollSpy.ts` — IntersectionObserver hook. Navbar passes section IDs (`beranda`, `tentang`, `layanan`, `mengapa`, `testimoni`, `kontak`); active link gets a brand-tinted color.

### WhatsApp links

`src/lib/whatsapp.ts` derives `WA_NUMBER` from `data.phone` in `src/data/reviews.json` (normalises leading `0` → `62`). No phone is hardcoded. Each section builds its own `buildWaLink(message)` with a context-specific message.

### Internal links

- **Home → landing pages**: `ServicePageLinks` (body) + footer services column = 2 links per landing page.
- **Landing → sibling landing pages**: `RelatedServices` (body) + footer services column = 2 links to every sibling.
- **Landing → home**: Navbar logo + nav links.

### Service modal

`src/components/ServiceModal.tsx` — driven by `services.items[].slug`, `image`, `bullets` in i18n JSON. ESC closes, click-outside closes, body scroll locked while open.

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

**Why two API calls?** The Places API caps `reviews` at 5 per response. Two calls (`languageCode=en` + `languageCode=id`) return overlapping-but-not-identical sets, giving 6–10 unique reviews. Deduped by `r.name`.

**reviews.json convention.** The committed file is an empty placeholder — no phone, address, or geo data in the repo. The prebuild overwrites it with real data on every build. Never commit a populated copy.

| Situation | What's in reviews.json |
|---|---|
| Fresh clone, no env vars | Empty placeholder — fallback i18n testimonials render, WhatsApp links go to `wa.me/` (no recipient) |
| Local after `npm run fetch:reviews` | Populated — mirrors production |
| Vercel build (env vars set) | Populated on build runner; never re-enters the repo |

If you accidentally stage a populated `reviews.json`: `git checkout -- src/data/reviews.json`.

### SEO pipeline

```
         prebuild                    build                    postbuild
            │                          │                          │
            ▼                          ▼                          ▼
  fetch-reviews.mjs            tsc -b && vite build          prerender.mjs
  → src/data/reviews.json      → dist/{index.html,            ↳ vite build --ssr
    (rating, phone,               assets/*}                   ↳ render(url) for each route
     address, items)                                          ↳ patchHead() per route
                                                              ↳ write dist/<slug>/index.html
                                                              ↳ update sitemap lastmod
```

`patchHead()` in `prerender.mjs` replaces `<title>`, meta description, og:title, og:description, og:url, and canonical in each HTML file using regex — so every pre-rendered page has correct, unique head tags before any JS runs.

### Cron refresh

```
Vercel Cron (monthly, 03:00 UTC on the 1st)
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

Schedule: `0 3 1 * *` — 03:00 UTC on the 1st of each month (= 10:00 WIB). Monthly is well within Vercel Hobby cron limits. Edit `vercel.json` to change cadence.

---

## Environment variables

| # | Var | Used by | Set where | Required? |
|---|---|---|---|---|
| 1 | `GOOGLE_PLACE_ID` | `scripts/fetch-reviews.mjs` (build-time) | Local `.env` + Vercel → Production + Preview | Yes — value is `ChIJ9U5j8FPzcC4RGfoJsjexJvY` |
| 2 | `GOOGLE_PLACES_KEY` | `scripts/fetch-reviews.mjs` (build-time) | Local `.env` + Vercel → Production + Preview | Yes — your Places API (New) key |
| 3 | `VERCEL_DEPLOY_HOOK_URL` | `api/cron-rebuild.ts` (runtime, edge) | Vercel → Production only. **Never in local `.env`.** | Yes (once cron is wired) |
| 4 | `CRON_SECRET` | `api/cron-rebuild.ts` (runtime, edge) | **Auto-set by Vercel** — do not set manually | n/a |

None of these reach the browser bundle.

---

## Local development

```bash
cp .env.example .env             # fill in GOOGLE_PLACES_KEY
npm install
npm run fetch:reviews            # populate src/data/reviews.json (one-time)
npm run dev                      # http://localhost:5173
npm run build                    # prebuild → vite build → postbuild (prerender all 7 routes)
npm run preview                  # serve the production bundle locally
npm run typecheck                # tsc -b --noEmit
```

If you skip `fetch:reviews`, the site still renders — fallback testimonials, no WhatsApp recipient. Run it once to mirror production.

---

## Deployment to Vercel

### Phase A — first deploy with reviews

**A1.** Push to GitHub.

**A2.** Vercel → **New Project** → import repo. Vite is auto-detected; leave all defaults.

**A3.** Before clicking Deploy, add env vars under **Project Settings → Environment Variables**:

| Variable | Value | Environments |
|---|---|---|
| `GOOGLE_PLACE_ID` | `ChIJ9U5j8FPzcC4RGfoJsjexJvY` | ☑ Production ☑ Preview |
| `GOOGLE_PLACES_KEY` | *your Places API key* | ☑ Production ☑ Preview |

**A4.** Click **Deploy**. Build log should include:

```
[reviews] Wrote 5 review(s), rating 4.9, 132 total.
[prerender] Wrote dist/index.html (79590 bytes)
[prerender] Wrote dist/jasa-pindah-rumah-semarang/index.html (60309 bytes)
...
[prerender] Done.
```

**A5.** Open the preview URL. Reviews, fleet table, how-it-works steps, and service area should all render.

### Phase B — monthly review refresh (Vercel Cron)

**B1.** **Project Settings → Git → Deploy Hooks** → **Create Hook** → branch `main` → copy the URL.

**B2.** **Environment Variables** → add:

| Variable | Value | Environments |
|---|---|---|
| `VERCEL_DEPLOY_HOOK_URL` | *URL from B1* | ☑ Production only |

**B3.** Redeploy so the edge function picks up the new var.

**B4.** **Project → Cron Jobs tab** → should show `/api/cron-rebuild` on `0 3 1 * *`. Click **Run** once to verify it returns `{"triggered":true}`.

### Phase C — domain + SEO

**C1.** Rich Results Test → expect ✓ on `MovingCompany`, `FAQPage`, `Service`, `BreadcrumbList`.

**C2.** Point `indo-mover.com` DNS at Vercel (Project Settings → Domains).

**C3.** Google Search Console → add domain → submit `https://indo-mover.com/sitemap.xml` (7 URLs) → request indexing for each landing page URL via URL Inspection.

**C4.** Vercel **Analytics** tab → **Enable Analytics**.

### API key safety

Restrict the key in GCP Console → APIs & Services → Credentials:
- **API restriction:** "Places API (New)" only.
- **Application restriction:** "None" — key is server-side only; don't add HTTP-referrer or IP restrictions (Vercel build IPs rotate).

---

## File map

```
indomover/
├── README.md
├── SEO_PLAN.md                  ← full SEO research, competitive analysis, implementation log
├── index.html                   ← static head defaults (patched per-route by prerender.mjs)
├── package.json
├── vite.config.ts
├── tsconfig.{json,app.json,node.json}
├── vercel.json                  ← SPA catch-all rewrite (excl /api) + monthly cron
├── .env.example
├── .gitignore
├── api/
│   └── cron-rebuild.ts          ← edge function called by Vercel Cron
├── scripts/
│   ├── fetch-reviews.mjs        ← prebuild: pulls Google Places data
│   └── prerender.mjs            ← postbuild: renders 7 routes → dist/<slug>/index.html
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   ├── sitemap.xml              ← 7 URLs; lastmod auto-updated by prerender.mjs on every build
│   └── images/
└── src/
    ├── main.tsx                 ← BrowserRouter; hydrateRoot when SSR'd, createRoot otherwise
    ├── entry-server.tsx         ← SSR entry: StaticRouter (from react-router) + render(url)
    ├── App.tsx                  ← Routes: / → HomePage, /<slug>/ → LandingPage
    ├── index.css                ← Tailwind v4 + @theme tokens
    ├── data/
    │   ├── reviews.json         ← committed empty placeholder; overwritten by prebuild
    │   └── landingPages.ts      ← content + metadata for all 6 landing pages
    ├── i18n/
    │   ├── LanguageContext.tsx
    │   ├── id.json              ← default; Dict type inferred from this file
    │   └── en.json              ← structurally identical English mirror
    ├── lib/
    │   ├── whatsapp.ts
    │   ├── jsonLd.ts            ← safeJson() escapes < for safe JSON-LD injection
    │   ├── reviewsData.ts
    │   └── useScrollSpy.ts
    ├── pages/
    │   ├── HomePage.tsx         ← home page composition
    │   └── LandingPage.tsx      ← landing page template (shared by all 6 pages)
    └── components/
        ├── Navbar.tsx           ← useLocation() for cross-page anchor hrefs
        ├── Hero.tsx
        ├── About.tsx
        ├── Services.tsx
        ├── ServiceModal.tsx
        ├── ServicePageLinks.tsx ← home page: 6-item grid → each landing page
        ├── Fleet.tsx            ← vehicle table (Pick-Up / CDE / CDD / Fuso)
        ├── WhyUs.tsx
        ├── HowItWorks.tsx       ← 4-step numbered process
        ├── Testimonials.tsx
        ├── FAQ.tsx              ← accepts optional items prop; emits FAQPage JSON-LD
        ├── RelatedServices.tsx  ← landing page: 5 sibling page links
        ├── CTA.tsx
        ├── ServiceArea.tsx      ← 16 districts + nearby cities + inter-city tag pills
        ├── Footer.tsx           ← useLocation() for cross-page anchors; links all 6 landing pages
        ├── LandingHero.tsx      ← page-specific hero for landing pages
        ├── LandingIntro.tsx     ← page-specific intro + highlights for landing pages
        ├── LandingPageMeta.tsx  ← useEffect: patches title/meta/og/canonical on landing pages
        ├── WhatsAppButton.tsx
        ├── ScrollToTop.tsx
        ├── SeoHead.tsx          ← home page per-language title/meta swap
        └── JsonLd.tsx           ← MovingCompany + WebSite schemas (global)
```

---

## Out of scope

- Backend contact form (locked: WhatsApp-only).
- CMS — content lives in i18n JSON and `src/data/landingPages.ts`; edit in the repo.
- Blog or content marketing.
- Booking / quote calculator.
