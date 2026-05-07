import { reviewsData as data } from "./reviewsData";

// All phone/address data flows from Google Places via the build-time
// fetcher. Nothing is hardcoded so the public repo never carries the
// owner's phone number. In production the prebuild step populates
// reviews.json from the API; in local dev without env vars, WA_NUMBER
// is empty and `wa.me/` links open WhatsApp's homepage instead of a
// specific chat — fine until the dev sets up env vars.
function normalize(phone: string | null | undefined): string {
	if (!phone) return "";
	const digits = phone.replace(/[^\d]/g, "");
	if (digits.startsWith("0")) return `62${digits.slice(1)}`;
	return digits;
}

export const WA_NUMBER = normalize(data.phone);
export const WA_AVAILABLE = WA_NUMBER.length > 0;

export function buildWaLink(message: string, number: string = WA_NUMBER): string {
	const encoded = encodeURIComponent(message);
	return `https://wa.me/${number}?text=${encoded}`;
}
