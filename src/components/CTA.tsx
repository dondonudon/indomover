import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { buildWaLink } from "../lib/whatsapp";

export default function CTA() {
  const { t } = useLanguage();

  return (
    <section
      id="kontak"
      className="relative isolate overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 py-20 text-white sm:py-24"
    >
      <div
        className="absolute inset-0 -z-10 opacity-20 [background-image:radial-gradient(circle_at_30%_20%,white_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mx-auto flex max-w-4xl flex-col items-center px-4 text-center sm:px-6 lg:px-8"
      >
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          {t.cta.title}
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-white/90">
          {t.cta.subtitle}
        </p>
        <a
          href={buildWaLink(t.cta.waMessage)}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-brand-700 shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-brand-50"
        >
          <MessageCircle className="h-5 w-5" aria-hidden />
          {t.cta.button}
        </a>
      </motion.div>
    </section>
  );
}
