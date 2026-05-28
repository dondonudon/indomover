import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { safeJson } from "../lib/jsonLd";

interface FaqItem {
	q: string;
	a: string;
}

export default function FAQ({ items: overrideItems }: { items?: FaqItem[] } = {}) {
	const { t, lang } = useLanguage();
	const items = overrideItems ?? t.faq.items;
	const inLanguage = lang === "id" ? "id-ID" : "en-US";

	const faqSchema = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		inLanguage,
		mainEntity: items.map((f) => ({
			"@type": "Question",
			name: f.q,
			acceptedAnswer: { "@type": "Answer", text: f.a },
		})),
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: safeJson(faqSchema) }}
			/>
			<section id="faq" className="bg-white py-20 sm:py-28">
				<div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
							{t.faq.eyebrow}
						</p>
						<h2 className="mt-2 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
							{t.faq.title}
						</h2>
					</div>

					<motion.ul
						key={lang}
						initial="hidden"
						whileInView="show"
						viewport={{ once: true, margin: "-80px" }}
						variants={{
							hidden: {},
							show: { transition: { staggerChildren: 0.05 } },
						}}
						className="mt-12 divide-y divide-ink-200 overflow-hidden rounded-2xl ring-1 ring-ink-200"
					>
						{items.map((item) => (
							<motion.li
								key={item.q}
								variants={{
									hidden: { opacity: 0, y: 8 },
									show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
								}}
								className="bg-white"
							>
								<details className="group">
									<summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 transition-colors hover:bg-ink-50">
										<h3 className="text-base font-semibold text-ink-900 sm:text-lg">{item.q}</h3>
										<ChevronDown
											className="h-5 w-5 flex-none text-ink-700 transition-transform duration-300 group-open:rotate-180"
											aria-hidden
										/>
									</summary>
									<div className="px-6 pb-6 text-ink-700 leading-relaxed">{item.a}</div>
								</details>
							</motion.li>
						))}
					</motion.ul>
				</div>
			</section>
		</>
	);
}
