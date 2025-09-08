import type {
  PagesFunction,
  KVNamespace,
  Response as CFResponse,
  D1Database,
} from "@cloudflare/workers-types";

interface Env {
  GAV_DALY_REFERRAL: KVNamespace;
  DB: D1Database;
}

export const onRequest: PagesFunction<Env> = async (
  context,
): Promise<CFResponse> => {
  const { GAV_DALY_REFERRAL } = context.env;
  const { DB } = context.env;
  const { key } = context.params as { key: string };

  try {
    const url = await GAV_DALY_REFERRAL.get(key);
    if (!url) {
      return new Response("Not found", {
        status: 404,
      }) as unknown as CFResponse;
    }

    const headers = JSON.stringify(
      Array.from(context.request.headers.entries()),
    );
    const now = () => Math.floor(new Date().getTime() / 1000);

    await DB.prepare(
      "INSERT INTO forwarded_links (location, headers, timestamp) VALUES (?, ?, ?)",
    )
      .bind(key, headers, now())
      .run();
    return Response.redirect(url, 302) as unknown as CFResponse;
  } catch (e) {
    console.error(e);
    return new Response("Internal server error", {
      status: 500,
    }) as unknown as CFResponse;
  }
};
