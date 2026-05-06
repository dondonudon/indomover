import { useEffect } from "react";
import { useLanguage } from "../i18n/LanguageContext";

const SITE_URL = "https://indo-mover.com";

function setMeta(selector: string, attr: string, value: string) {
  const el = document.querySelector<HTMLMetaElement>(selector);
  if (el) {
    el.setAttribute(attr, value);
    return;
  }
  const tag = document.createElement("meta");
  // selector form: meta[name="x"] or meta[property="x"]
  const m = selector.match(/^meta\[(\w+)="([^"]+)"\]$/);
  if (!m) return;
  tag.setAttribute(m[1], m[2]);
  tag.setAttribute(attr, value);
  document.head.appendChild(tag);
}

function setLink(rel: string, href: string, hreflang?: string) {
  const sel = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]`;
  const el = document.querySelector<HTMLLinkElement>(sel);
  if (el) {
    el.setAttribute("href", href);
    return;
  }
  const tag = document.createElement("link");
  tag.setAttribute("rel", rel);
  if (hreflang) tag.setAttribute("hreflang", hreflang);
  tag.setAttribute("href", href);
  document.head.appendChild(tag);
}

export default function SeoHead() {
  const { t, lang } = useLanguage();

  useEffect(() => {
    document.title = t.seo.title;
    document.documentElement.lang = lang;

    setMeta('meta[name="description"]', "content", t.seo.description);
    setMeta('meta[property="og:title"]', "content", t.seo.title);
    setMeta('meta[property="og:description"]', "content", t.seo.description);
    setMeta('meta[property="og:locale"]', "content", lang === "id" ? "id_ID" : "en_US");
    setMeta(
      'meta[property="og:locale:alternate"]',
      "content",
      lang === "id" ? "en_US" : "id_ID",
    );

    setLink("canonical", lang === "id" ? `${SITE_URL}/` : `${SITE_URL}/?lang=en`);
    setLink("alternate", `${SITE_URL}/`, "id");
    setLink("alternate", `${SITE_URL}/?lang=en`, "en");
    setLink("alternate", `${SITE_URL}/`, "x-default");
  }, [t, lang]);

  return null;
}
