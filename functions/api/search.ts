/// <reference types="@cloudflare/workers-types" />

interface Env {
    VECTORIZE_INDEX: VectorizeIndex;
    AI: Ai;
}

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get("q");

    if (!query) {
        return new Response("Missing query", { status: 400 });
    }

    // Generate embedding for the query
    const embeddings: any = await env.AI.run("@cf/baai/bge-base-en-v1.5", {
        text: [query],
    });

    const vectors = embeddings.data[0];

    // Query Vectorize index
    const matches = await env.VECTORIZE_INDEX.query(vectors, {
        topK: 5,
        returnMetadata: true,
    });

    return new Response(JSON.stringify(matches), {
        headers: { "Content-Type": "application/json" },
    });
};
