/// <reference types="@cloudflare/workers-types" />

interface Env {
  VECTORIZE_INDEX: VectorizeIndex;
  AI: Ai;
  INDEXING_SECRET: string;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  // Simple auth check
  const authHeader = request.headers.get("Authorization");
  if (authHeader !== `Bearer ${env.INDEXING_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const posts = (await request.json()) as any[];

  if (!posts || !Array.isArray(posts)) {
    return new Response("Invalid body", { status: 400 });
  }

  const vectors = [];

  for (const post of posts) {
    const embeddings: any = await env.AI.run("@cf/baai/bge-base-en-v1.5", {
      text: [post.content],
    });

    vectors.push({
      id: post.id,
      values: embeddings.data[0],
      metadata: {
        title: post.title,
        url: post.url,
        description: post.description,
      },
    });
  }

  // Upsert to Vectorize
  // Note: Vectorize has a limit on batch size, might need chunking for large sites
  await env.VECTORIZE_INDEX.upsert(vectors);

  return new Response(`Indexed ${vectors.length} posts`, { status: 200 });
};
