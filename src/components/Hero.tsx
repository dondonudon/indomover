import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { buildWaLink } from "../lib/whatsapp";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="beranda"
      className="relative isolate overflow-hidden bg-ink-900 text-white"
    >
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-40"
        style={{ backgroundImage: "url('/images/service-carrying.jpg')" }}
        aria-hidden
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-ink-900 via-ink-900/80 to-brand-900/70"
        aria-hidden
      />

      <div className="mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-center px-4 pt-28 pb-20 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-200 backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
          {t.hero.eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
        >
          {t.hero.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-5 max-w-2xl text-lg text-ink-100/90 sm:text-xl"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <a
            href={buildWaLink(t.hero.waMessage)}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-brand-900/30 transition-colors hover:bg-brand-400"
          >
            <MessageCircle className="h-5 w-5" aria-hidden />
            {t.hero.ctaPrimary}
          </a>
          <a
            href="#layanan"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-6 py-3 text-base font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
          >
            {t.hero.ctaSecondary}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
