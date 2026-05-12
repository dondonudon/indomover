import { reviewsData as data } from "./reviewsData";

// Email flows from the build-time fetch script (CONTACT_EMAIL env var) via
// reviews.json — never hardcoded, never committed to the repo.
export const EMAIL_ADDRESS = data.email ?? "";
export const EMAIL_AVAILABLE = EMAIL_ADDRESS.length > 0;

export function buildMailtoLink(subject: string, body?: string): string {
	let link = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(subject)}`;
	if (body) link += `&body=${encodeURIComponent(body)}`;
	return link;
}
