import CTA from "../components/CTA";
import FAQ from "../components/FAQ";
import Fleet from "../components/Fleet";
import HowItWorks from "../components/HowItWorks";
import LandingHero from "../components/LandingHero";
import LandingIntro from "../components/LandingIntro";
import LandingPageMeta from "../components/LandingPageMeta";
import RelatedServices from "../components/RelatedServices";
import ServiceArea from "../components/ServiceArea";
import Services from "../components/Services";
import WhyUs from "../components/WhyUs";
import { LANDING_PAGES } from "../data/landingPages";
import { useLanguage } from "../i18n/LanguageContext";
import { safeJson } from "../lib/jsonLd";

const SITE_URL = "https://indo-mover.com";

export default function LandingPage({ slug }: { slug: string }) {
	const page = LANDING_PAGES[slug];
	const { lang } = useLanguage();
	const inLanguage = lang === "id" ? "id-ID" : "en-US";

	if (!page) return null;

	const canonical = `${SITE_URL}/${page.slug}/`;

	const faqSchema = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		inLanguage,
		mainEntity: page.faq.map((f) => ({
			"@type": "Question",
			name: f.q,
			acceptedAnswer: { "@type": "Answer", text: f.a },
		})),
	};

	const serviceSchema = {
		"@context": "https://schema.org",
		"@type": "Service",
		name: page.schema.name,
		provider: { "@type": "MovingCompany", name: "Indo Mover" },
		areaServed: { "@type": "City", name: "Semarang" },
		url: canonical,
	};

	const breadcrumbSchema = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{ "@type": "ListItem", position: 1, name: "Beranda", item: `${SITE_URL}/` },
			{ "@type": "ListItem", position: 2, name: page.schema.name, item: canonical },
		],
	};

	return (
		<>
			<LandingPageMeta page={page} />
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: safeJson(faqSchema) }}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: safeJson(serviceSchema) }}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: safeJson(breadcrumbSchema) }}
			/>
			<main>
				<LandingHero page={page} />
				<LandingIntro page={page} />
				<Services />
				<Fleet />
				<WhyUs />
				<HowItWorks />
				<FAQ items={page.faq} />
				<RelatedServices currentSlug={slug} />
				<CTA />
				<ServiceArea />
			</main>
		</>
	);
}
