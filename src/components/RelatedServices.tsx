import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { LANDING_PAGES } from "../data/landingPages";
import { useLanguage } from "../i18n/LanguageContext";

export default function RelatedServices({ currentSlug }: { currentSlug: string }) {
	const { t } = useLanguage();
	const siblings = Object.values(LANDING_PAGES).filter((p) => p.slug !== currentSlug);

	return (
		<section className="bg-white py-16 sm:py-20">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<p className="text-sm font-semibold uppercase tracking-wider text-brand-600 mb-6">
					{t.internalLinks.relatedServices}
				</p>

				<motion.ul
					initial="hidden"
					whileInView="show"
					viewport={{ once: true, margin: "-60px" }}
					variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
					className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
				>
					{siblings.map((page) => (
						<motion.li
							key={page.slug}
							variants={{
								hidden: { opacity: 0, y: 12 },
								show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
							}}
						>
							<a
								href={`/${page.slug}/`}
								className="group flex h-full flex-col rounded-xl bg-ink-50 px-4 py-4 ring-1 ring-ink-200 transition-all hover:bg-brand-50 hover:ring-brand-300"
							>
								<span className="text-sm font-semibold text-ink-800 group-hover:text-brand-700 leading-snug">
									{page.navLabel}
								</span>
								<span className="mt-auto pt-3 inline-flex items-center gap-1 text-xs font-medium text-brand-600">
									{t.internalLinks.viewPage}
									<ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" aria-hidden />
								</span>
							</a>
						</motion.li>
					))}
				</motion.ul>
			</div>
		</section>
	);
}
