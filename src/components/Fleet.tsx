import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { buildWaLink } from "../lib/whatsapp";

export default function Fleet() {
	const { t } = useLanguage();

	return (
		<section id="armada" className="bg-white py-20 sm:py-28">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-2xl text-center">
					<p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
						{t.fleet.eyebrow}
					</p>
					<h2 className="mt-2 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
						{t.fleet.title}
					</h2>
					<p className="mt-4 text-lg text-ink-600">{t.fleet.subtitle}</p>
				</div>

				<motion.div
					initial="hidden"
					whileInView="show"
					viewport={{ once: true, margin: "-80px" }}
					variants={{
						hidden: {},
						show: { transition: { staggerChildren: 0.08 } },
					}}
					className="mt-12 overflow-hidden rounded-2xl ring-1 ring-ink-200"
				>
					<table className="w-full text-sm">
						<thead className="bg-ink-50">
							<tr>
								<th className="px-6 py-4 text-left font-semibold text-ink-900">Armada</th>
								<th className="hidden px-6 py-4 text-left font-semibold text-ink-900 sm:table-cell">
									{t.fleet.labels.capacity}
								</th>
								<th className="px-6 py-4 text-left font-semibold text-ink-900">
									{t.fleet.labels.suitable}
								</th>
								<th className="hidden px-6 py-4 text-left font-semibold text-ink-900 lg:table-cell">
									{t.fleet.labels.example}
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-ink-100">
							{t.fleet.items.map((item, i) => (
								<motion.tr
									key={item.name}
									variants={{
										hidden: { opacity: 0, x: -8 },
										show: { opacity: 1, x: 0, transition: { duration: 0.35, delay: i * 0.05 } },
									}}
									className="bg-white transition-colors hover:bg-ink-50"
								>
									<td className="px-6 py-4 font-semibold text-ink-900">{item.name}</td>
									<td className="hidden px-6 py-4 text-ink-600 sm:table-cell">{item.capacity}</td>
									<td className="px-6 py-4 text-ink-700">{item.suitable}</td>
									<td className="hidden px-6 py-4 text-ink-500 lg:table-cell">{item.example}</td>
								</motion.tr>
							))}
						</tbody>
					</table>
				</motion.div>

				<div className="mt-8 flex flex-col items-center gap-3 text-center">
					<p className="text-sm text-ink-500">{t.fleet.note}</p>
					<a
						href={buildWaLink(t.fleet.waMessage)}
						target="_blank"
						rel="noreferrer noopener"
						className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-400"
					>
						<MessageCircle className="h-4 w-4" aria-hidden />
						{t.fleet.cta}
					</a>
				</div>
			</div>
		</section>
	);
}
