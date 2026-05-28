import { useLocation } from "react-router-dom";
import { LANDING_PAGES } from "../data/landingPages";
import { EMAIL_ADDRESS, EMAIL_AVAILABLE } from "../lib/email";
import { useLanguage } from "../i18n/LanguageContext";

const PAGES = Object.values(LANDING_PAGES);

export default function Footer() {
	const { t } = useLanguage();
	const year = new Date().getFullYear();
	const { pathname } = useLocation();
	const isHome = pathname === "/";
	const sectionHref = (id: string) => (isHome ? `#${id}` : `/#${id}`);

	return (
		<footer className="bg-ink-900 text-ink-100">
			<div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
				<div>
					<div className="flex items-center gap-2">
						<span className="grid h-10 w-10 place-items-center rounded-xl bg-white shadow-sm ring-1 ring-white/10">
							<img
								src="/images/indo-mover-logo-only.png"
								alt=""
								className="h-8 w-8 object-contain"
							/>
						</span>
						<span className="text-lg font-bold text-white">Indo Mover</span>
					</div>
					<p className="mt-4 max-w-sm text-sm text-ink-100/70">{t.footer.tagline}</p>
				</div>

				<nav className="text-sm" aria-label="Footer Layanan">
					<p className="font-semibold text-white">{t.nav.services}</p>
					<ul className="mt-3 space-y-2 text-ink-100/70">
						{PAGES.map((page) => (
							<li key={page.slug}>
								<a href={`/${page.slug}/`} className="hover:text-white">
									{page.navLabel}
								</a>
							</li>
						))}
					</ul>
				</nav>

				<nav className="text-sm" aria-label="Footer Links">
					<p className="font-semibold text-white">{t.nav.contact}</p>
					<ul className="mt-3 space-y-2 text-ink-100/70">
						<li>
							<a href={sectionHref("tentang")} className="hover:text-white">
								{t.nav.about}
							</a>
						</li>
						<li>
							<a href={sectionHref("testimoni")} className="hover:text-white">
								{t.nav.testimonials}
							</a>
						</li>
						<li>
							<a href={sectionHref("kontak")} className="hover:text-white">
								{t.nav.cta}
							</a>
						</li>
						{EMAIL_AVAILABLE && (
							<li>
								<a href={`mailto:${EMAIL_ADDRESS}`} className="hover:text-white">
									{EMAIL_ADDRESS}
								</a>
							</li>
						)}
					</ul>
				</nav>
			</div>

			<div className="border-t border-white/10">
				<div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-ink-100/60 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
					<p>
						© {year} Indo Mover. {t.footer.rights}
					</p>
					<p>Semarang, Indonesia</p>
				</div>
			</div>
		</footer>
	);
}
