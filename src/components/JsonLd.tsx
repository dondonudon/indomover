import { useLanguage } from "../i18n/LanguageContext";
import { safeJson } from "../lib/jsonLd";
import { reviewsData as data } from "../lib/reviewsData";

const SITE_URL = "https://indo-mover.com";

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
			{ "@type": "Place", name: "Tembalang" },
			{ "@type": "Place", name: "Banyumanik" },
			{ "@type": "Place", name: "Pedurungan" },
			{ "@type": "Place", name: "Genuk" },
			{ "@type": "Place", name: "Semarang Tengah" },
			{ "@type": "Place", name: "Semarang Barat" },
			{ "@type": "Place", name: "Semarang Selatan" },
			{ "@type": "Place", name: "Ngaliyan" },
			{ "@type": "City", name: "Demak" },
			{ "@type": "City", name: "Ungaran" },
			{ "@type": "City", name: "Kendal" },
		],
		openingHoursSpecification: [
			{
				"@type": "OpeningHoursSpecification",
				dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
				opens: "00:00",
				closes: "23:59",
			},
		],
		aggregateRating,
		hasOfferCatalog: {
			"@type": "OfferCatalog",
			name: "Layanan Jasa Pindah",
			itemListElement: [
				{ "@type": "Offer", itemOffered: { "@type": "Service", name: "Jasa Pindah Rumah Semarang" } },
				{ "@type": "Offer", itemOffered: { "@type": "Service", name: "Jasa Pindah Kantor Semarang" } },
				{ "@type": "Offer", itemOffered: { "@type": "Service", name: "Jasa Pindah Kost Semarang" } },
				{ "@type": "Offer", itemOffered: { "@type": "Service", name: "Jasa Packing Profesional" } },
				{ "@type": "Offer", itemOffered: { "@type": "Service", name: "Jasa Bongkar Muat" } },
				{ "@type": "Offer", itemOffered: { "@type": "Service", name: "Jasa Pindah Antar Kota" } },
			],
		},
		sameAs: data.googleMapsUri ? [data.googleMapsUri] : undefined,
		inLanguage,
	});

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
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(website) }} />
		</>
	);
}
