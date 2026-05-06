#!/usr/bin/env node
// postbuild step: SSR-render the React app once and inject the HTML
// into dist/index.html. Improves SEO by giving crawlers fully-rendered
// content without waiting for JS hydration. Hydration on the client
// continues to work because main.tsx uses hydrateRoot when the root
// already has children.

import { readFile, writeFile, rm } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { build } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const SSR_DIR = resolve(ROOT, "dist-ssr");
const ENTRY_OUT = resolve(SSR_DIR, "entry-server.js");
const INDEX_PATH = resolve(ROOT, "dist/index.html");

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
    ssr: {
      // Bundle deps inline so the SSR output can be node-imported standalone.
      noExternal: true,
    },
  });

  console.log(`[prerender] Importing ${ENTRY_OUT}…`);
  const { render } = await import(pathToFileURL(ENTRY_OUT).href);
  const appHtml = render();
  console.log(`[prerender] Rendered ${appHtml.length} bytes of HTML.`);

  let html = await readFile(INDEX_PATH, "utf8");
  if (!html.includes('<div id="root"></div>')) {
    throw new Error(
      `[prerender] Could not find <div id="root"></div> in ${INDEX_PATH}`,
    );
  }
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`,
  );
  await writeFile(INDEX_PATH, html, "utf8");
  console.log(`[prerender] Injected SSR HTML into ${INDEX_PATH}`);

  await rm(SSR_DIR, { recursive: true, force: true });
  console.log("[prerender] Done.");
}

main().catch((err) => {
  console.error("[prerender] Failed:", err);
  process.exit(1);
});
