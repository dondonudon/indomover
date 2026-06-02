import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { buildWaLink } from "../lib/whatsapp";

export default function ServiceArea() {
	const { t, lang } = useLanguage();

	return (
		<section id="area-layanan" className="bg-ink-50 py-20 sm:py-28">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-2xl text-center">
					<p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
						{t.serviceArea.eyebrow}
					</p>
					<h2 className="mt-2 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
						{t.serviceArea.title}
					</h2>
					<p className="mt-4 text-lg text-ink-600">{t.serviceArea.intro}</p>
				</div>

				<motion.div
					key={lang}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true, margin: "-80px" }}
					variants={{
						hidden: {},
						show: { transition: { staggerChildren: 0.1 } },
					}}
					className="mt-12 grid gap-6 sm:grid-cols-3"
				>
					{t.serviceArea.groups.map((group) => (
						<motion.div
							key={group.label}
							variants={{
								hidden: { opacity: 0, y: 16 },
								show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
							}}
							className="rounded-2xl bg-white p-6 ring-1 ring-ink-200"
						>
							<h3 className="text-sm font-semibold uppercase tracking-wider text-brand-600">
								{group.label}
							</h3>
							<ul className="mt-4 flex flex-wrap gap-2">
								{group.places.map((place) => (
									<li
										key={place}
										className="rounded-full bg-ink-50 px-3 py-1 text-sm text-ink-700 ring-1 ring-ink-200"
									>
										{place}
									</li>
								))}
							</ul>
						</motion.div>
					))}
				</motion.div>

				<div className="mt-8 flex flex-col items-center gap-3 text-center">
					<p className="text-sm text-ink-500">{t.serviceArea.note}</p>
					<a
						href={buildWaLink(t.serviceArea.waMessage)}
						target="_blank"
						rel="noreferrer noopener"
						className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-400"
					>
						<MessageCircle className="h-4 w-4" aria-hidden />
						{t.serviceArea.cta}
					</a>
				</div>
			</div>
		</section>
	);
}
