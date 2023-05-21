import { env } from "@/env.mjs";
import { Webhook } from "svix";
import { z } from "zod";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/dist/server";
import { supabase } from "@/server/db/client";
import { logger } from "@/server/logger";

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

  const event = wh.verify(
    JSON.stringify(body),
    parseHeadersrResult.data
  ) as WebhookEvent;

  console.log("signature verified");
  console.log(event);

  switch (event.type) {
    case "user.created": {
      const res = await supabase
        .from("users")
        .insert({
          id: event.data.id,
          created_at: new Date(event.data.created_at).toISOString(),
          updated_at: new Date(event.data.updated_at).toISOString(),
        })
        .select();

      if (res.error) {
        logger.error("user creation failed", {
          userId: event.data.id,
          error: res.error,
        });
        break;
      }

      logger.info("user created", {
        userId: event.data.id,
      });

      break;
    }

    case "user.deleted": {
      const res = await supabase.from("users").delete().match({
        id: event.data.id,
      });

      if (res.error) {
        logger.error("user deletion failed", {
          userId: event.data.id,
          error: res.error,
        });
      }

      logger.info("user deleted", {
        userId: event.data.id,
      });
    }
  }

  return new Response("ok", { status: 200 });
}
