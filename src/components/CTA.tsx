import { motion } from "framer-motion";
import { Mail, MessageCircle } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { EMAIL_AVAILABLE, buildMailtoLink } from "../lib/email";
import { buildWaLink } from "../lib/whatsapp";

export default function CTA() {
	const { t } = useLanguage();

	return (
		<section
			id="kontak"
			className="relative isolate overflow-hidden bg-linear-to-br from-brand-700 via-brand-600 to-brand-500 py-20 text-white sm:py-24"
		>
			<div
				className="absolute inset-0 -z-10 opacity-20 bg-[radial-gradient(circle_at_30%_20%,white_1px,transparent_1px)] bg-size-[24px_24px]"
				aria-hidden
			/>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: "-80px" }}
				transition={{ duration: 0.5 }}
				className="mx-auto flex max-w-4xl flex-col items-center px-4 text-center sm:px-6 lg:px-8"
			>
				<h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{t.cta.title}</h2>
				<p className="mt-4 max-w-2xl text-lg text-white/90">{t.cta.subtitle}</p>
				<div className="mt-8 flex flex-wrap justify-center gap-4">
					<a
						href={buildWaLink(t.cta.waMessage)}
						target="_blank"
						rel="noreferrer noopener"
						className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-brand-700 shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-brand-50"
					>
						<MessageCircle className="h-5 w-5" aria-hidden />
						{t.cta.button}
					</a>
					{EMAIL_AVAILABLE && (
						<a
							href={buildMailtoLink(t.cta.emailSubject)}
							className="inline-flex items-center gap-2 rounded-full border-2 border-white/70 px-7 py-3.5 text-base font-semibold text-white transition-transform hover:-translate-y-0.5 hover:border-white hover:bg-white/10"
						>
							<Mail className="h-5 w-5" aria-hidden />
							{t.cta.emailButton}
						</a>
					)}
				</div>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: "-80px" }}
				transition={{ duration: 0.5, delay: 0.15 }}
				className="mx-auto mt-14 w-full max-w-5xl px-4 sm:px-6 lg:px-8"
			>
				<div className="overflow-hidden rounded-2xl shadow-xl ring-2 ring-white/20">
					<iframe
						title="Lokasi Indo Mover Semarang"
						src="https://maps.google.com/maps?q=Indo+Mover+Jasa+Pindah+Rumah+Kantor+Gudang+Apartemen+Semarang&ll=-6.9707083,110.4327231&z=17&output=embed"
						width="100%"
						height="360"
						style={{ border: 0 }}
						allowFullScreen
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade"
					/>
				</div>
			</motion.div>
		</section>
	);
}
