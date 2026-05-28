import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { LANDING_PAGES } from "../data/landingPages";
import { useLanguage } from "../i18n/LanguageContext";

const PAGES = Object.values(LANDING_PAGES);

export default function ServicePageLinks() {
	const { t } = useLanguage();

	return (
		<section className="bg-ink-50 py-14 sm:py-16">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mb-8 text-center">
					<p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
						{t.internalLinks.servicePages}
					</p>
					<p className="mt-2 text-ink-600">{t.internalLinks.servicePagesSubtitle}</p>
				</div>

				<motion.ul
					initial="hidden"
					whileInView="show"
					viewport={{ once: true, margin: "-60px" }}
					variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
					className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
				>
					{PAGES.map((page) => (
						<motion.li
							key={page.slug}
							variants={{
								hidden: { opacity: 0, y: 12 },
								show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
							}}
						>
							<a
								href={`/${page.slug}/`}
								className="group flex items-center justify-between rounded-xl bg-white px-5 py-4 text-sm font-semibold text-ink-800 ring-1 ring-ink-200 transition-all hover:ring-brand-400 hover:text-brand-700 hover:shadow-sm"
							>
								{page.navLabel}
								<ArrowRight className="h-4 w-4 flex-none text-ink-400 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-500" aria-hidden />
							</a>
						</motion.li>
					))}
				</motion.ul>
			</div>
		</section>
	);
}
