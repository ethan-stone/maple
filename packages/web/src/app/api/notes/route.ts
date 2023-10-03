import { db, eq, notes, users } from "@/server/db/client";
import { uid } from "@/utils/uid";
import { auth } from "@clerk/nextjs";
import { z } from "zod";

const ReqBody = z.object({
  name: z.string(),
});

export async function POST(req: Request) {
  const { userId: clerkId } = auth();

  if (!clerkId) return new Response("Unauthorized", { status: 401 });

  const user = (
    await db.select().from(users).where(eq(users.clerkId, clerkId))
  )[0];

  if (!user) return new Response("Unauthorized", { status: 401 });

  const body = await req.json();

  const validatedBody = ReqBody.safeParse(body);

  if (!validatedBody.success) {
    return new Response(JSON.stringify(validatedBody.error), { status: 400 });
  }

  const id = uid({ prefix: "note" });

  await db.insert(notes).values({
    id,
    name: validatedBody.data.name,
    ownerId: user.id,
    content: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await db.select().from(notes).where(eq(notes.id, id));
}
