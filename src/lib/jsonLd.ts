export function safeJson(obj: unknown): string {
	return JSON.stringify(obj).replace(/</g, "\\u003c");
}
