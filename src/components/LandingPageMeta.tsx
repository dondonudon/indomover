import { useEffect } from "react";
import type { LandingPageData } from "../data/landingPages";

const SITE_URL = "https://indo-mover.com";

function setMeta(selector: string, value: string) {
	const el = document.querySelector<HTMLMetaElement>(selector);
	if (el) el.setAttribute("content", value);
}

function setLink(rel: string, href: string) {
	const el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
	if (el) el.setAttribute("href", href);
}

export default function LandingPageMeta({ page }: { page: LandingPageData }) {
	useEffect(() => {
		const canonical = `${SITE_URL}/${page.slug}/`;

		document.title = page.meta.title;
		document.documentElement.lang = "id";

		setMeta('meta[name="description"]', page.meta.description);
		setMeta('meta[property="og:title"]', page.meta.title);
		setMeta('meta[property="og:description"]', page.meta.description);
		setMeta('meta[property="og:url"]', canonical);
		setMeta('meta[property="og:locale"]', "id_ID");
		setMeta('meta[name="twitter:title"]', page.meta.title);
		setMeta('meta[name="twitter:description"]', page.meta.description);
		setLink("canonical", canonical);

		// Landing pages are Indonesian-only: fix hreflang id/x-default to this
		// page and remove the English alternate (which the home page sets).
		const idLink = document.querySelector<HTMLLinkElement>('link[rel="alternate"][hreflang="id"]');
		if (idLink) idLink.setAttribute("href", canonical);

		const xdefLink = document.querySelector<HTMLLinkElement>('link[rel="alternate"][hreflang="x-default"]');
		if (xdefLink) xdefLink.setAttribute("href", canonical);

		const enLink = document.querySelector<HTMLLinkElement>('link[rel="alternate"][hreflang="en"]');
		if (enLink) enLink.parentNode?.removeChild(enLink);
	}, [page]);

	return null;
}
