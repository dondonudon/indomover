import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="tentang" className="bg-white py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
            {t.about.eyebrow}
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
            {t.about.title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-700">
            {t.about.body}
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {t.about.highlights.map((h) => (
              <li key={h} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full bg-brand-100 text-brand-700">
                  <Check className="h-3.5 w-3.5" aria-hidden />
                </span>
                <span className="text-ink-800">{h}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative"
        >
          <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-ink-100 shadow-xl ring-1 ring-ink-200">
            <img
              src="/images/service-handover.jpg"
              alt="Tim jasa pindah Indo Mover di Semarang sedang menangani packing barang"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-white p-5 shadow-lg ring-1 ring-ink-200 sm:block">
            <p className="text-3xl font-extrabold text-brand-600">500+</p>
            <p className="text-sm font-medium text-ink-700">
              {t.about.eyebrow}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
