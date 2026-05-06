import { motion } from "framer-motion";
import { ShieldCheck, BadgeCheck, CalendarClock, type LucideIcon } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

const ICONS: LucideIcon[] = [BadgeCheck, ShieldCheck, CalendarClock];

export default function WhyUs() {
  const { t } = useLanguage();

  return (
    <section id="mengapa" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
            {t.why.eyebrow}
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
            {t.why.title}
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {t.why.items.map((item, i) => {
            const Icon = ICONS[i] ?? BadgeCheck;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl bg-ink-50 p-8 ring-1 ring-ink-200"
              >
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-500 text-white shadow-lg shadow-brand-500/20">
                  <Icon className="h-7 w-7" aria-hidden />
                </span>
                <h3 className="mt-6 text-xl font-bold text-ink-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-ink-700">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
