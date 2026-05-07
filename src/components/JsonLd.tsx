import { useLanguage } from "../i18n/LanguageContext";
import { reviewsData as data } from "../lib/reviewsData";

const SITE_URL = "https://indo-mover.com";

function safeJson(obj: unknown): string {
	// Escape `<` so a stray "</script>" inside string fields can't break out.
	return JSON.stringify(obj).replace(/</g, "\\u003c");
}

// Drop properties whose value is null or undefined so the emitted
// JSON-LD doesn't ship empty fields.
function clean<T extends Record<string, unknown>>(obj: T): T {
	const out: Record<string, unknown> = {};
	for (const [k, v] of Object.entries(obj)) {
		if (v === undefined || v === null) continue;
		out[k] = v;
	}
	return out as T;
}

export default function JsonLd() {
	const { t, lang } = useLanguage();

	const inLanguage = lang === "id" ? "id-ID" : "en-US";
	const parts = data.addressParts;

	const address = parts
		? clean({
				"@type": "PostalAddress",
				streetAddress: parts.streetAddress,
				addressLocality: parts.locality,
				addressRegion: parts.region,
				postalCode: parts.postalCode,
				addressCountry: parts.country,
			})
		: data.address
			? { "@type": "PostalAddress", description: data.address }
			: undefined;

	const geo = data.geo
		? {
				"@type": "GeoCoordinates",
				latitude: data.geo.latitude,
				longitude: data.geo.longitude,
			}
		: undefined;

	const aggregateRating =
		data.rating != null && data.totalReviews
			? {
					"@type": "AggregateRating",
					ratingValue: data.rating,
					reviewCount: data.totalReviews,
					bestRating: 5,
					worstRating: 1,
				}
			: undefined;

	const localBusiness = clean({
		"@context": "https://schema.org",
		"@type": "MovingCompany",
		"@id": `${SITE_URL}/#business`,
		name: "Indo Mover",
		alternateName: "Indo Mover Semarang",
		url: SITE_URL,
		image: `${SITE_URL}/images/service-carrying.jpg`,
		logo: `${SITE_URL}/apple-touch-icon.png`,
		description: t.seo.description,
		telephone: data.phone ?? undefined,
		priceRange: "$$",
		address,
		geo,
		areaServed: [
			{ "@type": "City", name: "Semarang" },
			{ "@type": "AdministrativeArea", name: "Jawa Tengah" },
		],
		openingHoursSpecification: [
			{
				"@type": "OpeningHoursSpecification",
				dayOfWeek: [
					"Monday",
					"Tuesday",
					"Wednesday",
					"Thursday",
					"Friday",
					"Saturday",
					"Sunday",
				],
				opens: "08:00",
				closes: "20:00",
			},
		],
		aggregateRating,
		sameAs: data.googleMapsUri ? [data.googleMapsUri] : undefined,
		inLanguage,
	});

	const faqPage = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		inLanguage,
		mainEntity: t.faq.items.map((f) => ({
			"@type": "Question",
			name: f.q,
			acceptedAnswer: {
				"@type": "Answer",
				text: f.a,
			},
		})),
	};

	const website = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		"@id": `${SITE_URL}/#website`,
		url: SITE_URL,
		name: "Indo Mover",
		description: t.seo.description,
		inLanguage,
		publisher: { "@id": `${SITE_URL}/#business` },
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: safeJson(localBusiness) }}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: safeJson(faqPage) }}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: safeJson(website) }}
			/>
		</>
	);
}
