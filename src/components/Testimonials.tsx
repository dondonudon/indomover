import { motion } from "framer-motion";
import { Quote, Star, ExternalLink } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { reviewsData as reviews, type GoogleReviewItem as GoogleReview } from "../lib/reviewsData";

// Show up to 3 reviews, prioritizing the most substantial ones (high
// rating + meaningful text length) so the 3-col grid is always balanced
// and short "Good 👍"-style reviews don't take a slot that a detailed
// review could fill. Falls back to the raw pool if too few qualify.
const MAX_REVIEWS = 3;
const MIN_RATING = 5;
const MIN_TEXT_LEN = 60;

function pickReviews(all: GoogleReview[]): GoogleReview[] {
  const len = (r: GoogleReview) => (r.textEn ?? r.textId ?? "").length;
  const meaty = all.filter(
    (r) => r.rating >= MIN_RATING && len(r) >= MIN_TEXT_LEN,
  );
  const pool = meaty.length >= MAX_REVIEWS ? meaty : all;
  return [...pool].sort((a, b) => len(b) - len(a)).slice(0, MAX_REVIEWS);
}

export default function Testimonials() {
  const { t, lang } = useLanguage();
  const all = reviews.items as GoogleReview[];
  const items = pickReviews(all);
  const hasReal = items.length > 0;

  return (
    <section id="testimoni" className="bg-ink-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
            {t.testimonials.eyebrow}
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
            {t.testimonials.title}
          </h2>

          {hasReal && reviews.rating != null && (
            <div className="mt-5 flex items-center justify-center gap-3">
              <div className="flex items-center gap-1.5 rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-ink-200">
                <span className="text-xl font-bold text-ink-900">
                  {reviews.rating?.toFixed(1)}
                </span>
                <div className="flex gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className="h-4 w-4 fill-current"
                      aria-hidden
                    />
                  ))}
                </div>
                <span className="ml-1 text-sm text-ink-700">
                  {t.testimonials.ratingSuffix.replace(
                    "{count}",
                    String(reviews.totalReviews ?? all.length),
                  )}
                </span>
              </div>
            </div>
          )}
        </div>

        {hasReal ? (
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {items.map((r, i) => {
              const text = (lang === "id" ? r.textId : r.textEn) ?? r.textEn ?? r.textId ?? "";
              return (
                <motion.figure
                  key={`${r.name}-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
                  className="relative flex flex-col rounded-2xl bg-white p-7 shadow-sm ring-1 ring-ink-200"
                >
                  <Quote
                    className="absolute right-6 top-6 h-8 w-8 text-brand-100"
                    aria-hidden
                  />
                  <div className="flex gap-0.5 text-amber-400">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className={`h-4 w-4 ${
                          idx < r.rating ? "fill-current" : "text-ink-200 fill-current"
                        }`}
                        aria-hidden
                      />
                    ))}
                  </div>
                  <blockquote className="mt-4 flex-1 whitespace-pre-line text-ink-800 leading-relaxed">
                    "{text}"
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-ink-200 pt-4">
                    {r.photo ? (
                      <img
                        src={r.photo}
                        alt=""
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="h-10 w-10 flex-none rounded-full object-cover ring-1 ring-ink-200"
                      />
                    ) : (
                      <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                        {r.name.slice(0, 1).toUpperCase()}
                      </span>
                    )}
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-ink-900">
                        {r.name}
                      </p>
                      {r.relativeTime && (
                        <p className="truncate text-xs text-ink-700">
                          {r.relativeTime}
                        </p>
                      )}
                    </div>
                  </figcaption>
                </motion.figure>
              );
            })}
          </div>
        ) : (
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {t.testimonials.items.map((item, i) => (
              <motion.figure
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative rounded-2xl bg-white p-8 shadow-sm ring-1 ring-ink-200"
              >
                <Quote
                  className="absolute right-6 top-6 h-8 w-8 text-brand-100"
                  aria-hidden
                />
                <div className="flex gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className="h-4 w-4 fill-current"
                      aria-hidden
                    />
                  ))}
                </div>
                <blockquote className="mt-4 text-ink-800 leading-relaxed">
                  "{item.quote}"
                </blockquote>
                <figcaption className="mt-6 border-t border-ink-200 pt-4">
                  <p className="font-semibold text-ink-900">{item.name}</p>
                  <p className="text-sm text-ink-700">{item.location}</p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        )}

        {hasReal && reviews.googleMapsUri && (
          <div className="mt-10 text-center">
            <a
              href={reviews.googleMapsUri}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
            >
              {t.testimonials.viewAll}
              <ExternalLink className="h-4 w-4" aria-hidden />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
