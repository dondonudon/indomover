import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, MessageCircle, X } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { buildWaLink } from "../lib/whatsapp";

type ServiceItem = {
  slug: string;
  image: string;
  title: string;
  desc: string;
  bullets: string[];
};

type Props = {
  service: ServiceItem | null;
  onClose: () => void;
};

export default function ServiceModal({ service, onClose }: Props) {
  const { t } = useLanguage();

  useEffect(() => {
    if (!service) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [service, onClose]);

  return (
    <AnimatePresence>
      {service && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-modal-title"
          className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label={t.services.modal.close}
            className="absolute inset-0 bg-ink-900/70 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative z-10 m-3 w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl"
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-ink-100">
              <img
                src={service.image}
                alt={service.title}
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label={t.services.modal.close}
                className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-ink-900 shadow ring-1 ring-ink-200 transition-colors hover:bg-white"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>

            <div className="px-6 py-6 sm:px-8 sm:py-8">
              <h3
                id="service-modal-title"
                className="text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl"
              >
                {service.title}
              </h3>
              <p className="mt-3 text-ink-700 leading-relaxed">{service.desc}</p>

              <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-brand-600">
                {t.services.modal.includes}
              </p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {service.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-ink-800">
                    <span className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-brand-100 text-brand-700">
                      <Check className="h-3 w-3" aria-hidden />
                    </span>
                    <span className="text-sm">{b}</span>
                  </li>
                ))}
              </ul>

              <a
                href={buildWaLink(
                  t.services.modal.waMessage.replace("{service}", service.title),
                )}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-brand-600 sm:w-auto"
              >
                <MessageCircle className="h-5 w-5" aria-hidden />
                {t.services.modal.cta}
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
