import { motion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";

export default function HowItWorks() {
	const { t } = useLanguage();

	return (
		<section id="cara-kerja" className="bg-ink-50 py-20 sm:py-28">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-2xl text-center">
					<p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
						{t.howItWorks.eyebrow}
					</p>
					<h2 className="mt-2 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
						{t.howItWorks.title}
					</h2>
				</div>

				<motion.ol
					initial="hidden"
					whileInView="show"
					viewport={{ once: true, margin: "-80px" }}
					variants={{
						hidden: {},
						show: { transition: { staggerChildren: 0.1 } },
					}}
					className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
				>
					{t.howItWorks.steps.map((step, i) => (
						<motion.li
							key={step.number}
							variants={{
								hidden: { opacity: 0, y: 20 },
								show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
							}}
							className="relative flex flex-col rounded-2xl bg-white p-6 ring-1 ring-ink-200"
						>
							{i < t.howItWorks.steps.length - 1 && (
								<div
									className="absolute top-10 left-full z-10 hidden h-px w-8 bg-ink-200 lg:block"
									aria-hidden
								/>
							)}
							<span className="text-4xl font-extrabold text-brand-100 leading-none select-none">
								{step.number}
							</span>
							<h3 className="mt-4 text-base font-bold text-ink-900">{step.title}</h3>
							<p className="mt-2 text-sm leading-relaxed text-ink-600">{step.desc}</p>
						</motion.li>
					))}
				</motion.ol>
			</div>
		</section>
	);
}
