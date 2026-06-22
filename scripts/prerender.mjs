#!/usr/bin/env node
// postbuild step: SSR-render the React app for every public route and write
// each to its own dist/<slug>/index.html. Improves SEO by giving crawlers
// fully-rendered content without waiting for JS hydration.

import { readFile, writeFile, rm, mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { build } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const SSR_DIR = resolve(ROOT, "dist-ssr");
const ENTRY_OUT = resolve(SSR_DIR, "entry-server.js");
const DIST = resolve(ROOT, "dist");

const SITE_URL = "https://indo-mover.com";

// Route definitions: each entry becomes a pre-rendered HTML file.
// title/description/canonical are injected into <head> at build time so
// crawlers see correct meta even before JS hydrates.
const ROUTES = [
  {
    path: "/",
    outDir: DIST,
    isRoot: true,
    title: "Jasa Pindah Semarang Terpercaya & Profesional | Indo Mover 2026",
    description:
      "Jasa pindah Semarang terpercaya — Indo Mover melayani pindah rumah, kantor, gudang & apartemen. Tim profesional, armada terawat, packing rapi. Survey & konsultasi gratis via WhatsApp.",
    canonical: `${SITE_URL}/`,
  },
  {
    path: "/jasa-pindah-rumah-semarang/",
    outDir: resolve(DIST, "jasa-pindah-rumah-semarang"),
    title: "Jasa Pindah Rumah Semarang Terpercaya, Harga Terjangkau | Indo Mover 2026",
    description:
      "Jasa pindah rumah Semarang profesional — Indo Mover melayani packing, angkut, & bongkar muat. Tim terlatih, armada terawat, harga transparan. Survey gratis ke seluruh wilayah Semarang.",
    canonical: `${SITE_URL}/jasa-pindah-rumah-semarang/`,
  },
  {
    path: "/jasa-pindah-kantor-semarang/",
    outDir: resolve(DIST, "jasa-pindah-kantor-semarang"),
    title: "Jasa Pindah Kantor Semarang Profesional, Minim Downtime | Indo Mover 2026",
    description:
      "Jasa pindah kantor Semarang oleh Indo Mover — penanganan peralatan IT, arsip, dan furnitur kantor. Jadwal fleksibel di luar jam operasional. Survey gratis, harga transparan.",
    canonical: `${SITE_URL}/jasa-pindah-kantor-semarang/`,
  },
  {
    path: "/jasa-pindah-kost-semarang/",
    outDir: resolve(DIST, "jasa-pindah-kost-semarang"),
    title: "Jasa Pindah Kost Semarang Murah & Cepat | Indo Mover 2026",
    description:
      "Jasa pindah kost Semarang cepat & terjangkau — Indo Mover melayani pindahan kamar kost, kontrakan, dan studio apartemen. Pick-Up & Blind Van tersedia. Survey gratis via WhatsApp.",
    canonical: `${SITE_URL}/jasa-pindah-kost-semarang/`,
  },
  {
    path: "/jasa-pindah-murah-semarang/",
    outDir: resolve(DIST, "jasa-pindah-murah-semarang"),
    title: "Jasa Pindah Murah Semarang, Terpercaya & Profesional | Indo Mover 2026",
    description:
      "Cari jasa pindah murah di Semarang? Indo Mover menawarkan harga terjangkau dengan kualitas profesional. Armada sesuai kebutuhan, harga transparan, survey gratis. Hubungi via WhatsApp.",
    canonical: `${SITE_URL}/jasa-pindah-murah-semarang/`,
  },
  {
    path: "/jasa-pindah-antar-kota/",
    outDir: resolve(DIST, "jasa-pindah-antar-kota"),
    title: "Jasa Pindah Antar Kota dari Semarang | Indo Mover 2026",
    description:
      "Jasa pindah antar kota dari Semarang — Indo Mover melayani rute ke Jakarta, Surabaya, Yogyakarta, Bandung & seluruh Indonesia. Tim berpengalaman, armada tertutup, harga transparan.",
    canonical: `${SITE_URL}/jasa-pindah-antar-kota/`,
  },
  {
    path: "/jasa-pindah-apartemen-semarang/",
    outDir: resolve(DIST, "jasa-pindah-apartemen-semarang"),
    title: "Jasa Pindah Apartemen Semarang Profesional | Indo Mover 2026",
    description:
      "Jasa pindah apartemen Semarang — Indo Mover berpengalaman menangani tantangan pindahan apartemen: lift, parkir terbatas, aturan gedung. Tim terlatih, armada tepat, survey gratis.",
    canonical: `${SITE_URL}/jasa-pindah-apartemen-semarang/`,
  },
];

function patchHead(html, { title, description, canonical, isRoot = false }) {
  let result = html
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(
      /(<meta\s+name="description"\s+content=")[^"]*(")/,
      `$1${description}$2`,
    )
    .replace(
      /(<meta\s+property="og:title"\s+content=")[^"]*(")/,
      `$1${title}$2`,
    )
    .replace(
      /(<meta\s+property="og:description"\s+content=")[^"]*(")/,
      `$1${description}$2`,
    )
    .replace(
      /(<meta\s+property="og:url"\s+content=")[^"]*(")/,
      `$1${canonical}$2`,
    )
    .replace(
      /(<link\s+rel="canonical"\s+href=")[^"]*(")/,
      `$1${canonical}$2`,
    )
    .replace(/<lastmod>[^<]*<\/lastmod>/g, `<lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>`);

  if (!isRoot) {
    // Landing pages are Indonesian-only: fix hreflang id/x-default to point
    // to this page's canonical and remove the English alternate entirely.
    result = result
      .replace(
        /(<link\s+rel="alternate"\s+hreflang="id"\s+href=")[^"]*(")/,
        `$1${canonical}$2`,
      )
      .replace(
        /(<link\s+rel="alternate"\s+hreflang="x-default"\s+href=")[^"]*(")/,
        `$1${canonical}$2`,
      )
      // Remove the en alternate — no English version exists for landing pages
      .replace(
        /\n?\s*<link\s+rel="alternate"\s+hreflang="en"\s+href="[^"]*"\s*\/>/g,
        '',
      );
  }

  return result;
}

async function main() {
  console.log("[prerender] Building SSR bundle…");
  await build({
    root: ROOT,
    logLevel: "warn",
    build: {
      ssr: "src/entry-server.tsx",
      outDir: "dist-ssr",
      emptyOutDir: true,
    },
    ssr: { noExternal: true },
  });

  console.log(`[prerender] Importing ${ENTRY_OUT}…`);
  const { render } = await import(pathToFileURL(ENTRY_OUT).href);

  const templateHtml = await readFile(resolve(DIST, "index.html"), "utf8");
  if (!templateHtml.includes('<div id="root"></div>')) {
    throw new Error("[prerender] Could not find <div id='root'></div> in dist/index.html");
  }

  for (const route of ROUTES) {
    console.log(`[prerender] Rendering ${route.path}…`);
    const appHtml = render(route.path);
    let html = templateHtml.replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div>`,
    );
    html = patchHead(html, route);

    await mkdir(route.outDir, { recursive: true });
    await writeFile(resolve(route.outDir, "index.html"), html, "utf8");
    console.log(`[prerender] Wrote ${route.outDir}/index.html (${appHtml.length} bytes)`);
  }

  // Update sitemap lastmod in the home page copy
  const SITEMAP_PATH = resolve(DIST, "sitemap.xml");
  const today = new Date().toISOString().slice(0, 10);
  try {
    let sitemap = await readFile(SITEMAP_PATH, "utf8");
    sitemap = sitemap.replace(/<lastmod>[^<]*<\/lastmod>/g, `<lastmod>${today}</lastmod>`);
    await writeFile(SITEMAP_PATH, sitemap, "utf8");
    console.log(`[prerender] Updated sitemap lastmod to ${today}`);
  } catch {
    console.warn("[prerender] sitemap.xml not found in dist — skipping.");
  }

  await rm(SSR_DIR, { recursive: true, force: true });
  console.log("[prerender] Done.");
}

main().catch((err) => {
  console.error("[prerender] Failed:", err);
  process.exit(1);
});
