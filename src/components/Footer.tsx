import { Truck } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-900 text-ink-100">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-500 text-white">
              <Truck className="h-5 w-5" aria-hidden />
            </span>
            <span className="text-lg font-bold text-white">Indo Mover</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-ink-100/70">
            {t.footer.tagline}
          </p>
        </div>

        <nav className="text-sm" aria-label="Footer">
          <p className="font-semibold text-white">{t.nav.services}</p>
          <ul className="mt-3 space-y-2 text-ink-100/70">
            {t.services.items.map((s) => (
              <li key={s.title}>
                <a href="#layanan" className="hover:text-white">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="text-sm" aria-label="Footer Links">
          <p className="font-semibold text-white">{t.nav.contact}</p>
          <ul className="mt-3 space-y-2 text-ink-100/70">
            <li>
              <a href="#tentang" className="hover:text-white">
                {t.nav.about}
              </a>
            </li>
            <li>
              <a href="#testimoni" className="hover:text-white">
                {t.nav.testimonials}
              </a>
            </li>
            <li>
              <a href="#kontak" className="hover:text-white">
                {t.nav.cta}
              </a>
            </li>
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
