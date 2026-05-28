import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { LandingPageData } from "../data/landingPages";

export default function LandingIntro({ page }: { page: LandingPageData }) {
	const { intro, highlights } = page;

	return (
		<section className="bg-white py-20 sm:py-28">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-3xl">
					<motion.div
						initial={{ opacity: 0, y: 24 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-80px" }}
						transition={{ duration: 0.5 }}
					>
						<h2 className="text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
							{intro.heading}
						</h2>
						<div className="mt-6 space-y-4">
							{intro.paragraphs.map((p, i) => (
								<p key={i} className="text-lg leading-relaxed text-ink-700">
									{p}
								</p>
							))}
						</div>
					</motion.div>

					<motion.ul
						initial={{ opacity: 0, y: 24 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-80px" }}
						transition={{ duration: 0.5, delay: 0.1 }}
						className="mt-10 grid gap-3 sm:grid-cols-2"
					>
						{highlights.map((h) => (
							<li key={h} className="flex items-start gap-3">
								<span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full bg-brand-100 text-brand-700">
									<Check className="h-3.5 w-3.5" aria-hidden />
								</span>
								<span className="text-ink-800">{h}</span>
							</li>
						))}
					</motion.ul>
				</div>
			</div>
		</section>
	);
}
