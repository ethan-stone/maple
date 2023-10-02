import { env } from "@/env.mjs";
import { Webhook } from "svix";
import { z } from "zod";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db, users, eq } from "@/server/db/client";
import { logger } from "@/server/logger";
import { uid } from "@/utils/uid";

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
    return new Response("Invalid headers", { status: 400 });
  }

  const body = await req.json();

  const event = wh.verify(
    JSON.stringify(body),
    parseHeadersrResult.data
  ) as WebhookEvent;

  switch (event.type) {
    case "user.created": {
      const id = uid({ prefix: "user" });

      await db.insert(users).values({
        id,
        clerkId: event.data.id,
        createdAt: new Date(event.data.created_at),
        updatedAt: new Date(event.data.updated_at),
      });

      logger.info("user created", {
        userId: event.data.id,
      });

      break;
    }

    case "user.deleted": {
      const clerkId = event.data.id;

      if (!clerkId) {
        logger.info("can not delete user because clerkId is null", {
          clerkEvent: event,
        });

        throw new Error("can not delete user because clerkId is null");
      }

      await db.delete(users).where(eq(users.clerkId, clerkId));

      logger.info("user deleted", {
        userId: event.data.id,
      });
    }
  }

  return new Response("ok", { status: 200 });
}
