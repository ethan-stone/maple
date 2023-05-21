import { env } from "@/env.mjs";
import { Webhook } from "svix";
import { z } from "zod";
import { headers } from "next/headers";

const secret = env.CLERK_WH_SECRET;

const wh = new Webhook(secret);

export const headerSchema = z.object({
  "svix-id": z.string(),
  "svix-timestamp": z.string(),
  "svix-signature": z.string(),
});

export async function POST(req: Request) {
  const rawHeaders = headers();
  const parseHeadersrResult = await headerSchema.spa({
    "svix-id": rawHeaders.get("svix-id"),
    "svix-timestamp": rawHeaders.get("svix-timestamp"),
    "svix-signature": rawHeaders.get("svix-signature"),
  });

  if (!parseHeadersrResult.success) {
    console.log(parseHeadersrResult.error);
    return new Response("Invalid headers", { status: 400 });
  }

  const body = await req.json();

  const event = wh.verify(JSON.stringify(body), parseHeadersrResult.data);

  console.log("signature verified");
  console.log(event);

  return new Response("ok", { status: 200 });
}
