import { decode as decodeJpeg } from "@jsquash/jpeg";
import { decode as decodePng } from "@jsquash/png";
import { decode as decodeWebp } from "@jsquash/webp";
import { decode as decodeAvif, encode as encodeAvif } from "@jsquash/avif";
import resize from "@jsquash/resize";

interface Env {
  R2_BUCKET: R2Bucket;
}

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
  const url = new URL(request.url);
  const src = url.searchParams.get("src");
  const width = Number(url.searchParams.get("w"));
  const height = Number(url.searchParams.get("h"));
  const quality = Number(url.searchParams.get("q")) || 80;

  if (!src) {
    return new Response("Missing src", { status: 400 });
  }

  // Try to fetch from R2
  const object = await env.R2_BUCKET.get(src);

  if (!object) {
    return new Response("Image not found", { status: 404 });
  }

  const arrayBuffer = await object.arrayBuffer();
  let imageData;

  // Decode based on extension or magic bytes (simplified here to extension)
  // In production, magic bytes check is safer
  if (src.endsWith(".jpg") || src.endsWith(".jpeg")) {
    imageData = await decodeJpeg(arrayBuffer);
  } else if (src.endsWith(".png")) {
    imageData = await decodePng(arrayBuffer);
  } else if (src.endsWith(".webp")) {
    imageData = await decodeWebp(arrayBuffer);
  } else if (src.endsWith(".avif")) {
    imageData = await decodeAvif(arrayBuffer);
  } else {
    return new Response("Unsupported format", { status: 400 });
  }

  if (!imageData) {
    return new Response("Failed to decode image", { status: 500 });
  }

  // Resize if dimensions provided
  if (width || height) {
    imageData = await resize(imageData, {
      width: width || imageData.width,
      height: height || imageData.height,
    });
  }

  // Encode to AVIF
  const outputBuffer = await encodeAvif(imageData, { quality });

  return new Response(outputBuffer, {
    headers: {
      "Content-Type": "image/avif",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
