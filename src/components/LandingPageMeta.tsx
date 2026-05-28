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
	}, [page]);

	return null;
}
