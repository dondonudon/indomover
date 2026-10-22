// Thin wrapper around the gtag.js snippet loaded in index.html.
// Optional chaining keeps this a no-op when the tag is blocked
// (ad blockers, offline dev) instead of throwing.

type GtagFn = (command: "event", name: string, params?: Record<string, unknown>) => void;

declare global {
	interface Window {
		gtag?: GtagFn;
	}
}

/** Tracks a WhatsApp CTA click. `location` identifies which button was used. */
export function trackWaClick(location: string): void {
	window.gtag?.("event", "whatsapp_click", { location });
}
