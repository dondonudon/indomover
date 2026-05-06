import { useEffect, useState } from "react";
import { Menu, X, Truck } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { useScrollSpy } from "../lib/useScrollSpy";
import { buildWaLink } from "../lib/whatsapp";

const SECTION_IDS = ["beranda", "tentang", "layanan", "mengapa", "testimoni", "faq", "kontak"];

export default function Navbar() {
  const { t, lang, setLang } = useLanguage();
  const active = useScrollSpy(SECTION_IDS);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { id: "beranda", label: t.nav.home },
    { id: "tentang", label: t.nav.about },
    { id: "layanan", label: t.nav.services },
    { id: "mengapa", label: t.nav.why },
    { id: "testimoni", label: t.nav.testimonials },
    { id: "faq", label: t.nav.faq },
  ];

  // Force the "scrolled" (light bg, dark text) treatment whenever the
  // mobile menu is open, since that panel is white.
  const onLight = scrolled || open;

  const logoText = onLight ? "text-ink-900" : "text-white";
  const linkBase = onLight
    ? "text-ink-700 hover:text-ink-900"
    : "text-white/85 hover:text-white";
  const linkActive = onLight ? "text-brand-700" : "text-white";
  const togglePlate = onLight
    ? "border-ink-200 bg-white"
    : "border-white/25 bg-white/10 backdrop-blur";
  const toggleInactive = onLight
    ? "text-ink-700 hover:text-ink-900"
    : "text-white/85 hover:text-white";
  const toggleActive = onLight
    ? "bg-ink-900 text-white"
    : "bg-white text-ink-900";
  const mobileBtn = onLight
    ? "border-ink-200 bg-white text-ink-900"
    : "border-white/30 bg-white/10 text-white backdrop-blur";

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        onLight ? "bg-white/85 backdrop-blur shadow-sm" : "bg-transparent",
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a
          href="#beranda"
          className="flex items-center gap-2 font-bold tracking-tight"
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-500 text-white">
            <Truck className="h-5 w-5" aria-hidden />
          </span>
          <span className={`text-lg transition-colors ${logoText}`}>
            Indo Mover
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={[
                "rounded-full px-3 py-2 text-sm font-medium transition-colors",
                active === l.id ? linkActive : linkBase,
              ].join(" ")}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div
            role="group"
            aria-label="Language"
            className={`hidden rounded-full border p-0.5 text-xs font-semibold transition-colors sm:flex ${togglePlate}`}
          >
            {(["id", "en"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={[
                  "rounded-full px-2.5 py-1 uppercase transition-colors",
                  lang === l ? toggleActive : toggleInactive,
                ].join(" ")}
              >
                {l}
              </button>
            ))}
          </div>

          <a
            href={buildWaLink(t.hero.waMessage)}
            target="_blank"
            rel="noreferrer noopener"
            className="hidden rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-600 md:inline-flex"
          >
            {t.nav.cta}
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className={`grid h-10 w-10 place-items-center rounded-full border transition-colors md:hidden ${mobileBtn}`}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-ink-200 bg-white md:hidden">
          <nav className="flex flex-col gap-1 px-4 py-3" aria-label="Mobile">
            {links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className={[
                  "rounded-lg px-3 py-2 text-sm font-medium",
                  active === l.id
                    ? "bg-brand-50 text-brand-700"
                    : "text-ink-700 hover:bg-ink-50",
                ].join(" ")}
              >
                {l.label}
              </a>
            ))}
            <div className="mt-2 flex items-center gap-2">
              {(["id", "en"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                  className={[
                    "rounded-full px-3 py-1 text-xs font-semibold uppercase",
                    lang === l
                      ? "bg-ink-900 text-white"
                      : "border border-ink-200 text-ink-700",
                  ].join(" ")}
                >
                  {l}
                </button>
              ))}
              <a
                href={buildWaLink(t.hero.waMessage)}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => setOpen(false)}
                className="ml-auto rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white"
              >
                {t.nav.cta}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
