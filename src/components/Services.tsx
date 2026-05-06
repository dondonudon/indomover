import { useState } from "react";
import { motion } from "framer-motion";
import {
  Package,
  Truck,
  Boxes,
  Building2,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import ServiceModal from "./ServiceModal";

const ICONS: LucideIcon[] = [Package, Truck, Boxes, Building2];

export default function Services() {
  const { t } = useLanguage();
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const openService = openSlug
    ? t.services.items.find((s) => s.slug === openSlug) ?? null
    : null;

  return (
    <section id="layanan" className="bg-ink-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
            {t.services.eyebrow}
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
            {t.services.title}
          </h2>
        </div>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {t.services.items.map((item, i) => {
            const Icon = ICONS[i] ?? Package;
            return (
              <motion.li
                key={item.slug}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
                }}
                className="group relative flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-ink-200 transition-shadow hover:shadow-lg"
              >
                <div className="aspect-[16/10] w-full overflow-hidden bg-ink-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-ink-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-700">
                    {item.desc}
                  </p>
                  <button
                    type="button"
                    onClick={() => setOpenSlug(item.slug)}
                    className="mt-4 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
                  >
                    {t.services.learnMore}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </button>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>

      <ServiceModal service={openService} onClose={() => setOpenSlug(null)} />
    </section>
  );
}
