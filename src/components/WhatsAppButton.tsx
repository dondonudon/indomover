import { MessageCircle } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { buildWaLink } from "../lib/whatsapp";

export default function WhatsAppButton() {
  const { t } = useLanguage();

  return (
    <a
      href={buildWaLink(t.hero.waMessage)}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={t.nav.cta}
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl shadow-emerald-900/30 ring-4 ring-white transition-transform hover:scale-105 sm:bottom-6 sm:right-6"
    >
      <MessageCircle className="h-7 w-7" aria-hidden />
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-30" />
    </a>
  );
}
