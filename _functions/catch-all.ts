import type { EventContext } from "@cloudflare/workers-types";

interface Env {
  // Define any environment variables or KV bindings you have here
  // For example:
  // MY_KV_NAMESPACE: KVNamespace;
}

export async function onRequest(
  context: EventContext<Env, any, any>,
): Promise<Response> {
  const request = context.request;

  // Check if the request method is POST
  if (request.method === "POST") {
    // Parse the form data
    const formData = await request.formData();

    // Convert the form data to an object for easier handling
    const formDataObject = new Map();
    formData.forEach((value, key) => {
      formDataObject.set(key, value);
    });

    console.log("Form Data:", formDataObject);

    // You can now handle the form data (e.g., store it, send it to an API, etc.)
    // Here, we will just return a response confirming receipt of the form data
    return new Response("Form submitted successfully!", {
      headers: { "Content-Type": "text/plain" },
    });
  }

  // If the method is not POST, return a 405 Method Not Allowed response
  return new Response("Method Not Allowed", {
    status: 405,
    headers: { "Content-Type": "text/plain" },
  });
}
