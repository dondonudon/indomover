// Vercel Cron endpoint. Daily, Vercel POSTs to /api/cron-rebuild with
// Authorization: Bearer <CRON_SECRET>. We verify and POST to a Vercel
// Deploy Hook, which queues a fresh production build. The build's
// `prebuild` script re-runs scripts/fetch-reviews.mjs against the
// Places API, baking the latest reviews into the bundle.

export const config = { runtime: "edge" };

export default async function handler(req: Request): Promise<Response> {
  const auth = req.headers.get("authorization") ?? "";
  const expected = `Bearer ${process.env.CRON_SECRET ?? ""}`;
  if (!process.env.CRON_SECRET || auth !== expected) {
    return new Response("Unauthorized", { status: 401 });
  }

  const hookUrl = process.env.VERCEL_DEPLOY_HOOK_URL;
  if (!hookUrl) {
    return new Response("Missing VERCEL_DEPLOY_HOOK_URL env var", {
      status: 500,
    });
  }

  const res = await fetch(hookUrl, { method: "POST" });
  const body = await res.text();
  return new Response(
    JSON.stringify({
      triggered: res.ok,
      status: res.status,
      hookResponse: body.slice(0, 300),
      at: new Date().toISOString(),
    }),
    {
      status: res.ok ? 200 : 502,
      headers: { "content-type": "application/json" },
    },
  );
}
