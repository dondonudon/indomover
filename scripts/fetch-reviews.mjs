#!/usr/bin/env node
// Build-time fetcher: pulls the latest Google reviews and writes
// src/data/reviews.json. Runs as `prebuild`. Fails soft when env
// vars are missing so local `npm run build` still works.

import { writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = resolve(__dirname, "../src/data/reviews.json");
const FIELD_MASK = [
  "id",
  "displayName",
  "rating",
  "userRatingCount",
  "googleMapsUri",
  "reviews",
  "formattedAddress",
  "addressComponents",
  "location",
  "internationalPhoneNumber",
  "nationalPhoneNumber",
  "websiteUri",
  "regularOpeningHours",
].join(",");

const PLACE_ID = process.env.GOOGLE_PLACE_ID;
const API_KEY = process.env.GOOGLE_PLACES_KEY;

function emptyDoc(reason) {
  return {
    fetchedAt: null,
    rating: null,
    totalReviews: null,
    googleMapsUri: null,
    items: [],
    skipped: reason ?? null,
  };
}

async function fetchPlace(languageCode) {
  const url = `https://places.googleapis.com/v1/places/${PLACE_ID}?languageCode=${languageCode}`;
  const res = await fetch(url, {
    headers: {
      "X-Goog-Api-Key": API_KEY,
      "X-Goog-FieldMask": FIELD_MASK,
    },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Places API ${res.status}: ${body.slice(0, 300)}`);
  }
  return res.json();
}

function buildReviewItems(enPlace, idPlace) {
  // The Places API caps `reviews` at 5. We call twice (en + id) because
  // the two responses often return overlapping-but-not-identical sets,
  // giving us a larger pool of unique reviews to pick from. Dedupe by
  // the review's API resource path (`r.name`).
  const merged = new Map();

  for (const r of enPlace.reviews ?? []) {
    merged.set(r.name, { raw: r, source: "en" });
  }
  for (const r of idPlace.reviews ?? []) {
    const existing = merged.get(r.name);
    if (existing) {
      // Already have it from the en call; capture the id-localized text too.
      existing.idText = r.text?.text ?? null;
    } else {
      merged.set(r.name, { raw: r, source: "id" });
    }
  }

  return Array.from(merged.values()).map(({ raw, source, idText }) => {
    const text = raw.text?.text ?? null;
    const origText = raw.originalText?.text ?? null;
    const origLang = raw.originalText?.languageCode ?? null;

    let textEn;
    let textId;
    if (source === "en") {
      textEn = text;
      textId = idText ?? (origLang === "id" ? origText : text);
    } else {
      textId = text;
      textEn = origLang === "en" ? origText : text;
    }

    return {
      name: raw.authorAttribution?.displayName ?? "Anonymous",
      photo: raw.authorAttribution?.photoUri ?? null,
      profileUri: raw.authorAttribution?.uri ?? null,
      rating: raw.rating ?? 5,
      relativeTime: raw.relativePublishTimeDescription ?? null,
      publishTime: raw.publishTime ?? null,
      textEn,
      textId,
      sourceUri: raw.googleMapsUri ?? null,
    };
  });
}

function pickComponent(components, type, field = "longText") {
  const c = components?.find((x) => (x.types ?? []).includes(type));
  return c?.[field] ?? null;
}

function structuredAddress(place) {
  const c = place.addressComponents ?? [];
  if (c.length === 0) return null;
  const streetNumber = pickComponent(c, "street_number");
  const route = pickComponent(c, "route");
  const streetAddress = [route, streetNumber].filter(Boolean).join(" ") || null;
  return {
    streetAddress,
    locality:
      pickComponent(c, "locality") ??
      pickComponent(c, "administrative_area_level_2"),
    region: pickComponent(c, "administrative_area_level_1"),
    postalCode: pickComponent(c, "postal_code"),
    country: pickComponent(c, "country", "shortText"),
  };
}

function shape(enPlace, idPlace) {
  const items = buildReviewItems(enPlace, idPlace);
  return {
    fetchedAt: new Date().toISOString(),
    rating: enPlace.rating ?? null,
    totalReviews: enPlace.userRatingCount ?? null,
    googleMapsUri: enPlace.googleMapsUri ?? null,
    address: enPlace.formattedAddress ?? null,
    addressParts: structuredAddress(enPlace),
    geo: enPlace.location
      ? {
          latitude: enPlace.location.latitude,
          longitude: enPlace.location.longitude,
        }
      : null,
    phone:
      enPlace.internationalPhoneNumber ?? enPlace.nationalPhoneNumber ?? null,
    website: enPlace.websiteUri ?? null,
    openingHours: enPlace.regularOpeningHours?.weekdayDescriptions ?? null,
    items,
  };
}

async function main() {
  if (!PLACE_ID || !API_KEY) {
    console.warn(
      "[reviews] GOOGLE_PLACE_ID or GOOGLE_PLACES_KEY not set — skipping fetch.",
    );
    await mkdir(dirname(OUT_PATH), { recursive: true });
    // Don't overwrite existing committed reviews if env vars are missing.
    try {
      const { readFile } = await import("node:fs/promises");
      const existing = await readFile(OUT_PATH, "utf8");
      console.warn("[reviews] Keeping existing src/data/reviews.json.");
      // Touch only if file is missing — re-emit existing untouched.
      JSON.parse(existing);
      return;
    } catch {
      const doc = emptyDoc("missing-env-vars");
      await writeFile(OUT_PATH, JSON.stringify(doc, null, 2) + "\n", "utf8");
      console.warn("[reviews] Wrote empty placeholder reviews.json.");
      return;
    }
  }

  try {
    const [enPlace, idPlace] = await Promise.all([
      fetchPlace("en"),
      fetchPlace("id"),
    ]);
    const doc = shape(enPlace, idPlace);
    await mkdir(dirname(OUT_PATH), { recursive: true });
    await writeFile(OUT_PATH, JSON.stringify(doc, null, 2) + "\n", "utf8");
    console.log(
      `[reviews] Wrote ${doc.items.length} unique review(s) (en+id merged), rating ${doc.rating}, ${doc.totalReviews} total.`,
    );
  } catch (err) {
    console.error(`[reviews] Fetch failed: ${err.message}`);
    // Don't break the build — leave existing reviews.json in place.
    process.exitCode = 0;
  }
}

main();
