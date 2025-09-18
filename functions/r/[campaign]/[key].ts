import type {
  PagesFunction,
  KVNamespace,
  Response as CFResponse,
  D1Database,
} from "@cloudflare/workers-types";
import { applySecurityHeaders } from "../../securityHeaders";

interface Env {
  GAV_DALY_REFERRAL: KVNamespace;
  DB: D1Database;
}

export const onRequest: PagesFunction<Env> = async (
  context,
): Promise<CFResponse> => {
  const { params } = context;
  const { GAV_DALY_REFERRAL } = context.env;
  const { DB } = context.env;
  const campaign = params.campaign as string;
  const key = params.key as string;

  try {
    const url = await GAV_DALY_REFERRAL.get(key);
    if (!url) {
      return applySecurityHeaders(
        new Response("Not found", {
          status: 404,
        }),
      );
    }
    const headers = JSON.stringify(
      Array.from(context.request.headers.entries()),
    );
    const now = () => Math.floor(new Date().getTime() / 1000);

    await DB.prepare(
      "INSERT INTO forwarded_links (location, headers, campaign, timestamp) VALUES (?, ?, ?, ?)",
    )
      .bind(key, headers, campaign, now())
      .run();

    return applySecurityHeaders(Response.redirect(url, 302));
  } catch (e) {
    console.error(e);
    return applySecurityHeaders(
      new Response("Internal server error", {
        status: 500,
      }),
    );
  }
};
