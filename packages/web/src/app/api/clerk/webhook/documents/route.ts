import { db, notes, eq } from "@/server/db/client";
import { uid } from "@/utils/uid";
import { Configuration, OpenAIApi } from "openai";
import { z } from "zod";

const reqBody = z.object({
  content: z.string(),
});

const openai = new OpenAIApi(new Configuration({}));

export async function POST(req: Request) {
  const reqBodyParseResult = await reqBody.spa(req.body);

  if (!reqBodyParseResult.success) {
    return new Response("Invalid body", { status: 400 });
  }

  const body = reqBodyParseResult.data;

  const embedding = await openai.createEmbedding({
    input: body.content,
    model: "text-embedding-ada-002",
  });

  const id = uid({ prefix: "note" });
  const now = new Date();

  await db.insert(notes).values({
    id,
    content: body.content,
    createdAt: now,
    updatedAt: now,
  });

  const note = await db.select().from(notes).where(eq(notes.id, id));

  return note[0];
}
